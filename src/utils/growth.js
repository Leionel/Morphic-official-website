const STORAGE_PREFIX = 'coglab_growth:';

function safeParseJSON(value) {
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function safeGetItem(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSetItem(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {}
}

export function getAnonId() {
  const key = `${STORAGE_PREFIX}anon_id`;
  const existing = safeGetItem(key);
  if (existing) return existing;
  const next = globalThis.crypto?.randomUUID?.() || `${Date.now()}_${Math.random().toString(16).slice(2)}`;
  safeSetItem(key, next);
  return next;
}

export function getExperimentVariant(experimentKey, variants) {
  const key = `${STORAGE_PREFIX}exp:${experimentKey}`;
  const existing = safeGetItem(key);
  if (existing && variants.includes(existing)) return existing;
  const index = Math.floor(Math.random() * variants.length);
  const selected = variants[index];
  safeSetItem(key, selected);
  return selected;
}

export function isRolloutEnabled(flagKey, rolloutRatio = 1) {
  const ratio = Number.isFinite(rolloutRatio) ? rolloutRatio : 1;
  const bounded = Math.max(0, Math.min(1, ratio));

  const key = `${STORAGE_PREFIX}flag:${flagKey}`;
  const existing = safeGetItem(key);
  if (existing === '1') return true;
  if (existing === '0') return false;

  const enabled = Math.random() < bounded;
  safeSetItem(key, enabled ? '1' : '0');
  return enabled;
}

export function trackEvent(name, props = {}) {
  const analyticsUrl = import.meta.env.VITE_ANALYTICS_URL;
  const payload = {
    name,
    props,
    anonId: getAnonId(),
    path: globalThis.location?.pathname || '/',
    search: globalThis.location?.search || '',
    referrer: document?.referrer || '',
    timestamp: new Date().toISOString(),
  };

  if (!analyticsUrl) {
    if (import.meta.env.DEV) {
      console.debug('[analytics]', payload);
    }
    return;
  }

  const body = JSON.stringify(payload);
  try {
    if (navigator?.sendBeacon) {
      navigator.sendBeacon(analyticsUrl, new Blob([body], { type: 'application/json' }));
      return;
    }
  } catch {}

  fetch(analyticsUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: true,
  }).catch(() => {});
}
