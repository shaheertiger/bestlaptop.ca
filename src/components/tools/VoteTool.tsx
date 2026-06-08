"use client";

import { useMemo, useState } from "react";
import { pipeline } from "@/data/pipeline";
import type { PipelineItem } from "@/lib/types";

export function VoteTool() {
  const initial = useMemo(
    () => pipeline.filter((p) => p.status !== "published").sort((a, b) => b.votes - a.votes),
    [],
  );
  const [items, setItems] = useState<PipelineItem[]>(initial);
  const [voted, setVoted] = useState<Set<string>>(new Set());
  const [request, setRequest] = useState("");
  const [filter, setFilter] = useState("");

  const vote = (key: string) => {
    if (voted.has(key)) return;
    setItems((cur) => cur.map((p) => (`${p.brand}-${p.model}` === key ? { ...p, votes: p.votes + 1 } : p)).sort((a, b) => b.votes - a.votes));
    setVoted(new Set(voted).add(key));
  };

  const addRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!request.trim()) return;
    const item: PipelineItem = { brand: "Requested", model: request.trim(), status: "scheduled", expected: "TBD", votes: 1 };
    setItems((cur) => [...cur, item].sort((a, b) => b.votes - a.votes));
    setVoted(new Set(voted).add(`${item.brand}-${item.model}`));
    setRequest("");
  };

  const shown = items.filter((p) => `${p.brand} ${p.model}`.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <div>
        <input type="search" value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Search the request list…" className="mb-4 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        <ol className="space-y-2">
          {shown.map((p, i) => {
            const key = `${p.brand}-${p.model}`;
            return (
              <li key={key} className="card flex items-center gap-4 p-4">
                <span className="w-6 text-center font-bold text-ink-400">{i + 1}</span>
                <div className="flex-1">
                  <p className="font-semibold">{p.brand !== "Requested" ? `${p.brand} ${p.model}` : p.model}</p>
                  <p className="text-xs capitalize text-ink-400">{p.status.replace("-", " ")} · {p.expected}</p>
                </div>
                <span className="text-sm font-bold tabular-nums">{p.votes}</span>
                <button onClick={() => vote(key)} disabled={voted.has(key)} className={`btn ${voted.has(key) ? "bg-slate-200 text-ink-400" : "btn-primary"}`}>
                  {voted.has(key) ? "Voted" : "▲ Vote"}
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <aside className="space-y-4">
        <form onSubmit={addRequest} className="card p-5">
          <h2 className="font-bold">Request a laptop</h2>
          <p className="mt-1 text-sm text-ink-500">Don't see it? Add it to the list.</p>
          <label htmlFor="request" className="sr-only">Laptop to request</label>
          <input id="request" value={request} onChange={(e) => setRequest(e.target.value)} placeholder="e.g. ASUS Zenbook 14 OLED" className="mt-3 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          <button type="submit" className="btn-primary mt-3 w-full">Add request</button>
        </form>
        <div className="card p-5 text-sm text-ink-600">
          <h2 className="font-bold text-ink-900">How voting works</h2>
          <p className="mt-2">Votes help us prioritize what to buy and test next. One vote per laptop per visitor.</p>
          <p className="mt-2">Members get a voting boost that counts double.</p>
        </div>
      </aside>
    </div>
  );
}
