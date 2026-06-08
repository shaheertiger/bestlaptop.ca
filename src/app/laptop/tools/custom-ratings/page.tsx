import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SecondaryNav } from "@/components/SecondaryNav";
import { CustomRatings } from "@/components/tools/CustomRatings";

export const metadata: Metadata = {
  title: "Custom Laptop Ratings — Reweight Scores Around Your Needs",
  description: "Customize how much each test category counts and re-rank every laptop for your priorities: student, business, gaming, creative, programming, travel, or budget.",
  alternates: { canonical: "/laptop/tools/custom-ratings" },
};

export default function CustomRatingsPage() {
  return (
    <>
      <SecondaryNav />
      <Breadcrumbs items={[{ label: "Laptops", href: "/laptop" }, { label: "Tools" }, { label: "Custom Ratings" }]} />
      <div className="container-site pb-12">
        <h1 className="text-3xl font-extrabold">Custom Ratings</h1>
        <p className="mb-6 mt-2 max-w-2xl text-ink-500">Adjust how much each test category matters to you, or pick a preset, and we'll re-rank every laptop using your weighting.</p>
        <CustomRatings />
      </div>
    </>
  );
}
