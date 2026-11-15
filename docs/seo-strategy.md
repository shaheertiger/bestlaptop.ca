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

## November 2026 update (Search Console + Semrush CA + playbook)

Inputs: GSC last 3 months (13.6K CA impressions, avg position ~21), Semrush CA exports for "best laptop" (30K keywords) and "ordinateur portable" (30K keywords), and the programmatic-SEO playbook.

**Template (all best lists, `src/app/laptop/reviews/best/[category]`)**
- Answer in the title and meta description: count, #1 pick, score and CAD price, generated from live data so numbers always agree.
- "Quick answer" block in the first screen (also the `speakable` selector).
- One key metric per list (`metric` in `src/data/categoryContent.ts`) shown in the quick answer and summary table; lists like battery, weight, export time and FPS-per-dollar use their own `sort`.
- Full crawlable specs & test-results table for every pick.
- Question-phrased H2 sections per sub-intent and list-specific FAQs (answers < 50 words, always visible, FAQPage schema).
- Single JSON-LD graph: Article (dateModified) + ItemList.
- Hand-picked related lists instead of "first 8".

**Pages**
- Video editing (4.5K impressions, pos ~12): ranked by 4K export time; H2s for Windows, editing + gaming, budget, 4K specs, Mac vs Windows.
- Framework brand page (pos ~5.5, low CTR): "Framework Laptop Canada" title + Canada buying, price, refurbished/used, 13 vs 16, comparison sections.
- New lists: cheap gaming (rebuilt `budget-gaming`, KD 23 / 4.4K), long battery life, lightweight, home use, touchscreen, Best Buy Canada, under $1,500.
- Duplicates `under-500-canada` / `under-1000-canada` 301 to their canonical lists.
- Chromebook vs Windows guide expanded from a stub into a full guide.
- Homepage: explicit title, quick answer, and a hub linking every best list. `/laptop` canonicalizes to `/`.
- Review titles carry the tested score ("… Review: 7.6/10, Tested in Canada").

**French (fr-CA)** — `/fr` hub + 15 lists at `/fr/{slug-traduit}` (`src/data/fr.ts`), reusing the English rankings, with reciprocal `hreflang` (en-CA / fr-CA / x-default). Targets "ordinateur portable" (12.1K, KD 35) and the "pas cher" cluster (~5.9K, KD ~26).

**Technical** — honest sitemap `lastmod` (`CONTENT_UPDATED` in `src/lib/site.ts`, never "now"), robots disallow for utm/gclid/fbclid/msclkid URLs, llms.txt lists each list's #1 pick plus the French pages.

**Next steps** — request indexing in GSC for `/fr`, `/laptop/reviews/best/video-editing`, `/laptop/reviews/framework` and the new lists; refresh `CONTENT_UPDATED` only when content really changes; re-pull GSC in 4–6 weeks and expand any page sitting at positions 4–15.

## Master SEO Playbook applied (Nov 15, 2026)

Source: the "Master SEO Playbook" (FontB, EatBetter, LoadMuscle, BodyPal, NutriScan, guntherheller, Bing and best-X-apps sections). Only rules that fit a laptop review site were applied; app-funnel, locale-mirror and expired-domain rules do not apply here.

**Answer first, with numbers, on every template**
- Reviews: a "Quick answer" block under the H1 (score, battery hours, weight, 1080p FPS, CAD price, and the laptop's best computed rank), with source, last-verified date and links to the methodology and test results. `speakable` points at it.
- Test results: title carries the measurements ("… Test Results: 15.2 h Battery, 478 Nits, 18 FPS"), meta description lists the full data answer, plus a quick answer.
- Comparisons: query first, then the verdict and scores in the title ("{A} vs {B}: Apple Wins, 8.5 vs 8.0"); meta description is the data answer (scores, battery, weight, FPS, prices); quick answer block.
- Brand hubs: quick answer computed from the brand's own models (best model, score range and median, price range, longest battery, lightest, cheapest).

**One question-phrased H2 per sub-intent, with the model name in it.** Review H2s are the searches themselves ("How long does the XPS 13 9350 battery last?", "Can the XPS 13 9350 run games?", "Can you upgrade the XPS 13 9350?"). Comparison analysis is split into question sections (faster, battery, screen, lighter, value, other differences). Including the model name means sibling pages never share identical headings (the Founderpath cannibalisation finding).

**Computed, page-unique data.** `metricRank` in `src/lib/insights.ts` ranks every laptop against all tested laptops ("#2 of 23 for lightness"). Ranks appear in review sections, FAQs, the quick answer, and a rank column on test-results pages. Comparisons add score-per-$1,000 and gaps in grams, hours and dollars.

**FAQs carry numbers.** Review FAQs went from 4 generic answers to 9 data-driven ones (battery, gaming FPS, price and retailer, RAM upgradeability, weight, heat and noise, touchscreen, ports). Comparison use-case FAQs now include both use-case scores.

**Schema**
- Test results: `Dataset` with `variableMeasured` for every measurement (the playbook's "schema type competitors don't use" for tables of measured values).
- Reviews: `positiveNotes` / `negativeNotes` (pros/cons) and `speakable`.
- Comparisons: `Article` about two `Product`s (each with its review rating and CAD offer).
- Brand hubs and the comparisons hub: `ItemList`.

**Internal links: hubs link down, pages link sideways and up**
- New hub `/laptop/compare` lists all 253 comparisons grouped by laptop in crawlable HTML; every comparison breadcrumb links to it.
- Comparison "related" links are now the sibling match-ups of the two laptops on the page, not the same four links sitewide (the NutriScan "identical similar list" mistake). The same fix for guides: "Tested laptops for this guide" picks relevant reviews instead of the same three on every guide.
- Reviews: the brand label links to the brand hub (SearchPilot +18% test: link existing text labels to the parent), the comparison table has a head-to-head link per rival, rivals are ordered by shared categories, and there is a link to all of the laptop's comparisons.
- Brand hubs list head-to-heads between the brand's own models.

**Thin and repeated text removed.** The 14 short-answer guides repeated the same answer three times (answer box, a "The short answer" H2, a one-question FAQ) plus a sitewide filler paragraph. Each now shows its answer once.

**Technical**
- `/sitemap.xml` is now a sitemap index with one sitemap per family (`/sitemaps/{pages,best-lists,reviews,test-results,comparisons,brands,guides,french}.xml`), so Search Console coverage can be read per template. Comparison lastmod = the newer of the two laptops' test dates. `npm run indexnow` follows the index.
- `robots.txt` blocks AhrefsBot, DataForSeoBot and SERankingBacklinksBot (competitor research only). All search and AI crawlers stay allowed.
- `npm run check:overlap` (after `npm run build`) reports 5-gram overlap between sibling pages per family. Target: median under 15%, investigate above 25%.

**Overlap, before → after (median 5-gram Jaccard, `<main>` without nav)**

| Family | Before | After |
|---|---|---|
| Comparisons (253) | 23.6% | 11.7% |
| Test results (23) | 32.3% | 19.3% |
| Reviews (23) | 22.9% | 17.6% |
| Brands (13) | 17.4% | 15.7% |

**Open items, need GSC data or an editorial decision**
1. ~~Near-duplicate best lists~~ — done, see "Near-duplicate best lists fixed" below.
2. **14 short-answer guides** (`quickGuide` in `src/data/guides.ts`) are one-paragraph pages. Expand the ones with impressions into full guides (question H2s, tables, FAQ). Prune or `noindex` the ones with 0 impressions after 90 days.
3. **253 generated comparisons.** Keep the template, but after 90 days prune match-ups with 0 impressions (most pairs, such as a Chromebook vs a gaming laptop, have no search demand), keeping one page per real query.
4. **French list titles** reuse the English title formula. SearchPilot found a translated "best deals" title formula cut traffic 4.6%, so test fr-CA title patterns separately.
5. **Bing:** verify in Bing Webmaster Tools (import from GSC), submit `/sitemap.xml`, and run `npm run indexnow` after each deploy. Read the 8+ word queries in Bing's keyword report monthly.

## Near-duplicate best lists fixed (Nov 15, 2026)

Eight best-list pairs shared 62–80% of their text. `laptop`, `brands` and `best-buy` showed the identical top 6 in identical order; so did `chromebook`/`under-500`, `business`/`windows` and `student`/`university-students`.

**Merged (301)**
- `/laptop/reviews/best/university-students` → `/laptop/reviews/best/college`. It had the same picks as `student`, and `college` already targets "College & University".

**Each list now has its own ranking** (`sort` + `rankedBy` in `src/data/categoryContent.ts`, filters in `src/data/categories.ts`)

| List | Now ranked by / filter |
|---|---|
| brands | Ranks brands, not laptops: one flagship per brand, brands ordered by the median score of all their tested models. Brand ranking section and brand quick answer |
| best-buy | Score per $1,000 at the Best Buy Canada price, 7.5/10+ only (overall ranking lives on /best/laptop) |
| budget | Score per $1,000 at the lowest price (under-1000 keeps "best laptop under the cap") |
| under-500 | Cheapest first, plus a computed "Can you get a Windows laptop under $500?" answer |
| chromebook | Measured battery life |
| college | Windows and macOS only (no Chromebooks), school use-case score; owns "university" sections |
| business | Business use-case score, includes MacBooks scoring 8.4+ (windows stays on overall score) |
| programming / engineering-students / working-from-home | Programming score / workstation score / keyboard + battery + display |

**Template (`src/app/laptop/reviews/best/[category]/page.tsx`)**
- Pick cards show a list-specific reason (rank on this list, this list's metric vs #1, price vs #1) plus the verdict's first sentence, instead of repeating the review's full verdict and buy/skip paragraphs on every list.
- "How we picked" and "How to choose" are computed from each list's picks (qualifying count, price/battery/weight ranges, cheapest/longest/lightest alternatives). The identical "How we test" section is removed; the methodology link stays.
- The two generic FAQs ("How did you choose…", "Are these prices in CAD?") are replaced with list-specific ones (ranking basis and pick count, price range of the picks).
- A "Ranked by …" line sits under every quick answer.

**Result:** best-list median overlap 23.5% → 16.0%, worst pair 80% → 55%. No pair is above 60% (there were 8). The pairs left at about 50% come from the data, not the template: the only two laptops under $500 are the two Chromebooks, and three of the four laptops under $1,000 are Acers. They will separate as more laptops are tested.
