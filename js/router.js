// Hash-based SPA Router
const routes = new Map();
let currentCleanup = null;

export function route(path, handler) {
  routes.set(path, handler);
}

export function navigate(path) {
  window.location.hash = path;
}

export function getCurrentPath() {
  return window.location.hash.slice(1) || '/';
}

async function handleRoute() {
  const path = getCurrentPath();
  const app = document.getElementById('app');

  // Find matching route
  let handler = null;
  let params = {};

  for (const [pattern, h] of routes) {
    const match = matchRoute(pattern, path);
    if (match) {
      handler = h;
      params = match;
      break;
    }
  }

  if (!handler) {
    handler = routes.get('/') || (() => '<div>Not Found</div>');
    params = {};
  }

  // Cleanup previous page
  if (currentCleanup) {
    currentCleanup();
    currentCleanup = null;
  }

  // Render new page
  const result = await handler(params);
  if (typeof result === 'string') {
    app.innerHTML = result;
  } else if (result && result.html) {
    app.innerHTML = result.html;
    if (result.init) {
      currentCleanup = result.init() || null;
    }
  }
}

function matchRoute(pattern, path) {
  // Exact match
  if (pattern === path) return {};

  // Parameterized match: /survey/:phase
  const patternParts = pattern.split('/');
  const pathParts = path.split('/');

  if (patternParts.length !== pathParts.length) return null;

  const params = {};
  for (let i = 0; i < patternParts.length; i++) {
    if (patternParts[i].startsWith(':')) {
      params[patternParts[i].slice(1)] = pathParts[i];
    } else if (patternParts[i] !== pathParts[i]) {
      return null;
    }
  }
  return params;
}

export function initRouter() {
  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}
