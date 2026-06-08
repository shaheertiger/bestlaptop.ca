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

## Measurement

Wire GA4 + Search Console and event-track: comparison builds, table filter usage, retailer (affiliate) clicks, and newsletter signups.
