export function Newsletter() {
  return (
    <section className="bg-brand-900 py-12 text-white">
      <div className="container-site grid items-center gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold sm:text-3xl">Real tests. Smarter laptop decisions.</h2>
          <p className="mt-2 text-brand-100">
            Get top-tested laptop picks, Canadian deal alerts, and buying advice.
          </p>
        </div>
        <form className="flex flex-col gap-3" aria-label="Newsletter signup">
          <div className="flex flex-col gap-3 sm:flex-row">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-lg border-0 px-4 py-3 text-ink-900 placeholder:text-ink-400"
            />
            <button type="submit" className="btn-accent whitespace-nowrap px-6 py-3">
              Get Recommendations
            </button>
          </div>
          <p className="text-xs text-brand-200">Free newsletter. No spam. Unsubscribe anytime.</p>
        </form>
      </div>
    </section>
  );
}
