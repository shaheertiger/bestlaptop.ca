import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-site py-20 text-center">
      <p className="text-sm font-bold uppercase tracking-wide text-brand-600">404</p>
      <h1 className="mt-2 text-3xl font-extrabold">Page not found</h1>
      <p className="mt-2 text-ink-500">We couldn't find that page. It may have moved or never existed.</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">Go home</Link>
        <Link href="/laptop/reviews" className="btn-secondary">Browse reviews</Link>
        <Link href="/laptop/tools/table" className="btn-secondary">Results table</Link>
      </div>
    </div>
  );
}
