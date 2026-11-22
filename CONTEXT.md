# Geshan's Blog

Personal technical blog hosted at geshan.com.np covering software engineering, DevOps, and web development.

## Language

### Theming

**Theme Override**:
An explicit light or dark theme choice set by a reader that takes precedence over their operating system preference; absent when following the system default.
_Avoid_: Theme setting, saved theme, dark mode flag

**Active Theme**:
The theme (`light` or `dark`) currently rendered to the reader, determined by any active Theme Override or otherwise by the reader's system color scheme.
_Avoid_: Current mode, selected theme

**Surface Band**:
A full-width editorial section background on the blog (canvas, avocado-tinted band, strong avocado band, or elevated card) that pairs consistently across light and dark themes.
_Avoid_: Green section, lightAvocado box
