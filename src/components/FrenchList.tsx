import Link from "next/link";
import type { Laptop } from "@/lib/types";
import { laptopHref } from "@/data/laptops";
import { lowestPrice } from "@/lib/scoring";
import { formatCADfr, frNum } from "@/data/fr";
import { Linkify } from "./blocks";

// Shared French (fr-CA) building blocks. Text is French; product and chip
// names stay as the manufacturer writes them.

export const dec = (n: number) => n.toLocaleString("fr-CA", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

export function FrenchPicksTable({ picks }: { picks: Laptop[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-left text-xs uppercase text-ink-400">
          <tr>
            <th className="p-3">Rang</th><th className="p-3">Portable</th><th className="p-3">Note</th><th className="p-3">Processeur</th>
            <th className="p-3">Mémoire</th><th className="p-3">Écran</th><th className="p-3">Poids</th><th className="p-3">Autonomie</th><th className="p-3">Prix</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {picks.map((l, i) => (
            <tr key={l.id}>
              <td className="p-3 font-semibold text-brand-700">{i + 1}</td>
              <td className="p-3"><Link href={laptopHref(l)} className="link font-medium" hrefLang="en-CA">{l.brand} {l.model}</Link></td>
              <td className="p-3 font-semibold">{dec(l.overall)}/10</td>
              <td className="p-3">{l.cpu}</td>
              <td className="p-3">{l.ram} Go</td>
              <td className="p-3">{frNum(l.screenSize)} po, {l.refreshRate} Hz</td>
              <td className="p-3">{dec(l.weightKg)} kg</td>
              <td className="p-3">{dec(l.test.batteryWebHours)} h</td>
              <td className="p-3 font-medium">{formatCADfr(lowestPrice(l))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function FrenchPickCards({ picks }: { picks: Laptop[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {picks.map((l, i) => (
        <article key={l.id} className="card p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-brand-700">N° {i + 1}</p>
          <h3 className="mt-1 text-lg font-bold">{l.brand} {l.model}</h3>
          <ul className="mt-2 space-y-1 text-sm text-ink-700">
            <li>Note globale : <strong>{dec(l.overall)}/10</strong></li>
            <li>{l.cpu} · {l.gpu} · {l.ram} Go · SSD {l.storage >= 1000 ? `${frNum(l.storage / 1000)} To` : `${l.storage} Go`}</li>
            <li>Écran {frNum(l.screenSize)} po {l.panelType}, {l.refreshRate} Hz · {dec(l.weightKg)} kg</li>
            <li>Autonomie (web) : {dec(l.test.batteryWebHours)} h · Export 4K : {dec(l.test.videoExportMinutes)} min{l.gpuType === "Discrete" ? ` · ${l.test.gamingFps1080pHigh} FPS en 1080p` : ""}</li>
          </ul>
          <p className="mt-3 text-sm"><strong>À partir de {formatCADfr(lowestPrice(l))}</strong> · <Link href={laptopHref(l)} className="link" hrefLang="en-CA">Test complet (en anglais)</Link></p>
        </article>
      ))}
    </div>
  );
}

export function FrenchSections({ sections }: { sections: { heading: string; body: string[] }[] }) {
  return (
    <>
      {sections.map((s) => (
        <section key={s.heading} className="mt-8">
          <h2 className="mb-3 text-2xl font-bold">{s.heading}</h2>
          <div className="prose-site">{s.body.map((p, i) => <p key={i}><Linkify text={p} /></p>)}</div>
        </section>
      ))}
    </>
  );
}

export function FrenchFAQ({ items }: { items: { q: string; a: string }[] }) {
  if (items.length === 0) return null;
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "fr-CA",
    mainEntity: items.map((it) => ({ "@type": "Question", name: it.q, acceptedAnswer: { "@type": "Answer", text: it.a } })),
  };
  return (
    <section className="mt-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <h2 className="mb-4 text-2xl font-bold">Questions fréquentes</h2>
      <div className="divide-y divide-slate-200 rounded-xl border border-slate-200">
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
