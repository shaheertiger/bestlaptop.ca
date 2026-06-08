import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SITE } from "@/lib/site";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Canadian Laptop Reviews, Comparisons & Buying Guides`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: ["laptop reviews Canada", "best laptops Canada", "laptop comparison", "laptop buying guide", "laptop deals Canada"],
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_CA",
    url: SITE.url,
    title: `${SITE.name} — Canadian Laptop Reviews & Comparisons`,
    description: SITE.description,
  },
  twitter: { card: "summary_large_image", site: "@bestlaptopca" },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    sameAs: Object.values(SITE.social),
  };
  return (
    <html lang="en-CA">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
        <a href="#main" className="skip-link">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
