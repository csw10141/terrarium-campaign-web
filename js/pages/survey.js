import { getPhase, getInterviewFlow, getInterviewQuestionCount, INTERVIEW } from '../survey-data.js';
import { setCurrentAnswer, getCurrentAnswer, getAllCurrentAnswers, resetCurrentState, saveSurvey } from '../store.js';
import { navigate } from '../router.js';
import { getSvg } from '../svg-illustrations.js';
import { syncAll, getEndpoint } from '../sync.js';
import { getUnsyncedSurveys, markSynced } from '../store.js';

let currentIndex = 0;
let flowItems = [];
let totalRealQuestions = 0;
let direction = 'right';
let isInterview = false;
let legacyPhaseId = null;

export function renderSurvey(params) {
  const phaseId = params.phase;
  isInterview = phaseId === 'interview';
  legacyPhaseId = null;

  if (isInterview) {
    flowItems = getInterviewFlow();
    totalRealQuestions = getInterviewQuestionCount();
  } else {
    const phase = getPhase(phaseId);
    if (!phase) {
      navigate('/');
      return { html: '', init() {} };
    }
    legacyPhaseId = phaseId;
    flowItems = phase.questions.map(q => ({ ...q }));
    totalRealQuestions = flowItems.length;
  }

  currentIndex = 0;
  resetCurrentState();

  const html = `
    <div class="page survey" id="survey-page">
      <div class="progress">
        <div class="progress__bar-wrap">
          <div class="progress__bar" id="progress-bar" style="width: 0%"></div>
        </div>
        <div class="progress__text">
          <button class="progress__back" id="btn-back" disabled>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8L10 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            이전
          </button>
          <span id="progress-count">1 / ${totalRealQuestions}</span>
        </div>
      </div>

      <div class="question" id="question-area">
      </div>

      <div class="survey__next-wrap">
        <button class="btn btn--primary" id="btn-next" disabled>다음</button>
      </div>
    </div>
  `;

  return {
    html,
    init() {
      renderItem();
      document.getElementById('btn-next').addEventListener('click', handleNext);
      document.getElementById('btn-back').addEventListener('click', handleBack);
    }
  };
}

function getRealQuestionIndex() {
  let count = 0;
  for (let i = 0; i < currentIndex; i++) {
    if (flowItems[i].type !== 'section-break') count++;
  }
  return count;
}

function renderItem() {
  const item = flowItems[currentIndex];
  const area = document.getElementById('question-area');
  const progressBar = document.getElementById('progress-bar');
  const progressCount = document.getElementById('progress-count');
  const btnBack = document.getElementById('btn-back');
  const btnNext = document.getElementById('btn-next');

  const realIdx = getRealQuestionIndex();
  const progress = (realIdx / totalRealQuestions) * 100;
  progressBar.style.width = `${progress}%`;
  btnBack.disabled = currentIndex === 0;

  if (item.type === 'section-break') {
    progressCount.textContent = `섹션 ${item.sectionIndex + 1} / ${INTERVIEW.sections.length}`;
    btnNext.disabled = false;
    btnNext.textContent = '계속하기';

    const animClass = direction === 'right' ? 'page--slide-right' : 'page--slide-left';
    area.innerHTML = `
      <div class="section-break ${animClass}">
        <div class="section-break__icon">
          ${getSvg(item.icon)}
        </div>
        <h2 class="section-break__title">${item.title}</h2>
        <p class="section-break__subtitle">${item.subtitle}</p>
        <div class="section-break__divider"></div>
      </div>
    `;
    return;
  }

  progressCount.textContent = `${realIdx + 1} / ${totalRealQuestions}`;

  const isLast = currentIndex === flowItems.length - 1;
  btnNext.textContent = isLast ? '제출하기' : '다음';

  renderQuestion(item, area, btnNext);
}

function renderQuestion(q, area, btnNext) {
  const savedAnswer = getCurrentAnswer(q.id);
  const animClass = direction === 'right' ? 'page--slide-right' : 'page--slide-left';

  if (q.type === 'text') {
    area.innerHTML = `
      <div class="question ${animClass}">
        <div class="question__category">${q.category}</div>
        <h2 class="question__text">${q.question}</h2>
        <div class="options">
          ${q.options.map((opt, i) => `
            <button class="option ${savedAnswer === i ? 'option--selected' : ''}" data-index="${i}">
              <div class="option__radio"></div>
              <div class="option__text">${opt}</div>
            </button>
          `).join('')}
        </div>
        ${q.optional ? '<p style="font-size:0.8rem; color:var(--text-muted); margin-top:12px;">* 해당하지 않으면 건너뛸 수 있어요</p>' : ''}
      </div>
    `;

    btnNext.disabled = !q.optional && savedAnswer === undefined;

    area.querySelectorAll('.option').forEach(opt => {
      opt.addEventListener('click', () => {
        const idx = parseInt(opt.dataset.index);
        setCurrentAnswer(q.id, idx);
        area.querySelectorAll('.option').forEach(o => o.classList.remove('option--selected'));
        opt.classList.add('option--selected');
        btnNext.disabled = false;
      });
    });

  } else if (q.type === 'image') {
    area.innerHTML = `
      <div class="question ${animClass}">
        <div class="question__category">${q.category}</div>
        <h2 class="question__text">${q.question}</h2>
        <div class="image-options">
          ${q.options.map(opt => `
            <button class="image-option ${savedAnswer === opt.id ? 'image-option--selected' : ''}" data-id="${opt.id}">
              <div class="image-option__visual">
                ${getSvg(opt.svgType)}
              </div>
              <div class="image-option__label">${opt.label}</div>
              <div class="image-option__desc">${opt.description}</div>
            </button>
          `).join('')}
        </div>
      </div>
    `;

    btnNext.disabled = savedAnswer === undefined;

    area.querySelectorAll('.image-option').forEach(opt => {
      opt.addEventListener('click', () => {
        const id = opt.dataset.id;
        setCurrentAnswer(q.id, id);
        area.querySelectorAll('.image-option').forEach(o => o.classList.remove('image-option--selected'));
        opt.classList.add('image-option--selected');
        btnNext.disabled = false;
      });
    });

  } else if (q.type === 'contact') {
    const savedContact = getCurrentAnswer(q.id) || {};
    area.innerHTML = `
      <div class="question ${animClass}">
        <div class="question__category">${q.category}</div>
        <h2 class="question__text">${q.question}</h2>
        <div class="options">
          ${q.options.map((opt, i) => `
            <button class="option ${savedContact.method === opt ? 'option--selected' : ''}" data-method="${opt}" data-index="${i}">
              <div class="option__radio"></div>
              <div class="option__text">${opt}</div>
            </button>
          `).join('')}
        </div>
        <div class="contact-input" style="margin-top: 16px;">
          <input
            type="text"
            class="contact-input__field"
            id="contact-value"
            placeholder="연락처를 입력해 주세요 (선택)"
            value="${savedContact.value || ''}"
          >
        </div>
        <p style="font-size:0.8rem; color:var(--text-muted); margin-top:8px;">* 연락처 입력은 선택사항이에요</p>
      </div>
    `;

    btnNext.disabled = false;

    area.querySelectorAll('.option').forEach(opt => {
      opt.addEventListener('click', () => {
        const method = opt.dataset.method;
        const currentVal = document.getElementById('contact-value').value;
        setCurrentAnswer(q.id, { method, value: currentVal });
        area.querySelectorAll('.option').forEach(o => o.classList.remove('option--selected'));
        opt.classList.add('option--selected');
      });
    });

    document.getElementById('contact-value').addEventListener('input', (e) => {
      const current = getCurrentAnswer(q.id) || {};
      setCurrentAnswer(q.id, { ...current, value: e.target.value });
    });
  }
}

async function handleNext() {
  if (currentIndex < flowItems.length - 1) {
    direction = 'right';
    currentIndex++;
    renderItem();
  } else {
    const answers = getAllCurrentAnswers();
    const contact = answers.contact || {};
    delete answers.contact;

    const surveyType = isInterview ? 'interview' : (legacyPhaseId || 'phase1');

    try {
      await saveSurvey(surveyType, answers, contact);

      if (navigator.onLine && getEndpoint()) {
        syncAll(getUnsyncedSurveys, markSynced).catch(() => {});
      }

      navigate(`/complete/${surveyType}`);
    } catch (e) {
      console.error('Save failed:', e);
      navigate(`/complete/${surveyType}`);
    }
  }
}

function handleBack() {
  if (currentIndex > 0) {
    direction = 'left';
    currentIndex--;
    renderItem();
  }
}
