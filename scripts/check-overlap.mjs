#!/usr/bin/env node
// Measure 5-gram text overlap between sibling pages of each template family.
//
// Playbook rule (NutriScan control case): programmatic templates survive when
// sibling pages share little text (~2–3% on the survivors); investigate above
// 25%, target under 15%. Run after `next build`:
//
//   npm run check:overlap              # report
//   npm run check:overlap -- --strict  # exit 1 if any family median > 25%
//   node scripts/check-overlap.mjs path/to/other/checkout   # measure another build
//
// Overlap = Jaccard similarity of the two pages' 5-word shingle sets, computed on
// the <main> element only, minus <nav> blocks (header, footer, menus and
// breadcrumbs are shared by design).

import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, relative, sep } from "node:path";

const args = process.argv.slice(2);
const strict = args.includes("--strict");
const root = args.find((a) => !a.startsWith("--")) ?? process.cwd();
const appDir = join(root, ".next", "server", "app");
if (!existsSync(appDir)) {
  console.error(`No build found at ${appDir}. Run \`npm run build\` first.`);
  process.exit(1);
}

const N = 5;
const MAX_PAIRS = 400;

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (name.endsWith(".html")) out.push(p);
  }
  return out;
}

// Route families, matched against the path relative to .next/server/app.
const FAMILIES = [
  { name: "comparisons", re: /^laptop\/compare\/[^/]+\.html$/ },
  { name: "test-results", re: /^laptop\/reviews\/(?!best\/)[^/]+\/[^/]+\/test-results\.html$/ },
  { name: "reviews", re: /^laptop\/reviews\/(?!best\/|index\b)[^/]+\/[^/]+\.html$/ },
  { name: "best-lists", re: /^laptop\/reviews\/best\/[^/]+\.html$/ },
  { name: "brands", re: /^laptop\/reviews\/(?!best\.|index\.)[^/]+\.html$/ },
  { name: "guides", re: /^laptop\/learn\/(?!how-we-test\.)[^/]+\.html$/ },
  { name: "french", re: /^fr\/[^/]+\.html$/ },
];

function mainText(html) {
  const m = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  return (m ? m[1] : html)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<nav[\s\S]*?<\/nav>/gi, " ") // menus and breadcrumbs are shared by design
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/gi, " ")
    .toLowerCase();
}

function shingles(text) {
  const words = text.match(/[\p{L}\p{N}][\p{L}\p{N}.'’-]*/gu) ?? [];
  const set = new Set();
  for (let i = 0; i + N <= words.length; i++) set.add(words.slice(i, i + N).join(" "));
  return set;
}

function jaccard(a, b) {
  let inter = 0;
  const [small, big] = a.size < b.size ? [a, b] : [b, a];
  for (const s of small) if (big.has(s)) inter++;
  const union = a.size + b.size - inter;
  return union === 0 ? 0 : inter / union;
}

// Deterministic PRNG so repeated runs sample the same pairs.
function rng(seed) {
  return () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 2 ** 32);
}

function pairs(n) {
  const all = n * (n - 1) / 2;
  const out = [];
  if (all <= MAX_PAIRS) {
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) out.push([i, j]);
    return out;
  }
  const r = rng(42);
  const seen = new Set();
  while (out.length < MAX_PAIRS) {
    const i = Math.floor(r() * n);
    const j = Math.floor(r() * n);
    const k = i < j ? `${i}|${j}` : `${j}|${i}`;
    if (i === j || seen.has(k)) continue;
    seen.add(k);
    out.push([i, j]);
  }
  return out;
}

const label = (f) => { const parts = f.replace(/\.html$/, "").split("/"); return parts.at(-1) === "test-results" ? parts.at(-2) : parts.at(-1); };
const pct = (x) => `${(x * 100).toFixed(1)}%`;
const quantile = (xs, q) => xs[Math.min(xs.length - 1, Math.floor(q * xs.length))];

const files = walk(appDir).map((p) => relative(appDir, p).split(sep).join("/"));
let failed = false;
console.log(`5-gram overlap by template family (${root})\n`);
console.log("family          pages  pairs  median    p90    max   worst pair");
for (const fam of FAMILIES) {
  const members = files.filter((f) => fam.re.test(f));
  if (members.length < 2) continue;
  const sets = members.map((f) => shingles(mainText(readFileSync(join(appDir, f), "utf8"))));
  const scored = pairs(members.length).map(([i, j]) => ({ i, j, s: jaccard(sets[i], sets[j]) }));
  const xs = scored.map((p) => p.s).sort((a, b) => a - b);
  const worst = scored.reduce((a, b) => (b.s > a.s ? b : a));
  const median = quantile(xs, 0.5);
  if (median > 0.25) failed = true;
  const flag = median > 0.25 ? "  ✗ investigate" : median > 0.15 ? "  ! above target" : "";
  console.log(
    `${fam.name.padEnd(15)} ${String(members.length).padStart(5)} ${String(scored.length).padStart(6)} ${pct(median).padStart(7)} ${pct(quantile(xs, 0.9)).padStart(6)} ${pct(xs.at(-1)).padStart(6)}   ${label(members[worst.i])} ↔ ${label(members[worst.j])}${flag}`,
  );
}
console.log("\nTarget: median under 15%. Investigate any family above 25%.");
if (strict && failed) process.exit(1);
