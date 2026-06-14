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
    ["cheap laptops canada", "/laptop/reviews/best/cheap"],
    ["cheap laptop canada", "/laptop/reviews/best/cheap"],
    ["cheap laptops canada 2026", "/laptop/reviews/best/cheap"],
    ["best cheap laptop canada", "/laptop/reviews/best/cheap"],
    ["affordable laptops canada", "/laptop/reviews/best/cheap"],
    ["inexpensive laptops canada", "/laptop/reviews/best/cheap"],
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

  // 16) High-value model-review keywords. Each phrase is mapped to the most
  // relevant on-site destination: the exact review when we have tested the
  // model, otherwise the closest brand hub, best-list, or comparison page.
  const R = (brand: string, slug: string) => `/laptop/reviews/${brand}/${slug}`;
  const BR = (slug: string) => `/laptop/reviews/${slug}`; // brand hub
  const BEST = (slug: string) => `/laptop/reviews/best/${slug}`;
  const CMP = (slug: string) => `/laptop/compare/${slug}`;
  // Reviewed models we can point exact keywords at
  const M = {
    air13: R("apple", "macbook-air-13-m4"),
    air15: R("apple", "macbook-air-15-m4"),
    mbp14: R("apple", "macbook-pro-14-m4-pro"),
    xps13: R("dell", "xps-13-9350"),
    xps16: R("dell", "xps-16-9640"),
    x1: R("lenovo", "thinkpad-x1-carbon-gen-12"),
    legion: R("lenovo", "legion-pro-5-2025"),
    yoga: R("lenovo", "yoga-9i-2-in-1-2026"),
    spectre: R("hp", "spectre-x360-14-2025"),
    omen: R("hp", "omen-transcend-14-2026"),
    zenbook: R("asus", "zenbook-14-oled-2025"),
    zephyrus: R("asus", "rog-zephyrus-g14-2025"),
    tuf: R("asus", "tuf-gaming-a15-2025"),
    swift: R("acer", "swift-go-14-2025"),
    aspire: R("acer", "aspire-5-15-2025"),
    chromebook514: R("acer", "chromebook-plus-514-2025"),
    surface7: R("microsoft", "surface-laptop-7-13"),
    stealth: R("msi", "stealth-16-ai-2025"),
    galaxy: R("samsung", "galaxy-book5-pro-14-2025"),
    blade: R("razer", "blade-14-2025"),
    framework13: R("framework", "laptop-13-2025"),
  };
  const modelReviews: [string, string][] = [
    // Apple
    ["macbook air m4 review", M.air13],
    ["macbook air m4 review canada", M.air13],
    ["macbook air 13 review", M.air13],
    ["macbook air 15 review", M.air15],
    ["macbook air vs macbook pro", CMP("macbook-pro-14-m4-pro-vs-macbook-air-15-m4")],
    ["macbook pro m4 review", M.mbp14],
    ["macbook pro m4 pro review", M.mbp14],
    ["macbook pro m4 max review", M.mbp14],
    ["macbook air m4 vs m3", M.air13],
    ["macbook air student review", BEST("student")],
    ["best macbook for students canada", BEST("macbook")],
    ["macbook air canada review", M.air13],
    // Dell
    ["dell xps 13 review", M.xps13],
    ["dell xps 14 review", BR("dell")],
    ["dell xps 16 review", M.xps16],
    ["dell xps 13 vs macbook air", CMP("macbook-air-15-m4-vs-dell-xps-13-9350")],
    ["dell xps 14 vs macbook pro", BR("dell")],
    ["dell inspiron 15 review", BR("dell")],
    ["dell inspiron 14 review", BR("dell")],
    ["dell latitude 7420 review", BR("dell")],
    ["dell latitude 7430 review", BR("dell")],
    ["dell latitude 7440 review", BR("dell")],
    ["dell latitude 7450 review", BR("dell")],
    ["dell precision laptop review", BR("dell")],
    ["dell laptop reviews canada", BR("dell")],
    ["best dell laptop canada", BEST("dell")],
    // Lenovo
    ["lenovo thinkpad x1 carbon review", M.x1],
    ["thinkpad x1 carbon gen 13 review", M.x1],
    ["lenovo thinkpad t14 review", BR("lenovo")],
    ["lenovo thinkpad t14s review", BR("lenovo")],
    ["lenovo thinkpad e14 review", BR("lenovo")],
    ["lenovo thinkpad e16 review", BR("lenovo")],
    ["lenovo yoga slim 7x review", BR("lenovo")],
    ["lenovo yoga 7i review", M.yoga],
    ["lenovo legion 5 review", M.legion],
    ["lenovo legion 7 review", M.legion],
    ["lenovo loq review", BEST("budget-gaming")],
    ["lenovo laptop reviews canada", BR("lenovo")],
    ["best lenovo laptop canada", BEST("lenovo")],
    ["thinkpad vs macbook", BR("lenovo")],
    ["thinkpad vs dell latitude", "/laptop/brands"],
    ["lenovo thinkpad for students", BEST("student")],
    // HP
    ["hp spectre x360 review", M.spectre],
    ["hp envy x360 review", BR("hp")],
    ["hp pavilion 15 review", BR("hp")],
    ["hp pavilion plus review", BR("hp")],
    ["hp omen 16 review", M.omen],
    ["hp victus 15 review", BEST("budget-gaming")],
    ["hp elitebook review", BEST("business")],
    ["hp probook review", BEST("business")],
    ["hp laptop reviews canada", BR("hp")],
    ["best hp laptop canada", BEST("hp")],
    ["hp envy vs spectre", BR("hp")],
    ["hp omen vs victus", BEST("gaming")],
    ["hp laptop for students canada", BEST("student")],
    // ASUS
    ["asus zenbook 14 review", M.zenbook],
    ["asus zenbook s 16 review", BR("asus")],
    ["asus zenbook duo review", BR("asus")],
    ["asus vivobook 15 review", BR("asus")],
    ["asus vivobook 16 review", BR("asus")],
    ["asus rog zephyrus g14 review", M.zephyrus],
    ["asus rog zephyrus g16 review", BEST("gaming")],
    ["asus tuf a15 review", M.tuf],
    ["asus tuf f15 review", BEST("budget-gaming")],
    ["asus proart laptop review", BEST("video-editing")],
    ["asus laptop reviews canada", BR("asus")],
    ["best asus laptop canada", BEST("asus")],
    ["zenbook vs vivobook", BR("asus")],
    ["rog zephyrus vs tuf", CMP("tuf-gaming-a15-2025-vs-rog-zephyrus-g14-2025")],
    ["asus gaming laptop canada", BEST("gaming")],
    // Acer
    ["acer swift go 14 review", M.swift],
    ["acer swift air 14 review", BR("acer")],
    ["acer aspire 5 review", M.aspire],
    ["acer aspire 3 review", BR("acer")],
    ["acer nitro v 15 review", BEST("budget-gaming")],
    ["acer nitro 5 review", BEST("budget-gaming")],
    ["acer predator helios neo 16 review", BEST("gaming")],
    ["acer chromebook plus 514 review", M.chromebook514],
    ["acer laptop reviews canada", BR("acer")],
    ["best acer laptop canada", BEST("acer")],
    ["acer aspire vs swift", BR("acer")],
    ["acer nitro vs predator", BEST("gaming")],
    ["acer student laptop canada", BEST("student")],
    // Microsoft Surface
    ["surface laptop 7 review", M.surface7],
    ["surface laptop 13 review", M.surface7],
    ["surface pro 11 review", BR("microsoft")],
    ["surface pro vs surface laptop", BR("microsoft")],
    ["surface laptop vs macbook air", BR("microsoft")],
    ["microsoft surface review canada", BR("microsoft")],
    ["best surface laptop canada", BR("microsoft")],
    ["surface laptop for students", BEST("student")],
    ["surface copilot plus pc review", BEST("windows")],
    // MSI, Razer, Samsung, Framework
    ["msi katana 15 review", BEST("budget-gaming")],
    ["msi prestige 13 review", BR("msi")],
    ["msi gaming laptop review", BR("msi")],
    ["razer blade 14 review", M.blade],
    ["razer blade 16 review", BR("razer")],
    ["samsung galaxy book review", M.galaxy],
    ["samsung galaxy book ultra review", BR("samsung")],
    ["framework laptop 13 review", M.framework13],
    ["framework laptop 16 review", BR("framework")],
    ["best repairable laptop canada", BR("framework")],
    ["best ai laptop canada", BEST("windows")],
    ["best copilot plus laptop canada", BEST("windows")],
  ];
  for (const [kw, url] of modelReviews) add(kw, url, "Model reviews");

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
