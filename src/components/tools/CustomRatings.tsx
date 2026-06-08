"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { laptops, laptopHref } from "@/data/laptops";
import { DEFAULT_WEIGHTS, WEIGHT_LABELS, WEIGHT_PRESETS, weightedOverall } from "@/lib/scoring";
import { ScoreBadge } from "@/components/Score";
import type { CategoryScores } from "@/lib/types";

const KEYS = Object.keys(WEIGHT_LABELS) as (keyof CategoryScores)[];

export function CustomRatings() {
  const [weights, setWeights] = useState<Record<keyof CategoryScores, number>>({ ...DEFAULT_WEIGHTS });
  const total = KEYS.reduce((s, k) => s + weights[k], 0);

  const ranked = useMemo(() => {
    return [...laptops]
      .map((l) => ({ l, score: weightedOverall(l.scores, weights) }))
      .sort((a, b) => b.score - a.score);
  }, [weights]);

  const applyPreset = (name: string) => setWeights({ ...WEIGHT_PRESETS[name] });

  return (
    <div className="grid gap-8 lg:grid-cols-[340px_1fr]">
      <aside>
        <div className="card p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-bold">Your weighting</h2>
            <span className={`text-sm font-semibold ${Math.round(total * 100) === 100 ? "text-accent-600" : "text-orange-600"}`}>{Math.round(total * 100)}%</span>
          </div>
          <div className="mb-4 flex flex-wrap gap-1.5">
            {Object.keys(WEIGHT_PRESETS).map((p) => (
              <button key={p} onClick={() => applyPreset(p)} className="rounded-full border border-slate-300 px-2.5 py-1 text-xs font-medium hover:bg-slate-50">{p}</button>
            ))}
          </div>
          <div className="space-y-3">
            {KEYS.map((k) => (
              <div key={k}>
                <label htmlFor={`w-${k}`} className="flex items-center justify-between text-sm">
                  <span>{WEIGHT_LABELS[k]}</span>
                  <span className="font-semibold tabular-nums">{Math.round(weights[k] * 100)}%</span>
                </label>
                <input id={`w-${k}`} type="range" min={0} max={0.4} step={0.01} value={weights[k]} onChange={(e) => setWeights({ ...weights, [k]: +e.target.value })} className="w-full accent-brand-600" />
              </div>
            ))}
          </div>
          <button onClick={() => setWeights({ ...DEFAULT_WEIGHTS })} className="btn-secondary mt-4 w-full">Reset to default</button>
          <p className="mt-3 text-xs text-ink-400">Weights are normalized when ranking, so they don't need to sum to exactly 100%.</p>
        </div>
      </aside>

      <div>
        <h2 className="mb-3 text-xl font-bold">Ranked for your priorities</h2>
        <div className="space-y-3">
          {ranked.map(({ l, score }, i) => (
            <div key={l.id} className="card flex items-center gap-4 p-4">
              <span className="w-6 text-center text-lg font-bold text-ink-400">{i + 1}</span>
              <div className="flex-1">
                <Link href={laptopHref(l)} className="font-semibold hover:text-brand-700">{l.brand} {l.model}</Link>
                <p className="text-xs text-ink-400">Default score {l.overall.toFixed(1)} · {l.bestFor}</p>
              </div>
              <div className="text-right">
                <ScoreBadge score={Math.round(score * 10) / 10} />
                <p className="mt-1 text-xs text-ink-400">your score</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 rounded-lg bg-brand-50 p-3 text-sm text-brand-700">Save custom rating profiles and apply them in the results table with <Link href="/membership" className="underline">Membership</Link>.</p>
      </div>
    </div>
  );
}
