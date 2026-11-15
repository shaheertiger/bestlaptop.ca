import { SITE, CONTENT_UPDATED } from "@/lib/site";
import { frenchLists } from "@/data/fr";
import { laptops, laptopHref } from "@/data/laptops";
import { bestCategories } from "@/data/categories";
import { brands } from "@/data/brands";
import { guides } from "@/data/guides";
import { comparisons } from "@/data/comparisons";
import { testMethods } from "@/data/tests";
import { dealCategories } from "@/data/pipeline";

export interface SitemapEntry {
  url: string;
  lastModified: string;
  changeFrequency: "daily" | "weekly" | "monthly";
  priority: number;
}

// One sitemap per page family, so Search Console coverage can be read per
// template from day one and a weak family is visible immediately.
export const SITEMAP_FAMILIES = ["pages", "best-lists", "reviews", "test-results", "comparisons", "brands", "guides", "french"] as const;
export type SitemapFamily = (typeof SITEMAP_FAMILIES)[number];

const u = (
  path: string,
  priority = 0.6,
  // Honest lastmod: a real content date, never "now" on every deploy.
  lastModified: string = CONTENT_UPDATED,
  changeFrequency: SitemapEntry["changeFrequency"] = "weekly",
): SitemapEntry => ({ url: `${SITE.url}${path}`, lastModified, changeFrequency, priority });

const latest = (...dates: string[]) => dates.slice().sort().at(-1)!;

export function sitemapFamily(family: SitemapFamily): SitemapEntry[] {
  switch (family) {
    case "pages":
      return [
        "/", "/about", "/how-we-make-money", "/editorial-policy",
        "/affiliate-disclosure", "/contact", "/privacy-policy", "/terms",
        "/laptop/reviews", "/laptop/reviews/index", "/laptop/brands", "/laptop/news",
        "/laptop/deals", "/laptop/review-pipeline", "/laptop/vote", "/laptop/learn", "/laptop/popular-searches",
        "/laptop/learn/how-we-test", "/laptop/tests/changelogs", "/laptop/compare",
        "/laptop/tools/compare", "/laptop/tools/table", "/laptop/tools/graph", "/laptop/tools/custom-ratings",
      ]
        .map((p) => u(p, p === "/" ? 1 : p === "/laptop/compare" ? 0.8 : 0.7))
        .concat(testMethods.map((t) => u(`/laptop/tests/${t.slug}`, 0.5)))
        .concat(dealCategories.map((d) => u(`/laptop/deals/${d.slug}`, 0.6)));
    case "best-lists":
      return bestCategories.map((c) => u(`/laptop/reviews/best/${c.slug}`, 0.9));
    case "reviews":
      return laptops.map((l) => u(laptopHref(l), 0.8, l.testedDate));
    case "test-results":
      return laptops.map((l) => u(`${laptopHref(l)}/test-results`, 0.5, l.testedDate));
    case "comparisons":
      return comparisons.map((c) => {
        const a = laptops.find((l) => l.id === c.a)!;
        const b = laptops.find((l) => l.id === c.b)!;
        return u(`/laptop/compare/${c.slug}`, 0.7, latest(a.testedDate, b.testedDate));
      });
    case "brands":
      return brands.map((b) => u(`/laptop/reviews/${b.slug}`, 0.7));
    case "guides":
      return guides.map((g) => u(`/laptop/learn/${g.slug}`, 0.7, g.updated));
    case "french":
      return [u("/fr", 0.9), ...frenchLists.map((f) => u(`/fr/${f.slug}`, 0.8))];
  }
}

export const sitemapFamilyUrl = (family: SitemapFamily) => `${SITE.url}/sitemaps/${family}.xml`;

export function familyLastModified(family: SitemapFamily): string {
  return latest(...sitemapFamily(family).map((e) => e.lastModified));
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function renderUrlset(entries: SitemapEntry[]): string {
  const body = entries
    .map(
      (e) =>
        `<url><loc>${esc(e.url)}</loc><lastmod>${e.lastModified}</lastmod><changefreq>${e.changeFrequency}</changefreq><priority>${e.priority}</priority></url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

export function renderIndex(): string {
  const body = SITEMAP_FAMILIES.map(
    (f) => `<sitemap><loc>${esc(sitemapFamilyUrl(f))}</loc><lastmod>${familyLastModified(f)}</lastmod></sitemap>`,
  ).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</sitemapindex>\n`;
}
