import { navigate } from '../router.js';
import { getSurveyCounts, getUnsyncedSurveys, markSynced } from '../store.js';
import { syncAll } from '../sync.js';

export async function renderSettings() {
  const counts = await getSurveyCounts();

  const html = `
    <div class="page settings">
      <div class="settings__header">
        <button class="settings__back" id="btn-settings-back">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12 5L7 10L12 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <h1 class="settings__title">설정</h1>
      </div>

      <!-- Data Stats & Sync -->
      <div class="settings__section">
        <div class="settings__section-title">데이터 현황</div>
        <div class="settings__card">
          <div class="settings__stat">
            <span class="settings__stat-label">전체 응답</span>
            <span class="settings__stat-value" id="stat-total">${counts.total}건</span>
          </div>
          <div class="settings__stat">
            <span class="settings__stat-label">전송 완료</span>
            <span class="settings__stat-value settings__stat-value--synced" id="stat-synced">${counts.synced}건</span>
          </div>
          <div class="settings__stat">
            <span class="settings__stat-label">미전송</span>
            <span class="settings__stat-value ${counts.pending > 0 ? 'settings__stat-value--pending' : ''}" id="stat-pending">${counts.pending}건</span>
          </div>
          <button class="btn btn--primary settings__sync-btn" id="btn-sync" ${counts.pending === 0 ? 'disabled' : ''}>
            ${counts.pending > 0 ? `${counts.pending}건 전송하기` : '전송할 데이터 없음'}
          </button>
        </div>
      </div>

      <!-- Network Status -->
      <div class="settings__section">
        <div class="settings__section-title">네트워크 상태</div>
        <div class="settings__card">
          <div class="settings__stat">
            <span class="settings__stat-label">연결 상태</span>
            <span class="settings__stat-value" id="net-status" style="color: ${navigator.onLine ? 'var(--success)' : 'var(--error)'}">
              ${navigator.onLine ? '온라인' : '오프라인'}
            </span>
          </div>
          <p class="settings__info">
            오프라인에서도 설문은 정상 작동합니다.<br>
            온라인 연결 시 데이터가 자동 전송됩니다.
          </p>
        </div>
      </div>

      <!-- App Info -->
      <div class="settings__section">
        <div class="settings__section-title">앱 정보</div>
        <div class="settings__card">
          <div class="settings__stat">
            <span class="settings__stat-label">버전</span>
            <span class="settings__stat-value">1.0.0</span>
          </div>
          <div class="settings__stat">
            <span class="settings__stat-label">프로젝트</span>
            <span class="settings__stat-value">IS,ME (이즈미)</span>
          </div>
        </div>
      </div>
    </div>
  `;

  return {
    html,
    init() {
      // Back button
      document.getElementById('btn-settings-back').addEventListener('click', () => {
        navigate('/');
      });

      // Sync button
      document.getElementById('btn-sync').addEventListener('click', handleSync);

      // Network status listener
      const updateNetStatus = () => {
        const el = document.getElementById('net-status');
        if (el) {
          el.textContent = navigator.onLine ? '온라인' : '오프라인';
          el.style.color = navigator.onLine ? 'var(--success)' : 'var(--error)';
        }
      };
      window.addEventListener('online', updateNetStatus);
      window.addEventListener('offline', updateNetStatus);

      return () => {
        window.removeEventListener('online', updateNetStatus);
        window.removeEventListener('offline', updateNetStatus);
      };
    }
  };
}

async function handleSync() {
  const btn = document.getElementById('btn-sync');
  btn.disabled = true;
  btn.textContent = '전송 중...';

  const result = await syncAll(getUnsyncedSurveys, markSynced);

  if (result.error) {
    showToast(result.error);
  } else if (result.failed > 0) {
    showToast(`${result.success}건 성공, ${result.failed}건 실패`);
  } else {
    showToast(`${result.success}건 전송 완료!`);
  }

  // Refresh stats
  const counts = await getSurveyCounts();
  document.getElementById('stat-total').textContent = `${counts.total}건`;
  document.getElementById('stat-synced').textContent = `${counts.synced}건`;
  document.getElementById('stat-pending').textContent = `${counts.pending}건`;

  btn.disabled = counts.pending === 0;
  btn.textContent = counts.pending > 0 ? `${counts.pending}건 전송하기` : '전송할 데이터 없음';
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
