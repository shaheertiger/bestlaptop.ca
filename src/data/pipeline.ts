import type { Deal, PipelineItem } from "@/lib/types";

// Review pipeline shown on /laptop/review-pipeline.
export const pipeline: PipelineItem[] = [
  { model: "ThinkPad X1 Carbon Gen 12", brand: "Lenovo", status: "published", expected: "2025-11-18", votes: 412 },
  { model: "MacBook Pro 14 (M4 Pro)", brand: "Apple", status: "published", expected: "2025-11-12", votes: 389 },
  { model: "Legion Pro 5 (2025)", brand: "Lenovo", status: "published", expected: "2025-11-25", votes: 301 },
  { model: "Surface Laptop 7 (13.8)", brand: "Microsoft", status: "published", expected: "2025-12-01", votes: 254 },
  { model: "Zenbook 14 OLED (2025)", brand: "ASUS", status: "published", expected: "2025-12-15", votes: 332 },
  { model: "XPS 16 9640", brand: "Dell", status: "published", expected: "2025-12-20", votes: 288 },
  { model: "MacBook Air 13 (M4)", brand: "Apple", status: "published", expected: "2025-12-08", votes: 470 },
  { model: "Stealth 16 AI Studio (2025)", brand: "MSI", status: "published", expected: "2026-01-14", votes: 244 },
  { model: "Galaxy Book5 Pro 14", brand: "Samsung", status: "published", expected: "2026-01-20", votes: 198 },
  { model: "gram Pro 16 (2025)", brand: "LG", status: "published", expected: "2026-01-26", votes: 121 },
  { model: "Blade 14 (2025)", brand: "Razer", status: "published", expected: "2026-02-02", votes: 209 },
  { model: "Framework Laptop 13 (2025)", brand: "Framework", status: "published", expected: "2026-02-09", votes: 351 },
  { model: "TUF Gaming A15 (2025)", brand: "ASUS", status: "published", expected: "2026-02-16", votes: 276 },
  { model: "Yoga 9i 2-in-1 (Gen 10)", brand: "Lenovo", status: "published", expected: "2026-03-02", votes: 188 },
  { model: "OMEN Transcend 14 (2026)", brand: "HP", status: "published", expected: "2026-03-10", votes: 231 },
  { model: "ROG Zephyrus G16 (2026)", brand: "ASUS", status: "testing", expected: "2026-07-05", votes: 226 },
  { model: "Predator Helios 16 (2026)", brand: "Acer", status: "testing", expected: "2026-07-28", votes: 173 },
  { model: "EliteBook Ultra G1q", brand: "HP", status: "writing", expected: "2026-06-24", votes: 142 },
  { model: "ThinkPad X9 14 Aura Edition", brand: "Lenovo", status: "in-transit", expected: "2026-07-15", votes: 305 },
  { model: "Surface Pro 12 (2026)", brand: "Microsoft", status: "purchased", expected: "2026-08-04", votes: 264 },
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
  { laptopId: "asus-tuf-gaming-a15-2025", retailer: "Best Buy Canada", currentPrice: 1299, previousPrice: 1499, condition: "New", availability: "In stock", warrantyNote: "1-year limited", expires: "2026-06-25", category: ["laptop", "gaming", "budget"] },
  { laptopId: "acer-chromebook-plus-514-2025", retailer: "Walmart Canada", currentPrice: 449, previousPrice: 549, condition: "New", availability: "In stock", warrantyNote: "1-year limited", category: ["laptop", "chromebook", "student"] },
  { laptopId: "acer-swift-go-14-2025", retailer: "Costco Canada", currentPrice: 929, previousPrice: 1099, condition: "New", availability: "In stock", warrantyNote: "Costco Concierge included", category: ["laptop", "budget", "student"] },
  { laptopId: "samsung-galaxy-book5-pro-2025", retailer: "Best Buy Canada", currentPrice: 1649, previousPrice: 1899, condition: "New", availability: "In stock", warrantyNote: "1-year limited", category: ["laptop", "business"] },
  { laptopId: "apple-macbook-air-13-m4", retailer: "Best Buy Canada", currentPrice: 1349, previousPrice: 1499, condition: "New", availability: "In stock", warrantyNote: "1-year limited", category: ["laptop", "macbook", "student"] },
];

export const dealCategories = [
  { slug: "laptop", tag: "laptop", title: "Best Laptop Deals in Canada" },
  { slug: "best-laptop-deals-canada", tag: "laptop", title: "Best Laptop Deals in Canada" },
  { slug: "gaming", tag: "gaming", title: "Best Gaming Laptop Deals in Canada" },
  { slug: "macbook", tag: "macbook", title: "Best MacBook Deals in Canada" },
  { slug: "student", tag: "student", title: "Best Student Laptop Deals in Canada" },
  { slug: "business", tag: "business", title: "Best Business Laptop Deals in Canada" },
  { slug: "refurbished", tag: "refurbished", title: "Best Refurbished Laptop Deals in Canada" },
];

export function dealQualityScore(d: Deal): number {
  const pct = (d.previousPrice - d.currentPrice) / d.previousPrice;
  return Math.min(10, Math.round(pct * 100) / 10 + 4);
}
