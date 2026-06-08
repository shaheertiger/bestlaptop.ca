import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SecondaryNav } from "@/components/SecondaryNav";
import { ReviewRowCard } from "@/components/LaptopCard";
import { ScoreBadge } from "@/components/Score";
import { FAQ, SectionCard } from "@/components/blocks";
import { Newsletter } from "@/components/Newsletter";
import { brands, getBrand } from "@/data/brands";
import { laptops, laptopHref } from "@/data/laptops";
import { getBestCategory } from "@/data/categories";
import { formatCAD, lowestPrice } from "@/lib/scoring";
import { laptopRankings } from "@/lib/insights";
import { guides } from "@/data/guides";

export function generateStaticParams() {
  return brands.map((b) => ({ brand: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ brand: string }> }): Promise<Metadata> {
  const { brand } = await params;
  const b = getBrand(brand);
  if (!b) return {};
  return {
    title: `${b.name} Laptops — Reviews, Best Models & Comparison (Canada)`,
    description: `${b.overview.slice(0, 150)}`,
    alternates: { canonical: `/laptop/reviews/${b.slug}` },
  };
}

export default async function BrandPage({ params }: { params: Promise<{ brand: string }> }) {
  const { brand } = await params;
  const b = getBrand(brand);
  if (!b) notFound();
  const models = laptops.filter((l) => l.brandSlug === b.slug).sort((a, c) => c.overall - a.overall);
  const hasBestList = !!getBestCategory(b.slug);

  // Best-list rankings any of this brand's tested models qualify for (excluding
  // the brand's own list and the generic "all laptops" list).
  const useCaseLists = Array.from(
    new Map(
      models
        .flatMap((m) => laptopRankings(m))
        .filter((c) => c.slug !== b.slug && c.slug !== "laptop" && (c.group === "use-case" || c.group === "type" || c.group === "price"))
        .map((c) => [c.slug, c] as const),
    ).values(),
  ).slice(0, 8);
  const relatedGuides = guides.filter((g) => ["Getting started", "Buying advice", "Comparisons"].includes(g.category)).slice(0, 4);

  return (
    <>
      <SecondaryNav />
      <Breadcrumbs items={[{ label: "Laptops", href: "/laptop" }, { label: "Brands", href: "/laptop/brands" }, { label: b.name }]} />
      <div className="container-site pb-12">
        <header className="mb-6">
          <h1 className="text-3xl font-extrabold sm:text-4xl">{b.name} Laptops</h1>
          <p className="mt-3 max-w-3xl text-lg text-ink-700">{b.overview}</p>
          {hasBestList && (
            <Link href={`/laptop/reviews/best/${b.slug}`} className="btn-primary mt-4">See the best {b.name} laptops →</Link>
          )}
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          <SectionCard id="strengths" title="Strengths">
            <ul className="list-disc space-y-1 pl-5">{b.strengths.map((s) => <li key={s}>{s}</li>)}</ul>
          </SectionCard>
          <SectionCard id="weaknesses" title="Weaknesses">
            <ul className="list-disc space-y-1 pl-5">{b.weaknesses.map((s) => <li key={s}>{s}</li>)}</ul>
          </SectionCard>
        </div>

        <p className="mt-6 text-ink-700"><span className="font-semibold">Typical buyer:</span> {b.buyerProfile} <span className="font-semibold">Best use cases:</span> {b.bestUseCases.join(", ")}.</p>

        {useCaseLists.length > 0 && (
          <section className="mt-8">
            <h2 className="mb-3 text-2xl font-bold">Best {b.name} laptops by use case</h2>
            <p className="mb-3 text-ink-600">
              Looking for a {b.name} laptop for something specific? These rankings include {b.name} models alongside the competition, tested the same way:
            </p>
            <div className="flex flex-wrap gap-2">
              {hasBestList && (
                <Link href={`/laptop/reviews/best/${b.slug}`} className="chip bg-brand-100 hover:bg-brand-200">Best {b.name} laptops</Link>
              )}
              {useCaseLists.map((c) => (
                <Link key={c.slug} href={`/laptop/reviews/best/${c.slug}`} className="chip hover:bg-brand-100">{c.navLabel}</Link>
              ))}
            </div>
          </section>
        )}

        {models.length > 0 ? (
          <>
            <section className="mt-10">
              <h2 className="mb-4 text-2xl font-bold">{b.name} Reviews</h2>
              <div className="grid gap-4">{models.map((l) => <ReviewRowCard key={l.id} laptop={l} />)}</div>
            </section>

            <section className="mt-10">
              <h2 className="mb-4 text-2xl font-bold">{b.name} Comparison Table</h2>
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-left text-xs uppercase text-ink-400">
                    <tr><th className="p-3">Model</th><th className="p-3">Score</th><th className="p-3">CPU</th><th className="p-3">Battery</th><th className="p-3">Weight</th><th className="p-3">Price</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {models.map((l) => (
                      <tr key={l.id}>
                        <td className="p-3"><Link href={laptopHref(l)} className="link font-medium">{l.model}</Link></td>
                        <td className="p-3"><ScoreBadge score={l.overall} /></td>
                        <td className="p-3">{l.cpu}</td>
                        <td className="p-3">{l.test.batteryWebHours} h</td>
                        <td className="p-3">{l.weightKg} kg</td>
                        <td className="p-3">{formatCAD(lowestPrice(l))}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        ) : (
          <p className="mt-10 rounded-lg border border-slate-200 bg-slate-50 p-4 text-ink-500">We have not published a {b.name} review yet. <Link href="/laptop/vote" className="link">Vote to see one tested next</Link>.</p>
        )}

        <div className="mt-10"><FAQ items={b.faq} heading={`${b.name} Laptop FAQ`} /></div>

        <section className="mt-10">
          <h2 className="mb-4 text-2xl font-bold">Helpful buying guides</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relatedGuides.map((g) => (
              <Link key={g.slug} href={`/laptop/learn/${g.slug}`} className="card p-4 transition hover:shadow-md">
                <span className="chip">{g.category}</span>
                <h3 className="mt-2 text-sm font-semibold leading-snug">{g.title}</h3>
              </Link>
            ))}
          </div>
        </section>
      </div>
      <Newsletter />
    </>
  );
}
