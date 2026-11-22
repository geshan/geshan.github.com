(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) {
    module.exports = api;
  } else {
    root.BlogTheme = api;
    api.initBrowserTheme();
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  var STORAGE_KEY = 'color-scheme';
  var VALID_THEMES = { light: true, dark: true };

  function readOverride(storage) {
    if (!storage) return null;
    try {
      var val = storage.getItem(STORAGE_KEY);
      return VALID_THEMES[val] ? val : null;
    } catch (_e) {
      return null;
    }
  }

  function writeOverride(storage, value) {
    if (!storage) return;
    try {
      if (value) {
        storage.setItem(STORAGE_KEY, value);
      } else {
        storage.removeItem(STORAGE_KEY);
      }
    } catch (_e) {
      // Storage may be unavailable or blocked; keep in-memory state working.
    }
  }

  function createThemeController(options) {
    var storage = options.storage;
    var matchMedia = options.matchMedia;
    var metaEl = options.metaEl;
    var onThemeApplied = typeof options.onThemeApplied === 'function' ? options.onThemeApplied : null;
    var mediaQuery = typeof matchMedia === 'function' ? matchMedia('(prefers-color-scheme: dark)') : null;
    var currentOverride = readOverride(storage);

    function getSystemTheme() {
      return mediaQuery && mediaQuery.matches ? 'dark' : 'light';
    }

    function getOverride() {
      return currentOverride;
    }

    function getActiveTheme() {
      return currentOverride || getSystemTheme();
    }

    function syncMeta() {
      if (metaEl) {
        metaEl.content = currentOverride || 'light dark';
      }
    }

    var lastNotifiedTheme = getActiveTheme();

    function notifyIfChanged() {
      var active = getActiveTheme();
      if (active !== lastNotifiedTheme) {
        lastNotifiedTheme = active;
        if (onThemeApplied) {
          onThemeApplied(active);
        }
      }
    }

    function toggle() {
      var target = getActiveTheme() === 'dark' ? 'light' : 'dark';
      currentOverride = target === getSystemTheme() ? null : target;
      writeOverride(storage, currentOverride);
      syncMeta();
      notifyIfChanged();
      return {
        override: currentOverride,
        activeTheme: getActiveTheme(),
      };
    }

    function syncFromStorage() {
      currentOverride = readOverride(storage);
      syncMeta();
      notifyIfChanged();
      return {
        override: currentOverride,
        activeTheme: getActiveTheme(),
      };
    }

    function handleSystemChange() {
      // Do NOT clear any stored Theme Override when OS preference changes.
      notifyIfChanged();
    }

    if (mediaQuery && typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleSystemChange);
    }

    function destroy() {
      if (mediaQuery && typeof mediaQuery.removeEventListener === 'function') {
        mediaQuery.removeEventListener('change', handleSystemChange);
      }
    }

    syncMeta();

    return {
      getOverride: getOverride,
      getActiveTheme: getActiveTheme,
      toggle: toggle,
      syncFromStorage: syncFromStorage,
      destroy: destroy,
    };
  }

  function initBrowserTheme() {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return null;
    }

    var metaEl = document.querySelector('meta[name="color-scheme"]');
    var controller = createThemeController({
      storage: (function () {
        try {
          return window.localStorage;
        } catch (_e) {
          return null;
        }
      })(),
      matchMedia: typeof window.matchMedia === 'function' ? window.matchMedia.bind(window) : null,
      metaEl: metaEl,
      onThemeApplied: function () {
        if (typeof window.DISQUS !== 'undefined' && typeof window.DISQUS.reset === 'function') {
          window.DISQUS.reset({ reload: true });
        }
      },
    });

    function bindButtons() {
      var buttons = document.querySelectorAll('[data-theme-toggle]');
      buttons.forEach(function (btn) {
        if (btn.dataset.themeBound) return;
        btn.dataset.themeBound = 'true';
        btn.addEventListener('click', function () {
          controller.toggle();
        });
      });
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', bindButtons);
    } else {
      bindButtons();
    }

    window.addEventListener('storage', function (event) {
      if (event.key === null || event.key === STORAGE_KEY) {
        controller.syncFromStorage();
      }
    });

    return controller;
  }

  return {
    STORAGE_KEY: STORAGE_KEY,
    createThemeController: createThemeController,
    initBrowserTheme: initBrowserTheme,
  };
});
