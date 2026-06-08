"use client";

import { useState } from "react";
import { laptops } from "@/data/laptops";
import { scoreColor } from "@/lib/scoring";
import type { Laptop } from "@/lib/types";

const METRICS: { key: string; label: string; get: (l: Laptop) => number; unit: string }[] = [
  { key: "battery", label: "Battery life (web)", get: (l) => l.test.batteryWebHours, unit: "h" },
  { key: "brightness", label: "Display brightness", get: (l) => l.test.brightnessNits, unit: "nits" },
  { key: "cpu", label: "CPU (Geekbench multi)", get: (l) => l.test.geekbenchMulti, unit: "" },
  { key: "gpu", label: "GPU (3DMark)", get: (l) => l.test.mark3d, unit: "" },
  { key: "gaming", label: "Gaming (1080p avg FPS)", get: (l) => l.test.gamingFps1080pHigh, unit: "fps" },
  { key: "noise", label: "Fan noise (load)", get: (l) => l.test.loadNoiseDb, unit: "dB" },
  { key: "temp", label: "CPU temp (load)", get: (l) => l.test.cpuTempLoadC, unit: "°C" },
  { key: "weight", label: "Weight", get: (l) => l.weightKg, unit: "kg" },
  { key: "price", label: "Price (CAD)", get: (l) => l.currentPrice, unit: "$" },
];

const PALETTE = ["#1b5ff1", "#0e9f6e", "#e8730c", "#d6332e", "#7c3aed"];

export function GraphTool() {
  const [ids, setIds] = useState<string[]>([laptops[0].id, laptops[1].id, laptops[2].id]);
  const [metric, setMetric] = useState(METRICS[0].key);

  const toggle = (id: string) => setIds((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : cur.length < 5 ? [...cur, id] : cur));
  const selected = ids.map((id) => laptops.find((l) => l.id === id)!).filter(Boolean);
  const m = METRICS.find((x) => x.key === metric)!;
  const max = Math.max(...selected.map((l) => m.get(l)), 1);

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
      <aside className="space-y-5">
        <div>
          <label htmlFor="metric" className="text-sm font-semibold">Metric</label>
          <select id="metric" value={metric} onChange={(e) => setMetric(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
            {METRICS.map((x) => <option key={x.key} value={x.key}>{x.label}</option>)}
          </select>
        </div>
        <fieldset>
          <legend className="text-sm font-semibold">Laptops (up to 5)</legend>
          <div className="mt-2 space-y-1 text-sm">
            {laptops.map((l) => (
              <label key={l.id} className="flex items-center gap-2">
                <input type="checkbox" checked={ids.includes(l.id)} onChange={() => toggle(l.id)} disabled={!ids.includes(l.id) && ids.length >= 5} className="accent-brand-600" />
                {l.brand} {l.model}
              </label>
            ))}
          </div>
        </fieldset>
      </aside>

      <div className="space-y-8">
        {/* Bar chart */}
        <div className="card p-5">
          <h2 className="mb-4 text-lg font-bold">{m.label}</h2>
          <div className="space-y-3">
            {selected.map((l, i) => {
              const v = m.get(l);
              return (
                <div key={l.id} className="grid grid-cols-[140px_1fr_70px] items-center gap-3 text-sm">
                  <span className="truncate">{l.brand} {l.model}</span>
                  <div className="h-5 rounded bg-slate-100"><div className="h-full rounded" style={{ width: `${(v / max) * 100}%`, backgroundColor: PALETTE[i % 5] }} /></div>
                  <span className="text-right font-semibold tabular-nums">{v.toLocaleString()} {m.unit}</span>
                </div>
              );
            })}
            {selected.length === 0 && <p className="text-ink-400">Select at least one laptop.</p>}
          </div>
        </div>

        {/* Scatter: price vs overall score */}
        <div className="card p-5">
          <h2 className="mb-4 text-lg font-bold">Price vs Overall Score</h2>
          <Scatter selected={selected} />
        </div>
      </div>
    </div>
  );
}

function Scatter({ selected }: { selected: Laptop[] }) {
  const W = 560, H = 280, pad = 40;
  const prices = laptops.map((l) => l.currentPrice);
  const minP = Math.min(...prices), maxP = Math.max(...prices);
  const x = (p: number) => pad + ((p - minP) / (maxP - minP || 1)) * (W - pad * 2);
  const y = (s: number) => H - pad - ((s - 5) / 5) * (H - pad * 2);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Scatter plot of price versus overall score">
      <line x1={pad} y1={H - pad} x2={W - pad} y2={H - pad} stroke="#cbd5e1" />
      <line x1={pad} y1={pad} x2={pad} y2={H - pad} stroke="#cbd5e1" />
      <text x={W / 2} y={H - 6} textAnchor="middle" className="fill-ink-400 text-[10px]">Price (CAD)</text>
      <text x={12} y={H / 2} textAnchor="middle" transform={`rotate(-90 12 ${H / 2})`} className="fill-ink-400 text-[10px]">Overall score</text>
      {laptops.map((l) => {
        const on = selected.find((s) => s.id === l.id);
        return (
          <g key={l.id}>
            <circle cx={x(l.currentPrice)} cy={y(l.overall)} r={on ? 7 : 4} fill={on ? scoreColor(l.overall) : "#cbd5e1"} opacity={on ? 1 : 0.5} />
            {on && <text x={x(l.currentPrice) + 9} y={y(l.overall) + 4} className="fill-ink-700 text-[10px]">{l.brand} {l.model}</text>}
          </g>
        );
      })}
    </svg>
  );
}
