import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SecondaryNav } from "@/components/SecondaryNav";
import { brands } from "@/data/brands";
import { laptops } from "@/data/laptops";

export const metadata: Metadata = {
  title: "Laptop Brands — Reviews & Buying Advice (Canada)",
  description: "Browse laptop brands we test, including Apple, Lenovo, Dell, HP, ASUS, Acer, and more, with strengths, weaknesses, and best models.",
  alternates: { canonical: "/laptop/brands" },
};

export default function BrandsPage() {
  return (
    <>
      <SecondaryNav />
      <Breadcrumbs items={[{ label: "Laptops", href: "/laptop" }, { label: "Brands" }]} />
      <div className="container-site pb-12">
        <h1 className="text-3xl font-extrabold">Laptop Brands</h1>
        <p className="mt-2 max-w-2xl text-ink-500">Each brand page covers strengths, weaknesses, the typical buyer, and every model we have reviewed.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {brands.map((b) => {
            const count = laptops.filter((l) => l.brandSlug === b.slug).length;
            return (
              <Link key={b.slug} href={`/laptop/reviews/${b.slug}`} className="card p-5 transition hover:shadow-md">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold">{b.name}</h2>
                  <span className="chip">{count} review{count === 1 ? "" : "s"}</span>
                </div>
                <p className="mt-2 line-clamp-3 text-sm text-ink-500">{b.overview}</p>
                <p className="mt-3 text-xs text-ink-400">Best for: {b.bestUseCases.join(", ")}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
