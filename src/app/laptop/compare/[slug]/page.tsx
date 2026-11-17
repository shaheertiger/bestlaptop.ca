import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SecondaryNav } from "@/components/SecondaryNav";
import { ProductImage } from "@/components/ProductImage";
import { ScoreBadge, ScoreCircle } from "@/components/Score";
import { FAQ, SectionCard } from "@/components/blocks";
import { Newsletter } from "@/components/Newsletter";
import { comparisons, getComparison, comparisonLaptops } from "@/data/comparisons";
import { laptopHref } from "@/data/laptops";
import { formatCAD, lowestPrice } from "@/lib/scoring";
import { comparisonAnalysis, sharedRankings, comparisonQuickAnswer, comparisonSections, comparisonFaq, comparisonWinner } from "@/lib/insights";
import { AmazonButton } from "@/components/AmazonButton";
import { amazonImage } from "@/lib/affiliate";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getComparison(slug);
  if (!c) return {};
  const [a, b] = comparisonLaptops(c);
  // Query first (exact "{A} vs {B}" words for Bing), then the answer with its numbers.
  const { winner, loser, tie } = comparisonWinner(a, b);
  // Short winner label keeps the answer inside the visible title width.
  const winnerLabel = a.brand !== b.brand ? winner.brand : winner.model;
  const title = tie
    ? `${a.brand} ${a.model} vs ${b.brand} ${b.model}: Tied at ${a.overall.toFixed(1)}/10`
    : `${a.brand} ${a.model} vs ${b.brand} ${b.model}: ${winnerLabel} Wins, ${winner.overall.toFixed(1)} vs ${loser.overall.toFixed(1)}`;
  const description =
    `Tested in Canada: ${a.model} ${a.overall.toFixed(1)} vs ${b.model} ${b.overall.toFixed(1)}/10 · battery ${a.test.batteryWebHours} h vs ${b.test.batteryWebHours} h · ` +
    `${a.weightKg} vs ${b.weightKg} kg · ${a.test.gamingFps1080pHigh} vs ${b.test.gamingFps1080pHigh} FPS · ${formatCAD(lowestPrice(a))} vs ${formatCAD(lowestPrice(b))} CAD.`;
  return {
    title,
    description,
    alternates: { canonical: `/laptop/compare/${c.slug}` },
    openGraph: { type: "article", title, description, url: `/laptop/compare/${c.slug}` },
  };
}

function SpecRow({ label, a, b, winner }: { label: string; a: string; b: string; winner?: "a" | "b" }) {
  return (
    <tr className="border-b border-slate-100">
      <td className="p-3 text-sm font-medium text-ink-500">{label}</td>
      <td className={`p-3 text-sm ${winner === "a" ? "font-bold text-accent-600" : ""}`}>{a}{winner === "a" && " ✓"}</td>
      <td className={`p-3 text-sm ${winner === "b" ? "font-bold text-accent-600" : ""}`}>{b}{winner === "b" && " ✓"}</td>
    </tr>
  );
}

const win = (x: number, y: number, higher = true): "a" | "b" | undefined =>
  x === y ? undefined : higher ? (x > y ? "a" : "b") : x < y ? "a" : "b";

export default async function ComparisonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getComparison(slug);
  if (!c) notFound();
  const [a, b] = comparisonLaptops(c);
  const { differences } = comparisonAnalysis(a, b);
  const sections = comparisonSections(a, b);
  const shared = sharedRankings(a, b);
  const faq = comparisonFaq(a, b, c.verdict, c.winnerByUseCase);

  // Sibling comparisons: other match-ups for these two laptops (not one sitewide list).
  const siblings = comparisons
    .filter((x) => x.slug !== c.slug && (x.a === a.id || x.b === a.id || x.a === b.id || x.b === b.id))
    .map((x) => ({ x, laptops: comparisonLaptops(x) }))
    .sort((p, q) => Math.abs(p.laptops[0].overall - p.laptops[1].overall) - Math.abs(q.laptops[0].overall - q.laptops[1].overall))
    .slice(0, 8);

  const product = (l: typeof a) => ({
    "@type": "Product",
    name: `${l.brand} ${l.model}`,
    brand: { "@type": "Brand", name: l.brand },
    category: "Laptop",
    url: `${SITE.url}${laptopHref(l)}`,
    review: { "@type": "Review", reviewRating: { "@type": "Rating", ratingValue: l.overall, bestRating: 10, worstRating: 1 }, author: { "@type": "Organization", name: `${SITE.name} Test Team` } },
    offers: { "@type": "AggregateOffer", priceCurrency: "CAD", lowPrice: lowestPrice(l), highPrice: l.msrp, offerCount: l.retailers.length },
  });
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${a.brand} ${a.model} vs ${b.brand} ${b.model}`,
    description: comparisonQuickAnswer(a, b),
    author: { "@type": "Organization", name: `${SITE.name} Test Team`, url: `${SITE.url}/about` },
    publisher: { "@type": "Organization", name: SITE.name, logo: { "@type": "ImageObject", url: `${SITE.url}/icon.svg` } },
    dateModified: [a.testedDate, b.testedDate].sort().at(-1),
    mainEntityOfPage: `${SITE.url}/laptop/compare/${c.slug}`,
    about: [product(a), product(b)],
    speakable: { "@type": "SpeakableSpecification", cssSelector: ["#quick-answer"] },
  };

  // Head-to-head facts, in the best-proteinpowder.com compare-page pattern:
  // a quick answer up top, then "buy X if..." personas and specific FAQs.
  const pick = (fa: number, fb: number, higher = true) => (fa === fb ? null : (higher ? fa > fb : fa < fb) ? a : b);
  const other = (x: typeof a) => (x.id === a.id ? b : a);
  const cheaper = pick(lowestPrice(a), lowestPrice(b), false);
  const longer = pick(a.test.batteryWebHours, b.test.batteryWebHours);
  const lighter = pick(a.weightKg, b.weightKg, false);
  const faster = pick(a.test.geekbenchMulti, b.test.geekbenchMulti);
  const gamer = pick(a.test.gamingFps1080pHigh, b.test.gamingFps1080pHigh);
  const brighter = pick(a.test.brightnessNits, b.test.brightnessNits);
  const better = pick(a.overall, b.overall);
  const quick = [
    better ? `The ${better.brand} ${better.model} scores higher overall (${better.overall.toFixed(1)} vs ${other(better).overall.toFixed(1)}).` : `They tie on overall score at ${a.overall.toFixed(1)}.`,
    cheaper ? `The ${cheaper.model} is ${formatCAD(Math.abs(lowestPrice(a) - lowestPrice(b)))} cheaper in Canada right now.` : "They currently cost the same in Canada.",
    longer ? `The ${longer.model} lasts longer on battery (${longer.test.batteryWebHours} h vs ${other(longer).test.batteryWebHours} h web browsing).` : "",
    lighter ? `The ${lighter.model} is lighter (${lighter.weightKg} kg vs ${other(lighter).weightKg} kg).` : "",
  ].filter(Boolean);
  const buyIf = [
    cheaper && { who: "You want the lower price", l: cheaper, why: `${formatCAD(lowestPrice(cheaper))} vs ${formatCAD(lowestPrice(other(cheaper)))}` },
    longer && { who: "Battery life matters most", l: longer, why: `${longer.test.batteryWebHours} h vs ${other(longer).test.batteryWebHours} h in our web test` },
    lighter && { who: "You carry it every day", l: lighter, why: `${lighter.weightKg} kg vs ${other(lighter).weightKg} kg` },
    faster && { who: "You need more performance", l: faster, why: `Geekbench multi ${faster.test.geekbenchMulti.toLocaleString()} vs ${other(faster).test.geekbenchMulti.toLocaleString()}` },
    gamer && Math.max(a.test.gamingFps1080pHigh, b.test.gamingFps1080pHigh) >= 40 && { who: "You play games", l: gamer, why: `${gamer.test.gamingFps1080pHigh} vs ${other(gamer).test.gamingFps1080pHigh} FPS at 1080p High` },
  ].filter(Boolean) as { who: string; l: typeof a; why: string }[];


  const url = `${SITE.url}/laptop/compare/${c.slug}`;
  // Breadcrumbs and Article are emitted elsewhere; this adds the two products with images.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemList",
        numberOfItems: 2,
        itemListElement: [a, b].map((l, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${SITE.url}${laptopHref(l)}`,
          name: `${l.brand} ${l.model}`,
          ...(amazonImage(l.id) ? { image: amazonImage(l.id) } : {}),
        })),
        url,
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SecondaryNav />
      <Breadcrumbs items={[{ label: "Laptops", href: "/laptop" }, { label: "Comparisons", href: "/laptop/compare" }, { label: `${a.model} vs ${b.model}` }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <div className="container-site pb-12">
        <h1 className="text-3xl font-extrabold sm:text-4xl">{a.brand} {a.model} vs {b.brand} {b.model}</h1>

        <div id="quick-answer" className="mt-4 rounded-xl border border-brand-200 bg-brand-50 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-brand-700">Quick answer</p>
          <p className="mt-1 text-ink-900">{comparisonQuickAnswer(a, b)}</p>
          <p className="mt-2 text-xs text-ink-500">
            Source: BestLaptop.ca lab measurements · Last verified {[a.testedDate, b.testedDate].sort().at(-1)} ·{" "}
            <Link href="/laptop/learn/how-we-test" className="link">How we test</Link>
          </p>
        </div>
        <p className="mt-2 text-xs text-ink-400">We may earn a commission if you buy through our Amazon links. As an Amazon Associate we earn from qualifying purchases.</p>

        {/* Header cards */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[a, b].map((l) => (
            <div key={l.id} className="card p-5 text-center">
              <ProductImage laptop={l} className="mx-auto aspect-[16/9] w-full max-w-xs" />
              <h2 className="mt-3 font-bold"><Link href={laptopHref(l)} className="hover:text-brand-700">{l.brand} {l.model}</Link></h2>
              <div className="mt-2 flex justify-center"><ScoreCircle score={l.overall} size={56} /></div>
              <p className="mt-1 font-semibold">{formatCAD(lowestPrice(l))}</p>
              <AmazonButton laptop={l} size="sm" className="mx-auto mt-3 max-w-xs" />
            </div>
          ))}
        </div>

        <div className="mt-8">
          <SectionCard id="verdict" title={`Should you buy the ${a.model} or the ${b.model}?`}>
            <p>{c.verdict}</p>
          </SectionCard>
        </div>

        {differences.length > 0 && (
          <section id="key-differences" className="mt-8">
            <h2 className="mb-3 text-2xl font-bold">{a.model} vs {b.model}: key differences</h2>
            <ul className="card list-disc space-y-1.5 p-5 pl-9 text-ink-700">
              {differences.map((d) => <li key={d}>{d}</li>)}
            </ul>
          </section>
        )}

        {/* One question-phrased H2 per sub-intent; every answer leads with the measured numbers. */}
        <div className="mt-8 space-y-8">
          {sections.map((s) => (
            <SectionCard key={s.id} id={s.id} title={s.heading}>
              {s.body.map((p, i) => <p key={i}>{p}</p>)}
            </SectionCard>
          ))}
          <p className="text-ink-700">
            Full measurements:{" "}
            <Link href={laptopHref(a)} className="link">{a.brand} {a.model} review</Link> ({a.overall.toFixed(1)}/10) and{" "}
            <Link href={laptopHref(b)} className="link">{b.brand} {b.model} review</Link> ({b.overall.toFixed(1)}/10).
          </p>
        </div>

        {shared.length > 0 && (
          <section id="rankings" className="mt-8">
            <h2 className="mb-3 text-2xl font-bold">Where these laptops rank</h2>
            <p className="mb-3 text-ink-600">Both the {a.model} and the {b.model} feature in these BestLaptop.ca rankings:</p>
            <div className="flex flex-wrap gap-2">
              {shared.slice(0, 8).map((cat) => (
                <Link key={cat.slug} href={`/laptop/reviews/best/${cat.slug}`} className="chip hover:bg-brand-100">{cat.title}</Link>
              ))}
            </div>
          </section>
        )}

        <section id="use-cases" className="mt-8">
          <h2 className="mb-3 text-2xl font-bold">{a.model} or {b.model}: winner by use case</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {c.winnerByUseCase.map((w) => {
              const winner = w.winner === a.id ? a : b;
              return (
                <div key={w.useCase} className="card flex items-center justify-between p-4">
                  <span className="font-medium">{w.useCase}</span>
                  <span className="text-sm font-semibold text-accent-600">{winner.brand} {winner.model}</span>
                </div>
              );
            })}
          </div>
        </section>

        <section id="specs" className="mt-8">
          <h2 className="mb-3 text-2xl font-bold">{a.model} vs {b.model} specs and test results</h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="p-3 text-left text-xs uppercase text-ink-400">Spec</th>
                  <th className="p-3 text-left text-sm font-bold">{a.model}</th>
                  <th className="p-3 text-left text-sm font-bold">{b.model}</th>
                </tr>
              </thead>
              <tbody>
                <SpecRow label="Overall score" a={a.overall.toFixed(1)} b={b.overall.toFixed(1)} winner={win(a.overall, b.overall)} />
                <SpecRow label="Price (CAD)" a={formatCAD(lowestPrice(a))} b={formatCAD(lowestPrice(b))} winner={win(lowestPrice(a), lowestPrice(b), false)} />
                <SpecRow label="CPU" a={a.cpu} b={b.cpu} />
                <SpecRow label="GPU" a={a.gpu} b={b.gpu} />
                <SpecRow label="RAM" a={`${a.ram}GB ${a.ramType}`} b={`${b.ram}GB ${b.ramType}`} winner={win(a.ram, b.ram)} />
                <SpecRow label="Storage" a={`${a.storage}GB`} b={`${b.storage}GB`} winner={win(a.storage, b.storage)} />
                <SpecRow label="Display" a={`${a.screenSize}" ${a.panelType}`} b={`${b.screenSize}" ${b.panelType}`} />
                <SpecRow label="Brightness" a={`${a.test.brightnessNits} nits`} b={`${b.test.brightnessNits} nits`} winner={win(a.test.brightnessNits, b.test.brightnessNits)} />
                <SpecRow label="Battery (web)" a={`${a.test.batteryWebHours} h`} b={`${b.test.batteryWebHours} h`} winner={win(a.test.batteryWebHours, b.test.batteryWebHours)} />
                <SpecRow label="Weight" a={`${a.weightKg} kg`} b={`${b.weightKg} kg`} winner={win(a.weightKg, b.weightKg, false)} />
                <SpecRow label="Geekbench multi" a={a.test.geekbenchMulti.toLocaleString()} b={b.test.geekbenchMulti.toLocaleString()} winner={win(a.test.geekbenchMulti, b.test.geekbenchMulti)} />
                <SpecRow label="Gaming (1080p)" a={`${a.test.gamingFps1080pHigh} fps`} b={`${b.test.gamingFps1080pHigh} fps`} winner={win(a.test.gamingFps1080pHigh, b.test.gamingFps1080pHigh)} />
                <SpecRow label="OS" a={a.os} b={b.os} />
                <SpecRow label="Warranty" a={a.warranty} b={b.warranty} />
              </tbody>
            </table>
          </div>
        </section>

        <SectionCard id="recommendation" title="Which one should you buy?">
          {buyIf.length > 0 && (
            <ul className="not-prose mt-4 divide-y divide-slate-100 rounded-xl border border-slate-200">
              {buyIf.map((x) => (
                <li key={x.who} className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-ink-900">{x.who}: buy the {x.l.brand} {x.l.model}</p>
                    <p className="text-sm text-ink-500">{x.why}</p>
                  </div>
                  <AmazonButton laptop={x.l} size="sm" note={false} label="Check price" className="sm:w-40" />
                </li>
              ))}
            </ul>
          )}
        </SectionCard>

        <div className="mt-8" />
        <SectionCard id="recommendation" title="Compare them yourself">
          <p>Open both laptops in the compare tool to weight the scores for your own priorities.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link href={laptopHref(a)} className="btn-secondary">Read {a.model} review</Link>
            <Link href={laptopHref(b)} className="btn-secondary">Read {b.model} review</Link>
            <Link href={`/laptop/tools/compare?add=${a.id}&add=${b.id}`} className="btn-primary">Open in compare tool</Link>
          </div>
        </SectionCard>

        <div className="mt-8"><FAQ items={faq} /></div>

        <SectionCard id="related" title={`More ${a.model} and ${b.model} comparisons`}>
          <ul className="space-y-1">
            {siblings.map(({ x, laptops: [xa, xb] }) => (
              <li key={x.slug}>
                <Link href={`/laptop/compare/${x.slug}`} className="link">{xa.brand} {xa.model} vs {xb.brand} {xb.model}</Link>{" "}
                <span className="text-sm text-ink-400">({xa.overall.toFixed(1)} vs {xb.overall.toFixed(1)})</span>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-sm"><Link href="/laptop/compare" className="link">All {comparisons.length} laptop comparisons →</Link></p>
        </SectionCard>
      </div>
      <Newsletter />
    </>
  );
}
