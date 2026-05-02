"use strict";

const { test } = require("node:test");
const assert = require("node:assert/strict");
const fc = require("fast-check");
const isSameDay = require("../_11ty/isSameDay");

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Arbitrary that generates a Date at a random millisecond within a given UTC
 * calendar day (expressed as a Unix-day offset from the epoch).
 */
const utcDayArb = fc.integer({ min: 0, max: 365 * 50 }); // ~50 years of days

/** Given a UTC day index, return a random Date within that day. */
function dateOnDay(dayIndex, timeMs) {
  // dayIndex * 86400000 = start of that UTC day; timeMs is offset within the day
  return new Date(dayIndex * 86_400_000 + timeMs);
}

const timeOfDayArb = fc.integer({ min: 0, max: 86_399_999 }); // ms within a day

// ---------------------------------------------------------------------------
// Property 1: isSameDay correctly identifies same UTC calendar day
// Validates: Requirements 3.1
// ---------------------------------------------------------------------------

test(
  "Feature: post-last-updated, Property 1: isSameDay correctly identifies same UTC calendar day",
  () => {
    fc.assert(
      fc.property(
        utcDayArb,
        timeOfDayArb,
        timeOfDayArb,
        (dayIndex, timeA, timeB) => {
          const dateA = dateOnDay(dayIndex, timeA);
          const dateB = dateOnDay(dayIndex, timeB);
          assert.equal(
            isSameDay(dateA, dateB),
            true,
            `Expected isSameDay to return true for two dates on the same UTC day (day ${dayIndex})`
          );
        }
      ),
      { numRuns: 100 }
    );
  }
);

// ---------------------------------------------------------------------------
// Property 2: isSameDay correctly identifies different UTC calendar days
// Validates: Requirements 3.1
// ---------------------------------------------------------------------------

test(
  "Feature: post-last-updated, Property 2: isSameDay correctly identifies different UTC calendar days",
  () => {
    fc.assert(
      fc.property(
        utcDayArb,
        // Ensure the second day is different from the first (offset ≥ 1)
        fc.integer({ min: 1, max: 365 * 50 }),
        timeOfDayArb,
        timeOfDayArb,
        (dayA, offset, timeA, timeB) => {
          const dayB = dayA + offset;
          const dateA = dateOnDay(dayA, timeA);
          const dateB = dateOnDay(dayB, timeB);
          assert.equal(
            isSameDay(dateA, dateB),
            false,
            `Expected isSameDay to return false for dates on different UTC days (${dayA} vs ${dayB})`
          );
        }
      ),
      { numRuns: 100 }
    );
  }
);

// ---------------------------------------------------------------------------
// Property 3: Null/undefined inputs to isSameDay return false
// Validates: Requirements 3.2
// ---------------------------------------------------------------------------

test(
  "Feature: post-last-updated, Property 3: Null/undefined inputs to isSameDay return false",
  () => {
    const nullishArb = fc.constantFrom(null, undefined);
    const validDateArb = fc.date();

    fc.assert(
      fc.property(validDateArb, nullishArb, (validDate, nullish) => {
        // valid + nullish
        assert.equal(
          isSameDay(validDate, nullish),
          false,
          "Expected false when second argument is null/undefined"
        );
        // nullish + valid
        assert.equal(
          isSameDay(nullish, validDate),
          false,
          "Expected false when first argument is null/undefined"
        );
        // both nullish
        assert.equal(
          isSameDay(nullish, nullish),
          false,
          "Expected false when both arguments are null/undefined"
        );
      }),
      { numRuns: 100 }
    );
  }
);

// ---------------------------------------------------------------------------
// Pure JS helper that mirrors the posted-date-time.njk template logic.
// Accepts { date, lastUpdated } and returns an HTML string.
// ---------------------------------------------------------------------------

const { DateTime } = require("luxon");

/**
 * Format a Date as yyyy-LL-dd (getSitemapDate equivalent).
 * @param {Date} d
 * @returns {string}
 */
function getSitemapDate(d) {
  return DateTime.fromJSDate(d, { zone: "utc" }).toISODate();
}

/**
 * Format a Date as dd-LLL-yyyy (displayDateOnly equivalent).
 * @param {Date} d
 * @returns {string}
 */
function displayDateOnly(d) {
  return DateTime.fromJSDate(d, { zone: "utc" }).toFormat("dd-LLL-yyyy");
}

/**
 * Render the posted-date-time component logic as a pure JS function.
 * Mirrors the Nunjucks template in _includes/components/posted-date-time.njk.
 *
 * @param {{ date: Date, lastUpdated?: Date|null }} params
 * @returns {string} HTML string
 */
function renderPostedDateTime({ date, lastUpdated }) {
  let html = "";

  if (date) {
    const sitemapDate = getSitemapDate(date);
    const displayDate = displayDateOnly(date);
    html += `<time datetime="${sitemapDate}" data-updated="true">`;
    html += `<time class="entry-date" datetime="${sitemapDate}">`;
    html += `<span class="text-textColor font-ui font-medium text-md md:text-xl uppercase"> ${displayDate} </span>`;
    html += `</time>`;
    html += `</time>`;
  }

  if (lastUpdated && !isSameDay(date, lastUpdated)) {
    const sitemapUpdated = getSitemapDate(lastUpdated);
    const displayUpdated = displayDateOnly(lastUpdated);
    html += `<time class="entry-date" datetime="${sitemapUpdated}">`;
    html += `<span class="text-textColor font-ui font-medium text-md md:text-xl uppercase">UPDATED: ${displayUpdated}</span>`;
    html += `</time>`;
  }

  return html;
}

// ---------------------------------------------------------------------------
// Property 4: Updated date is displayed when dates differ by at least one day
// Validates: Requirements 2.1, 2.2, 2.3
// ---------------------------------------------------------------------------

test(
  "Feature: post-last-updated, Property 4: Updated date is displayed when dates differ by at least one calendar day",
  () => {
    fc.assert(
      fc.property(
        // date: any UTC day in a reasonable range
        utcDayArb,
        // offset: at least 1 day after date
        fc.integer({ min: 1, max: 365 * 10 }),
        timeOfDayArb,
        timeOfDayArb,
        (dayIndex, offset, timeA, timeB) => {
          const date = dateOnDay(dayIndex, timeA);
          const lastUpdated = dateOnDay(dayIndex + offset, timeB);

          const html = renderPostedDateTime({ date, lastUpdated });

          const expectedFormattedDate = displayDateOnly(lastUpdated);

          assert.ok(
            html.includes("UPDATED"),
            `Expected output to contain "UPDATED" label when lastUpdated differs from date`
          );
          assert.ok(
            html.includes(expectedFormattedDate),
            `Expected output to contain formatted lastUpdated date "${expectedFormattedDate}"`
          );
        }
      ),
      { numRuns: 100 }
    );
  }
);

// ---------------------------------------------------------------------------
// Property 5: Updated date <time> element has correct datetime attribute
// Validates: Requirements 2.4
// ---------------------------------------------------------------------------

test(
  "Feature: post-last-updated, Property 5: Updated date <time> element has correct datetime attribute",
  () => {
    fc.assert(
      fc.property(
        utcDayArb,
        fc.integer({ min: 1, max: 365 * 10 }),
        timeOfDayArb,
        timeOfDayArb,
        (dayIndex, offset, timeA, timeB) => {
          const date = dateOnDay(dayIndex, timeA);
          const lastUpdated = dateOnDay(dayIndex + offset, timeB);

          const html = renderPostedDateTime({ date, lastUpdated });

          const expectedDatetime = getSitemapDate(lastUpdated); // yyyy-LL-dd

          // The second <time> element (for updated date) should have datetime=expectedDatetime
          // We check that the html contains a <time> element with that exact datetime value
          assert.ok(
            html.includes(`datetime="${expectedDatetime}"`),
            `Expected output to contain <time datetime="${expectedDatetime}"> for lastUpdated`
          );
        }
      ),
      { numRuns: 100 }
    );
  }
);

// ---------------------------------------------------------------------------
// Property 6: No updated date rendered when lastUpdated absent or same day
// Validates: Requirements 1.2, 1.3, 6.1
// ---------------------------------------------------------------------------

test(
  "Feature: post-last-updated, Property 6: No updated date rendered when lastUpdated absent or same day",
  () => {
    // Case A: lastUpdated is absent (null or undefined)
    fc.assert(
      fc.property(
        utcDayArb,
        timeOfDayArb,
        fc.constantFrom(null, undefined),
        (dayIndex, timeA, lastUpdated) => {
          const date = dateOnDay(dayIndex, timeA);
          const html = renderPostedDateTime({ date, lastUpdated });

          assert.ok(
            !html.includes("UPDATED"),
            `Expected no "UPDATED" label when lastUpdated is absent`
          );
          // Should only have one <time class="entry-date"> element (the published date)
          const entryDateMatches = html.match(/class="entry-date"/g) || [];
          assert.equal(
            entryDateMatches.length,
            1,
            `Expected exactly one entry-date <time> element when lastUpdated is absent`
          );
        }
      ),
      { numRuns: 100 }
    );

    // Case B: lastUpdated is the same UTC calendar day as date
    fc.assert(
      fc.property(
        utcDayArb,
        timeOfDayArb,
        timeOfDayArb,
        (dayIndex, timeA, timeB) => {
          const date = dateOnDay(dayIndex, timeA);
          const lastUpdated = dateOnDay(dayIndex, timeB); // same day, different time

          const html = renderPostedDateTime({ date, lastUpdated });

          assert.ok(
            !html.includes("UPDATED"),
            `Expected no "UPDATED" label when lastUpdated is the same calendar day as date`
          );
          // Should only have one <time class="entry-date"> element (the published date)
          const entryDateMatches = html.match(/class="entry-date"/g) || [];
          assert.equal(
            entryDateMatches.length,
            1,
            `Expected exactly one entry-date <time> element when lastUpdated is same day as date`
          );
        }
      ),
      { numRuns: 100 }
    );
  }
);

// ---------------------------------------------------------------------------
// Pure JS helper that mirrors the post.njk JSON-LD dateModified conditional.
// ---------------------------------------------------------------------------

/**
 * Format a Date as yyyy-LL-dd (htmlDateString equivalent).
 * @param {Date} d
 * @returns {string}
 */
function htmlDateString(d) {
  return DateTime.fromJSDate(d, { zone: "utc" }).toISODate();
}

/**
 * Compute the dateModified value, mirroring the Nunjucks conditional:
 *   {% if lastUpdated and not (date | isSameDay(lastUpdated)) %}
 *     {{ lastUpdated | htmlDateString }}
 *   {% else %}
 *     {{ date | htmlDateString }}
 *   {% endif %}
 *
 * @param {{ date: Date, lastUpdated?: Date|null }} params
 * @returns {string} yyyy-LL-dd formatted date
 */
function computeDateModified({ date, lastUpdated }) {
  if (lastUpdated && !isSameDay(date, lastUpdated)) {
    return htmlDateString(lastUpdated);
  }
  return htmlDateString(date);
}

// ---------------------------------------------------------------------------
// Property 7: JSON-LD dateModified reflects lastUpdated when dates differ
// Validates: Requirements 4.1
// ---------------------------------------------------------------------------

test(
  "Feature: post-last-updated, Property 7: JSON-LD dateModified reflects lastUpdated when dates differ",
  () => {
    fc.assert(
      fc.property(
        utcDayArb,
        fc.integer({ min: 1, max: 365 * 10 }),
        timeOfDayArb,
        timeOfDayArb,
        (dayIndex, offset, timeA, timeB) => {
          const date = dateOnDay(dayIndex, timeA);
          const lastUpdated = dateOnDay(dayIndex + offset, timeB);

          const dateModified = computeDateModified({ date, lastUpdated });
          const expected = htmlDateString(lastUpdated);

          assert.equal(
            dateModified,
            expected,
            `Expected dateModified to equal lastUpdated (${expected}) when dates differ`
          );
        }
      ),
      { numRuns: 100 }
    );
  }
);

// ---------------------------------------------------------------------------
// Property 8: JSON-LD dateModified falls back to date when no valid lastUpdated
// Validates: Requirements 4.2
// ---------------------------------------------------------------------------

test(
  "Feature: post-last-updated, Property 8: JSON-LD dateModified falls back to date when no valid lastUpdated",
  () => {
    // Case A: lastUpdated is absent (null or undefined)
    fc.assert(
      fc.property(
        utcDayArb,
        timeOfDayArb,
        fc.constantFrom(null, undefined),
        (dayIndex, timeA, lastUpdated) => {
          const date = dateOnDay(dayIndex, timeA);
          const dateModified = computeDateModified({ date, lastUpdated });
          const expected = htmlDateString(date);

          assert.equal(
            dateModified,
            expected,
            `Expected dateModified to equal date (${expected}) when lastUpdated is absent`
          );
        }
      ),
      { numRuns: 100 }
    );

    // Case B: lastUpdated is the same UTC calendar day as date
    fc.assert(
      fc.property(
        utcDayArb,
        timeOfDayArb,
        timeOfDayArb,
        (dayIndex, timeA, timeB) => {
          const date = dateOnDay(dayIndex, timeA);
          const lastUpdated = dateOnDay(dayIndex, timeB); // same day, different time

          const dateModified = computeDateModified({ date, lastUpdated });
          const expected = htmlDateString(date);

          assert.equal(
            dateModified,
            expected,
            `Expected dateModified to equal date (${expected}) when lastUpdated is same calendar day`
          );
        }
      ),
      { numRuns: 100 }
    );
  }
);

// ---------------------------------------------------------------------------
// Pure JS helper that mirrors the feed/feed.njk <updated> conditional logic.
// Uses ISO date strings as a stand-in for rssDate format since we can't run
// the full Eleventy build in tests.
// ---------------------------------------------------------------------------

/**
 * Compute the feed <updated> value, mirroring the Nunjucks conditional:
 *   {% if post.data.lastUpdated and not (post.date | isSameDay(post.data.lastUpdated)) %}
 *     {{ post.data.lastUpdated | rssDate }}
 *   {% else %}
 *     {{ post.date | rssDate }}
 *   {% endif %}
 *
 * Uses ISO date strings (yyyy-LL-dd) as a stand-in for rssDate format.
 *
 * @param {{ date: Date, lastUpdated?: Date|null }} params
 * @returns {string} ISO date string representing the <updated> value
 */
function computeFeedUpdated({ date, lastUpdated }) {
  if (lastUpdated && !isSameDay(date, lastUpdated)) {
    return htmlDateString(lastUpdated);
  }
  return htmlDateString(date);
}

// ---------------------------------------------------------------------------
// Property 9: Atom feed <updated> reflects lastUpdated when dates differ
// Validates: Requirements 5.1
// ---------------------------------------------------------------------------

test(
  "Feature: post-last-updated, Property 9: Atom feed <updated> reflects lastUpdated when dates differ",
  () => {
    fc.assert(
      fc.property(
        utcDayArb,
        fc.integer({ min: 1, max: 365 * 10 }),
        timeOfDayArb,
        timeOfDayArb,
        (dayIndex, offset, timeA, timeB) => {
          const date = dateOnDay(dayIndex, timeA);
          const lastUpdated = dateOnDay(dayIndex + offset, timeB);

          const updated = computeFeedUpdated({ date, lastUpdated });
          const expected = htmlDateString(lastUpdated);

          assert.equal(
            updated,
            expected,
            `Expected feed <updated> to equal lastUpdated (${expected}) when dates differ`
          );
        }
      ),
      { numRuns: 100 }
    );
  }
);

// ---------------------------------------------------------------------------
// Property 10: Atom feed <updated> falls back to date when no valid lastUpdated
// Validates: Requirements 5.2
// ---------------------------------------------------------------------------

test(
  "Feature: post-last-updated, Property 10: Atom feed <updated> falls back to date when no valid lastUpdated",
  () => {
    // Case A: lastUpdated is absent (null or undefined)
    fc.assert(
      fc.property(
        utcDayArb,
        timeOfDayArb,
        fc.constantFrom(null, undefined),
        (dayIndex, timeA, lastUpdated) => {
          const date = dateOnDay(dayIndex, timeA);
          const updated = computeFeedUpdated({ date, lastUpdated });
          const expected = htmlDateString(date);

          assert.equal(
            updated,
            expected,
            `Expected feed <updated> to equal date (${expected}) when lastUpdated is absent`
          );
        }
      ),
      { numRuns: 100 }
    );

    // Case B: lastUpdated is the same UTC calendar day as date
    fc.assert(
      fc.property(
        utcDayArb,
        timeOfDayArb,
        timeOfDayArb,
        (dayIndex, timeA, timeB) => {
          const date = dateOnDay(dayIndex, timeA);
          const lastUpdated = dateOnDay(dayIndex, timeB); // same day, different time

          const updated = computeFeedUpdated({ date, lastUpdated });
          const expected = htmlDateString(date);

          assert.equal(
            updated,
            expected,
            `Expected feed <updated> to equal date (${expected}) when lastUpdated is same calendar day`
          );
        }
      ),
      { numRuns: 100 }
    );
  }
);
