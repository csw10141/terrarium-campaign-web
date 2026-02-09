// 가드너 - App Entry Point
import { route, initRouter } from './router.js';
import { renderHome } from './pages/home.js';
import { renderSurvey } from './pages/survey.js';
import { renderComplete } from './pages/complete.js';
import { renderSettings } from './pages/settings.js';
import { renderHistory } from './pages/history.js';
// Register routes
route('/', renderHome);
route('/survey/:phase', renderSurvey);
route('/complete/:phase', renderComplete);
route('/settings', renderSettings);
route('/history', renderHistory);

// Initialize router
initRouter();

// Register Service Worker (강제 업데이트)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      // 기존 SW 모두 해제 후 재등록
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const reg of registrations) {
        await reg.unregister();
      }
      const registration = await navigator.serviceWorker.register('./sw.js', { updateViaCache: 'none' });
      console.log('SW registered:', registration.scope);
    } catch (e) {
      console.warn('SW registration failed:', e);
    }
  });
}

// PWA install prompt
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
});

// Export for potential use
window.installApp = async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;
    deferredPrompt = null;
    return result.outcome;
  }
  return null;
};
