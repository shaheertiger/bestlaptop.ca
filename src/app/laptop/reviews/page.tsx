import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SecondaryNav } from "@/components/SecondaryNav";
import { ReviewRowCard } from "@/components/LaptopCard";
import { Newsletter } from "@/components/Newsletter";
import { laptops } from "@/data/laptops";

export const metadata: Metadata = {
  title: "All Laptop Reviews (Canada)",
  description: "Browse every BestLaptop.ca laptop review with overall scores, tested dates, and Canadian pricing.",
  alternates: { canonical: "/laptop/reviews" },
};

export default function ReviewListPage() {
  const reviews = [...laptops].filter((l) => l.status === "published").sort((a, b) => b.testedDate.localeCompare(a.testedDate));
  return (
    <>
      <SecondaryNav />
      <Breadcrumbs items={[{ label: "Laptops", href: "/laptop" }, { label: "Reviews" }]} />
      <div className="container-site pb-12">
        <header className="mb-6">
          <h1 className="text-3xl font-extrabold">Laptop Reviews</h1>
          <p className="mt-2 text-ink-500">
            Every laptop we have tested, newest first. Each review is based on our standardized Test Bench.{" "}
            <a href="/laptop/reviews/index" className="link">Browse the alphabetical index</a>.
          </p>
        </header>
        <div className="grid gap-4">
          {reviews.map((l) => <ReviewRowCard key={l.id} laptop={l} />)}
        </div>
      </div>
      <Newsletter />
    </>
  );
}
