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
- `js/main.js` — Hero image randomizer, events loader, scroll animations, mobile menu
- `data/events.json` — Event data (edit this to add/remove events)
- `images/` — Logo and other assets
- `images/hero/` — Hero background images (randomly selected on each page load)
- `CNAME` — Custom domain for GitHub Pages

## Events
Edit `data/events.json` to manage events. Format:
{"title": "...", "date": "YYYY-MM-DD", "location": "...", "description": "...", "url": "..."}

Past events are automatically hidden.

## Hero Images
Add .jpg images to `images/hero/` and update the `heroImages` array in `js/main.js`.
A random image is selected on each page load. The CSS gradient serves as a fallback.

## Colors (PNW Nature palette)
--forest: #2D4A3E, --evergreen: #3A6B5C, --mist: #B8C9C0
--fog: #E8EDEA, --cloud: #F5F7F6, --bark: #8B6F4E
--white: #FFFFFF, --charcoal: #1A1A1A

## Typography
Headings: Playfair Display (serif), Body: Source Sans 3 (sans-serif)
