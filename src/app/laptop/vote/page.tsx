import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SecondaryNav } from "@/components/SecondaryNav";
import { VoteTool } from "@/components/tools/VoteTool";

export const metadata: Metadata = {
  title: "Vote for the Next Laptop Review",
  description: "Vote for the laptop you want us to buy and test next. Sort by popularity, filter by brand, and add your own request.",
  alternates: { canonical: "/laptop/vote" },
};

export default function VotePage() {
  return (
    <>
      <SecondaryNav />
      <Breadcrumbs items={[{ label: "Laptops", href: "/laptop" }, { label: "Vote" }]} />
      <div className="container-site pb-12">
        <h1 className="text-3xl font-extrabold">Vote for the Next Laptop We Review</h1>
        <p className="mb-6 mt-2 max-w-2xl text-ink-500">Your votes decide what we buy and test next. The most-requested laptops move up our pipeline.</p>
        <VoteTool />
      </div>
    </>
  );
}
