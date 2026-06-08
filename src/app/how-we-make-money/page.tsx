import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage } from "@/components/ContentPage";

export const metadata: Metadata = { title: "How We Make Money", description: "How BestLaptop.ca earns revenue through affiliate links, membership, and ads, and how we keep it separate from reviews.", alternates: { canonical: "/how-we-make-money" } };

export default function Page() {
  return (
    <ContentPage crumb="How We Make Money" title="How We Make Money" intro="Transparency about our revenue. None of it influences our scores or recommendations.">
      <h2>Affiliate links</h2>
      <p>When you buy through a retailer link on our site, we may earn a commission at no extra cost to you. We link to multiple Canadian retailers and always show the price. Commissions never change a score. See our <Link href="/affiliate-disclosure" className="link">affiliate disclosure</Link>.</p>
      <h2>Membership</h2>
      <p><Link href="/membership" className="link">Membership</Link> funds independent testing and adds optional features like saved comparisons, custom ratings, and deal alerts. Reviews and scores remain free for everyone.</p>
      <h2>Display ads</h2>
      <p>We may show display advertising. Ads are clearly distinguishable from editorial content and do not influence reviews.</p>
      <h2>Sponsored placements</h2>
      <p>Any sponsored content is clearly labelled as such. Sponsors cannot buy a score, a ranking, or a recommendation.</p>
      <h2>The firewall</h2>
      <p>Editorial and commercial teams operate separately. Test results and scores are decided before any commercial consideration. Read our <Link href="/editorial-policy" className="link">editorial and independence policy</Link>.</p>
    </ContentPage>
  );
}
