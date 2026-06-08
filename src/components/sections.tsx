import Link from "next/link";
import { SITE, toolsNav } from "@/lib/site";
import { bestCategories, categoryPicks, getBestCategory } from "@/data/categories";
import { featuredComparisons, comparisonLaptops } from "@/data/comparisons";
import { laptops } from "@/data/laptops";
import { guides } from "@/data/guides";
import { LaptopCard } from "./LaptopCard";
import { ProductImage } from "./ProductImage";
import { ScoreBadge } from "./Score";
import { ToolIcon } from "./icons";
import { Newsletter } from "./Newsletter";

export function Hero({ h1, intro }: { h1: string; intro: string }) {
  return (
    <section className="border-b border-slate-200 bg-gradient-to-b from-brand-50 to-white">
      <div className="container-site py-12 lg:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <span className="chip">Independent Canadian laptop testing</span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">{h1}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-500">{intro}</p>

          <form action="/laptop/tools/table" role="search" className="mx-auto mt-6 flex max-w-xl gap-2">
            <label htmlFor="hero-search" className="sr-only">Search laptops</label>
            <input
              id="hero-search"
              name="q"
              type="search"
              placeholder="Search 168 tested laptops…"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-base"
            />
            <button type="submit" className="btn-primary px-6 py-3">Search</button>
          </form>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link href="/laptop/reviews/best/laptop" className="btn-primary">See Best Laptops</Link>
            <Link href="/laptop/tools/compare" className="btn-secondary">Compare Laptops</Link>
            <Link href="/laptop/tools/table" className="btn-secondary">Open Results Table</Link>
          </div>
        </div>

        <CredibilityMetrics />
      </div>
    </section>
  );
}

export function CredibilityMetrics() {
  const metrics = [
    { value: SITE.metrics.tested, label: "Laptops bought & tested" },
    { value: SITE.metrics.inTesting, label: "Currently in testing" },
    { value: SITE.metrics.recentlyReviewed, label: "Reviewed recently" },
    { value: `v${SITE.testBench}`, label: "Test methodology" },
  ];
  return (
    <div className="mx-auto mt-10 max-w-4xl">
      <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.label} className="card p-4 text-center">
            <dt className="text-2xl font-extrabold text-brand-700">{m.value}</dt>
            <dd className="mt-1 text-xs font-medium text-ink-500">{m.label}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-center text-sm text-ink-500">
        We buy the laptops we test. No manufacturer pays for a score.{" "}
        <Link href="/laptop/review-pipeline" className="link">See the review pipeline</Link>,{" "}
        <Link href="/laptop/vote" className="link">vote for the next review</Link>, or{" "}
        <Link href="/laptop/tests/changelogs" className="link">see the latest testing changes</Link>.
      </p>
    </div>
  );
}

export function SupportBanner() {
  return (
    <section className="container-site py-8">
      <div className="card flex flex-col items-start justify-between gap-4 bg-slate-50 p-6 md:flex-row md:items-center">
        <div>
          <h2 className="text-lg font-bold">Independent testing, Canadian pricing</h2>
          <p className="mt-1 text-sm text-ink-500">
            We buy the laptops we test and publish the data behind every score. No manufacturer pays for a recommendation.
          </p>
        </div>
        <Link href="/laptop/learn/how-we-test" className="btn-primary shrink-0">How we test</Link>
      </div>
    </section>
  );
}

export function SectionHeading({ title, href, cta }: { title: string; href?: string; cta?: string }) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <h2 className="text-xl font-bold sm:text-2xl">{title}</h2>
      {href && <Link href={href} className="text-sm font-semibold text-brand-700 hover:underline">{cta ?? "View all"} →</Link>}
    </div>
  );
}

export function TopPicks() {
  const slugs = ["gaming", "laptop", "budget", "student", "business", "windows", "macbook", "chromebook"];
  return (
    <section className="container-site py-10">
      <SectionHeading title="Top Laptop Picks" href="/laptop/reviews/best/laptop" cta="All best lists" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {slugs.map((slug) => {
          const cat = getBestCategory(slug)!;
          const top = categoryPicks(cat)[0];
          return (
            <Link key={slug} href={`/laptop/reviews/best/${slug}`} className="card group overflow-hidden transition hover:shadow-md">
              {top && <ProductImage laptop={top} rounded="rounded-none" className="aspect-[16/9] w-full" />}
              <div className="p-4">
                <span className="chip">{cat.group === "brand" ? "Brand" : "Best"}</span>
                <h3 className="mt-2 font-semibold leading-snug group-hover:text-brand-700">{cat.navLabel}</h3>
                <p className="mt-1 line-clamp-3 text-sm text-ink-500">{cat.intro}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export function PopularComparisons() {
  return (
    <section className="bg-slate-50 py-10">
      <div className="container-site">
        <SectionHeading title="Popular Laptop Comparisons" href="/laptop/tools/compare" cta="Compare tool" />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featuredComparisons.slice(0, 9).map((c) => {
            const [a, b] = comparisonLaptops(c);
            return (
              <Link key={c.slug} href={`/laptop/compare/${c.slug}`} className="card overflow-hidden p-4 transition hover:shadow-md">
                <div className="flex items-center gap-3">
                  <ProductImage laptop={a} className="h-16 w-20" />
                  <span className="text-sm font-bold text-ink-400">VS</span>
                  <ProductImage laptop={b} className="h-16 w-20" />
                </div>
                <h3 className="mt-3 text-sm font-semibold leading-snug">
                  {a.brand} {a.model} vs {b.brand} {b.model}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm text-ink-500">{c.verdict}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function PopularReviews() {
  const reviews = [...laptops].filter((l) => l.status === "published").sort((a, b) => b.overall - a.overall).slice(0, 6);
  return (
    <section className="container-site py-10">
      <SectionHeading title="Popular Laptop Reviews" href="/laptop/reviews" cta="All reviews" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((l) => <LaptopCard key={l.id} laptop={l} tag="Review" />)}
      </div>
    </section>
  );
}

export function UsefulTools() {
  return (
    <section className="bg-slate-50 py-10">
      <div className="container-site">
        <SectionHeading title="Useful Tools" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {toolsNav.map((t) => (
            <Link key={t.href} href={t.href} className="card flex flex-col gap-2 p-5 transition hover:shadow-md">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                <ToolIcon name={t.icon} />
              </span>
              <h3 className="font-semibold">{t.label}</h3>
              <p className="text-sm text-ink-500">{t.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PopularArticles() {
  const featured = [
    "oled-vs-ips-laptop-displays",
    "how-much-ram-do-you-need",
    "is-a-gaming-laptop-good-for-school",
    "best-time-to-buy-a-laptop-in-canada",
    "intel-vs-amd-vs-apple-silicon",
    "refurbished-laptop-buying-guide-canada",
  ];
  const items = featured.map((s) => guides.find((g) => g.slug === s)!).filter(Boolean);
  return (
    <section className="container-site py-10">
      <SectionHeading title="Popular Articles" href="/laptop/learn/how-to-choose-a-laptop" cta="All guides" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((g) => (
          <Link key={g.slug} href={`/laptop/learn/${g.slug}`} className="card p-5 transition hover:shadow-md">
            <span className="chip">{g.category}</span>
            <h3 className="mt-2 font-semibold leading-snug">{g.title}</h3>
            <p className="mt-1 line-clamp-2 text-sm text-ink-500">{g.excerpt}</p>
            <p className="mt-3 text-xs text-ink-400">Updated {g.updated} · {g.readingTime} min read</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function LatestActivity() {
  const recent = [...laptops].sort((a, b) => b.testedDate.localeCompare(a.testedDate)).slice(0, 4);
  const items = [
    { type: "Testing update", title: "Test Bench 1.2 adds sustained creative-workload export tests", date: "2025-09-01", href: "/laptop/tests/changelogs" },
    ...recent.map((l) => ({ type: "Review", title: `${l.brand} ${l.model} review published`, date: l.testedDate, href: `/laptop/reviews/${l.brandSlug}/${l.slug}` })),
    { type: "Comparison", title: "MacBook Air 15 vs Dell XPS 13", date: "2025-11-05", href: "/laptop/compare/macbook-air-15-m4-vs-dell-xps-13-9350" },
  ];
  return (
    <section className="bg-slate-50 py-10">
      <div className="container-site">
        <SectionHeading title="Latest Activity" href="/laptop/news" cta="See news" />
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((it, i) => (
            <Link key={i} href={it.href} className="card flex items-center justify-between gap-4 p-4 transition hover:shadow-md">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wide text-brand-700">{it.type}</span>
                <h3 className="font-semibold leading-snug">{it.title}</h3>
              </div>
              <span className="shrink-0 text-xs text-ink-400">{it.date}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeedbackWidget() {
  return (
    <section className="container-site py-10">
      <form className="card mx-auto max-w-2xl p-6 text-center">
        <h2 className="text-lg font-bold">How satisfied are you with this page?</h2>
        <div className="mt-4">
          <label htmlFor="feedback-rating" className="sr-only">Satisfaction rating</label>
          <input id="feedback-rating" type="range" min={1} max={10} defaultValue={8} className="w-full max-w-sm accent-brand-600" />
          <div className="mx-auto flex max-w-sm justify-between text-xs text-ink-400"><span>Not satisfied</span><span>Very satisfied</span></div>
        </div>
        <label htmlFor="feedback-text" className="sr-only">Your feedback</label>
        <textarea id="feedback-text" rows={3} placeholder="What could be better?" className="mt-4 w-full rounded-lg border border-slate-300 p-3 text-sm" />
        <button type="submit" className="btn-primary mt-3">Submit feedback</button>
      </form>
    </section>
  );
}

export function LandingPage({ h1, intro, whatsNewLabel }: { h1: string; intro: string; whatsNewLabel: string }) {
  return (
    <>
      <Hero h1={h1} intro={intro} />
      <SupportBanner />
      <TopPicks />
      <PopularComparisons />
      <PopularReviews />
      <Newsletter />
      <UsefulTools />
      <LatestActivity />
      <section className="container-site py-10">
        <SectionHeading title={whatsNewLabel} href="/laptop/news" cta="See all" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[...laptops].sort((a, b) => b.releaseDate.localeCompare(a.releaseDate)).slice(0, 4).map((l) => (
            <LaptopCard key={l.id} laptop={l} tag="New review" />
          ))}
        </div>
      </section>
      <PopularArticles />
      <FeedbackWidget />
    </>
  );
}
