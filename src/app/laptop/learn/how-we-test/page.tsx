import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SecondaryNav } from "@/components/SecondaryNav";
import { ScoreBar } from "@/components/Score";
import { SectionCard, TableOfContents } from "@/components/blocks";
import { DEFAULT_WEIGHTS, WEIGHT_LABELS } from "@/lib/scoring";
import { testMethods, testBenches } from "@/data/tests";
import type { CategoryScores } from "@/lib/types";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "How We Test Laptops",
  description: "Our laptop testing methodology: how we buy products, what we measure, how scoring works, and why our independence matters.",
  alternates: { canonical: "/laptop/learn/how-we-test" },
};

export default function HowWeTestPage() {
  const toc = [
    { id: "why", label: "Why we test laptops" },
    { id: "buy", label: "How we buy products" },
    { id: "independence", label: "Why independence matters" },
    { id: "measure", label: "What we measure" },
    { id: "scores", label: "How scores work" },
    { id: "updates", label: "How we update reviews" },
    { id: "benches", label: "Test bench versions" },
    { id: "read", label: "How to read our results" },
    { id: "limitations", label: "Limitations" },
    { id: "contact", label: "Contact us about testing" },
  ];

  return (
    <>
      <SecondaryNav />
      <Breadcrumbs items={[{ label: "Laptops", href: "/laptop" }, { label: "How We Test" }]} />
      <div className="container-site grid gap-8 pb-12 lg:grid-cols-[1fr_280px]">
        <div className="min-w-0">
          <h1 className="text-3xl font-extrabold sm:text-4xl">How We Test Laptops</h1>
          <p className="mt-2 text-sm text-ink-400">Current methodology: Test Bench {SITE.testBench}</p>
          <p className="mt-4 text-lg text-ink-700">We buy laptops, run every one through the same standardized tests, and publish the raw numbers alongside our scores. This page explains how the process works.</p>

          <div className="mt-8 space-y-8">
            <SectionCard id="why" title="1. Why We Test Laptops">
              <p>Manufacturer specs and marketing rarely tell you how a laptop performs in real use. Standardized testing lets us compare laptops fairly on the things that matter: real battery life, sustained performance, display quality, typing comfort, and noise.</p>
            </SectionCard>

            <SectionCard id="buy" title="2. How We Buy Products">
              <p>We buy the laptops we review at retail whenever possible, the same units a Canadian shopper would receive. When we accept a loaner, we disclose it in the review and return it after testing.</p>
            </SectionCard>

            <SectionCard id="independence" title="3. Why Independence Matters">
              <p>No manufacturer pays for a score or sees a review before it is published. Our editorial and affiliate decisions are kept separate. Affiliate commissions never influence a score. <Link href="/editorial-policy" className="link">Read our full editorial and independence policy</Link>.</p>
            </SectionCard>

            <SectionCard id="measure" title="4. What We Measure">
              <p>Every laptop is tested across these categories. Each links to its detailed methodology:</p>
              <ul className="mt-2 grid gap-1 sm:grid-cols-2">
                {testMethods.map((m) => (
                  <li key={m.slug}><Link href={`/laptop/tests/${m.slug}`} className="link">{m.title.replace("How We Test ", "").replace("How We Score ", "")}</Link></li>
                ))}
              </ul>
            </SectionCard>

            <section id="scores" className="scroll-mt-20">
              <h2 className="mb-3 text-2xl font-bold">5. How Scores Work</h2>
              <p className="prose-site">We score on a 10-point scale. Each category gets a sub-score, and the overall score is a weighted average using the default weighting below. Use-case scores (school, gaming, and so on) reweight these categories for specific needs.</p>
              <div className="card mt-4 grid gap-x-8 gap-y-1 p-5 sm:grid-cols-2">
                {(Object.keys(WEIGHT_LABELS) as (keyof CategoryScores)[]).map((k) => (
                  <ScoreBar key={k} label={WEIGHT_LABELS[k]} score={DEFAULT_WEIGHTS[k] * 100 / 4} weight={DEFAULT_WEIGHTS[k]} />
                ))}
              </div>
              <p className="mt-2 text-sm text-ink-400">Bars above show relative weighting. You can <Link href="/laptop/tools/custom-ratings" className="link">set your own weighting</Link> with the Custom Ratings tool.</p>
            </section>

            <SectionCard id="updates" title="6. How We Update Reviews">
              <p>We re-test and update reviews when firmware, drivers, configurations, or Canadian pricing change materially. Each review shows its tested date and Test Bench version.</p>
            </SectionCard>

            <section id="benches" className="scroll-mt-20">
              <h2 className="mb-3 text-2xl font-bold">7. Test Bench Versions</h2>
              <div className="space-y-3">
                {testBenches.map((b) => (
                  <div key={b.version} className="card p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold">Laptop Test Bench {b.version}</h3>
                      <span className="text-xs text-ink-400">{b.date}</span>
                    </div>
                    <p className="mt-1 text-sm text-ink-600">{b.summary}</p>
                  </div>
                ))}
              </div>
              <p className="mt-2"><Link href="/laptop/tests/changelogs" className="link">See full changelogs →</Link></p>
            </section>

            <SectionCard id="read" title="8. How To Read Our Results">
              <p>On each review, the score breakdown shows category sub-scores; the test-results page shows raw measurements with bars comparing a laptop to the full tested range. Higher is better for most metrics, but lower is better for weight, noise, temperature, and price.</p>
            </SectionCard>

            <SectionCard id="limitations" title="9. Limitations">
              <p>We test representative configurations, not every variant. Unit-to-unit variation, driver updates, and regional pricing can shift results. We note known limitations in each review.</p>
            </SectionCard>

            <SectionCard id="contact" title="10. Contact Us About Testing">
              <p>Questions about our methodology or a specific result? <Link href="/contact" className="link">Get in touch</Link>. We welcome corrections backed by data.</p>
            </SectionCard>
          </div>
        </div>

        <aside className="hidden lg:block"><div className="sticky top-20"><TableOfContents items={toc} /></div></aside>
      </div>
    </>
  );
}
