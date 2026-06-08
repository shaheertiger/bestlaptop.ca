import type { Metadata } from "next";
import { LandingPage } from "@/components/sections";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Laptops — Reviews, Comparisons & Buying Guides (Canada)",
  description: "Find the best laptop for your needs with independent testing, Canadian pricing, comparisons, and buying guides.",
  alternates: { canonical: "/laptop" },
};

export default function LaptopLanding() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Laptops", href: "/laptop" }]} />
      <LandingPage
        h1="Find the Best Laptop for Your Needs"
        intro="We buy and test laptops in Canada, then publish objective reviews, comparisons, and rankings with local pricing and availability."
        whatsNewLabel="What's New in Computers"
      />
    </>
  );
}
