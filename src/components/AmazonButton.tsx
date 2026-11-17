import type { Laptop } from "@/lib/types";
import { hasAmazonListing, laptopAmazonLink } from "@/lib/affiliate";

type Linkable = Pick<Laptop, "id" | "brand" | "model"> & { retailers?: Laptop["retailers"] };

// The one buy button used across reviews, best lists, comparisons and deals.
// Follows the best-proteinpowder.com card pattern: a full-width, high-contrast
// "Check Price on Amazon" button with the commission note directly underneath.
export function AmazonButton({
  laptop,
  label,
  size = "md",
  note = true,
  className = "",
}: {
  laptop: Linkable;
  label?: string;
  size?: "sm" | "md" | "lg";
  note?: boolean;
  className?: string;
}) {
  // Without a matched listing the link is a tagged Amazon search, so say so.
  label ??= hasAmazonListing(laptop.id) ? "Check Price on Amazon" : "Search on Amazon";
  const pad = size === "lg" ? "py-3.5 text-base" : size === "sm" ? "px-3 py-2 text-sm" : "py-3 text-[0.9375rem]";
  return (
    <div className={className}>
      <a
        href={laptopAmazonLink(laptop)}
        target="_blank"
        rel="sponsored nofollow noopener"
        data-amazon-cta={laptop.id}
        aria-label={`${label}: ${laptop.brand} ${laptop.model}`}
        className={`flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF9900] px-4 font-extrabold text-ink-900 no-underline transition hover:bg-[#F08804] active:scale-[0.99] ${pad}`}
      >
        {label}
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
      </a>
      {note && <p className="mt-1.5 text-center text-xs text-ink-400">We may earn a commission, at no cost to you</p>}
    </div>
  );
}

/** Compact inline text link to the laptop's Amazon listing. */
export function AmazonTextLink({ laptop, children }: { laptop: Linkable; children?: React.ReactNode }) {
  return (
    <a href={laptopAmazonLink(laptop)} target="_blank" rel="sponsored nofollow noopener" className="link font-semibold">
      {children ?? `Check the ${laptop.brand} ${laptop.model} price on Amazon`}
    </a>
  );
}
