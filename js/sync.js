// Google Sheets Sync via Apps Script
import { decryptSurvey } from './store.js';

// Set your Apps Script Web App URL here or in settings
const ENDPOINT_KEY = 'isme-sync-endpoint';

export function getEndpoint() {
  return localStorage.getItem(ENDPOINT_KEY) || '';
}

export function setEndpoint(url) {
  localStorage.setItem(ENDPOINT_KEY, url);
}

// Send a single survey to Google Sheets (decrypt before sending)
async function sendToSheets(encryptedSurvey) {
  const endpoint = getEndpoint();
  if (!endpoint) {
    throw new Error('전송 URL이 설정되지 않았습니다.');
  }

  // Decrypt data for transmission
  const survey = await decryptSurvey(encryptedSurvey);

  // Flatten the data for spreadsheet
  const payload = {
    id: survey.id,
    surveyType: survey.surveyType,
    submittedAt: survey.metadata.submittedAt,
    userAgent: survey.metadata.userAgent,
    screenSize: survey.metadata.screenSize,
    language: survey.metadata.language,
    wasOnline: survey.metadata.online,
    contactMethod: survey.contact.method || '',
    contactValue: survey.contact.value || '',
    ...flattenAnswers(survey.answers)
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify(payload)
  });

  // no-cors mode always returns opaque response, so we assume success
  return true;
}

function flattenAnswers(answers) {
  const flat = {};
  for (const [key, value] of Object.entries(answers)) {
    flat[`answer_${key}`] = typeof value === 'object' ? JSON.stringify(value) : String(value);
  }
  return flat;
}

// Sync all unsynced surveys
export async function syncAll(getUnsyncedFn, markSyncedFn) {
  const endpoint = getEndpoint();
  if (!endpoint) {
    return { success: 0, failed: 0, error: '전송 URL이 설정되지 않았습니다.' };
  }

  if (!navigator.onLine) {
    return { success: 0, failed: 0, error: '오프라인 상태입니다.' };
  }

  const unsynced = await getUnsyncedFn();
  let success = 0;
  let failed = 0;

  for (const survey of unsynced) {
    try {
      await sendToSheets(survey);
      await markSyncedFn(survey.id);
      success++;
    } catch (e) {
      failed++;
      console.warn('Sync failed for', survey.id, e);
    }
  }

  return { success, failed, error: null };
}

// Auto-sync when coming online
export function setupAutoSync(getUnsyncedFn, markSyncedFn) {
  window.addEventListener('online', () => {
    syncAll(getUnsyncedFn, markSyncedFn);
  });

  // Try sync on load if online
  if (navigator.onLine) {
    setTimeout(() => {
      syncAll(getUnsyncedFn, markSyncedFn);
    }, 3000);
  }
}

// Google Apps Script code for the user to deploy
export const APPS_SCRIPT_CODE = `
// Google Apps Script - 이 코드를 Apps Script 에디터에 붙여넣으세요

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    // 첫 번째 행이 비어있으면 헤더 추가
    if (sheet.getLastRow() === 0) {
      var headers = Object.keys(data);
      sheet.appendRow(headers);
    }

    // 헤더 순서에 맞게 데이터 추가
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var row = headers.map(function(header) {
      return data[header] || '';
    });

    // 새 컬럼이 있으면 추가
    var existingHeaders = new Set(headers);
    Object.keys(data).forEach(function(key) {
      if (!existingHeaders.has(key)) {
        headers.push(key);
        row.push(data[key] || '');
      }
    });

    // 헤더 업데이트 (새 컬럼이 추가된 경우)
    if (headers.length > sheet.getLastColumn()) {
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    }

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput('IS,ME Survey API is running.')
    .setMimeType(ContentService.MimeType.TEXT);
}
`;
