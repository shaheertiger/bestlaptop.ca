import type { Laptop } from "./types";
import { bestCategories } from "@/data/categories";
import { formatCAD, lowestPrice } from "./scoring";
import { laptops as testedLaptops } from "@/data/laptops";

// Derive which "Best" rankings a laptop qualifies for, so reviews and
// comparisons can link to them in descriptive anchor text.
export function laptopRankings(l: Laptop) {
  return bestCategories
    .filter((c) => {
      try {
        return c.filter(l);
      } catch {
        return false;
      }
    })
    // Lead with specific (use-case/size/price) lists over the generic "laptop".
    .sort((a, b) => (a.slug === "laptop" ? 1 : 0) - (b.slug === "laptop" ? 1 : 0));
}

const name = (l: Laptop) => `${l.brand} ${l.model}`;
const gap = (a: number, b: number) => (Math.min(a, b) === 0 ? 0 : Math.round((Math.abs(a - b) / Math.min(a, b)) * 100));

// Build a multi-paragraph, data-driven analysis for any laptop pair, plus a
// short "key differences" list. Used to give every comparison page substantial,
// original, page-level content instead of a single templated sentence.
export function comparisonAnalysis(a: Laptop, b: Laptop): { paragraphs: string[]; differences: string[] } {
  const paragraphs: string[] = [];
  const differences: string[] = [];

  // Performance
  if (a.test.geekbenchMulti !== b.test.geekbenchMulti) {
    const fast = a.test.geekbenchMulti > b.test.geekbenchMulti ? a : b;
    const slow = fast.id === a.id ? b : a;
    const fps =
      a.test.gamingFps1080pHigh !== b.test.gamingFps1080pHigh
        ? ` In our 1080p gaming suite, the ${name(a.test.gamingFps1080pHigh > b.test.gamingFps1080pHigh ? a : b)} averaged ${Math.max(a.test.gamingFps1080pHigh, b.test.gamingFps1080pHigh)} FPS versus ${Math.min(a.test.gamingFps1080pHigh, b.test.gamingFps1080pHigh)} FPS.`
        : "";
    paragraphs.push(
      `Performance: the ${name(fast)} is the stronger performer, posting a multi-core Geekbench score of ${fast.test.geekbenchMulti.toLocaleString()} against ${slow.test.geekbenchMulti.toLocaleString()} for the ${name(slow)} — roughly ${gap(a.test.geekbenchMulti, b.test.geekbenchMulti)}% faster in CPU-heavy work like exports and compiling.${fps} The ${name(a.gpuType === "Discrete" && b.gpuType !== "Discrete" ? a : b.gpuType === "Discrete" && a.gpuType !== "Discrete" ? b : fast)} is the better pick if you game or edit video.`,
    );
    differences.push(`Faster overall: ${name(fast)} (Geekbench multi ${fast.test.geekbenchMulti.toLocaleString()} vs ${slow.test.geekbenchMulti.toLocaleString()}).`);
  }

  // Battery & portability
  if (a.test.batteryWebHours !== b.test.batteryWebHours || a.weightKg !== b.weightKg) {
    const longer = a.test.batteryWebHours >= b.test.batteryWebHours ? a : b;
    const lighter = a.weightKg <= b.weightKg ? a : b;
    paragraphs.push(
      `Battery and portability: the ${name(longer)} lasts longer away from a charger, running ${longer.test.batteryWebHours} hours in our web-browsing test versus ${(longer.id === a.id ? b : a).test.batteryWebHours} hours. The ${name(lighter)} is also easier to carry at ${lighter.weightKg} kg versus ${(lighter.id === a.id ? b : a).weightKg} kg, which matters if you commute or travel.`,
    );
    differences.push(`Longer battery: ${name(longer)} (${longer.test.batteryWebHours}h vs ${(longer.id === a.id ? b : a).test.batteryWebHours}h web).`);
    if (a.weightKg !== b.weightKg) differences.push(`Lighter: ${name(lighter)} (${lighter.weightKg} kg vs ${(lighter.id === a.id ? b : a).weightKg} kg).`);
  }

  // Display
  if (a.panelType !== b.panelType || a.test.brightnessNits !== b.test.brightnessNits) {
    const brighter = a.test.brightnessNits >= b.test.brightnessNits ? a : b;
    paragraphs.push(
      `Display: the ${name(a)} uses a ${a.screenSize}-inch ${a.panelType} panel (${a.resolution}, ${a.refreshRate}Hz), while the ${name(b)} has a ${b.screenSize}-inch ${b.panelType} panel (${b.resolution}, ${b.refreshRate}Hz). The ${name(brighter)} measured brighter at ${brighter.test.brightnessNits} nits, and covered ${brighter.test.colorGamutDCIP3}% of DCI-P3 — relevant for outdoor use and colour work.`,
    );
    if (a.panelType !== b.panelType) differences.push(`Display: ${a.panelType} (${name(a)}) vs ${b.panelType} (${name(b)}).`);
  }

  // Value
  const pa = lowestPrice(a);
  const pb = lowestPrice(b);
  if (pa !== pb) {
    const cheaper = pa <= pb ? a : b;
    const dearer = cheaper.id === a.id ? b : a;
    const diff = Math.abs(pa - pb);
    paragraphs.push(
      `Price and value: the ${name(cheaper)} is the cheaper option in Canada, about $${diff.toLocaleString()} less than the ${name(dearer)}. Weighed against our test scores (${a.overall.toFixed(1)} vs ${b.overall.toFixed(1)} overall), the ${name(a.scores.value >= b.scores.value ? a : b)} offers the better value for the money, while the ${name(a.overall >= b.overall ? a : b)} is the stronger laptop outright if budget is not the deciding factor.`,
    );
    differences.push(`Cheaper: ${name(cheaper)} (saves about $${diff.toLocaleString()} CAD).`);
  }

  return { paragraphs, differences };
}

// Best-list categories that BOTH laptops qualify for — useful contextual links
// from a comparison page back to ranking pages.
export function sharedRankings(a: Laptop, b: Laptop) {
  const setB = new Set(laptopRankings(b).map((c) => c.slug));
  return laptopRankings(a).filter((c) => setB.has(c.slug));
}

// ---------------------------------------------------------------------------
// Per-laptop computed rankings ("#2 of 23 tested for battery life").
// Computed from our own test data, so every page carries numbers no other
// site has, and the numbers always agree with the test-results tables.
// ---------------------------------------------------------------------------

export type MetricKey =
  | "overall"
  | "battery"
  | "weight"
  | "multicore"
  | "fps"
  | "brightness"
  | "export"
  | "price"
  | "loadNoise";

export const METRICS: Record<MetricKey, { label: string; value: (l: Laptop) => number; higherIsBetter: boolean; unit: string }> = {
  overall: { label: "overall score", value: (l) => l.overall, higherIsBetter: true, unit: "/10" },
  battery: { label: "battery life", value: (l) => l.test.batteryWebHours, higherIsBetter: true, unit: " h" },
  weight: { label: "lightness", value: (l) => l.weightKg, higherIsBetter: false, unit: " kg" },
  multicore: { label: "multi-core performance", value: (l) => l.test.geekbenchMulti, higherIsBetter: true, unit: "" },
  fps: { label: "1080p gaming", value: (l) => l.test.gamingFps1080pHigh, higherIsBetter: true, unit: " FPS" },
  brightness: { label: "screen brightness", value: (l) => l.test.brightnessNits, higherIsBetter: true, unit: " nits" },
  export: { label: "4K export speed", value: (l) => l.test.videoExportMinutes, higherIsBetter: false, unit: " min" },
  price: { label: "price", value: (l) => lowestPrice(l), higherIsBetter: false, unit: "" },
  loadNoise: { label: "quietness under load", value: (l) => l.test.loadNoiseDb, higherIsBetter: false, unit: " dB" },
};

/** Rank (1 = best) of a laptop among all tested laptops for one metric. Ties share a rank. */
export function metricRank(l: Laptop, key: MetricKey): { rank: number; of: number } {
  const m = METRICS[key];
  const pool = testedPool();
  const v = m.value(l);
  const better = pool.filter((x) => (m.higherIsBetter ? m.value(x) > v : m.value(x) < v)).length;
  return { rank: better + 1, of: pool.length };
}

/** Rank against any numeric selector over the tested pool (used by the test-results page). */
export function rankBy(l: Laptop, sel: (x: Laptop) => number, higherIsBetter = true): { rank: number; of: number } {
  const pool = testedPool();
  const v = sel(l);
  const better = pool.filter((x) => (higherIsBetter ? sel(x) > v : sel(x) < v)).length;
  return { rank: better + 1, of: pool.length };
}

const testedPool = (): Laptop[] => testedLaptops;

export const ordinalRank = ({ rank, of }: { rank: number; of: number }) => `#${rank} of ${of}`;

/** The laptop's strongest rankings, best first, for quick answers and highlights. */
export function topRankings(l: Laptop, keys: MetricKey[] = ["battery", "weight", "multicore", "fps", "brightness", "export", "loadNoise", "price"]) {
  return keys
    .map((k) => ({ key: k, label: METRICS[k].label, ...metricRank(l, k) }))
    .sort((a, b) => a.rank - b.rank);
}

// ---------------------------------------------------------------------------
// Review page: answer-first sentence and data-driven FAQ.
// ---------------------------------------------------------------------------

export function reviewQuickAnswer(l: Laptop): string {
  const best = topRankings(l)[0];
  const strength = best && best.rank <= 5 ? ` It ranks ${ordinalRank(best)} laptops tested for ${best.label}.` : "";
  return (
    `The ${name(l)} scores ${l.overall.toFixed(1)}/10 in our Canadian testing: ${l.test.batteryWebHours} hours of web-browsing battery life, ` +
    `${l.weightKg} kg, ${l.test.gamingFps1080pHigh} FPS average at 1080p, from ${formatCAD(lowestPrice(l))} CAD.${strength} Best for ${lowerFirst(l.bestFor)}.`
  );
}

export function reviewFaq(l: Laptop): { q: string; a: string }[] {
  const m = l.model;
  const bat = metricRank(l, "battery");
  const fps = metricRank(l, "fps");
  const gamingVerdict =
    l.test.gamingFps1080pHigh >= 90
      ? "That is smooth high-refresh gaming at 1080p high settings."
      : l.test.gamingFps1080pHigh >= 50
        ? "That is playable at 1080p high, but demanding games need lower settings."
        : "That is enough for light and older games only; it is not a gaming laptop.";
  const faq: { q: string; a: string }[] = [
    { q: `Is the ${name(l)} worth it?`, a: `${l.verdict.split(". ")[0].replace(/\.$/, "")}. It scores ${l.overall.toFixed(1)}/10 and sells from ${formatCAD(lowestPrice(l))} CAD.` },
    {
      q: `How long does the ${m} battery last?`,
      a: `The ${m} lasted ${l.test.batteryWebHours} hours in our web-browsing test and ${l.test.batteryVideoHours} hours of video playback, ranking ${ordinalRank(bat)} laptops tested for battery life. It charges to 80% in ${l.test.chargeTo80Minutes} minutes.`,
    },
    {
      q: `Is the ${m} good for gaming?`,
      a: `The ${m} averaged ${l.test.gamingFps1080pHigh} FPS across our 1080p high gaming suite with the ${l.gpu} (${ordinalRank(fps)} laptops tested). ${gamingVerdict}`,
    },
    {
      q: `How much does the ${m} cost in Canada?`,
      a: `The ${m} currently starts around ${formatCAD(lowestPrice(l))} CAD${l.retailers.length ? ` at ${l.retailers.slice().sort((x, y) => x.price - y.price)[0].name}` : ""}, against an MSRP of ${formatCAD(l.msrp)}.`,
    },
    {
      q: `Can you upgrade the RAM in the ${m}?`,
      a: l.ramUpgradeable
        ? `Yes. The ${m}'s ${l.ram}GB of ${l.ramType} is user-upgradeable, and storage is ${l.storageUpgradeable ? "replaceable too" : "not user-replaceable"}.`
        : `No. The ${m}'s ${l.ram}GB of ${l.ramType} is soldered, so buy the memory you need up front. Storage is ${l.storageUpgradeable ? "user-replaceable" : "not user-replaceable either"}.`,
    },
    {
      q: `How heavy is the ${m}?`,
      a: `The ${m} weighs ${l.weightKg} kg and measures ${l.dimensions} mm, ranking ${ordinalRank(metricRank(l, "weight"))} laptops tested for lightness.`,
    },
    {
      q: `Does the ${m} get hot or loud?`,
      a: `Under sustained load we measured ${l.test.loadNoiseDb} dB of fan noise, ${l.test.cpuTempLoadC}°C on the CPU and ${l.test.keyboardTempLoadC}°C on the keyboard surface. At idle it measured ${l.test.idleNoiseDb} dB.`,
    },
    {
      q: `Does the ${m} have a touchscreen?`,
      a: `${l.touchscreen ? "Yes" : "No"}. The ${m} has a ${l.screenSize}-inch ${l.resolution} ${l.panelType} ${l.touchscreen ? "touchscreen" : "display"} at ${l.refreshRate}Hz${l.convertible ? " and folds into a tablet" : ""}, measured at ${l.test.brightnessNits} nits.`,
    },
    {
      q: `What ports does the ${m} have?`,
      a: `The ${m} has ${l.ports.join(", ")}, plus ${l.wifi} and Bluetooth ${l.bluetooth}.`,
    },
  ];
  return faq;
}

// ---------------------------------------------------------------------------
// Comparison page: answer-first title, quick answer and question sections.
// ---------------------------------------------------------------------------

export function comparisonWinner(a: Laptop, b: Laptop): { winner: Laptop; loser: Laptop; tie: boolean } {
  if (a.overall === b.overall) {
    const winner = lowestPrice(a) <= lowestPrice(b) ? a : b;
    return { winner, loser: winner.id === a.id ? b : a, tie: true };
  }
  const winner = a.overall > b.overall ? a : b;
  return { winner, loser: winner.id === a.id ? b : a, tie: false };
}

export function comparisonQuickAnswer(a: Laptop, b: Laptop): string {
  const { winner, loser, tie } = comparisonWinner(a, b);
  const longer = a.test.batteryWebHours >= b.test.batteryWebHours ? a : b;
  const shorter = longer.id === a.id ? b : a;
  const cheaper = lowestPrice(a) <= lowestPrice(b) ? a : b;
  const dearer = cheaper.id === a.id ? b : a;
  const lead = tie
    ? `The ${name(a)} and ${name(b)} tie at ${a.overall.toFixed(1)}/10 in our testing, so the choice comes down to price, size and battery life.`
    : `The ${name(winner)} is the better laptop overall, scoring ${winner.overall.toFixed(1)}/10 against ${loser.overall.toFixed(1)}/10 for the ${name(loser)}.`;
  const battery =
    a.test.batteryWebHours === b.test.batteryWebHours
      ? ` Both lasted ${a.test.batteryWebHours} hours in our battery test.`
      : ` The ${longer.model} lasts longer on battery (${longer.test.batteryWebHours} h vs ${shorter.test.batteryWebHours} h).`;
  const price =
    lowestPrice(a) === lowestPrice(b)
      ? ` Both sell for about ${formatCAD(lowestPrice(a))} CAD.`
      : ` The ${cheaper.model} costs ${formatCAD(lowestPrice(dearer) - lowestPrice(cheaper))} less (${formatCAD(lowestPrice(cheaper))} vs ${formatCAD(lowestPrice(dearer))} CAD).`;
  return lead + battery + price;
}

/** Question-phrased H2 sections; every first sentence carries the measured numbers. */
export function comparisonSections(a: Laptop, b: Laptop): { id: string; heading: string; body: string[] }[] {
  const sections: { id: string; heading: string; body: string[] }[] = [];
  const other = (x: Laptop) => (x.id === a.id ? b : a);

  // Performance
  const fast = a.test.geekbenchMulti >= b.test.geekbenchMulti ? a : b;
  const fastFps = a.test.gamingFps1080pHigh >= b.test.gamingFps1080pHigh ? a : b;
  const quickExport = a.test.videoExportMinutes <= b.test.videoExportMinutes ? a : b;
  sections.push({
    id: "performance",
    heading: `Is the ${a.model} faster than the ${b.model}?`,
    body: [
      a.test.geekbenchMulti === b.test.geekbenchMulti
        ? `CPU performance is a tie: both scored ${a.test.geekbenchMulti.toLocaleString()} in Geekbench multi-core.`
        : `${fast.id === a.id ? "Yes" : "No"}. The ${name(fast)} scored ${fast.test.geekbenchMulti.toLocaleString()} in Geekbench multi-core against ${other(fast).test.geekbenchMulti.toLocaleString()} for the ${name(other(fast))}, about ${gap(a.test.geekbenchMulti, b.test.geekbenchMulti)}% faster in CPU-heavy work. Single-core results were ${a.test.geekbenchSingle.toLocaleString()} (${a.model}) and ${b.test.geekbenchSingle.toLocaleString()} (${b.model}).`,
      `In our 4K video export test the ${quickExport.model} finished in ${quickExport.test.videoExportMinutes} minutes versus ${other(quickExport).test.videoExportMinutes} minutes. For gaming, the ${fastFps.model} (${fastFps.gpu}) averaged ${fastFps.test.gamingFps1080pHigh} FPS at 1080p high, while the ${other(fastFps).model} (${other(fastFps).gpu}) averaged ${other(fastFps).test.gamingFps1080pHigh} FPS.`,
    ],
  });

  // Battery
  const longer = a.test.batteryWebHours >= b.test.batteryWebHours ? a : b;
  sections.push({
    id: "battery",
    heading: `Which has better battery life, the ${a.model} or the ${b.model}?`,
    body: [
      a.test.batteryWebHours === b.test.batteryWebHours
        ? `Battery life is even: both lasted ${a.test.batteryWebHours} hours in our web-browsing test.`
        : `The ${name(longer)} lasted ${longer.test.batteryWebHours} hours in our web-browsing test, ${round1(longer.test.batteryWebHours - other(longer).test.batteryWebHours)} hours more than the ${name(other(longer))} (${other(longer).test.batteryWebHours} h).`,
      `Video playback measured ${a.test.batteryVideoHours} h on the ${a.model} and ${b.test.batteryVideoHours} h on the ${b.model}. Charging to 80% took ${a.test.chargeTo80Minutes} and ${b.test.chargeTo80Minutes} minutes respectively.`,
    ],
  });

  // Display
  const brighter = a.test.brightnessNits >= b.test.brightnessNits ? a : b;
  const accurate = a.test.colorAccuracyDeltaE <= b.test.colorAccuracyDeltaE ? a : b;
  sections.push({
    id: "display",
    heading: `Which has the better screen?`,
    body: [
      `The ${name(a)} has a ${a.screenSize}-inch ${a.resolution} ${a.panelType} panel at ${a.refreshRate}Hz; the ${name(b)} has a ${b.screenSize}-inch ${b.resolution} ${b.panelType} panel at ${b.refreshRate}Hz. The ${brighter.model} measured brighter at ${brighter.test.brightnessNits} nits versus ${other(brighter).test.brightnessNits} nits.`,
      `For colour work, the ${accurate.model} was more accurate (Delta E ${accurate.test.colorAccuracyDeltaE} vs ${other(accurate).test.colorAccuracyDeltaE}) and DCI-P3 coverage was ${a.test.colorGamutDCIP3}% (${a.model}) versus ${b.test.colorGamutDCIP3}% (${b.model}).${a.touchscreen !== b.touchscreen ? ` Only the ${(a.touchscreen ? a : b).model} has a touchscreen.` : ""}`,
    ],
  });

  // Portability
  const lighter = a.weightKg <= b.weightKg ? a : b;
  sections.push({
    id: "portability",
    heading: `Which is lighter and easier to carry?`,
    body: [
      a.weightKg === b.weightKg
        ? `They weigh the same, ${a.weightKg} kg each.`
        : `The ${name(lighter)} is lighter at ${lighter.weightKg} kg, ${Math.round((other(lighter).weightKg - lighter.weightKg) * 1000)} g less than the ${name(other(lighter))} (${other(lighter).weightKg} kg).`,
      `Dimensions are ${a.dimensions} mm (${a.model}) and ${b.dimensions} mm (${b.model}). Under load the ${a.model} measured ${a.test.loadNoiseDb} dB and the ${b.model} ${b.test.loadNoiseDb} dB of fan noise.`,
    ],
  });

  // Value
  const pa = lowestPrice(a);
  const pb = lowestPrice(b);
  const cheaper = pa <= pb ? a : b;
  const valueWinner = a.scores.value >= b.scores.value ? a : b;
  const ppa = a.overall / (pa / 1000);
  const ppb = b.overall / (pb / 1000);
  sections.push({
    id: "value",
    heading: `Which is better value in Canada?`,
    body: [
      pa === pb
        ? `Both sell for about ${formatCAD(pa)} CAD right now.`
        : `The ${name(cheaper)} is cheaper at ${formatCAD(lowestPrice(cheaper))} CAD, ${formatCAD(Math.abs(pa - pb))} less than the ${name(other(cheaper))} (${formatCAD(lowestPrice(other(cheaper)))}).`,
      `Per $1,000 spent, the ${a.model} delivers ${ppa.toFixed(1)} score points and the ${b.model} ${ppb.toFixed(1)}. Our value sub-score favours the ${valueWinner.model} (${valueWinner.scores.value.toFixed(1)} vs ${other(valueWinner).scores.value.toFixed(1)}).`,
    ],
  });

  // Practical differences
  const diffs: string[] = [];
  if (a.os !== b.os) diffs.push(`The ${a.model} runs ${a.os}, the ${b.model} runs ${b.os}.`);
  if (a.ramUpgradeable !== b.ramUpgradeable) diffs.push(`Only the ${(a.ramUpgradeable ? a : b).model} has upgradeable RAM; the ${(a.ramUpgradeable ? b : a).model}'s memory is soldered.`);
  if (a.ram !== b.ram) diffs.push(`Tested with ${a.ram}GB (${a.model}) and ${b.ram}GB (${b.model}) of RAM.`);
  if (a.warranty !== b.warranty) diffs.push(`Warranty: ${a.warranty} (${a.model}) vs ${b.warranty} (${b.model}).`);
  if (diffs.length) sections.push({ id: "differences", heading: `What else is different?`, body: [diffs.join(" ")] });

  return sections;
}

export function comparisonFaq(a: Laptop, b: Laptop, verdict: string, winnerByUseCase: { useCase: string; winner: string }[]): { q: string; a: string }[] {
  const useCaseKey: Record<string, keyof Laptop["useCases"]> = {
    School: "school", Business: "business", Gaming: "gaming", Multimedia: "multimedia", Programming: "programming", Travel: "travel",
    "Battery life": "battery", Value: "value", Portability: "travel", Performance: "workstation", "Gaming performance": "gaming", "1080p frame rates": "gaming",
  };
  const faq = [{ q: `Should I buy the ${a.model} or the ${b.model}?`, a: verdict }];
  for (const w of winnerByUseCase) {
    const winner = w.winner === a.id ? a : b;
    const loser = winner.id === a.id ? b : a;
    const key = useCaseKey[w.useCase];
    const scores = key ? ` It scores ${winner.useCases[key].toFixed(1)} for ${w.useCase.toLowerCase()} in our tests versus ${loser.useCases[key].toFixed(1)}.` : "";
    faq.push({ q: `Is the ${a.model} or ${b.model} better for ${w.useCase.toLowerCase()}?`, a: `The ${name(winner)} is the better choice for ${w.useCase.toLowerCase()}.${scores}` });
  }
  return faq;
}

// ---------------------------------------------------------------------------
// Brand hub: stats computed from the brand's own tested models.
// ---------------------------------------------------------------------------

export function brandStats(models: Laptop[]) {
  if (models.length === 0) return null;
  const by = (sel: (l: Laptop) => number, high = true) => models.slice().sort((x, y) => (high ? sel(y) - sel(x) : sel(x) - sel(y)))[0];
  const scores = models.map((m) => m.overall).sort((x, y) => x - y);
  const prices = models.map((m) => lowestPrice(m)).sort((x, y) => x - y);
  const mid = Math.floor(scores.length / 2);
  const median = scores.length % 2 ? scores[mid] : (scores[mid - 1] + scores[mid]) / 2;
  return {
    count: models.length,
    scoreMin: scores[0],
    scoreMax: scores[scores.length - 1],
    scoreMedian: median,
    priceMin: prices[0],
    priceMax: prices[prices.length - 1],
    top: by((l) => l.overall),
    longestBattery: by((l) => l.test.batteryWebHours),
    lightest: by((l) => l.weightKg, false),
    cheapest: by((l) => lowestPrice(l), false),
    fastest: by((l) => l.test.geekbenchMulti),
  };
}

const round1 = (n: number) => Math.round(n * 10) / 10;
const lowerFirst = (s: string) => (s ? s.charAt(0).toLowerCase() + s.slice(1) : s);
