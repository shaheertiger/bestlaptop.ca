import type { Metadata } from "next";
import { LandingPage } from "@/components/sections";
import { SITE } from "@/lib/site";

const title = "Best Laptops in Canada (2026): Tested Reviews, Prices & Comparisons";
const description =
  "Find the best laptop in Canada for 2026. We test laptops in our lab and rank them by real battery life, speed and CAD price: best overall, budget, student, gaming and more.";

export const metadata: Metadata = {
  title: { absolute: `${title} | ${SITE.name}` },
  description,
  alternates: { canonical: "/", languages: { "en-CA": "/", "fr-CA": "/fr", "x-default": "/" } },
  openGraph: { title, description, url: "/" },
};

export default function HomePage() {
  return (
    <LandingPage
      h1="The Best Laptops in Canada (2026), Tested"
      intro="Independent laptop reviews with lab-measured battery life and performance, Canadian prices, side-by-side comparisons, and test-based buying advice."
      whatsNewLabel="What's New in Laptops"
    />
  );
}
