import Link from "next/link";
import { footerNav, SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50">
      <div className="container-site grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-extrabold">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-600 text-white">BL</span>
            BestLaptop<span className="text-brand-600">.ca</span>
          </div>
          <p className="mt-3 text-sm text-ink-500">
            Canada's independent laptop testing site. We buy and test laptops, then publish objective reviews,
            comparisons, and buying advice with Canadian pricing.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-ink-900">Company</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {footerNav.company.map((l) => (
              <li key={l.href}><Link href={l.href} className="text-ink-500 hover:text-brand-700">{l.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-ink-900">Editorial</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {footerNav.editorial.map((l) => (
              <li key={l.href}><Link href={l.href} className="text-ink-500 hover:text-brand-700">{l.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-ink-900">Legal</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {footerNav.legal.map((l) => (
              <li key={l.href}><Link href={l.href} className="text-ink-500 hover:text-brand-700">{l.label}</Link></li>
            ))}
          </ul>
          <div className="mt-4 flex gap-3">
            <a href={SITE.social.youtube} aria-label="YouTube" className="text-ink-400 hover:text-brand-700">YouTube</a>
            <a href={SITE.social.instagram} aria-label="Instagram" className="text-ink-400 hover:text-brand-700">Instagram</a>
            <a href={SITE.social.x} aria-label="X" className="text-ink-400 hover:text-brand-700">X</a>
            <a href={SITE.social.linkedin} aria-label="LinkedIn" className="text-ink-400 hover:text-brand-700">LinkedIn</a>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200">
        <div className="container-site flex flex-col gap-2 py-5 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} BestLaptop.ca. All rights reserved. Prices in CAD.</p>
          <p>
            BestLaptop.ca may earn a commission from retailer links. This never affects our scores or recommendations.{" "}
            <Link href="/affiliate-disclosure" className="underline hover:text-brand-700">Affiliate disclosure</Link>.
          </p>
        </div>
      </div>
    </footer>
  );
}
