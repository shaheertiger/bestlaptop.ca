import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SecondaryNav } from "@/components/SecondaryNav";
import { keywordGroups, keywordCount } from "@/data/keywords";

export const metadata: Metadata = {
  title: "Popular Laptop Searches (Canada)",
  description: "Browse popular laptop searches in Canada — best lists, comparisons, brands, price ranges, deals, and buying guides — and jump straight to the right page.",
  alternates: { canonical: "/laptop/popular-searches" },
};

export default function PopularSearchesPage() {
  return (
    <>
      <SecondaryNav />
      <Breadcrumbs items={[{ label: "Laptops", href: "/laptop" }, { label: "Popular Searches" }]} />
      <div className="container-site pb-12">
        <header className="mb-6">
          <h1 className="text-3xl font-extrabold">Popular Laptop Searches in Canada</h1>
          <p className="mt-2 max-w-2xl text-ink-500">
            A directory of the {keywordCount.toLocaleString()} laptop searches we cover, grouped by type. Each links to the
            tested guide, comparison, or tool that answers it.
          </p>
        </header>

        <div className="space-y-4">
          {keywordGroups.map(({ group, items }) => (
            <details key={group} className="card p-5" open={items.length <= 40}>
              <summary className="cursor-pointer text-lg font-bold">
                {group} <span className="text-sm font-normal text-ink-400">({items.length})</span>
              </summary>
              <ul className="mt-4 grid gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2 lg:grid-cols-3">
                {items.map((k) => (
                  <li key={k.kw}>
                    <Link href={k.url} className="text-ink-600 hover:text-brand-700">{k.kw}</Link>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </div>
    </>
  );
}
