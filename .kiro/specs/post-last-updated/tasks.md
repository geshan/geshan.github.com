# Implementation Plan: Post Last Updated

## Overview

Implement the "last updated" date display feature for blog posts. This involves updating the `posted-date-time.njk` component to conditionally render a last updated date, updating the `post.njk` layout's JSON-LD schema block, and adding tests using the nunjucks package and fast-check for property-based testing.

## Tasks

- [x] 1. Update `posted-date-time.njk` component to conditionally display last updated date
  - Add `showUpdated` condition using `{% set showUpdated = lastUpdated and (lastUpdated | htmlDateString) != (date | htmlDateString) %}`
  - When `showUpdated` is true, render an additional `<time>` element with an "Updated:" label, using `readableDate` format and `htmlDateString` for the `datetime` attribute
  - When `showUpdated` is false, render only the existing published date (no change to current output)
  - _Requirements: 1.1, 1.2, 1.3, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

- [x] 2. Update JSON-LD schema in `post.njk` to use `lastUpdated` for `dateModified`
  - Replace the hardcoded `{{ date | htmlDateString }}` in the `"dateModified"` field with a conditional that outputs `lastUpdated | htmlDateString` when `lastUpdated` is present and differs from `date`, otherwise falls back to `date | htmlDateString`
  - _Requirements: 3.1, 3.2, 3.3_

- [x] 3. Set up test infrastructure for template rendering tests
  - Install `fast-check` as a dev dependency if not already present
  - Create a test helper that configures a Nunjucks environment with the same filters as `.eleventy.js` (`readableDate`, `htmlDateString`, `displayDateOnly`, `getSitemapDate`)
  - Create test file `tests/post-last-updated.test.js`
  - _Requirements: 1.1, 2.1, 3.1_

- [x] 4. Write example-based unit tests for the component
  - [x] 4.1 Implement unit tests for `posted-date-time.njk`
    - Test: renders only published date when `lastUpdated` is absent
    - Test: renders only published date when `lastUpdated` equals `date`
    - Test: renders both dates with "Updated:" label when `lastUpdated` differs from `date`
    - Test: `<time>` element has correct `datetime` attribute when updated date is shown
    - _Requirements: 1.2, 1.3, 2.2, 2.3, 2.4, 2.5, 2.6_

  - [ ]* 4.2 Write property test for `posted-date-time.njk` rendering (Property 1)
    - **Property 1: Component renders both dates correctly when they differ**
    - Generate random `(date, lastUpdated)` pairs where `htmlDateString(date) !== htmlDateString(lastUpdated)` using fast-check
    - Assert rendered output contains published date in `dd-LLL-yyyy` format
    - Assert rendered output contains updated date in `dd-LLL-yyyy` format
    - Assert rendered output includes visible "Updated:" label
    - Assert rendered output includes `<time datetime="yyyy-LL-dd">` for `lastUpdated`
    - Run minimum 100 iterations
    - **Validates: Requirements 2.1, 2.4, 2.5, 2.6**

- [x] 5. Write example-based unit tests for the JSON-LD schema block
  - [x] 5.1 Implement unit tests for `dateModified` in `post.njk` schema
    - Test: `dateModified` equals `date` when `lastUpdated` is absent
    - Test: `dateModified` equals `date` when `lastUpdated` equals `date`
    - Test: `dateModified` equals `lastUpdated` when it differs from `date`
    - _Requirements: 3.1, 3.2, 3.3_

  - [ ]* 5.2 Write property test for schema `dateModified` (Property 2)
    - **Property 2: Schema `dateModified` reflects `lastUpdated` when it differs from `date`**
    - Generate random `(date, lastUpdated)` pairs where they differ using fast-check
    - Render the JSON-LD schema block from `post.njk` with the generated context
    - Assert `"dateModified"` value equals `htmlDateString(lastUpdated)`
    - Run minimum 100 iterations
    - **Validates: Requirements 3.1**

- [x] 6. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. Write integration test for post header and footer consistency
  - [x] 7.1 Implement integration test for `post.njk` layout
    - Render the full `post.njk` layout with a context where `lastUpdated` differs from `date`
    - Assert the updated date appears in both the header and footer metadata sections
    - Assert both occurrences use the same `posted-date-time.njk` output
    - _Requirements: 4.1, 4.2_

  - [ ]* 7.2 Write unit tests for post layout date consistency
    - Test: layout renders `posted-date-time.njk` in header when `lastUpdated` is absent
    - Test: layout renders `posted-date-time.njk` in footer when `lastUpdated` is absent
    - _Requirements: 4.1, 4.2_

- [x] 8. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- The nunjucks package can render templates directly without a full Eleventy build — configure it with the same filters from `.eleventy.js`
- fast-check is the recommended PBT library; generate JS Date objects and compare their `htmlDateString` representations to determine if they differ
- Both `posted-date-time.njk` includes in `post.njk` (header and footer) inherit the parent template context automatically — no changes to the include calls are needed
- Use ISO date strings (`YYYY-MM-DD`) in frontmatter to avoid Eleventy/Luxon parsing issues
