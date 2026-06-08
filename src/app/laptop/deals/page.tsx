import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SecondaryNav } from "@/components/SecondaryNav";
import { DealCard } from "@/components/DealCard";
import { AffiliateDisclosure } from "@/components/blocks";
import { Newsletter } from "@/components/Newsletter";
import { deals, dealCategories } from "@/data/pipeline";

export const metadata: Metadata = {
  title: "Best Laptop Deals in Canada (Live)",
  description: "Current laptop deals in Canada with price history, deal quality scores, retailer, condition, and warranty notes. Updated regularly.",
  alternates: { canonical: "/laptop/deals" },
};

export default function DealsPage() {
  const sorted = [...deals].sort((a, b) => (b.previousPrice - b.currentPrice) / b.previousPrice - (a.previousPrice - a.currentPrice) / a.previousPrice);
  return (
    <>
      <SecondaryNav />
      <Breadcrumbs items={[{ label: "Laptops", href: "/laptop" }, { label: "Deals" }]} />
      <div className="container-site pb-12">
        <header className="mb-6">
          <h1 className="text-3xl font-extrabold">Best Laptop Deals in Canada</h1>
          <p className="mt-2 max-w-2xl text-ink-500">Hand-checked deals on laptops we have tested, ranked by discount and deal quality. Prices are tracked across major Canadian retailers.</p>
        </header>

        <div className="mb-6 flex flex-wrap gap-2">
          {dealCategories.filter((c) => c.slug !== "best-laptop-deals-canada").map((c) => (
            <Link key={c.slug} href={`/laptop/deals/${c.slug}`} className="chip hover:bg-brand-100">{c.title.replace("Best ", "").replace(" in Canada", "")}</Link>
          ))}
        </div>

        <div className="mb-6"><AffiliateDisclosure /></div>

        <div className="grid gap-5 md:grid-cols-2">
          {sorted.map((d, i) => <DealCard key={i} deal={d} />)}
        </div>
      </div>
      <Newsletter />
    </>
  );
}
