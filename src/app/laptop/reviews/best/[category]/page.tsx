import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SecondaryNav } from "@/components/SecondaryNav";
import { RecommendationCard } from "@/components/RecommendationCard";
import { AuthorBox, AffiliateDisclosure, FAQ, TableOfContents, SectionCard, Linkify } from "@/components/blocks";
import { ScoreBadge } from "@/components/Score";
import { Newsletter } from "@/components/Newsletter";
import { AmazonButton } from "@/components/AmazonButton";
import { ProductImage } from "@/components/ProductImage";
import { amazonImage, laptopAmazonLink } from "@/lib/affiliate";
import { bestCategories, getBestCategory, categoryPicks } from "@/data/categories";
import { laptopHref, laptops } from "@/data/laptops";
import { comparisons, comparisonLaptops } from "@/data/comparisons";
import { formatCAD, lowestPrice } from "@/lib/scoring";
import { SITE, CONTENT_UPDATED } from "@/lib/site";
import { frByEnSlug } from "@/data/fr";
import type { BestCategory, Laptop } from "@/lib/types";

export function generateStaticParams() {
  return bestCategories.map((c) => ({ category: c.slug }));
}

// Natural singular phrase for prose, e.g. "Best Laptops for Video Editing in
// Canada" -> "laptop for video editing in Canada".
const PROPER: [RegExp, string][] = [
  [/\bmacbooks?\b/g, "MacBook"], [/\bchromebooks?\b/g, "Chromebook"], [/\bwindows\b/g, "Windows"],
  [/\blenovo\b/g, "Lenovo"], [/\bdell\b/g, "Dell"], [/\bhp\b/g, "HP"], [/\basus\b/g, "ASUS"], [/\bacer\b/g, "Acer"],
  [/\bbest buy canada\b/g, "Best Buy Canada"], [/\bit students\b/g, "IT students"], [/\blinux\b/g, "Linux"], [/\bcad\b/g, "CAD"], [/\bcanada\b/g, "Canada"],
];
function topicLabel(c: BestCategory): string {
  if (c.slug === "brands") return "laptop from any brand in Canada";
  if (c.slug === "long-battery-life") return "laptop for battery life in Canada";
  let t = c.title.replace(/^Best /, "").replace(/^Laptops With the /, "Laptops With the ").toLowerCase();
  t = t.replace(/\blaptops\b/, "laptop");
  for (const [re, rep] of PROPER) t = t.replace(re, rep);
  return t.includes("Canada") ? t : `${t} in Canada`;
}

// Best-value alternative: only shown when it is actually cheaper than the #1 pick.
function bestValuePick(picks: Laptop[]): Laptop | undefined {
  const top = picks[0];
  if (!top) return undefined;
  return picks
    .slice(1, 6)
    .filter((l) => lowestPrice(l) < lowestPrice(top))
    .sort((a, b) => b.scores.value - a.scores.value || lowestPrice(a) - lowestPrice(b))[0];
}

const monthYear = (iso: string) =>
  new Date(iso + "T12:00:00Z").toLocaleDateString("en-CA", { month: "long", year: "numeric", timeZone: "UTC" });

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const c = getBestCategory(category);
  if (!c) return {};
  const picks = categoryPicks(c);
  const top = picks[0];
  const n = Math.min(picks.length, 6);
  // Answer in the title and description: count, #1 pick, score and CAD price.
  const title = c.seoTitle ?? `${c.title} (2026): ${n} Tested Pick${n === 1 ? "" : "s"}`;
  const value = bestValuePick(picks);
  const description = top
    ? `Our #1 pick: ${top.brand} ${top.model}, ${top.overall.toFixed(1)}/10, from ${formatCAD(lowestPrice(top))} CAD.` +
      (value ? ` Best value: ${value.brand} ${value.model}, ${formatCAD(lowestPrice(value))}.` : "") +
      ` ${picks.length} laptop${picks.length === 1 ? "" : "s"} tested & ranked.` +
      ` Updated ${monthYear(CONTENT_UPDATED)}.`
    : c.intro.slice(0, 155);
  const url = `/laptop/reviews/best/${c.slug}`;
  const fr = frByEnSlug(c.slug);
  return {
    title,
    description,
    alternates: {
      canonical: url,
      ...(fr ? { languages: { "en-CA": url, "fr-CA": `/fr/${fr.slug}`, "x-default": url } } : {}),
    },
    openGraph: { type: "article", title, description, url, modifiedTime: CONTENT_UPDATED },
    twitter: { title, description },
  };
}

const ROLES = ["Best Overall", "Best Mid-Range", "Best Budget", "Best Premium", "Best Alternative", "Also Great"];

export default async function BestListPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = getBestCategory(category);
  if (!cat) notFound();
  const picks = categoryPicks(cat);
  if (picks.length === 0) notFound();

  const updated = CONTENT_UPDATED;
  const top = picks[0];
  const value = bestValuePick(picks);
  const label = topicLabel(cat);
  const shown = picks.slice(0, 6);
  const metric = cat.metric;
  const sections = cat.sections ?? [];
  const sectionId = (i: number) => `q-${i}`;
  // Lists with a custom ranking (battery, weight, FPS per dollar…) get numbered
  // ranks rather than "Best Overall" style roles, which would be misleading.
  const role = (i: number) => (cat.sort ? `#${i + 1}${metric ? ` · ${metric.label}: ${metric.value(picks[i])}` : ""}` : ROLES[i] ?? "Notable Mention");
  const listName = cat.title.replace(/ in Canada$/, "");
  const rankedBy = cat.rankedBy ?? "overall test score";
  // List-specific reason for each pick (rank, this list's metric, price vs #1),
  // so a laptop that appears on several lists gets different copy on each.
  const why = (l: Laptop, i: number) => {
    const m = metric ? `${metric.label}: ${metric.value(l)}` : `${l.overall.toFixed(1)}/10`;
    if (i === 0) return `Ranked #1 of ${picks.length} on our ${listName} list (${m}; ${l.overall.toFixed(1)}/10 overall, ${formatCAD(lowestPrice(l))}).`;
    const d = lowestPrice(l) - lowestPrice(top);
    const priceCmp = d === 0 ? "the same price as" : d < 0 ? `${formatCAD(-d)} less than` : `${formatCAD(d)} more than`;
    return `Ranked #${i + 1} of ${picks.length} here (${m}${metric ? ` vs ${metric.value(top)} for #1` : ""}); ${l.overall.toFixed(1)}/10 overall and ${priceCmp} the ${top.model}.`;
  };
  const prices = picks.map(lowestPrice);
  const range = (xs: number[], unit: string, digits = 1) => {
    const lo = Math.min(...xs), hi = Math.max(...xs);
    return lo === hi ? `${lo.toFixed(digits)}${unit}` : `${lo.toFixed(digits)}–${hi.toFixed(digits)}${unit}`;
  };
  const cheapest = picks.slice().sort((a, b) => lowestPrice(a) - lowestPrice(b))[0];
  const longest = picks.slice().sort((a, b) => b.test.batteryWebHours - a.test.batteryWebHours)[0];
  const lightest = picks.slice().sort((a, b) => a.weightKg - b.weightKg)[0];
  const pickIds = new Set(picks.slice(0, 6).map((l) => l.id));
  const headToHead = comparisons
    .filter((c) => pickIds.has(c.a) && pickIds.has(c.b))
    .slice(0, 5);
  const toc = [
    { id: "quick-answer", label: "Quick answer" },
    { id: "summary", label: "Our picks at a glance" },
    ...picks.slice(0, 6).map((l, i) => ({ id: `pick-${i}`, label: `${cat.sort ? `#${i + 1}` : ROLES[i] ?? "Notable Mention"}: ${l.brand} ${l.model}` })),
    { id: "specs", label: "Specs & test results compared" },
    ...sections.map((sec, i) => ({ id: sectionId(i), label: sec.heading })),
    { id: "how-we-picked", label: "How we picked" },
    ...(picks.length > 1 ? [{ id: "how-to-choose", label: "How to choose" }] : []),
    { id: "faq", label: "FAQ" },
  ];

  const pageUrl = `${SITE.url}/laptop/reviews/best/${cat.slug}`;
  const graphLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        headline: cat.h1,
        description: cat.intro,
        url: pageUrl,
        inLanguage: "en-CA",
        datePublished: "2025-01-15",
        dateModified: updated,
        author: { "@type": "Organization", name: `${SITE.name} Test Team`, url: `${SITE.url}/about` },
        publisher: { "@type": "Organization", name: SITE.name, logo: { "@type": "ImageObject", url: `${SITE.url}/icon.svg` } },
        mainEntityOfPage: pageUrl,
        speakable: { "@type": "SpeakableSpecification", cssSelector: ["#quick-answer"] },
        mainEntity: { "@id": `${pageUrl}#list` },
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#list`,
        name: cat.title,
        numberOfItems: shown.length,
        itemListOrder: "https://schema.org/ItemListOrderDescending",
        itemListElement: shown.map((l, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${SITE.url}${laptopHref(l)}`,
          name: `${l.brand} ${l.model}`,
          ...(amazonImage(l.id) ? { image: amazonImage(l.id) } : {}),
        })),
      },
    ],
  };

  const faq = [
    { q: `What is the best ${label}?`, a: `Our top pick is the ${top.brand} ${top.model}, which scored ${top.overall.toFixed(1)}/10 in our testing and costs from ${formatCAD(lowestPrice(top))} CAD.${value ? ` For less money, the ${value.brand} ${value.model} (${formatCAD(lowestPrice(value))}) is the best value.` : ""}` },
    ...(cat.faq ?? []),
    { q: `How did you rank the ${listName.replace(/^Best /, "").toLowerCase()}?`, a: `By ${rankedBy}. ${picks.length} of the ${laptops.length} laptops we have tested qualify, and every number comes from our own lab measurements.` },
    {
      q: `How much does a good ${label.replace(/ in Canada$/, "")} cost in Canada?`,
      a: picks.length > 1
        ? `Our ${picks.length} picks cost ${formatCAD(Math.min(...prices))} to ${formatCAD(Math.max(...prices))} CAD; the #1 pick is ${formatCAD(lowestPrice(top))}. Prices are from Canadian retailers and change daily.`
        : `Our pick costs ${formatCAD(lowestPrice(top))} CAD at Canadian retailers; prices change daily.`,
    },
  ];
  const relatedSlugs = [...(cat.related ?? []), ...bestCategories.filter((c) => c.group === cat.group).map((c) => c.slug)];
  const related = Array.from(new Set(relatedSlugs))
    .filter((s) => s !== cat.slug)
    .map((s) => bestCategories.find((c) => c.slug === s))
    .filter((c): c is BestCategory => !!c)
    .slice(0, 10);

  return (
    <>
      <SecondaryNav active={cat.slug} />
      <Breadcrumbs items={[{ label: "Laptops", href: "/laptop" }, { label: "Best", href: "/laptop/reviews/best/laptop" }, { label: cat.navLabel }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graphLd) }} />

      <div className="container-site grid gap-8 pb-12 lg:grid-cols-[1fr_280px]">
        <div className="min-w-0">
          <header>
            <h1 className="text-3xl font-extrabold sm:text-4xl">{cat.h1}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-ink-400">
              <span className="inline-flex items-center rounded-full bg-accent-500/10 px-2.5 py-0.5 text-xs font-bold text-accent-600">Updated for 2026</span>
              {frByEnSlug(cat.slug) && <Link href={`/fr/${frByEnSlug(cat.slug)!.slug}`} hrefLang="fr-CA" lang="fr-CA" className="link">Version française</Link>}
              <span>Last updated <time dateTime={updated}>{monthYear(updated)}</time> · {picks.length} laptop{picks.length === 1 ? "" : "s"} ranked · Test Bench {SITE.testBench}</span>
            </div>
            {/* Quick answer: the direct, quotable answer in the first screen. */}
            <div id="quick-answer" className="mt-5 scroll-mt-20 rounded-xl border-2 border-brand-200 bg-brand-50 p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-brand-700">Quick answer</p>
              {cat.quickAnswer ? (
                <p className="mt-2 text-lg text-ink-900">{cat.quickAnswer(picks)}</p>
              ) : (
              <p className="mt-2 text-lg text-ink-900">
                The best {label} is the{" "}
                <Link href={laptopHref(top)} className="font-bold text-brand-700 hover:underline">{top.brand} {top.model}</Link>, scoring{" "}
                <strong>{top.overall.toFixed(1)}/10</strong> in our tests{metric ? <> ({metric.label}: <strong>{metric.value(top)}</strong>)</> : null}, from{" "}
                <strong>{formatCAD(lowestPrice(top))}</strong>.
                {value && <> Best value: the <Link href={laptopHref(value)} className="font-semibold text-brand-700 hover:underline">{value.brand} {value.model}</Link> at {formatCAD(lowestPrice(value))}.</>}
              </p>
              )}
              <p className="mt-2 text-xs text-ink-500">Ranked by {rankedBy}.</p>
              <AmazonButton laptop={top} className="mt-4 sm:max-w-xs" />
            </div>

            {/* Quick picks: top three with image and a buy button, in the first screen on desktop. */}
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {shown.slice(0, 3).map((l, i) => (
                <div key={l.id} className="card flex flex-col p-3">
                  <p className="text-[11px] font-extrabold uppercase tracking-wide text-brand-700">{cat.sort ? `#${i + 1}` : ROLES[i]}</p>
                  <Link href={`#pick-${i}`} className="mt-2 block"><ProductImage laptop={l} size={300} className="aspect-[4/3] w-full" /></Link>
                  <p className="mt-2 line-clamp-2 text-sm font-semibold leading-snug"><Link href={laptopHref(l)} className="hover:text-brand-700">{l.brand} {l.model}</Link></p>
                  <p className="mt-0.5 text-xs text-ink-500">{l.overall.toFixed(1)}/10 · {formatCAD(lowestPrice(l))}</p>
                  <AmazonButton laptop={l} size="sm" label="Check price" note={false} className="mt-auto pt-3" />
                </div>
              ))}
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
                    {metric && <th className="p-3">{metric.label}</th>}
                    <th className="p-3">Price (CAD)</th>
                    <th className="p-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {picks.slice(0, 6).map((l, i) => (
                    <tr key={l.id}>
                      <td className="p-3 font-semibold text-brand-700">{cat.sort ? `#${i + 1}` : ROLES[i] ?? "Notable"}</td>
                      <td className="p-3"><Link href={laptopHref(l)} className="font-medium hover:text-brand-700">{l.brand} {l.model}</Link></td>
                      <td className="p-3"><ScoreBadge score={l.overall} /></td>
                      {metric && <td className="p-3">{metric.value(l)}</td>}
                      <td className="p-3 font-medium">{formatCAD(lowestPrice(l))}</td>
                      <td className="p-3 whitespace-nowrap">
                        <a href={laptopAmazonLink(l)} target="_blank" rel="sponsored nofollow noopener" className="font-bold text-[#C45500] hover:underline">Amazon</a>
                        {" · "}<a href={`#pick-${i}`} className="link">Details</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Recommendation sections */}
          <div className="mt-8 space-y-8">
            {picks.slice(0, 6).map((l, i) => (
              <RecommendationCard key={l.id} laptop={l} role={role(i)} id={`pick-${i}`} why={why(l, i)} />
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
            <section id="specs" className="scroll-mt-20">
              <h2 className="mb-3 text-2xl font-bold">Specs &amp; test results compared</h2>
              <p className="mb-3 text-ink-600">Every number below was measured on our Test Bench {SITE.testBench}; battery is our web-browsing test at 150 nits.</p>
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-left text-xs uppercase text-ink-400">
                    <tr>
                      <th className="p-3">Laptop</th><th className="p-3">CPU</th><th className="p-3">GPU</th><th className="p-3">RAM</th>
                      <th className="p-3">Screen</th><th className="p-3">Weight</th><th className="p-3">Battery</th><th className="p-3">1080p FPS</th><th className="p-3">4K export</th><th className="p-3">Price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {picks.map((l) => (
                      <tr key={l.id}>
                        <td className="p-3"><Link href={laptopHref(l)} className="link font-medium">{l.brand} {l.model}</Link></td>
                        <td className="p-3">{l.cpu}</td>
                        <td className="p-3">{l.gpu}</td>
                        <td className="p-3">{l.ram} GB</td>
                        <td className="p-3">{l.screenSize}&quot; {l.panelType}, {l.refreshRate} Hz</td>
                        <td className="p-3">{l.weightKg} kg</td>
                        <td className="p-3">{l.test.batteryWebHours} h</td>
                        <td className="p-3">{l.test.gamingFps1080pHigh}</td>
                        <td className="p-3">{l.test.videoExportMinutes} min</td>
                        <td className="p-3 font-medium">{formatCAD(lowestPrice(l))}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {sections.map((sec, i) => (
              <SectionCard key={sec.heading} id={sectionId(i)} title={sec.heading}>
                {sec.body.map((para, j) => <p key={j}><Linkify text={para} /></p>)}
              </SectionCard>
            ))}

            {/* Computed from this list's own picks, so no two lists share this copy. */}
            <SectionCard id="how-we-picked" title={`How we picked the ${listName.replace(/^Best /, "").toLowerCase()}`}>
              <p>{cat.criteria} Of the {laptops.length} laptops we have tested on Test Bench {SITE.testBench}, {picks.length} qualify for this list, ranked by {rankedBy}.</p>
              <p>No placement is paid for. <Link href="/laptop/learn/how-we-test" className="link">How we test</Link> · <Link href="/editorial-policy" className="link">Editorial policy</Link>.</p>
            </SectionCard>

            {picks.length > 1 && (
              <SectionCard id="how-to-choose" title={`How to choose between these ${picks.length} laptops`}>
                <p>
                  Across these picks, prices run {formatCAD(Math.min(...prices))}–{formatCAD(Math.max(...prices))}, battery life {range(picks.map((l) => l.test.batteryWebHours), " h")} and weight {range(picks.map((l) => l.weightKg), " kg", 2)}.
                  {cheapest.id !== top.id && <> If the {top.model} is over budget, the <Link href={laptopHref(cheapest)} className="link">{cheapest.brand} {cheapest.model}</Link> is the cheapest pick at {formatCAD(lowestPrice(cheapest))}.</>}
                  {longest.id !== top.id && <> For the longest battery, the {longest.model} lasted {longest.test.batteryWebHours} h.</>}
                  {lightest.id !== top.id && lightest.id !== longest.id && <> To carry the least weight, the {lightest.model} is {lightest.weightKg} kg.</>}
                </p>
                <p>Filter every tested laptop by these specs in the <Link href="/laptop/tools/table" className="link">results table</Link>, or weigh finalists in the <Link href="/laptop/tools/compare" className="link">compare tool</Link>.</p>
              </SectionCard>
            )}

            <section id="faq" className="scroll-mt-20"><FAQ items={faq} /></section>

            {headToHead.length > 0 && (
              <SectionCard id="head-to-head" title="Compare these picks head-to-head">
                <p>Still deciding between our top picks? These side-by-side comparisons break down the differences with our test data:</p>
                <ul className="mt-2 space-y-1">
                  {headToHead.map((c) => {
                    const [a, b] = comparisonLaptops(c);
                    return <li key={c.slug}><Link href={`/laptop/compare/${c.slug}`} className="link">{a.brand} {a.model} vs {b.brand} {b.model}</Link></li>;
                  })}
                </ul>
              </SectionCard>
            )}

            <SectionCard id="related" title="Related Best Lists">
              <div className="flex flex-wrap gap-2">
                {related.map((c) => (
                  <Link key={c.slug} href={`/laptop/reviews/best/${c.slug}`} className="chip hover:bg-brand-100">{c.navLabel}</Link>
                ))}
              </div>
            </SectionCard>
          </div>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-20 space-y-4">
            <div className="card p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-brand-700">Our top pick</p>
              <ProductImage laptop={top} size={300} className="mt-2 aspect-[4/3] w-full" />
              <p className="mt-2 text-sm font-semibold">{top.brand} {top.model}</p>
              <p className="text-xs text-ink-500">{top.overall.toFixed(1)}/10 · {formatCAD(lowestPrice(top))}</p>
              <AmazonButton laptop={top} size="sm" className="mt-3" />
            </div>
            <TableOfContents items={toc} />
          </div>
        </aside>
      </div>
      <Newsletter />
    </>
  );
}
