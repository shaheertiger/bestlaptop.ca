import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SecondaryNav } from "@/components/SecondaryNav";
import { ScoreBadge } from "@/components/Score";
import { laptops, laptopHref } from "@/data/laptops";

export const metadata: Metadata = {
  title: "Laptop Review Index (A–Z)",
  description: "Alphabetical index of all laptop reviews on BestLaptop.ca, grouped by brand, with model, series, and year.",
  alternates: { canonical: "/laptop/reviews/index" },
};

export default function ReviewIndexPage() {
  const byBrand = new Map<string, typeof laptops>();
  for (const l of [...laptops].sort((a, b) => a.model.localeCompare(b.model))) {
    const arr = byBrand.get(l.brand) ?? [];
    arr.push(l);
    byBrand.set(l.brand, arr);
  }
  const brands = [...byBrand.keys()].sort();
  return (
    <>
      <SecondaryNav />
      <Breadcrumbs items={[{ label: "Laptops", href: "/laptop" }, { label: "Reviews", href: "/laptop/reviews" }, { label: "Index" }]} />
      <div className="container-site pb-12">
        <h1 className="text-3xl font-extrabold">Review Index (A–Z)</h1>
        <p className="mt-2 text-ink-500">All laptop reviews grouped by brand, then model and year.</p>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {brands.map((brand) => (
            <section key={brand}>
              <h2 className="mb-3 border-b border-slate-200 pb-1 text-xl font-bold">{brand}</h2>
              <ul className="divide-y divide-slate-100">
                {byBrand.get(brand)!.map((l) => (
                  <li key={l.id} className="flex items-center justify-between gap-3 py-2.5">
                    <div>
                      <Link href={laptopHref(l)} className="font-medium hover:text-brand-700">{l.model}</Link>
                      <p className="text-xs text-ink-400">{l.series} · {l.year}</p>
                    </div>
                    <ScoreBadge score={l.overall} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
