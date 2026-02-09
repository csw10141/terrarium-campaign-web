import { getPhaseList } from '../survey-data.js';
import { navigate } from '../router.js';
import { getSurveyCounts } from '../store.js';

export async function renderHome() {
  const phases = getPhaseList();
  const counts = await getSurveyCounts();

  const html = `
    <div class="page home">
      <div>
        <div class="home__logo">IS,ME</div>
        <div class="home__logo-sub">이즈미</div>
      </div>

      <p class="home__tagline">지금, 나를 돌아보는 시간</p>

      <p class="home__desc">
        해결책이 아닌, 지금 나의 상태를<br>
        있는 그대로 돌아보는 질문들이에요.<br>
        부담 없이, 편하게 답해주세요.
      </p>

      <div class="home__phases">
        ${phases.map((p, i) => `
          <button class="phase-card" data-phase="${p.id}">
            <div class="phase-card__icon phase-card__icon--${i + 1}">
              ${getPhaseIcon(i)}
            </div>
            <div class="phase-card__info">
              <div class="phase-card__title">${p.title} · ${p.subtitle}</div>
              <div class="phase-card__sub">${p.description} · ${p.estimatedTime} · ${p.questionCount}문항</div>
            </div>
            <div class="phase-card__arrow">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7 5L12 10L7 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </button>
        `).join('')}
      </div>

      <button class="phase-card" id="btn-history" style="max-width: 360px; width: 100%; border: 2px dashed var(--border);">
        <div class="phase-card__icon" style="background: #F0EEFF; color: var(--primary);">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="3"/>
            <path d="M8 8h8M8 12h8M8 16h4"/>
          </svg>
        </div>
        <div class="phase-card__info">
          <div class="phase-card__title">누적 설문 ${String(counts.total).padStart(2, '0')}건</div>
          <div class="phase-card__sub">누적설문 보기</div>
        </div>
        <div class="phase-card__arrow">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7 5L12 10L7 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </button>

    </div>
  `;

  return {
    html,
    init() {
      document.querySelectorAll('.phase-card[data-phase]').forEach(card => {
        card.addEventListener('click', () => {
          const phase = card.dataset.phase;
          navigate(`/survey/${phase}`);
        });
      });

      document.getElementById('btn-history').addEventListener('click', () => {
        navigate('/history');
      });
    }
  };
}

function getPhaseIcon(index) {
  const icons = [
    // Clipboard icon
    `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="6" y="4" width="12" height="16" rx="2"/>
      <path d="M9 2h6v4H9z"/>
      <path d="M10 12h4M10 16h4"/>
    </svg>`,
    // Heart icon
    `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 21C12 21 4 14 4 8.5C4 5.5 6.5 3 9.5 3C11 3 12 4 12 4C12 4 13 3 14.5 3C17.5 3 20 5.5 20 8.5C20 14 12 21 12 21Z"/>
    </svg>`,
    // Chat icon
    `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 12C21 16.4 16.97 20 12 20C10.5 20 9.1 19.7 7.84 19.15L3 21L4.85 16.16C4.3 14.9 4 13.5 4 12C4 7.03 7.58 3 12 3C16.97 3 21 7.58 21 12Z"/>
    </svg>`
  ];
  return icons[index] || icons[0];
}
