import type { BestCategory, Laptop } from "@/lib/types";
import { categoryContent, footprintCm2 } from "./categoryContent";

const has = (cat: string) => (l: Laptop) => l.categories.includes(cat);

// "Best" categories drive /laptop/reviews/best/{category} and the nav.
const baseCategories: BestCategory[] = [
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
      "College and university programs usually need full desktop software, so this list covers Windows and macOS laptops only (no Chromebooks), ranked by our school use-case score: battery life, weight, keyboard and enough performance for coursework.",
    criteria: "We rank Windows and macOS student laptops by our school use-case score, then overall score.",
    // Student-tagged laptops minus ChromeOS. /best/student keeps Chromebooks for high school and web-only coursework.
    filter: (l) => (l.categories.includes("college") || l.categories.includes("student")) && l.os !== "ChromeOS",
  },
  {
    slug: "business",
    navLabel: "Best Laptops for Work",
    title: "Best Laptops for Work & Business in Canada",
    h1: "The Best Laptops for Work & Business in Canada (2026)",
    group: "use-case",
    intro:
      "Business laptops should offer a great keyboard, strong security, reliable build, and long battery life. We tested typing, webcams, and battery, and considered manageability and warranty.",
    criteria: "We rank by our business use-case score (keyboard, battery life, webcam and build), including MacBooks, which many offices issue.",
    // Business-tagged laptops plus any laptop (Windows or macOS) scoring 8.4+ for business use.
    filter: (l) => l.categories.includes("business") || l.useCases.business >= 8.4,
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
    // Quiet under load (or fanless), 16 GB+ RAM, full desktop OS and enough CPU for big DAW projects.
    filter: (l) => l.os !== "ChromeOS" && l.ram >= 16 && l.scores.performance >= 7.5 && (l.test.loadNoiseDb === 0 || l.test.loadNoiseDb <= 42),
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
    navLabel: "Best Cheap Gaming Laptops",
    title: "Best Cheap Gaming Laptops in Canada",
    h1: "The Best Cheap Gaming Laptops in Canada (2026)",
    group: "price",
    intro: "A good cheap gaming laptop should deliver smooth 1080p frame rates without overspending. We ranked every gaming laptop we have tested by frames per dollar: average 1080p High FPS divided by the lowest current Canadian price.",
    criteria: "We rank by measured 1080p frame rate per Canadian dollar, then weigh thermals and display.",
    filter: (l) => l.categories.includes("gaming") && l.currentPrice <= 2600,
  },
  // "university-students" was merged into "college" (identical picks to "student";
  // college already targets "College & University"). 301 in next.config.mjs.
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
    slug: "brands",
    navLabel: "Best Laptop Brands",
    title: "Best Laptop Brands in Canada",
    h1: "The Best Laptop Brands in Canada (2026)",
    group: "brand",
    intro: "This list ranks laptop brands, not individual laptops: each brand is scored by the median of every model we have tested from it, and represented below by its best model. It is the fastest way to see which brands are building the best laptops right now.",
    criteria: "We rank brands by the median overall score of all their tested models.",
    // One entry per brand: its highest-scoring published model.
    filter: (l) => {
      const { laptops } = require("./laptops") as typeof import("./laptops");
      const best = laptops
        .filter((x: Laptop) => x.status === "published" && x.brandSlug === l.brandSlug)
        .sort((a: Laptop, b: Laptop) => b.overall - a.overall)[0];
      return best?.id === l.id;
    },
  },
  // Keyword-gap lists (Semrush CA, Nov 2026): battery life, lightweight, home use,
  // touchscreen, retailer and price-band intents that had no dedicated page.
  {
    slug: "long-battery-life",
    navLabel: "Best Battery Life",
    title: "Laptops With the Best Battery Life in Canada",
    h1: "Laptops With the Best Battery Life (2026)",
    group: "use-case",
    intro: "These are the laptops that lasted longest in our standardized web-browsing battery test at 150 nits, ranked by hours. Every result is measured in our lab, not taken from manufacturer claims.",
    criteria: "We rank by measured web-browsing battery life, then by overall score.",
    filter: (l) => l.test.batteryWebHours >= 13,
  },
  {
    slug: "lightweight",
    navLabel: "Best Lightweight Laptops",
    title: "Best Lightweight Laptops in Canada",
    h1: "The Best Lightweight Laptops in Canada (2026)",
    group: "type",
    intro: "Every laptop here weighs 1.3 kg or less on our scale, ranked from lightest up. We checked that low weight does not come at the cost of battery life, keyboard comfort or build quality.",
    criteria: "We rank by measured weight, and only include laptops that score 7.5/10 or higher overall.",
    filter: (l) => l.weightKg <= 1.3 && l.overall >= 7.5,
  },
  {
    slug: "home-use",
    navLabel: "Best for Home Use",
    title: "Best Laptops for Home Use in Canada",
    h1: "The Best Laptops for Home Use & Families in Canada (2026)",
    group: "use-case",
    intro: "A home laptop needs to handle browsing, streaming, banking, photos and video calls for years without costing a fortune. We ranked laptops under $1,700 CAD by overall score plus value.",
    criteria: "We weight overall test score and value equally, for laptops under $1,700 CAD.",
    filter: (l) => l.currentPrice <= 1700 && l.gpuType === "Integrated",
  },
  {
    slug: "touchscreen",
    navLabel: "Best Touchscreen Laptops",
    title: "Best Touchscreen Laptops in Canada",
    h1: "The Best Touchscreen Laptops in Canada (2026)",
    group: "type",
    intro: "These are the best laptops with touchscreens we have tested, from clamshells to 2-in-1 convertibles. We tested touch responsiveness, glare and the battery-life cost of the touch layer.",
    criteria: "We rank touchscreen laptops by overall test score.",
    filter: (l) => l.touchscreen,
  },
  {
    slug: "best-buy",
    navLabel: "Best at Best Buy",
    title: "Best Laptops at Best Buy Canada",
    h1: "The Best Laptops You Can Buy at Best Buy Canada (2026)",
    group: "price",
    intro: "Shopping at Best Buy Canada? These are the laptops we have tested that Best Buy sells and that score 7.5/10 or better, ranked by value at Best Buy's own price: test-score points per $1,000. We are independent and not affiliated with Best Buy.",
    criteria: "We rank laptops sold at Best Buy Canada (7.5/10 or better) by overall score per $1,000 at the Best Buy price.",
    filter: (l) => l.overall >= 7.5 && l.retailers.some((r) => r.name === "Best Buy Canada"),
  },
  {
    slug: "under-1500",
    navLabel: "Best Laptops Under $1,500",
    title: "Best Laptops Under $1,500 in Canada",
    h1: "The Best Laptops Under $1,500 in Canada (2026)",
    group: "price",
    intro: "Under $1,500 CAD you can buy a premium ultraportable with all-day battery or a capable RTX gaming laptop. These are the highest-scoring laptops we have tested at or below that price.",
    criteria: "We rank laptops priced at or under $1,500 CAD by overall test score.",
    filter: (l) => l.currentPrice <= 1500,
  },
  // Use-case expansion (Semrush CA, Nov 2026): modelled on video-editing and
  // music-production, the lists already earning impressions and clicks. Each
  // filter is a predicate over existing test data; no new tags in laptops.ts.
  {
    slug: "it-students",
    navLabel: "Best for IT Students",
    title: "Best Laptops for IT Students in Canada",
    h1: "The Best Laptops for IT & Computer Science Students in Canada (2026)",
    group: "use-case",
    intro: "IT, computer science and cybersecurity students need more than a note-taking laptop: enough RAM for virtual machines, an x86 or Apple-silicon chip that runs course tools, a keyboard built for long coding sessions and battery life for a full day on campus. We ranked laptops under $2,000 CAD by our programming score.",
    criteria: "We include Intel, AMD and Apple laptops under $2,000 CAD with at least 16 GB RAM, ranked by our programming use-case score, then value.",
    filter: (l) => l.os !== "ChromeOS" && l.cpuBrand !== "Qualcomm" && l.ram >= 16 && l.useCases.programming >= 6.5 && l.currentPrice <= 2000,
  },
  {
    slug: "linux",
    navLabel: "Best for Linux",
    title: "Best Laptops for Linux in Canada",
    h1: "The Best Laptops for Linux in Canada (2026)",
    group: "use-case",
    intro: "The best laptop for Linux uses an Intel or AMD chip with integrated graphics, the combination with the most mature open-source drivers in Ubuntu, Fedora and other distros. We test each laptop with the operating system it ships with, then shortlisted the Intel and AMD models with integrated graphics and ranked them by our programming score.",
    criteria: "We include Intel and AMD laptops with integrated graphics, ranked by our programming use-case score, then by ports. Apple silicon, Snapdragon and Chromebooks are excluded because mainstream Linux support for them is limited.",
    filter: (l) => (l.cpuBrand === "Intel" || l.cpuBrand === "AMD") && l.os === "Windows 11" && l.gpuType === "Integrated" && l.useCases.programming >= 7.5,
  },
  {
    slug: "graphic-design",
    navLabel: "Best for Graphic Design",
    title: "Best Laptops for Graphic Design in Canada",
    h1: "The Best Laptops for Graphic Design in Canada (2026)",
    group: "use-case",
    intro: "Graphic design needs a colour-accurate, wide-gamut screen first and enough performance for Photoshop, Illustrator and InDesign second. Every laptop here covers at least 95% of DCI-P3 with a measured Delta E of 1.5 or lower, and we ranked them on display and performance scores combined.",
    criteria: "We include laptops with 16 GB RAM or more, at least 95% DCI-P3 and a Delta E of 1.5 or lower, ranked by display plus performance score.",
    filter: (l) => l.os !== "ChromeOS" && l.ram >= 16 && l.test.colorGamutDCIP3 >= 95 && l.test.colorAccuracyDeltaE <= 1.5,
  },
  {
    slug: "seniors",
    navLabel: "Best for Seniors",
    title: "Best Laptops for Seniors in Canada",
    h1: "The Best Laptops for Seniors & Older Adults in Canada (2026)",
    group: "use-case",
    intro: "A good laptop for seniors has a bright, easy-to-read screen, a comfortable keyboard, a simple operating system and a fair price. Every pick here has a screen of 13.6 inches or larger that measured at least 300 nits, costs under $1,800 CAD, and scored 7/10 or higher for its keyboard.",
    criteria: "We include laptops under $1,800 CAD with screens of 13.6 inches or larger, at least 300 nits brightness and a keyboard score of 7/10 or higher, ranked by overall score plus value.",
    filter: (l) => l.gpuType === "Integrated" && l.currentPrice <= 1800 && l.screenSize >= 13.6 && l.test.brightnessNits >= 300 && l.scores.keyboard >= 7,
  },
  {
    slug: "day-trading",
    navLabel: "Best for Day Trading",
    title: "Best Laptops for Day Trading in Canada",
    h1: "The Best Laptops for Day Trading & Stock Trading in Canada (2026)",
    group: "use-case",
    intro: "Day trading is about driving multiple monitors and keeping charting platforms responsive, so ports and multi-core speed matter more than battery life. Every pick runs Windows on Intel or AMD, has 16 GB RAM or more, and has both HDMI and Thunderbolt or USB4 for external displays.",
    criteria: "We include Windows laptops on Intel or AMD with 16 GB+ RAM, HDMI and Thunderbolt or USB4, ranked by ports score plus performance score.",
    filter: (l) =>
      l.os === "Windows 11" && l.cpuBrand !== "Qualcomm" && l.ram >= 16 &&
      l.ports.some((p) => /HDMI/.test(p)) && l.ports.some((p) => /Thunderbolt|USB4/.test(p)),
  },
  {
    slug: "architecture",
    navLabel: "Best for Architecture & CAD",
    title: "Best Laptops for Architecture & CAD in Canada",
    h1: "The Best Laptops for Architecture, AutoCAD & SolidWorks in Canada (2026)",
    group: "use-case",
    intro: "Architecture and CAD work (AutoCAD, Revit, SolidWorks, Rhino, SketchUp and rendering) needs a dedicated NVIDIA GPU, a fast multi-core CPU and Windows, because Revit and SolidWorks do not run natively on macOS. We ranked every Windows laptop with a discrete GPU by our workstation score.",
    criteria: "We include Windows laptops with a dedicated GPU and 16 GB+ RAM, ranked by our workstation use-case score, then Cinebench multi-core result.",
    filter: (l) => l.os === "Windows 11" && l.gpuType === "Discrete" && l.ram >= 16,
  },
  {
    slug: "writers",
    navLabel: "Best for Writers",
    title: "Best Laptops for Writers in Canada",
    h1: "The Best Laptops for Writers & Authors in Canada (2026)",
    group: "use-case",
    intro: "Writers need a keyboard that stays comfortable for thousands of words, battery life that outlasts a long session at a café or library, and a sharp screen that is easy on the eyes. Every laptop here scored 7.6/10 or higher in our keyboard test and lasted at least 11 hours in our battery test.",
    criteria: "We include laptops with a keyboard score of 7.6/10 or higher and 11+ hours of web-browsing battery life, ranked by keyboard score, then battery life.",
    filter: (l) => l.scores.keyboard >= 7.6 && l.test.batteryWebHours >= 11,
  },
  {
    slug: "accounting",
    navLabel: "Best for Accounting",
    title: "Best Laptops for Accounting in Canada",
    h1: "The Best Laptops for Accounting & Accounting Students in Canada (2026)",
    group: "use-case",
    intro: "Accountants and accounting students live in Excel, and Canadian accounting software such as Sage 50 and most tax packages are Windows-first. Every pick runs Windows 11 with 16 GB RAM; we ranked them by our business score plus value, because a spreadsheet laptop does not need a gaming GPU.",
    criteria: "We include Windows laptops with integrated graphics and 16 GB RAM, ranked by business use-case score plus value score.",
    filter: (l) => l.os === "Windows 11" && l.gpuType === "Integrated" && l.ram >= 16 && l.useCases.business >= 6.8,
  },
  {
    slug: "watching-movies",
    navLabel: "Best for Watching Movies",
    title: "Best Laptops for Watching Movies in Canada",
    h1: "The Best Laptops for Watching Movies & Streaming in Canada (2026)",
    group: "use-case",
    intro: "For movies and streaming, the screen and video battery life matter most. Every laptop here scored 8.4/10 or higher in our display testing and lasted at least 12 hours in our video-playback battery test, so you can finish a season of a show unplugged.",
    criteria: "We include laptops with a display score of 8.4/10 or higher and 12+ hours of video-playback battery life, ranked by display score, then video battery life.",
    filter: (l) => l.scores.display >= 8.4 && l.test.batteryVideoHours >= 12,
  },
  {
    slug: "small-business",
    navLabel: "Best for Small Business",
    title: "Best Laptops for Small Business in Canada",
    h1: "The Best Laptops for Small Business Owners in Canada (2026)",
    group: "use-case",
    intro: "A small-business laptop has to do everything (bookkeeping, email, video calls, invoicing and the odd presentation) without an IT department behind it. We ranked Windows and Mac laptops under $2,200 CAD by our business score plus value.",
    criteria: "We include Windows and macOS laptops under $2,200 CAD with a business use-case score of 8.4/10 or higher, ranked by business score plus value score.",
    filter: (l) => l.os !== "ChromeOS" && l.useCases.business >= 8.4 && l.currentPrice <= 2200,
  },
  {
    slug: "high-school-students",
    navLabel: "Best for High School",
    title: "Best Laptops for High School Students in Canada",
    h1: "The Best Laptops for High School Students in Canada (2026)",
    group: "use-case",
    intro: "High school students need a laptop that survives a backpack, lasts the school day and runs Google Classroom, Docs and Microsoft 365, at a price parents can live with. Every pick costs $1,400 CAD or less and scored 8/10 or higher on our school use-case score.",
    criteria: "We include laptops at or under $1,400 CAD with a school use-case score of 8/10 or higher, ranked by school score plus value, then price.",
    filter: (l) => l.gpuType === "Integrated" && l.currentPrice <= 1400 && l.useCases.school >= 8,
  },
  {
    slug: "teachers",
    navLabel: "Best for Teachers",
    title: "Best Laptops for Teachers in Canada",
    h1: "The Best Laptops for Teachers in Canada (2026)",
    group: "use-case",
    intro: "Teachers need a laptop that plugs straight into a classroom projector or TV, lasts a full teaching day and handles marking, slides and video calls. Every pick has an HDMI port (on the Framework Laptop 13, via an expansion card), lasted at least 11 hours in our battery test and costs $2,200 CAD or less.",
    criteria: "We include laptops with HDMI, 11+ hours of web-browsing battery life and a price at or under $2,200 CAD, ranked by overall score plus value.",
    filter: (l) => l.gpuType === "Integrated" && l.ports.some((p) => /HDMI/.test(p)) && l.test.batteryWebHours >= 11 && l.currentPrice <= 2200,
  },
  // Search Console expansion (Nov 2026): size, power, travel and price-tier
  // intents that were earning impressions without a matching list.
  {
    slug: "small",
    navLabel: "Best Small Laptops",
    title: "Best Small Laptops in Canada",
    h1: "The Best Small Laptops in Canada (2026)",
    group: "size",
    intro: "A small laptop should disappear into a bag and fit a cramped desk or tray table without feeling cramped to use. We measured every laptop we have tested and ranked the ones with a screen of 14 inches or less, a footprint under 685 cm² and a weight under 1.35 kg from smallest to largest.",
    criteria: "We include laptops with a screen of 14 inches or smaller, a footprint under 685 cm², a weight under 1.35 kg and an overall score of 7.5/10 or higher, ranked by footprint.",
    filter: (l) => l.screenSize <= 14 && l.weightKg < 1.35 && footprintCm2(l) <= 685 && l.overall >= 7.5,
  },
  {
    slug: "powerful",
    navLabel: "Most Powerful Laptops",
    title: "Most Powerful Laptops in Canada",
    h1: "The Most Powerful Laptops in Canada (2026)",
    group: "use-case",
    intro: "These are the fastest laptops we have tested, ranked by Cinebench multi-core score, the benchmark that best predicts how quickly a laptop gets through heavy work like video exports, code compiles and 3D renders. Every pick scored 15,000 or higher; we also list gaming and export results so you can see where each one's power goes.",
    criteria: "We include every laptop that scored 15,000 or higher in Cinebench multi-core, ranked by that score.",
    filter: (l) => l.test.cinebenchMulti >= 15000,
  },
  {
    slug: "travel",
    navLabel: "Best Travel Laptops",
    title: "Best Travel Laptops in Canada",
    h1: "The Best Laptops for Travel in Canada (2026)",
    group: "use-case",
    intro: "A travel laptop has to be light enough to carry all day and last a long-haul flight without a charger. Every pick weighs 1.4 kg or less and lasted at least 13 hours in our web-browsing battery test; we ranked them by our travel score, which also weighs build quality and charging.",
    criteria: "We include Windows and macOS laptops that weigh 1.4 kg or less and lasted 13+ hours in our web-browsing battery test, ranked by our travel use-case score, then battery life.",
    filter: (l) => l.os !== "ChromeOS" && l.weightKg <= 1.4 && l.test.batteryWebHours >= 13,
  },
  {
    slug: "premium",
    navLabel: "Best Premium Laptops",
    title: "Best Premium Laptops in Canada",
    h1: "The Best Premium Laptops in Canada (2026)",
    group: "price",
    intro: "If you are spending $1,800 CAD or more, the laptop should excel at everything: build, screen, keyboard, speed and battery life. These are the highest-scoring laptops we have tested at that price, with build quality as the tie-breaker, and we flag where a cheaper laptop does the same job.",
    criteria: "We include laptops priced at $1,800 CAD or more that scored 8/10 or higher overall, ranked by overall score, then build quality.",
    filter: (l) => l.currentPrice >= 1800 && l.overall >= 8,
  },
];

// Merge hand-written SEO content (sections, FAQ, metric, sort, related links).
export const bestCategories: BestCategory[] = baseCategories.map((c) => ({ ...c, ...categoryContent[c.slug] }));


export function getBestCategory(slug: string): BestCategory | undefined {
  return bestCategories.find((c) => c.slug === slug);
}

export function categoryPicks(c: BestCategory): Laptop[] {
  // Imported lazily to avoid a cycle at module top-level.
  const { laptops } = require("./laptops") as typeof import("./laptops");
  return laptops
    .filter((l: Laptop) => l.status === "published" && c.filter(l))
    .sort(c.sort ?? ((a: Laptop, b: Laptop) => b.overall - a.overall));
}
