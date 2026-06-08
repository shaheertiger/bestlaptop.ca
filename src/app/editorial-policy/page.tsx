import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage } from "@/components/ContentPage";

export const metadata: Metadata = { title: "Editorial & Independence Policy", description: "BestLaptop.ca's editorial standards and independence policy: how we source products, score, and avoid conflicts of interest.", alternates: { canonical: "/editorial-policy" } };

export default function Page() {
  return (
    <ContentPage crumb="Editorial Policy" title="Editorial & Independence Policy" intro="The standards that govern how we test, score, and publish.">
      <h2>Our standards</h2>
      <ul>
        <li>We test every laptop on a consistent, documented <Link href="/laptop/learn/how-we-test" className="link">Test Bench</Link>.</li>
        <li>Scores follow a published 10-point weighting and are based on measurements, not impressions alone.</li>
        <li>We write in plain, original language and avoid hype.</li>
        <li>We disclose affiliate relationships and sponsored content clearly.</li>
      </ul>
      <h2 id="independence">Independence policy</h2>
      <ul>
        <li>We buy or independently source review units whenever possible.</li>
        <li>We disclose loaned products and return them after testing.</li>
        <li>Editorial and affiliate decisions are kept separate.</li>
        <li>Brands do not see or approve reviews before publication.</li>
        <li>We update reviews when software, firmware, pricing, or configurations change.</li>
        <li>Sponsored content is always clearly marked.</li>
      </ul>
      <h2>Corrections</h2>
      <p>We correct errors promptly and note material changes. If you spot a mistake, <Link href="/contact" className="link">tell us</Link> and include supporting data where possible.</p>
      <h2>Funding</h2>
      <p>We're funded by affiliate commissions. They never influence our scores. See <Link href="/how-we-make-money" className="link">how we make money</Link>.</p>
    </ContentPage>
  );
}
