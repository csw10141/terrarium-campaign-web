// AES-GCM encryption using Web Crypto API
// Key is generated once and stored in localStorage (base64)
const KEY_STORAGE = 'gardener-enc-key';
const ALGO = 'AES-GCM';
const KEY_LENGTH = 256;

let cachedKey = null;

// Get or create encryption key
async function getKey() {
  if (cachedKey) return cachedKey;

  const stored = localStorage.getItem(KEY_STORAGE);
  if (stored) {
    const raw = Uint8Array.from(atob(stored), c => c.charCodeAt(0));
    cachedKey = await crypto.subtle.importKey('raw', raw, ALGO, true, ['encrypt', 'decrypt']);
    return cachedKey;
  }

  // Generate new key
  cachedKey = await crypto.subtle.generateKey({ name: ALGO, length: KEY_LENGTH }, true, ['encrypt', 'decrypt']);
  const exported = await crypto.subtle.exportKey('raw', cachedKey);
  localStorage.setItem(KEY_STORAGE, btoa(String.fromCharCode(...new Uint8Array(exported))));
  return cachedKey;
}

// Encrypt an object → { iv, data } (base64 strings)
export async function encrypt(obj) {
  const key = await getKey();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(JSON.stringify(obj));

  const ciphertext = await crypto.subtle.encrypt({ name: ALGO, iv }, key, encoded);

  return {
    iv: btoa(String.fromCharCode(...iv)),
    data: btoa(String.fromCharCode(...new Uint8Array(ciphertext)))
  };
}

// Decrypt { iv, data } → original object
export async function decrypt(encrypted) {
  const key = await getKey();
  const iv = Uint8Array.from(atob(encrypted.iv), c => c.charCodeAt(0));
  const ciphertext = Uint8Array.from(atob(encrypted.data), c => c.charCodeAt(0));

  const decrypted = await crypto.subtle.decrypt({ name: ALGO, iv }, key, ciphertext);
  const text = new TextDecoder().decode(decrypted);
  return JSON.parse(text);
}
