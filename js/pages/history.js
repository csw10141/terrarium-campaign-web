import { navigate } from '../router.js';
import { getAllSurveys, decryptSurvey, getSurveyCounts } from '../store.js';
import { PHASES } from '../survey-data.js';

const PHASE_LABELS = {
  phase1: '1차 탐색',
  phase2: '2차 심층',
  phase3: '3차 피드백'
};

export async function renderHistory() {
  const surveys = await getAllSurveys();
  const counts = await getSurveyCounts();

  // Sort by newest first (by id/timestamp)
  surveys.sort((a, b) => {
    // Try to compare by encrypted data existence order (reverse)
    return surveys.indexOf(b) - surveys.indexOf(a);
  });

  const html = `
    <div class="page settings">
      <div class="settings__header">
        <button class="settings__back" id="btn-back">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12 5L7 10L12 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <h1 class="settings__title">누적 설문</h1>
      </div>

      <!-- Summary -->
      <div class="settings__section">
        <div class="settings__section-title">요약</div>
        <div class="settings__card">
          <div class="settings__stat">
            <span class="settings__stat-label">전체</span>
            <span class="settings__stat-value">${counts.total}건</span>
          </div>
          <div class="settings__stat">
            <span class="settings__stat-label">전송 완료</span>
            <span class="settings__stat-value settings__stat-value--synced">${counts.synced}건</span>
          </div>
          <div class="settings__stat">
            <span class="settings__stat-label">미전송</span>
            <span class="settings__stat-value ${counts.pending > 0 ? 'settings__stat-value--pending' : ''}">${counts.pending}건</span>
          </div>
        </div>
      </div>

      <!-- Survey List -->
      <div class="settings__section">
        <div class="settings__section-title">응답 목록</div>
        ${surveys.length === 0 ? `
          <div class="settings__card" style="text-align: center; padding: 40px 20px;">
            <p style="color: var(--text-muted);">아직 응답이 없습니다.</p>
          </div>
        ` : `
          <div id="survey-list" style="display: flex; flex-direction: column; gap: 10px;">
            ${surveys.map((s, i) => `
              <div class="settings__card history-item" data-index="${i}" style="cursor: pointer;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div>
                    <div style="font-size: 0.95rem; font-weight: 600; color: var(--text);">
                      #${String(surveys.length - i).padStart(2, '0')}
                    </div>
                    <div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 2px;">
                      ID: ${s.id.slice(0, 8)}...
                    </div>
                  </div>
                  <div style="text-align: right;">
                    <span style="
                      font-size: 0.75rem;
                      font-weight: 600;
                      padding: 3px 8px;
                      border-radius: 6px;
                      ${s.synced
                        ? 'background: #E0FAF7; color: var(--success);'
                        : 'background: #FFF0F5; color: var(--accent);'
                      }
                    ">${s.synced ? '전송됨' : '미전송'}</span>
                    <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 4px;">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style="vertical-align: middle;">
                        <path d="M3 1v2M9 1v2M1 5h10M1 3h10v8H1z" stroke="currentColor" stroke-width="1"/>
                      </svg>
                      상세보기
                    </div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    </div>

    <!-- Detail Modal -->
    <div id="detail-modal" style="
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.4);
      z-index: 200;
      align-items: flex-end;
      justify-content: center;
    ">
      <div id="detail-content" style="
        background: var(--bg);
        border-radius: 24px 24px 0 0;
        max-width: var(--max-width);
        width: 100%;
        max-height: 80dvh;
        overflow-y: auto;
        padding: 24px 20px 40px;
        animation: slideUp 0.3s ease;
      ">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <h2 style="font-size: 1.1rem; font-weight: 700;">응답 상세</h2>
          <button id="btn-close-modal" style="
            background: var(--border);
            border: none;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
          ">&#x2715;</button>
        </div>
        <div id="detail-body"></div>
      </div>
    </div>
  `;

  return {
    html,
    init() {
      document.getElementById('btn-back').addEventListener('click', () => {
        navigate('/');
      });

      // Click on survey items
      document.querySelectorAll('.history-item').forEach(item => {
        item.addEventListener('click', async () => {
          const idx = parseInt(item.dataset.index);
          await showDetail(surveys[idx]);
        });
      });

      // Close modal
      document.getElementById('detail-modal').addEventListener('click', (e) => {
        if (e.target.id === 'detail-modal') closeModal();
      });
      document.getElementById('btn-close-modal').addEventListener('click', closeModal);
    }
  };
}

async function showDetail(entry) {
  const modal = document.getElementById('detail-modal');
  const body = document.getElementById('detail-body');

  body.innerHTML = '<p style="color: var(--text-muted); text-align: center;">복호화 중...</p>';
  modal.style.display = 'flex';

  try {
    const survey = await decryptSurvey(entry);

    const phaseLabel = PHASE_LABELS[survey.surveyType] || survey.surveyType;
    const phase = PHASES[survey.surveyType];
    const submittedAt = survey.metadata?.submittedAt
      ? new Date(survey.metadata.submittedAt).toLocaleString('ko-KR')
      : '-';

    let answersHtml = '';
    if (phase && survey.answers) {
      for (const q of phase.questions) {
        const answer = survey.answers[q.id];
        if (answer === undefined) continue;

        let answerText = '';
        if (q.type === 'image') {
          const opt = q.options.find(o => o.id === answer);
          answerText = opt ? `${opt.label} - ${opt.description}` : answer;
        } else if (q.type === 'contact') {
          const c = typeof answer === 'object' ? answer : {};
          answerText = `${c.method || '-'} / ${c.value || '(미입력)'}`;
        } else {
          answerText = q.options[answer] || answer;
        }

        answersHtml += `
          <div style="padding: 10px 0; border-bottom: 1px solid var(--border);">
            <div style="font-size: 0.78rem; color: var(--primary); font-weight: 600; margin-bottom: 2px;">${q.category}</div>
            <div style="font-size: 0.88rem; color: var(--text); margin-bottom: 4px;">${q.question}</div>
            <div style="font-size: 0.9rem; font-weight: 600; color: var(--primary-dark);">${answerText}</div>
          </div>
        `;
      }
    }

    body.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 4px; margin-bottom: 16px; padding-bottom: 16px; border-bottom: 2px solid var(--border);">
        <div style="display: flex; justify-content: space-between;">
          <span style="font-size: 0.85rem; color: var(--text-muted);">설문 유형</span>
          <span style="font-size: 0.85rem; font-weight: 600;">${phaseLabel}</span>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span style="font-size: 0.85rem; color: var(--text-muted);">접수 일시</span>
          <span style="font-size: 0.85rem; font-weight: 600;">${submittedAt}</span>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span style="font-size: 0.85rem; color: var(--text-muted);">전송 상태</span>
          <span style="font-size: 0.85rem; font-weight: 600; color: ${entry.synced ? 'var(--success)' : 'var(--accent)'};">
            ${entry.synced ? '전송됨' : '미전송'}
          </span>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span style="font-size: 0.85rem; color: var(--text-muted);">ID</span>
          <span style="font-size: 0.8rem; font-family: monospace;">${entry.id.slice(0, 16)}...</span>
        </div>
      </div>
      ${answersHtml || '<p style="color: var(--text-muted);">응답 데이터 없음</p>'}
    `;
  } catch (e) {
    body.innerHTML = '<p style="color: var(--error);">복호화에 실패했습니다.</p>';
  }
}

function closeModal() {
  document.getElementById('detail-modal').style.display = 'none';
}
