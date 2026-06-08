"use client";

import Link from "next/link";
import { useState } from "react";
import { primaryNav, SITE } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="container-site flex h-16 items-center gap-4">
        <Link href="/" className="flex shrink-0 items-center gap-2 font-extrabold tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-600 text-white">BL</span>
          <span className="text-lg">
            BestLaptop<span className="text-brand-600">.ca</span>
          </span>
        </Link>

        <form action="/laptop/tools/table" className="ml-2 hidden flex-1 lg:flex" role="search">
          <label htmlFor="site-search" className="sr-only">Search laptops</label>
          <div className="relative w-full max-w-md">
            <input
              id="site-search"
              name="q"
              type="search"
              placeholder="Search laptops, reviews, comparisons…"
              className="w-full rounded-lg border border-slate-300 bg-slate-50 py-2 pl-9 pr-3 text-sm"
            />
            <svg className="absolute left-2.5 top-2.5 h-4 w-4 text-ink-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" strokeLinecap="round" />
            </svg>
          </div>
        </form>

        <nav className="ml-auto hidden items-center gap-1 xl:flex" aria-label="Primary">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-md px-2.5 py-2 text-sm font-medium hover:bg-slate-100 ${item.label === "Membership" ? "ml-1 bg-brand-600 text-white hover:bg-brand-700" : "text-ink-700"}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="ml-auto rounded-md p-2 hover:bg-slate-100 xl:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {open ? <path d="M6 18 18 6M6 6l12 12" strokeLinecap="round" /> : <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-slate-200 bg-white xl:hidden" aria-label="Mobile">
          <div className="container-site grid grid-cols-2 gap-1 py-3">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-ink-700 hover:bg-slate-100"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
