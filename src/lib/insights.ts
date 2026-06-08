import type { Laptop } from "./types";
import { bestCategories } from "@/data/categories";
import { lowestPrice } from "./scoring";

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
