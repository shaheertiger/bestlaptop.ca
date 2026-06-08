import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SecondaryNav } from "@/components/SecondaryNav";
import { DealCard } from "@/components/DealCard";
import { AffiliateDisclosure } from "@/components/blocks";
import { Newsletter } from "@/components/Newsletter";
import { deals, dealCategories } from "@/data/pipeline";

export function generateStaticParams() {
  return dealCategories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const c = dealCategories.find((x) => x.slug === category);
  if (!c) return {};
  return {
    title: c.title,
    description: `${c.title}: current deals with price history, deal quality scores, and retailer availability across Canada.`,
    alternates: { canonical: `/laptop/deals/${c.slug}` },
  };
}

export default async function DealCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = dealCategories.find((x) => x.slug === category);
  if (!cat) notFound();
  const list = deals.filter((d) => d.category.includes(cat.tag));

  return (
    <>
      <SecondaryNav />
      <Breadcrumbs items={[{ label: "Laptops", href: "/laptop" }, { label: "Deals", href: "/laptop/deals" }, { label: cat.title.replace("Best ", "").replace(" in Canada", "") }]} />
      <div className="container-site pb-12">
        <h1 className="text-3xl font-extrabold">{cat.title}</h1>
        <div className="my-4 flex flex-wrap gap-2">
          {dealCategories.filter((c) => c.slug !== cat.slug && c.slug !== "best-laptop-deals-canada").map((c) => (
            <Link key={c.slug} href={`/laptop/deals/${c.slug}`} className="chip hover:bg-brand-100">{c.title.replace("Best ", "").replace(" in Canada", "")}</Link>
          ))}
        </div>
        <div className="mb-6"><AffiliateDisclosure /></div>
        {list.length ? (
          <div className="grid gap-5 md:grid-cols-2">{list.map((d, i) => <DealCard key={i} deal={d} />)}</div>
        ) : (
          <p className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-ink-500">No current deals in this category. Check <Link href="/laptop/deals" className="link">all laptop deals</Link>.</p>
        )}
      </div>
      <Newsletter />
    </>
  );
}
