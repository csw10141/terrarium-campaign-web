import { navigate } from '../router.js';
import { getPhase } from '../survey-data.js';

export function renderComplete(params) {
  const phaseId = params.phase;
  const phase = getPhase(phaseId);

  const messages = {
    interview: {
      emoji: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M24 44C35 44 44 35 44 24C44 13 35 4 24 4C13 4 4 13 4 24C4 35 13 44 24 44Z" fill="#4ECDC4" opacity="0.2"/>
        <path d="M16 24L22 30L34 18" stroke="#4ECDC4" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
      title: '함께 해주셔서 감사해요!',
      desc: '솔직하게 나눠주신 이야기가\n정말 큰 도움이 됩니다.\n여러분의 목소리가 가드너를 만들어갑니다.'
    },
    phase1: {
      emoji: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M24 44C35 44 44 35 44 24C44 13 35 4 24 4C13 4 4 13 4 24C4 35 13 44 24 44Z" fill="#4ECDC4" opacity="0.2"/>
        <path d="M16 24L22 30L34 18" stroke="#4ECDC4" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
      title: '고마워요!',
      desc: '솔직한 답변이 큰 도움이 돼요.\n지금 상태를 말해주신 것만으로도\n충분합니다.'
    },
    phase2: {
      emoji: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M24 44C35 44 44 35 44 24C44 13 35 4 24 4C13 4 4 13 4 24C4 35 13 44 24 44Z" fill="#FF6B9D" opacity="0.2"/>
        <path d="M24 14V24M24 32H24.02" stroke="#FF6B9D" stroke-width="3" stroke-linecap="round"/>
      </svg>`,
      title: '깊은 이야기 감사해요',
      desc: '이 응답은 진짜 필요한 서비스를\n만드는 데 중요한 단서가 됩니다.'
    },
    phase3: {
      emoji: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M24 44C35 44 44 35 44 24C44 13 35 4 24 4C13 4 4 13 4 24C4 35 13 44 24 44Z" fill="#6C63FF" opacity="0.2"/>
        <path d="M16 28C16 28 19 32 24 32C29 32 32 28 32 28" stroke="#6C63FF" stroke-width="2.5" stroke-linecap="round"/>
        <circle cx="18" cy="20" r="2" fill="#6C63FF"/>
        <circle cx="30" cy="20" r="2" fill="#6C63FF"/>
      </svg>`,
      title: '함께 해주셔서 감사해요!',
      desc: '여러분의 목소리가\n가드너를 만들어갑니다.'
    }
  };

  const msg = messages[phaseId] || messages.phase1;

  const html = `
    <div class="page complete">
      <div class="complete__icon">
        ${msg.emoji}
      </div>
      <h1 class="complete__title">${msg.title}</h1>
      <p class="complete__desc">${msg.desc.replace(/\n/g, '<br>')}</p>

      <div class="complete__actions">
        <button class="btn btn--primary" id="btn-home">처음으로</button>
        ${phase ? `
          <button class="btn btn--ghost" id="btn-share">
            이 설문 공유하기
          </button>
        ` : ''}
      </div>
    </div>
  `;

  return {
    html,
    init() {
      document.getElementById('btn-home').addEventListener('click', () => {
        navigate('/');
      });

      const shareBtn = document.getElementById('btn-share');
      if (shareBtn) {
        shareBtn.addEventListener('click', async () => {
          if (navigator.share) {
            try {
              await navigator.share({
                title: '가드너',
                text: '지금, 나를 돌아보는 3분. 편하게 답해보세요.',
                url: window.location.origin + window.location.pathname
              });
            } catch (e) {
              // User cancelled
            }
          } else {
            // Fallback: copy URL
            try {
              await navigator.clipboard.writeText(window.location.origin + window.location.pathname);
              showToast('링크가 복사되었어요!');
            } catch (e) {
              // Clipboard not available
            }
          }
        });
      }
    }
  };
}

function showToast(message) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}
