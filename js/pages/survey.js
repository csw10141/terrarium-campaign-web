import { getPhase } from '../survey-data.js';
import { setCurrentAnswer, getCurrentAnswer, getAllCurrentAnswers, resetCurrentState, saveSurvey } from '../store.js';
import { navigate } from '../router.js';
import { getSvg } from '../svg-illustrations.js';
import { syncAll, getEndpoint } from '../sync.js';
import { getUnsyncedSurveys, markSynced } from '../store.js';

let currentQuestionIndex = 0;
let phase = null;
let direction = 'right';

export function renderSurvey(params) {
  const phaseId = params.phase;
  phase = getPhase(phaseId);

  if (!phase) {
    navigate('/');
    return { html: '', init() {} };
  }

  currentQuestionIndex = 0;
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
          <span id="progress-count">1 / ${phase.questions.length}</span>
        </div>
      </div>

      <div class="question" id="question-area">
        <!-- Question content rendered here -->
      </div>

      <div class="survey__next-wrap">
        <button class="btn btn--primary" id="btn-next" disabled>다음</button>
      </div>
    </div>
  `;

  return {
    html,
    init() {
      renderQuestion();

      document.getElementById('btn-next').addEventListener('click', handleNext);
      document.getElementById('btn-back').addEventListener('click', handleBack);
    }
  };
}

function renderQuestion() {
  const q = phase.questions[currentQuestionIndex];
  const area = document.getElementById('question-area');
  const progressBar = document.getElementById('progress-bar');
  const progressCount = document.getElementById('progress-count');
  const btnBack = document.getElementById('btn-back');
  const btnNext = document.getElementById('btn-next');

  const progress = ((currentQuestionIndex) / phase.questions.length) * 100;
  progressBar.style.width = `${progress}%`;
  progressCount.textContent = `${currentQuestionIndex + 1} / ${phase.questions.length}`;
  btnBack.disabled = currentQuestionIndex === 0;

  const isLast = currentQuestionIndex === phase.questions.length - 1;
  btnNext.textContent = isLast ? '제출하기' : '다음';

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

    // Enable next if optional or already answered
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

    // Contact is always optional, enable next
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
  if (currentQuestionIndex < phase.questions.length - 1) {
    direction = 'right';
    currentQuestionIndex++;
    renderQuestion();
  } else {
    // Submit
    const answers = getAllCurrentAnswers();
    const contact = answers.contact || {};
    delete answers.contact;

    try {
      await saveSurvey(phase.id, answers, contact);

      // Try auto-sync if online
      if (navigator.onLine && getEndpoint()) {
        syncAll(getUnsyncedSurveys, markSynced).catch(() => {});
      }

      navigate(`/complete/${phase.id}`);
    } catch (e) {
      console.error('Save failed:', e);
      navigate(`/complete/${phase.id}`);
    }
  }
}

function handleBack() {
  if (currentQuestionIndex > 0) {
    direction = 'left';
    currentQuestionIndex--;
    renderQuestion();
  }
}
