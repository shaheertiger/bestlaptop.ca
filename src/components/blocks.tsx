import Link from "next/link";
import type { Laptop } from "@/lib/types";
import { formatCAD } from "@/lib/scoring";
import { AFFILIATE_URL } from "@/lib/site";

export function AuthorBox({ updated, testBench }: { updated: string; testBench?: string }) {
  return (
    <div className="card flex items-center gap-4 p-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-lg font-bold text-brand-700" aria-hidden="true">
        BL
      </div>
      <div className="text-sm">
        <p className="font-semibold text-ink-900">BestLaptop.ca Test Team</p>
        <p className="text-ink-500">
          Reviewed and tested in-house · Updated {updated}
          {testBench && <> · Test Bench {testBench}</>}
        </p>
        <Link href="/laptop/learn/how-we-test" className="link text-xs">How we test →</Link>
      </div>
    </div>
  );
}

export function AffiliateDisclosure() {
  return (
    <p className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-ink-500">
      <strong className="text-ink-700">Affiliate disclosure:</strong> BestLaptop.ca may earn a commission when you buy
      through retailer links on this page. This never affects our scores or recommendations.{" "}
      <Link href="/affiliate-disclosure" className="link">Learn more</Link>.
    </p>
  );
}

export function ProsCons({ pros, cons }: { pros: string[]; cons: string[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="card p-5">
        <h3 className="mb-3 flex items-center gap-2 font-bold text-accent-600">
          <span aria-hidden="true">+</span> Pros
        </h3>
        <ul className="space-y-2 text-sm text-ink-700">
          {pros.map((p) => (
            <li key={p} className="flex gap-2"><span className="text-accent-500" aria-hidden="true">✓</span>{p}</li>
          ))}
        </ul>
      </div>
      <div className="card p-5">
        <h3 className="mb-3 flex items-center gap-2 font-bold text-red-600">
          <span aria-hidden="true">–</span> Cons
        </h3>
        <ul className="space-y-2 text-sm text-ink-700">
          {cons.map((c) => (
            <li key={c} className="flex gap-2"><span className="text-red-500" aria-hidden="true">✕</span>{c}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function RetailerButtons({ laptop }: { laptop: Laptop }) {
  return (
    <div className="space-y-2">
      {laptop.retailers.map((r) => (
        <a
          key={r.name}
          href={AFFILIATE_URL}
          target="_blank"
          rel="nofollow sponsored noopener"
          className={`flex items-center justify-between rounded-lg border px-4 py-3 text-sm transition ${r.inStock ? "border-slate-300 hover:border-brand-400 hover:bg-brand-50" : "border-slate-200 opacity-60"}`}
        >
          <span className="font-medium">{r.name}{r.condition && r.condition !== "New" ? ` · ${r.condition}` : ""}</span>
          <span className="flex items-center gap-2">
            <span className="font-bold text-ink-900">{formatCAD(r.price)}</span>
            <span className={`text-xs ${r.inStock ? "text-accent-600" : "text-ink-400"}`}>{r.inStock ? "In stock" : "Out of stock"}</span>
          </span>
        </a>
      ))}
    </div>
  );
}

export function FAQ({ items, heading = "Frequently Asked Questions" }: { items: { q: string; a: string }[]; heading?: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
  return (
    <section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h2 className="mb-4 text-2xl font-bold">{heading}</h2>
      <div className="divide-y divide-slate-200 rounded-xl border border-slate-200">
        {items.map((it) => (
          <details key={it.q} className="group p-4">
            <summary className="cursor-pointer list-none font-semibold text-ink-900 marker:hidden">
              <span className="flex items-center justify-between gap-3">
                {it.q}
                <span className="text-brand-600 transition group-open:rotate-45" aria-hidden="true">+</span>
              </span>
            </summary>
            <p className="mt-2 text-sm text-ink-600">{it.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function TableOfContents({ items }: { items: { id: string; label: string }[] }) {
  return (
    <nav aria-label="Table of contents" className="card p-4">
      <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-ink-400">On this page</h2>
      <ol className="space-y-1.5 text-sm">
        {items.map((it) => (
          <li key={it.id}>
            <a href={`#${it.id}`} className="text-ink-600 hover:text-brand-700">{it.label}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function SectionCard({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20">
      <h2 className="mb-3 text-2xl font-bold">{title}</h2>
      <div className="prose-site">{children}</div>
    </section>
  );
}
