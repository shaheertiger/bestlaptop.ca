import { SITE } from "@/lib/site";
import { laptops, laptopHref } from "@/data/laptops";

export const dynamic = "force-static";

export function GET() {
  const items = [...laptops]
    .sort((a, b) => b.testedDate.localeCompare(a.testedDate))
    .map((l) => `
    <item>
      <title>${escapeXml(`${l.brand} ${l.model} Review`)}</title>
      <link>${SITE.url}${laptopHref(l)}</link>
      <guid>${SITE.url}${laptopHref(l)}</guid>
      <pubDate>${new Date(l.testedDate).toUTCString()}</pubDate>
      <description>${escapeXml(l.verdict)}</description>
    </item>`)
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${SITE.name} — Laptop Reviews</title>
    <link>${SITE.url}</link>
    <description>${escapeXml(SITE.tagline)}</description>
    <language>en-CA</language>${items}
  </channel>
</rss>`;

  return new Response(xml, { headers: { "Content-Type": "application/xml" } });
}

function escapeXml(s: string): string {
  return s.replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[c]!));
}
