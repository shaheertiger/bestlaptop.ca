import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SecondaryNav } from "@/components/SecondaryNav";
import { pipeline } from "@/data/pipeline";
import type { ReviewStatus } from "@/lib/types";

export const metadata: Metadata = {
  title: "Laptop Review Pipeline — What We're Testing Next",
  description: "See which laptops we have purchased, are testing, and will review next, with expected dates and vote counts.",
  alternates: { canonical: "/laptop/review-pipeline" },
};

const STAGES: { status: ReviewStatus; label: string; color: string }[] = [
  { status: "purchased", label: "Purchased", color: "bg-slate-100 text-slate-700" },
  { status: "in-transit", label: "In transit", color: "bg-amber-100 text-amber-700" },
  { status: "testing", label: "In testing", color: "bg-blue-100 text-blue-700" },
  { status: "writing", label: "Writing in progress", color: "bg-purple-100 text-purple-700" },
  { status: "scheduled", label: "Scheduled", color: "bg-indigo-100 text-indigo-700" },
  { status: "published", label: "Published", color: "bg-green-100 text-green-700" },
];

export default function PipelinePage() {
  return (
    <>
      <SecondaryNav />
      <Breadcrumbs items={[{ label: "Laptops", href: "/laptop" }, { label: "Review Pipeline" }]} />
      <div className="container-site pb-12">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold">Review Pipeline</h1>
          <p className="mt-2 max-w-2xl text-ink-500">
            Full transparency on what we are working on. Want to influence the order?{" "}
            <Link href="/laptop/vote" className="link">Vote for the next review</Link>.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {STAGES.map((stage) => {
            const items = pipeline.filter((p) => p.status === stage.status).sort((a, b) => b.votes - a.votes);
            return (
              <section key={stage.status} className="card p-5">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="font-bold">{stage.label}</h2>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${stage.color}`}>{items.length}</span>
                </div>
                <ul className="space-y-3">
                  {items.map((p) => (
                    <li key={`${p.brand}-${p.model}`} className="border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                      <p className="font-medium">{p.brand} {p.model}</p>
                      <div className="mt-1 flex items-center justify-between text-xs text-ink-400">
                        <span>{p.status === "published" ? "Published" : "Expected"} {p.expected}</span>
                        <span>▲ {p.votes} votes</span>
                      </div>
                    </li>
                  ))}
                  {items.length === 0 && <li className="text-sm text-ink-400">Nothing here right now.</li>}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
}
