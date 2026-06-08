import { getLaptopById } from "./laptops";
import type { Laptop } from "@/lib/types";

// Curated head-to-head comparisons served at /laptop/compare/{slug}.
export interface Comparison {
  slug: string;
  a: string; // laptop id
  b: string; // laptop id
  verdict: string;
  winnerByUseCase: { useCase: string; winner: string }[];
}

export const comparisons: Comparison[] = [
  {
    slug: "macbook-air-15-m4-vs-dell-xps-13-9350",
    a: "apple-macbook-air-15-m4",
    b: "dell-xps-13-9350",
    verdict:
      "Both are excellent ultraportables. The MacBook Air 15 wins on battery life, performance, and screen size, while the XPS 13 is more compact and runs Windows. Choose the Air for endurance and a bigger screen; choose the XPS for a smaller Windows laptop.",
    winnerByUseCase: [
      { useCase: "Battery life", winner: "apple-macbook-air-15-m4" },
      { useCase: "Portability", winner: "dell-xps-13-9350" },
      { useCase: "Performance", winner: "apple-macbook-air-15-m4" },
      { useCase: "Windows software", winner: "dell-xps-13-9350" },
    ],
  },
  {
    slug: "thinkpad-x1-carbon-gen-12-vs-dell-xps-13-9350",
    a: "lenovo-thinkpad-x1-carbon-gen-12",
    b: "dell-xps-13-9350",
    verdict:
      "The ThinkPad X1 Carbon has the better keyboard, OLED display option, and port selection, while the XPS 13 is more compact with longer battery life. Choose the ThinkPad for typing and ports; choose the XPS for size and endurance.",
    winnerByUseCase: [
      { useCase: "Keyboard", winner: "lenovo-thinkpad-x1-carbon-gen-12" },
      { useCase: "Battery life", winner: "dell-xps-13-9350" },
      { useCase: "Ports", winner: "lenovo-thinkpad-x1-carbon-gen-12" },
      { useCase: "Portability", winner: "dell-xps-13-9350" },
    ],
  },
  {
    slug: "rog-zephyrus-g14-2025-vs-legion-pro-5-2025",
    a: "asus-rog-zephyrus-g14-2025",
    b: "lenovo-legion-pro-5-2025",
    verdict:
      "The Zephyrus G14 is far more portable with a better OLED display, while the Legion Pro 5 delivers higher sustained performance and a larger 240Hz screen for less money. Choose the G14 for portability; choose the Legion for raw power and value.",
    winnerByUseCase: [
      { useCase: "Portability", winner: "asus-rog-zephyrus-g14-2025" },
      { useCase: "Gaming performance", winner: "lenovo-legion-pro-5-2025" },
      { useCase: "Display", winner: "asus-rog-zephyrus-g14-2025" },
      { useCase: "Value", winner: "lenovo-legion-pro-5-2025" },
    ],
  },
  {
    slug: "macbook-pro-14-m4-pro-vs-macbook-air-15-m4",
    a: "apple-macbook-pro-14-m4-pro",
    b: "apple-macbook-air-15-m4",
    verdict:
      "The MacBook Pro 14 offers sustained performance, a Mini-LED display, and more ports for demanding work, while the MacBook Air 15 is lighter, cheaper, and fanless. Choose the Pro for heavy creative work; choose the Air for everyday use and value.",
    winnerByUseCase: [
      { useCase: "Performance", winner: "apple-macbook-pro-14-m4-pro" },
      { useCase: "Display", winner: "apple-macbook-pro-14-m4-pro" },
      { useCase: "Value", winner: "apple-macbook-air-15-m4" },
      { useCase: "Portability", winner: "apple-macbook-air-15-m4" },
    ],
  },
  {
    slug: "chromebook-plus-cx34-vs-acer-aspire-5-15-2025",
    a: "asus-chromebook-plus-cx34",
    b: "acer-aspire-5-15-2025",
    verdict:
      "The Chromebook Plus CX34 is cheaper, lighter, and has better battery life for web-based work, while the Aspire 5 runs full Windows software and is upgradeable. Choose the Chromebook for simple, cheap computing; choose the Aspire for software flexibility.",
    winnerByUseCase: [
      { useCase: "Price", winner: "asus-chromebook-plus-cx34" },
      { useCase: "Software flexibility", winner: "acer-aspire-5-15-2025" },
      { useCase: "Battery life", winner: "asus-chromebook-plus-cx34" },
      { useCase: "Upgradeability", winner: "acer-aspire-5-15-2025" },
    ],
  },
];

export function getComparison(slug: string): Comparison | undefined {
  return comparisons.find((c) => c.slug === slug);
}

export function comparisonLaptops(c: Comparison): [Laptop, Laptop] {
  return [getLaptopById(c.a)!, getLaptopById(c.b)!];
}
