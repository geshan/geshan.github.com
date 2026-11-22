const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const SITE_DIR = path.join(__dirname, '..', '_site');

const SAMPLE_PAGES = [
  'index.html',
  'posts/1/index.html',
  'blog/categories/index.html',
  'about/index.html',
];

function findFirstPostHtml() {
  const blogDir = path.join(SITE_DIR, 'blog');
  if (!fs.existsSync(blogDir)) return null;
  const years = fs.readdirSync(blogDir).filter((d) => /^\d{4}$/.test(d)).sort().reverse();
  for (const year of years) {
    const yearDir = path.join(blogDir, year);
    const months = fs.readdirSync(yearDir).filter((d) => /^\d{2}$/.test(d)).sort().reverse();
    for (const month of months) {
      const monthDir = path.join(yearDir, month);
      const slugs = fs.readdirSync(monthDir);
      for (const slug of slugs) {
        const candidate = path.join(monthDir, slug, 'index.html');
        if (fs.existsSync(candidate)) {
          return path.relative(SITE_DIR, candidate);
        }
      }
    }
  }
  return null;
}

test('built pages include color-scheme meta, FOUC script, theme toggle, and theme.js', () => {
  const postPage = findFirstPostHtml();
  assert.ok(postPage, 'Expected at least one built blog post HTML file in _site/blog/');

  const pages = [...SAMPLE_PAGES, postPage];
  for (const relPath of pages) {
    const fullPath = path.join(SITE_DIR, relPath);
    assert.ok(fs.existsSync(fullPath), `Expected built page ${relPath} to exist`);
    const html = fs.readFileSync(fullPath, 'utf8');

    assert.match(
      html,
      /<meta\s+name=["']?color-scheme["']?\s+content=["']light dark["']/i,
      `${relPath}: missing <meta name="color-scheme" content="light dark">`
    );
    assert.match(
      html,
      /localStorage\.getItem\(["']color-scheme["']\)/,
      `${relPath}: missing blocking FOUC-prevention inline script`
    );
    assert.match(
      html,
      /data-theme-toggle/,
      `${relPath}: missing top-right theme toggle button`
    );
    assert.match(
      html,
      /Switch to dark theme/i,
      `${relPath}: missing accessible dark theme label`
    );
    assert.match(
      html,
      /Switch to light theme/i,
      `${relPath}: missing accessible light theme label`
    );
    assert.match(
      html,
      /<script[^>]+src=["']?\/js\/theme\.js["']?[^>]*defer/i,
      `${relPath}: missing deferred /js/theme.js script`
    );
  }
});

test('built CSS contains semantic dark mode tokens and color-scheme rules', () => {
  const cssPath = path.join(SITE_DIR, 'css', 'tw-006.css');
  assert.ok(fs.existsSync(cssPath), 'Expected compiled CSS at _site/css/tw-006.css');
  const css = fs.readFileSync(cssPath, 'utf8');

  assert.match(css, /color-scheme:\s*light dark/, 'Compiled CSS missing color-scheme: light dark');
  assert.match(css, /--surface-canvas-dark:/, 'Compiled CSS missing --surface-canvas-dark token');
  assert.match(css, /light-dark\(/, 'Compiled CSS missing light-dark() token resolution');
  assert.match(css, /\.theme-toggle/, 'Compiled CSS missing .theme-toggle styles');
});

test('internal docs and tests are excluded from built _site output', () => {
  assert.equal(
    fs.existsSync(path.join(SITE_DIR, 'CONTEXT', 'index.html')),
    false,
    'CONTEXT.md must not be published into _site/'
  );
  assert.equal(
    fs.existsSync(path.join(SITE_DIR, 'docs')),
    false,
    'docs/ must not be published into _site/'
  );
  assert.equal(
    fs.existsSync(path.join(SITE_DIR, 'test')),
    false,
    'test/ must not be published into _site/'
  );
});

test('homepage does not use hardcoded light-only inline gradient or light-only white nav', () => {
  const html = fs.readFileSync(path.join(SITE_DIR, 'index.html'), 'utf8');
  assert.doesNotMatch(
    html,
    /#DEF6BC/i,
    'Homepage still contains hardcoded light-only #DEF6BC inline gradient'
  );
  assert.match(html, /conference-logos/, 'Homepage missing conference-logos wrapper for dark theme');
});
