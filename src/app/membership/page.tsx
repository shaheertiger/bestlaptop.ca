import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQ } from "@/components/blocks";

export const metadata: Metadata = {
  title: "Membership — Support Independent Laptop Testing",
  description: "BestLaptop.ca Membership unlocks custom ratings, saved comparisons, price and deal alerts, advanced filters, and early access to test results.",
  alternates: { canonical: "/membership" },
};

const FEATURES = [
  ["Custom laptop ratings", "Save your own score weightings and apply them across the table."],
  ["Saved comparisons", "Keep and revisit your side-by-side comparisons."],
  ["Saved shortlist", "Build a shortlist of laptops you're considering."],
  ["Price & deal alerts", "Get notified when a tracked laptop drops in price in Canada."],
  ["Advanced table filters", "Filter by every tested metric, including custom rating columns."],
  ["Export comparison data", "Download comparisons and tables as CSV."],
  ["Ad-light browsing", "A cleaner, faster reading experience."],
  ["Early access & voting priority", "See new test results first and get a voting boost."],
];

const PLANS = [
  { name: "Free", price: "$0", period: "", cta: "Current plan", features: ["All reviews & best lists", "Compare up to 4 laptops", "Results table & graph tools", "Newsletter"], highlight: false },
  { name: "Member", price: "$5", period: "/mo CAD", cta: "Become a member", features: ["Everything in Free", "Custom rating profiles", "Saved comparisons & shortlist", "Price & deal alerts", "CSV export", "Ad-light browsing"], highlight: true },
  { name: "Member Annual", price: "$45", period: "/yr CAD", cta: "Get annual", features: ["Everything in Member", "Two months free", "Early access to test results", "Voting priority"], highlight: false },
];

export default function MembershipPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Membership" }]} />
      <div className="container-site pb-12">
        <header className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-4xl">Support independent laptop testing</h1>
          <p className="mt-3 text-lg text-ink-500">Membership keeps our testing independent and unlocks tools to help you choose faster. Our reviews and scores always stay free.</p>
        </header>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {PLANS.map((p) => (
            <div key={p.name} className={`card flex flex-col p-6 ${p.highlight ? "ring-2 ring-brand-500" : ""}`}>
              {p.highlight && <span className="mb-2 inline-block w-fit rounded-full bg-brand-600 px-2.5 py-0.5 text-xs font-bold text-white">Most popular</span>}
              <h2 className="text-lg font-bold">{p.name}</h2>
              <p className="mt-1 text-3xl font-extrabold">{p.price}<span className="text-base font-normal text-ink-400">{p.period}</span></p>
              <ul className="mt-4 flex-1 space-y-2 text-sm text-ink-600">
                {p.features.map((f) => <li key={f} className="flex gap-2"><span className="text-accent-500">✓</span>{f}</li>)}
              </ul>
              <button className={`mt-6 ${p.highlight ? "btn-primary" : "btn-secondary"}`}>{p.cta}</button>
            </div>
          ))}
        </div>

        <section className="mt-14">
          <h2 className="mb-5 text-2xl font-bold">What's included</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map(([title, desc]) => (
              <div key={title} className="card p-5">
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-ink-500">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-14">
          <FAQ items={[
            { q: "Does membership affect your reviews?", a: "No. Our scores and recommendations are based on testing and never influenced by membership or affiliate revenue." },
            { q: "Can I cancel anytime?", a: "Yes. You can cancel your membership at any time and keep access until the end of your billing period." },
            { q: "Are reviews free without membership?", a: "Yes. Every review, best list, and core tool is free. Membership adds saving, alerts, and advanced features." },
          ]} />
        </div>

        <p className="mt-8 text-center text-sm text-ink-400">Learn more about <Link href="/how-we-make-money" className="link">how we make money</Link>.</p>
      </div>
    </>
  );
}
