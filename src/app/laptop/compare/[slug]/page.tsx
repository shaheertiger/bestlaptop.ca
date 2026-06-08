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
import { comparisonAnalysis, sharedRankings } from "@/lib/insights";

export function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getComparison(slug);
  if (!c) return {};
  const [a, b] = comparisonLaptops(c);
  return {
    title: `${a.brand} ${a.model} vs ${b.brand} ${b.model}: Which Should You Buy?`,
    description: c.verdict.slice(0, 150),
    alternates: { canonical: `/laptop/compare/${c.slug}` },
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
  const { paragraphs: analysis, differences } = comparisonAnalysis(a, b);
  const shared = sharedRankings(a, b);

  const faq = [
    { q: `Should I buy the ${a.model} or the ${b.model}?`, a: c.verdict },
    ...c.winnerByUseCase.map((w) => {
      const winner = w.winner === a.id ? a : b;
      return { q: `Which is better for ${w.useCase.toLowerCase()}?`, a: `The ${winner.brand} ${winner.model} is the better choice for ${w.useCase.toLowerCase()}.` };
    }),
  ];

  return (
    <>
      <SecondaryNav />
      <Breadcrumbs items={[{ label: "Laptops", href: "/laptop" }, { label: "Compare", href: "/laptop/tools/compare" }, { label: `${a.model} vs ${b.model}` }]} />
      <div className="container-site pb-12">
        <h1 className="text-3xl font-extrabold sm:text-4xl">{a.brand} {a.model} vs {b.brand} {b.model}: Which Laptop Should You Buy?</h1>

        {/* Header cards */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[a, b].map((l) => (
            <div key={l.id} className="card p-5 text-center">
              <ProductImage laptop={l} className="mx-auto aspect-[16/9] w-full max-w-xs" />
              <h2 className="mt-3 font-bold"><Link href={laptopHref(l)} className="hover:text-brand-700">{l.brand} {l.model}</Link></h2>
              <div className="mt-2 flex justify-center"><ScoreCircle score={l.overall} size={56} /></div>
              <p className="mt-1 font-semibold">{formatCAD(lowestPrice(l))}</p>
            </div>
          ))}
        </div>

        <SectionCard id="verdict" title="Quick Verdict">
          <p>{c.verdict}</p>
        </SectionCard>

        {differences.length > 0 && (
          <section id="key-differences" className="mt-8">
            <h2 className="mb-3 text-2xl font-bold">Key Differences</h2>
            <ul className="card list-disc space-y-1.5 p-5 pl-9 text-ink-700">
              {differences.map((d) => <li key={d}>{d}</li>)}
            </ul>
          </section>
        )}

        <section id="analysis" className="mt-8">
          <h2 className="mb-3 text-2xl font-bold">{a.model} vs {b.model}: Full Breakdown</h2>
          <div className="prose-site space-y-4">
            {analysis.map((p, i) => <p key={i}>{p}</p>)}
            <p>
              For the complete testing data, read our full{" "}
              <Link href={laptopHref(a)} className="link">{a.brand} {a.model} review</Link> and{" "}
              <Link href={laptopHref(b)} className="link">{b.brand} {b.model} review</Link>.
            </p>
          </div>
        </section>

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
          <h2 className="mb-3 text-2xl font-bold">Winner by Use Case</h2>
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
          <h2 className="mb-3 text-2xl font-bold">Specs & Scores Comparison</h2>
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

        <SectionCard id="recommendation" title="Which Should You Buy?">
          <p>{c.verdict}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link href={laptopHref(a)} className="btn-secondary">Read {a.model} review</Link>
            <Link href={laptopHref(b)} className="btn-secondary">Read {b.model} review</Link>
            <Link href={`/laptop/tools/compare?add=${a.id}&add=${b.id}`} className="btn-primary">Open in compare tool</Link>
          </div>
        </SectionCard>

        <div className="mt-8"><FAQ items={faq} /></div>

        <SectionCard id="related" title="Related Comparisons">
          <ul className="space-y-1">
            {comparisons.filter((x) => x.slug !== c.slug).slice(0, 4).map((x) => {
              const [xa, xb] = comparisonLaptops(x);
              return <li key={x.slug}><Link href={`/laptop/compare/${x.slug}`} className="link">{xa.brand} {xa.model} vs {xb.brand} {xb.model}</Link></li>;
            })}
          </ul>
        </SectionCard>
      </div>
      <Newsletter />
    </>
  );
}
