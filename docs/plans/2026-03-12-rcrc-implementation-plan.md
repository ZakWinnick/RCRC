# Redwood Coast Rivian Club — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. ALSO USE: frontend-design:frontend-design for all HTML/CSS implementation to ensure high design quality.

**Goal:** Build a static single-page website for the Redwood Coast Rivian Club with PNW nature aesthetic, JSON-driven events, newsletter signup, and Instagram embed — hosted on GitHub Pages.

**Architecture:** Single `index.html` page with section anchors, `css/style.css` for all styling via CSS custom properties, `js/main.js` for events loader + scroll animations + mobile menu. Events stored in `data/events.json`. Privacy policy as separate `privacy.html`. No build step — push to `main` deploys.

**Tech Stack:** HTML5, CSS3 (custom properties, Grid, Flexbox), Vanilla JS (IntersectionObserver, fetch API), Google Fonts (Playfair Display + Source Sans 3), MailerLite embed, Instagram oEmbed.

**Design Reference:** `docs/plans/2026-03-12-rcrc-website-design.md`

---

## Task 1: Project Scaffolding & CNAME

**Files:**
- Create: `CNAME`
- Create: `css/style.css` (empty shell with custom properties)
- Create: `js/main.js` (empty shell)
- Create: `data/events.json` (sample data)
- Create: `images/` directory
- Create: `CLAUDE.md`
- Create: `.gitignore`

**Step 1: Create directory structure**

```bash
mkdir -p css js data images
```

**Step 2: Create CNAME**

```
redwoodcoastrivianclub.com
```

**Step 3: Create `.gitignore`**

```
.DS_Store
.firecrawl/
*.log
```

**Step 4: Create `CLAUDE.md`**

```markdown
# RCRC — Redwood Coast Rivian Club

## Overview
Static single-page website for the Redwood Coast Rivian Club. GitHub Pages hosted at redwoodcoastrivianclub.com.

## Stack
Pure HTML/CSS/JS — no build step.

## Serve Locally
python3 -m http.server 8000

## File Map
- `index.html` — Single-page site with section anchors
- `privacy.html` — Privacy policy
- `css/style.css` — All styles, CSS custom properties theming
- `js/main.js` — Events loader, scroll animations, mobile menu
- `data/events.json` — Event data (edit this to add/remove events)
- `images/` — Logo, hero, and other assets
- `CNAME` — Custom domain for GitHub Pages

## Events
Edit `data/events.json` to manage events. Format:
{"title": "...", "date": "YYYY-MM-DD", "location": "...", "description": "...", "url": "..."}

Past events are automatically hidden.

## Colors (PNW Nature palette)
--forest: #2D4A3E, --evergreen: #3A6B5C, --mist: #B8C9C0
--fog: #E8EDEA, --cloud: #F5F7F6, --bark: #8B6F4E
--white: #FFFFFF, --charcoal: #1A1A1A

## Typography
Headings: Playfair Display (serif), Body: Source Sans 3 (sans-serif)
```

**Step 5: Create `data/events.json` with sample data**

```json
[
  {
    "title": "Redwood Run",
    "date": "2026-04-15",
    "location": "Avenue of the Giants, CA",
    "description": "A scenic drive through the tallest trees on Earth. Join us for an unforgettable journey through ancient redwood groves.",
    "url": "https://www.heylo.com/redwood-coast-rivian-club"
  },
  {
    "title": "Coastal Cruise",
    "date": "2026-05-10",
    "location": "Highway 1 — Mendocino to Fort Bragg",
    "description": "Cruise the dramatic Pacific coastline with fellow Rivian owners. Lunch stop in Mendocino village.",
    "url": "https://www.heylo.com/redwood-coast-rivian-club"
  },
  {
    "title": "Lassen Volcanic Adventure",
    "date": "2026-06-21",
    "location": "Lassen Volcanic National Park, CA",
    "description": "Summer solstice drive to one of California's most underrated national parks. Charging stop in Red Bluff.",
    "url": "https://www.heylo.com/redwood-coast-rivian-club"
  }
]
```

**Step 6: Create CSS shell with custom properties**

Create `css/style.css` with just the `:root` block and CSS reset for now:

```css
:root {
  --forest: #2D4A3E;
  --evergreen: #3A6B5C;
  --mist: #B8C9C0;
  --fog: #E8EDEA;
  --cloud: #F5F7F6;
  --bark: #8B6F4E;
  --white: #FFFFFF;
  --charcoal: #1A1A1A;

  --font-heading: 'Playfair Display', Georgia, serif;
  --font-body: 'Source Sans 3', -apple-system, BlinkMacSystemFont, sans-serif;

  --space-xs: 8px;
  --space-sm: 16px;
  --space-md: 32px;
  --space-lg: 64px;
  --space-xl: 96px;

  --nav-height: 80px;
  --container-max: 1100px;

  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 20px;

  --shadow-sm: 0 2px 8px rgba(0,0,0,0.06);
  --shadow-md: 0 8px 24px rgba(0,0,0,0.10);
  --shadow-lg: 0 16px 48px rgba(0,0,0,0.14);
}
```

**Step 7: Create empty `js/main.js`**

```js
'use strict';
document.addEventListener('DOMContentLoaded', function() {
  // Modules initialized in subsequent tasks
});
```

**Step 8: Commit**

```bash
git add CNAME .gitignore CLAUDE.md css/style.css js/main.js data/events.json
git commit -m "feat: project scaffolding with design tokens and sample events"
```

---

## Task 2: CSS Foundation — Reset, Typography, Layout Utilities

**Files:**
- Modify: `css/style.css`

**Step 1: Add CSS reset and base typography below the `:root` block**

Include: box-sizing reset, smooth scrolling with scroll-padding-top, body font/color/background, heading hierarchy with clamp() fluid sizing, link styles with transitions, img reset.

**Step 2: Add layout utilities**

`.container` (max-width + auto margin), `.section` (vertical padding), `.section-header` (centered text + bottom margin).

**Step 3: Add button styles**

`.btn` base, `.btn-primary` (evergreen bg, white text, hover lift), `.btn-outline` (transparent bg, white border, hover fill).

**Step 4: Verify locally**

```bash
python3 -m http.server 8000
```

**Step 5: Commit**

```bash
git add css/style.css
git commit -m "feat: CSS foundation — reset, typography, layout utilities, buttons"
```

---

## Task 3: HTML Structure — Full Page Skeleton

**Files:**
- Create: `index.html`

**Step 1: Write the full HTML skeleton**

Use the `frontend-design` skill for high design quality. The HTML must include:

- `<head>`: charset, viewport, title, meta description, OG tags, font preconnect + stylesheet, Font Awesome CDN, CSS link, noscript animation fallback
- `<nav>`: sticky nav with logo, section links (About, Events, Newsletter, Join), social icons (Instagram, Threads, X, YouTube), hamburger toggle
- `<section class="hero" id="home">`: full-viewport hero with overlay, title "Adventure Recharged.", subtitle, two CTA buttons
- `<section class="section about" id="about">`: section header + 3-card grid (Plan Expeditions, Share Stories, Adventure Together) with Font Awesome icons
- `<section class="section events" id="events">`: section header + `#events-grid` container (populated by JS) + `#events-empty` fallback
- `<section class="section newsletter" id="newsletter">`: dark bg section, heading, description, MailerLite form placeholder
- `<section class="section join" id="join">`: heading, description, Heylo CTA button, Instagram feed placeholder
- `<footer>`: brand/disclaimer, nav links, social icons, copyright
- Script tag: `js/main.js` with defer

Social links:
- Instagram: https://www.instagram.com/redwoodcoastrivianclub/
- Threads: https://www.threads.net/@redwoodcoastrivianclub
- X: https://x.com/redwoodrivians
- YouTube: https://www.youtube.com/@redwoodrivians
- Heylo: https://www.heylo.com/redwood-coast-rivian-club

All `.animate-on-scroll` classes on section content for scroll animations.

**Step 2: Verify page loads in browser**

```bash
python3 -m http.server 8000
```

Confirm: page loads, sections visible, fonts load, no console errors.

**Step 3: Commit**

```bash
git add index.html
git commit -m "feat: full HTML skeleton with all sections and semantic structure"
```

---

## Task 4: CSS — Navigation (Sticky + Mobile Hamburger)

**Files:**
- Modify: `css/style.css`

**Step 1: Add nav styles**

Reference patterns from redcanyonroasting and rangeway-pages. Must include:

- Sticky positioning with backdrop-filter blur
- Flexbox layout: logo left, links center, social right
- Hover underline animation on nav links
- Mobile breakpoint (768px): hide links/social, show hamburger
- Full-screen mobile menu overlay with staggered link animations
- Animated hamburger to X transform
- `body.menu-open` overflow hidden

**Step 2: Verify desktop and mobile nav**

Test at desktop (1200px+) and mobile (375px) widths.

**Step 3: Commit**

```bash
git add css/style.css
git commit -m "feat: sticky navigation with mobile hamburger menu"
```

---

## Task 5: CSS — Hero Section

**Files:**
- Modify: `css/style.css`

**Step 1: Add hero styles**

Must include:

- Full viewport height (100vh, 100svh for mobile)
- Background image with dark overlay for text contrast
- Placeholder gradient background (deep forest greens) until real hero image exists
- Centered content with hero title, subtitle, CTA buttons
- Fade-in animation on load (CSS @keyframes)
- Responsive: stack buttons vertically on mobile

**Step 2: Verify hero renders correctly**

**Step 3: Commit**

```bash
git add css/style.css
git commit -m "feat: hero section with full-viewport layout and gradient placeholder"
```

---

## Task 6: CSS — About Section (Card Grid)

**Files:**
- Modify: `css/style.css`

**Step 1: Add about section styles**

Must include:

- 3-column card grid (CSS Grid, responsive to 1-column on mobile)
- Cards with icon, heading, description
- Subtle border/shadow treatment
- Icon styling (Font Awesome in circular bg)
- Alternating section background (--fog for about)

**Step 2: Verify card layout at all breakpoints**

Desktop (3 cols), tablet (2 cols), mobile (1 col).

**Step 3: Commit**

```bash
git add css/style.css
git commit -m "feat: about section card grid with responsive layout"
```

---

## Task 7: CSS — Events Section (Event Cards)

**Files:**
- Modify: `css/style.css`

**Step 1: Add event card styles**

Must include:

- Card layout: date badge (left/top), title, location, description, CTA link
- Date badge uses --bark color for warmth
- Card hover effect (subtle lift + shadow)
- Grid layout (responsive)
- Empty state styling for "No upcoming events"

**Step 2: Commit**

```bash
git add css/style.css
git commit -m "feat: event card styles with date badges and hover effects"
```

---

## Task 8: CSS — Newsletter, Join, Footer Sections

**Files:**
- Modify: `css/style.css`

**Step 1: Add newsletter section styles**

- Dark background (--forest) with light text
- Centered content with form placeholder
- Form input + button styling for MailerLite embed

**Step 2: Add join section styles**

- Centered CTA with large button
- Instagram feed container below

**Step 3: Add footer styles**

- Dark background (--forest or --charcoal)
- 3-column layout: brand/disclaimer, nav links, social icons
- Footer bottom bar with copyright
- Responsive: stack on mobile

**Step 4: Commit**

```bash
git add css/style.css
git commit -m "feat: newsletter, join, and footer section styles"
```

---

## Task 9: CSS — Scroll Animations

**Files:**
- Modify: `css/style.css`

**Step 1: Add scroll animation styles**

Follow the workspace pattern (redcanyonroasting):

```css
.animate-on-scroll {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s ease-out, transform 0.7s ease-out;
  will-change: transform, opacity;
}

.animate-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

**Step 2: Commit**

```bash
git add css/style.css
git commit -m "feat: scroll-triggered animation CSS"
```

---

## Task 10: JavaScript — Mobile Menu

**Files:**
- Modify: `js/main.js`

**Step 1: Implement mobile menu toggle**

Follow the workspace pattern. Must include:

- Toggle button click handler
- Body overflow lock when open
- Close on nav link click (smooth scroll to section)
- Close on Escape key
- Focus trap within open menu
- ARIA attributes (aria-expanded, aria-hidden)

**Step 2: Test mobile menu**

Resize to mobile, click hamburger, verify menu opens/closes, links scroll to sections, Escape closes.

**Step 3: Commit**

```bash
git add js/main.js
git commit -m "feat: mobile menu with accessibility support"
```

---

## Task 11: JavaScript — Scroll Animations (IntersectionObserver)

**Files:**
- Modify: `js/main.js`

**Step 1: Implement IntersectionObserver**

Follow workspace pattern:

```js
function initScrollAnimations() {
  var elements = document.querySelectorAll('.animate-on-scroll');
  if (!elements.length) return;

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(function(el) { observer.observe(el); });
  } else {
    elements.forEach(function(el) { el.classList.add('is-visible'); });
  }
}
```

**Step 2: Test scroll animations**

Scroll down page, verify elements fade in as they enter viewport.

**Step 3: Commit**

```bash
git add js/main.js
git commit -m "feat: IntersectionObserver scroll animations"
```

---

## Task 12: JavaScript — Events Loader

**Files:**
- Modify: `js/main.js`

**Step 1: Implement events loader**

Fetch `data/events.json`, filter out past events, sort by date ascending, render event cards into `#events-grid`. Use safe DOM methods (createElement, textContent, appendChild) to avoid XSS — do NOT use innerHTML with untrusted data. Show `#events-empty` fallback when no upcoming events exist. After rendering, re-initialize scroll animations for dynamically added cards.

Date badge format: short month name + day number.

**Step 2: Test events rendering**

Verify 3 sample events render as cards. Modify a date to be in the past and verify it's hidden.

**Step 3: Commit**

```bash
git add js/main.js
git commit -m "feat: JSON-driven events loader with date filtering"
```

---

## Task 13: JavaScript — Active Nav Link Highlighting

**Files:**
- Modify: `js/main.js`

**Step 1: Add active section highlighting**

Use IntersectionObserver to detect which section is in view and add `.active` class to corresponding nav link.

**Step 2: Add CSS for active nav link**

```css
.nav-link.active {
  color: var(--evergreen);
}
```

**Step 3: Commit**

```bash
git add js/main.js css/style.css
git commit -m "feat: active nav link highlighting on scroll"
```

---

## Task 14: Privacy Policy Page

**Files:**
- Create: `privacy.html`

**Step 1: Write privacy.html**

Minimal page with nav (linking back to index.html), privacy policy content covering:
- What data is collected (MailerLite emails, Instagram embed cookies, basic analytics)
- How data is used
- Third-party services (MailerLite, Instagram/Meta, GitHub Pages)
- Contact information
- Date of last update

Reuse the same CSS file and nav styling.

**Step 2: Verify page loads and nav works**

**Step 3: Commit**

```bash
git add privacy.html
git commit -m "feat: privacy policy page"
```

---

## Task 15: Visual Polish & Responsive Testing

**Files:**
- Modify: `css/style.css`
- Modify: `index.html` (if needed)

**Step 1: Test at all breakpoints**

- Mobile: 375px (iPhone SE)
- Tablet: 768px (iPad)
- Desktop: 1200px+

Fix any layout issues, spacing problems, or text overflow.

**Step 2: Add any missing responsive adjustments**

**Step 3: Test smooth scrolling, all links, mobile menu**

**Step 4: Commit**

```bash
git add -A
git commit -m "fix: responsive layout polish and cross-device testing"
```

---

## Task 16: Final Integration — MailerLite & Instagram Placeholders

**Files:**
- Modify: `index.html`

**Step 1: Add MailerLite placeholder**

Add a clear comment block in the newsletter section where the MailerLite embed code should be pasted.

**Step 2: Add Instagram placeholder**

Similar placeholder in the join section for Instagram embed.

**Step 3: Commit**

```bash
git add index.html
git commit -m "feat: integration placeholders for MailerLite and Instagram"
```

---

## Execution Notes

- **No test suite** — this is a static site. Verification is visual (browser testing).
- **Images** — The plan uses placeholder gradients. Real hero image and logo should be added by the user.
- **MailerLite** — Requires the user's MailerLite account embed code.
- **Instagram** — Requires the user's Instagram embed code or widget.
- **CNAME** — DNS must be configured separately to point to GitHub Pages.
- **Use frontend-design skill** — For Tasks 3-9 (HTML structure and CSS), invoke the `frontend-design:frontend-design` skill to ensure high visual quality and distinctive design.
