import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SecondaryNav } from "@/components/SecondaryNav";
import { ReviewRowCard } from "@/components/LaptopCard";
import { ScoreBadge } from "@/components/Score";
import { FAQ, SectionCard, Linkify } from "@/components/blocks";
import { Newsletter } from "@/components/Newsletter";
import { brands, getBrand } from "@/data/brands";
import { laptops, laptopHref } from "@/data/laptops";
import { getBestCategory } from "@/data/categories";
import { formatCAD, lowestPrice } from "@/lib/scoring";
import { laptopRankings, brandStats } from "@/lib/insights";
import { CONTENT_UPDATED, SITE } from "@/lib/site";
import { guides } from "@/data/guides";
import { comparisons, comparisonLaptops } from "@/data/comparisons";
import { ProductImage } from "@/components/ProductImage";
import { AmazonButton } from "@/components/AmazonButton";
import { hasAmazonListing, laptopAmazonLink } from "@/lib/affiliate";

export function generateStaticParams() {
  return brands.map((b) => ({ brand: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ brand: string }> }): Promise<Metadata> {
  const { brand } = await params;
  const b = getBrand(brand);
  if (!b) return {};
  const models = laptops.filter((l) => l.brandSlug === b.slug && l.status === "published").sort((a, c) => c.overall - a.overall);
  const top = models[0];
  const title = b.seoTitle ?? (models.length
    ? `${b.name} Laptops Canada (2026): ${models.length} Tested Model${models.length === 1 ? "" : "s"}, Prices & Reviews`
    : `${b.name} Laptops Canada (2026): Reviews & Buying Advice`);
  const description = top
    ? `Our top-rated ${b.name} laptop is the ${top.model} (${top.overall.toFixed(1)}/10, from ${formatCAD(lowestPrice(top))} CAD). ${b.overview.split(". ")[0]}.`.slice(0, 200)
    : b.overview.slice(0, 160);
  return {
    title,
    description,
    alternates: { canonical: `/laptop/reviews/${b.slug}` },
    openGraph: { title, description, url: `/laptop/reviews/${b.slug}` },
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
  const stats = brandStats(models);
  // Head-to-heads between this brand's own models (e.g. "MacBook Air 13 vs 15").
  const ids = new Set(models.map((m) => m.id));
  const inBrand = comparisons.filter((c) => ids.has(c.a) && ids.has(c.b));

  const itemListLd = models.length
    ? {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: `${b.name} laptops tested by ${SITE.name}`,
        numberOfItems: models.length,
        itemListElement: models.map((l, i) => ({ "@type": "ListItem", position: i + 1, name: `${l.brand} ${l.model}`, url: `${SITE.url}${laptopHref(l)}` })),
      }
    : null;
  // "X vs Y" guides first: they are the guide format that earns the most search impressions.
  const relatedGuides = [
    ...guides.filter((g) => g.category === "Comparisons"),
    ...guides.filter((g) => ["Getting started", "Buying advice"].includes(g.category)),
  ].slice(0, 8);
  // Head-to-heads against other brands (in-brand ones are listed separately above).
  const brandComparisons = comparisons.filter((c) => ids.has(c.a) !== ids.has(c.b)).slice(0, 12);
  const top = models[0];
  const onAmazon = models.filter((m) => hasAmazonListing(m.id));
  const faq = [
    ...(top ? [{ q: `What is the best ${b.name} laptop?`, a: `The best ${b.name} laptop we have tested is the ${top.model}, which scored ${top.overall.toFixed(1)}/10 and costs from ${formatCAD(lowestPrice(top))} CAD.${models[1] ? ` The ${models[1].model} (${models[1].overall.toFixed(1)}/10, ${formatCAD(lowestPrice(models[1]))}) is the runner-up.` : ""}` }] : []),
    ...b.faq,
    ...(models.length && !b.faq.some((f) => /amazon/i.test(f.q))
      ? [{
          q: `Can you buy ${b.name} laptops on Amazon?`,
          a: onAmazon.length
            ? `Yes. ${onAmazon.map((m) => `The ${m.model}`).join(", ")} ${onAmazon.length === 1 ? "is" : "are"} listed on Amazon. Check the seller and the exact configuration (CPU, RAM, storage) before you buy, since listings often bundle several versions.`
            : `${b.name} sells mainly direct, so Amazon listings are usually third-party sellers or older models. Check the seller and warranty carefully, or buy direct.`,
        }]
      : []),
  ];

  return (
    <>
      <SecondaryNav />
      <Breadcrumbs items={[{ label: "Laptops", href: "/laptop" }, { label: "Brands", href: "/laptop/brands" }, { label: b.name }]} />
      <div className="container-site pb-12">
        <header className="mb-6">
          <h1 className="text-3xl font-extrabold sm:text-4xl">{b.name} Laptops in Canada</h1>
          {itemListLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />}
          {stats && (
            <div id="quick-answer" className="mt-4 max-w-3xl rounded-xl border border-brand-200 bg-brand-50 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-brand-700">Quick answer</p>
              <p className="mt-1 text-ink-900">
                The best {b.name} laptop we have tested is the <Link href={laptopHref(stats.top)} className="link font-semibold">{stats.top.model}</Link> ({stats.top.overall.toFixed(1)}/10, from {formatCAD(lowestPrice(stats.top))} CAD).
                {stats.count > 1 && <>
                  {" "}Across {stats.count} tested {b.name} models, scores range from {stats.scoreMin.toFixed(1)} to {stats.scoreMax.toFixed(1)} (median {stats.scoreMedian.toFixed(1)}) and prices from {formatCAD(stats.priceMin)} to {formatCAD(stats.priceMax)}.
                  {" "}Longest battery: {stats.longestBattery.model} ({stats.longestBattery.test.batteryWebHours} h). Lightest: {stats.lightest.model} ({stats.lightest.weightKg} kg).
                  {stats.cheapest.id !== stats.top.id && <> Cheapest: {stats.cheapest.model} ({formatCAD(lowestPrice(stats.cheapest))}).</>}
                </>}
              </p>
              <p className="mt-2 text-xs text-ink-500">Computed from our lab results · Updated {CONTENT_UPDATED} · <Link href="/laptop/learn/how-we-test" className="link">How we test</Link></p>
            </div>
          )}
          <p className="mt-4 max-w-3xl text-lg text-ink-700">{b.overview}</p>
          {hasBestList && (
            <Link href={`/laptop/reviews/best/${b.slug}`} className="btn-primary mt-4">See the best {b.name} laptops →</Link>
          )}
          {top && (
            <div className="mt-6 grid gap-4 rounded-2xl border-2 border-brand-200 bg-brand-50 p-4 sm:grid-cols-[180px_1fr] sm:items-center">
              <ProductImage laptop={top} size={300} className="aspect-[4/3] w-full" priority />
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-brand-700">Top-rated {b.name} laptop</p>
                <p className="mt-1 text-lg text-ink-900">
                  <Link href={laptopHref(top)} className="font-bold text-brand-700 hover:underline">{b.name} {top.model}</Link>: <strong>{top.overall.toFixed(1)}/10</strong> in our tests, from <strong>{formatCAD(lowestPrice(top))}</strong>. {top.bestFor}.
                </p>
                <AmazonButton laptop={top} className="mt-3 sm:max-w-xs" />
              </div>
            </div>
          )}
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          <SectionCard id="strengths" title={`What are ${b.name} laptops good at?`}>
            <ul className="list-disc space-y-1 pl-5">{b.strengths.map((s) => <li key={s}>{s}</li>)}</ul>
          </SectionCard>
          <SectionCard id="weaknesses" title={`Where do ${b.name} laptops fall short?`}>
            <ul className="list-disc space-y-1 pl-5">{b.weaknesses.map((s) => <li key={s}>{s}</li>)}</ul>
          </SectionCard>
        </div>

        {b.sections && b.sections.length > 0 && (
          <div className="mt-8 space-y-8">
            {b.sections.map((sec, i) => (
              <SectionCard key={sec.heading} id={`q-${i}`} title={sec.heading}>
                {sec.body.map((para, j) => <p key={j}><Linkify text={para} /></p>)}
              </SectionCard>
            ))}
          </div>
        )}

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
              <h2 className="mb-4 text-2xl font-bold">{b.name} laptop reviews</h2>
              <div className="grid gap-4">{models.map((l) => <ReviewRowCard key={l.id} laptop={l} />)}</div>
            </section>

            <section className="mt-10">
              <h2 className="mb-4 text-2xl font-bold">{b.name} laptops compared: scores, battery, weight and price</h2>
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-left text-xs uppercase text-ink-400">
                    <tr><th className="p-3">Model</th><th className="p-3">Score</th><th className="p-3">CPU</th><th className="p-3">Battery</th><th className="p-3">Weight</th><th className="p-3">Price</th><th className="p-3"></th></tr>
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
                        <td className="p-3"><a href={laptopAmazonLink(l)} target="_blank" rel="sponsored nofollow noopener" className="whitespace-nowrap font-bold text-[#C45500] hover:underline">Amazon →</a></td>
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

        {inBrand.length > 0 && (
          <section className="mt-10">
            <h2 className="mb-3 text-2xl font-bold">Which {b.name} laptop should you buy? Head-to-heads</h2>
            <ul className="grid gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2">
              {inBrand.map((c) => {
                const x = models.find((m) => m.id === c.a)!;
                const y = models.find((m) => m.id === c.b)!;
                return (
                  <li key={c.slug}>
                    <Link href={`/laptop/compare/${c.slug}`} className="link">{x.model} vs {y.model}</Link>{" "}
                    <span className="text-ink-400">({x.overall.toFixed(1)} vs {y.overall.toFixed(1)})</span>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {brandComparisons.length > 0 && (
          <section className="mt-10">
            <h2 className="mb-3 text-2xl font-bold">{b.name} vs other brands: head-to-heads</h2>
            <p className="mb-3 text-ink-600">How {b.name} models stack up against the competition in our side-by-side tests:</p>
            <ul className="grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
              {brandComparisons.map((c) => {
                const [x, y] = comparisonLaptops(c);
                return <li key={c.slug}><Link href={`/laptop/compare/${c.slug}`} className="link">{x.brand} {x.model} vs {y.brand} {y.model}</Link></li>;
              })}
            </ul>
          </section>
        )}

        <div className="mt-10"><FAQ items={faq} heading={`${b.name} Laptop FAQ`} /></div>

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
