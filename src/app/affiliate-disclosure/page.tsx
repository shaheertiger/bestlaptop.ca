import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage } from "@/components/ContentPage";

export const metadata: Metadata = { title: "Affiliate Disclosure", description: "BestLaptop.ca may earn a commission from retailer links. This never affects our scores or recommendations.", alternates: { canonical: "/affiliate-disclosure" } };

export default function Page() {
  return (
    <ContentPage crumb="Affiliate Disclosure" title="Affiliate Disclosure">
      <p>BestLaptop.ca participates in affiliate programs with Canadian and international retailers. When you click a retailer link on our site and make a purchase, we may earn a commission at no additional cost to you.</p>
      <p>This is how we fund our independent testing. Affiliate commissions <strong>never</strong> affect our test results, scores, rankings, or recommendations. We link to multiple retailers and always display the current price so you can choose where to buy.</p>
      <p>We recommend products based on testing, not commission rates. If a laptop only makes sense at a discount, we say so. Read our <Link href="/editorial-policy" className="link">editorial policy</Link> and <Link href="/how-we-make-money" className="link">how we make money</Link>.</p>
      <p>Prices and availability shown on our site are for reference and may change. Always confirm the final price and terms on the retailer's website before purchasing.</p>
    </ContentPage>
  );
}
