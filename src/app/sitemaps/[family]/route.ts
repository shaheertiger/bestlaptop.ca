import { SITEMAP_FAMILIES, renderUrlset, sitemapFamily, type SitemapFamily } from "@/lib/sitemap";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return SITEMAP_FAMILIES.map((f) => ({ family: `${f}.xml` }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ family: string }> }) {
  const { family } = await params;
  const name = family.replace(/\.xml$/, "") as SitemapFamily;
  if (!SITEMAP_FAMILIES.includes(name)) return new Response("Not found", { status: 404 });
  return new Response(renderUrlset(sitemapFamily(name)), { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
