import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";

export const metadata: Metadata = { title: "Privacy Policy", description: "How BestLaptop.ca collects, uses, and protects your information.", alternates: { canonical: "/privacy-policy" } };

export default function Page() {
  return (
    <ContentPage crumb="Privacy Policy" title="Privacy Policy" intro="Last updated June 2026. This summary explains how we handle your information.">
      <h2>Information we collect</h2>
      <p>We collect basic analytics (such as pages viewed and device type) and any information you provide directly, such as your email when you subscribe to our newsletter.</p>
      <h2>How we use it</h2>
      <ul>
        <li>To operate and improve the site and our tools.</li>
        <li>To send our newsletter and deal alerts if you opt in.</li>
        <li>To respond to messages you send us through the contact form.</li>
      </ul>
      <h2>Cookies and analytics</h2>
      <p>We use cookies and analytics (such as GA4) to understand how the site is used. You can control cookies through your browser settings.</p>
      <h2>Affiliate links</h2>
      <p>Retailer links may set their own cookies to attribute purchases. See our affiliate disclosure for details.</p>
      <h2>Your choices</h2>
      <p>You can unsubscribe from emails at any time and request deletion of your account data by contacting us.</p>
      <h2>Contact</h2>
      <p>Questions about privacy? Email privacy@bestlaptop.ca.</p>
    </ContentPage>
  );
}
