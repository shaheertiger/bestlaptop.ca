import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SecondaryNav } from "@/components/SecondaryNav";
import { SectionCard } from "@/components/blocks";
import { testMethods, getTestMethod } from "@/data/tests";

export function generateStaticParams() {
  return testMethods.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = getTestMethod(slug);
  if (!t) return {};
  return { title: t.title, description: t.summary, alternates: { canonical: `/laptop/tests/${t.slug}` } };
}

export default async function TestMethodPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = getTestMethod(slug);
  if (!t) notFound();
  return (
    <>
      <SecondaryNav />
      <Breadcrumbs items={[{ label: "Laptops", href: "/laptop" }, { label: "How We Test", href: "/laptop/learn/how-we-test" }, { label: t.title.replace("How We Test ", "").replace("How We Score ", "") }]} />
      <div className="container-site max-w-3xl pb-12">
        <h1 className="text-3xl font-extrabold sm:text-4xl">{t.title}</h1>
        <p className="mt-3 text-lg text-ink-700">{t.summary}</p>

        <div className="mt-8 space-y-8">
          <SectionCard id="what" title="What We Measure">
            <ul className="list-disc space-y-1 pl-5">{t.what.map((w) => <li key={w}>{w}</li>)}</ul>
          </SectionCard>
          <SectionCard id="how" title="How We Test It">
            {t.how.map((h, i) => <p key={i}>{h}</p>)}
          </SectionCard>
          <SectionCard id="scoring" title="How It Affects Scores">
            <p>{t.scoring}</p>
          </SectionCard>
          <SectionCard id="equipment" title="Equipment">
            <ul className="list-disc space-y-1 pl-5">{t.equipment.map((e) => <li key={e}>{e}</li>)}</ul>
          </SectionCard>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {testMethods.filter((m) => m.slug !== t.slug).map((m) => (
            <Link key={m.slug} href={`/laptop/tests/${m.slug}`} className="chip hover:bg-brand-100">{m.title.replace("How We Test ", "").replace("How We Score ", "")}</Link>
          ))}
        </div>
        <p className="mt-6"><Link href="/laptop/learn/how-we-test" className="link">← Back to testing overview</Link></p>
      </div>
    </>
  );
}
