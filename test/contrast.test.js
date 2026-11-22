const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const CSS_PATH = path.join(__dirname, '..', 'style', 'tailwind.css');

function parseColorTokens(css) {
  const tokens = new Map();
  const re = /--([a-z0-9-]+):\s*(#[0-9a-fA-F]{6})\b/g;
  let match;
  while ((match = re.exec(css)) !== null) {
    tokens.set(match[1], match[2].toLowerCase());
  }
  return tokens;
}

function contrastRatio(fgHex, bgHex) {
  const toLuminance = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    const linear = [r, g, b].map((c) =>
      c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    );
    return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
  };
  const l1 = toLuminance(fgHex);
  const l2 = toLuminance(bgHex);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

const TEXT_PAIRINGS = [
  ['text-strong', 'surface-canvas'],
  ['text-body', 'surface-canvas'],
  ['text-muted', 'surface-canvas'],
  ['text-accent', 'surface-canvas'],
  ['text-strong', 'surface-tinted'],
  ['text-body', 'surface-tinted'],
  ['text-muted', 'surface-tinted'],
  ['text-accent', 'surface-tinted'],
  ['text-strong', 'surface-accent'],
  ['text-body', 'surface-accent'],
  ['text-muted', 'surface-accent'],
  ['text-strong', 'surface-elevated'],
  ['text-body', 'surface-elevated'],
  ['text-muted', 'surface-elevated'],
  ['text-strong', 'surface-subtle'],
  ['text-body', 'surface-subtle'],
  ['text-muted', 'surface-subtle'],
  ['text-on-accent', 'fill-accent'],
  ['text-blockquote', 'surface-canvas'],
  ['code-text', 'surface-code'],
  ['code-comment', 'surface-code'],
  ['code-keyword', 'surface-code'],
  ['code-string', 'surface-code'],
  ['code-function', 'surface-code'],
  ['code-number', 'surface-code'],
];

const UI_PAIRINGS = [
  ['border-strong', 'surface-canvas'],
  ['border-strong', 'surface-tinted'],
  ['fill-accent', 'surface-canvas'],
  ['fill-accent', 'surface-accent'],
];

test('light and dark semantic color tokens in style/tailwind.css meet WCAG AA contrast', () => {
  const css = fs.readFileSync(CSS_PATH, 'utf8');
  const tokens = parseColorTokens(css);

  for (const mode of ['light', 'dark']) {
    for (const [fg, bg] of TEXT_PAIRINGS) {
      const fgKey = `${fg}-${mode}`;
      const bgKey = `${bg}-${mode}`;
      assert.ok(tokens.has(fgKey), `Missing CSS token --${fgKey}`);
      assert.ok(tokens.has(bgKey), `Missing CSS token --${bgKey}`);
      const ratio = contrastRatio(tokens.get(fgKey), tokens.get(bgKey));
      assert.ok(
        ratio >= 4.5,
        `Expected ${fgKey} (${tokens.get(fgKey)}) on ${bgKey} (${tokens.get(bgKey)}) to be >= 4.5:1, got ${ratio.toFixed(2)}:1`
      );
    }

    for (const [fg, bg] of UI_PAIRINGS) {
      const fgKey = `${fg}-${mode}`;
      const bgKey = `${bg}-${mode}`;
      assert.ok(tokens.has(fgKey), `Missing CSS token --${fgKey}`);
      assert.ok(tokens.has(bgKey), `Missing CSS token --${bgKey}`);
      const ratio = contrastRatio(tokens.get(fgKey), tokens.get(bgKey));
      assert.ok(
        ratio >= 3.0,
        `Expected UI token ${fgKey} (${tokens.get(fgKey)}) on ${bgKey} (${tokens.get(bgKey)}) to be >= 3.0:1, got ${ratio.toFixed(2)}:1`
      );
    }
  }
});
