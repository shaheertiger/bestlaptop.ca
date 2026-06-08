import type { Brand } from "@/lib/types";

export const brands: Brand[] = [
  {
    slug: "apple",
    name: "Apple",
    overview:
      "Apple makes the MacBook Air and MacBook Pro, both built around Apple Silicon. The lineup is small but consistently leads on performance per watt, battery life, and display quality.",
    strengths: ["Excellent battery life", "Strong performance per watt", "Great displays and speakers", "Long software support"],
    weaknesses: ["High prices in Canada", "Limited gaming library", "No upgradeable RAM or storage", "Few ports on the Air"],
    buyerProfile: "Students, creators, and professionals who value battery life and a polished ecosystem.",
    bestUseCases: ["Video editing", "Programming", "Everyday use", "School"],
    faq: [
      { q: "Are MacBooks worth it in Canada?", a: "For creators and people who value battery life, yes. Budget buyers and gamers are better served by Windows laptops." },
      { q: "Can you upgrade a MacBook's RAM?", a: "No. RAM and storage are fixed at purchase, so buy more than you think you need." },
    ],
  },
  {
    slug: "lenovo",
    name: "Lenovo",
    overview:
      "Lenovo's range spans ThinkPad business laptops, Yoga convertibles, IdeaPad budget machines, and Legion gaming laptops. ThinkPads are known for their keyboards and durability.",
    strengths: ["Best-in-class keyboards", "Durable ThinkPad builds", "Wide range and price points", "Good upgradeability on many models"],
    weaknesses: ["Confusing model naming", "Webcams are often average", "Premium models get expensive"],
    buyerProfile: "Business users, programmers, and gamers who want durable, practical machines.",
    bestUseCases: ["Business", "Programming", "Gaming"],
    faq: [
      { q: "Are ThinkPads good for programming?", a: "Yes. They offer excellent keyboards, strong performance options, and good Linux support." },
      { q: "What is the difference between Legion and ThinkPad?", a: "Legion is Lenovo's gaming line; ThinkPad is its business line focused on durability and typing." },
    ],
  },
  {
    slug: "dell",
    name: "Dell",
    overview:
      "Dell makes the premium XPS line, business-focused Latitude laptops, and budget Inspiron models. The XPS line is known for compact, premium ultraportables.",
    strengths: ["Premium XPS build quality", "Good business support options", "Strong displays", "Reliable warranties"],
    weaknesses: ["Limited ports on XPS", "Minimalist keyboards divide users", "Budget Inspirons feel cheap"],
    buyerProfile: "Professionals and travellers who want a premium, compact Windows laptop.",
    bestUseCases: ["Business", "Travel", "Everyday use"],
    faq: [
      { q: "Is the Dell XPS good for travel?", a: "Yes. It is compact, light, and has strong battery life, though it is light on ports." },
    ],
  },
  {
    slug: "hp",
    name: "HP",
    overview:
      "HP's lineup includes premium Spectre and Envy laptops, business EliteBooks, and budget Pavilions. Spectre convertibles stand out for design and OLED displays.",
    strengths: ["Attractive premium designs", "Good OLED options", "Strong 2-in-1 lineup", "Wide retail availability in Canada"],
    weaknesses: ["Budget models vary in quality", "Battery life is mid-pack", "Bloatware on consumer models"],
    buyerProfile: "Hybrid workers and buyers who want a stylish convertible or premium clamshell.",
    bestUseCases: ["Hybrid work", "Media", "Business"],
    faq: [
      { q: "Is the HP Spectre x360 good for work?", a: "Yes. It is a flexible 2-in-1 with an excellent OLED touchscreen, suited to hybrid work." },
    ],
  },
  {
    slug: "asus",
    name: "ASUS",
    overview:
      "ASUS spans ROG and TUF gaming laptops, Zenbook ultraportables, and budget Vivobooks and Chromebooks. ROG gaming laptops are among the best-cooled compact options.",
    strengths: ["Strong gaming lineup", "Good OLED Zenbooks", "Competitive value", "Innovative designs"],
    weaknesses: ["Software can be cluttered", "Build quality varies by line", "Support is hit or miss"],
    buyerProfile: "Gamers and value-focused buyers who want performance for the price.",
    bestUseCases: ["Gaming", "Creative work", "Budget"],
    faq: [
      { q: "Are ASUS ROG laptops good?", a: "Yes. ROG laptops offer strong gaming performance and good cooling, often in compact bodies." },
    ],
  },
  {
    slug: "acer",
    name: "Acer",
    overview:
      "Acer is known for value across the Aspire and Swift everyday lines, Predator and Nitro gaming laptops, and a strong Chromebook range.",
    strengths: ["Excellent value", "Good upgradeability on Aspire", "Wide budget range", "Solid Chromebooks"],
    weaknesses: ["Average displays on budget models", "Plastic builds", "Mediocre webcams"],
    buyerProfile: "Budget buyers and students who want the most laptop for the money.",
    bestUseCases: ["Budget", "School", "Everyday use"],
    faq: [
      { q: "Are Acer laptops reliable?", a: "Acer's value lineup is reliable for everyday use, though build materials are basic at lower prices." },
    ],
  },
  {
    slug: "microsoft",
    name: "Microsoft Surface",
    overview:
      "Microsoft's Surface line includes the Surface Laptop and Surface Pro. They are known for clean design, tall 3:2 displays, and tight Windows integration.",
    strengths: ["Polished design", "Tall, sharp 3:2 displays", "Good battery life", "Clean software"],
    weaknesses: ["Limited ports", "Few configuration options", "Premium pricing"],
    buyerProfile: "Students and professionals who want a refined Windows experience.",
    bestUseCases: ["School", "Business", "Travel"],
    faq: [
      { q: "Is the Surface Laptop good for students?", a: "Yes. It has a great display, long battery life, and a compact build well suited to class." },
    ],
  },
  { slug: "msi", name: "MSI", overview: "MSI focuses on gaming and creator laptops, from the Stealth and Raider gaming lines to the Creator and Prestige series.", strengths: ["Strong gaming performance", "Creator-focused options", "High-refresh displays"], weaknesses: ["Bulkier designs", "Average battery life", "Software polish"], buyerProfile: "Gamers and creators who want raw performance.", bestUseCases: ["Gaming", "Creative work"], faq: [{ q: "Are MSI laptops good for editing?", a: "Yes, the Creator line targets video and photo work with strong GPUs and accurate displays." }] },
  { slug: "samsung", name: "Samsung", overview: "Samsung's Galaxy Book line offers thin, light laptops with excellent AMOLED displays and tight integration with Galaxy phones.", strengths: ["Excellent AMOLED displays", "Thin and light", "Good Galaxy ecosystem integration"], weaknesses: ["Limited availability in Canada", "Average performance under load", "Few ports"], buyerProfile: "Galaxy phone owners who want a light, vivid-screen laptop.", bestUseCases: ["Media", "Everyday use", "Travel"], faq: [{ q: "Is the Galaxy Book good for media?", a: "Yes, its AMOLED display is one of the best for streaming and content." }] },
  { slug: "lg", name: "LG", overview: "LG's gram line is known for being extremely light for its screen size, with large displays and long battery life.", strengths: ["Very lightweight", "Large screens", "Long battery life"], weaknesses: ["Flexy chassis", "Premium pricing", "Average speakers"], buyerProfile: "Travellers who want the lightest large-screen laptop.", bestUseCases: ["Travel", "Business"], faq: [{ q: "Why is the LG gram so light?", a: "LG uses a magnesium alloy chassis to cut weight, which slightly reduces rigidity." }] },
  { slug: "razer", name: "Razer", overview: "Razer's Blade laptops combine premium aluminium builds with strong gaming hardware in a clean, professional design.", strengths: ["Premium aluminium build", "Strong gaming hardware", "Clean design"], weaknesses: ["Very expensive", "Runs warm", "Average battery life"], buyerProfile: "Gamers who want a premium, understated gaming laptop.", bestUseCases: ["Gaming", "Creative work"], faq: [{ q: "Is the Razer Blade worth it?", a: "It is for buyers who want premium build and gaming power in one machine, but it carries a price premium." }] },
  { slug: "gigabyte", name: "Gigabyte", overview: "Gigabyte's Aorus and Aero lines target gamers and creators with high-performance hardware at competitive prices.", strengths: ["Competitive performance pricing", "Creator-focused Aero line", "High-refresh displays"], weaknesses: ["Bulky", "Average battery life", "Limited Canadian retail"], buyerProfile: "Performance buyers who want value.", bestUseCases: ["Gaming", "Creative work"], faq: [{ q: "Are Gigabyte laptops good value?", a: "Yes, they often undercut bigger brands on performance per dollar." }] },
  { slug: "framework", name: "Framework", overview: "Framework builds modular, repairable laptops with swappable ports and user-upgradeable components, focused on longevity.", strengths: ["Highly repairable", "User-upgradeable", "Swappable ports", "Long-term value"], weaknesses: ["Limited Canadian availability", "Average battery life", "Premium for the specs"], buyerProfile: "Buyers who value repairability and upgrading over years.", bestUseCases: ["Programming", "Everyday use"], faq: [{ q: "Can you upgrade a Framework laptop?", a: "Yes. RAM, storage, ports, and even the mainboard are user-replaceable." }] },
];

export function getBrand(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug);
}
