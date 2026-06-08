import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SecondaryNav } from "@/components/SecondaryNav";
import { CompareTool } from "@/components/tools/CompareTool";

export const metadata: Metadata = {
  title: "Compare Laptops Side by Side (Canada)",
  description: "Compare 2 to 4 laptops side by side. We highlight category winners, key differences, and which laptop to buy, with Canadian pricing.",
  alternates: { canonical: "/laptop/tools/compare" },
};

export default async function ComparePage({ searchParams }: { searchParams: Promise<{ add?: string | string[] }> }) {
  const { add } = await searchParams;
  const ids = Array.isArray(add) ? add : add ? [add] : [];
  return (
    <>
      <SecondaryNav />
      <Breadcrumbs items={[{ label: "Laptops", href: "/laptop" }, { label: "Tools" }, { label: "Compare" }]} />
      <div className="container-site pb-12">
        <h1 className="text-3xl font-extrabold">Compare Laptops</h1>
        <p className="mb-6 mt-2 max-w-2xl text-ink-500">Put up to four laptops side by side. We highlight the winner in each category based on our test data.</p>
        <CompareTool initialIds={ids} />
      </div>
    </>
  );
}
