# Implementation Plan: Post Last Updated Date

## Overview

Add a `lastUpdated` frontmatter field to blog posts and surface it in the date component, JSON-LD structured data, and Atom feed. The implementation is purely additive — posts without `lastUpdated` are completely unaffected. Four files are modified: `.eleventy.js`, `_includes/components/posted-date-time.njk`, `_includes/layouts/post.njk`, and `feed/feed.njk`. A test suite using `fast-check` and Node's built-in test runner covers all ten correctness properties.

## Tasks

- [x] 1. Add `isSameDay` filter to `.eleventy.js`
  - Add the `isSameDay` filter to `.eleventy.js` using Luxon's `DateTime.fromJSDate` with `{ zone: "utc" }` and compare `toISODate()` strings
  - Return `false` when either argument is `null` or `undefined`
  - Place the filter alongside the existing date filters (e.g., after `getSitemapDate`)
  - _Requirements: 3.1, 3.2_

  - [ ]* 1.1 Write property test for `isSameDay` — same UTC calendar day (Property 1)
    - **Property 1: `isSameDay` correctly identifies same UTC calendar day**
    - Generate two `Date` objects that share the same UTC calendar day but differ in time-of-day; assert `isSameDay` returns `true`
    - Install `fast-check` as a dev dependency; create `tests/post-last-updated.test.js` using Node's built-in `node:test` runner
    - **Validates: Requirements 3.1**

  - [ ]* 1.2 Write property test for `isSameDay` — different UTC calendar days (Property 2)
    - **Property 2: `isSameDay` correctly identifies different UTC calendar days**
    - Generate two `Date` objects on different UTC calendar days; assert `isSameDay` returns `false`
    - **Validates: Requirements 3.1**

  - [ ]* 1.3 Write property test for `isSameDay` — null/undefined inputs (Property 3)
    - **Property 3: Null/undefined inputs to `isSameDay` return false**
    - Generate one valid `Date` and one `null`/`undefined`; assert `isSameDay` returns `false` for all combinations
    - **Validates: Requirements 3.2**

- [x] 2. Update `_includes/components/posted-date-time.njk` to render the updated date
  - Add a conditional block after the existing published-date `<time>` element: `{% if lastUpdated and not (date | isSameDay(lastUpdated)) %}`
  - Wrap the updated date in a `<time class="entry-date" datetime="{{ lastUpdated | getSitemapDate }}">` element
  - Inside the `<time>`, add a `<span>` with the same CSS classes as the published-date span (`text-textColor font-ui font-medium text-md md:text-xl uppercase`) containing `UPDATED: {{ lastUpdated | displayDateOnly }}`
  - Posts without `lastUpdated` must produce identical HTML output to the current template
  - _Requirements: 1.2, 1.3, 2.1, 2.2, 2.3, 2.4, 2.5, 6.1, 6.2_

  - [ ]* 2.1 Write property test — updated date rendered when dates differ (Property 4)
    - **Property 4: Updated date is displayed when dates differ by at least one calendar day**
    - Generate `(date, lastUpdated)` pairs where `lastUpdated` is at least one UTC day after `date`; render the component template string; assert output contains the formatted `lastUpdated` date and the text "UPDATED"
    - **Validates: Requirements 2.1, 2.2, 2.3**

  - [ ]* 2.2 Write property test — `<time datetime>` attribute correctness (Property 5)
    - **Property 5: Updated date `<time>` element has correct `datetime` attribute**
    - Generate `(date, lastUpdated)` pairs differing by ≥1 day; render the component; assert the `<time>` element's `datetime` attribute equals `lastUpdated` formatted as `yyyy-LL-dd`
    - **Validates: Requirements 2.4**

  - [ ]* 2.3 Write property test — no updated date when `lastUpdated` absent or same day (Property 6)
    - **Property 6: No updated date rendered when `lastUpdated` is absent or same day**
    - Generate posts with absent `lastUpdated` and posts where `lastUpdated` is the same UTC calendar day as `date`; render the component; assert output contains no "UPDATED" label and no second `<time>` element for the updated date
    - **Validates: Requirements 1.2, 1.3, 6.1**

- [x] 3. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Update `_includes/layouts/post.njk` — JSON-LD `dateModified`
  - Replace the static `"dateModified": "{{ date | htmlDateString }}"` line with the conditional: `"dateModified": "{% if lastUpdated and not (date | isSameDay(lastUpdated)) %}{{ lastUpdated | htmlDateString }}{% else %}{{ date | htmlDateString }}{% endif %}"`
  - _Requirements: 4.1, 4.2_

  - [ ]* 4.1 Write property test — `dateModified` reflects `lastUpdated` when dates differ (Property 7)
    - **Property 7: JSON-LD `dateModified` reflects `lastUpdated` when dates differ**
    - Generate `(date, lastUpdated)` pairs differing by ≥1 day; render the layout template string; parse the `application/ld+json` block; assert `dateModified` equals `lastUpdated` formatted as `yyyy-LL-dd`
    - **Validates: Requirements 4.1**

  - [ ]* 4.2 Write property test — `dateModified` falls back to `date` when no valid `lastUpdated` (Property 8)
    - **Property 8: JSON-LD `dateModified` falls back to `date` when no valid `lastUpdated`**
    - Generate posts without `lastUpdated` or with same-day `lastUpdated`; render the layout; parse the JSON-LD block; assert `dateModified` equals `date` formatted as `yyyy-LL-dd`
    - **Validates: Requirements 4.2**

- [x] 5. Update `feed/feed.njk` — Atom feed `<updated>` element
  - Replace `<updated>{{ post.date | rssDate }}</updated>` with the conditional: `<updated>{% if post.data.lastUpdated and not (post.date | isSameDay(post.data.lastUpdated)) %}{{ post.data.lastUpdated | rssDate }}{% else %}{{ post.date | rssDate }}{% endif %}</updated>`
  - _Requirements: 5.1, 5.2_

  - [ ]* 5.1 Write property test — Atom `<updated>` reflects `lastUpdated` when dates differ (Property 9)
    - **Property 9: Atom feed `<updated>` reflects `lastUpdated` when dates differ**
    - Generate `(date, lastUpdated)` pairs differing by ≥1 day; render the feed entry template string; assert the `<updated>` element contains `lastUpdated` in RSS date format
    - **Validates: Requirements 5.1**

  - [ ]* 5.2 Write property test — Atom `<updated>` falls back to `date` when no valid `lastUpdated` (Property 10)
    - **Property 10: Atom feed `<updated>` falls back to `date` when no valid `lastUpdated`**
    - Generate posts without `lastUpdated`; render the feed entry template string; assert the `<updated>` element contains `date` in RSS date format
    - **Validates: Requirements 5.2**

- [x] 6. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- The `isSameDay` filter must be extracted as a plain JS function so it can be imported directly in tests without booting the full Eleventy config
- `fast-check` should be installed as a dev dependency (`npm install --save-dev fast-check`)
- Test file: `tests/post-last-updated.test.js` using Node's built-in `node:test` runner (no additional test runner needed)
- All template rendering in tests can be done by extracting the conditional logic into a pure JS helper rather than spinning up a full Eleventy build
- Property tests validate universal correctness; unit tests (same file) cover specific edge cases listed in the design's Testing Strategy section
- Each property test references its property number from the design document for traceability
