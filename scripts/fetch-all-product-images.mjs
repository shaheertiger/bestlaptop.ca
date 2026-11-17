import { ApiClient, TypedDefaultApi, SearchItemsRequestContent } from "amazon-creators-api";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

// Matches every laptop in scripts/amazon-products.json to an Amazon listing through
// the Amazon Creators API and writes three committed files the site reads at build
// time (so the build itself never needs network access or the secret):
//
//   src/data/amazon/product-asins.json   laptop id -> ASIN (turns a tagged search link into /dp/ link)
//   src/data/amazon/product-images.json  laptop id -> Amazon product image URL
//   scripts/amazon-match-report.json     what matched, what was rejected and why
//
// Same structure as the best-proteinpowder.com pipeline. Run with:
//   npm run images:fetch:all            (only fills laptops with no ASIN or image yet)
//   npm run images:fetch:all -- --force (re-match everything)
//
// Requires AMAZON_CREATORS_CLIENT_ID, AMAZON_CREATORS_CLIENT_SECRET and
// AMAZON_CREATORS_PARTNER_TAG. Never hardcode credentials here.

const requiredEnvVars = ["AMAZON_CREATORS_CLIENT_ID", "AMAZON_CREATORS_CLIENT_SECRET", "AMAZON_CREATORS_PARTNER_TAG"];
for (const name of requiredEnvVars) {
  if (!process.env[name]) {
    console.error(`Missing required environment variable: ${name}`);
    process.exit(1);
  }
  if (/^<.*>$/s.test(process.env[name].trim())) {
    console.error(`${name} is wrapped in <angle brackets>. Remove them from the value and run again.`);
    process.exit(1);
  }
}

const FORCE = process.argv.includes("--force");

const client = new ApiClient();
client.credentialId = process.env.AMAZON_CREATORS_CLIENT_ID;
client.credentialSecret = process.env.AMAZON_CREATORS_CLIENT_SECRET;
client.version = process.env.AMAZON_CREATORS_VERSION || "3.1";
client.marketplace = process.env.AMAZON_CREATORS_MARKETPLACE || "www.amazon.com";
const api = new TypedDefaultApi(client);

const DATA_DIR = join(import.meta.dirname, "..", "src", "data", "amazon");
const PRODUCTS_PATH = join(import.meta.dirname, "amazon-products.json");
const IMAGES_PATH = join(DATA_DIR, "product-images.json");
const ASIN_PATH = join(DATA_DIR, "product-asins.json");
const QUARANTINE_PATH = join(DATA_DIR, "asin-quarantine.json");
const REPORT_PATH = join(import.meta.dirname, "amazon-match-report.json");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const readJson = (p, fallback) => (existsSync(p) ? JSON.parse(readFileSync(p, "utf-8")) : fallback);

// The API throws plain objects ({ status, body }), not Error instances.
function describeError(err) {
  if (err instanceof Error) return err.message;
  const detail = err?.body?.message || err?.body?.errors?.[0]?.message || err?.statusText || "";
  return err?.status ? `HTTP ${err.status}${detail ? ` ${detail}` : ""}` : JSON.stringify(err);
}

// Amazon rate-limits bursts with 429. Back off and retry instead of recording an error.
async function searchWithRetry(req, attempts = 4) {
  for (let n = 1; ; n++) {
    try {
      return await api.searchItems(client.marketplace, req);
    } catch (err) {
      if (err?.status !== 429 || n >= attempts) throw err;
      await sleep(2000 * 2 ** (n - 1));
    }
  }
}

const products = readJson(PRODUCTS_PATH, []);
const images = readJson(IMAGES_PATH, {});
const asins = readJson(ASIN_PATH, {});
// Quarantined laptops were rejected by a person (wrong model, withdrawn listing).
// Matching them again would bring the wrong product straight back, so skip them.
const quarantined = new Set(Object.keys(readJson(QUARANTINE_PATH, {})));

// Listings that mention the laptop but are not the laptop.
const REJECT = [
  "renewed", "refurbished", "case", "sleeve", "skin", "decal", "cover", "protector", "charger",
  "adapter", "battery replacement", "replacement", "keyboard for", "bag", "backpack", "stand", "dock",
  "hub", "cable", "fan for", "screen for", "hinge", "palmrest", "motherboard",
];

// Hyphens become spaces so "15-inch" matches "15", and a trailing dot is dropped.
const normalize = (s) => ` ${s.toLowerCase().replace(/[^a-z0-9.\s]/g, " ").replace(/\.(\s|$)/g, " ").replace(/\s+/g, " ")} `;

function isConfidentMatch(product, title) {
  if (!title) return false;
  const t = normalize(title);
  if (REJECT.some((w) => t.includes(` ${w} `) || t.includes(` ${w}s `))) return false;
  // Every required token must appear as a whole word/phrase, e.g. "xps" + "13" but not "130".
  // "a|b" accepts either spelling ("14|14.2" for Apple's "14.2-inch").
  return product.require.every((tok) => tok.split("|").some((alt) => t.includes(normalize(alt))));
}

// Among confident matches, prefer the listing naming the exact model (e.g. "9640").
const preferScore = (product, title) => (product.prefer || []).filter((tok) => normalize(title).includes(normalize(tok))).length;

const report = [];
for (let i = 0; i < products.length; i++) {
  const p = products[i];
  if (quarantined.has(p.id)) {
    report.push({ id: p.id, status: "quarantined" });
    continue;
  }
  if (!FORCE && images[p.id] && asins[p.id]) {
    report.push({ id: p.id, status: "already-cached", asin: asins[p.id] });
    continue;
  }
  try {
    const req = new SearchItemsRequestContent();
    req.partnerTag = process.env.AMAZON_CREATORS_PARTNER_TAG;
    req.keywords = p.query;
    req.itemCount = 10;
    req.searchIndex = "All";
    req.resources = ["itemInfo.title", "images.primary.large"];
    const result = await searchWithRetry(req);
    const items = result?.searchResult?.items || [];
    const candidates = items.filter((it) => it?.images?.primary?.large?.url && isConfidentMatch(p, it?.itemInfo?.title?.displayValue));
    // Stable sort keeps Amazon's relevance order between equally preferred listings.
    const match = candidates.sort((x, y) => preferScore(p, y.itemInfo.title.displayValue) - preferScore(p, x.itemInfo.title.displayValue))[0];
    if (match) {
      images[p.id] = match.images.primary.large.url;
      asins[p.id] = match.asin;
      report.push({ id: p.id, status: "accepted", asin: match.asin, matchedTitle: match.itemInfo.title.displayValue });
    } else {
      report.push({ id: p.id, status: "rejected", topResultTitle: items[0]?.itemInfo?.title?.displayValue || null });
    }
  } catch (err) {
    report.push({ id: p.id, status: "error", error: describeError(err) });
  }
  console.log(`${i + 1}/${products.length} ${p.id}: ${report.at(-1).status}`);
  await sleep(400);
}

const sorted = (o) => Object.fromEntries(Object.entries(o).sort(([a], [b]) => a.localeCompare(b)));
writeFileSync(IMAGES_PATH, JSON.stringify(sorted(images), null, 2) + "\n");
writeFileSync(ASIN_PATH, JSON.stringify(sorted(asins), null, 2) + "\n");
writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2) + "\n");

const count = (s) => report.filter((r) => r.status === s).length;
console.log(
  `Done. accepted=${count("accepted")} rejected=${count("rejected")} errors=${count("error")} ` +
    `total_images=${Object.keys(images).length} total_asins=${Object.keys(asins).length}`,
);
