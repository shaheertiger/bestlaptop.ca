import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SecondaryNav } from "@/components/SecondaryNav";
import { FAQ, TableOfContents } from "@/components/blocks";
import { Newsletter } from "@/components/Newsletter";
import { guides, getGuide } from "@/data/guides";
import { laptops, laptopHref } from "@/data/laptops";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return guides.map((g) => ({ topic: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }): Promise<Metadata> {
  const { topic } = await params;
  const g = getGuide(topic);
  if (!g) return {};
  return {
    title: g.title,
    description: g.answer.slice(0, 150),
    alternates: { canonical: `/laptop/learn/${g.slug}` },
  };
}

// Render a guide section body, supporting "### " sub-headings and "- " bullet
// lists alongside plain paragraphs so long-form articles read well.
function renderBlocks(body: string[]) {
  const out: React.ReactNode[] = [];
  let list: string[] = [];
  const flush = (key: string) => {
    if (list.length) {
      out.push(
        <ul key={`ul-${key}`} className="mb-4 list-disc space-y-1 pl-5">
          {list.map((li, i) => <li key={i}>{li}</li>)}
        </ul>,
      );
      list = [];
    }
  };
  body.forEach((line, i) => {
    if (line.startsWith("- ")) {
      list.push(line.slice(2));
    } else if (line.startsWith("### ")) {
      flush(`${i}`);
      out.push(<h3 key={i} className="mb-2 mt-5 text-lg font-bold text-ink-900">{line.slice(4)}</h3>);
    } else {
      flush(`${i}`);
      out.push(<p key={i}>{line}</p>);
    }
  });
  flush("end");
  return out;
}

export default async function GuidePage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params;
  const g = getGuide(topic);
  if (!g) notFound();
  const related = guides.filter((x) => x.slug !== g.slug && x.category === g.category).slice(0, 4);
  const relatedReviews = laptops.slice(0, 3);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.title,
    datePublished: g.updated,
    dateModified: g.updated,
    author: { "@type": "Organization", name: SITE.name },
    publisher: { "@type": "Organization", name: SITE.name },
    mainEntityOfPage: `${SITE.url}/laptop/learn/${g.slug}`,
  };

  return (
    <>
      <SecondaryNav />
      <Breadcrumbs items={[{ label: "Laptops", href: "/laptop" }, { label: "Guides", href: "/laptop/learn/how-to-choose-a-laptop" }, { label: g.title }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />

      <div className="container-site grid gap-8 pb-12 lg:grid-cols-[1fr_280px]">
        <article className="min-w-0">
          <span className="chip">{g.category}</span>
          <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">{g.h1}</h1>
          <p className="mt-2 text-sm text-ink-400">Updated {g.updated} · {g.readingTime} min read · BestLaptop.ca Test Team</p>

          <div className="mt-5 rounded-xl border-l-4 border-brand-500 bg-brand-50 p-4">
            <p className="font-semibold text-ink-900">Short answer</p>
            <p className="mt-1 text-ink-700">{g.answer}</p>
          </div>

          <div className="prose-site mt-8 space-y-8">
            {g.sections.map((s) => (
              <section key={s.heading} id={s.heading.toLowerCase().replace(/[^a-z0-9]+/g, "-")} className="scroll-mt-20">
                <h2 className="mb-2 text-2xl font-bold">{s.heading}</h2>
                {renderBlocks(s.body)}
              </section>
            ))}
          </div>

          <div className="mt-10"><FAQ items={g.faq} /></div>

          <section className="mt-10">
            <h2 className="mb-3 text-2xl font-bold">Related Reviews</h2>
            <ul className="space-y-1">
              {relatedReviews.map((l) => <li key={l.id}><Link href={laptopHref(l)} className="link">{l.brand} {l.model} review</Link></li>)}
            </ul>
          </section>

          <section className="mt-8 flex flex-wrap gap-2">
            <Link href="/laptop/tools/table" className="btn-secondary">Open results table</Link>
            <Link href="/laptop/tools/compare" className="btn-secondary">Compare laptops</Link>
            <Link href="/laptop/reviews/best/laptop" className="btn-secondary">See best laptops</Link>
          </section>
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-20 space-y-4">
            <TableOfContents items={g.sections.map((s) => ({ id: s.heading.toLowerCase().replace(/[^a-z0-9]+/g, "-"), label: s.heading }))} />
            {related.length > 0 && (
              <div className="card p-4">
                <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-ink-400">Related guides</h2>
                <ul className="space-y-2 text-sm">
                  {related.map((r) => <li key={r.slug}><Link href={`/laptop/learn/${r.slug}`} className="text-ink-600 hover:text-brand-700">{r.title}</Link></li>)}
                </ul>
              </div>
            )}
          </div>
        </aside>
      </div>
      <Newsletter />
    </>
  );
}
