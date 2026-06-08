import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SecondaryNav } from "@/components/SecondaryNav";
import { laptops, laptopHref } from "@/data/laptops";
import { comparisons, comparisonLaptops } from "@/data/comparisons";
import { testBenches } from "@/data/tests";

export const metadata: Metadata = {
  title: "Laptop News & Updates (Canada)",
  description: "The latest laptop reviews, comparisons, testing updates, and database changes from BestLaptop.ca.",
  alternates: { canonical: "/laptop/news" },
};

export default function NewsPage() {
  const items = [
    ...laptops.map((l) => ({ type: "Review", title: `${l.brand} ${l.model} review`, date: l.testedDate, href: laptopHref(l), summary: l.verdict })),
    ...comparisons.map((c) => { const [a, b] = comparisonLaptops(c); return { type: "Comparison", title: `${a.brand} ${a.model} vs ${b.brand} ${b.model}`, date: "2025-11-05", href: `/laptop/compare/${c.slug}`, summary: c.verdict }; }),
    ...testBenches.map((b) => ({ type: "Testing update", title: `Laptop Test Bench ${b.version} released`, date: b.date, href: "/laptop/tests/changelogs", summary: b.summary })),
  ].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <SecondaryNav />
      <Breadcrumbs items={[{ label: "Laptops", href: "/laptop" }, { label: "News" }]} />
      <div className="container-site pb-12">
        <h1 className="text-3xl font-extrabold">Laptop News & Updates</h1>
        <p className="mt-2 text-ink-500">Reviews, comparisons, and testing changes, newest first.</p>
        <div className="mt-8 space-y-4">
          {items.map((it, i) => (
            <Link key={i} href={it.href} className="card flex flex-col gap-1 p-5 transition hover:shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wide text-brand-700">{it.type}</span>
                <span className="text-xs text-ink-400">{it.date}</span>
              </div>
              <h2 className="text-lg font-semibold">{it.title}</h2>
              <p className="line-clamp-2 text-sm text-ink-500">{it.summary}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
