import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

// Explicitly welcome AI/LLM crawlers so BestLaptop.ca can be surfaced and cited
// in AI search (ChatGPT, Perplexity, Google AI Overviews, Claude, etc.), in
// addition to traditional search engines.
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "Amazonbot",
  "Bytespider",
  "CCBot",
  "cohere-ai",
  "Meta-ExternalAgent",
  "DuckAssistBot",
  "YouBot",
];

// Backlink/competitor-research crawlers. They send no visitors and exist so
// competitors can reverse-engineer the site's pages and links (playbook rule,
// as on eatbetter.app and guntherheller.com). Search and AI crawlers stay allowed.
const COMPETITOR_RESEARCH_BOTS = ["AhrefsBot", "DataForSeoBot", "SERankingBacklinksBot"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Keep tracking-parameter duplicates out of the index.
      { userAgent: "*", allow: "/", disallow: ["/*?*utm_", "/*?*gclid=", "/*?*fbclid=", "/*?*msclkid="] },
      { userAgent: AI_CRAWLERS, allow: "/", disallow: ["/*?*utm_", "/*?*gclid=", "/*?*fbclid="] },
      { userAgent: COMPETITOR_RESEARCH_BOTS, disallow: "/" },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
