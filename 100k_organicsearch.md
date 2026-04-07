# 100K Organic Search Sessions — Obsidian Denver Growth Plan

> **Goal:** Reach 100,000 monthly organic search sessions within 18 months, building Obsidian Denver into the dominant hyperlocal real estate brand for Denver's most desirable neighborhoods.
> **Starting Point:** ~5 indexed pages, 0 blog content, 0 neighborhood pages, strong conversion funnels already live.
> **Site:** Obsidian Denver (Next.js 15, Keller Williams Urban Elite brokerage)
> **Team:** David & Dax — Co-Founders
> **Office:** 4045 N Pecos St #201, Denver, CO 80211

---

## Current State — April 2026 Audit

| Metric | Value |
|---|---|
| Total indexed pages | ~5 (Homepage, Home Valuation, Find Your Realtor, Moving, Property Landing) |
| Blog posts | 0 |
| Neighborhood/area pages | 0 |
| Lead capture forms | 4 (submit-valuation, submit-realtor, submit-moving, submit-property) |
| SEO infrastructure | ⚠️ No sitemap.xml, no robots.txt, no structured data |
| Analytics | ✅ GA4 (G-FF0EWBXMKM), GTM (GTM-TWK9Q9NR), Google Ads (AW-17827272815), GoHighLevel |
| Conversion tracking | ✅ `dataLayer.push({ event: 'lead_form_submit' })` on all forms |
| Tech stack | Next.js 15 + SendGrid + Vercel (assumed) |
| Core neighborhoods | West Highland, LoHi, Sloan's Lake (80211) |
| Team | David & Dax — architectural, historic & luxury home specialists |
| Brokerage | Keller Williams Urban Elite |
| Client testimonials | 9 displayed on site |
| Corporate relocation logos | Google, Lockheed Martin, Niagara, RBC Wealth Management |

### Strengths

- **Premium brand positioning** — "architectural + historic home specialists" is a differentiated niche most Denver agents don't claim
- **Multi-funnel conversion architecture** — separate optimized forms for sellers, buyers, and relocators already built and tracking
- **Video hero** — professional Denver aerial footage creates premium first impression
- **Social proof** — real client reviews + Fortune 500 relocation logos = trust
- **Modern tech stack** — Next.js 15 means fast page loads, easy SSG/ISR for SEO pages, and simple scaling

### Gaps

- **Zero content beyond landing pages** — no blog, no neighborhood guides, no market reports
- **No structured data** — missing LocalBusiness, RealEstateAgent, FAQPage, BreadcrumbList schemas
- **No sitemap.xml or robots.txt** — Google is crawling blind
- **No internal linking architecture** — 5 pages barely cross-link
- **No Google Business Profile optimization cadence** — no posting schedule
- **No backlink strategy** — domain authority likely DA 0–5
- **Title tags and meta descriptions** — only "Obsidian Denver" + "Landing pages" set globally in layout.tsx
- **No neighborhood pages** — the highest-converting page type for real estate doesn't exist yet

---

## The 100K Strategy: Content Pillars for Real Estate

Unlike a news site (volume-driven) or SaaS (product-driven), a real estate team reaches 100K organic sessions through **hyperlocal content depth** across four pillars:

| Pillar | Page Types | Traffic Role | % of Target |
|---|---|---|---|
| **1. Neighborhood Pages** | 60+ landing pages for Denver neighborhoods & suburbs | Mid-funnel, high-intent buyer/seller traffic | 35% |
| **2. Blog Content** | 200+ articles on Denver market, buying/selling guides, relocation | Top-of-funnel awareness + long-tail keywords | 40% |
| **3. Market Data Pages** | Monthly market reports, price trackers, school/tax data | Recurring traffic, backlink magnets, authority builders | 15% |
| **4. Core Landing Pages** | Home valuation, realtor matching, moving, property pages | Bottom-funnel conversion pages with branded search | 10% |

**Target at 18 months:** 300+ indexed pages generating 100,000 organic sessions/month.

---

## Phase 1 — Foundation Fixes (Weeks 1–3)

**Target: Technical SEO foundation, structured data, and crawlability — unlock Google's ability to find and understand the site.**

### 1.1 Technical SEO Setup

| Task | Details | Priority |
|---|---|---|
| Create `sitemap.xml` | Auto-generate from Next.js routes using `next-sitemap` or custom `app/sitemap.ts` | Critical |
| Create `robots.txt` | Allow all public routes, disallow `/api/*`, `/thank-you` | Critical |
| Unique `<title>` per page | Currently all pages inherit "Obsidian Denver" / "Landing pages" from layout.tsx. Each page needs keyword-rich unique titles | Critical |
| Unique `<meta description>` per page | 130–155 chars, primary keyword in first 60 chars | Critical |
| Canonical URLs | Add `<link rel="canonical">` to every page | High |
| `favicon` + `apple-touch-icon` | Brand presence in browser tabs and bookmarks | Medium |

### 1.2 Structured Data Deployment

Every page on the site needs appropriate schema markup:

| Schema Type | Where | Purpose |
|---|---|---|
| `RealEstateAgent` | All pages (global in layout or per-page) | Rich results for "Denver real estate agent" searches |
| `LocalBusiness` | All pages | Maps integration, knowledge panel eligibility |
| `FAQPage` | Home valuation, realtor matching, neighborhood pages | FAQ rich results in SERPs |
| `BreadcrumbList` | All pages except homepage | Breadcrumb display in search results |
| `RealEstateListing` | Property pages (`/[location]`) | Property rich results |
| `Organization` | Homepage | Brand knowledge panel, logo, reviews |
| `Person` | About/team page (to build) | E-E-A-T signal for David & Dax |

### 1.3 Page-Level Metadata Plan

| Page | Title Tag | Meta Description |
|---|---|---|
| `/` | "Obsidian Denver \| Architectural & Historic Homes \| West Highland, LoHi, Sloan's Lake" | "Denver's boutique real estate team specializing in architectural, historic, and luxury homes across West Highland, LoHi, and Sloan's Lake. KW Urban Elite." |
| `/home-valuation` | "Free Denver Home Valuation \| What's Your Home Really Worth? \| Obsidian Denver" | "Get an accurate home valuation from Denver experts — not algorithms. Obsidian Denver provides personalized property assessments for West Highland, LoHi & beyond." |
| `/find-your-local-realtor` | "Find a Top Denver Realtor \| Obsidian Denver Agent Matching" | "Get matched with a vetted, top-performing Denver real estate agent. Join 350+ Denver families who skipped the guesswork. Limited availability." |
| `/moving` | "Moving to Denver? Relocation Guide & Realtor Support \| Obsidian Denver" | "Relocating to Denver with family? Let Obsidian Denver handle the housing so you can focus on your move. Trusted by Google, Lockheed Martin employees." |

### 1.4 Google Search Console + GBP Setup

- Verify domain in Google Search Console
- Submit `/sitemap.xml`
- Verify all pages are being indexed (Coverage report)
- Set up Google Business Profile with complete information:
  - Business name: Obsidian Denver
  - Address: 4045 N Pecos St #201, Denver, CO 80211
  - Phone: (720) 706-6768
  - Category: Real Estate Agent (primary), Real Estate Agency (secondary)
  - Service areas: all target neighborhoods
  - Services listed: Buyer Representation, Seller Representation, Home Valuation, Luxury Real Estate, Relocation Services
  - Photos: team photos, sold properties, neighborhood shots

---

## Phase 2 — Neighborhood Content Engine (Weeks 3–12)

**Target: Build 60+ neighborhood landing pages — the core traffic driver for real estate SEO.**

### 2.1 Neighborhood Page Architecture

```
/neighborhoods/                    (hub page — "Denver Neighborhoods Guide")
 ├── /west-highland               (West Highland landing page)
 ├── /lohi                        (LoHi / Lower Highlands)
 ├── /sloans-lake                 (Sloan's Lake)
 ├── /highland                    (Highland)
 ├── /berkeley                    (Berkeley)
 ├── /downtown-denver             (Downtown Denver)
 ├── /cherry-creek                (Cherry Creek)
 ├── /washington-park             (Washington Park)
 ├── /rino                        (River North Art District)
 ├── /arvada                      (Arvada)
 └── ... (60+ total)
```

### 2.2 Neighborhood Page Template (SEO-Optimized)

Every neighborhood page ships with:

```
✅ metadata.title         — "Homes for Sale in [Neighborhood], Denver | Obsidian Denver"
✅ metadata.description   — 130–155 chars, "[Neighborhood] homes for sale" in first 60 chars
✅ H1                     — "Homes for Sale in [Neighborhood], Denver"
✅ 800–1,200 words        — unique content: overview, architecture, market data, schools, amenities
✅ Market snapshot table   — median price, days on market, inventory, YoY change
✅ School district info    — names, ratings, boundaries
✅ Local amenities         — restaurants, parks, transit, walkability score
✅ Google Map embed        — centered on neighborhood boundaries
✅ Client testimonial      — from a buyer/seller in or near that neighborhood
✅ Featured listings       — 3–4 active listings or "See all homes" MLS link
✅ CTA: Sellers            — "Find out what your [Neighborhood] home is worth" → /home-valuation
✅ CTA: Buyers             — "Get matched with a [Neighborhood] expert" → /find-your-local-realtor
✅ FAQ section (3–5 Qs)    — "What's the average home price in [Neighborhood]?" etc.
✅ RealEstateAgent schema  — areaServed: [Neighborhood]
✅ FAQPage schema          — structured data for FAQ section
✅ BreadcrumbList          — Home → Neighborhoods → [Neighborhood]
✅ Internal links          — 4–6 links to adjacent neighborhoods + blog posts + core pages
```

### 2.3 Build Priority & Schedule

| Phase | Timeframe | Neighborhoods | Pages |
|---|---|---|---|
| **Phase 2A** | Weeks 3–6 | West Highland, LoHi, Sloan's Lake, Highland, Berkeley, Downtown Denver, Cherry Creek, Washington Park, RiNo, Arvada | 10 |
| **Phase 2B** | Weeks 6–9 | Sunnyside, Jefferson Park, Tennyson, Baker, Five Points, City Park, Congress Park, Hilltop, Country Club, Platt Park, Capitol Hill, Uptown, Observatory Park, Bonnie Brae, Regis | 15 |
| **Phase 2C** | Weeks 9–12 | Wheat Ridge, Golden, Lakewood, Westminster, Broomfield, Thornton, Edgewater, Englewood, Littleton, Centennial, Parker, Castle Rock, Aurora + niche pages | 20 |
| **Ongoing** | Months 4–12 | New neighborhoods, sub-neighborhoods, condo buildings, school zones | 15+ |
| **Total** | | | **60+** |

### 2.4 Niche Architecture Pages (High-Value Long-Tail)

Obsidian Denver's specialization in architectural homes unlocks unique niche pages:

| Page | Target Keyword | Est. Monthly Searches |
|---|---|---|
| `/historic-homes-denver` | "Denver historic homes for sale" | 200–500 |
| `/craftsman-bungalows-denver` | "Denver craftsman bungalow" | 50–150 |
| `/mid-century-modern-denver` | "mid-century modern homes Denver" | 100–300 |
| `/victorian-homes-denver` | "Victorian homes Denver" | 50–200 |
| `/luxury-homes-denver` | "Denver luxury homes for sale" | 500–1,000 |
| `/denver-condos` | "Denver condos for sale" | 500–1,500 |
| `/denver-townhomes` | "Denver townhomes for sale" | 300–800 |
| `/new-construction-denver` | "new construction homes Denver" | 300–600 |

---

## Phase 3 — Blog Content Engine (Weeks 4–Ongoing)

**Target: Publish 3–4 articles per week, building topical authority across Denver real estate.**

### 3.1 Content Pillars (Priority Order)

| Pillar | Topic Cluster | Keyword Opportunity | Why |
|---|---|---|---|
| **Denver Market Intelligence** | Market reports, price trends, forecasts, inventory data | "Denver housing market" family (10K+/mo combined) | Recurring monthly content, authoritative, backlink-worthy |
| **Neighborhood Guides** | Deep-dives, comparisons, "best of" lists | "[Neighborhood] guide" family (5K+/mo combined) | Supports neighborhood pages, high intent |
| **Buyer Education** | First-time buyer, financing, inspection, closing process | "buying a home in Denver" family (8K+/mo combined) | High volume, builds trust, supports buyer funnels |
| **Seller Strategy** | Pricing, staging, timing, cost to sell | "selling a home in Denver" family (5K+/mo combined) | Directly feeds `/home-valuation` CTA |
| **Relocation Content** | Moving guides, cost of living, employer guides, city comparisons | "moving to Denver" family (15K+/mo combined) | Huge volume, supports `/moving` page, relocation leads are high-value |
| **Architecture & Lifestyle** | Historic homes, architectural styles, Denver culture | "Denver [architecture style] homes" (3K+/mo) | Obsidian Denver's differentiator, low competition |

### 3.2 Content Cadence

| Day | Article Type | Pillar | Example |
|---|---|---|---|
| Monday | Buyer/Seller Guide | Education | "How Much House Can I Afford in Denver on a $120K Salary?" |
| Tuesday | Neighborhood Deep-Dive | Neighborhoods | "Living in West Highland: The Complete Guide (2026)" |
| Wednesday | Market Data / Trends | Market Intel | "Denver Real Estate Market Report: April 2026" |
| Thursday | Relocation Content | Relocation | "Moving to Denver from Texas: What 500 Families Wish They'd Known" |
| Friday | Lifestyle / Architecture | Architecture | "The History of Denver's Craftsman Bungalows (And Where to Find Them)" |

### 3.3 Content Calendar — First 8 Weeks (40 articles)

#### Weeks 1–2: Foundation (8 articles)

| # | Title | Target Keyword | Type |
|---|---|---|---|
| 1 | "Denver Housing Market Forecast 2026" | "Denver housing market 2026" | Market Report |
| 2 | "Best Neighborhoods in Denver for Families" | "best neighborhoods Denver families" | Buyer Guide |
| 3 | "How Much Does It Cost to Live in Denver?" | "cost of living Denver" | Relocation |
| 4 | "Selling Your Denver Home: The Complete Guide" | "selling home Denver" | Seller Guide |
| 5 | "West Highland: The Complete Neighborhood Guide" | "West Highland Denver" | Neighborhood |
| 6 | "LoHi vs. West Highland: Which Is Right for You?" | "LoHi vs West Highland" | Comparison |
| 7 | "What Zillow Won't Tell You About Your Denver Home's Value" | "Denver home value" | Seller |
| 8 | "Moving to Denver from California: Everything to Know" | "moving to Denver from California" | Relocation |

#### Weeks 3–4 (8 articles)

| # | Title | Target Keyword | Type |
|---|---|---|---|
| 9 | "First-Time Homebuyer's Guide to Denver" | "first time home buyer Denver" | Buyer |
| 10 | "Denver's Historic Neighborhoods: Where to Find Character Homes" | "Denver historic homes" | Architecture |
| 11 | "Sloan's Lake: Why This Is Denver's Best-Kept Secret" | "Sloan's Lake real estate" | Neighborhood |
| 12 | "How to Choose a Real Estate Agent in Denver" | "best realtor Denver" | Buyer/Seller |
| 13 | "Denver School Districts Ranked for Homebuyers" | "Denver school districts" | Relocation |
| 14 | "The Cost of Selling a Home in Denver (Every Fee Explained)" | "cost to sell house Denver" | Seller |
| 15 | "Denver Luxury Real Estate: Trends & Top Neighborhoods" | "Denver luxury homes" | Luxury |
| 16 | "Corporate Relocation to Denver: Your Company's Moving You" | "corporate relocation Denver" | Relocation |

#### Weeks 5–6 (8 articles)

| # | Title | Target Keyword | Type |
|---|---|---|---|
| 17 | "April 2026 Denver Market Report: Prices, Inventory & Outlook" | "Denver market report April 2026" | Market |
| 18 | "Best Denver Suburbs for Commuters (Drive Times & Costs)" | "Denver suburbs commuters" | Relocation |
| 19 | "Denver Mid-Century Modern Homes: Guide & Neighborhoods" | "mid-century modern Denver" | Architecture |
| 20 | "How Long Does It Take to Sell a House in Denver?" | "how long sell house Denver" | Seller |
| 21 | "Cherry Creek Neighborhood Guide: Denver's Premier Address" | "Cherry Creek Denver homes" | Neighborhood |
| 22 | "Denver vs. Austin: Where Should You Move in 2026?" | "Denver vs Austin" | Relocation |
| 23 | "Denver Home Inspection Checklist: What to Watch For" | "Denver home inspection" | Buyer |
| 24 | "RiNo Denver: From Art District to Real Estate Hotspot" | "RiNo Denver real estate" | Neighborhood |

#### Weeks 7–8 (8 articles)

| # | Title | Target Keyword | Type |
|---|---|---|---|
| 25 | "Denver Property Tax Guide: What Homeowners Pay in 2026" | "Denver property tax" | Buyer/Seller |
| 26 | "Moving to Denver with Kids: Schools, Neighborhoods & Family Life" | "moving to Denver with kids" | Relocation |
| 27 | "Highland Denver: Complete Guide to NW Denver's Crown Jewel" | "Highland Denver real estate" | Neighborhood |
| 28 | "How to Stage Your Denver Home for a Fast Sale" | "staging home Denver" | Seller |
| 29 | "Denver Condo Market: Prices, Trends & Best Buildings" | "Denver condos for sale" | Buyer |
| 30 | "Denver Craftsman Bungalows: Architecture, History & Where to Buy" | "Denver craftsman bungalow" | Architecture |
| 31 | "Washington Park Neighborhood Guide: Denver's Most Walkable" | "Washington Park Denver homes" | Neighborhood |
| 32 | "May 2026 Denver Market Report" | "Denver market report May 2026" | Market |

### 3.4 Ongoing Content (Months 3–18): 12–16 articles/month

- **Monthly market reports** (12/year) — recurring, builds authority, gets backlinks
- **Neighborhood guides** (1/week) — supports each new neighborhood page
- **Seasonal content** — "Spring Selling Prep", "Denver Holiday Market", "Back-to-School Neighborhood Guide"
- **Comparison content** — "Denver vs. [City]" for every major relocation origin
- **Buyer how-to series** — financing, inspection, closing, first-time, investment
- **Seller strategy series** — pricing, staging, timing, off-market, FSBO comparison
- **Architecture series** — Victorian, Craftsman, Tudor, Mid-Century, Contemporary
- **Data-driven pieces** — "Most Expensive Denver Zip Codes", "Fastest-Growing Denver Neighborhoods"

### 3.5 Article → Lead Conversion Path

Every blog post must include:
1. **Inline CTA at 40% scroll** — contextual to the article topic
2. **End-of-post CTA** — links to the relevant form:
   - Seller content → `/home-valuation`
   - Buyer content → `/find-your-local-realtor`
   - Relocation content → `/moving`
3. **"Related Neighborhoods" component** — links to 3 neighborhood pages
4. **Internal links** — 4–6 links to other blog posts + neighborhood pages within the body
5. **Author card** — David or Dax with photo, title, bio paragraph (E-E-A-T signal)

---

## Phase 4 — Market Data & Programmatic Content (Months 3–8)

**Target: Build recurring, data-driven content that generates backlinks and repeat visits.**

### 4.1 Monthly Market Report Hub

Create `/market-report/` as a hub page linking to monthly reports:

```
/market-report/                          (hub — "Denver Real Estate Market Reports")
 ├── /market-report/april-2026          (April 2026 Denver Market Report)
 ├── /market-report/may-2026            (May 2026 Denver Market Report)
 └── ... (monthly, ongoing)
```

Each monthly report includes:
- Median sale price (citywide + by neighborhood)
- Days on market
- Active inventory count
- New listings vs. closings
- Year-over-year comparisons
- Neighborhood spotlight (rotate)
- "What this means for buyers/sellers" analysis from David or Dax

**Why this matters for 100K:** Market reports get shared by mortgage professionals, title companies, and local media. They generate backlinks naturally and create recurring monthly traffic.

### 4.2 Neighborhood Data Pages (Programmatic)

For every neighborhood page, auto-generate a `/[neighborhood]/market-data` companion:

| Data Point | Source | Update Cadence |
|---|---|---|
| Median sale price | MLS / public records | Monthly |
| Average price per sq ft | MLS | Monthly |
| Days on market | MLS | Monthly |
| Active listings count | MLS | Weekly |
| School ratings | GreatSchools API | Annually |
| Walk Score | Walk Score API | Annually |
| Crime stats | Denver Open Data | Quarterly |

These pages target "[neighborhood] home prices", "[neighborhood] real estate market" — informational queries with steady volume year-round.

### 4.3 School Zone Pages

Create school-district-specific pages:

| Page | Target Keyword | Est. Monthly Searches |
|---|---|---|
| `/schools/denver-public-schools` | "Denver Public Schools real estate" | 100–300 |
| `/schools/jefferson-county` | "Jefferson County schools homes" | 100–200 |
| `/schools/cherry-creek-schools` | "Cherry Creek School District homes for sale" | 200–500 |
| `/schools/douglas-county` | "Douglas County schools homes" | 100–300 |

Parents are the #1 driver of home purchases. School zone pages capture this massive intent.

### 4.4 "Best Of" & Comparison Pages (Link Magnets)

| Page | Target Keyword | Type |
|---|---|---|
| `/best-neighborhoods-denver-families` | "best neighborhoods Denver families" | Listicle |
| `/best-neighborhoods-denver-young-professionals` | "best neighborhoods Denver young professionals" | Listicle |
| `/most-expensive-neighborhoods-denver` | "most expensive Denver neighborhoods" | Data |
| `/denver-vs-austin` | "Denver vs Austin cost of living" | Comparison |
| `/denver-vs-seattle` | "Denver vs Seattle" | Comparison |
| `/denver-vs-phoenix` | "Denver vs Phoenix" | Comparison |
| `/denver-zip-code-guide` | "Denver zip codes map" | Reference |

---

## Phase 5 — Technical SEO & Performance (Weeks 2–8)

### 5.1 Internal Linking Architecture

Build a `RelatedNeighborhoods` component that auto-suggests nearby neighborhoods:

```
Current page: /west-highland
    ↓ geographic proximity
Suggested: /lohi, /sloans-lake, /highland, /berkeley, /sunnyside
```

Build a `RelatedArticles` component that matches blog posts by tag:

```
Current article tags: ["West Highland", "selling", "staging"]
    ↓ tag overlap scan
Suggested: "West Highland Guide", "How to Stage", "Selling in Denver"
```

Place both at the bottom of every page automatically. Target: 4–6 internal links per page, minimal manual effort.

### 5.2 Breadcrumb Architecture

Every page gets breadcrumbs reflecting the site hierarchy:

```
Home → Neighborhoods → West Highland
Home → Blog → Market Reports → April 2026
Home → Blog → Buyer Guides → First-Time Homebuyer's Guide
Home → Schools → Cherry Creek School District
```

### 5.3 Core Web Vitals

| Metric | Target | How |
|---|---|---|
| LCP (Largest Contentful Paint) | < 2.5s | `next/image` with `priority` on hero images, preload fonts |
| CLS (Cumulative Layout Shift) | < 0.1 | Explicit `width`/`height` on all images (already good with `next/image`) |
| FID / INP (Interaction to Next Paint) | < 200ms | Minimize client-side JS, use `'use client'` only where needed |

Next.js 15 SSG + Vercel edge delivers sub-2s LCP by default. Main risk: video hero on homepage — ensure it doesn't block LCP.

### 5.4 Mobile Optimization

- Denver home search is 65%+ mobile traffic
- Test all forms on 320px–430px viewports
- Ensure Google Map embeds are responsive
- Touch-target sizing on CTAs (min 44x44px)
- Lazy-load everything below the fold

---

## Phase 6 — Link Building & Authority (Months 2–18)

### 6.1 Link Building Strategy

| Strategy | Target Links/Month | Effort | Impact |
|---|---|---|---|
| Local business partnerships (lenders, inspectors, stagers) | 2–3 | Low | Medium |
| Denver directory listings (DMAR, Chamber, Keller Williams) | 5–10 (one-time) | Low | Medium |
| Guest posts on Denver lifestyle/business sites | 1–2 | Medium | High |
| Monthly market reports picked up by local media | 1–2 | Medium | High |
| "Best Denver [X]" cited by relocation/lifestyle blogs | 1–2 | Low (organic) | High |
| HARO / Connectively journalist responses | 1–2 | Medium | Very High |
| Free relocation resource linked by HR departments | 0.5–1 | Low (organic) | High |

### 6.2 PR Targets

| Publication | DA | Pitch Angle |
|---|---|---|
| **5280 Magazine** | 70+ | "Denver's hottest neighborhoods for 2026" — expert quote from David/Dax |
| **The Denver Post** | 85+ | Monthly market data, Denver housing affordability commentary |
| **Denverite** | 65+ | Neighborhood stories, architectural preservation, local market trends |
| **Westword** | 75+ | "Best neighborhoods for [lifestyle]" guides |
| **BusinessDen** | 50+ | Denver real estate investment, commercial-to-residential conversions |
| **Colorado Real Estate Journal** | 45+ | Industry perspective, market analysis |
| **Out There Colorado** | 55+ | Denver lifestyle, outdoor-focused neighborhoods |

### 6.3 Domain Authority Targets

| Month | Target DA | Key Driver |
|---|---|---|
| 3 | 10–15 | Directory listings + first partnerships |
| 6 | 15–20 | Guest posts + market report citations |
| 9 | 20–25 | Media mentions + organic resource links |
| 12 | 25–30 | Compound authority from 300+ pages + diverse backlinks |
| 18 | 30–35 | Established authority, recurring media relationships |

---

## Phase 7 — Distribution & Amplification (Ongoing)

### 7.1 Google Business Profile (Ongoing)

- **3 posts/week:** new listing, sold story, market stat, neighborhood spotlight
- **Photo uploads weekly:** professional neighborhood shots, team at closings, property photography
- **Review generation:** target 5+ new reviews/month (50+ total by month 6, 100+ by month 12)
- **Q&A section:** seed with common questions + answers

### 7.2 Social Media → SEO Flywheel

- Post every blog article on LinkedIn (David & Dax personal profiles) → mortgage/title pros share → referral traffic + brand signals
- Instagram Reels of neighborhoods (30-second walkthroughs) → drive branded search "Obsidian Denver [neighborhood]"
- YouTube neighborhood tours (5–10 min) → embed on neighborhood pages → video rich results + watch time

### 7.3 Email Newsletter

- **"Denver Market Insider"** — monthly email with market data, neighborhood spotlight, new blog posts
- Build list from lead magnets: "Denver Homebuyer's Toolkit" PDF, "Denver Relocation Guide" PDF
- Newsletter subscribers return to site → repeat sessions → engagement signals for Google

### 7.4 Partnerships & Referrals

- Mortgage lender partnerships: lenders link to Obsidian Denver neighborhood guides as resources for their clients
- Title company partnerships: include Obsidian Denver market reports in their client communications
- Employer HR departments: link to "Moving to Denver" guide in relocation packages (Google, Lockheed Martin, etc.)

---

## Milestone Projections

| Month | Est. Monthly Organic Sessions | Indexed Pages | Key Driver |
|---|---|---|---|
| 1 | 200–500 | 15 | Technical fixes + sitemap + first 10 neighborhood pages |
| 2 | 500–1,500 | 35 | Blog content starts ranking + 15 more neighborhood pages |
| 3 | 1,500–4,000 | 65 | 60 neighborhood pages + 30 blog posts indexed |
| 4 | 3,000–8,000 | 90 | Long-tail keywords compound + first market reports |
| 5 | 5,000–12,000 | 120 | Blog posts hitting page 1 for buyer/seller terms |
| 6 | 8,000–18,000 | 150 | Authority established for "Denver real estate" cluster |
| 8 | 15,000–30,000 | 200 | Neighborhood pages dominating hyperlocal searches |
| 10 | 25,000–45,000 | 250 | Market reports generating backlinks + recurring traffic |
| 12 | 40,000–65,000 | 300 | Compound growth across all pillars |
| 15 | 65,000–85,000 | 350 | Google Discover for Denver market articles |
| 18 | **100,000+** | 400+ | Full authority as Denver's #1 hyperlocal real estate content hub |

### Traffic Breakdown at 100K Sessions

| Source | Pages | Sessions/Page/Month | Total Sessions | % |
|---|---|---|---|---|
| Neighborhood pages | 60 | 400 | 24,000 | 24% |
| Blog posts | 200 | 150 | 30,000 | 30% |
| Market data pages | 25 | 500 | 12,500 | 12.5% |
| "Best of" / comparison pages | 15 | 600 | 9,000 | 9% |
| School zone pages | 10 | 400 | 4,000 | 4% |
| Architecture niche pages | 8 | 300 | 2,400 | 2.4% |
| Core landing pages | 5 | 800 | 4,000 | 4% |
| Homepage (branded) | 1 | 3,000 | 3,000 | 3% |
| Long-tail / misc | — | — | 11,100 | 11.1% |
| **Total** | **324+** | — | **100,000** | **100%** |

---

## Key Metrics to Track Weekly

| Metric | Tool | Target |
|---|---|---|
| Indexed pages | Google Search Console → Coverage | 100% of published pages |
| Average position | GSC → Performance → Queries | < 15 for pillar keywords by M6, < 10 by M12 |
| Click-through rate | GSC → Performance | > 3% (improve titles if below) |
| Organic sessions | GA4 (G-FF0EWBXMKM) | Monthly milestones per table above |
| Organic leads | GA4 `lead_form_submit` event | 10–15/month by M6, 25+/month by M12 |
| Internal links per page | Screaming Frog / manual audit | 4–6 minimum |
| Core Web Vitals | GSC → Core Web Vitals | All green (LCP < 2.5s, CLS < 0.1) |
| Domain authority | Ahrefs / Moz | 15 by M6, 25 by M12, 30+ by M18 |
| Google reviews | GBP | 50 by M6, 100 by M12 |
| Backlinks | Ahrefs | 50 referring domains by M6, 150 by M12 |
| Blog posts published | Internal tracking | 3–4/week → 12–16/month |
| Neighborhood pages live | Internal tracking | 60+ by M3 |

---

## Immediate Action Items (This Week)

1. **Create `sitemap.xml`** — use Next.js `app/sitemap.ts` to auto-generate from routes
2. **Create `robots.txt`** — `app/robots.ts` allowing all public pages, disallowing `/api/*`
3. **Add unique metadata to every page** — replace generic "Obsidian Denver" / "Landing pages" in layout.tsx with per-page metadata exports
4. **Deploy `RealEstateAgent` + `LocalBusiness` JSON-LD** — add to layout.tsx or create a shared component
5. **Verify domain in Google Search Console** — submit sitemap
6. **Set up Google Business Profile** — complete all fields, add photos, first post
7. **Build first 3 neighborhood pages** — West Highland, LoHi, Sloan's Lake (Obsidian Denver's core turf)
8. **Write first 2 blog posts** — "Denver Housing Market 2026" + "Best Neighborhoods in Denver for Families"
9. **Submit NAP to top 10 directories** — Zillow, Realtor.com, Yelp, Facebook, DMAR

---

## Revenue Projection at 100K Sessions

At 100,000 monthly organic sessions with Obsidian Denver's multi-funnel conversion architecture:

| Metric | Conservative | Moderate | Aggressive |
|---|---|---|---|
| Monthly organic sessions | 100,000 | 100,000 | 100,000 |
| Lead form conversion rate | 0.15% | 0.25% | 0.4% |
| Monthly organic leads | 150 | 250 | 400 |
| Lead → client close rate | 8% | 12% | 15% |
| Monthly transactions | 12 | 30 | 60 |
| Average transaction ($550K × 2.75%) | $15,125 GCI | $15,125 GCI | $15,125 GCI |
| **Monthly GCI** | **$181,500** | **$453,750** | **$907,500** |
| **Annual GCI** | **$2.18M** | **$5.45M** | **$10.9M** |

Even the conservative estimate — 12 organic transactions/month at $15K GCI each — represents a **$2.18M/year revenue stream from organic search alone**, with zero ad spend.

This is the compounding power of content at scale for a premium real estate brand.

---

*Document created: April 2026*
*Brand: Obsidian Denver — Keller Williams Urban Elite*
*Office: 4045 N Pecos St #201, Denver, CO 80211 · (720) 706-6768*
*Team: David & Dax, Co-Founders*
*Specialization: Architectural, historic & luxury homes — West Highland, LoHi, Sloan's Lake*
*Next review: Monthly during milestone check-ins*
