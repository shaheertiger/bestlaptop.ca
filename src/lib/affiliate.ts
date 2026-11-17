import ASINS from "@/data/amazon/product-asins.json";
import IMAGES from "@/data/amazon/product-images.json";
import QUARANTINE from "@/data/amazon/asin-quarantine.json";
import SIMILAR from "@/data/amazon/product-similar-asins.json";

// Amazon Associates store/tracking ID. Public by design — it identifies the
// account a click is credited to and appears in every outbound product link.
export const AMAZON_TAG = "sktiger-20";
export const AMAZON_HOST = "https://www.amazon.com";

const ASIN_MAP = ASINS as Record<string, string>;
const IMAGE_MAP = IMAGES as Record<string, string>;

// Laptops whose stored ASIN was checked and found withdrawn or pointing at the
// wrong model. The ASIN stays in product-asins.json so it can be corrected later;
// this list only stops it being used as a direct product link in the meantime.
const QUARANTINED = new Set(Object.keys(QUARANTINE as Record<string, unknown>));

// Closest equivalent listing for laptops Amazon does not carry under their own
// model number (e.g. a successor in the same chassis). Kept separate so an exact
// match always wins.
const SIMILAR_MAP = Object.fromEntries(
  Object.entries(SIMILAR as Record<string, { asin: string }>).map(([id, v]) => [id, v.asin]),
);

const tagged = (url: string) => (url.includes("tag=") ? url : `${url}${url.includes("?") ? "&" : "?"}tag=${AMAZON_TAG}`);

/**
 * Resolves a laptop's outbound Amazon link, best option first (same order as the
 * best-proteinpowder.com resolver):
 *
 *   1. A hand-picked Amazon URL on the record itself (a SiteStripe link, say).
 *   2. A direct /dp/<ASIN> link, when the ASIN is known and not quarantined.
 *      ASINs live in src/data/amazon/product-asins.json and are filled in by
 *      `npm run images:fetch:all`, which also writes the product image.
 *   3. A direct link to the closest equivalent listing (product-similar-asins.json).
 *   4. A tagged Amazon search for the laptop's name.
 *
 * Every branch carries the tag, so the click is credited either way.
 */
export function amazonLink(url: string | undefined | null, productName: string, productId?: string): string {
  if (url && url !== "#" && /^https?:\/\/(www\.)?(amazon\.|amzn\.to)/.test(url)) return tagged(url);
  const asin = productId && !QUARANTINED.has(productId) ? ASIN_MAP[productId] : undefined;
  if (asin) return `${AMAZON_HOST}/dp/${asin}?tag=${AMAZON_TAG}&linkCode=ll1`;
  const similar = productId ? SIMILAR_MAP[productId] : undefined;
  if (similar) return `${AMAZON_HOST}/dp/${similar}?tag=${AMAZON_TAG}&linkCode=ll1`;
  return `${AMAZON_HOST}/s?k=${encodeURIComponent(productName)}&tag=${AMAZON_TAG}`;
}

/** True when the laptop has a direct (exact or closest-equivalent) Amazon listing, not just a search. */
export function hasAmazonListing(productId: string): boolean {
  return (!QUARANTINED.has(productId) && !!ASIN_MAP[productId]) || !!SIMILAR_MAP[productId];
}

/** Amazon link for a laptop record. */
export function laptopAmazonLink(l: { id: string; brand: string; model: string; retailers?: { name: string; url: string }[] }): string {
  const own = l.retailers?.find((r) => r.name.startsWith("Amazon"))?.url;
  return amazonLink(own, `${l.brand} ${l.model.replace(/\s*\(\d{4}\)\s*$/, "")} laptop`, l.id);
}

/**
 * Amazon product image for a laptop, or undefined when none has been matched.
 * Amazon image URLs carry their size in the file name (._SL500_.); `size` asks
 * for a different one. Unknown formats are returned unchanged.
 */
export function amazonImage(productId: string, size?: number): string | undefined {
  if (QUARANTINED.has(productId)) return undefined;
  const url = IMAGE_MAP[productId];
  if (!url || !size) return url;
  return url.replace(/\._SL\d+_\./, `._SL${size}_.`);
}

/** Generic tagged Amazon search, for pages that are not about one laptop. */
export function amazonSearch(query: string): string {
  return amazonLink(null, query);
}
