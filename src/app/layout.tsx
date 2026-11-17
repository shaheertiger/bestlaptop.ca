import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { Archivo } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SITE } from "@/lib/site";
import { Analytics } from "@vercel/analytics/next";

// One family, two voices: Archivo's width axis gives expanded "spec plate"
// headlines and scores, normal width for reading.
const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo", display: "swap" });

const ADSENSE_CLIENT = "ca-pub-2963693328827195";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Best Laptops in Canada 2026, Reviews & Comparisons`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: `${SITE.name} Test Team`, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "Technology",
  keywords: [
    "best laptops Canada 2026", "laptop reviews Canada", "best laptop 2026",
    "laptop comparison", "laptop buying guide Canada", "laptop deals Canada",
    "best gaming laptop Canada", "best student laptop Canada",
  ],
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_CA",
    url: SITE.url,
    title: `${SITE.name} — Best Laptops in Canada 2026`,
    description: SITE.description,
  },
  twitter: { card: "summary_large_image", site: "@bestlaptopca", creator: "@bestlaptopca" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: false },
  other: { "google-adsense-account": ADSENSE_CLIENT },
};

export const viewport: Viewport = {
  themeColor: "#0E3B43",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/icon.svg`,
    description: SITE.description,
    foundingDate: "2024",
    areaServed: { "@type": "Country", name: "Canada" },
    sameAs: Object.values(SITE.social),
  };
  const siteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    inLanguage: "en-CA",
    publisher: { "@type": "Organization", name: SITE.name, logo: `${SITE.url}/icon.svg` },
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${SITE.url}/laptop/tools/table?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };
  return (
    <html lang="en-CA" className={archivo.variable}>
      <head>
        <Script
          id="adsbygoogle-init"
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteLd) }} />
        <a href="#main" className="skip-link">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
