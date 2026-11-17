import { ApiClient, TypedDefaultApi, GetItemsRequestContent } from "amazon-creators-api";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

// Refreshes the image URL of every laptop that already has an ASIN (exact or
// "similar" listing) via GetItems, and reports ASINs Amazon no longer returns so
// they can be quarantined. Manual data-refresh script, NOT run during the build.
// Requires AMAZON_CREATORS_CLIENT_ID, AMAZON_CREATORS_CLIENT_SECRET and
// AMAZON_CREATORS_PARTNER_TAG as environment variables — never hardcode them.

const requiredEnvVars = ["AMAZON_CREATORS_CLIENT_ID", "AMAZON_CREATORS_CLIENT_SECRET", "AMAZON_CREATORS_PARTNER_TAG"];
for (const name of requiredEnvVars) {
  if (!process.env[name]) {
    console.error(`Missing required environment variable: ${name}`);
    process.exit(1);
  }
}

const DATA_DIR = join(import.meta.dirname, "..", "src", "data", "amazon");
const readJson = (p, fallback) => (existsSync(p) ? JSON.parse(readFileSync(p, "utf-8")) : fallback);
const IMAGES_PATH = join(DATA_DIR, "product-images.json");
const BATCH_SIZE = 10; // GetItems allows up to 10 ASINs per request

const client = new ApiClient();
client.credentialId = process.env.AMAZON_CREATORS_CLIENT_ID;
client.credentialSecret = process.env.AMAZON_CREATORS_CLIENT_SECRET;
client.version = process.env.AMAZON_CREATORS_VERSION || "3.1";
client.marketplace = process.env.AMAZON_CREATORS_MARKETPLACE || "www.amazon.com";
const api = new TypedDefaultApi(client);

const exact = readJson(join(DATA_DIR, "product-asins.json"), {});
const similar = Object.fromEntries(
  Object.entries(readJson(join(DATA_DIR, "product-similar-asins.json"), {})).map(([id, v]) => [id, v.asin]),
);
const entries = Object.entries({ ...similar, ...exact });
const images = readJson(IMAGES_PATH, {});
const missing = [];

for (let i = 0; i < entries.length; i += BATCH_SIZE) {
  const batch = entries.slice(i, i + BATCH_SIZE);
  const req = new GetItemsRequestContent(process.env.AMAZON_CREATORS_PARTNER_TAG, batch.map(([, asin]) => asin));
  req.resources = ["images.primary.large"];
  try {
    const result = await api.getItems(client.marketplace, req);
    const byAsin = Object.fromEntries((result?.itemsResult?.items || []).map((item) => [item.asin, item]));
    for (const [id, asin] of batch) {
      const url = byAsin[asin]?.images?.primary?.large?.url;
      if (url) images[id] = url;
      else missing.push({ id, asin });
    }
  } catch (err) {
    console.error(`Batch starting at index ${i} failed:`, err?.message || err?.status || err);
  }
  if (i + BATCH_SIZE < entries.length) await new Promise((r) => setTimeout(r, 500));
}

const sorted = (o) => Object.fromEntries(Object.entries(o).sort(([a], [b]) => a.localeCompare(b)));
writeFileSync(IMAGES_PATH, JSON.stringify(sorted(images), null, 2) + "\n");
console.log(`Refreshed ${entries.length - missing.length}/${entries.length} images.`);
if (missing.length) {
  console.warn("Amazon returned nothing for these ASINs — consider adding them to src/data/amazon/asin-quarantine.json:");
  for (const m of missing) console.warn(`  ${m.id} (${m.asin})`);
}
