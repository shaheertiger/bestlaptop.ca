import { renderIndex } from "@/lib/sitemap";

// /sitemap.xml is a sitemap index pointing at one sitemap per page family
// (/sitemaps/{family}.xml). Keeps the URL already submitted to Search Console.
export const dynamic = "force-static";

export function GET() {
  return new Response(renderIndex(), { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
