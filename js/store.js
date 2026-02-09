// IndexedDB Store using inline idb-keyval pattern
const DB_NAME = 'isme-db';
const STORE_NAME = 'surveys';
const DB_VERSION = 1;

let dbPromise = null;

function openDB() {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
  return dbPromise;
}

function tx(mode) {
  return openDB().then(db => {
    const transaction = db.transaction(STORE_NAME, mode);
    return transaction.objectStore(STORE_NAME);
  });
}

// Generate UUID
function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

// Save a survey response
export async function saveSurvey(surveyType, answers, contact = {}) {
  const store = await tx('readwrite');
  const entry = {
    id: uuid(),
    surveyType,
    answers,
    contact,
    metadata: {
      submittedAt: new Date().toISOString(),
      userAgent: navigator.userAgent,
      screenSize: `${screen.width}x${screen.height}`,
      language: navigator.language,
      online: navigator.onLine
    },
    synced: false
  };

  return new Promise((resolve, reject) => {
    const request = store.put(entry);
    request.onsuccess = () => resolve(entry);
    request.onerror = () => reject(request.error);
  });
}

// Get all surveys
export async function getAllSurveys() {
  const store = await tx('readonly');
  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
}

// Get unsynced surveys
export async function getUnsyncedSurveys() {
  const all = await getAllSurveys();
  return all.filter(s => !s.synced);
}

// Mark survey as synced
export async function markSynced(id) {
  const store = await tx('readwrite');
  return new Promise((resolve, reject) => {
    const getReq = store.get(id);
    getReq.onsuccess = () => {
      const entry = getReq.result;
      if (entry) {
        entry.synced = true;
        const putReq = store.put(entry);
        putReq.onsuccess = () => resolve();
        putReq.onerror = () => reject(putReq.error);
      } else {
        resolve();
      }
    };
    getReq.onerror = () => reject(getReq.error);
  });
}

// Get counts
export async function getSurveyCounts() {
  const all = await getAllSurveys();
  return {
    total: all.length,
    synced: all.filter(s => s.synced).length,
    pending: all.filter(s => !s.synced).length
  };
}

// In-memory current survey state
let currentState = {};

export function setCurrentAnswer(key, value) {
  currentState[key] = value;
}

export function getCurrentAnswer(key) {
  return currentState[key];
}

export function getAllCurrentAnswers() {
  return { ...currentState };
}

export function resetCurrentState() {
  currentState = {};
}
