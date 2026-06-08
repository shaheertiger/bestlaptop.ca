# Technical Build & Launch Plan

## Current stack

- **Next.js 15 (App Router)** + **TypeScript** + **Tailwind CSS**
- Static generation (SSG) for all content; client components only for interactive tools
- Typed in-repo dataset (`src/data`) decoupled from UI via `src/lib/types.ts`
- System font stack (no external font fetch); inline SVG for charts and score circles

## Recommended production stack

- **Hosting/CDN**: Vercel or Cloudflare Pages + Cloudflare CDN
- **Database**: PostgreSQL or Supabase for the laptop database, votes, and comments
- **CMS**: a headless CMS (e.g. Sanity/Contentful) for articles and editorial content
- **Search**: Algolia / Meilisearch / Typesense for instant laptop + content search
- **Images**: `next/image` with AVIF/WebP, real product photography, lazy loading
- **Auth (optional)**: Auth provider for saved comparisons/shortlists
- **Price tracking**: scheduled jobs writing price history + deal-quality scores
- **Analytics**: GA4 + Search Console; event tracking for compares, filters, retailer clicks, signups

## Migration path

1. Move `src/data/*` arrays into Postgres/Supabase tables matching `src/lib/types.ts`.
2. Replace data accessors (`getLaptop`, `categoryPicks`, etc.) with DB queries returning the same types.
3. Add ISR/revalidation for price and deal freshness.
4. Swap `ProductImage` placeholders for `next/image` photography.
5. Wire forms (newsletter, contact, feedback, comments) to backend services.

## Launch roadmap

- **Phase 0 — Foundation (done)**: Next.js scaffold, data model, scoring, all page types, tools, SEO infra.
- **Phase 1 — Content**: 30–50 real tested reviews, 15+ best lists, 20+ guides, brand pages.
- **Phase 2 — Data & search**: migrate to DB, add search, price tracking, deal automation.
- **Phase 3 — Accounts (optional)**: auth, saved comparisons/shortlists, alerts.
- **Phase 4 — Growth**: programmatic SEO expansion, newsletter, YouTube/social, structured-data monitoring.
- **Phase 5 — Authority**: published Test Bench updates, methodology transparency, community voting and comments.

## Quality gates

- Core Web Vitals budget (LCP < 2.5s, CLS < 0.1, INP < 200ms)
- Accessibility: heading hierarchy, ARIA labels, keyboard nav, contrast, labelled forms
- `npm run build` green before every deploy
