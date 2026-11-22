const test = require('node:test');
const assert = require('node:assert/strict');
const { createThemeController } = require('../js/theme');

function createFakeEnv({ systemDark = false, stored = null } = {}) {
  const store = new Map();
  if (stored !== null) {
    store.set('color-scheme', stored);
  }

  const storage = {
    getItem(key) {
      return store.has(key) ? store.get(key) : null;
    },
    setItem(key, value) {
      store.set(key, String(value));
    },
    removeItem(key) {
      store.delete(key);
    },
  };

  let isDark = systemDark;
  const listeners = new Set();
  const mql = {
    get matches() {
      return isDark;
    },
    addEventListener(type, fn) {
      if (type === 'change') listeners.add(fn);
    },
    removeEventListener(type, fn) {
      if (type === 'change') listeners.delete(fn);
    },
  };

  const metaEl = { content: 'light dark' };

  return {
    storage,
    matchMedia: () => mql,
    metaEl,
    setSystemDark(next) {
      isDark = next;
      for (const fn of listeners) {
        fn({ matches: isDark });
      }
    },
  };
}

test('resolves Active Theme from system preference when no Theme Override is stored', () => {
  const lightEnv = createFakeEnv({ systemDark: false });
  const lightController = createThemeController(lightEnv);
  assert.equal(lightController.getOverride(), null);
  assert.equal(lightController.getActiveTheme(), 'light');
  assert.equal(lightEnv.metaEl.content, 'light dark');

  const darkEnv = createFakeEnv({ systemDark: true });
  const darkController = createThemeController(darkEnv);
  assert.equal(darkController.getOverride(), null);
  assert.equal(darkController.getActiveTheme(), 'dark');
  assert.equal(darkEnv.metaEl.content, 'light dark');
});

test('toggling stores Theme Override when diverging from OS and clears it when returning to OS', () => {
  const env = createFakeEnv({ systemDark: false });
  const controller = createThemeController(env);

  // OS is light: toggle -> dark override stored
  const first = controller.toggle();
  assert.deepEqual(first, { override: 'dark', activeTheme: 'dark' });
  assert.equal(env.storage.getItem('color-scheme'), 'dark');
  assert.equal(env.metaEl.content, 'dark');

  // OS switches to dark while dark override is active: MUST keep stored override
  env.setSystemDark(true);
  assert.equal(env.storage.getItem('color-scheme'), 'dark');
  assert.equal(controller.getOverride(), 'dark');
  assert.equal(controller.getActiveTheme(), 'dark');

  // OS switches back to light: dark override stays pinned
  env.setSystemDark(false);
  assert.equal(controller.getActiveTheme(), 'dark');
  assert.equal(env.metaEl.content, 'dark');

  // User toggles again -> target (light) matches OS (light) -> override cleared
  const second = controller.toggle();
  assert.deepEqual(second, { override: null, activeTheme: 'light' });
  assert.equal(env.storage.getItem('color-scheme'), null);
  assert.equal(env.metaEl.content, 'light dark');
});

test('handles dark OS start, invalid stored values, and blocked localStorage gracefully', () => {
  const darkEnv = createFakeEnv({ systemDark: true, stored: 'invalid-value' });
  const darkController = createThemeController(darkEnv);
  assert.equal(darkController.getOverride(), null);
  assert.equal(darkController.getActiveTheme(), 'dark');

  assert.deepEqual(darkController.toggle(), { override: 'light', activeTheme: 'light' });
  assert.equal(darkEnv.metaEl.content, 'light');

  const throwingStorage = {
    getItem() {
      throw new Error('SecurityError');
    },
    setItem() {
      throw new Error('QuotaExceededError');
    },
    removeItem() {
      throw new Error('SecurityError');
    },
  };
  const blockedEnv = createFakeEnv({ systemDark: false });
  const blockedController = createThemeController({
    ...blockedEnv,
    storage: throwingStorage,
  });
  assert.equal(blockedController.getActiveTheme(), 'light');
  assert.deepEqual(blockedController.toggle(), { override: 'dark', activeTheme: 'dark' });
  assert.equal(blockedEnv.metaEl.content, 'dark');
});

test('syncs Theme Override across tabs and notifies onThemeApplied on active theme changes', () => {
  const env = createFakeEnv({ systemDark: false });
  const applied = [];
  const controller = createThemeController({
    ...env,
    onThemeApplied(theme) {
      applied.push(theme);
    },
  });

  // Another tab stores 'dark'
  env.storage.setItem('color-scheme', 'dark');
  controller.syncFromStorage();
  assert.equal(controller.getOverride(), 'dark');
  assert.equal(controller.getActiveTheme(), 'dark');
  assert.equal(env.metaEl.content, 'dark');
  assert.deepEqual(applied, ['dark']);

  // Another tab clears override -> reverts to OS (light)
  env.storage.removeItem('color-scheme');
  controller.syncFromStorage();
  assert.equal(controller.getOverride(), null);
  assert.equal(controller.getActiveTheme(), 'light');
  assert.equal(env.metaEl.content, 'light dark');
  assert.deepEqual(applied, ['dark', 'light']);

  // OS switches to dark while following OS -> notifies callback
  env.setSystemDark(true);
  assert.equal(controller.getActiveTheme(), 'dark');
  assert.deepEqual(applied, ['dark', 'light', 'dark']);

  controller.destroy();
});
