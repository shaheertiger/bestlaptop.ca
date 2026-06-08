# SEO Strategy

## Technical SEO (implemented)

- **Static generation / SSG** for all content pages (fast TTFB, easy to crawl).
- **Clean URL structure** mirroring the content hierarchy (`/laptop/reviews/{brand}/{model}`).
- **Canonical tags** on every page via `alternates.canonical`.
- **XML sitemap** (`/sitemap.xml`) covering all reviews, best lists, brands, guides, comparisons, tests, and deal categories with priorities.
- **robots.txt** (`/robots.txt`) + sitemap reference.
- **RSS feed** (`/rss.xml`).
- **Structured data (JSON-LD)**: `Organization` (root), `BreadcrumbList` (all pages), `Review` + `Product` (reviews), `ItemList` (best lists), `FAQPage` (reviews/guides/best lists/brands), `Article` (guides).
- **Mobile-first** responsive layout; horizontal-scroll tables on mobile.
- **Breadcrumbs** on every deep page.
- **Metadata templates** with `metadataBase`, OpenGraph, Twitter cards, `en_CA` locale.
- **Updated dates** and author/reviewer attribution on reviews, best lists, and guides.
- **Internal linking automation**: related reviews, related comparisons, related guides, and category chips are generated from the dataset.

## On-page SEO

- One `<h1>` per page; clear `<h2>`/`<h3>` hierarchy.
- Direct answer in the first paragraph (best lists and guides lead with the answer).
- SEO title + meta description (< 155 chars) per page.
- Comparison tables, FAQ sections, author box, editorial/affiliate/methodology links.

## Programmatic SEO

Scalable page types generated from data:

- **Best lists** — `bestCategories` (use-case, price, type, size, brand) → `/laptop/reviews/best/{slug}`.
- **Brand pages** — `brands` → `/laptop/reviews/{brand}`.
- **Comparisons** — `comparisons` → `/laptop/compare/{slug}`.
- **Guides** — `guides` → `/laptop/learn/{slug}`.
- **Deal categories** — `dealCategories` → `/laptop/deals/{slug}`.

Adding a row to the relevant `src/data/*` file creates a fully-formed, interlinked, schema-marked page. Target query families include: "best laptops Canada", "best laptops under $X Canada", "best {use case} laptops", "best {brand} laptops Canada", "{A} vs {B}", and "{topic} explained".

## Keyword coverage (2,500+)

`src/data/keywords.ts` generates a deduplicated map of **2,500+ Canadian laptop keywords** from templates, each assigned to the on-site URL best positioned to rank for it. Groups: best lists × modifiers × geo, brands, brand × category, price points, comparisons, reviews, guides, deals, activities/software, majors, value, retailer intent, brand-vs-brand, and size × use. The full set is surfaced as an internal-linking hub at `/laptop/popular-searches`.

Every laptop pair also gets a real `{A} vs {B}` comparison page (auto-generated in `src/data/comparisons.ts`), so head-to-head queries land on a dedicated page.

## 2026 freshness & rich-result signals

- `robots` set to `max-image-preview:large`, `max-snippet:-1`, `max-video-preview:-1` for full rich-result eligibility.
- `WebSite` + `SearchAction` JSON-LD (sitelinks search box) and `Organization` with logo + `areaServed: Canada`.
- `Review` schema uses `datePublished`/`dateModified` and `AggregateOffer` (low/high price, offer count) in CAD.
- Sitemap emits real per-content `lastModified` dates (review tested dates, guide update dates) and `daily` change frequency on best lists.
- Self-referential `hreflang` (`en-CA` + `x-default`), `theme-color`, and 2026-framed titles/descriptions.

## LLM / AI search optimization (GEO)

For visibility and citations in AI search (ChatGPT, Perplexity, Google AI Overviews, Claude):

- **`/llms.txt`** — a curated, link-first markdown map of the site (best lists, top reviews, comparisons, guides, brands, tools, deals, methodology) following the emerging llms.txt convention, so models can find and cite the most useful pages.
- **AI crawlers explicitly allowed** in `robots.ts` (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, anthropic-ai, PerplexityBot, Google-Extended, Applebot-Extended, CCBot, and more).
- **Extractable answers** — every guide leads with a direct "Short answer", every review with a "Quick verdict", and FAQs use FAQ schema, so models can lift clean, attributable passages.
- **`speakable` structured data** marks the headline and direct answer as the key quotable passages.
- **Comparison tables, scored lists, and consistent entity naming** make data easy for models to parse and reproduce accurately.

## Measurement

Wire GA4 + Search Console and event-track: comparison builds, table filter usage, retailer (affiliate) clicks, and newsletter signups.
