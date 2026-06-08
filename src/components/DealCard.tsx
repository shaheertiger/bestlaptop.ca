import Link from "next/link";
import type { Deal } from "@/lib/types";
import { getLaptopById, laptopHref } from "@/data/laptops";
import { dealQualityScore } from "@/data/pipeline";
import { formatCAD } from "@/lib/scoring";
import { ProductImage } from "./ProductImage";
import { ScoreBadge } from "./Score";

export function DealCard({ deal }: { deal: Deal }) {
  const l = getLaptopById(deal.laptopId);
  if (!l) return null;
  const pct = Math.round(((deal.previousPrice - deal.currentPrice) / deal.previousPrice) * 100);
  return (
    <article className="card overflow-hidden">
      <div className="flex gap-4 p-4">
        <Link href={laptopHref(l)} className="shrink-0"><ProductImage laptop={l} className="h-24 w-32" /></Link>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold leading-snug"><Link href={laptopHref(l)} className="hover:text-brand-700">{l.brand} {l.model}</Link></h3>
            <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-bold text-red-700">-{pct}%</span>
          </div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-lg font-bold text-ink-900">{formatCAD(deal.currentPrice)}</span>
            <span className="text-sm text-ink-400 line-through">{formatCAD(deal.previousPrice)}</span>
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-ink-500">
            <span>{deal.retailer}</span>
            <span>{deal.condition}</span>
            <span>{deal.availability}</span>
            {deal.expires && <span>Ends {deal.expires}</span>}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-4 py-2.5 text-sm">
        <span className="flex items-center gap-2">Deal quality <ScoreBadge score={dealQualityScore(deal)} /></span>
        <a href="#" rel="nofollow sponsored" className="btn-primary px-4 py-2">View deal</a>
      </div>
    </article>
  );
}
