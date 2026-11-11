import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FrenchPicksTable, FrenchPickCards, FrenchSections, FrenchFAQ, dec } from "@/components/FrenchList";
import { frenchLists, getFrenchList, formatCADfr } from "@/data/fr";
import { getBestCategory, categoryPicks } from "@/data/categories";
import { laptopHref } from "@/data/laptops";
import { lowestPrice } from "@/lib/scoring";
import { SITE, CONTENT_UPDATED } from "@/lib/site";

export function generateStaticParams() {
  return frenchLists.map((f) => ({ slug: f.slug }));
}

function load(slug: string) {
  const f = getFrenchList(slug);
  const cat = f && getBestCategory(f.enSlug);
  if (!f || !cat) return null;
  return { f, cat, picks: categoryPicks(cat) };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const d = load(slug);
  if (!d) return {};
  const { f, cat, picks } = d;
  const top = picks[0];
  const description = top
    ? `Notre premier choix : ${top.brand} ${top.model}, ${dec(top.overall)}/10, dès ${formatCADfr(lowestPrice(top))}. ${picks.length} portables testés et classés, prix en dollars canadiens.`
    : f.intro.slice(0, 155);
  const fr = `/fr/${f.slug}`;
  const en = `/laptop/reviews/best/${cat.slug}`;
  return {
    title: { absolute: `${f.title} | ${SITE.name}` },
    description,
    alternates: { canonical: fr, languages: { "fr-CA": fr, "en-CA": en, "x-default": en } },
    openGraph: { type: "article", locale: "fr_CA", title: f.title, description, url: fr },
  };
}

export default async function FrenchListPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = load(slug);
  if (!d || d.picks.length === 0) notFound();
  const { f, cat, picks } = d;
  const top = picks[0];
  const shown = picks.slice(0, 6);
  const url = `${SITE.url}/fr/${f.slug}`;
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: f.h1,
        inLanguage: "fr-CA",
        url,
        dateModified: CONTENT_UPDATED,
        author: { "@type": "Organization", name: `Équipe de test ${SITE.name}`, url: `${SITE.url}/about` },
        publisher: { "@type": "Organization", name: SITE.name, logo: { "@type": "ImageObject", url: `${SITE.url}/icon.svg` } },
        speakable: { "@type": "SpeakableSpecification", cssSelector: ["#reponse-rapide"] },
      },
      {
        "@type": "ItemList",
        name: f.h1,
        itemListElement: shown.map((l, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE.url}${laptopHref(l)}`, name: `${l.brand} ${l.model}` })),
      },
    ],
  };
  const faq = [
    { q: `Quel est le meilleur ${f.subject} ?`, a: `Notre premier choix : ${top.brand} ${top.model}, noté ${dec(top.overall)}/10 dans nos tests, à partir de ${formatCADfr(lowestPrice(top))}.` },
    ...(f.faq ?? []),
    { q: "Comment testez-vous les portables ?", a: "Chaque portable passe la même série de tests standardisés : écran, performances, autonomie à 150 nits, clavier, fabrication, chauffe et ports. Nous tenons compte des prix canadiens." },
  ];
  const siblings = frenchLists.filter((x) => x.slug !== f.slug);

  return (
    <div lang="fr-CA">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <Breadcrumbs home={{ label: "Accueil", href: "/fr" }} items={[{ label: "Meilleurs portables", href: "/fr" }, { label: f.nav }]} />
      <div className="container-site pb-12">
        <header className="max-w-3xl">
          <h1 className="text-3xl font-extrabold sm:text-4xl">{f.h1}</h1>
          <p className="mt-3 text-sm text-ink-400">
            Mis à jour le <time dateTime={CONTENT_UPDATED}>{new Date(CONTENT_UPDATED + "T12:00:00Z").toLocaleDateString("fr-CA", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })}</time> · {picks.length} portables classés · Banc d&apos;essai {SITE.testBench} ·{" "}
            <Link href={`/laptop/reviews/best/${cat.slug}`} hrefLang="en-CA" className="link">English version</Link>
          </p>
          <div id="reponse-rapide" className="mt-5 rounded-xl border-2 border-brand-200 bg-brand-50 p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-brand-700">Réponse rapide</p>
            <p className="mt-2 text-lg text-ink-900">
              Le meilleur {f.subject} au Canada selon nos tests : <Link href={laptopHref(top)} className="font-bold text-brand-700 hover:underline">{top.brand} {top.model}</Link>,
              noté <strong>{dec(top.overall)}/10</strong> dans nos tests, avec {dec(top.test.batteryWebHours)} heures d&apos;autonomie, à partir de <strong>{formatCADfr(lowestPrice(top))}</strong>.
            </p>
          </div>
          <p className="mt-4 text-lg text-ink-700">{f.intro}</p>
          <p className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-ink-500">
            <strong className="text-ink-700">Divulgation :</strong> BestLaptop.ca peut toucher une commission sur les achats faits via les liens des détaillants. Cela n&apos;influence jamais nos notes.
          </p>
        </header>

        <section className="mt-8">
          <h2 className="mb-3 text-2xl font-bold">Notre classement en un coup d&apos;œil</h2>
          <FrenchPicksTable picks={picks} />
        </section>

        <section className="mt-8">
          <h2 className="mb-3 text-2xl font-bold">Nos meilleurs choix en détail</h2>
          <FrenchPickCards picks={shown} />
        </section>

        <FrenchSections sections={f.sections ?? []} />

        <section className="mt-8">
          <h2 className="mb-3 text-2xl font-bold">Comment nous avons choisi</h2>
          <div className="prose-site">
            <p>Nous partons de chaque portable testé sur notre banc d&apos;essai actuel, puis nous les classons selon les résultats les plus pertinents pour cet usage, en tenant compte du prix et de la disponibilité au Canada. Personne ne paie pour figurer dans nos classements. <Link href="/laptop/learn/how-we-test" hrefLang="en-CA" className="link">Notre méthode de test (en anglais)</Link>.</p>
          </div>
        </section>

        <FrenchFAQ items={faq} />

        <section className="mt-10">
          <h2 className="mb-3 text-2xl font-bold">Autres classements</h2>
          <div className="flex flex-wrap gap-2">
            <Link href="/fr" className="chip bg-brand-100">Tous les meilleurs portables</Link>
            {siblings.map((s) => <Link key={s.slug} href={`/fr/${s.slug}`} className="chip hover:bg-brand-100">{s.nav}</Link>)}
          </div>
        </section>
      </div>
    </div>
  );
}
