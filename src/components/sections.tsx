import Link from "next/link";
import { SITE, toolsNav } from "@/lib/site";
import { bestCategories, categoryPicks, getBestCategory } from "@/data/categories";
import { featuredComparisons, comparisonLaptops } from "@/data/comparisons";
import { laptops } from "@/data/laptops";
import { guides } from "@/data/guides";
import { LaptopCard } from "./LaptopCard";
import { formatCAD, lowestPrice, scoreColor } from "@/lib/scoring";
import { laptopHref } from "@/data/laptops";
import { ProductImage } from "./ProductImage";
import { ScoreBadge } from "./Score";
import { ToolIcon } from "./icons";
import { Newsletter } from "./Newsletter";

// Hero: the headline and search on the left, the live leaderboard on the right.
// A ranked results table is the most characteristic thing a testing lab makes,
// so the page opens with the real one instead of a stock illustration.
export function Hero({ h1, intro }: { h1: string; intro: string }) {
  const board = [...laptops].filter((l) => l.status === "published").sort((a, b) => b.overall - a.overall).slice(0, 6);
  const published = laptops.filter((l) => l.status === "published").length;
  return (
    <section className="border-b border-line bg-frost">
      <div className="container-site grid gap-10 py-10 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:py-16">
        <div>
          <h1 className="text-[2.125rem] sm:text-5xl lg:text-[3.75rem]">{h1}</h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-700">{intro}</p>

          <form action="/laptop/tools/table" role="search" className="mt-7 flex max-w-xl gap-2">
            <label htmlFor="hero-search" className="sr-only">Search laptops</label>
            <input
              id="hero-search"
              name="q"
              type="search"
              placeholder={`Search ${published} tested laptops`}
              className="w-full rounded-md border border-line bg-white px-4 py-3 text-base"
            />
            <button type="submit" className="btn-primary px-6 py-3">Search</button>
          </form>

          <nav aria-label="Popular best lists" className="mt-5 flex flex-wrap gap-2 text-sm">
            {[
              ["Best overall", "laptop"],
              ["Students", "student"],
              ["Gaming", "gaming"],
              ["Under $1,000", "under-1000"],
              ["Video editing", "video-editing"],
              ["MacBooks", "macbook"],
            ].map(([label, slug]) => (
              <Link key={slug} href={`/laptop/reviews/best/${slug}`} className="rounded-md border border-line bg-white px-3 py-1.5 font-medium text-brand-900 hover:border-brand-400">
                {label}
              </Link>
            ))}
          </nav>

          <p className="mt-6 max-w-xl text-sm text-ink-500">
            We buy every laptop we test ({SITE.metrics.tested} so far, {SITE.metrics.inTesting} on the bench now) and no manufacturer pays for a score.{" "}
            <Link href="/laptop/learn/how-we-test" className="link">How we test</Link>
          </p>
        </div>

        <div className="rounded-md border border-line bg-white">
          <div className="flex items-baseline justify-between border-b border-line px-5 py-4">
            <h2 className="text-lg">Highest scores on our bench</h2>
            <span className="text-xs text-ink-500">Test Bench {SITE.testBench}</span>
          </div>
          <ol>
            {board.map((l, i) => (
              <li key={l.id} className="border-b border-line last:border-b-0">
                <Link href={laptopHref(l)} className="grid grid-cols-[1.5rem_3.5rem_1fr_auto] items-center gap-3 px-5 py-3 hover:bg-frost">
                  <span className="text-sm font-bold tabular-nums text-ink-400">{i + 1}</span>
                  <ProductImage laptop={l} size={200} rounded="rounded-sm" className="h-11 w-14 border border-line" />
                  <span className="min-w-0">
                    <span className="block truncate text-[0.9375rem] font-semibold text-ink-900">{l.brand} {l.model}</span>
                    <span className="mt-1 block h-1 rounded-sm bg-brand-50">
                      <span className="block h-full rounded-sm" style={{ width: `${l.overall * 10}%`, backgroundColor: scoreColor(l.overall) }} />
                    </span>
                    <span className="mt-1 block text-xs text-ink-500">{formatCAD(lowestPrice(l))} · {l.bestFor.split(",")[0]}</span>
                  </span>
                  <ScoreBadge score={l.overall} />
                </Link>
              </li>
            ))}
          </ol>
          <Link href="/laptop/tools/table" className="block border-t border-line px-5 py-3 text-sm font-semibold text-brand-600 hover:bg-frost">
            See all {published} results in the table
          </Link>
        </div>
      </div>
    </section>
  );
}

export function SupportBanner() {
  return (
    <section className="container-site py-8">
      <div className="card flex flex-col items-start justify-between gap-4 bg-frost p-6 md:flex-row md:items-center">
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
      <h2 className="text-2xl font-extrabold sm:text-[1.75rem]">{title}</h2>
      {href && <Link href={href} className="shrink-0 text-sm font-semibold text-brand-600 underline decoration-brand-200 underline-offset-[3px] hover:decoration-brand-600">{cta ?? "View all"}</Link>}
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
            <Link key={slug} href={`/laptop/reviews/best/${slug}`} className="card group overflow-hidden transition-colors hover:border-brand-400">
              {top && <ProductImage laptop={top} rounded="rounded-none" className="aspect-[16/9] w-full" />}
              <div className="p-4">
                <h3 className="font-semibold leading-snug group-hover:text-brand-700">{cat.navLabel}</h3>
                {top && <p className="mt-1 text-sm font-medium text-brand-800">#1: {top.brand} {top.model}</p>}
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
    <section className="bg-frost py-10">
      <div className="container-site">
        <SectionHeading title="Popular Laptop Comparisons" href="/laptop/tools/compare" cta="Compare tool" />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featuredComparisons.slice(0, 9).map((c) => {
            const [a, b] = comparisonLaptops(c);
            return (
              <Link key={c.slug} href={`/laptop/compare/${c.slug}`} className="card overflow-hidden p-4 transition-colors hover:border-brand-400">
                <div className="flex items-center gap-3">
                  <ProductImage laptop={a} className="h-16 w-20" />
                  <span className="text-sm font-bold text-ink-400">vs</span>
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
    <section className="bg-frost py-10">
      <div className="container-site">
        <SectionHeading title="Useful Tools" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {toolsNav.map((t) => (
            <Link key={t.href} href={t.href} className="card flex flex-col gap-2 p-5 transition-colors hover:border-brand-400">
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
    "extend-battery-life-windows",
    "oled-vs-ips-laptop-displays",
    "how-much-ram-do-you-need",
    "is-a-gaming-laptop-good-for-school",
    "intel-vs-amd-vs-apple-silicon",
    "refurbished-laptop-buying-guide-canada",
  ];
  const items = featured.map((s) => guides.find((g) => g.slug === s)!).filter(Boolean);
  return (
    <section className="container-site py-10">
      <SectionHeading title="Popular Articles" href="/laptop/learn/how-to-choose-a-laptop" cta="All guides" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((g) => (
          <Link key={g.slug} href={`/laptop/learn/${g.slug}`} className="card p-5 transition-colors hover:border-brand-400">
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
    <section className="bg-frost py-10">
      <div className="container-site">
        <SectionHeading title="Latest Activity" href="/laptop/news" cta="See news" />
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((it, i) => (
            <Link key={i} href={it.href} className="card flex items-center justify-between gap-4 p-4 transition-colors hover:border-brand-400">
              <div>
                <span className="text-xs font-semibold text-brand-600">{it.type}</span>
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
        <textarea id="feedback-text" rows={3} placeholder="What could be better?" className="mt-4 w-full rounded-lg border border-line p-3 text-sm" />
        <button type="submit" className="btn-primary mt-3">Submit feedback</button>
      </form>
    </section>
  );
}

// "Quick answer" block: the direct, quotable answer to "what is the best laptop"
// in the first screen, generated from live rankings so numbers always agree.
export function QuickAnswer() {
  const rows = [
    ["Best overall", "laptop"],
    ["Best budget", "budget"],
    ["Best for students", "student"],
    ["Best gaming", "gaming"],
    ["Best cheap gaming", "budget-gaming"],
    ["Best battery life", "long-battery-life"],
  ] as const;
  const top = categoryPicks(getBestCategory("laptop")!)[0];
  return (
    <section className="container-site pt-10" aria-labelledby="quick-answer-h">
      <div id="quick-answer" className="border-l-4 border-brand-800 pl-5 sm:pl-6">
        <h2 id="quick-answer-h" className="text-xl font-bold sm:text-2xl">What is the best laptop in Canada right now?</h2>
        <p className="mt-2 text-ink-700">
          The best laptop in Canada for 2026 is the <Link href={laptopHref(top)} className="font-semibold text-brand-700 hover:underline">{top.brand} {top.model}</Link>,
          which scored {top.overall.toFixed(1)}/10 on our Test Bench and costs from {formatCAD(lowestPrice(top))} CAD. Our top pick for each need:
        </p>
        <ul className="mt-4 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map(([role, slug]) => {
            const cat = getBestCategory(slug);
            const l = cat && categoryPicks(cat)[0];
            if (!cat || !l) return null;
            return (
              <li key={slug} className="border-t border-line py-3 text-sm">
                <Link href={`/laptop/reviews/best/${slug}`} className="font-semibold text-brand-700 hover:underline">{role}</Link>
                <span className="block text-ink-700">{l.brand} {l.model} · {l.overall.toFixed(1)}/10 · {formatCAD(lowestPrice(l))}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

// Crawlable hub linking every best list, grouped (keeps every list one click from home).
export function BestListHub() {
  const groups: { key: string; label: string }[] = [
    { key: "use-case", label: "By use" },
    { key: "price", label: "By budget" },
    { key: "type", label: "By type" },
    { key: "size", label: "By screen size" },
    { key: "brand", label: "By brand" },
  ];
  return (
    <section className="container-site py-10" aria-labelledby="hub-h">
      <h2 id="hub-h" className="mb-4 text-xl font-bold sm:text-2xl">Best laptops in Canada, by need and budget</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
        {groups.map((g) => (
          <div key={g.key} className={g.key === "use-case" ? "sm:col-span-2" : ""}>
            <h3 className="mb-2 border-b border-line pb-2 text-sm font-bold text-brand-900">{g.label}</h3>
            <ul className={`space-y-1.5 text-sm ${g.key === "use-case" ? "gap-x-6 sm:columns-2 [&>li]:break-inside-avoid" : ""}`}>
              {bestCategories.filter((c) => c.group === g.key).map((c) => (
                <li key={c.slug}><Link href={`/laptop/reviews/best/${c.slug}`} className="text-ink-700 hover:text-brand-700">{c.title.replace(/ in Canada$/, "")}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export function LandingPage({ h1, intro, whatsNewLabel }: { h1: string; intro: string; whatsNewLabel: string }) {
  return (
    <>
      <Hero h1={h1} intro={intro} />
      <QuickAnswer />
      <TopPicks />
      <BestListHub />
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
