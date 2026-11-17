import Link from "next/link";
import type { Laptop } from "@/lib/types";
import { formatCAD } from "@/lib/scoring";
import { AmazonButton } from "./AmazonButton";

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
        <Link href="/laptop/learn/how-we-test" className="link text-xs">How we test</Link>
      </div>
    </div>
  );
}

export function AffiliateDisclosure() {
  return (
    <p className="rounded-lg border border-line bg-frost p-3 text-xs text-ink-500">
      <strong className="text-ink-700">Affiliate disclosure:</strong> BestLaptop.ca may earn a commission when you buy
      through retailer links on this page. As an Amazon Associate we earn from qualifying purchases. This never affects our scores or recommendations.{" "}
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

export function RetailerButtons({ laptop, button = true }: { laptop: Laptop; button?: boolean }) {
  // One product-specific Amazon button (tagged /dp/ link when we know the ASIN),
  // then the Canadian retailer prices we last recorded, for reference.
  return (
    <div className="space-y-3">
      {button && <AmazonButton laptop={laptop} size="lg" />}
      <div>
        <p className="mb-1.5 text-xs font-semibold text-ink-400">Prices we last recorded in Canada</p>
        <ul className="divide-y divide-slate-100 rounded-lg border border-line">
          {/* Amazon rows are left out: Amazon prices may only be shown live from its API, and the button above covers Amazon. */}
          {laptop.retailers.filter((r) => !r.name.startsWith("Amazon")).map((r) => (
            <li key={r.name} className={`flex items-center justify-between px-4 py-2.5 text-sm ${r.inStock ? "" : "opacity-60"}`}>
              <span className="font-medium">{r.name}{r.condition && r.condition !== "New" ? ` · ${r.condition}` : ""}</span>
              <span className="flex items-center gap-2">
                <span className="font-bold text-ink-900">{formatCAD(r.price)}</span>
                <span className={`text-xs ${r.inStock ? "text-accent-600" : "text-ink-400"}`}>{r.inStock ? "In stock" : "Out of stock"}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function FAQ({ items, heading = "Frequently Asked Questions" }: { items: { q: string; a: string }[]; heading?: string }) {
  if (items.length === 0) return null;
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
      {/* Answers are always visible (not collapsed) so they are easy to read, quote and extract. */}
      <div className="divide-y divide-slate-200 rounded-md border border-line">
        {items.map((it) => (
          <div key={it.q} className="p-4">
            <h3 className="font-semibold text-ink-900">{it.q}</h3>
            <p className="mt-1.5 text-sm text-ink-600">{it.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function TableOfContents({ items }: { items: { id: string; label: string }[] }) {
  return (
    <nav aria-label="Table of contents" className="card p-4">
      <h2 className="mb-2 text-sm font-bold text-ink-400">On this page</h2>
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

// Render inline markdown links [label](/url) inside editorial copy.
export function Linkify({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    parts.push(<Link key={m.index} href={m[2]} className="link">{m[1]}</Link>);
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}
