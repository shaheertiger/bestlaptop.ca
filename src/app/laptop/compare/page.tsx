import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SecondaryNav } from "@/components/SecondaryNav";
import { ScoreBadge } from "@/components/Score";
import { comparisons, featuredComparisons, comparisonLaptops } from "@/data/comparisons";
import { laptops, laptopHref } from "@/data/laptops";
import { comparisonWinner } from "@/lib/insights";
import { CONTENT_UPDATED, SITE } from "@/lib/site";

// Hub for every head-to-head page: the "list page" that links down to all
// comparisons in crawlable HTML, so each one is two clicks from the homepage.
const title = `Laptop Comparisons Canada: ${comparisons.length} Head-to-Heads From Our Lab Tests`;
const description = `Every tested laptop compared side by side: ${laptops.length} laptops, ${comparisons.length} match-ups, each with measured battery life, weight, benchmarks, FPS and Canadian prices.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/laptop/compare" },
  openGraph: { title, description, url: "/laptop/compare" },
};

export default function ComparisonsHub() {
  const byLaptop = laptops
    .slice()
    .sort((x, y) => y.overall - x.overall)
    .map((l) => ({
      laptop: l,
      items: comparisons
        .filter((c) => c.a === l.id || c.b === l.id)
        .map((c) => {
          const [a, b] = comparisonLaptops(c);
          const other = a.id === l.id ? b : a;
          return { c, other };
        })
        .sort((p, q) => q.other.overall - p.other.overall),
    }));

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Laptop comparisons",
    numberOfItems: featuredComparisons.length,
    itemListElement: featuredComparisons.map((c, i) => {
      const [a, b] = comparisonLaptops(c);
      return { "@type": "ListItem", position: i + 1, name: `${a.brand} ${a.model} vs ${b.brand} ${b.model}`, url: `${SITE.url}/laptop/compare/${c.slug}` };
    }),
  };

  return (
    <>
      <SecondaryNav />
      <Breadcrumbs items={[{ label: "Laptops", href: "/laptop" }, { label: "Comparisons" }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
      <div className="container-site pb-12">
        <header className="mb-6">
          <h1 className="text-3xl font-extrabold sm:text-4xl">Laptop Comparisons</h1>
          <div id="quick-answer" className="mt-4 rounded-xl border border-brand-200 bg-brand-50 p-4">
            <p className="text-ink-900">
              We have compared all {laptops.length} laptops we tested against each other: {comparisons.length} head-to-heads, each built from the same lab
              measurements (battery life, weight, Geekbench, 1080p FPS, brightness) and current Canadian prices. Pick a laptop below to see how it stacks up.
            </p>
            <p className="mt-2 text-xs text-ink-500">
              Updated {CONTENT_UPDATED} · <Link href="/laptop/learn/how-we-test" className="link">How we test</Link> ·{" "}
              <Link href="/laptop/tools/compare" className="link">Build your own comparison</Link>
            </p>
          </div>
        </header>

        <section className="mb-10">
          <h2 className="mb-3 text-2xl font-bold">Most-read laptop comparisons</h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs uppercase text-ink-400">
                <tr><th className="p-3">Comparison</th><th className="p-3">Scores</th><th className="p-3">Winner</th><th className="p-3">Battery (web)</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {featuredComparisons.map((c) => {
                  const [a, b] = comparisonLaptops(c);
                  const { winner, tie } = comparisonWinner(a, b);
                  return (
                    <tr key={c.slug}>
                      <td className="p-3"><Link href={`/laptop/compare/${c.slug}`} className="link font-medium">{a.brand} {a.model} vs {b.brand} {b.model}</Link></td>
                      <td className="p-3 tabular-nums">{a.overall.toFixed(1)} vs {b.overall.toFixed(1)}</td>
                      <td className="p-3">{tie ? "Tie" : winner.model}</td>
                      <td className="p-3 tabular-nums">{a.test.batteryWebHours} h vs {b.test.batteryWebHours} h</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <h2 className="mb-4 text-2xl font-bold">Comparisons by laptop</h2>
        <div className="space-y-6">
          {byLaptop.map(({ laptop: l, items }) => (
            <section key={l.id} id={l.id} className="card scroll-mt-20 p-5">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-bold">
                  <Link href={laptopHref(l)} className="hover:text-brand-700">{l.brand} {l.model}</Link> comparisons
                </h3>
                <ScoreBadge score={l.overall} />
              </div>
              <ul className="grid gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2 lg:grid-cols-3">
                {items.map(({ c, other }) => (
                  <li key={c.slug}>
                    <Link href={`/laptop/compare/${c.slug}`} className="text-ink-700 hover:text-brand-700">{l.model} vs {other.brand} {other.model}</Link>{" "}
                    <span className="text-ink-400">({l.overall.toFixed(1)} vs {other.overall.toFixed(1)})</span>
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
