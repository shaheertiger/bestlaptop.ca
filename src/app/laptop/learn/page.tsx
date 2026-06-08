import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SecondaryNav } from "@/components/SecondaryNav";
import { guides } from "@/data/guides";

export const metadata: Metadata = {
  title: "Laptop Buying Guides (Canada)",
  description: "Practical, testing-backed laptop buying guides for Canadians: specs explained, displays, performance, and how to choose.",
  alternates: { canonical: "/laptop/learn" },
};

export default function LearnHub() {
  const byCat = new Map<string, typeof guides>();
  for (const g of guides) {
    const arr = byCat.get(g.category) ?? [];
    arr.push(g);
    byCat.set(g.category, arr);
  }
  return (
    <>
      <SecondaryNav />
      <Breadcrumbs items={[{ label: "Laptops", href: "/laptop" }, { label: "Buying Guides" }]} />
      <div className="container-site pb-12">
        <h1 className="text-3xl font-extrabold">Laptop Buying Guides</h1>
        <p className="mt-2 max-w-2xl text-ink-500">Practical, testing-backed advice to help you choose the right laptop in Canada.</p>
        <div className="mt-8 space-y-10">
          {[...byCat.keys()].map((cat) => (
            <section key={cat}>
              <h2 className="mb-4 text-xl font-bold">{cat}</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {byCat.get(cat)!.map((g) => (
                  <Link key={g.slug} href={`/laptop/learn/${g.slug}`} className="card p-5 transition hover:shadow-md">
                    <h3 className="font-semibold leading-snug">{g.title}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-ink-500">{g.excerpt}</p>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
