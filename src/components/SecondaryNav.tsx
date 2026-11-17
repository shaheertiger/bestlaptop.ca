import Link from "next/link";
import { bestCategories } from "@/data/categories";
import { toolsNav } from "@/lib/site";

// Secondary category navigation shown on laptop landing, best, and review pages.
export function SecondaryNav({ active }: { active?: string }) {
  const best = bestCategories.filter((c) => c.group !== "brand" && c.group !== "size").slice(0, 14);
  return (
    <div className="border-b border-line bg-frost">
      <div className="container-site flex gap-6 overflow-x-auto py-2.5 text-sm">
        <div className="flex shrink-0 items-center gap-1">
          <span className="mr-1 text-sm font-bold text-brand-900">Best for</span>
          {best.map((c) => (
            <Link
              key={c.slug}
              href={`/laptop/reviews/best/${c.slug}`}
              className={`whitespace-nowrap rounded-md px-2.5 py-1 ${active === c.slug ? "bg-brand-800 text-white" : "text-ink-700 hover:bg-white"}`}
            >
              {c.navLabel.replace(/^Best (for )?/, "")}
            </Link>
          ))}
        </div>
        <div className="flex shrink-0 items-center gap-1 border-l border-line pl-4">
          <span className="mr-1 text-sm font-bold text-brand-900">Tools</span>
          {toolsNav.map((t) => (
            <Link key={t.href} href={t.href} className="whitespace-nowrap rounded-md px-2.5 py-1 text-ink-700 hover:bg-white">
              {t.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
