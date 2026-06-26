# FOSEP Himalayas — Website Plan

A premium revamp of [fosepdarjeeling.org](https://fosepdarjeeling.org/) for the
**Federation of Societies for Environmental Protection (FOSEP)** — an environmental
and community NGO in the Darjeeling Hills & Eastern Himalayas.

- **Status:** Planning → Build
- **Last updated:** 2026-06-26
- **Repo:** https://github.com/Paharlaya/fosephimalayas

---

## 1. Goals

1. A **premium, distinctive** site that does not look like a templated NGO page.
2. **Lightweight & fast** — vanilla HTML/CSS/JS, no build step, no framework.
3. **Maximum GitHub Pages compatibility** — push and it works.
4. **Custom domain ready** — buy a domain, point DNS, add `CNAME`.
5. Accessible (keyboard, reduced-motion, semantic HTML) and good SEO.

## 2. Tech & hosting

| Decision | Choice | Why |
| --- | --- | --- |
| Stack | Vanilla HTML + CSS + JS | No build, best Pages compatibility, lightweight |
| Hosting | GitHub Pages (root of repo) | Free, simple, ties to the repo |
| Domain | `fosephimalayas.org` (to be purchased) | Served at root via `CNAME` |
| Fonts | Self-hosted `.woff2` | No external requests, faster, privacy |
| JS libs | None / tiny vanilla only | IntersectionObserver for scroll reveal; no jQuery/GSAP |

**Path convention:** all asset links are **relative** (`assets/css/...`) so the
site works both on `paharlaya.github.io/fosephimalayas/` (pre-domain testing) and
on the custom domain at root.

## 3. Design direction — "Altitude"

Every choice is grounded in the real world of the Eastern Himalayas:
Kanchenjunga's ridgelines, Sandakphu's rhododendron blooms, mist-layered cloud
forests, and contour-map cartography — not generic stock-NGO visuals.

### Palette
| Token | Hex | Use |
| --- | --- | --- |
| `--spruce` | `#16302A` | Primary dark / headers / footer |
| `--fern` | `#3E8E5A` | **Living green** — nature accent, links, icons, eco highlights |
| `--moss-tint` | `#E4EDE2` | Soft green wash for section backgrounds |
| `--mist` | `#F2F4F0` | Page background (cool, **not** cream) |
| `--rhododendron` | `#C0453A` | Accent — light red, CTAs, key highlights |
| `--dawn` | `#E0A04D` | Secondary gold accent, used sparingly |
| `--slate` | `#6B7E83` | Supporting / muted text, lines |
| `--ink` | `#14201C` | Body text |

**Green strategy:** deep `--spruce` grounds the brand (header/footer, ridgelines);
`--fern` is the lively eco-green for links, icons, tags and "growth" moments;
`--rhododendron` red stays the bold CTA accent so green and red don't compete.

### Typography (self-hosted)
- **Display:** Fraunces — editorial serif with character, optical sizing.
- **Body:** Hanken Grotesque — clean, warm, technical sans.
- **Data/Mono:** a mono face for stats, species counts, elevations, coordinates
  (conservation is partly science).

### Signature elements
- **Parallax ridgelines** — layered SVG mountain silhouettes that shift subtly on
  scroll, evoking receding Himalayan ranges in mist. *The* memorable element.
- **Impact stats as elevation/contour markers** rather than plain big numbers.
- **Section dividers as topographic contour lines.**

### Motion (lightweight, deliberate)
- Scroll-triggered reveals (IntersectionObserver).
- Subtle parallax on the ridgelines and hero.
- Hover micro-interactions on cards/links.
- **`prefers-reduced-motion` fully respected** — all motion disabled when set.

## 4. Site map

| Page | File | Purpose |
| --- | --- | --- |
| Home | `index.html` | Hero ridgelines, mission thesis, impact stats, featured programs, CTA |
| About | `pages/about.html` | History, registration, awards, vision/mission |
| Objectives | `pages/objectives.html` | The three core missions, in depth |
| Programs | `pages/programs.html` | All initiatives (health, environment, disaster, sanitation…) |
| Achievements | `pages/achievements.html` | Awards, recognitions, impact highlights |
| Get Involved | `pages/get-involved.html` | Membership + Volunteer + Donate |
| Contact | `pages/contact.html` | Toll-free, email, location, contact form (mailto) |
| 404 | `404.html` | Branded not-found page |

> Shared header/footer are **copied into each page** (we accepted repetition for a
> no-build setup). A single source of truth lives in `docs/partials-reference.html`
> so edits stay consistent.

## 5. Project structure

```
fosephimalayas/
├── index.html              # Home
├── 404.html                # Branded 404
├── CNAME                   # Added when custom domain is purchased
├── .nojekyll               # Serve files as-is (no Jekyll processing)
├── README.md
├── PLAN.md                 # This file
├── pages/                  # All non-home pages
│   ├── about.html
│   ├── objectives.html
│   ├── programs.html
│   ├── achievements.html
│   ├── get-involved.html
│   └── contact.html
├── assets/
│   ├── css/
│   │   ├── reset.css       # Minimal reset
│   │   ├── tokens.css      # Colors, type scale, spacing variables
│   │   ├── base.css        # Typography, layout primitives
│   │   └── components.css   # Nav, footer, buttons, cards, sections
│   ├── js/
│   │   └── main.js         # Nav toggle, scroll reveal, ridgeline parallax
│   ├── fonts/              # Self-hosted .woff2
│   ├── img/
│   │   └── ridgelines/     # Layered SVG mountain silhouettes
│   └── icons/             # SVG icons, favicon
└── docs/
    ├── partials-reference.html   # Canonical header/footer to copy
    └── superpowers/specs/        # Design spec archive
```

## 6. Content source (from current site)

- **Full name:** Federation of Societies for Environmental Protection (FOSEP)
- **Registration:** West Bengal Society Registration Act, 1961
- **Location:** Darjeeling Hills & Siliguri, Eastern Himalayas
- **Toll free:** 1800 313 2611 · **Email:** fosepdarjeeling@gmail.com
- **Awards:** IPVM Award 2004 (Govt. of India); Anirudh Bhargawa "Environment
  2011 Award" (INTACH); Regional Resource Agency (RRA) for NEAC.
- **Vision:** "A mountain environment where there would be no conflict between
  human ambition and natural processes of evolution of life and eco-systems."
- **Three missions:** awareness; location-specific sustainable development models;
  equity & social/economic justice.
- **Programs:** biodiversity conservation, anti-tobacco/health awareness, free
  health camps, environmental education, tree plantation (Sandakphu rhododendron),
  disaster/landslide management, sanitation (Swachh Bharat), community advocacy,
  wildlife conservation, environmental cleanup.

> ⚠️ **Content to confirm/gather:** team/leadership, social links, recent photos,
> updated impact numbers, donation method/account, registration number, full
> postal address.

## 7. Build phases

1. **Foundation** — tokens, reset, base CSS; fonts; shared header/footer; favicon.
2. **Home** — ridgeline hero, mission, impact stats, featured programs, CTA.
3. **Inner pages** — About, Objectives, Programs, Achievements, Get Involved, Contact.
4. **Polish** — animations, responsive QA, accessibility, SEO meta + Open Graph, 404.
5. **Deploy** — enable GitHub Pages; test on `*.github.io`.
6. **Domain** — buy domain, add `CNAME`, point DNS, enable HTTPS.

## 8. Deploy & domain steps (later)

1. GitHub → repo **Settings → Pages** → Source: `main` branch, `/root`.
2. Verify at `https://paharlaya.github.io/fosephimalayas/`.
3. Buy domain: **`fosephimalayas.org`**.
4. Add a `CNAME` file containing the domain; in DNS add either:
   - 4× `A` records → GitHub Pages IPs, **or**
   - a `CNAME` record → `paharlaya.github.io`.
5. Settings → Pages → set custom domain, tick **Enforce HTTPS**.

## 9. Open questions

- ~~Final domain name?~~ → **`fosephimalayas.org`** ✅
- Is there a donation account / payment method to link, or "contact to donate"?
- Logo asset available, or design a wordmark?
- Any photos we can use, or source license-free Himalaya imagery as placeholders?
