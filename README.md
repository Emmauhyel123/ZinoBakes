# Crumb & Cream Bakehouse: HTML + CSS site

Open `index.html` in a browser, or upload the whole folder to any host (Netlify, Vercel, GitHub Pages).

## What to edit, and where
| I want to change...            | Edit this                                                     |
|--------------------------------|---------------------------------------------------------------|
| Any text, names, prices        | `index.html` (every section has a comment like `<!-- PRODUCT 1 -->`) |
| Add or remove a product        | Copy a `PRODUCT` card AND its matching `POP-UP` block, then change the number in `id="product-N"` / `id="modal-N"` / `href="#modal-N"` |
| Logo                           | Replace `assets/logo/logo.svg` (or change the `src` in `index.html`) |
| Product photos                 | `assets/products/` then update the `src` in the card and pop-up |
| Flyers                         | `assets/flyers/`                                              |
| Hero + reel videos             | `assets/video/hero.mp4`, `reel-1.mp4`, `reel-2.mp4`, `reel-3.mp4` |
| Colours and fonts              | top of `css/styles.css` (`:root`)                             |
| Social links                   | `href` values in the footer of `index.html`                   |

## JavaScript (database + API key only)
- `js/config.js`: paste your Supabase URL and publishable (anon) key.
- `js/db.js`: sends the order form to the `inquiries` table.
- `supabase.sql`: run once in Supabase SQL Editor to create the table. Visitors can only add rows, not read them.

Never put a secret/service key in `config.js`: anyone can view it in the browser.

## No-JS features (pure HTML/CSS)
Carousel (swipe/scroll), product and flyer pop-ups (CSS `:target`), transparent-to-solid navbar
(CSS scroll animation), testimonial fading, and the video play-icon hover.
