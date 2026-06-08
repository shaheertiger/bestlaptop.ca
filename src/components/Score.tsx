import { scoreColor, scoreLabel } from "@/lib/scoring";

export function ScoreCircle({ score, size = 56, label }: { score: number; size?: number; label?: string }) {
  const color = scoreColor(score);
  const stroke = 5;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(1, score / 10));
  return (
    <div className="inline-flex flex-col items-center" role="img" aria-label={`Score ${score.toFixed(1)} out of 10${label ? `, ${label}` : ""}`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e2e8f0" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct)}
        />
      </svg>
      <span className="-mt-[calc(50%+2px)] mb-[calc(50%-12px)] text-sm font-bold tabular-nums" style={{ color }}>
        {score.toFixed(1)}
      </span>
    </div>
  );
}

export function ScoreBadge({ score }: { score: number }) {
  const color = scoreColor(score);
  return (
    <span
      className="inline-flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-sm font-bold text-white tabular-nums"
      style={{ backgroundColor: color }}
      aria-label={`Score ${score.toFixed(1)} out of 10`}
    >
      {score.toFixed(1)}
    </span>
  );
}

export function ScoreBar({ label, score, weight }: { label: string; score: number; weight?: number }) {
  const color = scoreColor(score);
  return (
    <div className="py-1.5">
      <div className="mb-1 flex items-baseline justify-between text-sm">
        <span className="font-medium text-ink-700">
          {label}
          {weight !== undefined && <span className="ml-1 text-xs text-ink-400">({Math.round(weight * 100)}%)</span>}
        </span>
        <span className="font-semibold tabular-nums" style={{ color }}>
          {score.toFixed(1)} <span className="text-xs font-normal text-ink-400">{scoreLabel(score)}</span>
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full" style={{ width: `${score * 10}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}
