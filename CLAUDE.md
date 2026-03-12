# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static single-page website for the Redwood Coast Rivian Club — a community of Rivian owners in Northern California. Hosted on GitHub Pages at redwoodcoastrivianclub.com. Pure HTML/CSS/JS with no build step, no frameworks, no bundler.

## Serve Locally

```bash
python3 -m http.server 8000
```

Note: The events loader uses `fetch()`, which requires HTTP — it won't work via `file://` protocol.

## Deployment

Push to `main` branch deploys automatically via GitHub Pages. The `CNAME` file maps the custom domain — never delete it.

## Architecture

### Pages
- `index.html` — Single-page site with anchor sections: `#home` (hero), `#about`, `#events`, `#join`
- `privacy.html` — Standalone privacy policy page with simplified nav

### Hero Image Randomization
An inline `<script>` in `index.html`'s `<head>` (not in `main.js`) injects a `<style>` element to set `.hero { background-image: url(...) }` before first paint. This avoids flash-of-wrong-background. To add/remove hero images, edit the `images` array in this inline script (lines ~21-27 of index.html). Images go in `images/hero/`.

### Events System
`js/main.js` fetches `data/events.json` on page load, filters out past events (by comparing against today's date), sorts ascending, and renders cards using safe DOM methods (`createElement`/`textContent` — no `innerHTML`). When no upcoming events exist, an empty-state message appears. After rendering, `initScrollAnimations()` is re-called so new cards get entrance animations.

Event JSON format:
```json
{"title": "...", "date": "YYYY-MM-DD", "location": "...", "description": "...", "url": "..."}
```

### JavaScript Modules (js/main.js)
All initialized from a single `DOMContentLoaded` listener:
- `initMobileMenu()` — Hamburger toggle with focus trap, Escape-to-close, ARIA attributes
- `initScrollAnimations()` — IntersectionObserver adds `.is-visible` to `.animate-on-scroll` elements (callable multiple times for dynamically added elements)
- `initEventsLoader()` — Fetches and renders events from JSON
- `initActiveNav()` — Highlights current section's nav link via IntersectionObserver
- `initNavScroll()` — Adds `.scrolled` class to `.nav` when scrollY > 50

### CSS Theming (css/style.css)
All colors, spacing, typography, and layout values use CSS custom properties defined in `:root`. The palette is called "PNW Nature":

| Variable | Value | Usage |
|----------|-------|-------|
| `--forest` | #2D4A3E | Primary dark green, nav links, headings |
| `--evergreen` | #3A6B5C | Buttons, accents, hover states |
| `--mist` | #B8C9C0 | Soft green for borders, subtle backgrounds |
| `--fog` | #E8EDEA | Section backgrounds (alternating) |
| `--cloud` | #F5F7F6 | Body background |
| `--bark` | #8B6F4E | Warm accent (icons, highlights) |
| `--charcoal` | #1A1A1A | Footer background |

Typography: Playfair Display (headings), Source Sans 3 (body) — loaded via Google Fonts.

### Logos
- `images/logo-dark.png` — Used in nav (light background)
- `images/logo-light.png` — Used in footer (dark background)

### External Services
- **Heylo** — Membership platform, primary CTA: `https://heylo.group/redwoodcoastrivianclub`
- **Tinylytics** — Analytics (script in `<head>` with `defer`)
- **Font Awesome 6.5** — Icons via cdnjs
- **Google Fonts** — Playfair Display + Source Sans 3

### Social Links
Instagram, Threads, X/Twitter, YouTube — appear in both nav and footer. Handle: `@redwoodcoastrivianclub` (IG/Threads), `@redwoodrivians` (X/YouTube).
