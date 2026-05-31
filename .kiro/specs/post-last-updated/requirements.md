# Requirements Document

## Introduction

This feature adds a "last updated at" date to blog posts on Geshan's Blog (an Eleventy/Nunjucks static site). Authors can set a `lastUpdated` frontmatter field on any post. When that date differs from the original published date, the updated date is displayed alongside the published date in the post header and footer. If no `lastUpdated` is set, or if it matches the published date, the UI remains unchanged.

## Glossary

- **Post**: A blog post rendered via the `layouts/post.njk` layout, tagged with `posts`.
- **Published_Date**: The `date` frontmatter field of a post, representing when it was first published.
- **Last_Updated_Date**: The optional `lastUpdated` frontmatter field of a post, representing when the post content was last meaningfully revised.
- **Posted_Date_Time_Component**: The Nunjucks partial at `_includes/components/posted-date-time.njk` that renders date information within a post.
- **Post_Layout**: The Nunjucks layout at `_includes/layouts/post.njk` that structures the full post page.
- **Schema_Markup**: The JSON-LD `BlogPosting` structured data block embedded in each post page.
- **readableDate_Filter**: The existing Eleventy filter that formats a JS Date object as `dd-LLL-yyyy`.
- **htmlDateString_Filter**: The existing Eleventy filter that formats a JS Date object as `yyyy-LL-dd` for use in `datetime` attributes.

## Requirements

### Requirement 1: Frontmatter Support for Last Updated Date

**User Story:** As a blog author, I want to set a `lastUpdated` date in a post's frontmatter, so that I can signal to readers that the content has been revised since it was first published.

#### Acceptance Criteria

1. THE Post SHALL accept an optional `lastUpdated` frontmatter field containing a date value.
2. WHEN a post has no `lastUpdated` frontmatter field, THE Post SHALL treat the last updated date as absent.
3. WHEN a post has a `lastUpdated` frontmatter field whose value equals the Published_Date, THE Post SHALL treat the last updated date as absent.

---

### Requirement 2: Conditional Display of Last Updated Date

**User Story:** As a reader, I want to see when a post was last updated, so that I know whether the content is current.

#### Acceptance Criteria

1. WHEN a post has a Last_Updated_Date that differs from the Published_Date, THE Posted_Date_Time_Component SHALL display the Last_Updated_Date alongside the Published_Date.
2. WHEN a post has no Last_Updated_Date, THE Posted_Date_Time_Component SHALL display only the Published_Date.
3. WHEN a post has a Last_Updated_Date equal to the Published_Date, THE Posted_Date_Time_Component SHALL display only the Published_Date.
4. WHEN the Last_Updated_Date is displayed, THE Posted_Date_Time_Component SHALL label it with a visible "Updated:" prefix to distinguish it from the Published_Date.
5. WHEN the Last_Updated_Date is displayed, THE Posted_Date_Time_Component SHALL render it using the same `readableDate_Filter` format (`dd-LLL-yyyy`) as the Published_Date.
6. WHEN the Last_Updated_Date is displayed, THE Posted_Date_Time_Component SHALL include a `<time>` element with a `datetime` attribute formatted by the `htmlDateString_Filter`.

---

### Requirement 3: Schema Markup Update

**User Story:** As a site owner, I want the JSON-LD structured data to reflect the last updated date, so that search engines receive accurate modification metadata.

#### Acceptance Criteria

1. WHEN a post has a Last_Updated_Date that differs from the Published_Date, THE Schema_Markup SHALL set `dateModified` to the Last_Updated_Date formatted as `yyyy-LL-dd`.
2. WHEN a post has no Last_Updated_Date, THE Schema_Markup SHALL set `dateModified` to the Published_Date formatted as `yyyy-LL-dd`.
3. WHEN a post has a Last_Updated_Date equal to the Published_Date, THE Schema_Markup SHALL set `dateModified` to the Published_Date formatted as `yyyy-LL-dd`.

---

### Requirement 4: Consistent Display in Post Header and Footer

**User Story:** As a reader, I want the last updated date to appear consistently in both the post header and footer date areas, so that the information is visible regardless of where I am on the page.

#### Acceptance Criteria

1. WHEN the Last_Updated_Date is displayed, THE Post_Layout SHALL render the Posted_Date_Time_Component with the Last_Updated_Date in both the header and footer metadata sections.
2. THE Post_Layout SHALL use the same Posted_Date_Time_Component partial for both the header and footer date display, so that the last updated date rendering is consistent.
