# BestLaptop.ca

Canada's independent laptop review, comparison, testing, and buying-guide platform — a testing-first product authority inspired by the functional structure of leading product-testing publications, focused only on laptops.

Built with **Next.js 15 (App Router) + TypeScript + Tailwind CSS**. Statically generated, SEO-first, mobile-first, and accessible.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (fully static + SSG)
npm run start    # serve the production build
```

## Architecture

```
src/
├── app/                      # App Router pages (one route per folder)
│   ├── page.tsx              # Homepage (/)
│   ├── laptop/               # Laptop hub, reviews, best lists, tools, deals, learn, tests
│   ├── membership/           # Membership plans
│   ├── about|contact|...     # Company + legal pages
│   ├── sitemap.ts            # XML sitemap
│   ├── robots.ts             # robots.txt
│   └── rss.xml/route.ts      # RSS feed
├── components/               # Reusable UI (Header, Footer, Score, cards, blocks, tools)
│   └── tools/                # Client-side interactive tools (Table, Compare, Graph, Vote, Custom Ratings)
├── data/                     # Structured content "database" (typed TS)
│   ├── laptops.ts            # Laptop records (full testing schema)
│   ├── categories.ts         # "Best" category definitions + filters
│   ├── brands.ts             # Brand pages
│   ├── guides.ts             # Buying guides
│   ├── comparisons.ts        # Curated head-to-head comparisons
│   ├── tests.ts              # Testing methodology + Test Bench changelogs
│   └── pipeline.ts           # Review pipeline + deals
└── lib/
    ├── types.ts              # Core data model (Laptop, scores, test results, etc.)
    ├── scoring.ts            # 10-point weighted scoring + presets + helpers
    └── site.ts               # Site config + navigation
```

The "database" is a typed in-repo dataset so the whole site builds statically. To move to Postgres/Supabase, replace the `src/data/*` accessors with queries that return the same types from `src/lib/types.ts` — pages and components are decoupled from the source.

---

## Full sitemap

```
/                                         Homepage
/laptop                                   Laptop landing page
/laptop/reviews                           Review list
/laptop/reviews/index                     Review index (A–Z)
/laptop/reviews/best/{category}           Best lists (27 categories)
/laptop/reviews/{brand}                   Brand pages (13 brands)
/laptop/reviews/{brand}/{model}           Laptop review
/laptop/reviews/{brand}/{model}/test-results   Raw test data
/laptop/compare/{slug}                    Curated comparison pages
/laptop/tools/compare                     Compare tool (2–4 laptops)
/laptop/tools/table                       Sortable/filterable results table
/laptop/tools/graph                       Graph tool (bar + scatter)
/laptop/tools/custom-ratings              Custom score weighting
/laptop/review-pipeline                   Purchased → testing → published
/laptop/vote                              Vote for the next review
/laptop/deals                             Deals hub
/laptop/deals/{category}                  Deal categories
/laptop/learn                             Buying guides hub
/laptop/learn/{topic}                     Buying guides (21 guides)
/laptop/learn/how-we-test                 Testing methodology overview
/laptop/tests/{slug}                      Per-category test methodology
/laptop/tests/changelogs                  Test Bench version history
/laptop/brands                            Brands hub
/laptop/news                              News & updates
/membership                               Membership plans
/about /contact /how-we-make-money
/editorial-policy /affiliate-disclosure
/privacy-policy /terms                    Company + legal
/sitemap.xml /robots.txt /rss.xml         SEO infrastructure
```

See `docs/` for the strategy deliverables:

- [`docs/scoring-methodology.md`](docs/scoring-methodology.md)
- [`docs/seo-strategy.md`](docs/seo-strategy.md)
- [`docs/editorial-style-guide.md`](docs/editorial-style-guide.md)
- [`docs/monetization-and-membership.md`](docs/monetization-and-membership.md)
- [`docs/build-and-launch-plan.md`](docs/build-and-launch-plan.md)
- [`docs/database-schema.md`](docs/database-schema.md)

---

## Key features

- **Testing-first reviews** with weighted 10-point scores, use-case scores, and a separate raw test-results page per laptop.
- **Interactive tools**: results table (filter/sort/CSV export/compare), compare tool (category winners + share URLs), graph tool (bar + scatter), custom ratings (reweight + re-rank), and voting.
- **Best lists** generated from category filters, with full RTINGS-style structure (summary table, ranked picks, how we picked/test/choose, FAQ).
- **SEO**: per-page metadata, canonical tags, breadcrumb/FAQ/Review/ItemList/Article/Organization JSON-LD, sitemap, robots, RSS, programmatic best/brand/comparison/guide pages.
- **Accessibility**: semantic headings, skip link, ARIA labels, keyboard-navigable tools, labelled forms, focus styles.
- **Performance**: static generation, system-font stack, lightweight inline SVG charts/score circles, no heavy client libraries.

## Notes

- Prices and product data are illustrative CAD figures for demonstration.
- Product images are rendered as styled placeholders (`ProductImage`) so the build needs no binary assets; swap in `next/image` with real photography for production.
- Forms (newsletter, feedback, contact, comments) are wired as UI; connect to your ESP/CRM/comments backend for production.
