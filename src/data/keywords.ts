import { bestCategories } from "./categories";
import { brands } from "./brands";
import { guides } from "./guides";
import { laptops, laptopHref } from "./laptops";
import { comparisons, comparisonLaptops } from "./comparisons";
import { dealCategories } from "./pipeline";

// Programmatic keyword map. Each entry is a target keyword phrase mapped to the
// on-site URL best positioned to rank for it. Generated from templates so the
// site has a documented, verifiable target set of 2,500+ Canadian keywords.

export interface KeywordTarget {
  kw: string;
  url: string;
  group: string;
}

const GEO = ["", "canada", "in canada", "2026", "canada 2026"];
const MODS = ["best", "top", "top rated", "good", "recommended", "best rated"];

const titleCase = (s: string) =>
  s.replace(/\w\S*/g, (t) => t.charAt(0).toUpperCase() + t.slice(1));

function buildKeywords(): KeywordTarget[] {
  const out: KeywordTarget[] = [];
  const seen = new Set<string>();
  const add = (kw: string, url: string, group: string) => {
    const key = kw.toLowerCase().replace(/\s+/g, " ").trim();
    if (!key || seen.has(key)) return;
    seen.add(key);
    out.push({ kw: titleCase(key), url, group });
  };
  const phrase = (...parts: string[]) => parts.filter(Boolean).join(" ");

  // 0) Priority Canada-market targets (exact phrases + 2026 variants)
  const priority: [string, string][] = [
    ["best 2-in-1 laptops", "/laptop/reviews/best/2-in-1"],
    ["best 2 in 1 laptops canada", "/laptop/reviews/best/2-in-1"],
    ["best 2 in 1 laptops 2026", "/laptop/reviews/best/2-in-1"],
    ["best windows laptops", "/laptop/reviews/best/windows"],
    ["best windows laptops canada", "/laptop/reviews/best/windows"],
    ["best windows laptops 2026", "/laptop/reviews/best/windows"],
    ["best laptop under $500 canada", "/laptop/reviews/best/under-500-canada"],
    ["best laptop under 500 canada", "/laptop/reviews/best/under-500-canada"],
    ["best laptop under $500 canada 2026", "/laptop/reviews/best/under-500-canada"],
    ["best laptops under $500 canada", "/laptop/reviews/best/under-500-canada"],
    ["best laptop under $1,000 canada", "/laptop/reviews/best/under-1000-canada"],
    ["best laptop under 1000 canada", "/laptop/reviews/best/under-1000-canada"],
    ["best laptop under $1000 canada 2026", "/laptop/reviews/best/under-1000-canada"],
    ["best laptops under $1,000 canada", "/laptop/reviews/best/under-1000-canada"],
  ];
  for (const [kw, url] of priority) add(kw, url, "Priority (Canada)");

  // 1) Best-list categories x modifiers x geo
  for (const c of bestCategories) {
    const base = c.navLabel.replace(/^Best /, "").toLowerCase();
    const noun = base.includes("laptop") || base.includes("macbook") || base.includes("chromebook") ? base : `${base} laptops`;
    for (const m of MODS) for (const g of GEO) add(phrase(m, noun, g), `/laptop/reviews/best/${c.slug}`, "Best lists");
  }

  // 2) Brand laptops x modifiers x geo  -> brand pages
  for (const b of brands) {
    for (const m of MODS) for (const g of GEO) add(phrase(m, `${b.name} laptops`, g), `/laptop/reviews/${b.slug}`, "Brands");
    add(phrase(b.name, "laptop reviews"), `/laptop/reviews/${b.slug}`, "Brands");
    add(phrase(b.name, "laptops", "canada"), `/laptop/reviews/${b.slug}`, "Brands");
  }

  // 3) Brand x category combos -> closest category best list
  const comboCats = bestCategories.filter((c) => ["gaming", "student", "business", "budget", "2-in-1", "windows", "chromebook", "programming", "video-editing"].includes(c.slug));
  for (const b of brands) for (const c of comboCats) {
    const catWord = c.navLabel.replace(/^Best /, "").replace(/ Laptops?$/i, "").toLowerCase();
    for (const g of ["", "canada", "2026"]) add(phrase("best", b.name, catWord, "laptop", g), `/laptop/reviews/best/${c.slug}`, "Brand + category");
  }

  // 4) Price points -> nearest under-$X page
  const priceTargets: { price: number; url: string }[] = [
    { price: 300, url: "/laptop/reviews/best/under-500" },
    { price: 400, url: "/laptop/reviews/best/under-500" },
    { price: 500, url: "/laptop/reviews/best/under-500" },
    { price: 600, url: "/laptop/reviews/best/under-1000" },
    { price: 700, url: "/laptop/reviews/best/under-1000" },
    { price: 800, url: "/laptop/reviews/best/under-1000" },
    { price: 900, url: "/laptop/reviews/best/under-1000" },
    { price: 1000, url: "/laptop/reviews/best/under-1000" },
    { price: 1200, url: "/laptop/reviews/best/laptop" },
    { price: 1500, url: "/laptop/reviews/best/laptop" },
    { price: 2000, url: "/laptop/reviews/best/gaming" },
  ];
  const priceNouns = ["laptop", "gaming laptop", "student laptop", "laptop for students", "business laptop", "2 in 1 laptop"];
  for (const p of priceTargets) for (const noun of priceNouns) for (const g of ["", "canada"])
    add(phrase("best", noun, `under $${p.price}`, g), p.url, "Price points");

  // 5) Comparisons -> comparison pages
  for (const c of comparisons) {
    const [a, b] = comparisonLaptops(c);
    const A = `${a.brand} ${a.model}`, B = `${b.brand} ${b.model}`;
    add(`${A} vs ${B}`, `/laptop/compare/${c.slug}`, "Comparisons");
    add(`${A} or ${B}`, `/laptop/compare/${c.slug}`, "Comparisons");
    add(`${A} vs ${B} which is better`, `/laptop/compare/${c.slug}`, "Comparisons");
    add(`${A} vs ${B} canada`, `/laptop/compare/${c.slug}`, "Comparisons");
  }

  // 6) Individual laptop reviews
  for (const l of laptops) {
    const name = `${l.brand} ${l.model}`;
    const url = laptopHref(l);
    for (const t of [`${name} review`, `${name} review 2026`, `${name} canada`, `${name} price`, `${name} specs`, `is the ${name} good`, `${name} battery life`, `${name} review canada`])
      add(t, url, "Reviews");
  }

  // 7) Guides + question variants
  for (const g of guides) {
    const url = `/laptop/learn/${g.slug}`;
    add(g.title, url, "Guides");
    add(`${g.title} canada`, url, "Guides");
    for (const q of g.faq) add(q.q, url, "Guides");
  }

  // 8) Deals
  for (const d of dealCategories) {
    const base = d.title.replace(/^Best /, "").replace(/ in Canada$/, "").toLowerCase();
    for (const m of ["best", "cheap", "top"]) for (const g of ["canada", "in canada", "2026"])
      add(phrase(m, base, g), `/laptop/deals/${d.slug}`, "Deals");
  }

  // 9) Activities / software -> closest best list
  const activities: [string, string][] = [
    ["online classes", "student"], ["zoom meetings", "working-from-home"], ["working from home", "working-from-home"],
    ["coding", "programming"], ["software development", "programming"], ["web development", "programming"],
    ["data science", "programming"], ["machine learning", "video-editing"], ["photoshop", "photo-editing"],
    ["lightroom", "photo-editing"], ["premiere pro", "video-editing"], ["video editing", "video-editing"],
    ["autocad", "engineering-students"], ["solidworks", "engineering-students"], ["3d modeling", "video-editing"],
    ["music production", "music-production"], ["streaming", "gaming"], ["minecraft", "gaming"], ["sims 4", "gaming"],
    ["fortnite", "gaming"], ["roblox", "budget"], ["excel", "business"], ["accounting", "business"],
    ["writers", "working-from-home"], ["note taking", "2-in-1"], ["drawing", "2-in-1"], ["travel", "laptop"],
    ["college", "college"], ["high school", "student"], ["nursing students", "student"],
  ];
  for (const [act, slug] of activities) for (const g of ["", "canada", "2026"])
    add(phrase("best laptop for", act, g), `/laptop/reviews/best/${slug}`, "Activities");

  // 10) Majors -> closest best list
  const majors: [string, string][] = [
    ["computer science", "programming"], ["engineering", "engineering-students"], ["mechanical engineering", "engineering-students"],
    ["electrical engineering", "engineering-students"], ["software engineering", "programming"], ["business", "business"],
    ["architecture", "video-editing"], ["graphic design", "photo-editing"], ["music", "music-production"],
    ["accounting", "business"], ["law", "business"], ["medicine", "student"], ["art", "2-in-1"], ["film", "video-editing"],
  ];
  for (const [maj, slug] of majors) for (const g of ["", "canada", "2026"])
    add(phrase("best laptop for", maj, "students", g), `/laptop/reviews/best/${slug}`, "Majors");

  // 11) Cheap / value variants per category
  for (const c of comboCats) {
    const catWord = c.navLabel.replace(/^Best /, "").replace(/ Laptops?$/i, "").toLowerCase();
    for (const m of ["cheap", "affordable", "best value", "best cheap"]) for (const g of ["", "canada", "2026"])
      add(phrase(m, catWord, "laptop", g), `/laptop/reviews/best/${c.slug}`, "Value");
  }

  // 12) Retailer-intent
  const retailers = ["best buy", "costco", "canada computers", "amazon", "staples", "walmart", "memory express"];
  for (const r of retailers) for (const m of ["best laptops at", "best laptop deals at", "cheap laptops at"])
    add(phrase(m, r, "canada"), "/laptop/deals", "Retailer intent");

  // 13) Brand vs brand -> brands hub
  for (let i = 0; i < brands.length; i++) for (let j = i + 1; j < brands.length; j++) {
    const A = brands[i].name, B = brands[j].name;
    add(`${A} vs ${B} laptops`, "/laptop/brands", "Brand vs brand");
    add(`${A} or ${B} laptops`, "/laptop/brands", "Brand vs brand");
    add(`${A} vs ${B} which is better`, "/laptop/brands", "Brand vs brand");
  }

  // 14) Best-list review/buy intent
  for (const c of bestCategories) {
    const base = c.navLabel.replace(/^Best /, "").toLowerCase();
    const noun = base.includes("laptop") || base.includes("macbook") || base.includes("chromebook") ? base : `${base} laptops`;
    for (const suffix of ["reviews", "ranked", "compared", "buying guide"]) add(phrase("best", noun, suffix), `/laptop/reviews/best/${c.slug}`, "Best lists");
  }

  // 15) Size + use combos
  const sizes = ["13 inch", "14 inch", "15 inch", "16 inch", "17 inch"];
  const sizeUses = ["", "for students", "for gaming", "for work", "for programming", "for travel"];
  for (const s of sizes) for (const u of sizeUses) for (const g of ["", "canada"])
    add(phrase("best", s, "laptop", u, g), "/laptop/reviews/best/laptop", "Size + use");

  return out;
}

export const keywords: KeywordTarget[] = buildKeywords();

export const keywordGroups: { group: string; items: KeywordTarget[] }[] = (() => {
  const map = new Map<string, KeywordTarget[]>();
  for (const k of keywords) {
    const arr = map.get(k.group) ?? [];
    arr.push(k);
    map.set(k.group, arr);
  }
  return [...map.entries()].map(([group, items]) => ({ group, items }));
})();

export const keywordCount = keywords.length;
