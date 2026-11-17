import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SecondaryNav } from "@/components/SecondaryNav";
import { laptops as all, getLaptop, laptopHref } from "@/data/laptops";
import { rankBy, ordinalRank } from "@/lib/insights";
import { SITE } from "@/lib/site";
const laptops = all;

export function generateStaticParams() {
  return laptops.map((l) => ({ brand: l.brandSlug, model: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ brand: string; model: string }> }): Promise<Metadata> {
  const { brand, model } = await params;
  const l = getLaptop(brand, model);
  if (!l) return {};
  // Answer in the title: the measurements people search for ("{model} battery life", "{model} nits").
  const t = l.test;
  const title = `${l.brand} ${l.model} Test Results: ${t.batteryWebHours} h Battery, ${t.brightnessNits} Nits, ${t.gamingFps1080pHigh} FPS`;
  const description = `Measured on Test Bench ${l.testBench}: ${t.batteryWebHours} h web battery, ${t.batteryVideoHours} h video, ${t.brightnessNits} nits, ${t.colorGamutDCIP3}% DCI-P3, Geekbench ${t.geekbenchMulti.toLocaleString()} multi-core, ${t.loadNoiseDb} dB under load, 4K export in ${t.videoExportMinutes} min.`;
  return {
    title,
    description,
    alternates: { canonical: `${laptopHref(l)}/test-results` },
    openGraph: { type: "article", title, description, url: `${laptopHref(l)}/test-results` },
  };
}

// A horizontal bar that compares this laptop's measurement against the tested range.
function MeasureBar({ label, value, unit, min, max, higherIsBetter = true, rank }: { label: string; value: number; unit: string; min: number; max: number; higherIsBetter?: boolean; rank: string }) {
  const pct = max === min ? 50 : Math.max(2, Math.min(100, ((value - min) / (max - min)) * 100));
  return (
    <div className="grid grid-cols-[minmax(0,140px)_1fr_80px] items-center gap-3 py-1.5 text-sm sm:grid-cols-[180px_1fr_90px_70px]">
      <span className="text-ink-500">{label}</span>
      <div className="h-2.5 w-full rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-brand-500" style={{ width: `${higherIsBetter ? pct : 100 - pct}%` }} />
      </div>
      <span className="text-right font-semibold tabular-nums">{value.toLocaleString()} {unit}</span>
      <span className="hidden text-right text-xs text-ink-400 sm:block" title="Rank among all laptops we have tested">{rank}</span>
    </div>
  );
}

function range(sel: (t: typeof all[number]["test"]) => number) {
  const vals = all.map((l) => sel(l.test));
  return { min: Math.min(...vals), max: Math.max(...vals) };
}

export default async function TestResultsPage({ params }: { params: Promise<{ brand: string; model: string }> }) {
  const { brand, model } = await params;
  const l = getLaptop(brand, model);
  if (!l) notFound();
  const t = l.test;

  const groups: { title: string; method: string; rows: { label: string; value: number; unit: string; sel: (x: typeof t) => number; higher?: boolean }[] }[] = [
    {
      title: "Display", method: "display", rows: [
        { label: "Brightness", value: t.brightnessNits, unit: "nits", sel: (x) => x.brightnessNits },
        { label: "Contrast ratio", value: t.contrast, unit: ":1", sel: (x) => x.contrast },
        { label: "sRGB gamut", value: t.colorGamutSRGB, unit: "%", sel: (x) => x.colorGamutSRGB },
        { label: "DCI-P3 gamut", value: t.colorGamutDCIP3, unit: "%", sel: (x) => x.colorGamutDCIP3 },
        { label: "Colour accuracy", value: t.colorAccuracyDeltaE, unit: "ΔE", sel: (x) => x.colorAccuracyDeltaE, higher: false },
      ],
    },
    {
      title: "CPU & Performance", method: "performance", rows: [
        { label: "Geekbench single-core", value: t.geekbenchSingle, unit: "", sel: (x) => x.geekbenchSingle },
        { label: "Geekbench multi-core", value: t.geekbenchMulti, unit: "", sel: (x) => x.geekbenchMulti },
        { label: "Cinebench multi-core", value: t.cinebenchMulti, unit: "", sel: (x) => x.cinebenchMulti },
        { label: "4K export time", value: t.videoExportMinutes, unit: "min", sel: (x) => x.videoExportMinutes, higher: false },
      ],
    },
    {
      title: "GPU & Gaming", method: "gpu", rows: [
        { label: "3DMark score", value: t.mark3d, unit: "", sel: (x) => x.mark3d },
        { label: "Avg FPS (1080p high)", value: t.gamingFps1080pHigh, unit: "fps", sel: (x) => x.gamingFps1080pHigh },
      ],
    },
    {
      title: "Storage", method: "performance", rows: [
        { label: "SSD read", value: t.ssdReadMBps, unit: "MB/s", sel: (x) => x.ssdReadMBps },
        { label: "SSD write", value: t.ssdWriteMBps, unit: "MB/s", sel: (x) => x.ssdWriteMBps },
      ],
    },
    {
      title: "Battery", method: "battery", rows: [
        { label: "Web browsing", value: t.batteryWebHours, unit: "h", sel: (x) => x.batteryWebHours },
        { label: "Video playback", value: t.batteryVideoHours, unit: "h", sel: (x) => x.batteryVideoHours },
        { label: "Gaming", value: t.batteryGamingHours, unit: "h", sel: (x) => x.batteryGamingHours },
        { label: "Charge to 80%", value: t.chargeTo80Minutes, unit: "min", sel: (x) => x.chargeTo80Minutes, higher: false },
      ],
    },
    {
      title: "Thermals, Noise & Power", method: "thermals-noise", rows: [
        { label: "Idle noise", value: t.idleNoiseDb, unit: "dB", sel: (x) => x.idleNoiseDb, higher: false },
        { label: "Load noise", value: t.loadNoiseDb, unit: "dB", sel: (x) => x.loadNoiseDb, higher: false },
        { label: "CPU temp (load)", value: t.cpuTempLoadC, unit: "°C", sel: (x) => x.cpuTempLoadC, higher: false },
        { label: "Keyboard temp (load)", value: t.keyboardTempLoadC, unit: "°C", sel: (x) => x.keyboardTempLoadC, higher: false },
        { label: "Power draw (load)", value: t.powerDrawLoadW, unit: "W", sel: (x) => x.powerDrawLoadW, higher: false },
      ],
    },
  ];

  const url = `${SITE.url}${laptopHref(l)}/test-results`;
  const name = `${l.brand} ${l.model}`;
  const rankOf = (r: { sel: (x: typeof t) => number; higher?: boolean }) => rankBy(l, (x) => r.sel(x.test), r.higher !== false);
  const batteryRank = ordinalRank(rankOf({ sel: (x) => x.batteryWebHours }));
  const brightRank = ordinalRank(rankOf({ sel: (x) => x.brightnessNits }));

  // Dataset schema: the page's core is a table of measured values, a type no
  // competing review page carries. variableMeasured repeats the visible numbers.
  const datasetLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: `${name} laptop test results`,
    description: `Lab measurements of the ${name} (${l.cpu}, ${l.ram}GB RAM, ${l.storage}GB) from BestLaptop.ca Test Bench ${l.testBench}: display, CPU, GPU, storage, battery, thermals and noise.`,
    url,
    isAccessibleForFree: true,
    creator: { "@type": "Organization", name: SITE.name, url: SITE.url },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
    dateModified: l.testedDate,
    temporalCoverage: l.testedDate,
    spatialCoverage: { "@type": "Place", name: "Canada" },
    measurementTechnique: `${SITE.url}/laptop/learn/how-we-test`,
    about: { "@type": "Product", name, brand: { "@type": "Brand", name: l.brand }, category: "Laptop" },
    variableMeasured: groups.flatMap((g) =>
      g.rows.map((r) => ({ "@type": "PropertyValue", name: r.label, value: r.value, ...(r.unit ? { unitText: r.unit } : {}) })),
    ),
  };

  return (
    <>
      <SecondaryNav />
      <Breadcrumbs items={[{ label: "Laptops", href: "/laptop" }, { label: "Reviews", href: "/laptop/reviews" }, { label: l.brand, href: `/laptop/reviews/${l.brandSlug}` }, { label: l.model, href: laptopHref(l) }, { label: "Test Results" }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetLd) }} />
      <div className="container-site pb-12">
        <header className="mb-6">
          <h1 className="text-3xl font-extrabold">{name} Test Results</h1>
          <div id="quick-answer" className="mt-4 rounded-md border border-brand-200 bg-brand-50 p-4">
            <p className="text-xs font-bold text-brand-700">Quick answer</p>
            <p className="mt-1 text-ink-900">
              The {name} lasted {t.batteryWebHours} hours in our web-browsing battery test ({batteryRank} tested), measured {t.brightnessNits} nits of
              brightness ({brightRank}), scored {t.geekbenchMulti.toLocaleString()} in Geekbench multi-core and averaged {t.gamingFps1080pHigh} FPS at 1080p high.
              Under load it reached {t.loadNoiseDb} dB and {t.cpuTempLoadC}°C.
            </p>
            <p className="mt-2 text-xs text-ink-500">
              Source: BestLaptop.ca lab, Test Bench {l.testBench} · Last verified {l.testedDate} · Tested config: {l.cpu}, {l.gpu}, {l.ram}GB, {l.storage}GB ·{" "}
              <Link href="/laptop/learn/how-we-test" className="link">How we test</Link>
            </p>
          </div>
          <p className="mt-4 text-ink-500">Bars compare the {l.model} against the range of all {all.length} laptops we have tested; the right column is its rank. <Link href={laptopHref(l)} className="link">Read the full {l.model} review</Link>.</p>
        </header>

        <div className="space-y-8">
          {groups.map((g) => (
            <section key={g.title} className="card p-5">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-xl font-bold">{l.model} {g.title.toLowerCase().replace("cpu", "CPU").replace("gpu", "GPU")} results</h2>
                <Link href={`/laptop/tests/${g.method}`} className="text-sm link">Methodology</Link>
              </div>
              <div className="divide-y divide-slate-50">
                {g.rows.map((r) => {
                  const { min, max } = range(r.sel);
                  return <MeasureBar key={r.label} label={r.label} value={r.value} unit={r.unit} min={min} max={max} higherIsBetter={r.higher !== false} rank={ordinalRank(rankOf(r))} />;
                })}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-6 text-sm text-ink-400">All tests follow our published methodology. Results may be updated after firmware or driver changes. <Link href="/laptop/tests/changelogs" className="link">See Test Bench changelog</Link>.</p>
      </div>
    </>
  );
}
