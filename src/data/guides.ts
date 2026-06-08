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
  ...quickGuide("laptop-battery-life-explained", "Laptop Battery Life Explained", "Specs explained", "Real battery life depends on the screen brightness, workload, and chip efficiency, not just the battery's Wh rating. We test web browsing and video playback at a fixed brightness so results are comparable.", "Already have a laptop? See [how to extend your battery life on Windows](/laptop/learn/extend-battery-life-windows) for settings and habits that add hours."),
  ...quickGuide("laptop-ports-explained", "Laptop Ports Explained", "Specs explained", "USB-C and Thunderbolt handle charging, data, and displays; USB-A connects older accessories; HDMI drives monitors. Thunderbolt 4/USB4 is the most flexible. Count the ports you actually need before buying a thin laptop."),
  ...quickGuide("when-is-the-best-time-to-buy-a-laptop-in-canada", "Best Time to Buy a Laptop", "Buying advice", "The best times to buy a laptop in Canada are Black Friday, Boxing Day, and back-to-school season, plus right after new models launch when last year's models are discounted."),
  ...quickGuide("is-a-gaming-laptop-good-for-school", "Is a Gaming Laptop Good for School?", "Gaming", "A gaming laptop works for school but is heavier and has shorter battery life than a typical student laptop. It makes sense if you also game or do creative work; otherwise a lighter ultraportable is a better fit."),
  ...quickGuide("how-long-should-a-laptop-last", "How Long Should a Laptop Last?", "Buying advice", "A well-chosen laptop should last four to six years. Buying enough RAM and storage up front, and a model with a healthy battery and good build, extends its useful life.", "Battery wear is a common reason laptops feel old; see [how to extend your battery life on Windows](/laptop/learn/extend-battery-life-windows) and [how to check your battery health](/laptop/learn/how-to-check-laptop-battery-health)."),
  ...quickGuide("should-you-buy-a-used-laptop", "Should You Buy a Used Laptop?", "Buying advice", "A used laptop can be a good deal if you verify battery health, check for damage, and confirm the configuration. Certified refurbished with a warranty is safer than a private used sale."),
  ...quickGuide("how-to-check-laptop-battery-health", "How to Check Laptop Battery Health", "Maintenance", "On Windows, run 'powercfg /batteryreport' to see design vs full-charge capacity. On macOS, check System Settings > Battery for cycle count and condition. A battery below 80% of its design capacity is worn.", "If your battery is healthy but still drains fast, see [how to extend your battery life on Windows](/laptop/learn/extend-battery-life-windows)."),
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
  {
    slug: "extend-battery-life-windows",
    title: "How to Extend Your Laptop Battery Life on Windows",
    h1: "How to Extend Your Laptop Battery Life on Windows (2026 Guide)",
    excerpt: "A detailed, step-by-step guide to getting more battery life from a Windows 11 laptop — settings, habits, diagnostics, and long-term battery health.",
    category: "Maintenance",
    updated: "2026-06-08",
    readingTime: 22,
    answer:
      "To extend your Windows laptop's battery life, lower screen brightness and refresh rate, set the power mode to Balanced or Energy Saver, turn on Energy Saver, close background apps and trim startup programs, cap the maximum processor state, force apps onto the integrated GPU, and use efficiency features in your browser. For long-term health, avoid heat and keep the charge between roughly 20% and 80%. Most people can gain one to three extra hours by changing settings alone, with no new hardware.",
    sections: [
      {
        heading: "Why Windows laptops drain faster than you expect",
        body: [
          "Battery life is a tug-of-war between a fixed energy budget — the battery's capacity in watt-hours (Wh) — and everything in the laptop that wants to spend it. Manufacturers quote battery life under gentle conditions: a dim screen, light web browsing, radios mostly idle. Real life is messier. A bright display, a dozen browser tabs, a video call, a background sync, and a discrete GPU that refuses to sleep can together double or triple your power draw.",
          "On Windows specifically, a few things make the gap worse than on a tablet or a Mac. Windows runs more background services and scheduled tasks. Many laptops ship with manufacturer 'helper' apps, antivirus, and update agents that wake the system. Discrete graphics chips on gaming and creator laptops can turn on for trivial reasons. And Modern Standby — the always-connected sleep mode on most new laptops — can keep draining the battery overnight if a background app keeps the system busy.",
          "The good news: almost all of this is controllable. This guide walks through the settings that matter most, the habits that quietly cost you hours, and the built-in tools that tell you exactly what is draining your battery. You do not need to buy anything. Work through it top to bottom the first time, then keep the checklist at the end for regular maintenance.",
          "A quick note on scope: the steps below target Windows 11, which is what most laptops sold in 2025 and 2026 run. Where Windows 10 differs, it is called out. Menu names occasionally vary slightly by build and by manufacturer, but the concepts are the same.",
        ],
      },
      {
        heading: "The 10-minute battery setup (start here)",
        body: [
          "If you only have ten minutes, do these things. They deliver the biggest gains for the least effort, and the rest of the guide simply explains and extends them.",
          "- Lower screen brightness to the lowest comfortable level. The display is usually the single largest consumer of power, and brightness scales power draw almost linearly.",
          "- Open Settings > System > Power & battery and set the Power mode to 'Balanced' (or 'Best power efficiency' when unplugged).",
          "- Turn on Energy Saver, and set it to switch on automatically at 30% (or always when on battery, if you want maximum endurance).",
          "- Set the screen to turn off after 3–5 minutes and the laptop to sleep after 10–15 minutes when on battery.",
          "- If your laptop has a high-refresh display (120Hz or more), drop it to 60Hz on battery in Settings > System > Display > Advanced display.",
          "- Open Task Manager (Ctrl+Shift+Esc), go to the Startup apps tab, and disable anything with 'High' startup impact that you do not need immediately at login.",
          "- Turn on dark mode and a dark wallpaper if you have an OLED or AMOLED screen — black pixels use little to no power on those panels.",
          "These seven changes alone often recover one to two hours. Everything that follows is about squeezing out more, understanding why these work, and keeping your battery healthy for years rather than months.",
        ],
      },
      {
        heading: "Master Windows power and battery settings",
        body: [
          "The Power & battery page (Settings > System > Power & battery) is mission control. Spend a few minutes here and you will understand most of what affects your runtime.",
          "### Power mode",
          "The Power mode slider trades performance for efficiency. 'Best power efficiency' caps how aggressively the CPU boosts and how quickly the system ramps up, which can noticeably extend battery life during light work like writing, email, and browsing. 'Balanced' is a sensible default. Use 'Best performance' only when plugged in or when you genuinely need the speed. On many laptops you can set different modes for plugged-in versus on-battery automatically.",
          "### Energy Saver",
          "Energy Saver (the modern replacement for the old Battery Saver) reduces background activity, can dim the display slightly, pauses some sync and non-critical updates, and limits certain visual effects. On Windows 11's newer builds you can run Energy Saver all the time, even while plugged in, or have it kick in at a battery threshold you choose. If you want the longest possible runtime, set it to 'Always'. If you only want help when you are getting low, set the threshold to 20–30%.",
          "### Screen and sleep timeouts",
          "Under 'Screen and sleep', set shorter timeouts on battery than on power. Turning the screen off after 3–5 minutes of inactivity and sleeping after 10–15 minutes prevents the laptop from burning power while you are away. Sleep uses very little energy; the screen being on uses a lot.",
          "### The battery usage breakdown",
          "Scroll down to 'Battery usage' to see which apps consumed the most power over the last 24 hours or 7 days, split into 'in use' and 'background'. This is the fastest way to catch a misbehaving app — a chat client, a cloud backup, or a browser — that is draining you in the background. If something has high background usage you do not expect, restrict it (covered next) or uninstall it.",
          "### Battery icon and estimates",
          "Hover over the battery icon in the taskbar for a time estimate. Treat it as a rough guide, not gospel: it is based on recent usage, so it swings as your workload changes. The Battery report (covered later) gives a far more reliable picture of capacity and health.",
        ],
      },
      {
        heading: "Tame your display: the single biggest drain",
        body: [
          "On most laptops the screen and its backlight consume more power than anything else during normal use — often 30–50% of total draw. Small changes here pay off more than almost anything else.",
          "### Brightness",
          "Lower brightness whenever you can. Going from maximum to around 40–50% can cut display power dramatically. Use adaptive brightness cautiously: it saves power in dim rooms but can spike brightness in bright ones. Many laptops have dedicated brightness keys — build a habit of nudging it down the moment you unplug.",
          "### Refresh rate",
          "High-refresh panels (120Hz, 165Hz, 240Hz) redraw the screen far more often, which costs power. For battery work, 60Hz is plenty. In Settings > System > Display > Advanced display, choose a lower refresh rate on battery. Some laptops support 'Dynamic refresh rate' (DRR), which automatically lowers the rate when you are reading or typing and raises it when you scroll or animate — enable it if available.",
          "### Dark mode and wallpaper (OLED/AMOLED)",
          "If your laptop has an OLED or AMOLED display — increasingly common on premium 2025–2026 models — black pixels are essentially off and draw little power. Enabling dark mode (Settings > Personalization > Colors), using a dark or black wallpaper, and preferring dark themes in apps and your browser can meaningfully extend runtime. On traditional LCD/IPS panels, dark mode helps eye comfort but saves little power, because the backlight stays on regardless.",
          "### Screen timeout and dimming",
          "Aggressive screen-off timeouts are free battery life. Combine a short timeout with Energy Saver's optional dimming. Also disable unnecessary always-on screen features, screen savers (they keep the panel lit), and any 'keep display on while charging' style options when you are unplugged.",
          "### Resolution, scaling, and HDR",
          "Running a very high resolution and HDR both increase GPU and panel power. You rarely need HDR for documents or browsing — turn it off on battery (Settings > System > Display > HDR). Lowering resolution can help on some machines but often hurts sharpness more than it helps battery, so treat it as a last resort rather than a first step.",
        ],
      },
      {
        heading: "Cut background apps and startup bloat",
        body: [
          "Every program that runs in the background sips power and keeps the CPU from settling into low-power states. Trimming them is one of the most effective and underused tactics.",
          "### Startup programs",
          "Open Task Manager (Ctrl+Shift+Esc) and select the 'Startup apps' tab. Windows shows each app's 'Startup impact'. Disable anything rated 'High' or 'Medium' that you do not need the instant you log in — updaters, launchers (game stores, RGB software), cloud drives you rarely use, and vendor 'assistant' apps. You can always open these manually when needed. Fewer startup apps means a faster login and less constant background draw.",
          "### Background app permissions",
          "Windows lets many apps run in the background even when closed. Go to Settings > Apps > Installed apps, click the three dots next to an app, choose 'Advanced options', and set 'Let this app run in the background' to 'Never' or 'Power optimized' for apps that do not need live updates. Mail, chat, and weather apps are common culprits.",
          "### Scheduled tasks and sync",
          "Cloud backup and sync tools (OneDrive, Dropbox, Google Drive, photo uploaders) can wake the disk, CPU, and network at the worst times. Pause syncing while on battery, or schedule large backups for when you are plugged in. Similarly, set Windows Update active hours and let big updates install on power, not on a train with 20% left.",
          "### Antivirus and 'helper' software",
          "Windows Security (Defender) is efficient and sufficient for most people. Heavy third-party antivirus suites add background scanning that costs battery. If you run one, schedule full scans for when you are plugged in. Uninstall manufacturer bloatware you never use; many of these run background services that contribute nothing to your day but drain.",
          "### Notifications and live tiles",
          "Frequent push notifications wake the screen and radios. Trim notifications to the apps that matter (Settings > System > Notifications). Turning off the screen-waking 'banner' notifications for chatty apps reduces needless wake-ups.",
        ],
      },
      {
        heading: "Control the CPU with power management",
        body: [
          "The processor is the second big lever after the display. Modern CPUs are very efficient at idle, but boosting to high clock speeds for short bursts costs disproportionate power. Capping that boost on battery trades a little responsiveness for real endurance.",
          "### Maximum processor state",
          "Open the classic Control Panel > Power Options (or run 'powercfg.cpl'), choose your active plan, click 'Change plan settings' > 'Change advanced power settings'. Under 'Processor power management', set 'Maximum processor state' on battery to around 80–90%. This prevents the highest, least efficient boost clocks while keeping the system perfectly usable for everyday work. Lowering it too far (below ~50%) can make the machine feel sluggish, so tune to taste.",
          "### Processor power mode (Intel and AMD)",
          "Both Intel and AMD expose efficiency behaviour through Windows' Power mode slider and their own drivers. Keeping Windows on 'Best power efficiency' on battery generally lets the chip favour its efficient cores and lower voltages. Avoid third-party 'overclock' or 'turbo' utilities while unplugged — they push the chip the wrong direction for battery life.",
          "### Cooling policy",
          "In the same advanced power settings, 'System cooling policy' can be set to 'Passive' on battery, which throttles the CPU before ramping fans. This keeps the laptop quieter and cooler, and because heat and high clocks go hand in hand, it nudges the system toward lower power. On 'Active', the system runs fans harder to sustain performance, which costs power both in the fans and in the higher clocks they enable.",
          "### Don't fight the silicon",
          "You do not need to micromanage individual cores or undervolt to get good battery life. Undervolting can help on some laptops, but it is advanced, can cause instability, and is often locked down by the manufacturer. For the vast majority of people, the Power mode slider plus a sensible maximum processor state is enough.",
        ],
      },
      {
        heading: "Manage Wi-Fi, Bluetooth, and other radios",
        body: [
          "Radios are smaller drains than the screen or CPU, but they add up, especially during Modern Standby when you expect the laptop to be resting.",
          "- Turn off Bluetooth when you are not using wireless headphones, a mouse, or a keyboard. An idle Bluetooth radio still scans and maintains connections.",
          "- Disable Wi-Fi if you are working entirely offline (writing, reading a downloaded document). Airplane mode is the fastest way to silence every radio at once.",
          "- Turn off mobile hotspot when you are not sharing your connection — broadcasting to other devices is power-hungry.",
          "- In Wi-Fi adapter properties, some laptops expose a 'Power Saving Mode' (Maximum, Medium, Off). 'Maximum' power saving reduces draw at a small cost to latency, which is fine for everyday use.",
          "- Unplug or disconnect USB peripherals you are not using. A bus-powered drive, an SD card, a webcam, or a phone charging from your laptop all pull from the same battery. Even an idle USB dongle keeps a port awake.",
          "Each of these is small on its own, but together — particularly overnight in standby — they are the difference between waking up to 95% and waking up to 70%.",
        ],
      },
      {
        heading: "Graphics switching: stop the dGPU from waking",
        body: [
          "If you have a gaming or creator laptop with both integrated graphics (in the CPU) and a discrete GPU (NVIDIA GeForce or AMD Radeon), the discrete chip is a battery monster. It should stay asleep during everyday tasks, but apps and even browser video can wake it unnecessarily.",
          "### Set a per-app GPU preference",
          "In Settings > System > Display > Graphics, you can assign each app to 'Power saving' (integrated) or 'High performance' (discrete). Set everything you do not game in — browser, office apps, media players, communication tools — to 'Power saving'. Only assign 'High performance' to games and heavy creative software, and only run those on battery when you must.",
          "### NVIDIA and AMD control panels",
          "In the NVIDIA Control Panel (or NVIDIA app) under 'Manage 3D settings', confirm the preferred graphics processor is left to auto-select or set per-program rather than forced to the high-performance GPU globally. AMD's software has equivalent switchable-graphics controls. The goal is to let the integrated GPU handle ordinary work and only hand off to the discrete card when it is genuinely needed.",
          "### MUX switches and Advanced Optimus",
          "Many 2024–2026 gaming laptops include a MUX switch or NVIDIA Advanced Optimus. A MUX switch routes the display directly to the discrete GPU for maximum gaming performance — but doing so disables the power-saving handoff, so the dGPU stays on and battery life craters. For battery, set the MUX to 'Optimus'/'Hybrid'/'iGPU' mode rather than 'Discrete only'. Save discrete-only mode for plugged-in gaming.",
          "### Watch for dGPU wake triggers",
          "External monitors, certain video codecs, and some background apps can wake the discrete GPU. If your battery life is mysteriously poor on a gaming laptop, use the manufacturer's utility or Task Manager's GPU column to check whether the dGPU is active when it should not be, then track down the app keeping it awake.",
        ],
      },
      {
        heading: "Browser and app habits that quietly drain",
        body: [
          "For most people the browser is the most-used app, and how you use it has a big effect on battery life.",
          "### Tabs and extensions",
          "Every open tab can hold scripts, timers, and media that keep the CPU busy. Close tabs you are not using, or use a tab-suspender or your browser's built-in tab-sleeping feature. Audit extensions, too — some run constantly in the background. Remove ones you do not use.",
          "### Efficiency modes",
          "Microsoft Edge has 'Efficiency mode' and 'Sleeping tabs', which throttle inactive tabs and reduce resource use; enable both in Edge settings. Chrome has 'Energy Saver' and 'Memory Saver' that do similar things. These are among the easiest wins if you live in a browser.",
          "### Hardware acceleration",
          "Hardware acceleration lets the GPU handle video decoding and rendering efficiently, which is usually good for battery during video playback. On most modern laptops, leave it on. If your laptop has a power-hungry discrete GPU that wakes for browser video, test both settings and keep whichever gives better runtime on your machine.",
          "### Video streaming",
          "Video is demanding. Watching at a lower resolution (1080p instead of 4K), using a native app where one exists, and choosing services that use efficient codecs all help. Downloading content for offline viewing lets you turn off Wi-Fi entirely and avoids constant streaming overhead.",
          "### Pick lighter apps",
          "Some apps are far heavier than their job warrants — particularly chat and productivity tools built on web frameworks that each run their own browser engine. Where a lightweight or web version exists and does the job, it often uses less power than a always-running desktop client.",
        ],
      },
      {
        heading: "Protect long-term battery health",
        body: [
          "Extending runtime is about today; protecting battery health is about keeping that runtime over the years. Lithium-ion batteries wear out with charge cycles, time, heat, and being kept at extreme charge levels. A battery that holds 100% of its capacity new might hold 80% after a few hundred cycles — and you can slow that decline. For background on how runtime is measured versus advertised, see [laptop battery life explained](/laptop/learn/laptop-battery-life-explained).",
          "### Avoid the extremes (20–80%)",
          "Keeping a battery at a very high or very low state of charge stresses it. If your laptop offers a charge limit (often called Battery Conservation, Charge Limit, or 'Smart Charging' in the manufacturer's app or BIOS), capping charging at around 80% greatly reduces wear for a laptop that mostly lives on a desk. Lenovo, ASUS, Dell, HP, and others all offer some version of this. For occasional travel days, switch back to 100% the night before.",
          "### Heat is the enemy",
          "Heat ages batteries faster than almost anything. Do not charge or run heavy workloads with the laptop on a bed, couch, or other soft surface that blocks the vents. Keep it out of hot cars and direct sun. Good airflow during charging and gaming directly extends battery lifespan.",
          "### Don't leave it plugged in at 100% in heat",
          "Modern laptops handle being plugged in better than old ones — they stop charging at 100% and run from the wall. The real risk is sitting at 100% while hot for long periods. If you keep it docked all day, use a charge limit so it rests at ~80% instead of pinned at 100%.",
          "### Storage charge",
          "If you are storing a laptop for weeks, leave it at roughly 50% and power it down. A battery stored full or empty for long periods degrades faster, and a fully discharged battery left for months can become unrecoverable.",
          "### Occasional full cycles",
          "You do not need to fully drain modern batteries — in fact, deep discharges are mildly harmful. The only reason to do an occasional full discharge-and-recharge is to recalibrate the battery gauge so its percentage estimate stays accurate, and even that is rarely necessary on current laptops. To track wear over time, follow [how to check your laptop's battery health](/laptop/learn/how-to-check-laptop-battery-health), and see [how long a laptop should last](/laptop/learn/how-long-should-a-laptop-last) for realistic lifespan expectations.",
        ],
      },
      {
        heading: "Diagnose drain with powercfg and the Battery report",
        body: [
          "Windows ships with powerful, free diagnostic tools that most people never touch. They tell you your battery's true health and exactly what is keeping the system awake.",
          "### Generate a Battery report",
          "Open Terminal or Command Prompt and run: powercfg /batteryreport. Windows writes an HTML file (it tells you the path, usually your user folder). Open it to see 'Design Capacity' versus 'Full Charge Capacity' — the ratio is your battery's health. If full charge capacity has dropped well below design capacity, your battery has worn and shorter runtimes are expected. The report also shows recent usage and capacity history over time.",
          "### Find what is using power",
          "Run: powercfg /energy. After about a minute it produces an HTML report listing energy-efficiency problems — devices blocking sleep, processes with high utilization, drivers that prevent low-power states, and USB devices not entering selective suspend. It is technical, but the 'Errors' and 'Warnings' sections often point straight at the culprit.",
          "### Investigate standby drain",
          "If your laptop loses a lot of charge while asleep, run: powercfg /sleepstudy. This report focuses on Modern Standby sessions and shows which components and apps kept the system busy overnight. A common finding is a single background app or a network adapter waking the system repeatedly.",
          "### See what wakes the machine",
          "Run: powercfg /lastwake to see what last woke the system, and powercfg /devicequery wake_armed to list devices allowed to wake it. You can stop a device (like a mouse or network adapter) from waking the laptop with: powercfg /devicedisablewake \"device name\". This is especially useful if your laptop wakes itself in a bag and overheats or drains.",
          "### Re-run after changes",
          "Treat these reports as before-and-after measurements. Generate one, make changes, use the laptop normally for a day, then generate another. This turns battery tuning from guesswork into something you can actually verify.",
        ],
      },
      {
        heading: "Advanced power tweaks (for the determined)",
        body: [
          "These go beyond the basics. They help, but with diminishing returns and a little more risk, so make one change at a time and note the effect.",
          "### USB selective suspend",
          "In advanced power settings under 'USB settings', enable 'USB selective suspend'. This lets Windows power down idle USB devices instead of keeping them fully awake. If a specific peripheral misbehaves, you can exclude it, but for most setups this is a safe, small win.",
          "### PCI Express link state power management",
          "Under 'PCI Express' > 'Link State Power Management', setting 'Maximum power savings' on battery allows the system to put the PCIe links (used by the SSD, Wi-Fi, and GPU) into low-power states. On rare hardware this can cause hiccups, so revert it if you notice instability.",
          "### Modern Standby vs hibernate",
          "Many new laptops use Modern Standby (S0 low-power idle) instead of the old S3 sleep. Modern Standby keeps the system lightly connected, which is convenient but can drain overnight if an app keeps it busy. If your laptop bleeds charge while 'asleep', consider using Hibernate for long breaks. Hibernate (powercfg /hibernate on, then choose it from the power menu or set the lid/power button to hibernate) saves your session to disk and uses essentially zero power, at the cost of a slightly slower resume.",
          "### Fast Startup",
          "Fast Startup speeds up boot by saving the kernel session to disk on shutdown. It does not extend battery life directly and can occasionally cause odd power behaviour or interfere with updates. Most people can leave it on; if you see strange wake or shutdown issues, try turning it off in Control Panel > Power Options > 'Choose what the power buttons do'.",
          "### Manufacturer power utilities",
          "Lenovo Vantage, ASUS MyASUS/Armoury Crate, Dell Power Manager, HP Command Center, and similar apps expose battery conservation modes, thermal profiles, and 'quiet'/'battery saver' fan curves. Use the battery-friendly profiles on the go. Just avoid running several overlapping utilities at once, which wastes power on the very background processes you are trying to reduce.",
        ],
      },
      {
        heading: "Hardware, heat, and peripherals",
        body: [
          "Settings only go so far; physical conditions matter too.",
          "- Keep vents clear. Run the laptop on a hard, flat surface so air can flow. Blocked vents mean higher temperatures, more fan power, and a battery that ages faster.",
          "- Clean out dust periodically. Over a year or two, dust clogs fans and heatsinks, forcing fans to spin faster and longer — which costs battery and shortens lifespan.",
          "- Disconnect peripherals you are not using. External drives, mice dongles, capture cards, and especially anything charging from the laptop all draw from the same battery.",
          "- Mind the ambient temperature. Both very hot and very cold environments reduce the energy a battery can deliver. A cold battery temporarily shows less capacity; a hot one wears out permanently.",
          "- Use the right charger. A low-wattage USB-C charger may not keep up under load, causing the battery to top up and discharge repeatedly. Use a charger rated for your laptop, and prefer charging while idle rather than during heavy gaming.",
          "- Consider your dock. Some USB-C docks keep ports and controllers active and can prevent deep sleep. If standby drain is bad, test with the dock disconnected.",
        ],
      },
      {
        heading: "Battery profiles for travel, study, and video calls",
        body: [
          "Different situations call for different trade-offs. Here are three practical presets you can switch between.",
          "### Maximum endurance (travel / exams)",
          "Power mode 'Best power efficiency'; Energy Saver 'Always'; brightness ~40%; refresh rate 60Hz; Bluetooth off; Wi-Fi off if working offline; maximum processor state ~80%; dark mode on; all non-essential background apps restricted; dGPU forced off. On a modern ultrabook this can stretch a workday's worth of writing and reading well past what the spec sheet promises. If your current laptop simply cannot last, our [best laptops for working from home](/laptop/reviews/best/working-from-home) and the [results table](/laptop/tools/table) (sortable by measured battery life) are good starting points.",
          "### Balanced (everyday work)",
          "Power mode 'Balanced'; Energy Saver at 30%; brightness to comfort; refresh rate dynamic or 60Hz on battery; radios on as needed; browser efficiency/sleeping tabs enabled. This is the all-day default that keeps the machine responsive while still being frugal.",
          "### Video calls",
          "Calls hit the camera, microphone, network, encoder, and screen at once, so they are surprisingly demanding. Plug in if you can. If you cannot: close other apps and tabs, lower call resolution, turn off virtual backgrounds and beauty filters (they use the GPU), reduce screen brightness, and use wired headphones to avoid Bluetooth overhead. Forcing the conferencing app to the integrated GPU also helps on dual-GPU laptops.",
          "Switching profiles takes seconds once you know the levers, and it is the difference between confidently leaving the charger at home and constantly hunting for an outlet.",
        ],
      },
      {
        heading: "Battery myths, debunked",
        body: [
          "Plenty of battery advice is outdated. Here is what actually holds true for modern lithium-ion laptops.",
          "- 'You must fully drain the battery regularly.' False. Deep discharges are mildly harmful. Partial top-ups are healthier; only do an occasional full cycle to recalibrate the gauge.",
          "- 'Leaving it plugged in ruins the battery.' Mostly false today. Laptops stop charging at 100% and run from the wall. The real harm is sitting at 100% while hot for long periods, which a charge limit solves.",
          "- 'Closing apps doesn't matter because Windows manages memory.' Partly false for battery. Background apps keep the CPU and radios active and prevent low-power states, so closing them does save power.",
          "- 'Dark mode saves battery on every laptop.' Only on OLED/AMOLED. On LCD/IPS the backlight is always on, so dark mode helps your eyes but not the battery.",
          "- 'More cores or a bigger battery always means longer life.' Not necessarily. Efficiency (the chip, the display, the tuning) often matters more than raw capacity. A well-tuned efficient laptop can outlast one with a larger battery.",
          "- 'Battery-saver apps from the web will double your life.' Be skeptical. Windows' built-in tools do the real work; many third-party 'optimizers' add background processes that cost more than they save.",
        ],
      },
      {
        heading: "Your battery maintenance checklist",
        body: [
          "Keep this handy. The daily items take seconds; the periodic ones keep your battery healthy for years.",
          "### When you unplug",
          "- Drop brightness and switch to 'Best power efficiency' or 'Balanced'.",
          "- Turn on Energy Saver; set refresh rate to 60Hz; turn off HDR.",
          "- Disable Bluetooth/Wi-Fi if not needed; disconnect unused peripherals.",
          "### Weekly",
          "- Check Settings > Power & battery > Battery usage for surprise background drainers.",
          "- Close or suspend unneeded tabs and restrict chatty background apps.",
          "### Monthly",
          "- Review startup apps in Task Manager and remove new bloat.",
          "- Confirm your charge limit (~80%) is still set if you mostly work docked.",
          "### Quarterly",
          "- Run powercfg /batteryreport and compare full-charge capacity over time.",
          "- Run powercfg /energy and /sleepstudy to catch new drains, then act on the warnings.",
          "- Clean vents and fans; make sure airflow is unobstructed.",
          "Work through this guide once in full, adopt the unplug habits, and revisit the diagnostics each quarter. Most Windows laptops have one to three hours of hidden battery life waiting in their settings — and a few simple habits will keep that battery healthy for the life of the machine.",
        ],
      },
    ],
    faq: [
      { q: "How can I quickly extend my Windows laptop battery life right now?", a: "Lower the brightness, set Power mode to 'Best power efficiency', turn on Energy Saver, drop a high-refresh display to 60Hz, and close background apps and spare browser tabs. These take a minute and often add one to two hours." },
      { q: "Does dark mode save battery on Windows?", a: "Only meaningfully on OLED/AMOLED screens, where black pixels are essentially off. On standard LCD/IPS panels the backlight stays on, so dark mode helps eye comfort but not battery life." },
      { q: "Should I let my laptop battery fully drain?", a: "No. Modern lithium-ion batteries prefer partial charges. Deep discharges add wear. Only do an occasional full cycle to recalibrate the battery percentage gauge." },
      { q: "Is it bad to leave my laptop plugged in all the time?", a: "It's mostly fine — laptops run from the wall at 100% — but sitting at 100% while hot accelerates wear. If you mostly work docked, set a charge limit (around 80%) in your manufacturer's app or BIOS." },
      { q: "What is the best charge range for battery health?", a: "Keeping the charge roughly between 20% and 80% reduces long-term wear. Charge to 100% before travel days when you need the full capacity, then return to the limit." },
      { q: "How do I check my Windows battery's health?", a: "Run 'powercfg /batteryreport' in Terminal or Command Prompt, open the HTML file it creates, and compare Design Capacity with Full Charge Capacity. The ratio shows how much capacity your battery has lost." },
      { q: "Why does my laptop lose battery while it's asleep?", a: "Most new laptops use Modern Standby, which stays lightly connected and can be kept awake by background apps. Run 'powercfg /sleepstudy' to find the cause, restrict the offending app, or use Hibernate for long breaks." },
      { q: "Does turning off the discrete GPU help battery life?", a: "Yes, a lot. On dual-GPU laptops, assign everyday apps to 'Power saving' (integrated) graphics in Settings > System > Display > Graphics, and keep any MUX switch in Optimus/Hybrid mode unless you're gaming on AC power." },
      { q: "Will background apps really drain my battery?", a: "Yes. Background apps keep the CPU, disk, and radios active and prevent low-power idle states. Restrict background permissions and trim startup apps to recover noticeable runtime." },
      { q: "Do third-party battery saver apps work?", a: "Usually not better than Windows' built-in tools, and many add their own background processes that cost power. Stick with Energy Saver, Power mode, and the powercfg diagnostics." },
    ],
  },
  {
    slug: "speed-up-slow-laptop-windows",
    title: "How to Speed Up a Slow Laptop on Windows",
    h1: "How to Speed Up a Slow Laptop on Windows (2026 Guide)",
    excerpt: "Practical, ordered steps to make a slow Windows 11 laptop fast again — from quick software fixes to the two upgrades that matter most.",
    category: "Maintenance",
    updated: "2026-06-08",
    readingTime: 14,
    answer:
      "To speed up a slow Windows laptop, restart it, trim startup and background apps, free up disk space, run a malware scan, update Windows and drivers, and switch the power mode to Balanced or Best performance when plugged in. If it is still slow, the two upgrades that help most are adding RAM (to 16GB) and moving to an SSD. Most laptops feel noticeably faster within an hour of these steps.",
    sections: [
      {
        heading: "Why laptops slow down over time",
        body: [
          "A laptop rarely slows down because the hardware 'wore out'. It slows because software piles up: startup programs, background services, browser extensions, fragmented or nearly-full storage, outdated drivers, and sometimes malware. A machine that felt fast new is usually still capable — it is just being asked to do more in the background than it should.",
          "The fixes below are ordered from fastest and free to more involved. Work top to bottom and re-test after each group; most people fix the problem long before reaching the hardware steps. If your laptop is also dropping battery fast, pair this with our guide on [how to extend your battery life on Windows](/laptop/learn/extend-battery-life-windows), since many of the same background processes cost both speed and runtime.",
        ],
      },
      {
        heading: "Quick wins (do these first)",
        body: [
          "- Restart properly. 'Shut down' with Fast Startup on does not fully reset Windows; choose Restart, which clears memory and stuck processes. Do this before anything else.",
          "- Close what you are not using. Too many open apps and browser tabs compete for RAM and CPU. Close them and see if responsiveness returns.",
          "- Set the power mode. On Settings > System > Power & battery, set Power mode to 'Balanced' or 'Best performance' while plugged in. 'Best power efficiency' can make a plugged-in laptop feel sluggish.",
          "- Check for a stuck process. Open Task Manager (Ctrl+Shift+Esc), sort by CPU, Memory, and Disk. If one app is pinning a resource at near 100%, that is your culprit — end it or address it specifically.",
          "- Install pending updates and reboot. A half-applied update can drag performance until it finishes.",
        ],
      },
      {
        heading: "Trim startup and background apps",
        body: [
          "The single most common cause of a slow-feeling laptop is too much launching at login and running in the background.",
          "### Startup apps",
          "Open Task Manager > 'Startup apps'. Disable anything with 'High' startup impact that you do not need the moment you log in — updaters, launchers, RGB and vendor utilities, and cloud drives you rarely touch. Fewer startup items means a faster, lighter desktop.",
          "### Background apps",
          "Go to Settings > Apps > Installed apps, open an app's 'Advanced options', and set 'Let this app run in the background' to 'Never' or 'Power optimized' for anything that does not need live updates. Chat, mail, and weather apps are frequent offenders.",
          "### Remove bloatware",
          "Uninstall manufacturer and trial software you never use (Settings > Apps > Installed apps). Many of these run background services that cost performance for no benefit.",
        ],
      },
      {
        heading: "Free up disk space",
        body: [
          "A nearly-full drive makes Windows slow, because it needs free space for temporary files, updates, and virtual memory. Aim to keep at least 15–20% of your drive free.",
          "- Run Storage Sense (Settings > System > Storage) to clear temporary files, the Recycle Bin, and old update files automatically.",
          "- Uninstall large apps and games you no longer play.",
          "- Move photos, videos, and large files to an external drive or cloud storage.",
          "- Use 'Cleanup recommendations' in Storage settings to find big and unused files quickly.",
          "If your laptop has a slow mechanical hard drive (HDD) rather than an SSD, this is also the clearest sign you would benefit from the SSD upgrade covered below.",
        ],
      },
      {
        heading: "Scan for malware",
        body: [
          "Malware and aggressive adware are a common, overlooked cause of slowdowns and constant disk or network activity. Windows Security (built in) is effective: open it and run a full scan, then a Microsoft Defender Offline scan for anything persistent. You do not need heavy third-party suites, which themselves can slow the system; if you run one, make sure you are not running two real-time scanners at once, which causes conflicts and lag.",
        ],
      },
      {
        heading: "Update Windows, drivers, and firmware",
        body: [
          "Outdated graphics and storage drivers can cause stutter and poor performance. Install all Windows updates (Settings > Windows Update), then update your graphics driver from Intel, AMD, or NVIDIA, and check your laptop maker's support app (Lenovo Vantage, MyASUS, Dell, HP) for BIOS/firmware updates. Firmware updates sometimes fix thermal-throttling and power bugs that quietly cap performance.",
          "If your laptop runs hot and then slows under load, that is thermal throttling, not a software problem — see [why your laptop overheats and how to fix it](/laptop/learn/laptop-overheating-fixes).",
        ],
      },
      {
        heading: "Tune Windows for speed",
        body: [
          "- Reduce visual effects: search 'Adjust the appearance and performance of Windows' and choose 'Adjust for best performance', or turn off animations and transparency in Settings > Accessibility > Visual effects.",
          "- Disable startup delay and unnecessary notifications that wake the system.",
          "- Turn off search indexing for drives you do not search often if disk usage is constantly high (advanced; optional).",
          "- Make sure you are not low on RAM: in Task Manager's Performance tab, if memory is consistently above ~80% during normal use, you are RAM-limited and the upgrade below will help most.",
        ],
      },
      {
        heading: "The two upgrades that actually matter",
        body: [
          "If software fixes are not enough, hardware is the answer — and only two upgrades reliably transform an older laptop.",
          "### Add RAM",
          "Going from 8GB to 16GB removes the single biggest bottleneck for multitasking and modern browsers. Check whether your laptop has accessible, socketed RAM (many thin laptops solder it and cannot be upgraded). Our reviews list each model's upgradeability; if you are buying, see [how much RAM you need](/laptop/learn/how-much-ram-do-you-need).",
          "### Switch to an SSD",
          "If your laptop still uses a mechanical hard drive, moving to an SSD is the most dramatic speed upgrade possible — boot, app launches, and file operations become many times faster. Most laptops from the last few years already have an SSD; if yours feels slow and has an HDD, this single change will feel like a new machine.",
          "If your laptop has soldered RAM and a non-replaceable SSD, and it is several years old, it may be more sensible to replace it. In that case, our [best laptops in Canada](/laptop/reviews/best/laptop) and the [results table](/laptop/tools/table) are the place to start.",
        ],
      },
      {
        heading: "Reset Windows as a last resort",
        body: [
          "If the laptop is still slow after everything above, a clean reset clears years of accumulated software cruft. Settings > System > Recovery > 'Reset this PC' lets you keep your files while reinstalling Windows. Back up first, and reinstall only the apps you actually use afterward — the point is to avoid rebuilding the same bloat. A fresh install often restores near-original performance on capable hardware.",
        ],
      },
      {
        heading: "Keep it fast: a short maintenance routine",
        body: [
          "- Restart at least once a week rather than only sleeping.",
          "- Review startup apps monthly and remove new additions.",
          "- Keep 15–20% of your drive free.",
          "- Install Windows, driver, and firmware updates promptly.",
          "- Run a full malware scan occasionally.",
          "- Clean the fans and vents a couple of times a year so heat does not force throttling.",
          "Do this and most laptops stay responsive for their whole life. If yours simply cannot keep up with what you need, that is a hardware ceiling, not a tuning problem — and it is time to compare new models rather than fight the old one.",
        ],
      },
    ],
    faq: [
      { q: "Why is my laptop so slow all of a sudden?", a: "Usually a background process, a pending update, low disk space, or malware. Open Task Manager, sort by CPU, Memory, and Disk to find what is pinned, restart, install updates, and run a malware scan." },
      { q: "Does adding RAM make a laptop faster?", a: "Yes, if you are RAM-limited. Going from 8GB to 16GB greatly improves multitasking and browsing. Check first whether your laptop's RAM is upgradeable, since many thin laptops solder it." },
      { q: "Will an SSD speed up my laptop?", a: "Dramatically, if you currently have a mechanical hard drive. Moving to an SSD is the biggest single speed upgrade for boot, app launches, and file operations." },
      { q: "Do I need a third-party PC cleaner app?", a: "No. Windows' built-in Storage Sense, Task Manager, and Windows Security do the real work. Many third-party 'cleaners' add background processes and provide little benefit." },
      { q: "Is it worth fixing a slow old laptop or buying new?", a: "If software fixes and a RAM/SSD upgrade are possible, fixing is usually cheaper. If the RAM and SSD are soldered and it is several years old, replacing it is often the better value." },
    ],
  },
  {
    slug: "laptop-overheating-fixes",
    title: "Why Is My Laptop Overheating? Causes and Fixes",
    h1: "Why Is My Laptop Overheating? Causes and Fixes (2026)",
    excerpt: "What makes laptops overheat, how to tell, and a step-by-step set of fixes — from airflow and dust to thermal paste and power limits.",
    category: "Maintenance",
    updated: "2026-06-08",
    readingTime: 13,
    answer:
      "Laptops overheat when heat is produced faster than the cooling system can remove it — usually from blocked vents, dust-clogged fans, a soft surface, heavy sustained workloads, or dried-out thermal paste. Fix it by using the laptop on a hard flat surface, cleaning the fans and vents, lowering the power/performance settings, closing runaway background processes, and, for older machines, repasting the cooler. Persistent overheating that none of these fix usually means a hardware or cooling fault.",
    sections: [
      {
        heading: "Why laptops overheat",
        body: [
          "Every laptop is a balance between the heat its processor and graphics chip produce and how quickly its fans and heat pipes can move that heat out. When something tips that balance — extra heat, less airflow, or worse heat transfer — temperatures climb. To protect itself, the laptop then throttles: it lowers clock speeds, which reduces performance and causes stutter, and spins the fans loud.",
          "Some warmth under load is completely normal, especially on thin and gaming laptops. Overheating is when the laptop runs hot at idle, throttles heavily during ordinary tasks, shuts down unexpectedly, or becomes uncomfortable to touch. The causes are almost always one of a short list, and most are fixable at home.",
        ],
      },
      {
        heading: "How to tell it is actually overheating",
        body: [
          "- Fans run loud and fast during light tasks like browsing.",
          "- The keyboard or underside becomes hot to the touch.",
          "- Performance drops or stutters after a few minutes of load (a sign of thermal throttling).",
          "- The laptop shuts down or restarts on its own under heavy use.",
          "You can confirm with a monitoring tool that shows CPU and GPU temperatures. Sustained temperatures pinned at the chip's limit (often around 95–100°C) with heavy throttling indicate a cooling problem worth addressing.",
        ],
      },
      {
        heading: "Quick fixes (start here)",
        body: [
          "- Use it on a hard, flat surface. Beds, couches, blankets, and laps block the intake vents underneath and trap heat. A desk or a lap desk fixes this instantly.",
          "- Check the vents. Make sure nothing is covering the exhaust and intake grilles. Even a few millimetres of clearance helps airflow.",
          "- Lower the power and performance settings. In Settings > System > Power & battery, try 'Balanced' instead of 'Best performance', or use your laptop maker's 'quiet'/'cool' thermal profile. This reduces the heat produced at the source.",
          "- Close runaway processes. Open Task Manager and look for an app pinning the CPU or GPU. A stuck process or background task can heat the laptop for no reason — end it.",
          "- Cool the room. Ambient temperature matters; a hot room leaves the cooling system less headroom. Avoid direct sun and hot cars.",
        ],
      },
      {
        heading: "Clean the fans and vents",
        body: [
          "Over months and years, dust clogs the fans and the fins of the heatsink, choking airflow. This is the most common cause of a laptop that used to run cool and now overheats.",
          "- For a quick clean, use short bursts of compressed air into the exhaust and intake vents, holding the fans still if you can so you do not spin them too fast.",
          "- For a thorough clean, if you are comfortable opening the laptop (and it will not void a warranty you care about), remove the bottom panel and gently clear dust from the fans and heatsink fins. This often drops temperatures by several degrees and quiets the fans noticeably.",
          "- If you have never cleaned a laptop that is a few years old, this step alone frequently solves the problem.",
        ],
      },
      {
        heading: "Replace the thermal paste (older laptops)",
        body: [
          "Thermal paste sits between the processor and the heatsink to transfer heat. Over several years it can dry out and lose effectiveness, causing higher temperatures even when everything else is clean. Repasting — removing the old paste and applying fresh paste — can meaningfully lower temperatures on an older laptop.",
          "This is a more advanced repair that involves opening the laptop and removing the cooler. If you are comfortable with it, it is inexpensive and effective. If not, a repair shop can do it quickly. Consider it when a laptop is several years old, runs hot despite clean fans, and you want to keep using it.",
        ],
      },
      {
        heading: "Reduce the heat at the source",
        body: [
          "Sometimes the cooling is fine and the workload is simply more than a thin laptop can sustain. You can lower the heat produced without giving up much usable performance.",
          "### Cap performance for everyday use",
          "In Windows power settings, lowering the 'Maximum processor state' (under advanced power options) to around 90–95% trims the least efficient boost clocks that produce the most heat, usually with little noticeable slowdown for ordinary tasks.",
          "### Use vendor and undervolting tools",
          "Manufacturer apps often include thermal profiles ('quiet', 'balanced', 'performance'). Use a cooler profile for daily work and save the performance profile for when you need it. On some laptops, undervolting reduces heat at the same performance, but it is advanced, can cause instability, and is often locked by the manufacturer — approach with caution.",
          "### Mind background load",
          "Heavy background processes — sync, indexing, updates, or a misbehaving app — generate heat continuously. The same steps that [speed up a slow laptop](/laptop/learn/speed-up-slow-laptop-windows) also reduce idle heat, and lowering sustained load helps both [battery life](/laptop/learn/extend-battery-life-windows) and temperatures.",
        ],
      },
      {
        heading: "Environment and accessories",
        body: [
          "- A cooling pad with fans can help, especially for gaming laptops on a desk, by feeding cooler air to the intakes. It is not a substitute for clean fans, but it adds headroom.",
          "- Keep the laptop out of enclosed spaces (a tight shelf, a thick sleeve while running) where hot air recirculates.",
          "- For sustained heavy work like gaming or video export, plug in and place the laptop where its exhaust is unobstructed; performance modes produce more heat by design.",
        ],
      },
      {
        heading: "When it is a hardware fault",
        body: [
          "If a laptop still overheats after clean fans, fresh paste, good airflow, and sensible power settings, the cooling hardware itself may be at fault — a failing fan, a detached heat pipe, or a manufacturing defect. Symptoms include a fan that never spins or rattles, one area that gets extremely hot, or shutdowns under light load. At that point, contact the manufacturer (especially under warranty) or a repair shop. Running a laptop that chronically overheats shortens the life of the battery and components, so it is worth resolving rather than ignoring.",
        ],
      },
      {
        heading: "Prevent overheating: a quick checklist",
        body: [
          "- Use the laptop on hard, flat surfaces with clear vents.",
          "- Clean fans and vents a couple of times a year.",
          "- Use cooler thermal/power profiles for everyday work.",
          "- Keep background load and runaway processes in check.",
          "- Plug in and ensure airflow for sustained heavy workloads.",
          "- Repaste older laptops that run hot despite clean cooling.",
          "Cooler laptops are quieter, faster (no throttling), and last longer. If you are shopping and thermals matter to you, our reviews measure fan noise and surface temperatures, and you can sort by them in the [results table](/laptop/tools/table); thin-and-light buyers may also like our [best laptops for working from home](/laptop/reviews/best/working-from-home).",
        ],
      },
    ],
    faq: [
      { q: "Is it normal for my laptop to get hot?", a: "Some warmth under load is normal, especially on thin and gaming laptops. It is a problem when the laptop runs hot at idle, throttles during light tasks, becomes uncomfortable to touch, or shuts down unexpectedly." },
      { q: "How do I stop my laptop from overheating?", a: "Use it on a hard flat surface with clear vents, clean the fans and vents, switch to a cooler power/thermal profile, close runaway background processes, and for older laptops, replace the thermal paste." },
      { q: "Can dust cause a laptop to overheat?", a: "Yes — dust-clogged fans and heatsinks are the most common cause of a laptop that used to run cool and now overheats. Cleaning them often fixes it." },
      { q: "Does a cooling pad actually help?", a: "It can add headroom, especially for gaming laptops on a desk, by feeding cooler air to the intakes. It is a supplement, not a substitute for clean fans and good airflow." },
      { q: "Is laptop overheating dangerous?", a: "Modern laptops throttle and shut down to protect themselves, so sudden damage is rare, but chronic heat shortens battery and component life and hurts performance, so it is worth fixing." },
    ],
  },
];

function quickGuide(slug: string, title: string, category: string, answer: string, related?: string): Guide[] {
  const fitsBody = [
    "Use this alongside our tested reviews and the [results table](/laptop/tools/table) to match the recommendation to a specific model and Canadian price.",
    "Every recommendation on BestLaptop.ca is based on standardized testing, not manufacturer claims.",
  ];
  if (related) fitsBody.push(related);
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
        { heading: "How this fits your buying decision", body: fitsBody },
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
