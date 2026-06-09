#!/usr/bin/env node
// Submit all site URLs to IndexNow (Bing, Yandex, and other participating engines).
//
// Usage:
//   npm run indexnow                      # reads the live sitemap and submits
//   SITEMAP=https://bestlaptop.ca/sitemap.xml npm run indexnow
//   INDEXNOW_KEY=<key> npm run indexnow
//
// The site must be live and serving the key file at
// https://<host>/<key>.txt for IndexNow to verify ownership (otherwise the
// API returns 403 UserForbiddedToAccessSite).

const KEY = process.env.INDEXNOW_KEY || "39d6e0cd114542a2a65fab939a1acb21";
const SITEMAP = process.env.SITEMAP || "https://bestlaptop.ca/sitemap.xml";
const ENDPOINT = process.env.INDEXNOW_ENDPOINT || "https://api.indexnow.org/indexnow";

async function main() {
  console.log(`Fetching sitemap: ${SITEMAP}`);
  const res = await fetch(SITEMAP);
  if (!res.ok) throw new Error(`Sitemap fetch failed: HTTP ${res.status}`);
  const xml = await res.text();

  const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim()).filter(Boolean);
  if (urlList.length === 0) throw new Error("No <loc> URLs found in sitemap.");

  const host = new URL(urlList[0]).host;
  const keyLocation = `https://${host}/${KEY}.txt`;

  console.log(`Host: ${host}`);
  console.log(`Key location: ${keyLocation}`);
  console.log(`Submitting ${urlList.length} URLs to ${ENDPOINT} ...`);

  const submit = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host, key: KEY, keyLocation, urlList }),
  });

  const body = await submit.text();
  console.log(`IndexNow response: HTTP ${submit.status}`);
  if (body) console.log(body);

  if (submit.status === 200 || submit.status === 202) {
    console.log("✓ Submission accepted.");
  } else if (submit.status === 403) {
    console.error("✗ 403: the domain could not be verified. Make sure the site is live and the key file loads at the key location above, then retry.");
    process.exit(1);
  } else {
    console.error("✗ Unexpected response. See body above.");
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
