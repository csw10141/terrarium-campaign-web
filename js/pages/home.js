import { INTERVIEW, getInterviewQuestionCount } from '../survey-data.js';
import { navigate } from '../router.js';
import { getSurveyCounts } from '../store.js';
import { getSvg } from '../svg-illustrations.js';

export async function renderHome() {
  const counts = await getSurveyCounts();
  const totalQ = getInterviewQuestionCount();

  const html = `
    <div class="page home">
      <div class="home__hero">
        ${getSvg('hero')}
      </div>

      <div class="home__brand">
        <div class="home__logo">가드너</div>
        <p class="home__tagline">지금, 나를 돌아보는 시간</p>
      </div>

      <p class="home__desc">
        해결책이 아닌, 지금 나의 상태를<br>
        있는 그대로 돌아보는 질문들이에요.<br>
        부담 없이, 편하게 답해주세요.
      </p>

      <div class="home__cta">
        <button class="btn btn--primary home__start-btn" id="btn-start-interview">
          인터뷰 시작하기
        </button>
        <div class="home__cta-info">${totalQ}문항 · ${INTERVIEW.estimatedTime}</div>
      </div>

      <div class="home__bottom-links">
        <button class="home__link-btn" id="btn-history">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="3"/>
            <path d="M8 8h8M8 12h8M8 16h4"/>
          </svg>
          누적 설문 ${String(counts.total).padStart(2, '0')}건
        </button>
        <button class="home__link-btn" id="btn-settings">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
          </svg>
          설정
        </button>
      </div>
    </div>
  `;

  return {
    html,
    init() {
      document.getElementById('btn-start-interview').addEventListener('click', () => {
        navigate('/survey/interview');
      });

      document.getElementById('btn-history').addEventListener('click', () => {
        navigate('/history');
      });

      document.getElementById('btn-settings').addEventListener('click', () => {
        navigate('/settings');
      });
    }
  };
}
