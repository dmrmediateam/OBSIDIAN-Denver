# Obsidian Denver — Branding Kit

---

## Brand Identity

| | |
|---|---|
| **Brand Name** | Obsidian Denver |
| **Tagline** | Denver Real Estate for Distinctive Homes |
| **Badge / Sub-tagline** | Architectural + Historic Home Specialists |
| **Positioning Statement** | A boutique team specializing in architectural, historic, and luxury properties across West Highland, LoHi, and Sloan's Lake with tailored strategy and deep local market knowledge. |
| **Brokerage** | Keller Williams Urban Elite |
| **Market** | Denver, CO — West Highland · LoHi · Sloan's Lake |

---

## Contact & Business Info

| | |
|---|---|
| **Address** | 4045 N Pecos St #201, Denver, CO 80211 |
| **Main Phone** | +1 (720) 706-6768 |
| **Main Email** | hello@obsidiandenver.com |
| **Website** | obsidiandenver.com |
| **© Year** | 2026 |

---

## Team

### David Heine
- **Title:** Co-Founder & Real Estate Expert
- **Role:** Listing Agent · Seller Strategy
- **Phone:** 303-900-7702
- **Email:** hello@obsidiandenver.com
- **Photo:** `/KWUE_3 (1).webp`

### Daxon McInnis (Dax)
- **Title:** Co-Founder & Real Estate Expert
- **Role:** Buyer Agent · Relocation
- **Phone:** 720-810-8887
- **Email:** Dax@Daxonre.com
- **Photo:** `/JHP_0162_S (1).webp`

---

## Color Palette

| Token | Hex | Usage |
|---|---|---|
| `--color-off-black` | `#0a0a0a` | Deep backgrounds, video overlays |
| `--color-near-black` | `#1a1a1a` | Primary text, buttons, headings |
| `--color-off-white` | `#f8f7f4` | Page background, light sections, text on dark |
| `--color-soft-gray` | `#e8e6e1` | Borders, dividers, subtle backgrounds |
| `--color-accent-bronze` | `#8b7355` | **Primary accent** — CTAs, links, highlights, hover states |
| `--color-accent-muted-green` | `#6b7d6b` | Secondary accent — reserved / contextual use |

---

## Typography

### Fonts
| Role | Font | Variable | Weights |
|---|---|---|---|
| **Serif / Display** | Playfair Display | `--font-serif` | 400, 600, 700 |
| **Sans / Body / UI** | Inter | `--font-sans` | 400, 500, 600 |

### Type Scale
| Token | Size |
|---|---|
| `--font-size-xs` | 0.75rem (12px) |
| `--font-size-sm` | 0.875rem (14px) |
| `--font-size-base` | 1rem (16px) |
| `--font-size-lg` | 1.125rem (18px) |
| `--font-size-xl` | 1.25rem (20px) |
| `--font-size-2xl` | 1.5rem (24px) |
| `--font-size-3xl` | 2rem (32px) |
| `--font-size-4xl` | 2.5rem (40px) |
| `--font-size-5xl` | 3rem (48px) |
| `--font-size-6xl` | 4rem (64px) |

### Typography Rules
- **H1 / Hero headings:** Playfair Display, 700, tight tracking (`letter-spacing: -0.02em`), `clamp()` sizing
- **H2 / Section headings:** Playfair Display, 700, `letter-spacing: -0.01em`
- **H3 / Card/sub-headings:** Playfair Display, 700
- **Body copy / Labels / UI:** Inter, 400–600
- **Uppercase labels / badges:** Inter, 500–600, `letter-spacing: 0.05–0.08em`, `text-transform: uppercase`
- **Line height:** 1.7 body, 1.1–1.2 headings, 1.5–1.6 subheadings

---

## Spacing Scale

| Token | Value |
|---|---|
| `--spacing-xs` | 0.5rem (8px) |
| `--spacing-sm` | 1rem (16px) |
| `--spacing-md` | 1.5rem (24px) |
| `--spacing-lg` | 2rem (32px) |
| `--spacing-xl` | 3rem (48px) |
| `--spacing-2xl` | 4rem (64px) |
| `--spacing-3xl` | 6rem (96px) |

---

## Border Radius

| Token | Value |
|---|---|
| `--radius-sm` | 0.375rem |
| `--radius-md` | 0.5rem |
| `--radius-lg` | 0.75rem |
| `--radius-xl` | 1rem |
| `--radius-2xl` | 1.5rem |

---

## Shadows

| Token | Value |
|---|---|
| `--shadow-sm` | `0 1px 2px 0 rgba(0,0,0,0.05)` |
| `--shadow-md` | `0 4px 6px -1px rgba(0,0,0,0.1)` |
| `--shadow-lg` | `0 10px 15px -3px rgba(0,0,0,0.1)` |
| `--shadow-xl` | `0 20px 25px -5px rgba(0,0,0,0.1)` |

---

## Transitions

| Token | Value |
|---|---|
| `--transition-fast` | 150ms ease |
| `--transition-base` | 250ms ease |
| `--transition-slow` | 350ms ease |

---

## UI Patterns

### Buttons
| Variant | Style |
|---|---|
| **Primary** | Off-white bg, near-black text, `border-radius: 0.5rem` — used on dark backgrounds |
| **Secondary** | Semi-transparent dark bg (`rgba(26,26,26,0.5)`), off-white text, off-white border — hero ghost button |
| **Submit / Dark** | Near-black bg, off-white text → bronze on hover |
| **Padding** | `0.75rem 1.75rem` (desktop) · `0.85rem 1.5rem` (mobile) |

### Cards
- Zero border-radius service cards (edge-to-edge, flush layout)
- Image on top, dark background content area below
- Bronze accent on CTA links
- Hover: subtle image scale (`1.05`)

### Forms
- Off-white input bg, soft-gray border → bronze on focus
- 16px minimum font-size (prevents iOS zoom)
- Labels: Inter, uppercase, 500 weight, `letter-spacing: 0.08em`

### Badges / Pills
- Rounded pill (`border-radius: 2rem`)
- Off-white bg with `backdrop-filter: blur(10px)` on hero
- Uppercase, xs size, near-black text

---

## Listing Page Patterns (from 3227 W 20th Ave)

### Page Structure
1. **Sticky sidebar** — Price, beds/baths/sqft/year, Schedule Showing + Get More Info CTAs
2. **Hero carousel** — Full-bleed architectural photography, typed captions (ALL CAPS)
3. **Specs table** — Address · City · Neighborhood · MLS · Type · Year · Sq Ft · Lot · Beds · Baths · Stories · Garage · HOA · Taxes · Schools · Walk/Transit/Bike scores
4. **Copy sections** — Short H2 headline + 2–3 paragraphs, specific room callout stats below
5. **Gallery grid** — Thumbnail strip with labeled photos
6. **Neighborhood section** — Walkable POIs with distance + 1-line description
7. **Agent bios** — Circle photo, CO-FOUNDER badge, name, brokerage, phone + email CTAs
8. **Contact form** — First/Last/Email/Phone/Date/Message, privacy note
9. **Footer** — Address, nav links, KW logo

### Listing Copy Tone
- Specific and metric-forward: exact sq ft, room dimensions, school ratings, walk scores
- Short punchy H2s: *"Three Levels of Considered Design"*, *"Wet Bar. Wine Fridge. Rooftop Views."*
- Architecture vocabulary: "considered design", "organic material palette", "clean lines", "wide-plank hardwoods", "quartz surfaces"
- Neighborhood anchoring: every listing ties to 3–5 nearby landmarks with distances
- No superlatives — let the specs speak

### CTA Language
- `Schedule a Showing` / `Get More Info` (listing)
- `Book a Seller Strategy Call` (homepage seller)
- `Get Curated Listings` (homepage buyer scroll)
- `Get Your Valuation →` / `Get Matched →` / `Start Your Relocation →` (service cards)
- `Submit Request` (contact form)

---

## Voice & Tone

| Attribute | Description |
|---|---|
| **Personality** | Expert, calm, direct, design-literate |
| **Tone** | Elevated but not pretentious. Specific over vague. |
| **Language** | Short sentences. Concrete details. No fluff. |
| **Avoid** | Exclamation points. Superlatives ("amazing", "incredible"). Corporate RE speak ("motivated sellers", "turnkey"). |
| **Use** | Neighborhood names. Specific measurements. Material names. Walk score data. |

### Headline Formula
> **[Spatial/Design Hook]** + **[Specific Detail]**
- *"Modern Living on West 20th Avenue"*
- *"Denver Real Estate for Distinctive Homes"*
- *"Three Levels of Considered Design"*

### Body Copy Formula
> 2–3 tight paragraphs. First: what the home/service is. Second: what makes it distinctive. Third: the lifestyle case or call to action.

---

## Tracking & Analytics

| Tool | ID |
|---|---|
| Google Tag Manager | GTM-TWK9Q9NR |
| Google Analytics 4 | G-FF0EWBXMKM |
| Google Ads | AW-17827272815 |
| GoHighLevel | tk_8ee35a1b99c74c969f274765867e1ad2 |

---

## Third-Party Widgets

| Tool | ID / Embed |
|---|---|
| Elfsight Reviews | App ID: `6a8fddef-b305-41ad-b4b2-85906d6fbbe2` |

---

## Key Pages

| Page | Path | Purpose |
|---|---|---|
| Homepage | `/` | Seller lead gen + brand hub |
| Home Valuation | `/home-valuation` | Seller CMA lead capture |
| Find Your Realtor | `/find-your-local-realtor` | Buyer matching lead capture |
| Moving to Denver | `/moving` | Relocation lead capture |
| Listing (example) | `/3227-w-20th-ave-denver-co-80211` | Property marketing page |
| Thank You | `/thank-you` | Post-form conversion confirmation |

---

## Affiliated Logos in Use

- Keller Williams Urban Elite (`/kwlogo.png`)
- Google (`/Google_2015_logo.svg.webp`)
- Lockheed Martin (`/Lockheed_Martin_logo_(2011–2022).svg.png`)
- Niagara (`/Niagara-logo-color@2x.png`)
- RBC Wealth Management (`/rbc_wealth_management_logo.webp`)
