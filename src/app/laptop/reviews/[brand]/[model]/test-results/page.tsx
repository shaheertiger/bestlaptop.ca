import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SecondaryNav } from "@/components/SecondaryNav";
import { laptops as all, getLaptop, laptopHref } from "@/data/laptops";
const laptops = all;

export function generateStaticParams() {
  return laptops.map((l) => ({ brand: l.brandSlug, model: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ brand: string; model: string }> }): Promise<Metadata> {
  const { brand, model } = await params;
  const l = getLaptop(brand, model);
  if (!l) return {};
  return {
    title: `${l.brand} ${l.model} — Test Results & Measurements`,
    description: `Raw test data for the ${l.brand} ${l.model}: display, performance, battery, thermals, and noise measurements.`,
    alternates: { canonical: `${laptopHref(l)}/test-results` },
  };
}

// A horizontal bar that compares this laptop's measurement against the tested range.
function MeasureBar({ label, value, unit, min, max, higherIsBetter = true }: { label: string; value: number; unit: string; min: number; max: number; higherIsBetter?: boolean }) {
  const pct = max === min ? 50 : Math.max(2, Math.min(100, ((value - min) / (max - min)) * 100));
  return (
    <div className="grid grid-cols-[180px_1fr_90px] items-center gap-3 py-1.5 text-sm">
      <span className="text-ink-600">{label}</span>
      <div className="h-2.5 w-full rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-brand-500" style={{ width: `${higherIsBetter ? pct : 100 - pct}%` }} />
      </div>
      <span className="text-right font-semibold tabular-nums">{value.toLocaleString()} {unit}</span>
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

  return (
    <>
      <SecondaryNav />
      <Breadcrumbs items={[{ label: "Laptops", href: "/laptop" }, { label: "Reviews", href: "/laptop/reviews" }, { label: l.brand, href: `/laptop/reviews/${l.brandSlug}` }, { label: l.model, href: laptopHref(l) }, { label: "Test Results" }]} />
      <div className="container-site pb-12">
        <header className="mb-6">
          <h1 className="text-3xl font-extrabold">{l.brand} {l.model} — Test Results</h1>
          <p className="mt-2 text-ink-500">Raw measurements from our standardized testing (Test Bench {l.testBench}). Bars compare this laptop against the range of all tested laptops. <Link href={laptopHref(l)} className="link">Back to the review</Link>.</p>
        </header>

        <div className="space-y-8">
          {groups.map((g) => (
            <section key={g.title} className="card p-5">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-xl font-bold">{g.title}</h2>
                <Link href={`/laptop/tests/${g.method}`} className="text-sm link">Methodology →</Link>
              </div>
              <div className="divide-y divide-slate-50">
                {g.rows.map((r) => {
                  const { min, max } = range(r.sel);
                  return <MeasureBar key={r.label} label={r.label} value={r.value} unit={r.unit} min={min} max={max} higherIsBetter={r.higher !== false} />;
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
