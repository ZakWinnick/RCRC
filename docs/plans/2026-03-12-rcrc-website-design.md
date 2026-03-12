# Redwood Coast Rivian Club — Website Redesign

**Date:** 2026-03-12
**Status:** Approved

## Overview

Replace the existing WordPress site (redwoodcoastrivianclub.com) with a static single-page site hosted on GitHub Pages. Pure HTML/CSS/JS — no build step.

## Goals

- Drive club membership (Heylo CTA)
- Showcase the community and its adventures
- Provide an events hub with easy updates via JSON
- Maintain newsletter signup and Instagram presence

## Approach

**Pure Static HTML/CSS/JS** — consistent with the workspace's other static sites. No framework, no build step. Push to `main` deploys to GitHub Pages.

## Color Palette — Pacific Northwest Nature

| Token         | Value     | Usage                                |
|---------------|-----------|--------------------------------------|
| `--forest`    | `#2D4A3E` | Primary dark — nav, headings, footer |
| `--evergreen` | `#3A6B5C` | Accent — buttons, links              |
| `--mist`      | `#B8C9C0` | Subtle backgrounds, borders          |
| `--fog`       | `#E8EDEA` | Light section backgrounds            |
| `--cloud`     | `#F5F7F6` | Page background                      |
| `--bark`      | `#8B6F4E` | Warm accent — event dates            |
| `--white`     | `#FFFFFF` | Cards, text on dark                  |
| `--charcoal`  | `#1A1A1A` | Body text                            |

## Typography

- **Headings:** Playfair Display (serif) — evokes timelessness of the redwoods
- **Body:** Source Sans 3 (sans-serif) — clean, readable, used across other projects

## Page Structure

Single page with sticky nav and section anchors:

1. **Nav** — Sticky. Logo + section links (About, Events, Join) + social icons. Hamburger on mobile.
2. **Hero (#home)** — Full-viewport background image. "Adventure Recharged" headline, subtitle, CTA button.
3. **About (#about)** — Club mission, region description (Northern California coast to redwoods), key highlights.
4. **Events (#events)** — Cards loaded from `data/events.json`. Shows title, date, location, description, link. Past events auto-hidden.
5. **Newsletter (#newsletter)** — MailerLite embedded form with short CTA copy.
6. **Join (#join)** — Membership CTA linking to Heylo. Instagram feed embed below.
7. **Footer** — Social links, copyright, disclaimer (independent from Rivian), privacy policy link.

## Events System

`data/events.json` contains an array of event objects:

```json
[
  {
    "title": "Redwood Run",
    "date": "2026-04-15",
    "location": "Avenue of the Giants, CA",
    "description": "A scenic drive through the tallest trees on Earth.",
    "url": "https://heylo.com/..."
  }
]
```

Vanilla JS fetches the file, filters out past events, sorts by date, and renders cards. Shows "No upcoming events" when the array is empty or all events are past.

## Integrations

- **MailerLite** — Embedded newsletter signup form
- **Instagram** — oEmbed feed widget
- **Heylo** — External link for membership join

## Technical Patterns

- CSS custom properties for theming
- IntersectionObserver for scroll-triggered `[data-animate]` animations
- Mobile-first responsive design with CSS Grid/Flexbox
- Smooth scrolling between sections
- No heavy JS frameworks

## File Structure

```
RCRC/
├── index.html
├── privacy.html
├── CNAME
├── css/
│   └── style.css
├── js/
│   └── main.js
├── data/
│   └── events.json
├── images/
│   ├── logo.png
│   └── hero.jpg
└── CLAUDE.md
```

## Privacy Policy

Separate `privacy.html` page linked from footer. Covers data collection (MailerLite, Instagram embed, basic analytics).

## Hosting

GitHub Pages with custom domain `redwoodcoastrivianclub.com` via CNAME file.
