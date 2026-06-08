import Link from "next/link";
import type { Laptop } from "@/lib/types";
import { laptopHref } from "@/data/laptops";
import { formatCAD, lowestPrice } from "@/lib/scoring";
import { ProductImage } from "./ProductImage";
import { ScoreBadge } from "./Score";

export function LaptopCard({ laptop, tag }: { laptop: Laptop; tag?: string }) {
  return (
    <article className="card group flex flex-col overflow-hidden transition hover:shadow-md">
      <Link href={laptopHref(laptop)} className="block">
        <ProductImage laptop={laptop} rounded="rounded-none" className="aspect-[4/3] w-full" />
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="chip">{tag ?? laptop.series}</span>
          <ScoreBadge score={laptop.overall} />
        </div>
        <h3 className="text-base font-semibold leading-snug">
          <Link href={laptopHref(laptop)} className="hover:text-brand-700">
            {laptop.brand} {laptop.model}
          </Link>
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-ink-500">{laptop.bestFor}</p>
        <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-sm">
          <span className="font-semibold text-ink-900">{formatCAD(lowestPrice(laptop))}</span>
          <span className="text-ink-400">{laptop.testedDate.slice(0, 7)}</span>
        </div>
      </div>
    </article>
  );
}

export function ReviewRowCard({ laptop }: { laptop: Laptop }) {
  return (
    <article className="card flex gap-4 overflow-hidden p-4">
      <Link href={laptopHref(laptop)} className="shrink-0">
        <ProductImage laptop={laptop} className="h-24 w-32" />
      </Link>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-brand-700">Review</span>
            <h3 className="text-base font-semibold leading-snug">
              <Link href={laptopHref(laptop)} className="hover:text-brand-700">
                {laptop.brand} {laptop.model}
              </Link>
            </h3>
          </div>
          <ScoreBadge score={laptop.overall} />
        </div>
        <p className="mt-1 line-clamp-2 text-sm text-ink-500">{laptop.verdict}</p>
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-400">
          <span>Tested {laptop.testedDate}</span>
          <span>{formatCAD(lowestPrice(laptop))}</span>
          <span>Test Bench {laptop.testBench}</span>
        </div>
      </div>
    </article>
  );
}
