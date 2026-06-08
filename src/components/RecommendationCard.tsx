import Link from "next/link";
import type { Laptop } from "@/lib/types";
import { laptopHref } from "@/data/laptops";
import { formatCAD, lowestPrice } from "@/lib/scoring";
import { ProductImage } from "./ProductImage";
import { ScoreCircle } from "./Score";

export function RecommendationCard({ laptop, role, id }: { laptop: Laptop; role: string; id: string }) {
  const retailers = laptop.retailers.filter((r) => r.inStock).map((r) => r.name);
  return (
    <section id={id} className="card scroll-mt-20 overflow-hidden">
      <div className="border-b border-slate-100 bg-slate-50 px-5 py-3">
        <span className="text-xs font-bold uppercase tracking-wide text-brand-700">{role}</span>
      </div>
      <div className="grid gap-6 p-5 md:grid-cols-[200px_1fr]">
        <div>
          <ProductImage laptop={laptop} className="aspect-[4/3] w-full" />
          <div className="mt-3 flex items-center gap-3">
            <ScoreCircle score={laptop.overall} size={52} />
            <div className="text-xs text-ink-500">
              <p className="font-semibold text-ink-900">Overall score</p>
              <p>Test Bench {laptop.testBench}</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold">
            <Link href={laptopHref(laptop)} className="hover:text-brand-700">{laptop.brand} {laptop.model}</Link>
          </h3>
          <dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-ink-600 sm:grid-cols-3">
            <div><dt className="text-ink-400">Best for</dt><dd className="font-medium">{laptop.bestFor}</dd></div>
            <div><dt className="text-ink-400">Tested config</dt><dd className="font-medium">{laptop.cpu.split(" ").slice(0, 3).join(" ")}, {laptop.ram}GB</dd></div>
            <div><dt className="text-ink-400">Price (CAD)</dt><dd className="font-medium">{formatCAD(lowestPrice(laptop))}</dd></div>
          </dl>
          <p className="mt-3 text-sm text-ink-700">{laptop.verdict}</p>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase text-accent-600">What it does well</p>
              <ul className="mt-1 space-y-1 text-sm text-ink-600">
                {laptop.pros.slice(0, 3).map((p) => <li key={p}>+ {p}</li>)}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase text-red-600">What it does poorly</p>
              <ul className="mt-1 space-y-1 text-sm text-ink-600">
                {laptop.cons.slice(0, 3).map((c) => <li key={c}>– {c}</li>)}
              </ul>
            </div>
          </div>

          <div className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
            <p><span className="font-semibold">Who should buy it:</span> {laptop.whoShouldBuy}</p>
            <p><span className="font-semibold">Who should skip it:</span> {laptop.whoShouldSkip}</p>
          </div>

          <p className="mt-3 text-xs text-ink-400">Available at: {retailers.join(", ") || "Check retailers"}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            <Link href={laptopHref(laptop)} className="btn-primary">See review</Link>
            <Link href={`/laptop/tools/compare?add=${laptop.id}`} className="btn-secondary">Compare</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
