import type { Deal, PipelineItem } from "@/lib/types";

// Review pipeline shown on /laptop/review-pipeline.
export const pipeline: PipelineItem[] = [
  { model: "ThinkPad X1 Carbon Gen 12", brand: "Lenovo", status: "published", expected: "2025-11-18", votes: 412 },
  { model: "MacBook Pro 14 (M4 Pro)", brand: "Apple", status: "published", expected: "2025-11-12", votes: 389 },
  { model: "Legion Pro 5 (2025)", brand: "Lenovo", status: "published", expected: "2025-11-25", votes: 301 },
  { model: "Surface Laptop 7 (13.8)", brand: "Microsoft", status: "published", expected: "2025-12-01", votes: 254 },
  { model: "Zenbook 14 OLED (2025)", brand: "ASUS", status: "writing", expected: "2026-06-20", votes: 332 },
  { model: "XPS 16 9640", brand: "Dell", status: "writing", expected: "2026-06-24", votes: 288 },
  { model: "MacBook Air 13 (M4)", brand: "Apple", status: "testing", expected: "2026-07-02", votes: 470 },
  { model: "ROG Zephyrus G16 (2025)", brand: "ASUS", status: "testing", expected: "2026-07-05", votes: 226 },
  { model: "Galaxy Book5 Pro 360", brand: "Samsung", status: "in-transit", expected: "2026-07-12", votes: 198 },
  { model: "Framework Laptop 13 (2025)", brand: "Framework", status: "in-transit", expected: "2026-07-15", votes: 351 },
  { model: "Predator Helios 16 (2025)", brand: "Acer", status: "purchased", expected: "2026-07-28", votes: 173 },
  { model: "EliteBook Ultra G1q", brand: "HP", status: "purchased", expected: "2026-08-04", votes: 142 },
  { model: "Blade 14 (2025)", brand: "Razer", status: "scheduled", expected: "2026-08-18", votes: 209 },
  { model: "gram Pro 16 (2025)", brand: "LG", status: "scheduled", expected: "2026-08-25", votes: 121 },
];

// Canadian deals shown on /laptop/deals.
export const deals: Deal[] = [
  { laptopId: "acer-aspire-5-15-2025", retailer: "Best Buy Canada", currentPrice: 749, previousPrice: 849, condition: "New", availability: "In stock", warrantyNote: "1-year limited", expires: "2026-06-22", category: ["laptop", "budget", "student"] },
  { laptopId: "asus-chromebook-plus-cx34", retailer: "Best Buy Canada", currentPrice: 499, previousPrice: 599, condition: "New", availability: "In stock", warrantyNote: "1-year limited", category: ["laptop", "chromebook", "student"] },
  { laptopId: "dell-xps-13-9350", retailer: "Costco Canada", currentPrice: 1479, previousPrice: 1799, condition: "New", availability: "Limited stock", warrantyNote: "Costco Concierge included", expires: "2026-06-30", category: ["laptop", "business"] },
  { laptopId: "apple-macbook-air-15-m4", retailer: "Best Buy Canada", currentPrice: 1649, previousPrice: 1899, condition: "New", availability: "In stock", warrantyNote: "1-year limited", category: ["laptop", "macbook", "student"] },
  { laptopId: "asus-rog-zephyrus-g14-2025", retailer: "Canada Computers", currentPrice: 2699, previousPrice: 2999, condition: "New", availability: "In stock", warrantyNote: "1-year limited", category: ["laptop", "gaming"] },
  { laptopId: "lenovo-legion-pro-5-2025", retailer: "Lenovo Canada", currentPrice: 2499, previousPrice: 2799, condition: "New", availability: "In stock", warrantyNote: "1-year limited", expires: "2026-06-18", category: ["laptop", "gaming"] },
  { laptopId: "lenovo-thinkpad-x1-carbon-gen-12", retailer: "Lenovo Canada", currentPrice: 1979, previousPrice: 2599, condition: "Refurbished", availability: "In stock", warrantyNote: "1-year certified refurbished", category: ["laptop", "business", "refurbished"] },
  { laptopId: "hp-spectre-x360-14-2025", retailer: "Costco Canada", currentPrice: 1799, previousPrice: 2099, condition: "New", availability: "In stock", warrantyNote: "Costco Concierge included", category: ["laptop", "business"] },
];

export const dealCategories = [
  { slug: "laptop", title: "Best Laptop Deals in Canada" },
  { slug: "gaming", title: "Best Gaming Laptop Deals in Canada" },
  { slug: "macbook", title: "Best MacBook Deals in Canada" },
  { slug: "student", title: "Best Student Laptop Deals in Canada" },
  { slug: "business", title: "Best Business Laptop Deals in Canada" },
  { slug: "refurbished", title: "Best Refurbished Laptop Deals in Canada" },
];

export function dealQualityScore(d: Deal): number {
  const pct = (d.previousPrice - d.currentPrice) / d.previousPrice;
  return Math.min(10, Math.round(pct * 100) / 10 + 4);
}
