import type { MetadataRoute } from "next";
import { SITE, CONTENT_UPDATED } from "@/lib/site";
import { frenchLists } from "@/data/fr";
import { laptops, laptopHref } from "@/data/laptops";
import { bestCategories } from "@/data/categories";
import { brands } from "@/data/brands";
import { guides } from "@/data/guides";
import { comparisons } from "@/data/comparisons";
import { testMethods } from "@/data/tests";
import { dealCategories } from "@/data/pipeline";

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (
    path: string,
    priority = 0.6,
    // Honest lastmod: a real content date, never "now" on every deploy.
    lastModified: string | Date = CONTENT_UPDATED,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "weekly",
  ): MetadataRoute.Sitemap[number] => ({
    url: `${SITE.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  });

  const staticPages = [
    "/", "/laptop", "/about", "/how-we-make-money", "/editorial-policy",
    "/affiliate-disclosure", "/contact", "/privacy-policy", "/terms",
    "/laptop/reviews", "/laptop/reviews/index", "/laptop/brands", "/laptop/news",
    "/laptop/deals", "/laptop/review-pipeline", "/laptop/vote", "/laptop/learn", "/laptop/popular-searches",
    "/laptop/learn/how-we-test", "/laptop/tests/changelogs",
    "/laptop/tools/compare", "/laptop/tools/table", "/laptop/tools/graph", "/laptop/tools/custom-ratings",
  ];

  return [
    ...staticPages.filter((p) => p !== "/laptop").map((p) => u(p, p === "/" ? 1 : 0.7)),
    u("/fr", 0.9),
    ...frenchLists.map((f) => u(`/fr/${f.slug}`, 0.8)),
    ...laptops.map((l) => u(laptopHref(l), 0.8, l.testedDate)),
    ...laptops.map((l) => u(`${laptopHref(l)}/test-results`, 0.5, l.testedDate)),
    ...bestCategories.map((c) => u(`/laptop/reviews/best/${c.slug}`, 0.9, CONTENT_UPDATED, "weekly")),
    ...brands.map((b) => u(`/laptop/reviews/${b.slug}`, 0.7)),
    ...guides.map((g) => u(`/laptop/learn/${g.slug}`, 0.7, g.updated)),
    ...comparisons.map((c) => u(`/laptop/compare/${c.slug}`, 0.7)),
    ...testMethods.map((t) => u(`/laptop/tests/${t.slug}`, 0.5)),
    ...dealCategories.map((d) => u(`/laptop/deals/${d.slug}`, 0.6)),
  ];
}
