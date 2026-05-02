# Requirements Document

## Introduction

This feature adds a "last updated at" date to blog posts on the Eleventy-based static site. When a post has been revised after its original publication, the updated date is displayed alongside (or near) the published date so readers know the content is current. The updated date is only shown when it differs from the original published date — posts that have never been updated show no updated date, keeping the UI clean for the majority of posts.

The site uses Nunjucks templates, Luxon for date formatting, and the existing `posted-date-time.njk` component for date display. The `lastUpdated` date will be supplied as a frontmatter field on individual posts.

## Glossary

- **Post**: A Markdown or HTML file in the `posts/` directory tagged with `"posts"`, rendered using the `post` layout.
- **Published_Date**: The value of the `date` frontmatter field on a post, representing the original publication date.
- **Last_Updated_Date**: The value of the optional `lastUpdated` frontmatter field on a post, representing the most recent revision date.
- **Post_Layout**: The Nunjucks template at `_includes/layouts/post.njk` that renders individual blog post pages.
- **Date_Component**: The Nunjucks partial at `_includes/components/posted-date-time.njk` that renders a post's date information.
- **Eleventy_Config**: The `.eleventy.js` configuration file where Eleventy filters and collections are defined.
- **Schema_Markup**: The `application/ld+json` JSON-LD block in the Post_Layout that provides structured data to search engines.

---

## Requirements

### Requirement 1: Frontmatter Field for Last Updated Date

**User Story:** As a content author, I want to add a `lastUpdated` date to a post's frontmatter, so that I can signal to readers and search engines that the post has been revised.

#### Acceptance Criteria

1. THE Post SHALL accept an optional `lastUpdated` frontmatter field containing an ISO 8601 date string (e.g., `2025-06-01T10:00:00.000+11:00`).
2. WHEN a post does not include a `lastUpdated` frontmatter field, THE Post_Layout SHALL render the post without any last-updated date display.
3. WHEN a post includes a `lastUpdated` frontmatter field with a value equal to the `date` field (same calendar date), THE Post_Layout SHALL render the post without any last-updated date display.

---

### Requirement 2: Display Last Updated Date on Post Pages

**User Story:** As a reader, I want to see when a post was last updated, so that I can judge whether the content is still relevant.

#### Acceptance Criteria

1. WHEN a post has a `lastUpdated` date that differs from its `date` (Published_Date) by at least one calendar day, THE Date_Component SHALL render the Last_Updated_Date visually near the Published_Date.
2. THE Date_Component SHALL format the Last_Updated_Date using the same `displayDateOnly` filter (e.g., `14-Jun-2025`) already used for the Published_Date.
3. THE Date_Component SHALL include a human-readable label (e.g., "Updated:") preceding the Last_Updated_Date so readers can distinguish it from the Published_Date.
4. THE Date_Component SHALL wrap the Last_Updated_Date in a `<time>` element whose `datetime` attribute contains the ISO 8601 date string produced by the existing `getSitemapDate` filter.
5. WHEN the Last_Updated_Date is displayed, THE Date_Component SHALL apply the same typographic styles (font, size, weight, colour, case) as the Published_Date span.

---

### Requirement 3: Eleventy Date Filter for Comparison

**User Story:** As a developer, I want a reliable way to compare the published date and the last-updated date at build time, so that the template logic is simple and correct.

#### Acceptance Criteria

1. THE Eleventy_Config SHALL provide a filter named `isSameDay` that accepts two JavaScript Date objects and returns `true` when both dates fall on the same UTC calendar day, and `false` otherwise.
2. WHEN either argument passed to the `isSameDay` filter is `null` or `undefined`, THE Eleventy_Config SHALL return `false`.
3. THE Eleventy_Config SHALL provide a filter named `htmlDateString` (already exists) that formats a Date object as `yyyy-LL-dd` for use in `datetime` attributes — no new filter is required for this purpose.

---

### Requirement 4: Structured Data (Schema.org) Update

**User Story:** As a site owner, I want the `dateModified` field in the post's JSON-LD structured data to reflect the last-updated date when available, so that search engines receive accurate revision signals.

#### Acceptance Criteria

1. WHEN a post has a `lastUpdated` date that differs from its `date`, THE Post_Layout SHALL set the `dateModified` value in the `application/ld+json` block to the `lastUpdated` date formatted as `yyyy-LL-dd`.
2. WHEN a post does not have a `lastUpdated` date, or the `lastUpdated` date is the same calendar day as `date`, THE Post_Layout SHALL set the `dateModified` value in the `application/ld+json` block to the `date` (Published_Date) formatted as `yyyy-LL-dd` (preserving current behaviour).

---

### Requirement 5: Atom Feed Update

**User Story:** As a subscriber, I want the Atom feed entry for a revised post to reflect the latest update date, so that my feed reader shows the post as updated.

#### Acceptance Criteria

1. WHEN a post has a `lastUpdated` date that differs from its `date`, THE Atom feed entry for that post SHALL use the `lastUpdated` date as the `<updated>` element value.
2. WHEN a post does not have a `lastUpdated` date, THE Atom feed entry SHALL use the `date` (Published_Date) as the `<updated>` element value (preserving current behaviour).

---

### Requirement 6: No Visual Regression for Unmodified Posts

**User Story:** As a site owner, I want posts without a `lastUpdated` date to look exactly as they do today, so that the feature does not affect the majority of existing posts.

#### Acceptance Criteria

1. WHEN a post does not include a `lastUpdated` frontmatter field, THE Date_Component SHALL render identically to its current output (only the Published_Date is shown, with no additional elements or whitespace).
2. THE Post_Layout SHALL NOT introduce any new wrapper elements or CSS classes around the existing Published_Date display for posts that have no `lastUpdated` date.
