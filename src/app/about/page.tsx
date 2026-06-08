import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage } from "@/components/ContentPage";

export const metadata: Metadata = { title: "About BestLaptop.ca", description: "BestLaptop.ca is Canada's independent laptop testing site. Learn who we are and how we work.", alternates: { canonical: "/about" } };

export default function AboutPage() {
  return (
    <ContentPage crumb="About" title="About BestLaptop.ca" intro="We're an independent Canadian laptop testing site. We buy laptops, test them the same way, and publish the data behind every score.">
      <p>BestLaptop.ca exists to make buying a laptop in Canada simpler and more transparent. There are thousands of laptops sold here, with confusing model names and prices that change constantly. We cut through that with standardized testing, clear scoring, and Canadian pricing.</p>
      <h2>What we do</h2>
      <ul>
        <li>Buy and test laptops on a consistent <Link href="/laptop/learn/how-we-test" className="link">Test Bench</Link>.</li>
        <li>Publish objective reviews, comparisons, and rankings.</li>
        <li>Track Canadian prices and deals across major retailers.</li>
        <li>Build tools that help you choose: a results table, compare tool, graph tool, and custom ratings.</li>
      </ul>
      <h2>How we stay independent</h2>
      <p>No manufacturer pays for a score or approves a review. We fund our work through affiliate commissions and memberships, kept separate from editorial decisions. Read our <Link href="/editorial-policy" className="link">editorial policy</Link> and <Link href="/how-we-make-money" className="link">how we make money</Link>.</p>
      <h2>Contact</h2>
      <p>Questions, corrections, or testing requests? <Link href="/contact" className="link">Get in touch</Link>.</p>
    </ContentPage>
  );
}
