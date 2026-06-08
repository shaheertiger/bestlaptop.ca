import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { laptops, laptopHref } from "@/data/laptops";
import { bestCategories } from "@/data/categories";
import { brands } from "@/data/brands";
import { guides } from "@/data/guides";
import { comparisons } from "@/data/comparisons";
import { testMethods } from "@/data/tests";
import { dealCategories } from "@/data/pipeline";

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (path: string, priority = 0.6): MetadataRoute.Sitemap[number] => ({
    url: `${SITE.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority,
  });

  const staticPages = [
    "/", "/laptop", "/about", "/how-we-make-money", "/editorial-policy",
    "/affiliate-disclosure", "/contact", "/privacy-policy", "/terms",
    "/laptop/reviews", "/laptop/reviews/index", "/laptop/brands", "/laptop/news",
    "/laptop/deals", "/laptop/review-pipeline", "/laptop/vote", "/laptop/learn",
    "/laptop/learn/how-we-test", "/laptop/tests/changelogs",
    "/laptop/tools/compare", "/laptop/tools/table", "/laptop/tools/graph", "/laptop/tools/custom-ratings",
  ];

  return [
    ...staticPages.map((p) => u(p, p === "/" ? 1 : 0.7)),
    ...laptops.map((l) => u(laptopHref(l), 0.8)),
    ...laptops.map((l) => u(`${laptopHref(l)}/test-results`, 0.5)),
    ...bestCategories.map((c) => u(`/laptop/reviews/best/${c.slug}`, 0.9)),
    ...brands.map((b) => u(`/laptop/reviews/${b.slug}`, 0.7)),
    ...guides.map((g) => u(`/laptop/learn/${g.slug}`, 0.7)),
    ...comparisons.map((c) => u(`/laptop/compare/${c.slug}`, 0.7)),
    ...testMethods.map((t) => u(`/laptop/tests/${t.slug}`, 0.5)),
    ...dealCategories.map((d) => u(`/laptop/deals/${d.slug}`, 0.6)),
  ];
}
