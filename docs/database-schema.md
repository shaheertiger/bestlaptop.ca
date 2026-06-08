# Laptop Database Schema

The canonical schema is the TypeScript model in [`src/lib/types.ts`](../src/lib/types.ts). This document summarizes it for non-code readers and for a future SQL migration.

## `Laptop`

**Basic**: id, brand, brandSlug, model, slug, series, year, releaseDate, testedDate, status, testBench, categories[], os, msrp, currentPrice, retailers[], warranty.

**Configuration**: cpu, cpuBrand, gpu, gpuType, ram, ramType, ramUpgradeable, storage, storageType, storageUpgradeable.

**Design**: weightKg, dimensions, material, color (plus build/portability sub-scores).

**Display**: screenSize, resolution, aspectRatio, panelType, refreshRate, touchscreen, convertible (2-in-1).

**Connectivity**: ports[], wifi, bluetooth.

**Scores** (`CategoryScores`, 0–10): performance, display, battery, keyboard, build, portability, thermals, ports, value → `overall` (computed).

**Use-case scores** (`UseCaseScores`, 0–10): school, business, gaming, multimedia, workstation, programming, travel, battery, value.

**Editorial**: verdict, pros[], cons[], bestFor, notIdealFor, whoShouldBuy, whoShouldSkip.

**SEO**: seoTitle, metaDescription, imageAlt (canonical/slug derived from route).

## `TestResults` (raw measurements)

Display (brightnessNits, contrast, colorGamutSRGB, colorGamutDCIP3, colorAccuracyDeltaE);
Performance (geekbenchSingle, geekbenchMulti, cinebenchMulti, mark3d, ssdReadMBps, ssdWriteMBps, gamingFps1080pHigh, videoExportMinutes);
Battery (batteryWebHours, batteryVideoHours, batteryGamingHours, chargeTo80Minutes);
Thermals/noise/power (idleNoiseDb, loadNoiseDb, cpuTempLoadC, keyboardTempLoadC, powerDrawLoadW).

## Supporting entities

- **`Retailer`**: name, price (CAD), url, inStock, condition.
- **`BestCategory`**: slug, title, h1, intro, criteria, filter, navLabel, group.
- **`Guide`**: slug, title, h1, excerpt, category, updated, readingTime, answer, sections[], faq[].
- **`Brand`**: slug, name, overview, strengths[], weaknesses[], buyerProfile, bestUseCases[], faq[].
- **`PipelineItem`**: model, brand, status, expected, votes.
- **`Deal`**: laptopId, retailer, currentPrice, previousPrice, condition, availability, warrantyNote, expires, category[].

## SQL migration notes

Map `Laptop` to a `laptops` table with `retailers` and `test_results` as related tables (1-to-many / 1-to-1). Scores can be a JSONB column or flattened columns. `categories` is a join table to a `categories` table. Keep field names aligned with the TS types so the data-access layer can return the same shapes.
