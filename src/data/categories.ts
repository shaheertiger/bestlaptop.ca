import type { BestCategory, Laptop } from "@/lib/types";

const has = (cat: string) => (l: Laptop) => l.categories.includes(cat);

// "Best" categories drive /laptop/reviews/best/{category} and the nav.
export const bestCategories: BestCategory[] = [
  {
    slug: "laptop",
    navLabel: "Best Laptops",
    title: "Best Laptops in Canada",
    h1: "The Best Laptops in Canada (2026)",
    group: "use-case",
    intro:
      "The best laptop for most Canadians should balance performance, battery life, display quality, keyboard comfort, portability, and price. We selected these models using a consistent testing framework and considered Canadian pricing, retailer availability, and long-term value.",
    criteria:
      "We weight everyday performance, battery life, display quality, and build, then adjust for Canadian price and availability.",
    filter: has("laptop"),
  },
  {
    slug: "gaming",
    navLabel: "Best Gaming Laptops",
    title: "Best Gaming Laptops in Canada",
    h1: "The Best Gaming Laptops in Canada (2026)",
    group: "use-case",
    intro:
      "A good gaming laptop needs strong sustained GPU and CPU performance, a fast display, and cooling that holds up under load. We tested frame rates, thermals, and fan noise, then factored in Canadian pricing.",
    criteria: "We prioritize gaming frame rates, display refresh rate, thermals, and value.",
    filter: has("gaming"),
  },
  {
    slug: "budget",
    navLabel: "Best Budget Laptops",
    title: "Best Budget Laptops in Canada",
    h1: "The Best Budget Laptops in Canada (2026)",
    group: "price",
    intro:
      "A good budget laptop should handle everyday tasks reliably without feeling slow in a year. We focused on value, build, and battery life, and flagged where spending a little more pays off.",
    criteria: "We weight Canadian value, everyday performance, and battery life most heavily.",
    filter: has("budget"),
  },
  {
    slug: "student",
    navLabel: "Best Student Laptops",
    title: "Best Student Laptops in Canada",
    h1: "The Best Laptops for Students in Canada (2026)",
    group: "use-case",
    intro:
      "The best student laptop balances battery life, portability, and price so it lasts a full day of classes. We considered weight, typing comfort, and Canadian availability.",
    criteria: "We prioritize battery life, portability, keyboard comfort, and value.",
    filter: has("student"),
  },
  {
    slug: "college",
    navLabel: "Best College Laptops",
    title: "Best College & University Laptops in Canada",
    h1: "The Best Laptops for College & University in Canada (2026)",
    group: "use-case",
    intro:
      "College and university students need a laptop that survives long days, handles coursework, and fits a student budget. We weighed battery life, durability, and price.",
    criteria: "We prioritize battery life, durability, performance for coursework, and value.",
    filter: has("college"),
  },
  {
    slug: "business",
    navLabel: "Best Business Laptops",
    title: "Best Business Laptops in Canada",
    h1: "The Best Business Laptops in Canada (2026)",
    group: "use-case",
    intro:
      "Business laptops should offer a great keyboard, strong security, reliable build, and long battery life. We tested typing, webcams, and battery, and considered manageability and warranty.",
    criteria: "We weight keyboard quality, battery life, build, and security features.",
    filter: has("business"),
  },
  {
    slug: "windows",
    navLabel: "Best Windows Laptops",
    title: "Best Windows Laptops in Canada",
    h1: "The Best Windows Laptops in Canada (2026)",
    group: "type",
    intro:
      "These are the best Windows laptops we have tested, spanning ultraportables to gaming machines. We balanced performance, battery life, display, and Canadian pricing.",
    criteria: "We weight overall test scores and adjust for Canadian price and availability.",
    filter: has("windows"),
  },
  {
    slug: "macbook",
    navLabel: "Best MacBooks",
    title: "Best MacBooks in Canada",
    h1: "The Best MacBooks in Canada (2026)",
    group: "type",
    intro:
      "Apple's MacBook lineup is small but strong. We tested each model's performance, battery life, and display to help you pick the right one for your budget and workload.",
    criteria: "We weight performance per watt, battery life, display, and value.",
    filter: has("macbook"),
  },
  {
    slug: "chromebook",
    navLabel: "Best Chromebooks",
    title: "Best Chromebooks in Canada",
    h1: "The Best Chromebooks in Canada (2026)",
    group: "type",
    intro:
      "A good Chromebook is fast for web work, has long battery life, and is affordable. We tested performance, battery, and build, and noted where ChromeOS limits you.",
    criteria: "We prioritize value, battery life, and responsiveness for web-based work.",
    filter: has("chromebook"),
  },
  {
    slug: "under-500",
    navLabel: "Best Laptops Under $500",
    title: "Best Laptops Under $500 in Canada",
    h1: "The Best Laptops Under $500 in Canada (2026)",
    group: "price",
    intro:
      "Under $500 in Canada you should set realistic expectations: a capable everyday machine for browsing, documents, and streaming. We focused on which models hold up best at this price.",
    criteria: "We weight Canadian value and everyday usability above raw performance.",
    filter: (l) => l.currentPrice <= 500,
  },
  {
    slug: "under-1000",
    navLabel: "Best Laptops Under $1,000",
    title: "Best Laptops Under $1,000 in Canada",
    h1: "The Best Laptops Under $1,000 in Canada (2026)",
    group: "price",
    intro:
      "Under $1,000 you can get a genuinely good everyday laptop with solid performance and battery life. We picked the models that deliver the most for the money in Canada.",
    criteria: "We weight value, performance, and battery life within the budget.",
    filter: (l) => l.currentPrice <= 1000,
  },
  {
    slug: "2-in-1",
    navLabel: "Best 2-in-1 Laptops",
    title: "Best 2-in-1 Laptops in Canada",
    h1: "The Best 2-in-1 Laptops in Canada (2026)",
    group: "type",
    intro:
      "A good 2-in-1 should work well as both a laptop and a tablet, with a responsive touchscreen and a comfortable keyboard. We tested hinge quality, pen support, and battery life.",
    criteria: "We weight display, versatility, build, and battery life.",
    filter: has("2-in-1"),
  },
  {
    slug: "programming",
    navLabel: "Best Laptops for Programming",
    title: "Best Laptops for Programming in Canada",
    h1: "The Best Laptops for Programming in Canada (2026)",
    group: "use-case",
    intro:
      "For programming, the priorities are a comfortable keyboard, fast multi-core performance, enough RAM, and long battery life. We tested compile-style workloads and typing comfort.",
    criteria: "We weight multi-core performance, keyboard, RAM, and battery life.",
    filter: has("programming"),
  },
  {
    slug: "video-editing",
    navLabel: "Best for Video Editing",
    title: "Best Laptops for Video Editing in Canada",
    h1: "The Best Laptops for Video Editing in Canada (2026)",
    group: "use-case",
    intro:
      "Video editing rewards strong CPU and GPU performance, a colour-accurate display, and fast storage. We measured 4K export times and display accuracy.",
    criteria: "We weight performance, display accuracy, and storage speed.",
    filter: has("video-editing"),
  },
  {
    slug: "photo-editing",
    navLabel: "Best for Photo Editing",
    title: "Best Laptops for Photo Editing in Canada",
    h1: "The Best Laptops for Photo Editing in Canada (2026)",
    group: "use-case",
    intro:
      "Photo editing depends most on a colour-accurate, high-gamut display and steady performance. We measured colour gamut and accuracy on every panel.",
    criteria: "We weight display gamut and accuracy, then performance.",
    filter: has("photo-editing"),
  },
  {
    slug: "working-from-home",
    navLabel: "Best for Working From Home",
    title: "Best Laptops for Working From Home in Canada",
    h1: "The Best Laptops for Working From Home in Canada (2026)",
    group: "use-case",
    intro:
      "For remote work, a good webcam, comfortable keyboard, long battery life, and a clear display matter most. We tested webcams, mics, and battery life for video calls.",
    criteria: "We weight webcam, keyboard, battery life, and display.",
    filter: has("working-from-home"),
  },
  {
    slug: "music-production",
    navLabel: "Best for Music Production",
    title: "Best Laptops for Music Production in Canada",
    h1: "The Best Laptops for Music Production in Canada (2026)",
    group: "use-case",
    intro:
      "Music production needs quiet operation, low-latency performance, enough RAM, and reliable ports. We weighed sustained performance and fan noise.",
    criteria: "We weight performance, low fan noise, RAM, and connectivity.",
    filter: has("music-production"),
  },
  // Sizes
  { slug: "13-inch", navLabel: "Best 13-inch", title: "Best 13-Inch Laptops in Canada", h1: "The Best 13-Inch Laptops in Canada (2026)", group: "size", intro: "13-inch laptops are the sweet spot for portability. We picked the most balanced compact laptops we have tested.", criteria: "We weight portability, battery life, and display.", filter: (l) => l.screenSize >= 13 && l.screenSize < 14 },
  { slug: "14-inch", navLabel: "Best 14-inch", title: "Best 14-Inch Laptops in Canada", h1: "The Best 14-Inch Laptops in Canada (2026)", group: "size", intro: "14-inch laptops balance screen space and portability. These are our top picks across budgets.", criteria: "We weight overall score within the 14-inch class.", filter: (l) => l.screenSize >= 14 && l.screenSize < 15 },
  { slug: "15-inch", navLabel: "Best 15-inch", title: "Best 15-Inch Laptops in Canada", h1: "The Best 15-Inch Laptops in Canada (2026)", group: "size", intro: "15-inch laptops offer a roomy screen for work and media. Here are the best we have tested.", criteria: "We weight overall score within the 15-inch class.", filter: (l) => l.screenSize >= 15 && l.screenSize < 16 },
  { slug: "16-inch", navLabel: "Best 16-inch", title: "Best 16-Inch Laptops in Canada", h1: "The Best 16-Inch Laptops in Canada (2026)", group: "size", intro: "16-inch laptops suit gamers and creators who want a big, fast display. These are our top picks.", criteria: "We weight performance and display within the 16-inch class.", filter: (l) => l.screenSize >= 16 },
  // Brand best-lists
  { slug: "lenovo", navLabel: "Best Lenovo", title: "Best Lenovo Laptops in Canada", h1: "The Best Lenovo Laptops in Canada (2026)", group: "brand", intro: "Lenovo's range spans ThinkPad business machines to Legion gaming laptops. These are the Lenovo models we recommend.", criteria: "We rank Lenovo models by overall test score and value.", filter: has("lenovo") },
  { slug: "dell", navLabel: "Best Dell", title: "Best Dell Laptops in Canada", h1: "The Best Dell Laptops in Canada (2026)", group: "brand", intro: "Dell's XPS and Latitude lines cover premium ultraportables and business laptops. These are our Dell picks.", criteria: "We rank Dell models by overall test score and value.", filter: has("dell") },
  { slug: "hp", navLabel: "Best HP", title: "Best HP Laptops in Canada", h1: "The Best HP Laptops in Canada (2026)", group: "brand", intro: "HP spans Spectre convertibles to budget Pavilions. These are the HP laptops we recommend.", criteria: "We rank HP models by overall test score and value.", filter: has("hp") },
  { slug: "asus", navLabel: "Best ASUS", title: "Best ASUS Laptops in Canada", h1: "The Best ASUS Laptops in Canada (2026)", group: "brand", intro: "ASUS covers ROG gaming, Zenbook ultraportables, and budget Chromebooks. These are our ASUS picks.", criteria: "We rank ASUS models by overall test score and value.", filter: has("asus") },
  { slug: "acer", navLabel: "Best Acer", title: "Best Acer Laptops in Canada", h1: "The Best Acer Laptops in Canada (2026)", group: "brand", intro: "Acer is known for value across Aspire, Swift, and Predator lines. These are our Acer picks.", criteria: "We rank Acer models by overall test score and value.", filter: has("acer") },
  // Additional keyword-targeted best lists
  {
    slug: "budget-gaming",
    navLabel: "Best Budget Gaming",
    title: "Best Budget Gaming Laptops in Canada",
    h1: "The Best Budget Gaming Laptops in Canada (2026)",
    group: "use-case",
    intro: "A good budget gaming laptop should deliver smooth 1080p frame rates without overspending. We ranked the best-value gaming laptops we have tested, weighing frame rates against Canadian price.",
    criteria: "We weight gaming frame rates per dollar, then thermals and display.",
    filter: has("gaming"),
  },
  {
    slug: "university-students",
    navLabel: "Best for University Students",
    title: "Best Laptops for University Students in Canada",
    h1: "The Best Laptops for University Students in Canada (2026)",
    group: "use-case",
    intro: "The best laptop for university students balances all-day battery life, portability, and price so it lasts through lectures and the library. We weighed battery life, weight, and value.",
    criteria: "We prioritize battery life, portability, keyboard comfort, and value.",
    filter: (l) => l.categories.includes("student") || l.categories.includes("college"),
  },
  {
    slug: "engineering-students",
    navLabel: "Best for Engineering Students",
    title: "Best Laptops for Engineering Students in Canada",
    h1: "The Best Laptops for Engineering Students in Canada (2026)",
    group: "use-case",
    intro: "Engineering students need stronger performance for CAD, simulations, and coding, plus a good display and battery life. We weighed multi-core performance, display, and portability.",
    criteria: "We weight performance, display, RAM, and battery life.",
    filter: (l) => l.categories.includes("programming") || l.useCases.workstation >= 8,
  },
  {
    slug: "under-1000-canada",
    navLabel: "Best Under $1,000 (Canada)",
    title: "Best Laptop Under $1,000 Canada",
    h1: "The Best Laptops Under $1,000 in Canada (2026)",
    group: "price",
    intro: "Under $1,000 in Canada you can get a genuinely capable everyday laptop. We picked the models that deliver the most for the money, with current Canadian pricing.",
    criteria: "We weight value, everyday performance, and battery life within the budget.",
    filter: (l) => l.currentPrice <= 1000,
  },
  {
    slug: "under-500-canada",
    navLabel: "Best Under $500 (Canada)",
    title: "Best Laptop Under $500 Canada",
    h1: "The Best Laptops Under $500 in Canada (2026)",
    group: "price",
    intro: "Under $500 in Canada, set realistic expectations: a capable everyday machine for browsing, documents, and streaming. We focused on which models hold up best at this price, with current Canadian pricing.",
    criteria: "We weight Canadian value and everyday usability above raw performance.",
    filter: (l) => l.currentPrice <= 500,
  },
  {
    slug: "lightweight",
    navLabel: "Best Lightweight Laptops",
    title: "Best Lightweight Laptops in Canada",
    h1: "The Best Lightweight Laptops in Canada (2026)",
    group: "use-case",
    intro:
      "A great lightweight laptop disappears into your bag without giving up battery life, build quality, or a usable keyboard. We measured the weight of every laptop we test and picked the models that stay under about 1.4 kg while still holding up to daily use.",
    criteria: "We weight measured weight and portability first, then battery life, build, and value.",
    filter: (l) => l.weightKg <= 1.4,
  },
  {
    slug: "long-battery-life",
    navLabel: "Best Battery Life",
    title: "Best Laptops for Battery Life in Canada",
    h1: "The Best Laptops for Long Battery Life in Canada (2026)",
    group: "use-case",
    intro:
      "All-day battery is the difference between a laptop you can rely on and one chained to an outlet. We run a standardized battery test on every model and ranked the laptops that lasted longest without sacrificing everyday performance.",
    criteria: "We weight measured battery life most heavily, then everyday performance, weight, and value.",
    filter: (l) => l.scores.battery >= 8,
  },
  {
    slug: "cheap",
    navLabel: "Best Cheap Laptops",
    title: "Best Cheap Laptops in Canada",
    h1: "The Best Cheap Laptops in Canada (2026)",
    group: "price",
    intro:
      "A cheap laptop does not have to feel cheap. We focused on the lowest-priced models in Canada that still browse, stream, and handle documents without frustration, and flagged where spending a little more genuinely pays off. Every pick here is one we would actually recommend at its price.",
    criteria: "We weight Canadian price and everyday usability most heavily, then build quality and battery life.",
    filter: (l) => l.currentPrice <= 900,
  },
  {
    slug: "brands",
    navLabel: "Best Laptop Brands",
    title: "Best Laptop Brands in Canada",
    h1: "The Best Laptop Brands in Canada (2026)",
    group: "brand",
    intro: "Every brand has strengths and weaknesses. Below are the top-scoring laptops across the brands we test, which is the fastest way to see which brands are performing best right now.",
    criteria: "We rank the highest-scoring laptops across all brands we test.",
    filter: has("laptop"),
  },
];

export function getBestCategory(slug: string): BestCategory | undefined {
  return bestCategories.find((c) => c.slug === slug);
}

export function categoryPicks(c: BestCategory): Laptop[] {
  // Imported lazily to avoid a cycle at module top-level.
  const { laptops } = require("./laptops") as typeof import("./laptops");
  return laptops
    .filter((l: Laptop) => l.status === "published" && c.filter(l))
    .sort((a: Laptop, b: Laptop) => b.overall - a.overall);
}
