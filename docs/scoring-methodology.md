# Scoring Methodology

BestLaptop.ca uses a transparent **10-point** scoring system. Implementation lives in `src/lib/scoring.ts`.

## Overall score weighting

The overall score is a weighted average of nine tested categories:

| Category | Weight |
|---|---|
| Performance | 20% |
| Display | 15% |
| Battery life | 15% |
| Keyboard & touchpad | 10% |
| Build quality | 10% |
| Portability | 10% |
| Thermals & noise | 10% |
| Ports & connectivity | 5% |
| Canadian value | 5% |

`weightedOverall(scores, weights)` normalizes by the weight sum, so custom weightings need not total exactly 100%.

## Use-case scores

Each review also reports use-case scores that re-weight the categories above for a specific need:
**School, Business, Gaming, Multimedia, Workstation, Programming, Travel, Battery, Value.**

Every score carries: a tooltip explanation, a methodology link, why it matters, and how it was calculated. Use-case scores weight categories differently (e.g. Gaming weights Performance + Thermals heavily; Travel weights Battery + Portability).

## Custom ratings

The Custom Ratings tool (`/laptop/tools/custom-ratings`) lets users move category weights and re-rank the database live. Presets: Balanced, Student, Business, Gaming, Creative, Programming, Travel, Budget (`WEIGHT_PRESETS`).

## Score colours & labels

`scoreColor()` / `scoreLabel()` map a numeric score to a colour band and label (Exceptional ≥ 9, Great ≥ 8, Good ≥ 7, Decent ≥ 6, Mediocre ≥ 5, Poor below).

## Test Bench versioning

Scores are tied to a **Test Bench** version (currently v1.2). When the methodology changes, we publish a changelog (`/laptop/tests/changelogs`) describing new tests, weight changes, retested products, and the impact on scores. Every review shows the Test Bench version used.
