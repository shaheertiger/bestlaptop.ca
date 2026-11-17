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
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#DCEBEC" strokeWidth={stroke} />
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
      <span className="-mt-[calc(50%+2px)] mb-[calc(50%-12px)] text-sm font-black tabular-nums text-brand-900" style={{ fontStretch: "120%" }}>
        {score.toFixed(1)}
      </span>
    </div>
  );
}

// The score plate: the site's one bold element. A squared tag in expanded
// Archivo with a colour rail on the left, like a rating label on a test bench.
export function ScoreBadge({ score, size = "md" }: { score: number; size?: "md" | "lg" }) {
  const color = scoreColor(score);
  const lg = size === "lg";
  return (
    <span
      className={`inline-flex items-stretch overflow-hidden rounded-[3px] bg-brand-900 font-black tabular-nums text-white ${lg ? "h-12 text-2xl" : "h-8 text-[0.9375rem]"}`}
      style={{ fontStretch: "125%" }}
      aria-label={`Score ${score.toFixed(1)} out of 10`}
    >
      <span aria-hidden="true" className={lg ? "w-1.5" : "w-1"} style={{ backgroundColor: color }} />
      <span className={`flex items-center ${lg ? "px-3" : "px-2"}`}>{score.toFixed(1)}</span>
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
      <div className="h-1.5 w-full overflow-hidden rounded-sm bg-brand-50">
        <div className="h-full rounded-sm" style={{ width: `${score * 10}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}
