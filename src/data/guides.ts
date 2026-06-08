import type { Guide } from "@/lib/types";

// Buying guides served at /laptop/learn/{slug}. A few are written out in full;
// the rest carry a direct answer, structured sections, and FAQ.
export const guides: Guide[] = [
  {
    slug: "how-to-choose-a-laptop",
    title: "How to Choose a Laptop",
    h1: "How to Choose a Laptop in Canada",
    excerpt: "A step-by-step framework for picking the right laptop based on how you actually use it.",
    category: "Getting started",
    updated: "2026-05-20",
    readingTime: 8,
    answer:
      "To choose a laptop, start with your main use case, set a Canadian budget, then prioritize the two or three specs that matter most for that use: usually CPU, RAM, battery life, and display. Match those to a tested model in your price range rather than chasing the highest specs.",
    sections: [
      {
        heading: "1. Start with how you will use it",
        body: [
          "Most buyers fall into a few groups: everyday/school, business, gaming, or creative work. Your use case decides which specs matter.",
          "For school and office work, prioritize battery life, weight, and a comfortable keyboard. For gaming and creative work, prioritize the GPU, CPU, and display.",
        ],
      },
      {
        heading: "2. Set a realistic Canadian budget",
        body: [
          "Under $700 gets you a solid everyday laptop. $1,000–$1,500 buys a strong all-rounder. Gaming and creator laptops usually start around $1,800 in Canada.",
          "Watch for sales around back-to-school, Black Friday, and Boxing Day, when prices drop meaningfully.",
        ],
      },
      {
        heading: "3. Focus on the specs that matter",
        body: [
          "Aim for 16GB of RAM for most people, an SSD of at least 512GB, and a recent CPU. A bright 16:10 or 3:2 display is worth prioritizing.",
          "Don't overpay for specs you won't use, such as a discrete GPU if you never game or edit video.",
        ],
      },
      {
        heading: "4. Check battery life and weight",
        body: [
          "If you move around, look for a tested battery result above 10 hours of web use and a weight under 1.6 kg.",
          "Our reviews list measured battery life rather than manufacturer claims.",
        ],
      },
    ],
    faq: [
      { q: "How much should I spend on a laptop in Canada?", a: "Most people are well served between $800 and $1,500. Spend more only if you game or do creative work." },
      { q: "How much RAM do I need?", a: "16GB is the sweet spot for most users in 2026. 8GB is acceptable only for light, web-based use." },
      { q: "Is a bigger screen better?", a: "Not always. Larger screens add weight. 13–14 inches suits portability; 15–16 inches suits desk and creative use." },
    ],
  },
  {
    slug: "how-much-ram-do-you-need",
    title: "How Much RAM Do You Need?",
    h1: "How Much RAM Does a Laptop Need?",
    excerpt: "A practical guide to choosing laptop RAM based on your workload, with Canadian buying advice.",
    category: "Specs explained",
    updated: "2026-05-12",
    readingTime: 6,
    answer:
      "For most people in 2026, 16GB of RAM is the right amount. Choose 8GB only for light, web-based use, and 32GB or more for video editing, virtual machines, or heavy multitasking. Because many laptops have soldered RAM, buy enough up front.",
    sections: [
      { heading: "8GB: light use only", body: ["8GB handles browsing, documents, and streaming, but it fills up fast with many tabs. Choose it only on Chromebooks or tight budgets."] },
      { heading: "16GB: the sweet spot", body: ["16GB comfortably handles office work, programming, and light creative tasks. It is the right choice for the vast majority of buyers."] },
      { heading: "32GB and up: pro workloads", body: ["Video editors, developers running virtual machines, and heavy multitaskers benefit from 32GB or more.", "On laptops with soldered RAM, you cannot upgrade later, so size up at purchase."] },
    ],
    faq: [
      { q: "Is 8GB of RAM enough in 2026?", a: "Only for light web use. Most people should choose 16GB." },
      { q: "Can I upgrade laptop RAM later?", a: "Sometimes. Many thin laptops solder RAM in place. Check our review's upgradeability section before buying." },
    ],
  },
  {
    slug: "oled-vs-ips-laptop-displays",
    title: "OLED vs IPS Laptop Displays",
    h1: "OLED vs IPS Laptop Displays: Which Is Better?",
    excerpt: "How OLED and IPS laptop displays compare on contrast, colour, brightness, battery, and price.",
    category: "Displays",
    updated: "2026-04-28",
    readingTime: 7,
    answer:
      "OLED displays offer deeper blacks, better contrast, and richer colour, which suits media and creative work. IPS displays are brighter for the price, often easier on the eyes for long work sessions, and cheaper. For most buyers, a good IPS panel is fine; choose OLED if you watch media or edit photos and video.",
    sections: [
      { heading: "Contrast and colour", body: ["OLED produces true blacks and very high contrast because each pixel emits its own light. IPS relies on a backlight, so blacks look grey by comparison.", "For photo and video editing, OLED's wider colour gamut is an advantage, though calibration still matters."] },
      { heading: "Brightness and battery", body: ["Good IPS panels can be brighter in everyday content and use less power on white backgrounds, which helps battery life during office work.", "OLED can be more power-efficient with dark content but uses more power with bright, full-screen white."] },
      { heading: "Eye comfort and burn-in", body: ["Some OLED panels use PWM dimming that bothers sensitive users. We measure flicker in our display tests.", "Burn-in is rare with normal use but possible over years with static elements."] },
    ],
    faq: [
      { q: "Is OLED worth it on a laptop?", a: "For media and creative work, yes. For all-day office use, a bright IPS panel is often the better choice." },
      { q: "Does OLED hurt battery life?", a: "It can with bright content. With dark themes, the difference is small." },
    ],
  },
  {
    slug: "intel-vs-amd-vs-apple-silicon",
    title: "Intel vs AMD vs Apple Silicon",
    h1: "Intel vs AMD vs Apple Silicon: Which Laptop CPU Is Best?",
    excerpt: "How the three main laptop platforms compare on performance, battery life, and software.",
    category: "Performance",
    updated: "2026-05-02",
    readingTime: 8,
    answer:
      "Apple Silicon leads on battery life and performance per watt and suits creators on macOS. AMD offers strong multi-core value in Windows laptops. Intel remains versatile with broad compatibility and good integrated graphics. Pick the platform that matches your software and battery needs rather than chasing benchmark wins.",
    sections: [
      { heading: "Apple Silicon", body: ["Apple's M-series chips deliver class-leading battery life and quiet, fanless or near-silent operation. They excel at video editing and everyday work.", "The trade-off is the macOS ecosystem and a limited gaming library."] },
      { heading: "AMD Ryzen", body: ["AMD offers excellent multi-core performance for the price in Windows laptops, with competitive integrated graphics.", "It is a strong choice for programming and value-focused buyers."] },
      { heading: "Intel Core", body: ["Intel's Core and Core Ultra chips are versatile, with broad software compatibility and solid integrated graphics in newer models.", "Qualcomm's Snapdragon adds excellent battery life to Windows but still emulates some x86 apps."] },
    ],
    faq: [
      { q: "Is Apple Silicon better than Intel?", a: "For battery life and efficiency, yes. For Windows software and gaming, Intel or AMD is the better fit." },
      { q: "Is AMD or Intel better for laptops?", a: "AMD often wins on multi-core value; Intel offers broad compatibility. Both are good in 2026." },
    ],
  },
  {
    slug: "refurbished-laptop-buying-guide-canada",
    title: "Refurbished Laptop Buying Guide Canada",
    h1: "Refurbished Laptop Buying Guide (Canada)",
    excerpt: "How to buy a refurbished laptop safely in Canada, what to check, and where to shop.",
    category: "Buying advice",
    updated: "2026-05-18",
    readingTime: 7,
    answer:
      "To buy a refurbished laptop safely in Canada, choose certified refurbished units from the manufacturer or a reputable retailer, confirm the warranty, check the battery health and cycle count, and verify the configuration. Certified refurbished can save 20–40% with low risk.",
    sections: [
      { heading: "Buy certified, not just used", body: ["Certified refurbished units are tested, repaired, and warrantied. Manufacturer outlets (Apple, Dell, Lenovo) and major retailers are the safest sources in Canada."] },
      { heading: "Check the warranty", body: ["Look for at least 90 days, ideally a year. A warranty is the main thing separating a good refurb from a risky used purchase."] },
      { heading: "Inspect battery health", body: ["Ask for battery cycle count or health percentage. A heavily cycled battery is the most common weak point on a used laptop.", "See our guide on checking laptop battery health."] },
    ],
    faq: [
      { q: "Is it safe to buy a refurbished laptop in Canada?", a: "Yes, if it is certified refurbished with a warranty from a reputable seller." },
      { q: "How much do refurbished laptops save?", a: "Typically 20–40% off new pricing for a comparable configuration." },
    ],
  },
  {
    slug: "best-time-to-buy-a-laptop-in-canada",
    title: "When Is the Best Time to Buy a Laptop in Canada?",
    h1: "When Is the Best Time to Buy a Laptop in Canada?",
    excerpt: "The best months and sales events to buy a laptop in Canada, and when to wait.",
    category: "Buying advice",
    updated: "2026-05-22",
    readingTime: 5,
    answer:
      "The best times to buy a laptop in Canada are Black Friday and Cyber Monday (late November), Boxing Day (late December), and back-to-school sales (July to early September). New models often launch in spring and fall, which discounts the previous generation.",
    sections: [
      { heading: "Major sale events", body: ["Black Friday and Boxing Day deliver the deepest discounts. Back-to-school season is strong for student laptops and Chromebooks."] },
      { heading: "Buy last year's model", body: ["When new models launch in spring and fall, retailers discount the outgoing generation, which is often the best value."] },
    ],
    faq: [
      { q: "Is Black Friday or Boxing Day better for laptops?", a: "Both are strong. Black Friday usually has more selection; Boxing Day can clear remaining stock at steep discounts." },
    ],
  },
  // Lighter guides (answer + FAQ) to round out the library.
  ...quickGuide("laptop-specs-explained", "Laptop Specs Explained", "Specs explained", "A laptop's key specs are the CPU (overall speed), RAM (multitasking), storage (space and speed), GPU (graphics), and display. Match these to your use case rather than buying the highest numbers."),
  ...quickGuide("how-much-storage-do-you-need", "How Much Storage Do You Need?", "Specs explained", "512GB is the right amount of storage for most people in 2026. Choose 256GB only for light, cloud-based use, and 1TB or more for large media libraries, games, or video projects."),
  ...quickGuide("best-laptop-screen-size", "Best Laptop Screen Size", "Displays", "13–14 inches is best for portability, 15–16 inches for desk work and creative tasks, and 17 inches for desktop replacements. Most buyers are happiest with a 14-inch laptop."),
  ...quickGuide("gaming-laptop-buying-guide", "Gaming Laptop Buying Guide", "Gaming", "For a gaming laptop, prioritize the GPU first, then cooling, then the display's refresh rate. In 2026, an RTX 4060 or 4070 hits the value sweet spot for 1080p and 1440p gaming."),
  ...quickGuide("student-laptop-buying-guide-canada", "Student Laptop Buying Guide Canada", "Buying advice", "The best student laptop in Canada balances battery life, weight, and price. Aim for 16GB RAM, a 512GB SSD, all-day battery, and a sub-1.6 kg weight, ideally on sale during back-to-school season."),
  ...quickGuide("business-laptop-buying-guide", "Business Laptop Buying Guide", "Buying advice", "A good business laptop has a great keyboard, strong security, a reliable build, and long battery life. ThinkPad, EliteBook, and Latitude lines are the safe picks, ideally with onsite warranty."),
  ...quickGuide("chromebook-vs-windows-laptop", "Chromebook vs Windows Laptop", "Comparisons", "Choose a Chromebook for cheap, simple, web-based computing with long battery life. Choose Windows for software flexibility, gaming, and professional apps. Most students can manage on a Chromebook; most professionals need Windows."),
  ...quickGuide("macbook-vs-windows-laptop", "MacBook vs Windows Laptop", "Comparisons", "MacBooks lead on battery life, efficiency, and build, and suit creators. Windows laptops offer more choice, better gaming, and lower entry prices. Pick based on the software you rely on."),
  ...quickGuide("laptop-battery-life-explained", "Laptop Battery Life Explained", "Specs explained", "Real battery life depends on the screen brightness, workload, and chip efficiency, not just the battery's Wh rating. We test web browsing and video playback at a fixed brightness so results are comparable."),
  ...quickGuide("laptop-ports-explained", "Laptop Ports Explained", "Specs explained", "USB-C and Thunderbolt handle charging, data, and displays; USB-A connects older accessories; HDMI drives monitors. Thunderbolt 4/USB4 is the most flexible. Count the ports you actually need before buying a thin laptop."),
  ...quickGuide("when-is-the-best-time-to-buy-a-laptop-in-canada", "Best Time to Buy a Laptop", "Buying advice", "The best times to buy a laptop in Canada are Black Friday, Boxing Day, and back-to-school season, plus right after new models launch when last year's models are discounted."),
  ...quickGuide("is-a-gaming-laptop-good-for-school", "Is a Gaming Laptop Good for School?", "Gaming", "A gaming laptop works for school but is heavier and has shorter battery life than a typical student laptop. It makes sense if you also game or do creative work; otherwise a lighter ultraportable is a better fit."),
  ...quickGuide("how-long-should-a-laptop-last", "How Long Should a Laptop Last?", "Buying advice", "A well-chosen laptop should last four to six years. Buying enough RAM and storage up front, and a model with a healthy battery and good build, extends its useful life."),
  ...quickGuide("should-you-buy-a-used-laptop", "Should You Buy a Used Laptop?", "Buying advice", "A used laptop can be a good deal if you verify battery health, check for damage, and confirm the configuration. Certified refurbished with a warranty is safer than a private used sale."),
  ...quickGuide("how-to-check-laptop-battery-health", "How to Check Laptop Battery Health", "Maintenance", "On Windows, run 'powercfg /batteryreport' to see design vs full-charge capacity. On macOS, check System Settings > Battery for cycle count and condition. A battery below 80% of its design capacity is worn."),
  ...quickGuide("laptop-warranty-explained-canada", "Laptop Warranty Explained Canada", "Buying advice", "Most laptops include a one-year limited warranty in Canada. Onsite and accidental-damage coverage cost extra but are worth it for business use. Check whether service is mail-in or onsite before buying."),
  {
    slug: "laptop-buying-guide",
    title: "Laptop Buying Guide",
    h1: "Laptop Buying Guide (Canada, 2026)",
    excerpt: "A complete, testing-backed laptop buying guide for Canadians, from setting a budget to choosing the right specs.",
    category: "Getting started",
    updated: "2026-06-01",
    readingTime: 9,
    answer:
      "To buy the right laptop, define your main use case, set a Canadian budget, then prioritize the few specs that matter most for that use: usually CPU, 16GB of RAM, a 512GB SSD, battery life, and a good display. Match those to a tested model in your price range rather than chasing the highest specs.",
    sections: [
      { heading: "Step 1: Define your use case", body: ["Most buyers fall into everyday/school, business, gaming, or creative work. Your use case decides which specs matter most.", "For school and office work, prioritize battery life, weight, and the keyboard. For gaming and creative work, prioritize the GPU, CPU, and display."] },
      { heading: "Step 2: Set a Canadian budget", body: ["Under $700 buys a solid everyday laptop. $1,000–$1,500 buys a strong all-rounder. Gaming and creator laptops usually start around $1,800 in Canada.", "Watch back-to-school, Black Friday, and Boxing Day for meaningful discounts."] },
      { heading: "Step 3: Choose the specs that matter", body: ["Aim for 16GB of RAM, a 512GB SSD, and a recent CPU. A bright 16:10 or 3:2 display is worth prioritizing.", "Don't overpay for a discrete GPU if you never game or edit video."] },
      { heading: "Step 4: Check tested battery life and weight", body: ["If you move around, look for a measured battery result above 10 hours of web use and a weight under 1.6 kg.", "Our reviews report measured battery life, not manufacturer claims."] },
      { heading: "Step 5: Compare finalists", body: ["Use the results table to filter by the specs you care about, then the compare tool to weigh two or three finalists side by side before buying."] },
    ],
    faq: [
      { q: "How much should I spend on a laptop in Canada?", a: "Most people are well served between $800 and $1,500. Spend more only for gaming or creative work." },
      { q: "What specs matter most?", a: "For most people: a recent CPU, 16GB RAM, a 512GB SSD, good battery life, and a bright display." },
      { q: "Should I wait for a sale?", a: "If you can, buy around Black Friday, Boxing Day, or back-to-school, or right after new models launch when last year's models are discounted." },
    ],
  },
  {
    slug: "refurbished-laptops-canada",
    title: "Refurbished Laptops Canada",
    h1: "Refurbished Laptops in Canada: Buying Guide",
    excerpt: "How to buy a refurbished laptop safely in Canada, what to check, and where to shop for the best value.",
    category: "Buying advice",
    updated: "2026-05-30",
    readingTime: 7,
    answer:
      "To buy a refurbished laptop safely in Canada, choose certified refurbished units from the manufacturer or a reputable retailer, confirm the warranty, check battery health and cycle count, and verify the configuration. Certified refurbished typically saves 20–40% with low risk.",
    sections: [
      { heading: "Buy certified, not just used", body: ["Certified refurbished units are tested, repaired, and warrantied. Manufacturer outlets (Apple, Dell, Lenovo, HP) and major Canadian retailers are the safest sources."] },
      { heading: "Confirm the warranty", body: ["Look for at least 90 days, ideally a year. The warranty is the main thing separating a good refurb from a risky used purchase."] },
      { heading: "Check battery health", body: ["Ask for the battery cycle count or health percentage. A worn battery is the most common weak point on a used laptop. See our guide on checking battery health."] },
      { heading: "Where to shop in Canada", body: ["Manufacturer outlet stores, Best Buy Geek Squad Certified, Canada Computers, and Amazon Renewed are common options. Compare the refurbished price against current sale prices on new units."] },
    ],
    faq: [
      { q: "Are refurbished laptops worth it in Canada?", a: "Yes, if they're certified refurbished with a warranty. You typically save 20–40% versus new." },
      { q: "What should I check before buying?", a: "Warranty length, battery health/cycle count, physical condition, and that the configuration matches what's advertised." },
    ],
  },
];

function quickGuide(slug: string, title: string, category: string, answer: string): Guide[] {
  return [
    {
      slug,
      title,
      h1: title,
      excerpt: answer.split(".")[0] + ".",
      category,
      updated: "2026-05-10",
      readingTime: 5,
      answer,
      sections: [
        { heading: "The short answer", body: [answer] },
        {
          heading: "How this fits your buying decision",
          body: [
            "Use this alongside our tested reviews and the results table to match the recommendation to a specific model and Canadian price.",
            "Every recommendation on BestLaptop.ca is based on standardized testing, not manufacturer claims.",
          ],
        },
      ],
      faq: [
        { q: `Quick answer: ${title}`, a: answer },
      ],
    },
  ];
}

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
