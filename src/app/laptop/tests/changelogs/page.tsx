import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SecondaryNav } from "@/components/SecondaryNav";
import { testBenches } from "@/data/tests";

export const metadata: Metadata = {
  title: "Test Bench Changelogs — Methodology Updates",
  description: "Every version of our laptop Test Bench, with new tests, scoring changes, updated weights, and the impact on scores.",
  alternates: { canonical: "/laptop/tests/changelogs" },
};

export default function ChangelogsPage() {
  return (
    <>
      <SecondaryNav />
      <Breadcrumbs items={[{ label: "Laptops", href: "/laptop" }, { label: "How We Test", href: "/laptop/learn/how-we-test" }, { label: "Changelogs" }]} />
      <div className="container-site max-w-3xl pb-12">
        <h1 className="text-3xl font-extrabold">Test Bench Changelogs</h1>
        <p className="mt-2 text-ink-500">How our testing methodology has evolved. Each review shows which Test Bench version it used.</p>

        <div className="mt-8 space-y-6">
          {testBenches.map((b) => (
            <article key={b.version} className="card p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Laptop Test Bench {b.version}</h2>
                <span className="text-sm text-ink-400">{b.date}</span>
              </div>
              <p className="mt-2 text-ink-700">{b.summary}</p>
              <h3 className="mt-4 text-sm font-bold uppercase text-ink-400">Changes</h3>
              <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-ink-700">{b.changes.map((c) => <li key={c}>{c}</li>)}</ul>
              <p className="mt-3 text-sm"><span className="font-semibold">Impact on scores:</span> {b.impact}</p>
            </article>
          ))}
        </div>
        <p className="mt-8"><Link href="/laptop/learn/how-we-test" className="link">← Back to testing overview</Link></p>
      </div>
    </>
  );
}
