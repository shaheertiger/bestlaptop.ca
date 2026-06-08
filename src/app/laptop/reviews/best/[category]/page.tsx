import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SecondaryNav } from "@/components/SecondaryNav";
import { RecommendationCard } from "@/components/RecommendationCard";
import { AuthorBox, AffiliateDisclosure, FAQ, TableOfContents, SectionCard } from "@/components/blocks";
import { ScoreBadge } from "@/components/Score";
import { Newsletter } from "@/components/Newsletter";
import { bestCategories, getBestCategory, categoryPicks } from "@/data/categories";
import { laptopHref } from "@/data/laptops";
import { formatCAD, lowestPrice } from "@/lib/scoring";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return bestCategories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const c = getBestCategory(category);
  if (!c) return {};
  return {
    title: c.title + " (2026)",
    description: `${c.intro.slice(0, 150)}`,
    alternates: { canonical: `/laptop/reviews/best/${c.slug}` },
  };
}

const ROLES = ["Best Overall", "Best Mid-Range", "Best Budget", "Best Premium", "Best Alternative", "Also Great"];

export default async function BestListPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = getBestCategory(category);
  if (!cat) notFound();
  const picks = categoryPicks(cat);
  if (picks.length === 0) notFound();

  const updated = "2026-06-08";
  const toc = [
    { id: "summary", label: "Our picks at a glance" },
    ...picks.slice(0, 6).map((l, i) => ({ id: `pick-${i}`, label: `${ROLES[i] ?? "Notable Mention"}: ${l.brand} ${l.model}` })),
    { id: "how-we-picked", label: "How we picked" },
    { id: "how-to-choose", label: "How to choose" },
    { id: "faq", label: "FAQ" },
  ];

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: cat.title,
    itemListElement: picks.slice(0, 6).map((l, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE.url}${laptopHref(l)}`,
      name: `${l.brand} ${l.model}`,
    })),
  };

  const faq = [
    { q: `What is the best ${cat.navLabel.replace("Best ", "").toLowerCase()} in Canada?`, a: `Our top pick is the ${picks[0].brand} ${picks[0].model}, which scored ${picks[0].overall.toFixed(1)}/10 in our testing. ${picks[0].verdict}` },
    { q: "How did you choose these laptops?", a: cat.criteria + " We buy and test each laptop using our standardized Test Bench and factor in Canadian pricing and availability." },
    { q: "Are these prices in Canadian dollars?", a: "Yes. All prices are in CAD and reflect current pricing at major Canadian retailers, which can change." },
  ];

  return (
    <>
      <SecondaryNav active={cat.slug} />
      <Breadcrumbs items={[{ label: "Laptops", href: "/laptop" }, { label: "Best", href: "/laptop/reviews/best/laptop" }, { label: cat.navLabel }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />

      <div className="container-site grid gap-8 pb-12 lg:grid-cols-[1fr_280px]">
        <div className="min-w-0">
          <header>
            <h1 className="text-3xl font-extrabold sm:text-4xl">{cat.h1}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-ink-400">
              <span className="inline-flex items-center rounded-full bg-accent-500/10 px-2.5 py-0.5 text-xs font-bold text-accent-600">Updated for 2026</span>
              <span>Last updated {updated} · Test Bench {SITE.testBench}</span>
            </div>
            <div className="mt-4"><AuthorBox updated={updated} testBench={SITE.testBench} /></div>
            <p className="mt-4 text-lg text-ink-700">{cat.intro}</p>
            <p className="mt-2 text-ink-600">{cat.criteria}</p>
            <div className="mt-4"><AffiliateDisclosure /></div>
          </header>

          {/* Summary table */}
          <section id="summary" className="mt-8 scroll-mt-20">
            <h2 className="mb-3 text-2xl font-bold">Our picks at a glance</h2>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-left text-xs uppercase text-ink-400">
                  <tr>
                    <th className="p-3">Role</th>
                    <th className="p-3">Laptop</th>
                    <th className="p-3">Score</th>
                    <th className="p-3">Price (CAD)</th>
                    <th className="p-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {picks.slice(0, 6).map((l, i) => (
                    <tr key={l.id}>
                      <td className="p-3 font-semibold text-brand-700">{ROLES[i] ?? "Notable"}</td>
                      <td className="p-3"><Link href={laptopHref(l)} className="font-medium hover:text-brand-700">{l.brand} {l.model}</Link></td>
                      <td className="p-3"><ScoreBadge score={l.overall} /></td>
                      <td className="p-3 font-medium">{formatCAD(lowestPrice(l))}</td>
                      <td className="p-3"><a href={`#pick-${i}`} className="link">Details</a></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Recommendation sections */}
          <div className="mt-8 space-y-8">
            {picks.slice(0, 6).map((l, i) => (
              <RecommendationCard key={l.id} laptop={l} role={ROLES[i] ?? "Notable Mention"} id={`pick-${i}`} />
            ))}
          </div>

          {picks.length > 6 && (
            <SectionCard id="notable" title="Notable Mentions">
              <ul className="list-disc space-y-1 pl-5">
                {picks.slice(6).map((l) => (
                  <li key={l.id}><Link href={laptopHref(l)} className="link">{l.brand} {l.model}</Link> — {l.bestFor} ({formatCAD(lowestPrice(l))})</li>
                ))}
              </ul>
            </SectionCard>
          )}

          <div className="mt-8 space-y-8">
            <SectionCard id="how-we-picked" title="How We Picked">
              <p>{cat.criteria} We start with every laptop we have tested on our current Test Bench, then rank them by the scores most relevant to this use case. We adjust for Canadian street price and retailer availability, and we note where a laptop only makes sense when discounted.</p>
              <p>We do not accept payment for placement. We buy or independently source the laptops we test. <Link href="/editorial-policy" className="link">Read our editorial policy</Link>.</p>
            </SectionCard>

            <SectionCard id="how-we-test" title="How We Test">
              <p>Every laptop goes through the same standardized tests for display, performance, battery life, keyboard, build, thermals, and ports. We measure real battery life at a fixed brightness and report sustained performance, not just peak benchmarks.</p>
              <p><Link href="/laptop/learn/how-we-test" className="link">See our full testing methodology →</Link></p>
            </SectionCard>

            <SectionCard id="how-to-choose" title="How to Choose">
              <p>Start with your main use case and budget, then prioritize the two or three categories that matter most. For most people that means battery life, display quality, and a comfortable keyboard. Use our <Link href="/laptop/tools/table" className="link">results table</Link> to filter by the specs you care about, or our <Link href="/laptop/tools/compare" className="link">compare tool</Link> to weigh finalists side by side.</p>
            </SectionCard>

            <section id="faq" className="scroll-mt-20"><FAQ items={faq} /></section>

            <SectionCard id="related" title="Related Best Lists">
              <div className="flex flex-wrap gap-2">
                {bestCategories.filter((c) => c.slug !== cat.slug).slice(0, 8).map((c) => (
                  <Link key={c.slug} href={`/laptop/reviews/best/${c.slug}`} className="chip hover:bg-brand-100">{c.navLabel}</Link>
                ))}
              </div>
            </SectionCard>
          </div>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-20 space-y-4">
            <TableOfContents items={toc} />
          </div>
        </aside>
      </div>
      <Newsletter />
    </>
  );
}
