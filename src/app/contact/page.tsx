import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";

export const metadata: Metadata = { title: "Contact Us", description: "Get in touch with the BestLaptop.ca team about reviews, testing, corrections, or partnerships.", alternates: { canonical: "/contact" } };

export default function Page() {
  return (
    <ContentPage crumb="Contact" title="Contact Us" intro="Questions about a review, our testing, a correction, or a partnership? Send us a message.">
      <form className="not-prose space-y-4 rounded-xl border border-slate-200 p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="text-sm font-medium">Name</label>
            <input id="name" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <input id="email" type="email" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          </div>
        </div>
        <div>
          <label htmlFor="topic" className="text-sm font-medium">Topic</label>
          <select id="topic" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
            <option>General question</option>
            <option>Correction or feedback</option>
            <option>Testing request</option>
            <option>Partnership / press</option>
          </select>
        </div>
        <div>
          <label htmlFor="message" className="text-sm font-medium">Message</label>
          <textarea id="message" rows={5} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </div>
        <button type="submit" className="btn-primary">Send message</button>
      </form>
      <p className="text-sm text-ink-500">You can also reach us at <span className="font-medium">hello@bestlaptop.ca</span>.</p>
    </ContentPage>
  );
}
