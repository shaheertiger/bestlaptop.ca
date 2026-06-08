import Link from "next/link";
import { bestCategories } from "@/data/categories";
import { toolsNav } from "@/lib/site";

// Secondary category navigation shown on laptop landing, best, and review pages.
export function SecondaryNav({ active }: { active?: string }) {
  const best = bestCategories.filter((c) => c.group !== "brand" && c.group !== "size").slice(0, 14);
  return (
    <div className="border-b border-slate-200 bg-white">
      <div className="container-site flex gap-6 overflow-x-auto py-2.5 text-sm">
        <div className="flex shrink-0 items-center gap-1">
          <span className="mr-1 text-xs font-bold uppercase tracking-wide text-ink-400">Best</span>
          {best.map((c) => (
            <Link
              key={c.slug}
              href={`/laptop/reviews/best/${c.slug}`}
              className={`whitespace-nowrap rounded-md px-2.5 py-1 ${active === c.slug ? "bg-brand-600 text-white" : "text-ink-700 hover:bg-slate-100"}`}
            >
              {c.navLabel.replace("Best ", "")}
            </Link>
          ))}
        </div>
        <div className="flex shrink-0 items-center gap-1 border-l border-slate-200 pl-4">
          <span className="mr-1 text-xs font-bold uppercase tracking-wide text-ink-400">Tools</span>
          {toolsNav.map((t) => (
            <Link key={t.href} href={t.href} className="whitespace-nowrap rounded-md px-2.5 py-1 text-ink-700 hover:bg-slate-100">
              {t.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
