export const SITE = {
  name: "BestLaptop.ca",
  url: "https://bestlaptop.ca",
  tagline: "Independent laptop reviews, Canadian prices, side-by-side comparisons, and test-based buying advice.",
  description:
    "BestLaptop.ca is Canada's independent laptop testing site. We buy and test laptops, then publish objective 2026 reviews, comparisons, rankings, deals, and buying guides with Canadian pricing.",
  testBench: "1.2",
  metrics: {
    tested: 184,
    inTesting: 6,
    recentlyReviewed: 18,
  },
  social: {
    youtube: "https://youtube.com/@bestlaptopca",
    instagram: "https://instagram.com/bestlaptopca",
    x: "https://x.com/bestlaptopca",
    linkedin: "https://linkedin.com/company/bestlaptopca",
  },
};

// Primary navigation
export const primaryNav = [
  { label: "Best", href: "/laptop/reviews/best/laptop" },
  { label: "Reviews", href: "/laptop/reviews" },
  { label: "Compare", href: "/laptop/tools/compare" },
  { label: "Table Tool", href: "/laptop/tools/table" },
  { label: "Deals", href: "/laptop/deals" },
  { label: "Buying Guides", href: "/laptop/learn/how-to-choose-a-laptop" },
  { label: "How We Test", href: "/laptop/learn/how-we-test" },
  { label: "Brands", href: "/laptop/brands" },
  { label: "News", href: "/laptop/news" },
];

// Tools used in secondary nav and tool cards
export const toolsNav = [
  { label: "Compare", href: "/laptop/tools/compare", desc: "Put 2–4 laptops side by side and highlight category winners.", icon: "compare" },
  { label: "Results Table", href: "/laptop/tools/table", desc: "Sort and filter every tested laptop by score, price, and specs.", icon: "table" },
  { label: "Review List", href: "/laptop/reviews", desc: "Browse every laptop review with scores and Canadian prices.", icon: "list" },
  { label: "Review Index", href: "/laptop/reviews/index", desc: "Alphabetical index of reviews grouped by brand and series.", icon: "index" },
  { label: "Graph Tool", href: "/laptop/tools/graph", desc: "Plot test results across laptops on bar and scatter charts.", icon: "graph" },
  { label: "Review Pipeline", href: "/laptop/review-pipeline", desc: "See what we have bought, are testing, and will publish next.", icon: "pipeline" },
  { label: "Vote for Laptops", href: "/laptop/vote", desc: "Vote for the next laptop we buy and review.", icon: "vote" },
  { label: "Custom Ratings", href: "/laptop/tools/custom-ratings", desc: "Reweight scores around what matters to you.", icon: "ratings" },
];

export const footerNav = {
  company: [
    { label: "About", href: "/about" },
    { label: "How We Make Money", href: "/how-we-make-money" },
    { label: "Contact", href: "/contact" },
  ],
  editorial: [
    { label: "Editorial Policy", href: "/editorial-policy" },
    { label: "How We Test", href: "/laptop/learn/how-we-test" },
    { label: "Affiliate Disclosure", href: "/affiliate-disclosure" },
    { label: "Popular Searches", href: "/laptop/popular-searches" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Use", href: "/terms" },
    { label: "RSS", href: "/rss.xml" },
  ],
};
