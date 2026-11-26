#!/usr/bin/env node
// Submit sitemap URLs to the Bing Webmaster URL Submission API, within quota.
//
// Bing allows this site 100 URLs a day and 500 a month, far fewer than the
// sitemap holds, so each run submits the next batch in priority order (best
// lists, guides, brands, reviews, then test results and comparisons) and
// records what it sent in scripts/bing-submitted.json. Run it once a day
// until it reports nothing left; commit the JSON so the next run resumes.
//
// Usage:
//   BING_API_KEY=<key> npm run bing:submit        # or the key in $apikey
//   BING_API_KEY=<key> npm run bing:submit -- --dry-run
//   BING_API_KEY=<key> npm run bing:submit -- --resubmit /laptop/reviews/best/gaming ...
//
// The API key comes from Bing Webmaster Tools > Settings > API access. Never
// commit it.

import { readFileSync, writeFileSync, existsSync } from "node:fs";

const KEY = process.env.BING_API_KEY || process.env.apikey;
const SITE = process.env.SITE || "https://bestlaptop.ca";
const SITEMAP = process.env.SITEMAP || `${SITE}/sitemap.xml`;
const STATE = new URL("./bing-submitted.json", import.meta.url);
const API = "https://ssl.bing.com/webmaster/api.svc/json";
const BATCH = 100; // SubmitUrlBatch accepts at most this many per call (quota permitting)

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const resubmitIdx = args.indexOf("--resubmit");
const resubmit = resubmitIdx >= 0 ? args.slice(resubmitIdx + 1).map((p) => (p.startsWith("http") ? p : SITE + p)) : [];

// Lower number = submitted first.
const PRIORITY = [
  [/^\/$/, 0],
  [/\/laptop\/reviews\/best\//, 1],
  [/\/laptop\/learn\//, 2],
  [/\/fr\//, 3],
  [/\/laptop\/reviews\/[^/]+$/, 4], // brand pages
  [/\/laptop\/reviews\/[^/]+\/[^/]+$/, 5], // reviews
  [/\/laptop\/(tools|tests|deals)/, 6],
  [/\/test-results$/, 8],
  [/\/laptop\/compare\//, 9],
];
const rank = (u) => {
  const p = new URL(u).pathname;
  for (const [re, n] of PRIORITY) if (re.test(p)) return n;
  return 7;
};

async function bing(method, body) {
  const url = `${API}/${method}?apikey=${encodeURIComponent(KEY)}${body ? "" : `&siteUrl=${encodeURIComponent(SITE)}`}`;
  const res = await fetch(url, body ? { method: "POST", headers: { "Content-Type": "application/json; charset=utf-8" }, body: JSON.stringify(body) } : {});
  const text = await res.text();
  if (!res.ok) throw new Error(`${method}: HTTP ${res.status} ${text.slice(0, 300)}`);
  return text ? JSON.parse(text) : null;
}

async function sitemapUrls(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Sitemap fetch failed: HTTP ${res.status} (${url})`);
  const xml = await res.text();
  const found = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  if (!xml.includes("<sitemapindex")) return found;
  return (await Promise.all(found.map(sitemapUrls))).flat();
}

async function main() {
  if (!KEY) throw new Error("Set BING_API_KEY (Bing Webmaster Tools > Settings > API access).");
  const state = existsSync(STATE) ? JSON.parse(readFileSync(STATE, "utf8")) : { submitted: {} };

  const all = [...new Set(await sitemapUrls(SITEMAP))];
  const pending = resubmit.length
    ? resubmit
    : all.filter((u) => !state.submitted[u]).sort((a, b) => rank(a) - rank(b) || a.localeCompare(b));

  const { d: quota } = await bing("GetUrlSubmissionQuota");
  const allowed = Math.min(quota.DailyQuota, quota.MonthlyQuota);
  console.log(`Sitemap: ${all.length} URLs, ${Object.keys(state.submitted).length} already submitted, ${pending.length} pending.`);
  console.log(`Quota: ${quota.DailyQuota} today, ${quota.MonthlyQuota} this month.`);

  const batch = pending.slice(0, allowed);
  if (batch.length === 0) {
    console.log(pending.length ? "No quota left; run again tomorrow." : "✓ Nothing left to submit.");
    return;
  }
  if (dryRun) {
    console.log(`Dry run: would submit ${batch.length}:`);
    batch.forEach((u) => console.log("  " + u));
    return;
  }

  const today = new Date().toISOString().slice(0, 10);
  for (let i = 0; i < batch.length; i += BATCH) {
    const chunk = batch.slice(i, i + BATCH);
    await bing("SubmitUrlBatch", { siteUrl: SITE, urlList: chunk });
    for (const u of chunk) state.submitted[u] = today;
    console.log(`✓ Submitted ${chunk.length} URLs.`);
  }
  state.submitted = Object.fromEntries(Object.entries(state.submitted).sort(([a], [b]) => a.localeCompare(b)));
  writeFileSync(STATE, JSON.stringify(state, null, 2) + "\n");
  console.log(`${pending.length - batch.length} URLs still pending. Commit scripts/bing-submitted.json and run again tomorrow.`);
}

main().catch((err) => {
  console.error("✗ " + err.message.replaceAll(KEY ?? "\u0000", "<key>"));
  process.exit(1);
});
