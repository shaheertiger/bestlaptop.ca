import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FrenchPicksTable, FrenchSections, FrenchFAQ, dec } from "@/components/FrenchList";
import { frenchLists, frHub, formatCADfr } from "@/data/fr";
import { getBestCategory, categoryPicks } from "@/data/categories";
import { laptopHref } from "@/data/laptops";
import { lowestPrice } from "@/lib/scoring";
import { SITE, CONTENT_UPDATED } from "@/lib/site";

const description =
  "Meilleur ordinateur portable au Canada en 2026 : nous testons les portables en labo et les classons selon l'autonomie, la performance et le prix en dollars canadiens.";

export const metadata: Metadata = {
  title: { absolute: `${frHub.title} | ${SITE.name}` },
  description,
  alternates: { canonical: "/fr", languages: { "fr-CA": "/fr", "en-CA": "/", "x-default": "/" } },
  openGraph: { locale: "fr_CA", title: frHub.title, description, url: "/fr" },
};

export default function FrenchHub() {
  const overall = categoryPicks(getBestCategory("laptop")!);
  const top = overall[0];
  const ld = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: frHub.h1,
    inLanguage: "fr-CA",
    url: `${SITE.url}/fr`,
    dateModified: CONTENT_UPDATED,
    hasPart: frenchLists.map((f) => ({ "@type": "WebPage", name: f.h1, url: `${SITE.url}/fr/${f.slug}` })),
  };
  return (
    <div lang="fr-CA">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <Breadcrumbs home={{ label: "Accueil", href: "/fr" }} items={[{ label: "Meilleurs portables" }]} />
      <div className="container-site pb-12">
        <header className="max-w-3xl">
          <h1 className="text-3xl font-extrabold sm:text-4xl">{frHub.h1}</h1>
          <p className="mt-3 text-lg text-ink-700">{frHub.intro}</p>
          <p className="mt-2 text-sm"><Link href="/" hrefLang="en-CA" className="link">English version</Link></p>
          <div id="reponse-rapide" className="mt-5 rounded-md border-2 border-brand-200 bg-brand-50 p-5">
            <p className="text-xs font-bold text-brand-700">Réponse rapide</p>
            <p className="mt-2 text-lg text-ink-900">
              Le meilleur ordinateur portable au Canada en 2026 selon nos tests :{" "}
              <Link href={laptopHref(top)} className="font-bold text-brand-700 hover:underline">{top.brand} {top.model}</Link>, noté{" "}
              <strong>{dec(top.overall)}/10</strong> dans nos tests, à partir de <strong>{formatCADfr(lowestPrice(top))}</strong>.
            </p>
          </div>
        </header>

        <section className="mt-8">
          <h2 className="mb-4 text-2xl font-bold">Le meilleur portable selon votre besoin</h2>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {frenchLists.map((f) => {
              const cat = getBestCategory(f.enSlug);
              const p = cat && categoryPicks(cat)[0];
              return (
                <li key={f.slug}>
                  <Link href={`/fr/${f.slug}`} className="card block p-4 transition-colors hover:border-brand-400">
                    <span className="font-semibold text-brand-700">{f.h1.replace(/^Les meilleurs? /, "Meilleurs ").replace(/ \(2026\)$/, "")}</span>
                    {p && <span className="mt-1 block text-sm text-ink-600">N° 1 : {p.brand} {p.model} · {dec(p.overall)}/10 · {formatCADfr(lowestPrice(p))}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="mb-3 text-2xl font-bold">Classement général des portables testés</h2>
          <FrenchPicksTable picks={overall} />
        </section>

        <FrenchSections sections={frHub.sections} />
        <FrenchFAQ items={frHub.faq} />
      </div>
    </div>
  );
}
