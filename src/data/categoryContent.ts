import type { BestCategory, Laptop } from "@/lib/types";
import { laptops } from "./laptops";

// Per-list SEO content layered onto `bestCategories`.
//
// Pattern (from the SEO playbook): each list gets
//   - a data-driven title/answer (generated in the page template),
//   - one "key metric" that the list is really about, shown in a crawlable table,
//   - question-phrased H2 sections, one per sub-intent seen in Search Console / Semrush,
//   - a short FAQ with quotable (<50 word) answers, emitted as FAQPage schema,
//   - hand-picked sibling lists for internal linking.
//
// Section and FAQ copy only cites numbers that exist in src/data/laptops.ts.

type Content = Partial<Pick<BestCategory, "seoTitle" | "sort" | "metric" | "sections" | "faq" | "related" | "quickAnswer" | "rankedBy">>;

const byOverall = (a: Laptop, b: Laptop) => b.overall - a.overall;
const fpsPerDollar = (l: Laptop) => l.test.gamingFps1080pHigh / l.currentPrice;
const cad = (n: number) => `$${Math.round(n).toLocaleString("en-CA")}`;
const price = (l: Laptop) => {
  const stocked = l.retailers.filter((r) => r.inStock).map((r) => r.price);
  return stocked.length ? Math.min(...stocked) : l.currentPrice;
};
const bestBuyPrice = (l: Laptop) => l.retailers.find((r) => r.name === "Best Buy Canada")?.price ?? l.currentPrice;
/** Overall-score points per $1,000 CAD. */
export const pointsPerK = (l: Laptop, p = price(l)) => (l.overall / p) * 1000;

// Brand ranking for the "best laptop brands" list: brands ranked by the median
// score of their tested models, so the page ranks brands, not the same laptops
// as the main "best laptops" list.
const published = laptops.filter((l) => l.status === "published");
const median = (xs: number[]) => {
  const s = xs.slice().sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};
export const brandRanking = Array.from(new Set(published.map((l) => l.brandSlug)))
  .map((slug) => {
    const models = published.filter((l) => l.brandSlug === slug).sort(byOverall);
    return {
      slug,
      name: models[0].brand,
      count: models.length,
      median: median(models.map((m) => m.overall)),
      best: models[0],
      priceMin: Math.min(...models.map(price)),
      priceMax: Math.max(...models.map(price)),
    };
  })
  .sort((a, b) => b.median - a.median || b.best.overall - a.best.overall);
const brandOf = (l: Laptop) => brandRanking.find((b) => b.slug === l.brandSlug)!;

export const metrics = {
  battery: { label: "Battery (web, hrs)", value: (l: Laptop) => `${l.test.batteryWebHours} h` },
  weight: { label: "Weight", value: (l: Laptop) => `${l.weightKg} kg` },
  exportTime: { label: "4K export", value: (l: Laptop) => `${l.test.videoExportMinutes} min` },
  fps: { label: "1080p High FPS", value: (l: Laptop) => `${l.test.gamingFps1080pHigh} fps` },
  p3: { label: "DCI-P3 gamut", value: (l: Laptop) => `${l.test.colorGamutDCIP3}%` },
  noise: { label: "Fan noise (load)", value: (l: Laptop) => (l.test.loadNoiseDb === 0 ? "Silent (fanless)" : `${l.test.loadNoiseDb} dB`) },
  value: { label: "Value score", value: (l: Laptop) => `${l.scores.value.toFixed(1)}/10` },
  keyboard: { label: "Keyboard score", value: (l: Laptop) => `${l.scores.keyboard.toFixed(1)}/10` },
  screen: { label: "Screen", value: (l: Laptop) => `${l.screenSize}" ${l.panelType.split(" ")[0]}` },
  bestBuy: {
    label: "Best Buy price",
    value: (l: Laptop) => {
      const r = l.retailers.find((x) => x.name === "Best Buy Canada");
      return r ? `$${r.price.toLocaleString("en-CA")}` : "—";
    },
  },
} satisfies Record<string, NonNullable<BestCategory["metric"]>>;

export const categoryContent: Record<string, Content> = {
  laptop: {
    seoTitle: "Best Laptops in Canada (2026): Tested & Ranked by Our Lab",
    metric: metrics.battery,
    related: ["budget", "student", "gaming", "business", "macbook", "windows", "under-1000", "long-battery-life"],
    sections: [
      {
        heading: "What is the best laptop to buy in 2026?",
        body: [
          "For most people the best laptop in 2026 is a 13- to 15-inch machine with an efficient chip (Apple M4, Intel Core Ultra 200V, Snapdragon X or AMD Ryzen AI), 16 GB of RAM, a 512 GB SSD and at least 12 hours of real battery life. Every pick above meets that bar in our testing.",
          "If you need a GPU for games or 3D work, skip to our [best gaming laptops](/laptop/reviews/best/gaming); if your budget is tight, our [best budget laptops](/laptop/reviews/best/budget) start under $500.",
        ],
      },
      {
        heading: "Which laptop brand is the most reliable?",
        body: [
          "No single brand wins every category. Apple leads on battery life and build, Lenovo's ThinkPad line on keyboards and business durability, ASUS on value across Zenbook and ROG, and Acer on budget pricing. Pick the model, not the logo: see our [laptop brand rankings](/laptop/reviews/best/brands) and [brand guides](/laptop/brands).",
        ],
      },
      {
        heading: "How much should you spend on a laptop in Canada?",
        body: [
          "Around $900–$1,500 CAD buys the best balance of speed, screen and battery for most buyers. Under $700 expect compromises in display and build; above $2,000 you pay for dedicated graphics, premium materials or pro-grade screens. Browse by budget: [under $500](/laptop/reviews/best/under-500), [under $1,000](/laptop/reviews/best/under-1000) and [under $1,500](/laptop/reviews/best/under-1500).",
        ],
      },
      {
        heading: "Should you buy a 2025 laptop in 2026?",
        body: [
          "Yes, if it is discounted. 2025 models with Intel Core Ultra, Apple M4 or Ryzen AI chips are still fast, and last year's stock is often the best deal in Canada around Black Friday and Boxing Day. Avoid anything with 8 GB of RAM on Windows. See [when to buy a laptop in Canada](/laptop/learn/when-is-the-best-time-to-buy-a-laptop-in-canada).",
        ],
      },
    ],
    faq: [
      { q: "What is the most recommended laptop brand?", a: "Apple, Lenovo and ASUS score highest in our testing overall. Apple leads on battery life, Lenovo ThinkPads on keyboards, and ASUS on value. The right brand depends on your budget and whether you need Windows or macOS." },
      { q: "What laptop should I buy for everyday use?", a: "A 14-inch Windows ultraportable or a MacBook Air with 16 GB RAM covers browsing, Office, streaming and video calls for years. Expect to pay $900–$1,400 CAD for a model that lasts." },
      { q: "Is 16 GB of RAM enough in 2026?", a: "Yes. 16 GB is the right amount for most people in 2026, including students and office work. Choose 32 GB for video editing, large code builds or heavy multitasking." },
      { q: "Mac or Windows: which is better?", a: "Macs win on battery life, speakers and build quality. Windows laptops win on choice, gaming and lower entry prices. Pick based on the software you rely on. See our MacBook vs Windows guide." },
    ],
  },

  student: {
    seoTitle: "Best Laptops for Students in Canada (2026): Tested Picks from $449",
    metric: metrics.battery,
    sort: (a, b) => b.useCases.school - a.useCases.school,
    related: ["university-students", "college", "engineering-students", "budget", "chromebook", "macbook", "long-battery-life", "lightweight"],
    sections: [
      {
        heading: "What is the best laptop for students in 2026?",
        body: [
          "The best student laptop lasts a full day of classes on one charge, weighs under 1.5 kg and has 16 GB of RAM. In our testing the MacBook Air 13 (M4) ran 18 hours in our web-browsing battery test, the longest of any student pick.",
          "On a tighter budget, a Chromebook Plus or the Acer Swift Go 14 covers note-taking, Google Docs, Microsoft 365 and video calls for well under $1,000.",
        ],
      },
      {
        heading: "Should a student get a MacBook, Windows laptop or Chromebook?",
        body: [
          "Check your program first. Engineering, architecture and some business courses require Windows-only software, so a MacBook can be the wrong choice. Arts, humanities and general-science students do well on a MacBook Air. Chromebooks suit high-school and web-only coursework. See [Chromebook vs Windows](/laptop/learn/chromebook-vs-windows-laptop) and [MacBook vs Windows](/laptop/learn/macbook-vs-windows-laptop).",
        ],
      },
      {
        heading: "What is the best cheap laptop for students?",
        body: [
          "Under $500, the Chromebook Plus models we tested are the only laptops that still feel quick. Between $700 and $1,000, the Acer Swift Go 14 and Aspire 5 add Windows and a bigger screen. See all [budget laptops](/laptop/reviews/best/budget).",
        ],
      },
      {
        heading: "Do Canadian students get laptop discounts?",
        body: [
          "Yes. Apple's education pricing, Microsoft, Dell, Lenovo and HP student stores, and back-to-school sales at Best Buy Canada (July–September) regularly take $100–$300 off. Black Friday prices are often lower still.",
        ],
      },
    ],
    faq: [
      { q: "How much should a student spend on a laptop?", a: "Most Canadian students should budget $700–$1,400 CAD. That buys 16 GB RAM, an SSD and all-day battery. Spend more only if your program needs a GPU, such as engineering, design or video." },
      { q: "Is a gaming laptop good for school?", a: "It works, but gaming laptops are heavier and last 6–8 hours on battery versus 13–18 hours for student ultraportables. Buy one only if you also game or do 3D work." },
      { q: "Is a Chromebook good enough for university?", a: "For writing, research and web apps, yes. For programs that need Windows or macOS software, such as engineering CAD, statistics packages or Adobe apps, no. Check your course list first." },
      { q: "What size laptop is best for students?", a: "13 to 14 inches is the sweet spot: light enough to carry all day with a screen big enough for split-screen note-taking." },
    ],
  },

  gaming: {
    seoTitle: "Best Gaming Laptops in Canada (2026): Ranked by Real FPS",
    metric: metrics.fps,
    related: ["budget-gaming", "16-inch", "video-editing", "asus", "lenovo", "under-1500"],
    sections: [
      {
        heading: "What is the best gaming laptop in 2026?",
        body: [
          "We rank gaming laptops on average 1080p High frame rates across our game suite, then weigh thermals, display and price. The MSI Stealth 16 AI Studio led our suite at 122 fps with an RTX 4080; the Lenovo Legion Pro 5 hit 118 fps for $500 less.",
        ],
      },
      {
        heading: "Which GPU do you need for 1080p and 1440p gaming?",
        body: [
          "An RTX 4060 or RTX 5060 runs most games at 1080p High above 60 fps. Step up to an RTX 4070/5070 or better for 1440p or 165 Hz+ panels. GPU wattage matters as much as the model name: a 140 W RTX 4070 is noticeably faster than a 60 W one.",
        ],
      },
      {
        heading: "What is the best cheap gaming laptop?",
        body: [
          "The ASUS TUF Gaming A15 averaged 104 fps in our 1080p suite for about $1,299 CAD, the most frames per dollar we have measured. See all [cheap gaming laptops](/laptop/reviews/best/budget-gaming).",
        ],
      },
    ],
    faq: [
      { q: "How much is a good gaming laptop in Canada?", a: "Expect $1,200–$1,600 CAD for an RTX 4060-class laptop that runs modern games at 1080p, and $2,300–$3,300 for RTX 4070/4080/5070 models." },
      { q: "Do gaming laptops have good battery life?", a: "Not usually. Our gaming picks lasted 6–9 hours browsing the web and far less while gaming. Plan to game plugged in." },
      { q: "Is 16 GB of RAM enough for gaming?", a: "16 GB is enough for most games in 2026. 32 GB helps if you stream, keep many browser tabs open, or also edit video." },
    ],
  },

  "budget-gaming": {
    seoTitle: "Best Cheap Gaming Laptops in Canada (2026): Most FPS per Dollar",
    metric: metrics.fps,
    sort: (a, b) => fpsPerDollar(b) - fpsPerDollar(a),
    related: ["gaming", "budget", "under-1500", "under-1000", "asus", "lenovo"],
    sections: [
      {
        heading: "How we rank cheap gaming laptops",
        body: [
          "This list is sorted by frames per dollar: our average 1080p High frame rate divided by the lowest current Canadian price. It rewards laptops that game well for the money, not just the fastest machines.",
        ],
      },
      {
        heading: "What is the best cheap gaming laptop in Canada?",
        body: [
          "The ASUS TUF Gaming A15 is the best-value gaming laptop we have tested: an RTX 4060 at 115 W averaged 104 fps at 1080p High for around $1,299 CAD. Its dim, low-gamut screen is the trade-off.",
        ],
      },
      {
        heading: "Can you get a good gaming laptop under $1,000?",
        body: [
          "Rarely at full price. RTX 4050/4060 laptops dip to $900–$1,100 CAD during Black Friday and Boxing Day sales. Outside of sales, aim for $1,200–$1,400 for a laptop that will still run new games in three years. Check our [laptop deals](/laptop/deals).",
        ],
      },
      {
        heading: "What should you not compromise on in a budget gaming laptop?",
        body: [
          "Prioritise GPU wattage, 16 GB of dual-channel RAM, and a 144 Hz screen. Cut back on build materials, speakers, webcam and battery life instead. Avoid 8 GB RAM and single-channel memory configurations.",
        ],
      },
    ],
    faq: [
      { q: "What is the cheapest good gaming laptop?", a: "In our testing, the ASUS TUF Gaming A15 (about $1,299 CAD) delivers the most frames per dollar, averaging 104 fps at 1080p High with an RTX 4060." },
      { q: "Is an RTX 4050 good enough for gaming?", a: "For 1080p at Medium to High settings in most games, yes. Its 6 GB of VRAM is the weak point in newer titles, so an RTX 4060 is the safer buy." },
      { q: "When are gaming laptops cheapest in Canada?", a: "Black Friday, Boxing Day and back-to-school (July–September) bring the deepest discounts, often $200–$400 off RTX 4060 models." },
    ],
  },

  "video-editing": {
    seoTitle: "Best Laptops for Video Editing (2026): Ranked by 4K Export Time",
    metric: metrics.exportTime,
    sort: (a, b) => a.test.videoExportMinutes - b.test.videoExportMinutes,
    related: ["photo-editing", "music-production", "macbook", "gaming", "16-inch", "programming"],
    sections: [
      {
        heading: "What is the best laptop for video editing?",
        body: [
          "The MacBook Pro 14 (M4 Pro) is the best laptop for video editing we have tested. It exported our 10-minute 4K timeline in 2.6 minutes, the fastest result in our lab, while lasting 16.8 hours on battery and staying quiet at 32 dB under load.",
          "This list is ranked by that 4K export time, so the order reflects real editing speed rather than spec sheets.",
        ],
      },
      {
        heading: "What is the best Windows laptop for video editing?",
        body: [
          "The MSI Stealth 16 AI Studio (RTX 4080) exported our 4K timeline in 3.0 minutes, the fastest Windows result, and the HP OMEN Transcend 14 (RTX 5070) did it in 3.2 minutes in a lighter 14-inch body. Both have 100% DCI-P3 OLED screens. NVIDIA GPUs also speed up Premiere Pro and DaVinci Resolve effects.",
        ],
      },
      {
        heading: "What is the best laptop for video editing and gaming?",
        body: [
          "A gaming laptop with a colour-accurate screen does both. The Lenovo Legion Pro 5 averaged 118 fps in our game suite and exported 4K in 3.4 minutes. The ASUS ROG Zephyrus G14 adds a 100% DCI-P3 OLED panel at 1.5 kg. See all [gaming laptops](/laptop/reviews/best/gaming).",
        ],
      },
      {
        heading: "What is the best budget laptop for video editing?",
        body: [
          "The ASUS TUF Gaming A15 exported our 4K test in 4.4 minutes for about $1,299 CAD, faster than some laptops twice the price. Its screen covers only 46% of DCI-P3, so pair it with a calibrated external monitor for colour work.",
        ],
      },
      {
        heading: "What specs do you need for 4K video editing?",
        body: [
          "For 1080p editing: a modern 8-core CPU, 16 GB RAM and a 512 GB SSD. For 4K: 32 GB RAM (or 24 GB+ unified memory on Apple silicon), a dedicated NVIDIA RTX GPU or an Apple M4 Pro/Max, a 1 TB+ SSD, and a screen covering at least 95% of DCI-P3. Fast storage and RAM matter more than CPU clock speed for smooth timeline scrubbing.",
        ],
      },
      {
        heading: "Is a MacBook better than Windows for video editing?",
        body: [
          "For Final Cut Pro and long editing sessions on battery, yes: Apple silicon keeps full speed unplugged. For Premiere Pro, DaVinci Resolve with CUDA, or editing plus gaming, a Windows laptop with an RTX GPU is equal or faster and often cheaper. See [MacBook vs Windows](/laptop/learn/macbook-vs-windows-laptop).",
        ],
      },
    ],
    faq: [
      { q: "How much RAM do I need for video editing?", a: "16 GB handles 1080p editing. For 4K, multicam or heavy effects, get 32 GB on Windows or at least 24 GB of unified memory on a MacBook Pro." },
      { q: "Is a gaming laptop good for video editing?", a: "Yes. Gaming laptops have the RTX GPUs and cooling that editing software uses. Check the screen: many budget gaming panels have poor colour coverage." },
      { q: "Can a MacBook Air edit 4K video?", a: "Yes. The MacBook Air 13 (M4) exported our 4K timeline in 7.2 minutes. It is fine for occasional 4K edits but throttles on long exports, so a MacBook Pro suits daily editing." },
      { q: "What is the best laptop for video and photo editing?", a: "The MacBook Pro 14 (M4 Pro) is our top pick for both: 2.6-minute 4K exports and a 99% DCI-P3 Mini-LED screen with a measured Delta E of 0.8." },
      { q: "What is the best laptop for video editing under $1,500?", a: "The ASUS TUF Gaming A15 (about $1,299 CAD) is the fastest editor we have tested under $1,500, exporting 4K in 4.4 minutes." },
    ],
  },

  "photo-editing": {
    metric: metrics.p3,
    sort: (a, b) => b.test.colorGamutDCIP3 - a.test.colorGamutDCIP3 || a.test.colorAccuracyDeltaE - b.test.colorAccuracyDeltaE,
    related: ["video-editing", "macbook", "2-in-1", "touchscreen", "music-production"],
    sections: [
      {
        heading: "What makes a laptop good for photo editing?",
        body: [
          "Screen first, speed second. Look for at least 95% DCI-P3 coverage and a measured Delta E under 2, then 16 GB RAM or more for Lightroom catalogues and Photoshop layers. This list is ranked by the colour gamut we measured on each panel.",
        ],
      },
    ],
    faq: [
      { q: "Is OLED good for photo editing?", a: "Yes. The OLED laptops we tested covered 98–100% of DCI-P3 with Delta E around 1, which is excellent for editing. Watch for glossy reflections and use the sRGB mode for web work." },
    ],
  },

  "music-production": {
    seoTitle: "Best Laptops for Music Production (2026): Quiet, Low-Latency Picks",
    metric: metrics.noise,
    related: ["video-editing", "macbook", "programming", "long-battery-life", "photo-editing"],
    sections: [
      {
        heading: "What is the best laptop for music production?",
        body: [
          "A MacBook Pro or MacBook Air is the safest choice for music production: Core Audio gives low, stable latency without extra drivers, and Apple silicon stays quiet. The MacBook Pro 14 (M4 Pro) measured 32 dB under full load, and the MacBook Air models are fanless and silent.",
        ],
      },
      {
        heading: "What specs do you need for FL Studio and Ableton?",
        body: [
          "16 GB RAM is the floor for sample-heavy projects; 24–32 GB if you run large orchestral libraries. Prioritise single-core speed for real-time plug-ins, an SSD of 1 TB+ for sample libraries, and enough USB-C/Thunderbolt ports for your audio interface and controllers.",
        ],
      },
      {
        heading: "What is the best budget laptop for music production?",
        body: [
          "A MacBook Air 13 (M4) is the cheapest laptop we recommend for serious production: silent, 16 GB RAM, and fast enough for dozens of tracks. On Windows, choose a Ryzen 7 or Core Ultra 7 laptop with 16 GB RAM and check fan noise in our reviews before buying. Avoid Chromebooks; most DAWs do not run on ChromeOS.",
        ],
      },
    ],
    faq: [
      { q: "Is Mac or Windows better for music production?", a: "Mac is simpler: Logic Pro is Mac-only and Core Audio is low-latency out of the box. Windows works well with ASIO drivers and offers more choice at each price." },
      { q: "Can a laptop under $500 run FL Studio?", a: "Light projects, yes, but Chromebooks cannot run FL Studio natively. A Windows laptop with 8–16 GB RAM is the minimum; expect limits with heavy plug-ins." },
      { q: "Why does fan noise matter for music production?", a: "Fan noise leaks into microphone recordings and masks quiet detail when mixing on headphones or monitors. Fanless or quiet laptops make tracking easier." },
    ],
  },

  budget: {
    seoTitle: "Best Budget Laptops in Canada (2026): Tested Picks Under $1,300",
    metric: { label: "Points per $1,000", value: (l: Laptop) => pointsPerK(l).toFixed(1) },
    // Most test-score per dollar; /best/under-1000 ranks the best laptop under a fixed cap instead.
    sort: (a, b) => pointsPerK(b) - pointsPerK(a),
    rankedBy: "overall test score per $1,000 CAD, so the cheapest good laptops rise to the top",
    related: ["under-500", "under-1000", "budget-gaming", "chromebook", "student", "home-use"],
    sections: [
      {
        heading: "What is the best budget laptop in 2026?",
        body: [
          "Per dollar, the Acer Chromebook Plus 514 is the best budget laptop we have tested: 16.2 hours in our battery test for under $500 CAD. If you need Windows, the Acer Swift Go 14 is the best budget pick, with an OLED screen, 16 GB RAM and 13.8 hours of battery life for under $1,000.",
        ],
      },
      {
        heading: "What should you avoid in a cheap laptop?",
        body: [
          "Avoid Windows laptops with 8 GB of RAM, eMMC storage or a 1366×768 screen; they feel slow within a year. A Chromebook with 8 GB RAM is fine because ChromeOS is lighter.",
        ],
      },
    ],
    faq: [
      { q: "What is a good cheap laptop in Canada?", a: "Under $500, a Chromebook Plus. Around $750, the Acer Aspire 5 for Windows. Under $1,000, the Acer Swift Go 14, which adds an OLED screen and all-day battery." },
      { q: "Are cheap laptops worth it?", a: "Yes, if you match them to light use: web, documents, streaming and video calls. Spend more if you edit photos or video, game, or keep laptops five years or more." },
    ],
  },

  business: {
    seoTitle: "Best Laptops for Work & Business in Canada (2026), Tested",
    metric: metrics.keyboard,
    sort: (a, b) => b.useCases.business - a.useCases.business || byOverall(a, b),
    rankedBy: "our business use-case score (keyboard, battery, webcam and build), Windows and macOS",
    related: ["working-from-home", "lightweight", "long-battery-life", "windows", "lenovo", "dell"],
    sections: [
      {
        heading: "What is the best laptop for work?",
        body: [
          "The best work laptop has a great keyboard, a sharp webcam, all-day battery and enterprise security. The Lenovo ThinkPad X1 Carbon Gen 12 scored 9.4/10 for its keyboard, the highest we have measured, and weighs just 1.09 kg.",
        ],
      },
      {
        heading: "Business laptop vs consumer laptop: what's the difference?",
        body: [
          "Business models (ThinkPad, Latitude, EliteBook) add vPro or Pro management, TPM and smart-card options, spill-resistant keyboards, longer warranties and on-site service. Consumer laptops are cheaper for the same speed but harder for IT to manage.",
        ],
      },
    ],
    faq: [
      { q: "What is the best laptop for office work?", a: "Any 14-inch laptop with 16 GB RAM and a good keyboard handles Office and Teams. The ThinkPad X1 Carbon and ASUS Zenbook 14 OLED are our favourites." },
      { q: "Is a MacBook good for business?", a: "Yes for most office and creative roles. Check that your company's software, VPN and device management support macOS first." },
    ],
  },

  "long-battery-life": {
    seoTitle: "Laptops With the Best Battery Life (2026): Up to 18 Hours, Tested",
    metric: metrics.battery,
    sort: (a, b) => b.test.batteryWebHours - a.test.batteryWebHours,
    related: ["student", "lightweight", "macbook", "business", "chromebook", "13-inch"],
    sections: [
      {
        heading: "Which laptop has the longest battery life?",
        body: [
          "The MacBook Air 15 (M4) lasted 18.4 hours in our web-browsing test, the longest of any laptop we have tested, followed by the MacBook Air 13 (M4) at 18 hours. The best Windows result was the Surface Laptop 7 at 16 hours.",
          "This list is sorted by our web-browsing battery result, not manufacturer claims.",
        ],
      },
      {
        heading: "How do we test laptop battery life?",
        body: [
          "We loop a scripted set of real websites over Wi-Fi at a fixed 150-nit brightness until the laptop shuts down, and separately loop 1080p video. That gives comparable numbers across brands. See [how we test](/laptop/learn/how-we-test).",
        ],
      },
      {
        heading: "What is the best Windows laptop for battery life?",
        body: [
          "Snapdragon X and Intel Core Ultra 200V laptops lead Windows battery life. The Surface Laptop 7 ran 16 hours, the ASUS Zenbook 14 OLED 15.6 hours and the Dell XPS 13 15.2 hours.",
        ],
      },
      {
        heading: "How can you make a laptop battery last longer?",
        body: [
          "Lower the brightness, use battery saver, close background apps, and limit charging to 80% if your laptop supports it. See [how to extend battery life on Windows](/laptop/learn/extend-battery-life-windows).",
        ],
      },
    ],
    faq: [
      { q: "How many hours of battery life is good for a laptop?", a: "In our tests, 10+ hours of web browsing is good, 14+ is excellent and 18 is the best available. Gaming laptops typically manage 6–9 hours." },
      { q: "Do Windows laptops have good battery life now?", a: "Yes. Snapdragon X and Intel Core Ultra 200V laptops lasted 15–16 hours in our tests, close to MacBook Air territory." },
      { q: "Does battery life get worse over time?", a: "Yes. Most laptop batteries keep about 80% of capacity after 300–500 full cycles. Limiting the charge to 80% slows wear." },
    ],
  },

  lightweight: {
    seoTitle: "Best Lightweight Laptops in Canada (2026): Under 1.3 kg, Tested",
    metric: metrics.weight,
    sort: (a, b) => a.weightKg - b.weightKg,
    related: ["13-inch", "14-inch", "long-battery-life", "business", "student", "2-in-1"],
    sections: [
      {
        heading: "What is the lightest laptop worth buying?",
        body: [
          "The Lenovo ThinkPad X1 Carbon Gen 12 is the lightest laptop we have tested at 1.09 kg, and it still has the best keyboard in our lab. Every laptop on this list weighs 1.3 kg or less.",
        ],
      },
      {
        heading: "What is the best lightweight laptop with a big screen?",
        body: [
          "The LG gram Pro 16 puts a 16-inch OLED screen in a 1.29 kg body, lighter than most 14-inch laptops, and ran 14.6 hours on battery.",
        ],
      },
      {
        heading: "What is the best lightweight laptop for travel?",
        body: [
          "For travel, pair low weight with long battery life and USB-C charging. The MacBook Air 13 (M4) at 1.24 kg and 18 hours of battery is the best all-rounder; the ThinkPad X1 Carbon is the best Windows option.",
        ],
      },
    ],
    faq: [
      { q: "What weight is considered a lightweight laptop?", a: "Under 1.3 kg (about 2.9 lb) is lightweight. Most 14-inch ultraportables weigh 1.2–1.4 kg; gaming laptops weigh 1.8–2.5 kg." },
      { q: "Are lightweight laptops less durable?", a: "Not necessarily. Carbon-fibre and magnesium laptops like the ThinkPad X1 Carbon are light and pass MIL-STD durability tests." },
    ],
  },

  "home-use": {
    seoTitle: "Best Laptops for Home Use in Canada (2026): Family & Everyday Picks",
    metric: metrics.value,
    sort: (a, b) => b.overall + b.scores.value - (a.overall + a.scores.value),
    related: ["budget", "under-1000", "15-inch", "chromebook", "touchscreen", "student"],
    sections: [
      {
        heading: "What is a good laptop for home use?",
        body: [
          "A good home laptop handles browsing, email, streaming, online banking, photos and video calls for five years. That means 16 GB RAM on Windows (8 GB on ChromeOS), a 512 GB SSD, a 14- to 15.6-inch screen and a comfortable keyboard. This list balances our overall score with value.",
        ],
      },
      {
        heading: "What is the best laptop for seniors and families?",
        body: [
          "Choose a larger 15-inch screen, a simple operating system and a good webcam for family calls. A Chromebook is the easiest to keep secure and updated; a MacBook Air 15 suits families already using iPhones.",
        ],
      },
    ],
    faq: [
      { q: "How much should I spend on a home laptop?", a: "$500–$1,000 CAD covers everyday home use. Under $500 a Chromebook is the best choice; $750–$950 gets a solid Windows laptop with 16 GB RAM." },
      { q: "Is a Chromebook good for home use?", a: "Yes for browsing, email, streaming and Google or Microsoft 365 web apps. It is not suited to Windows-only software or most games." },
    ],
  },

  touchscreen: {
    seoTitle: "Best Touchscreen Laptops in Canada (2026), Tested",
    metric: metrics.screen,
    related: ["2-in-1", "photo-editing", "home-use", "student", "business"],
    sections: [
      {
        heading: "Is a touchscreen laptop worth it?",
        body: [
          "A touchscreen is worth it for note-taking, drawing, scrolling documents and presenting. Choose a 2-in-1 if you want to fold it into a tablet or use a pen. Touchscreens add a little weight and glare and slightly reduce battery life.",
        ],
      },
      {
        heading: "Touchscreen laptop or 2-in-1?",
        body: [
          "A standard touchscreen laptop keeps the clamshell shape; a 2-in-1 folds 360° into a tablet and usually supports a stylus. See our [best 2-in-1 laptops](/laptop/reviews/best/2-in-1).",
        ],
      },
    ],
    faq: [
      { q: "Do MacBooks have touchscreens?", a: "No. No MacBook has a touchscreen as of 2026. For touch on Apple hardware, an iPad Pro or iPad Air with a keyboard is the alternative." },
      { q: "Do touchscreen laptops have worse battery life?", a: "Slightly. The touch layer adds power draw, but the Surface Laptop 7 still ran 16 hours in our battery test." },
    ],
  },

  "best-buy": {
    seoTitle: "Best Laptops at Best Buy Canada (2026): Ranked by Score per Dollar",
    metric: {
      label: "Best Buy price · pts per $1k",
      value: (l: Laptop) => `${cad(bestBuyPrice(l))} · ${pointsPerK(l, bestBuyPrice(l)).toFixed(1)}`,
    },
    // Value at Best Buy's own price, not the overall ranking (which /best/laptop already covers).
    sort: (a, b) => pointsPerK(b, bestBuyPrice(b)) - pointsPerK(a, bestBuyPrice(a)),
    rankedBy: "overall test score per $1,000 at the Best Buy Canada price",
    quickAnswer: (picks) => {
      const v = picks[0];
      const top = picks.slice().sort(byOverall)[0];
      return `The best-value laptop at Best Buy Canada is the ${v.brand} ${v.model}: ${v.overall.toFixed(1)}/10 for ${cad(bestBuyPrice(v))}, or ${pointsPerK(v, bestBuyPrice(v)).toFixed(1)} score points per $1,000.` +
        (top.id !== v.id ? ` The highest-scoring laptop Best Buy sells is the ${top.brand} ${top.model} (${top.overall.toFixed(1)}/10, ${cad(bestBuyPrice(top))}).` : "");
    },
    related: ["laptop", "budget", "gaming", "student", "under-1000", "macbook"],
    sections: [
      {
        heading: "Which Best Buy laptops are actually worth buying?",
        body: [
          "These are the laptops we have tested that Best Buy Canada sells and that score at least 7.5/10, ranked by how many test-score points you get per $1,000 at the Best Buy price we last recorded. For the best laptops regardless of price, see our [overall ranking](/laptop/reviews/best/laptop). BestLaptop.ca is independent and not affiliated with Best Buy.",
        ],
      },
      {
        heading: "Is it better to buy a laptop from Best Buy or direct?",
        body: [
          "Best Buy is convenient for in-store returns, open-box savings and price matching. Buying direct from Apple, Dell, Lenovo or HP gives more configurations and sometimes deeper sales. Compare both before Black Friday and Boxing Day.",
        ],
      },
    ],
    faq: [
      { q: "Does Best Buy Canada price match?", a: "Best Buy Canada offers price matching on identical in-stock items from major Canadian competitors, with conditions. Check its current policy before you buy." },
      { q: "Is open-box at Best Buy worth it?", a: "Often, yes. Open-box laptops carry the full manufacturer warranty and can save 10–25%. Check the condition grade and battery health." },
    ],
  },

  "under-1500": {
    metric: metrics.value,
    related: ["under-1000", "under-500", "budget", "budget-gaming", "student", "business"],
    sections: [
      {
        heading: "What is the best laptop under $1,500 in Canada?",
        body: [
          "Under $1,500 CAD you can get a premium ultraportable with all-day battery or an RTX 4060 gaming laptop. The MacBook Air 13 (M4) and ASUS Zenbook 14 OLED are the highest-scoring laptops we have tested at this price.",
        ],
      },
    ],
    faq: [
      { q: "Is $1,500 a lot for a laptop?", a: "It is above average. $1,500 CAD buys a premium ultraportable or a capable gaming laptop that should last five years or more." },
    ],
  },

  windows: {
    metric: metrics.battery,
    rankedBy: "overall test score across every Windows 11 laptop we have tested",
    related: ["business", "gaming", "2-in-1", "touchscreen", "lightweight", "macbook"],
    faq: [
      { q: "What is the best Windows laptop in 2026?", a: "The ASUS Zenbook 14 OLED and Lenovo ThinkPad X1 Carbon Gen 12 both scored 8.4/10 in our testing; the Zenbook is the better value at $1,499 CAD." },
    ],
  },

  chromebook: {
    metric: metrics.battery,
    sort: (a, b) => b.test.batteryWebHours - a.test.batteryWebHours || byOverall(a, b),
    rankedBy: "measured web-browsing battery life, the spec that matters most on ChromeOS",
    related: ["under-500", "budget", "student", "home-use", "long-battery-life"],
    faq: [
      { q: "Is a Chromebook worth buying in 2026?", a: "Yes for web-based work, students and home use. Choose a Chromebook Plus model with 8 GB RAM for smoother performance and longer software support." },
    ],
  },

  macbook: {
    metric: metrics.battery,
    related: ["video-editing", "music-production", "student", "long-battery-life", "photo-editing"],
    faq: [
      { q: "Which MacBook should I buy in 2026?", a: "The MacBook Air 13 (M4) for most people, the MacBook Air 15 for a bigger screen, and the MacBook Pro 14 (M4 Pro) for video editing, music production and heavy development." },
    ],
  },

  "under-500": {
    metric: { label: "Price (CAD)", value: (l: Laptop) => cad(price(l)) },
    // Cheapest first: the price cap is the whole intent of this list.
    sort: (a, b) => price(a) - price(b) || byOverall(a, b),
    rankedBy: "lowest current Canadian price, among laptops that still pass our tests",
    related: ["budget", "chromebook", "under-1000", "student", "home-use"],
    sections: [
      {
        heading: "Can you get a Windows laptop for under $500 in Canada?",
        body: [(() => {
          const win = published.filter((l) => l.os === "Windows 11").sort((a, b) => price(a) - price(b))[0];
          const under = published.filter((l) => price(l) <= 500);
          return `Not one we would recommend. Every laptop under $500 that passed our testing runs ChromeOS (${under.map((l) => `${l.brand} ${l.model}, ${cad(price(l))}`).join("; ")}). The cheapest Windows laptop we have tested is the [${win.brand} ${win.model}](/laptop/reviews/${win.brandSlug}/${win.slug}) at ${cad(price(win))}, so budget about ${cad(Math.ceil(price(win) / 50) * 50)} if you need Windows software.`;
        })()],
      },
      {
        heading: "What does a laptop under $500 handle well?",
        body: [
          "Web browsing, Google Docs and Microsoft 365 on the web, streaming, video calls and homework. It will not run Windows-only programs, Adobe apps or games beyond Android titles. If you need those, see the [best laptops under $1,000](/laptop/reviews/best/under-1000).",
        ],
      },
    ],
  },
  "under-1000": {
    metric: metrics.value,
    rankedBy: "overall test score: the best laptop you can buy for $1,000 or less",
    related: ["under-500", "under-1500", "budget", "student", "home-use"],
  },
  "2-in-1": { metric: metrics.screen, related: ["touchscreen", "photo-editing", "business", "student"] },
  programming: {
    metric: metrics.keyboard,
    sort: (a, b) => b.useCases.programming - a.useCases.programming || byOverall(a, b),
    rankedBy: "our programming use-case score (multi-core speed, keyboard, RAM and battery)",
    related: ["engineering-students", "business", "macbook", "lightweight"],
  },
  "working-from-home": {
    metric: metrics.keyboard,
    sort: (a, b) => b.scores.keyboard + b.scores.battery + b.scores.display - (a.scores.keyboard + a.scores.battery + a.scores.display),
    rankedBy: "keyboard, battery and display scores combined, the three things you use all day at a home desk",
    related: ["business", "home-use", "long-battery-life", "14-inch"],
  },
  college: {
    metric: metrics.battery,
    sort: (a, b) => b.useCases.school - a.useCases.school || byOverall(a, b),
    rankedBy: "our school use-case score, Windows and macOS laptops only",
    related: ["student", "engineering-students", "budget", "lightweight", "macbook"],
    sections: [
      {
        heading: "What is the best laptop for university students in Canada?",
        body: [
          "For university and college, pick a Windows or macOS laptop with 16 GB of RAM and all-day battery. We leave Chromebooks off this list because most degree and diploma programs need desktop software (statistics packages, Microsoft Office desktop apps, CAD or Adobe tools) that ChromeOS cannot run. For high school or web-only coursework, see the [best student laptops](/laptop/reviews/best/student), which include Chromebooks.",
        ],
      },
      {
        heading: "Mac or Windows for university?",
        body: [
          "Engineering, architecture and some business programs require Windows-only software; check your program's laptop requirements first. Arts, humanities and most science programs work well on a MacBook Air, which lasted the longest in our battery test. See [engineering student laptops](/laptop/reviews/best/engineering-students) for CAD and simulation work.",
        ],
      },
    ],
  },
  "engineering-students": {
    metric: metrics.exportTime,
    sort: (a, b) => b.useCases.workstation - a.useCases.workstation || byOverall(a, b),
    rankedBy: "our workstation use-case score (sustained CPU and GPU performance for CAD and simulation)",
    related: ["student", "programming", "gaming", "video-editing"],
  },
  brands: {
    seoTitle: `Best Laptop Brands in Canada (2026): ${brandRanking.length} Brands Ranked by Lab Scores`,
    metric: { label: "Brand median score", value: (l: Laptop) => `${brandOf(l).median.toFixed(1)}/10 (${brandOf(l).count} tested)` },
    // One flagship per brand, brands ordered by the median score of all their tested models.
    sort: (a, b) => brandRanking.indexOf(brandOf(a)) - brandRanking.indexOf(brandOf(b)),
    rankedBy: "the median test score of every model we have tested from each brand, showing each brand's best model",
    quickAnswer: () => {
      const [b1, b2, b3] = brandRanking;
      return `The best laptop brand in our testing is ${b1.name}: its ${b1.count} tested model${b1.count === 1 ? "" : "s"} have a median score of ${b1.median.toFixed(1)}/10, led by the ${b1.best.model} (${b1.best.overall.toFixed(1)}). ${b2.name} (${b2.median.toFixed(1)}) and ${b3.name} (${b3.median.toFixed(1)}) follow.`;
    },
    related: ["laptop", "lenovo", "dell", "hp", "asus", "acer", "macbook"],
    sections: [
      {
        heading: "Which laptop brand is best in 2026?",
        body: brandRanking.map(
          (b, i) =>
            `${i + 1}. [${b.name}](/laptop/reviews/${b.slug}): median ${b.median.toFixed(1)}/10 across ${b.count} tested model${b.count === 1 ? "" : "s"}, best is the ${b.best.model} (${b.best.overall.toFixed(1)}), prices ${b.count === 1 ? cad(b.priceMin) : `${cad(b.priceMin)}–${cad(b.priceMax)}`}.`,
        ),
      },
      {
        heading: "Does the brand matter when buying a laptop?",
        body: [
          "Less than the model. Within one brand our scores can span several points: a brand's flagship and its budget line are different products. Use the brand ranking to shortlist, then compare specific models with our [results table](/laptop/tools/table). Warranty and service matter too: business lines (ThinkPad, Latitude, EliteBook) offer on-site service that consumer lines do not.",
        ],
      },
    ],
    faq: [
      { q: "Which laptop brand is the most reliable?", a: "We measure performance, not long-term failure rates. Business lines such as Lenovo ThinkPad, Dell Latitude and HP EliteBook carry longer and on-site warranties, which is the best proxy for reliability you can buy." },
      { q: "Is Apple or Windows the better laptop brand?", a: `Apple has the highest median score in our testing (${brandRanking.find((b) => b.slug === "apple")?.median.toFixed(1) ?? "n/a"}/10), mostly from battery life. Windows brands win on choice, gaming and price.` },
    ],
  },
  "13-inch": { metric: metrics.weight, related: ["14-inch", "lightweight", "long-battery-life"] },
  "14-inch": { metric: metrics.weight, related: ["13-inch", "15-inch", "lightweight"] },
  "15-inch": { metric: metrics.weight, related: ["14-inch", "16-inch", "home-use"] },
  "16-inch": { metric: metrics.weight, related: ["15-inch", "gaming", "video-editing"] },
};
