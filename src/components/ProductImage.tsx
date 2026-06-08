import type { Laptop } from "@/lib/types";

// Lightweight, dependency-free product image placeholder. It renders a stylized
// laptop silhouette with the model name so the UI is complete without binary assets.
const palettes: Record<string, [string, string]> = {
  apple: ["#1d1d1f", "#3a3a3c"],
  lenovo: ["#1b1b1b", "#3a0d0d"],
  dell: ["#0b1f33", "#143a5c"],
  hp: ["#0b2e2a", "#0e4f47"],
  asus: ["#1a1530", "#332a5c"],
  acer: ["#0a2e1f", "#0f5236"],
  microsoft: ["#10243a", "#1f4b73"],
  default: ["#1f2937", "#374151"],
};

export function ProductImage({
  laptop,
  className = "",
  rounded = "rounded-lg",
}: {
  laptop: Pick<Laptop, "brand" | "model" | "brandSlug" | "imageAlt">;
  className?: string;
  rounded?: string;
}) {
  const [from, to] = palettes[laptop.brandSlug] ?? palettes.default;
  return (
    <div
      role="img"
      aria-label={laptop.imageAlt}
      className={`relative flex items-center justify-center overflow-hidden ${rounded} ${className}`}
      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
    >
      <svg viewBox="0 0 160 100" className="h-3/5 w-3/5 opacity-90" aria-hidden="true">
        <rect x="28" y="14" width="104" height="64" rx="4" fill="#0b0f17" stroke="#5b6472" strokeWidth="2" />
        <rect x="34" y="20" width="92" height="52" rx="2" fill="#111827" />
        <path d="M16 82 H144 L150 92 H10 Z" fill="#9aa3b2" />
        <rect x="64" y="84" width="32" height="4" rx="2" fill="#5b6472" />
      </svg>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-2">
        <p className="truncate text-center text-[11px] font-semibold text-white/90">
          {laptop.brand} {laptop.model}
        </p>
      </div>
    </div>
  );
}
