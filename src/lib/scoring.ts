import type { CategoryScores, Laptop } from "./types";

// The default overall-score weighting used by BestLaptop.ca's Test Bench.
// All weights are out of 1.0 and documented on /laptop/learn/how-we-test.
export const DEFAULT_WEIGHTS: Record<keyof CategoryScores, number> = {
  performance: 0.2,
  display: 0.15,
  battery: 0.15,
  keyboard: 0.1,
  build: 0.1,
  portability: 0.1,
  thermals: 0.1,
  ports: 0.05,
  value: 0.05,
};

export const WEIGHT_LABELS: Record<keyof CategoryScores, string> = {
  performance: "Performance",
  display: "Display",
  battery: "Battery life",
  keyboard: "Keyboard & touchpad",
  build: "Build quality",
  portability: "Portability",
  thermals: "Thermals & noise",
  ports: "Ports & connectivity",
  value: "Canadian value",
};

/** Compute a weighted overall score (0-10) from category sub-scores. */
export function weightedOverall(
  scores: CategoryScores,
  weights: Record<keyof CategoryScores, number> = DEFAULT_WEIGHTS,
): number {
  const total = (Object.keys(weights) as (keyof CategoryScores)[]).reduce(
    (sum, k) => sum + scores[k] * weights[k],
    0,
  );
  const weightSum = Object.values(weights).reduce((a, b) => a + b, 0);
  return Math.round((total / weightSum) * 10) / 10;
}

/** Preset weight profiles for the Custom Ratings tool. */
export const WEIGHT_PRESETS: Record<string, Record<keyof CategoryScores, number>> = {
  Balanced: DEFAULT_WEIGHTS,
  Student: {
    performance: 0.12,
    display: 0.14,
    battery: 0.22,
    keyboard: 0.12,
    build: 0.1,
    portability: 0.16,
    thermals: 0.06,
    ports: 0.04,
    value: 0.04,
  },
  Business: {
    performance: 0.16,
    display: 0.14,
    battery: 0.2,
    keyboard: 0.16,
    build: 0.12,
    portability: 0.12,
    thermals: 0.04,
    ports: 0.04,
    value: 0.02,
  },
  Gaming: {
    performance: 0.34,
    display: 0.16,
    battery: 0.04,
    keyboard: 0.08,
    build: 0.08,
    portability: 0.04,
    thermals: 0.18,
    ports: 0.06,
    value: 0.02,
  },
  Creative: {
    performance: 0.26,
    display: 0.24,
    battery: 0.1,
    keyboard: 0.06,
    build: 0.08,
    portability: 0.08,
    thermals: 0.1,
    ports: 0.06,
    value: 0.02,
  },
  Programming: {
    performance: 0.26,
    display: 0.14,
    battery: 0.16,
    keyboard: 0.16,
    build: 0.08,
    portability: 0.1,
    thermals: 0.06,
    ports: 0.02,
    value: 0.02,
  },
  Travel: {
    performance: 0.1,
    display: 0.12,
    battery: 0.26,
    keyboard: 0.1,
    build: 0.1,
    portability: 0.24,
    thermals: 0.04,
    ports: 0.02,
    value: 0.02,
  },
  Budget: {
    performance: 0.16,
    display: 0.12,
    battery: 0.16,
    keyboard: 0.1,
    build: 0.08,
    portability: 0.1,
    thermals: 0.06,
    ports: 0.04,
    value: 0.18,
  },
};

export function scoreColor(score: number): string {
  if (score >= 8.5) return "#0e9f6e";
  if (score >= 7.5) return "#2f9e44";
  if (score >= 6.5) return "#d9a800";
  if (score >= 5.5) return "#e8730c";
  return "#d6332e";
}

export function scoreLabel(score: number): string {
  if (score >= 9) return "Exceptional";
  if (score >= 8) return "Great";
  if (score >= 7) return "Good";
  if (score >= 6) return "Decent";
  if (score >= 5) return "Mediocre";
  return "Poor";
}

export function formatCAD(amount: number): string {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function lowestPrice(l: Laptop): number {
  const stocked = l.retailers.filter((r) => r.inStock).map((r) => r.price);
  return stocked.length ? Math.min(...stocked) : l.currentPrice;
}
