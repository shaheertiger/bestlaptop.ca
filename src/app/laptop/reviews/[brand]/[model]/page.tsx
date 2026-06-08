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
import { SITE } from "@/lib/site";
import type { CategoryScores, UseCaseScores } from "@/lib/types";

export function generateStaticParams() {
  return laptops.map((l) => ({ brand: l.brandSlug, model: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ brand: string; model: string }> }): Promise<Metadata> {
  const { brand, model } = await params;
  const l = getLaptop(brand, model);
  if (!l) return {};
  return {
    title: l.seoTitle,
    description: l.metaDescription,
    alternates: { canonical: laptopHref(l) },
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
  const relatedComparisons = comparisons.filter((c) => c.a === l.id || c.b === l.id).slice(0, 6);

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
    author: { "@type": "Organization", name: `${SITE.name} Test Team`, url: SITE.url },
    publisher: { "@type": "Organization", name: SITE.name, logo: { "@type": "ImageObject", url: `${SITE.url}/icon.svg` } },
    datePublished: l.releaseDate,
    dateModified: l.testedDate,
  };

  const faq = [
    { q: `Is the ${l.brand} ${l.model} worth it?`, a: `${l.verdict}` },
    { q: `Who should buy the ${l.model}?`, a: l.whoShouldBuy },
    { q: `What is the battery life of the ${l.model}?`, a: `In our web browsing test at a fixed brightness, it lasted ${l.test.batteryWebHours} hours; video playback lasted ${l.test.batteryVideoHours} hours.` },
    { q: `How much does the ${l.model} cost in Canada?`, a: `It currently starts around ${formatCAD(lowestPrice(l))} in Canada, down from an MSRP of ${formatCAD(l.msrp)}.` },
  ];

  const toc = [
    { id: "verdict", label: "Quick verdict" },
    { id: "scores", label: "Scores & breakdown" },
    { id: "use-cases", label: "Use-case scores" },
    { id: "design", label: "Design & build" },
    { id: "display", label: "Display" },
    { id: "keyboard", label: "Keyboard & touchpad" },
    { id: "performance", label: "Performance" },
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
          {l.series} · {l.year} · Released {l.releaseDate} · Tested {l.testedDate} · Test Bench {l.testBench} · <span className="font-medium capitalize text-accent-600">{l.status}</span>
        </p>
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

          <div className="mt-8 space-y-8">
            <SectionCard id="verdict" title="Quick Verdict">
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
              <h2 className="mb-3 text-2xl font-bold">Use-Case Scores</h2>
              <p className="mb-4 text-sm text-ink-500">How this laptop performs for specific needs. Each score weights our test categories differently.</p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {(Object.keys(USE_CASE_LABELS) as (keyof UseCaseScores)[]).map((k) => (
                  <details key={k} className="card group p-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between">
                      <span className="font-semibold">{USE_CASE_LABELS[k]}</span>
                      <ScoreBadge score={l.useCases[k]} />
                    </summary>
                    <p className="mt-2 text-xs text-ink-500">
                      Measures how well the {l.model} suits {USE_CASE_LABELS[k].toLowerCase()} use, weighting the most relevant test categories.{" "}
                      <Link href="/laptop/learn/how-we-test" className="link">Methodology</Link>.
                    </p>
                  </details>
                ))}
              </div>
            </section>

            <SectionCard id="design" title="Design, Build & Portability">
              <p>The {l.model} uses a {l.material.toLowerCase()} chassis, weighs {l.weightKg} kg, and measures {l.dimensions}. It earned a build score of {l.scores.build.toFixed(1)} and a portability score of {l.scores.portability.toFixed(1)} in our testing.</p>
              <p>{l.whoShouldBuy}</p>
            </SectionCard>

            <SectionCard id="display" title="Display">
              <p>The {l.screenSize}-inch {l.panelType} panel runs at {l.resolution} ({l.aspectRatio}) and {l.refreshRate}Hz. We measured {l.test.brightnessNits} nits of brightness, {l.test.colorGamutSRGB}% sRGB and {l.test.colorGamutDCIP3}% DCI-P3 coverage, and a colour accuracy of Delta E {l.test.colorAccuracyDeltaE}.</p>
              <p>{l.touchscreen ? "It has a touchscreen." : "It does not have a touchscreen."} <Link href={laptopHref(l) + "/test-results"} className="link">See full display measurements →</Link></p>
            </SectionCard>

            <SectionCard id="keyboard" title="Keyboard, Touchpad, Webcam & Speakers">
              <p>The keyboard scored {l.scores.keyboard.toFixed(1)} in our typing tests. The webcam, speakers, and microphone feed the multimedia score of {l.useCases.multimedia.toFixed(1)}, which matters most for video calls and media.</p>
            </SectionCard>

            <SectionCard id="ports" title="Ports & Connectivity">
              <p>Ports: {l.ports.join(", ")}. Wireless: {l.wifi}, Bluetooth {l.bluetooth}. Connectivity earned a score of {l.scores.ports.toFixed(1)}.</p>
            </SectionCard>

            <SectionCard id="performance" title="Performance, Gaming & Creative Work">
              <p>With the {l.cpu} and {l.gpu}, the {l.model} scored {l.scores.performance.toFixed(1)} for performance. It posted a Geekbench multi-core score of {l.test.geekbenchMulti.toLocaleString()}, a Cinebench multi-core score of {l.test.cinebenchMulti.toLocaleString()}, and averaged {l.test.gamingFps1080pHigh} FPS across our 1080p gaming suite. Our 4K video export test finished in {l.test.videoExportMinutes} minutes.</p>
              <p>SSD read/write speeds measured {l.test.ssdReadMBps.toLocaleString()} / {l.test.ssdWriteMBps.toLocaleString()} MB/s.</p>
            </SectionCard>

            <SectionCard id="battery" title="Battery Life & Charging">
              <p>In our fixed-brightness tests, the {l.model} lasted {l.test.batteryWebHours} hours of web browsing and {l.test.batteryVideoHours} hours of video playback, earning a battery score of {l.scores.battery.toFixed(1)}. It charged to 80% in about {l.test.chargeTo80Minutes} minutes.</p>
            </SectionCard>

            <SectionCard id="thermals" title="Thermals & Noise">
              <p>Under sustained load we measured {l.test.loadNoiseDb} dB of fan noise ({l.test.idleNoiseDb} dB at idle), a CPU temperature of {l.test.cpuTempLoadC}°C, and a keyboard surface temperature of {l.test.keyboardTempLoadC}°C. Thermals and noise scored {l.scores.thermals.toFixed(1)}.</p>
            </SectionCard>

            <SectionCard id="software" title="Software, Configuration & Upgradeability">
              <p>It runs {l.os}. RAM ({l.ram}GB {l.ramType}) is {l.ramUpgradeable ? "user-upgradeable" : "soldered and not upgradeable, so size up at purchase"}. Storage ({l.storage}GB {l.storageType}) is {l.storageUpgradeable ? "user-replaceable" : "not user-replaceable"}.</p>
            </SectionCard>

            <SectionCard id="pricing" title="Canadian Pricing & Availability">
              <p>The {l.model} carries an MSRP of {formatCAD(l.msrp)} and currently sells for around {formatCAD(lowestPrice(l))} in Canada. {l.scores.value < 7 ? "It makes the most sense when discounted." : "It represents solid value at current pricing."}</p>
              <RetailerButtons laptop={l} />
            </SectionCard>

            {/* Compared to */}
            <section id="compared" className="scroll-mt-20">
              <h2 className="mb-3 text-2xl font-bold">Compared to Similar Laptops</h2>
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-left text-xs uppercase text-ink-400">
                    <tr><th className="p-3">Laptop</th><th className="p-3">Overall</th><th className="p-3">Battery (web)</th><th className="p-3">Weight</th><th className="p-3">Price</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="bg-brand-50/50">
                      <td className="p-3 font-semibold">{l.brand} {l.model}</td>
                      <td className="p-3"><ScoreBadge score={l.overall} /></td>
                      <td className="p-3">{l.test.batteryWebHours} h</td>
                      <td className="p-3">{l.weightKg} kg</td>
                      <td className="p-3">{formatCAD(lowestPrice(l))}</td>
                    </tr>
                    {related.map((r) => (
                      <tr key={r.id}>
                        <td className="p-3"><Link href={laptopHref(r)} className="link">{r.brand} {r.model}</Link></td>
                        <td className="p-3"><ScoreBadge score={r.overall} /></td>
                        <td className="p-3">{r.test.batteryWebHours} h</td>
                        <td className="p-3">{r.weightKg} kg</td>
                        <td className="p-3">{formatCAD(lowestPrice(r))}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <SectionCard id="final" title="Final Verdict">
              <p>{l.verdict}</p>
              <p><span className="font-semibold">Buy it if:</span> {l.whoShouldBuy} <span className="font-semibold">Skip it if:</span> {l.whoShouldSkip}</p>
            </SectionCard>

            <section id="faq" className="scroll-mt-20"><FAQ items={faq} /></section>

            {relatedComparisons.length > 0 && (
              <SectionCard id="related-comparisons" title="Related Comparisons">
                <ul className="space-y-1">
                  {relatedComparisons.map((c) => {
                    const [a, b] = comparisonLaptops(c);
                    return <li key={c.slug}><Link href={`/laptop/compare/${c.slug}`} className="link">{a.brand} {a.model} vs {b.brand} {b.model}</Link></li>;
                  })}
                </ul>
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
