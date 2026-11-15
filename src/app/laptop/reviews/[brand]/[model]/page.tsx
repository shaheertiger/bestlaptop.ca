import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SecondaryNav } from "@/components/SecondaryNav";
import { ProductImage } from "@/components/ProductImage";
import { ScoreCircle, ScoreBar, ScoreBadge } from "@/components/Score";
import { ProsCons, RetailerButtons, AffiliateDisclosure, AuthorBox, FAQ, SectionCard, TableOfContents } from "@/components/blocks";
import { Newsletter } from "@/components/Newsletter";
import { laptops, getLaptop, laptopHref } from "@/data/laptops";
import { comparisons, comparisonLaptops } from "@/data/comparisons";
import { DEFAULT_WEIGHTS, WEIGHT_LABELS, formatCAD, lowestPrice } from "@/lib/scoring";
import { laptopRankings, reviewQuickAnswer, reviewFaq, metricRank, ordinalRank } from "@/lib/insights";
import { SITE } from "@/lib/site";
import type { CategoryScores, UseCaseScores } from "@/lib/types";

export function generateStaticParams() {
  return laptops.map((l) => ({ brand: l.brandSlug, model: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ brand: string; model: string }> }): Promise<Metadata> {
  const { brand, model } = await params;
  const l = getLaptop(brand, model);
  if (!l) return {};
  // Number in the title: the tested score is the click and citation hook.
  const title = `${l.brand} ${l.model} Review: ${l.overall.toFixed(1)}/10, Tested in Canada`;
  const description = `${l.metaDescription} Score ${l.overall.toFixed(1)}/10 · ${l.test.batteryWebHours} h battery · from ${formatCAD(lowestPrice(l))} CAD.`;
  return {
    title,
    description,
    alternates: { canonical: laptopHref(l) },
    openGraph: { type: "article", title, description, url: laptopHref(l) },
  };
}

const USE_CASE_LABELS: Record<keyof UseCaseScores, string> = {
  school: "School", business: "Business", gaming: "Gaming", multimedia: "Multimedia",
  workstation: "Workstation", programming: "Programming", travel: "Travel", battery: "Battery", value: "Value",
};

export default async function ReviewPage({ params }: { params: Promise<{ brand: string; model: string }> }) {
  const { brand, model } = await params;
  const l = getLaptop(brand, model);
  if (!l) notFound();

  const related = laptops.filter((x) => x.id !== l.id && x.categories.some((c) => l.categories.includes(c))).slice(0, 3);
  // Closest rivals first: comparisons against laptops sharing the most best-list categories.
  const shared = (c: { a: string; b: string }) => {
    const other = laptops.find((x) => x.id === (c.a === l.id ? c.b : c.a));
    return other ? other.categories.filter((cat) => l.categories.includes(cat)).length : 0;
  };
  const relatedComparisons = comparisons
    .filter((c) => c.a === l.id || c.b === l.id)
    .sort((x, y) => shared(y) - shared(x))
    .slice(0, 6);
  const rankings = laptopRankings(l);

  const reviewLd = {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "Product",
      name: `${l.brand} ${l.model}`,
      brand: { "@type": "Brand", name: l.brand },
      category: "Laptop",
      operatingSystem: l.os,
      image: `${SITE.url}/og/${l.id}.png`,
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "CAD",
        lowPrice: lowestPrice(l),
        highPrice: l.msrp,
        offerCount: l.retailers.length,
        availability: "https://schema.org/InStock",
      },
    },
    reviewRating: { "@type": "Rating", ratingValue: l.overall, bestRating: 10, worstRating: 1 },
    // Pros and cons as structured notes (eligible for the pros/cons review snippet).
    positiveNotes: { "@type": "ItemList", itemListElement: l.pros.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p })) },
    negativeNotes: { "@type": "ItemList", itemListElement: l.cons.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c })) },
    author: { "@type": "Organization", name: `${SITE.name} Test Team`, url: `${SITE.url}/about` },
    publisher: { "@type": "Organization", name: SITE.name, logo: { "@type": "ImageObject", url: `${SITE.url}/icon.svg` } },
    datePublished: l.releaseDate,
    dateModified: l.testedDate,
    speakable: { "@type": "SpeakableSpecification", cssSelector: ["#quick-answer"] },
  };

  // Data-driven FAQ: every answer carries this laptop's own measured numbers.
  const faq = reviewFaq(l);
  const m = l.model;
  const rank = {
    battery: ordinalRank(metricRank(l, "battery")),
    weight: ordinalRank(metricRank(l, "weight")),
    multicore: ordinalRank(metricRank(l, "multicore")),
    fps: ordinalRank(metricRank(l, "fps")),
    brightness: ordinalRank(metricRank(l, "brightness")),
    noise: ordinalRank(metricRank(l, "loadNoise")),
  };
  const useCaseKeys = Object.keys(USE_CASE_LABELS) as (keyof UseCaseScores)[];
  const bestUseCase = useCaseKeys.reduce((x, y) => (l.useCases[y] > l.useCases[x] ? y : x));
  const worstUseCase = useCaseKeys.reduce((x, y) => (l.useCases[y] < l.useCases[x] ? y : x));

  const toc = [
    { id: "quick-answer", label: "Quick answer" },
    { id: "verdict", label: "Quick verdict" },
    { id: "scores", label: "Scores & breakdown" },
    { id: "use-cases", label: "Use-case scores" },
    { id: "design", label: "Design & build" },
    { id: "display", label: "Display" },
    { id: "keyboard", label: "Keyboard & touchpad" },
    { id: "performance", label: "Performance" },
    { id: "gaming", label: "Gaming" },
    { id: "battery", label: "Battery life" },
    { id: "thermals", label: "Thermals & noise" },
    { id: "pricing", label: "Pricing & availability" },
    { id: "compared", label: "Compared to others" },
    { id: "final", label: "Final verdict" },
    { id: "faq", label: "FAQ" },
  ];

  return (
    <>
      <SecondaryNav />
      <Breadcrumbs items={[{ label: "Laptops", href: "/laptop" }, { label: "Reviews", href: "/laptop/reviews" }, { label: l.brand, href: `/laptop/reviews/${l.brandSlug}` }, { label: l.model }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewLd) }} />

      {/* Hero */}
      <div className="container-site">
        <h1 className="text-3xl font-extrabold sm:text-4xl">{l.brand} {l.model} Review</h1>
        <p className="mt-1 text-sm text-ink-400">
          <Link href={`/laptop/reviews/${l.brandSlug}`} className="hover:text-brand-700">{l.brand} laptops</Link> · {l.series} · {l.year} · Released {l.releaseDate} · Tested {l.testedDate} · Test Bench {l.testBench} · <span className="font-medium capitalize text-accent-600">{l.status}</span>
        </p>
        {/* Answer-first block: score + key measurements in the first screen (quotable on its own). */}
        <div id="quick-answer" className="mt-4 scroll-mt-20 rounded-xl border border-brand-200 bg-brand-50 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-brand-700">Quick answer</p>
          <p className="mt-1 text-ink-900">{reviewQuickAnswer(l)}</p>
          <p className="mt-2 text-xs text-ink-500">
            Source: BestLaptop.ca lab measurements, Test Bench {l.testBench} · Last verified {l.testedDate} ·{" "}
            <Link href="/laptop/learn/how-we-test" className="link">How we test</Link> ·{" "}
            <Link href={laptopHref(l) + "/test-results"} className="link">All {l.model} test results</Link>
          </p>
        </div>
      </div>

      <div className="container-site mt-6 grid gap-8 pb-12 lg:grid-cols-[1fr_300px]">
        <div className="min-w-0">
          {/* Product hero */}
          <div className="card overflow-hidden">
            <div className="grid gap-6 p-5 md:grid-cols-[280px_1fr]">
              <div>
                <ProductImage laptop={l} className="aspect-[4/3] w-full" />
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {[0, 1, 2].map((i) => <ProductImage key={i} laptop={l} className="aspect-[4/3] w-full opacity-80" />)}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-4">
                  <ScoreCircle score={l.overall} size={72} />
                  <div>
                    <p className="text-2xl font-extrabold">{l.overall.toFixed(1)}<span className="text-base font-normal text-ink-400">/10</span></p>
                    <p className="text-sm text-ink-500">Overall · Test Bench {l.testBench}</p>
                  </div>
                </div>
                <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <div><dt className="text-ink-400">Best for</dt><dd className="font-medium">{l.bestFor}</dd></div>
                  <div><dt className="text-ink-400">Not ideal for</dt><dd className="font-medium">{l.notIdealFor}</dd></div>
                  <div><dt className="text-ink-400">Tested config</dt><dd className="font-medium">{l.cpu}, {l.ram}GB, {l.storage}GB</dd></div>
                  <div><dt className="text-ink-400">Current price</dt><dd className="font-medium">{formatCAD(lowestPrice(l))}</dd></div>
                  <div><dt className="text-ink-400">MSRP</dt><dd className="font-medium">{formatCAD(l.msrp)}</dd></div>
                  <div><dt className="text-ink-400">Warranty</dt><dd className="font-medium">{l.warranty}</dd></div>
                </dl>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link href={`/laptop/tools/compare?add=${l.id}`} className="btn-secondary">Compare</Link>
                  <Link href={laptopHref(l) + "/test-results"} className="btn-secondary">Test results</Link>
                  <button className="btn-secondary" type="button">♡ Save</button>
                </div>
              </div>
            </div>
            <div className="border-t border-slate-100 bg-slate-50 p-4">
              <p className="mb-2 text-xs font-bold uppercase text-ink-400">Where to buy (CAD)</p>
              <RetailerButtons laptop={l} />
            </div>
          </div>

          <div className="mt-4"><AffiliateDisclosure /></div>
          <div className="mt-4"><AuthorBox updated={l.testedDate} testBench={l.testBench} /></div>

          {rankings.length > 0 && (
            <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm">
                <span className="font-semibold text-ink-900">Featured in our rankings:</span>{" "}
                {rankings.slice(0, 6).map((cat, i) => (
                  <span key={cat.slug}>
                    {i > 0 && ", "}
                    <Link href={`/laptop/reviews/best/${cat.slug}`} className="link">{cat.title}</Link>
                  </span>
                ))}
                .
              </p>
            </div>
          )}

          <div className="mt-8 space-y-8">
            <SectionCard id="verdict" title={`Is the ${l.brand} ${m} worth buying?`}>
              <p>{l.verdict}</p>
            </SectionCard>

            <section id="proscons"><ProsCons pros={l.pros} cons={l.cons} /></section>

            {/* Score breakdown */}
            <section id="scores" className="scroll-mt-20">
              <h2 className="mb-3 text-2xl font-bold">Score Breakdown</h2>
              <p className="mb-4 text-sm text-ink-500">Each sub-score is weighted to produce the overall score. <Link href="/laptop/learn/how-we-test" className="link">How scoring works</Link>.</p>
              <div className="card grid gap-x-8 gap-y-1 p-5 sm:grid-cols-2">
                {(Object.keys(WEIGHT_LABELS) as (keyof CategoryScores)[]).map((k) => (
                  <ScoreBar key={k} label={WEIGHT_LABELS[k]} score={l.scores[k]} weight={DEFAULT_WEIGHTS[k]} />
                ))}
              </div>
            </section>

            {/* Use-case scores */}
            <section id="use-cases" className="scroll-mt-20">
              <h2 className="mb-3 text-2xl font-bold">What is the {m} best for?</h2>
              <p className="mb-4 text-sm text-ink-500">
                Use-case scores for the {m}: highest for {USE_CASE_LABELS[bestUseCase].toLowerCase()} ({l.useCases[bestUseCase].toFixed(1)}), lowest for {USE_CASE_LABELS[worstUseCase].toLowerCase()} ({l.useCases[worstUseCase].toFixed(1)}). Each weights our test categories differently (<Link href="/laptop/learn/how-we-test" className="link">methodology</Link>).
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {(Object.keys(USE_CASE_LABELS) as (keyof UseCaseScores)[]).map((k) => (
                  <div key={k} className="card flex items-center justify-between p-4">
                    <span className="font-semibold">{USE_CASE_LABELS[k]}</span>
                    <ScoreBadge score={l.useCases[k]} />
                  </div>
                ))}
              </div>
            </section>

            {/* One question-phrased H2 per sub-intent. Headings carry the model name so
                sibling reviews never share identical headings, and each first sentence
                states the measured answer so it can be quoted on its own. */}
            <SectionCard id="design" title={`How heavy is the ${m}?`}>
              <p>The {l.brand} {m} weighs {l.weightKg} kg ({rank.weight} laptops tested for lightness) and measures {l.dimensions} mm. It uses a {l.material.toLowerCase()} chassis and earned a build score of {l.scores.build.toFixed(1)} and a portability score of {l.scores.portability.toFixed(1)}.</p>
              <p>{l.whoShouldBuy}</p>
            </SectionCard>

            <SectionCard id="display" title={`How good is the ${m} display?`}>
              <p>The {m}&apos;s {l.screenSize}-inch {l.panelType} panel measured {l.test.brightnessNits} nits ({rank.brightness} for brightness), {l.test.colorGamutSRGB}% sRGB, {l.test.colorGamutDCIP3}% DCI-P3 and a colour accuracy of Delta E {l.test.colorAccuracyDeltaE}. It runs at {l.resolution} ({l.aspectRatio}) and {l.refreshRate}Hz.</p>
              <p>{l.touchscreen ? `The ${m} has a touchscreen${l.convertible ? " and a 360° hinge for tablet use" : ""}.` : `The ${m} does not have a touchscreen.`} <Link href={laptopHref(l) + "/test-results"} className="link">See full display measurements →</Link></p>
            </SectionCard>

            <SectionCard id="keyboard" title={`How is the ${m} keyboard for typing?`}>
              <p>The {m} keyboard scored {l.scores.keyboard.toFixed(1)}/10 in our typing tests. The webcam, speakers and microphone feed a multimedia score of {l.useCases.multimedia.toFixed(1)}, which matters most for video calls and media.</p>
            </SectionCard>

            <SectionCard id="ports" title={`What ports does the ${m} have?`}>
              <p>The {m} has {l.ports.join(", ")}. Wireless is {l.wifi} with Bluetooth {l.bluetooth}. Connectivity earned a score of {l.scores.ports.toFixed(1)}.</p>
            </SectionCard>

            <SectionCard id="performance" title={`How fast is the ${m}?`}>
              <p>The {m} posted a Geekbench multi-core score of {l.test.geekbenchMulti.toLocaleString()} ({rank.multicore} laptops tested) with the {l.cpu}, a Cinebench multi-core score of {l.test.cinebenchMulti.toLocaleString()}, and finished our 4K video export in {l.test.videoExportMinutes} minutes. Its performance score is {l.scores.performance.toFixed(1)}.</p>
              <p>SSD read/write speeds measured {l.test.ssdReadMBps.toLocaleString()} / {l.test.ssdWriteMBps.toLocaleString()} MB/s.</p>
            </SectionCard>

            <SectionCard id="gaming" title={`Can the ${m} run games?`}>
              <p>The {m} averaged {l.test.gamingFps1080pHigh} FPS across our 1080p high gaming suite with the {l.gpu} ({l.gpuType.toLowerCase()} graphics), ranking {rank.fps} laptops tested for gaming. Its 3DMark score was {l.test.mark3d.toLocaleString()} and its gaming use-case score is {l.useCases.gaming.toFixed(1)}.</p>
              {l.useCases.gaming < 6 && <p>If gaming matters, see our <Link href="/laptop/reviews/best/gaming" className="link">best gaming laptops</Link> instead.</p>}
            </SectionCard>

            <SectionCard id="battery" title={`How long does the ${m} battery last?`}>
              <p>The {m} lasted {l.test.batteryWebHours} hours of web browsing and {l.test.batteryVideoHours} hours of video playback in our fixed-brightness tests, ranking {rank.battery} laptops tested for battery life. It charged to 80% in about {l.test.chargeTo80Minutes} minutes and earned a battery score of {l.scores.battery.toFixed(1)}.</p>
            </SectionCard>

            <SectionCard id="thermals" title={`Does the ${m} get hot or loud?`}>
              <p>Under sustained load the {m} measured {l.test.loadNoiseDb} dB of fan noise ({rank.noise} for quietness; {l.test.idleNoiseDb} dB at idle), a CPU temperature of {l.test.cpuTempLoadC}°C and a keyboard surface temperature of {l.test.keyboardTempLoadC}°C. Thermals and noise scored {l.scores.thermals.toFixed(1)}.</p>
            </SectionCard>

            <SectionCard id="software" title={`Can you upgrade the ${m}?`}>
              <p>The {m}&apos;s RAM ({l.ram}GB {l.ramType}) is {l.ramUpgradeable ? "user-upgradeable" : "soldered and not upgradeable, so size up at purchase"}, and its storage ({l.storage}GB {l.storageType}) is {l.storageUpgradeable ? "user-replaceable" : "not user-replaceable"}. It runs {l.os}.</p>
            </SectionCard>

            <SectionCard id="pricing" title={`How much does the ${m} cost in Canada?`}>
              <p>The {m} currently sells for around {formatCAD(lowestPrice(l))} CAD in Canada, against an MSRP of {formatCAD(l.msrp)}{l.msrp > lowestPrice(l) ? ` (${Math.round(((l.msrp - lowestPrice(l)) / l.msrp) * 100)}% off)` : ""}. {l.scores.value < 7 ? "It makes the most sense when discounted." : `At ${formatCAD(lowestPrice(l))} it earns a value score of ${l.scores.value.toFixed(1)}.`}</p>
              <RetailerButtons laptop={l} />
            </SectionCard>

            {/* Compared to */}
            <section id="compared" className="scroll-mt-20">
              <h2 className="mb-3 text-2xl font-bold">How does the {m} compare to similar laptops?</h2>
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-left text-xs uppercase text-ink-400">
                    <tr><th className="p-3">Laptop</th><th className="p-3">Overall</th><th className="p-3">Battery (web)</th><th className="p-3">Weight</th><th className="p-3">Price</th><th className="p-3">Head-to-head</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="bg-brand-50/50">
                      <td className="p-3 font-semibold">{l.brand} {l.model}</td>
                      <td className="p-3"><ScoreBadge score={l.overall} /></td>
                      <td className="p-3">{l.test.batteryWebHours} h</td>
                      <td className="p-3">{l.weightKg} kg</td>
                      <td className="p-3">{formatCAD(lowestPrice(l))}</td>
                      <td className="p-3 text-ink-400">—</td>
                    </tr>
                    {related.map((r) => {
                      const vs = comparisons.find((c) => (c.a === l.id && c.b === r.id) || (c.a === r.id && c.b === l.id));
                      return (
                        <tr key={r.id}>
                          <td className="p-3"><Link href={laptopHref(r)} className="link">{r.brand} {r.model}</Link></td>
                          <td className="p-3"><ScoreBadge score={r.overall} /></td>
                          <td className="p-3">{r.test.batteryWebHours} h</td>
                          <td className="p-3">{r.weightKg} kg</td>
                          <td className="p-3">{formatCAD(lowestPrice(r))}</td>
                          <td className="p-3">{vs ? <Link href={`/laptop/compare/${vs.slug}`} className="link">{m} vs {r.model}</Link> : "—"}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>

            <SectionCard id="final" title={`Should you buy the ${m}?`}>
              <p>{l.verdict}</p>
              <p><span className="font-semibold">Buy it if:</span> {l.whoShouldBuy} <span className="font-semibold">Skip it if:</span> {l.whoShouldSkip}</p>
            </SectionCard>

            <section id="faq" className="scroll-mt-20"><FAQ items={faq} /></section>

            {relatedComparisons.length > 0 && (
              <SectionCard id="related-comparisons" title={`${l.brand} ${m} vs the competition`}>
                <ul className="space-y-1">
                  {relatedComparisons.map((c) => {
                    const [a, b] = comparisonLaptops(c);
                    return <li key={c.slug}><Link href={`/laptop/compare/${c.slug}`} className="link">{a.brand} {a.model} vs {b.brand} {b.model}</Link></li>;
                  })}
                </ul>
                <p className="mt-2 text-sm"><Link href={`/laptop/compare#${l.id}`} className="link">All {comparisons.filter((c) => c.a === l.id || c.b === l.id).length} {m} comparisons →</Link></p>
              </SectionCard>
            )}

            {related.length > 0 && (
              <SectionCard id="related-reviews" title="Related Reviews">
                <div className="grid gap-4 sm:grid-cols-3">
                  {related.map((r) => (
                    <Link key={r.id} href={laptopHref(r)} className="card overflow-hidden transition hover:shadow-md">
                      <ProductImage laptop={r} rounded="rounded-none" className="aspect-[16/9] w-full" />
                      <div className="p-3"><p className="text-sm font-semibold">{r.brand} {r.model}</p><ScoreBadge score={r.overall} /></div>
                    </Link>
                  ))}
                </div>
              </SectionCard>
            )}

            {/* Comments */}
            <section id="comments" className="scroll-mt-20">
              <h2 className="mb-3 text-2xl font-bold">Discussion</h2>
              <form className="card p-4">
                <label htmlFor="comment" className="sr-only">Add a comment</label>
                <textarea id="comment" rows={3} placeholder="Ask a question or share your experience with this laptop…" className="w-full rounded-lg border border-slate-300 p-3 text-sm" />
                <button type="submit" className="btn-primary mt-2">Post comment</button>
              </form>
            </section>
          </div>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-20 space-y-4">
            <TableOfContents items={toc} />
            <div className="card p-4">
              <p className="text-sm font-bold">Quick verdict</p>
              <div className="mt-2 flex items-center gap-3"><ScoreCircle score={l.overall} size={48} /><p className="text-xs text-ink-500">{l.bestFor}</p></div>
            </div>
          </div>
        </aside>
      </div>
      <Newsletter />
    </>
  );
}
