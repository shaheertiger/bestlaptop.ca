// Core data model for BestLaptop.ca
// A laptop record mirrors the testing-first schema used across the site.

export type ReviewStatus =
  | "published"
  | "writing"
  | "testing"
  | "in-transit"
  | "purchased"
  | "scheduled";

export type OperatingSystem = "Windows 11" | "macOS" | "ChromeOS";

export interface UseCaseScores {
  school: number;
  business: number;
  gaming: number;
  multimedia: number;
  workstation: number;
  programming: number;
  travel: number;
  battery: number;
  value: number;
}

/** Sub-scores (0-10) that feed the weighted overall score. */
export interface CategoryScores {
  performance: number;
  display: number;
  battery: number;
  keyboard: number;
  build: number;
  portability: number;
  thermals: number;
  ports: number;
  value: number;
}

export interface Retailer {
  name: string;
  price: number; // CAD
  url: string;
  inStock: boolean;
  condition?: "New" | "Refurbished" | "Open Box";
}

export interface TestResults {
  // Display
  brightnessNits: number;
  contrast: number;
  colorGamutSRGB: number; // %
  colorGamutDCIP3: number; // %
  colorAccuracyDeltaE: number;
  // Performance
  geekbenchSingle: number;
  geekbenchMulti: number;
  cinebenchMulti: number;
  mark3d: number;
  ssdReadMBps: number;
  ssdWriteMBps: number;
  gamingFps1080pHigh: number; // avg across test suite
  videoExportMinutes: number; // 4K 10-min timeline export
  // Battery (hours)
  batteryWebHours: number;
  batteryVideoHours: number;
  batteryGamingHours: number;
  chargeTo80Minutes: number;
  // Thermals & noise
  idleNoiseDb: number;
  loadNoiseDb: number;
  cpuTempLoadC: number;
  keyboardTempLoadC: number;
  // Misc
  powerDrawLoadW: number;
}

export interface Laptop {
  id: string;
  brand: string;
  brandSlug: string;
  model: string;
  slug: string;
  series: string;
  year: number;
  releaseDate: string; // ISO
  testedDate: string; // ISO
  status: ReviewStatus;
  testBench: string; // e.g. "1.2"
  categories: string[]; // category slugs this laptop belongs to (best lists)
  os: OperatingSystem;

  msrp: number; // CAD
  currentPrice: number; // CAD
  retailers: Retailer[];

  // Configuration
  cpu: string;
  cpuBrand: "Intel" | "AMD" | "Apple" | "Qualcomm";
  gpu: string;
  gpuType: "Integrated" | "Discrete";
  ram: number; // GB
  ramType: string;
  ramUpgradeable: boolean;
  storage: number; // GB
  storageType: string;
  storageUpgradeable: boolean;

  // Design
  weightKg: number;
  dimensions: string; // mm
  material: string;
  color: string;

  // Display
  screenSize: number; // inches
  resolution: string;
  aspectRatio: string;
  panelType: string;
  refreshRate: number; // Hz
  touchscreen: boolean;
  convertible: boolean; // 2-in-1

  // Connectivity
  ports: string[];
  wifi: string;
  bluetooth: string;

  scores: CategoryScores;
  useCases: UseCaseScores;
  overall: number; // computed/stored

  verdict: string;
  pros: string[];
  cons: string[];
  bestFor: string;
  notIdealFor: string;
  whoShouldBuy: string;
  whoShouldSkip: string;

  test: TestResults;

  warranty: string;
  // SEO
  seoTitle: string;
  metaDescription: string;
  imageAlt: string;
}

export interface BestCategory {
  slug: string;
  title: string;
  h1: string;
  intro: string;
  criteria: string;
  filter: (l: Laptop) => boolean;
  navLabel: string;
  group: "use-case" | "price" | "type" | "brand" | "size";
}

export interface Guide {
  slug: string;
  title: string;
  h1: string;
  excerpt: string;
  category: string;
  updated: string;
  readingTime: number;
  answer: string;
  sections: { heading: string; body: string[] }[];
  faq: { q: string; a: string }[];
}

export interface Brand {
  slug: string;
  name: string;
  overview: string;
  strengths: string[];
  weaknesses: string[];
  buyerProfile: string;
  bestUseCases: string[];
  faq: { q: string; a: string }[];
}

export interface PipelineItem {
  model: string;
  brand: string;
  status: ReviewStatus;
  expected: string;
  votes: number;
}

export interface Deal {
  laptopId: string;
  retailer: string;
  currentPrice: number;
  previousPrice: number;
  condition: "New" | "Refurbished" | "Open Box";
  availability: string;
  warrantyNote: string;
  expires?: string;
  category: string[];
}
