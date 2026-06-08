"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { laptops, getLaptopById, laptopHref } from "@/data/laptops";
import { formatCAD, lowestPrice, scoreColor } from "@/lib/scoring";
import { ProductImage } from "@/components/ProductImage";
import { ScoreCircle } from "@/components/Score";
import type { Laptop } from "@/lib/types";

const ROWS: { label: string; get: (l: Laptop) => number | string; num?: (l: Laptop) => number; higher?: boolean; fmt?: (l: Laptop) => string }[] = [
  { label: "Overall score", get: (l) => l.overall.toFixed(1), num: (l) => l.overall },
  { label: "Price (CAD)", get: (l) => formatCAD(lowestPrice(l)), num: (l) => lowestPrice(l), higher: false },
  { label: "CPU", get: (l) => l.cpu },
  { label: "GPU", get: (l) => l.gpu },
  { label: "RAM", get: (l) => `${l.ram}GB`, num: (l) => l.ram },
  { label: "Storage", get: (l) => `${l.storage}GB`, num: (l) => l.storage },
  { label: "Display", get: (l) => `${l.screenSize}" ${l.panelType} ${l.refreshRate}Hz` },
  { label: "Brightness", get: (l) => `${l.test.brightnessNits} nits`, num: (l) => l.test.brightnessNits },
  { label: "Battery (web)", get: (l) => `${l.test.batteryWebHours} h`, num: (l) => l.test.batteryWebHours },
  { label: "Weight", get: (l) => `${l.weightKg} kg`, num: (l) => l.weightKg, higher: false },
  { label: "Geekbench multi", get: (l) => l.test.geekbenchMulti.toLocaleString(), num: (l) => l.test.geekbenchMulti },
  { label: "Gaming (1080p)", get: (l) => `${l.test.gamingFps1080pHigh} fps`, num: (l) => l.test.gamingFps1080pHigh },
  { label: "Load noise", get: (l) => `${l.test.loadNoiseDb} dB`, num: (l) => l.test.loadNoiseDb, higher: false },
  { label: "OS", get: (l) => l.os },
  { label: "Warranty", get: (l) => l.warranty },
];

const USE_CASES: { key: keyof Laptop["useCases"]; label: string }[] = [
  { key: "school", label: "School" }, { key: "business", label: "Business" }, { key: "gaming", label: "Gaming" },
  { key: "multimedia", label: "Multimedia" }, { key: "programming", label: "Programming" }, { key: "travel", label: "Travel" },
];

export function CompareTool({ initialIds }: { initialIds: string[] }) {
  const seed = initialIds.map((id) => getLaptopById(id)).filter(Boolean) as Laptop[];
  const [selected, setSelected] = useState<Laptop[]>(seed.length ? seed.slice(0, 4) : [laptops[0], laptops[1]]);
  const [picker, setPicker] = useState("");

  const add = (id: string) => {
    const l = getLaptopById(id);
    if (l && selected.length < 4 && !selected.find((x) => x.id === id)) setSelected([...selected, l]);
    setPicker("");
  };
  const remove = (id: string) => setSelected(selected.filter((l) => l.id !== id));

  const shareUrl = useMemo(() => `/laptop/tools/compare?${selected.map((l) => `add=${l.id}`).join("&")}`, [selected]);

  const winnerId = (r: typeof ROWS[number]): string | null => {
    if (!r.num) return null;
    const vals = selected.map((l) => ({ id: l.id, v: r.num!(l) }));
    const best = (r.higher === false ? Math.min : Math.max)(...vals.map((x) => x.v));
    const winners = vals.filter((x) => x.v === best);
    return winners.length === 1 ? winners[0].id : null;
  };

  const differences = ROWS.filter((r) => r.num).filter((r) => {
    const vals = selected.map((l) => r.num!(l));
    return new Set(vals).size > 1;
  }).slice(0, 6);

  const recommended = [...selected].sort((a, b) => b.overall - a.overall)[0];

  return (
    <div>
      {/* Add / remove */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <label htmlFor="add-laptop" className="text-sm font-semibold">Add a laptop:</label>
        <select id="add-laptop" value={picker} onChange={(e) => add(e.target.value)} disabled={selected.length >= 4} className="rounded-lg border border-slate-300 px-3 py-2 text-sm disabled:opacity-50">
          <option value="">{selected.length >= 4 ? "Maximum 4 laptops" : "Select a laptop…"}</option>
          {laptops.filter((l) => !selected.find((s) => s.id === l.id)).map((l) => (
            <option key={l.id} value={l.id}>{l.brand} {l.model}</option>
          ))}
        </select>
        <a href={shareUrl} className="ml-auto text-sm link">Shareable link</a>
      </div>

      {selected.length < 2 ? (
        <p className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-ink-500">Add at least two laptops to compare.</p>
      ) : (
        <>
          {/* Sticky headers */}
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="sticky top-0 z-10 bg-white">
                <tr className="border-b border-slate-200">
                  <th className="p-3 text-left text-xs uppercase text-ink-400">Spec</th>
                  {selected.map((l) => (
                    <th key={l.id} className="p-3 text-center align-top">
                      <ProductImage laptop={l} className="mx-auto mb-2 aspect-[16/10] w-32" />
                      <Link href={laptopHref(l)} className="block font-bold hover:text-brand-700">{l.brand} {l.model}</Link>
                      <button onClick={() => remove(l.id)} className="mt-1 text-xs text-red-600 hover:underline">Remove</button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => {
                  const wid = winnerId(r);
                  return (
                    <tr key={r.label} className="border-b border-slate-100">
                      <td className="p-3 font-medium text-ink-500">{r.label}</td>
                      {selected.map((l) => (
                        <td key={l.id} className={`p-3 text-center ${wid === l.id ? "bg-accent-500/10 font-bold text-accent-600" : ""}`}>
                          {r.get(l)}{wid === l.id && " ✓"}
                        </td>
                      ))}
                    </tr>
                  );
                })}
                {/* Use-case scores */}
                {USE_CASES.map((uc) => {
                  const best = Math.max(...selected.map((l) => l.useCases[uc.key]));
                  const winners = selected.filter((l) => l.useCases[uc.key] === best);
                  return (
                    <tr key={uc.key} className="border-b border-slate-100">
                      <td className="p-3 font-medium text-ink-500">{uc.label} score</td>
                      {selected.map((l) => {
                        const isW = winners.length === 1 && winners[0].id === l.id;
                        return <td key={l.id} className={`p-3 text-center ${isW ? "bg-accent-500/10 font-bold text-accent-600" : ""}`} style={{ color: isW ? undefined : scoreColor(l.useCases[uc.key]) }}>{l.useCases[uc.key].toFixed(1)}{isW && " ✓"}</td>;
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Main differences */}
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="card p-5">
              <h2 className="mb-3 text-lg font-bold">Main Differences</h2>
              <ul className="space-y-2 text-sm text-ink-700">
                {differences.map((r) => (
                  <li key={r.label}><span className="font-semibold">{r.label}:</span> {selected.map((l) => `${l.model} ${r.get(l)}`).join(" · ")}</li>
                ))}
              </ul>
            </div>
            <div className="card p-5">
              <h2 className="mb-3 text-lg font-bold">Which Should You Buy?</h2>
              <div className="flex items-center gap-3">
                <ScoreCircle score={recommended.overall} size={52} />
                <div>
                  <p className="font-semibold">{recommended.brand} {recommended.model}</p>
                  <p className="text-sm text-ink-500">Highest overall score in this comparison.</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-ink-700">{recommended.verdict}</p>
              <Link href={laptopHref(recommended)} className="btn-primary mt-3">Read the review</Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
