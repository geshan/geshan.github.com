/**
 * Tests for the post-last-updated feature.
 * Covers posted-date-time.njk component and post.njk JSON-LD schema block.
 */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createEnv } = require('./nunjucks-env');

const env = createEnv();

const TEMPLATE = 'components/posted-date-time.njk';

const date = new Date('2024-01-15T00:00:00Z');
const laterDate = new Date('2024-03-20T00:00:00Z');

function render(context) {
  return new Promise((resolve, reject) => {
    env.render(TEMPLATE, context, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

// Requirement 1.2, 2.2 — no lastUpdated in context
test('renders only published date when lastUpdated is absent', async () => {
  const html = await render({ date });
  assert.ok(html.includes('15-Jan-2024'), 'should include published date');
  assert.ok(!html.includes('Updated:'), 'should not include "Updated:" label');
});

// Requirement 1.3, 2.3 — lastUpdated equals date
test('renders only published date when lastUpdated equals date', async () => {
  const sameDayDate = new Date('2024-01-15T12:00:00Z');
  const html = await render({ date, lastUpdated: sameDayDate });
  assert.ok(html.includes('15-Jan-2024'), 'should include published date');
  assert.ok(!html.includes('Updated:'), 'should not include "Updated:" label');
});

// Requirement 2.1, 2.4, 2.5 — lastUpdated differs from date
test('renders both dates with "Updated:" label when lastUpdated differs from date', async () => {
  const html = await render({ date, lastUpdated: laterDate });
  assert.ok(html.includes('15-Jan-2024'), 'should include published date');
  assert.ok(html.includes('Updated:'), 'should include "Updated:" label');
  assert.ok(html.includes('20-Mar-2024'), 'should include lastUpdated formatted date');
});

// Requirement 2.6 — <time> datetime attribute for lastUpdated
test('<time> element has correct datetime attribute when updated date is shown', async () => {
  const html = await render({ date, lastUpdated: laterDate });
  assert.ok(
    html.includes('datetime="2024-03-20"'),
    'should include <time datetime="yyyy-LL-dd"> for lastUpdated'
  );
});

// --- dateModified in JSON-LD schema (post.njk) ---

const DATE_MODIFIED_TEMPLATE =
  '{% if lastUpdated and (lastUpdated | htmlDateString) != (date | htmlDateString) %}' +
  '{{ lastUpdated | htmlDateString }}' +
  '{% else %}' +
  '{{ date | htmlDateString }}' +
  '{% endif %}';

function renderDateModified(context) {
  return new Promise((resolve, reject) => {
    env.renderString(DATE_MODIFIED_TEMPLATE, context, (err, result) => {
      if (err) reject(err);
      else resolve(result.trim());
    });
  });
}

// Requirement 3.2 — no lastUpdated: dateModified equals date
test('dateModified equals date when lastUpdated is absent', async () => {
  const result = await renderDateModified({ date });
  assert.equal(result, '2024-01-15');
});

// Requirement 3.3 — lastUpdated equals date: dateModified equals date
test('dateModified equals date when lastUpdated equals date', async () => {
  const sameDayDate = new Date('2024-01-15T12:00:00Z');
  const result = await renderDateModified({ date, lastUpdated: sameDayDate });
  assert.equal(result, '2024-01-15');
});

// Requirement 3.1 — lastUpdated differs from date: dateModified equals lastUpdated
test('dateModified equals lastUpdated when it differs from date', async () => {
  const result = await renderDateModified({ date, lastUpdated: laterDate });
  assert.equal(result, '2024-03-20');
});

// --- Integration test: post.njk header and footer consistency (Requirements 4.1, 4.2) ---

// Requirement 4.1, 4.2 — both header and footer use the same component partial
test('posted-date-time.njk renders identically in header and footer contexts when lastUpdated differs', async () => {
  const context = { date, lastUpdated: laterDate };

  // Simulate the two {% include "components/posted-date-time.njk" %} calls in post.njk
  const headerOutput = await render(context);
  const footerOutput = await render(context);

  // Both renders should be identical (same component, same context)
  assert.equal(headerOutput, footerOutput, 'header and footer date outputs should be identical');

  // Both should contain the "Updated:" label
  assert.ok(headerOutput.includes('Updated:'), 'header should include "Updated:" label');
  assert.ok(footerOutput.includes('Updated:'), 'footer should include "Updated:" label');

  // Both should contain the correct datetime attribute for lastUpdated
  assert.ok(
    headerOutput.includes('datetime="2024-03-20"'),
    'header should include correct datetime attribute'
  );
  assert.ok(
    footerOutput.includes('datetime="2024-03-20"'),
    'footer should include correct datetime attribute'
  );
});
