---
status: accepted
---

# Semantic CSS tokens and localStorage for dark theme

We drive the blog's light and dark themes through semantic CSS custom properties bound to `<meta name="color-scheme">` (using `color-scheme`, `light-dark()`, and `@media (prefers-color-scheme: dark)` fallbacks) and persist any Theme Override in `localStorage` with a blocking inline `<head>` script to prevent FOUC.

## Considered Options

- **Tailwind `darkMode: 'class'` across templates:** Requires scattering `dark:*` utilities across ~20 Nunjucks templates and relies on JS executing before dark mode applies even for OS-dark visitors.
- **Cookies instead of `localStorage`:** Adds cookie headers to every static asset request with no SSR benefit on Cloudflare Pages.

## Consequences

- Color contrast and surface pairings stay centralized in `style/tailwind.css` and `tailwind.config.js`, making future visual adjustments low-risk.
- Visitors with JavaScript disabled still receive the OS-preferred theme via `color-scheme: light dark` and `prefers-color-scheme` fallbacks.
- Templates should use semantic color tokens rather than hardcoded `bg-white`, `text-black`, or raw hex values.
