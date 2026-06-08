"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { laptops, laptopHref } from "@/data/laptops";
import { formatCAD, lowestPrice } from "@/lib/scoring";
import { ScoreBadge } from "@/components/Score";
import type { Laptop } from "@/lib/types";

type SortKey = "overall" | "price" | "battery" | "weight" | "gaming" | "school" | "business" | "name";

const COLUMNS: { key: SortKey; label: string; get: (l: Laptop) => number | string; render: (l: Laptop) => React.ReactNode }[] = [
  { key: "overall", label: "Overall", get: (l) => l.overall, render: (l) => <ScoreBadge score={l.overall} /> },
  { key: "school", label: "School", get: (l) => l.useCases.school, render: (l) => l.useCases.school.toFixed(1) },
  { key: "business", label: "Business", get: (l) => l.useCases.business, render: (l) => l.useCases.business.toFixed(1) },
  { key: "gaming", label: "Gaming", get: (l) => l.useCases.gaming, render: (l) => l.useCases.gaming.toFixed(1) },
  { key: "battery", label: "Battery", get: (l) => l.test.batteryWebHours, render: (l) => `${l.test.batteryWebHours} h` },
  { key: "weight", label: "Weight", get: (l) => l.weightKg, render: (l) => `${l.weightKg} kg` },
  { key: "price", label: "Price", get: (l) => lowestPrice(l), render: (l) => formatCAD(lowestPrice(l)) },
];

const BRANDS = [...new Set(laptops.map((l) => l.brand))].sort();
const OSES = [...new Set(laptops.map((l) => l.os))].sort();

export function TableTool({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [brand, setBrand] = useState<string[]>([]);
  const [os, setOs] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(3500);
  const [minScore, setMinScore] = useState(0);
  const [touchOnly, setTouchOnly] = useState(false);
  const [convertibleOnly, setConvertibleOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>("overall");
  const [dir, setDir] = useState<"asc" | "desc">("desc");
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (arr: string[], v: string, set: (x: string[]) => void) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const rows = useMemo(() => {
    let r = laptops.filter((l) => {
      if (query && !`${l.brand} ${l.model} ${l.series}`.toLowerCase().includes(query.toLowerCase())) return false;
      if (brand.length && !brand.includes(l.brand)) return false;
      if (os.length && !os.includes(l.os)) return false;
      if (lowestPrice(l) > maxPrice) return false;
      if (l.overall < minScore) return false;
      if (touchOnly && !l.touchscreen) return false;
      if (convertibleOnly && !l.convertible) return false;
      return true;
    });
    const col = COLUMNS.find((c) => c.key === sort);
    const getter = sort === "name" ? (l: Laptop) => `${l.brand} ${l.model}` : col!.get;
    r = [...r].sort((a, b) => {
      const va = getter(a), vb = getter(b);
      const cmp = typeof va === "number" && typeof vb === "number" ? va - vb : String(va).localeCompare(String(vb));
      return dir === "asc" ? cmp : -cmp;
    });
    return r;
  }, [query, brand, os, maxPrice, minScore, touchOnly, convertibleOnly, sort, dir]);

  const setSortCol = (key: SortKey) => {
    if (sort === key) setDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSort(key); setDir(key === "price" || key === "weight" ? "asc" : "desc"); }
  };

  const reset = () => { setQuery(""); setBrand([]); setOs([]); setMaxPrice(3500); setMinScore(0); setTouchOnly(false); setConvertibleOnly(false); };

  const exportCsv = () => {
    const header = ["Brand", "Model", "Overall", "School", "Business", "Gaming", "BatteryHours", "WeightKg", "PriceCAD"];
    const lines = rows.map((l) => [l.brand, l.model, l.overall, l.useCases.school, l.useCases.business, l.useCases.gaming, l.test.batteryWebHours, l.weightKg, lowestPrice(l)].join(","));
    const blob = new Blob([[header.join(","), ...lines].join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "bestlaptop-table.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
      {/* Filter sidebar */}
      <aside className="space-y-5">
        <div>
          <label htmlFor="table-search" className="text-sm font-semibold">Search</label>
          <input id="table-search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Brand or model…" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </div>

        <fieldset>
          <legend className="text-sm font-semibold">Brand</legend>
          <div className="mt-2 grid grid-cols-2 gap-1 text-sm">
            {BRANDS.map((bn) => (
              <label key={bn} className="flex items-center gap-2"><input type="checkbox" checked={brand.includes(bn)} onChange={() => toggle(brand, bn, setBrand)} className="accent-brand-600" />{bn}</label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-semibold">Operating system</legend>
          <div className="mt-2 space-y-1 text-sm">
            {OSES.map((o) => (
              <label key={o} className="flex items-center gap-2"><input type="checkbox" checked={os.includes(o)} onChange={() => toggle(os, o, setOs)} className="accent-brand-600" />{o}</label>
            ))}
          </div>
        </fieldset>

        <div>
          <label htmlFor="max-price" className="text-sm font-semibold">Max price: {formatCAD(maxPrice)}</label>
          <input id="max-price" type="range" min={400} max={3500} step={50} value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)} className="mt-1 w-full accent-brand-600" />
        </div>

        <div>
          <label htmlFor="min-score" className="text-sm font-semibold">Min overall score: {minScore.toFixed(1)}</label>
          <input id="min-score" type="range" min={0} max={9} step={0.5} value={minScore} onChange={(e) => setMinScore(+e.target.value)} className="mt-1 w-full accent-brand-600" />
        </div>

        <div className="space-y-1 text-sm">
          <label className="flex items-center gap-2"><input type="checkbox" checked={touchOnly} onChange={(e) => setTouchOnly(e.target.checked)} className="accent-brand-600" />Touchscreen only</label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={convertibleOnly} onChange={(e) => setConvertibleOnly(e.target.checked)} className="accent-brand-600" />2-in-1 only</label>
        </div>

        <div className="flex gap-2">
          <button onClick={reset} className="btn-secondary flex-1">Reset</button>
          <button onClick={exportCsv} className="btn-secondary flex-1">Export CSV</button>
        </div>
        <p className="rounded-lg bg-brand-50 p-2 text-xs text-brand-700">Save filters and custom rating columns are available with <Link href="/membership" className="underline">Membership</Link>.</p>
      </aside>

      {/* Table */}
      <div className="min-w-0">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm text-ink-500">{rows.length} laptop{rows.length === 1 ? "" : "s"}</p>
          {selected.length >= 2 && (
            <Link href={`/laptop/tools/compare?${selected.map((id) => `add=${id}`).join("&")}`} className="btn-primary">Compare {selected.length} →</Link>
          )}
        </div>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-slate-50 text-left text-xs uppercase text-ink-400">
              <tr>
                <th className="p-3"></th>
                <th className="cursor-pointer p-3" onClick={() => setSortCol("name")}>Laptop</th>
                {COLUMNS.map((c) => (
                  <th key={c.key} className="cursor-pointer whitespace-nowrap p-3" onClick={() => setSortCol(c.key)}>
                    {c.label}{sort === c.key && (dir === "asc" ? " ▲" : " ▼")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((l) => (
                <tr key={l.id} className="hover:bg-slate-50">
                  <td className="p-3"><input type="checkbox" aria-label={`Select ${l.model} to compare`} checked={selected.includes(l.id)} onChange={() => toggle(selected, l.id, setSelected)} className="accent-brand-600" /></td>
                  <td className="p-3"><Link href={laptopHref(l)} className="font-medium hover:text-brand-700">{l.brand} {l.model}</Link><div className="text-xs text-ink-400">{l.cpu} · {l.ram}GB · {l.screenSize}"</div></td>
                  {COLUMNS.map((c) => <td key={c.key} className="whitespace-nowrap p-3">{c.render(l)}</td>)}
                </tr>
              ))}
              {rows.length === 0 && <tr><td colSpan={9} className="p-8 text-center text-ink-400">No laptops match your filters. <button onClick={reset} className="link">Reset</button>.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
