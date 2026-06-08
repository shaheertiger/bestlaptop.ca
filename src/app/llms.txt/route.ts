import { SITE } from "@/lib/site";
import { laptops, laptopHref } from "@/data/laptops";
import { bestCategories } from "@/data/categories";
import { brands } from "@/data/brands";
import { guides } from "@/data/guides";
import { featuredComparisons, comparisonLaptops } from "@/data/comparisons";
import { testMethods } from "@/data/tests";
import { dealCategories } from "@/data/pipeline";

export const dynamic = "force-static";

// /llms.txt — a curated, machine-readable map of the site for LLMs and AI
// search engines (the emerging llms.txt convention). Concise, link-first,
// markdown so models can find and cite the most useful pages.
export function GET() {
  const u = (path: string) => `${SITE.url}${path}`;

  const topReviews = [...laptops]
    .filter((l) => l.status === "published")
    .sort((a, b) => b.overall - a.overall)
    .slice(0, 15);

  const lines: string[] = [];
  const push = (s = "") => lines.push(s);

  push(`# ${SITE.name}`);
  push();
  push(`> Canada's independent laptop testing site. We buy and test laptops on a standardized 10-point Test Bench, then publish objective reviews, comparisons, rankings, deals, and buying guides with Canadian (CAD) pricing.`);
  push();
  push(`All scores come from in-house testing, not manufacturer claims. Prices are in CAD and reflect Canadian retailers. Reviews disclose affiliate relationships and never let them affect scores. Current methodology: Test Bench ${SITE.testBench}.`);
  push();

  push(`## Best Laptop Lists`);
  for (const c of bestCategories) push(`- [${c.title}](${u(`/laptop/reviews/best/${c.slug}`)}): ${c.criteria}`);
  push();

  push(`## Featured Laptop Reviews`);
  for (const l of topReviews) push(`- [${l.brand} ${l.model} review](${u(laptopHref(l))}): ${l.overall.toFixed(1)}/10. ${l.verdict}`);
  push();

  push(`## Popular Comparisons`);
  for (const c of featuredComparisons) {
    const [a, b] = comparisonLaptops(c);
    push(`- [${a.brand} ${a.model} vs ${b.brand} ${b.model}](${u(`/laptop/compare/${c.slug}`)}): ${c.verdict}`);
  }
  push();

  push(`## Buying Guides`);
  for (const g of guides) push(`- [${g.title}](${u(`/laptop/learn/${g.slug}`)}): ${g.answer}`);
  push();

  push(`## Brands`);
  for (const b of brands) push(`- [${b.name} laptops](${u(`/laptop/reviews/${b.slug}`)}): ${b.overview}`);
  push();

  push(`## Tools`);
  push(`- [Compare laptops](${u("/laptop/tools/compare")}): side-by-side comparison of 2–4 laptops with category winners.`);
  push(`- [Results table](${u("/laptop/tools/table")}): sortable, filterable database of every tested laptop.`);
  push(`- [Graph tool](${u("/laptop/tools/graph")}): plot test results across laptops.`);
  push(`- [Custom ratings](${u("/laptop/tools/custom-ratings")}): reweight scores to your priorities.`);
  push(`- [Review pipeline](${u("/laptop/review-pipeline")}): what we are testing next.`);
  push();

  push(`## Deals`);
  for (const d of dealCategories.filter((x) => x.slug !== "best-laptop-deals-canada")) push(`- [${d.title}](${u(`/laptop/deals/${d.slug}`)})`);
  push();

  push(`## Testing Methodology`);
  push(`- [How we test laptops](${u("/laptop/learn/how-we-test")}): full methodology and scoring.`);
  for (const t of testMethods) push(`- [${t.title}](${u(`/laptop/tests/${t.slug}`)}): ${t.summary}`);
  push(`- [Test Bench changelogs](${u("/laptop/tests/changelogs")}): how the methodology has changed.`);
  push();

  push(`## About & Policies`);
  push(`- [About BestLaptop.ca](${u("/about")})`);
  push(`- [Editorial & independence policy](${u("/editorial-policy")})`);
  push(`- [How we make money](${u("/how-we-make-money")})`);
  push(`- [Affiliate disclosure](${u("/affiliate-disclosure")})`);
  push();

  push(`## Optional`);
  push(`- [Sitemap](${u("/sitemap.xml")})`);
  push(`- [Popular searches](${u("/laptop/popular-searches")})`);

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
