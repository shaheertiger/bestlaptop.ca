import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";

export const metadata: Metadata = { title: "Terms of Use", description: "The terms governing your use of BestLaptop.ca.", alternates: { canonical: "/terms" } };

export default function Page() {
  return (
    <ContentPage crumb="Terms of Use" title="Terms of Use" intro="Last updated June 2026. By using BestLaptop.ca, you agree to these terms.">
      <h2>Use of content</h2>
      <p>Our reviews, test data, scores, and articles are provided for your personal, non-commercial use. You may not republish or scrape our content without permission.</p>
      <h2>No warranty</h2>
      <p>We work hard to test accurately, but we provide our content "as is" without warranties. Prices, availability, and specifications change; always confirm details with the retailer before buying.</p>
      <h2>Affiliate links</h2>
      <p>Some links are affiliate links. See our affiliate disclosure. We are not responsible for third-party retailer policies, pricing, or fulfilment.</p>
      <h2>Limitation of liability</h2>
      <p>BestLaptop.ca is not liable for purchasing decisions made based on our content. Use your own judgement and verify details before buying.</p>
      <h2>Changes</h2>
      <p>We may update these terms. Continued use of the site means you accept the current terms.</p>
    </ContentPage>
  );
}
