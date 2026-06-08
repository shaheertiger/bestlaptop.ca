# Monetization & Membership

## Revenue streams

1. **Affiliate links** — multi-retailer (Amazon CA, Best Buy CA, Canada Computers, Memory Express, Costco CA, manufacturer stores, etc.). Links use `rel="nofollow sponsored"`. Commissions never affect scores.
2. **Membership** — recurring revenue funding independent testing (see below).
3. **Display ads** — clearly separated from editorial content.
4. **Sponsored placements** — only when clearly disclosed; sponsors cannot buy scores or rankings.
5. **Newsletter sponsorships** — labelled.
6. **Data tools subscription** — advanced table filters, custom rating profiles, and exports for power users.

## Independence firewall

Editorial and commercial decisions are separated. Test results and scores are finalized before any commercial consideration. Brands never approve reviews pre-publication. Documented at `/editorial-policy` and `/how-we-make-money`.

## Membership tiers (`/membership`)

| | Free | Member ($5/mo) | Annual ($45/yr) |
|---|---|---|---|
| Reviews, best lists, core tools | ✓ | ✓ | ✓ |
| Custom rating profiles | | ✓ | ✓ |
| Saved comparisons & shortlist | | ✓ | ✓ |
| Price & deal alerts | | ✓ | ✓ |
| Advanced table filters & CSV export | | ✓ | ✓ |
| Ad-light browsing | | ✓ | ✓ |
| Early access to test results | | | ✓ |
| Voting priority | | | ✓ |

Membership features in the codebase are surfaced as upsell prompts in the table, custom-ratings, and vote tools. Connect to a billing provider (e.g. Stripe) and gate the persisted features (saved state, alerts, exports) behind auth.

## Affiliate disclosure

Shown on every review and deal page via the `AffiliateDisclosure` block and the global footer, with a dedicated `/affiliate-disclosure` page.
