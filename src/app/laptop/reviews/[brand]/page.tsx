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
      </div>
      <Newsletter />
    </>
  );
}
