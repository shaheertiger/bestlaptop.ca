import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SecondaryNav } from "@/components/SecondaryNav";
import { TableTool } from "@/components/tools/TableTool";

export const metadata: Metadata = {
  title: "Laptop Results Table — Sort & Filter Every Tested Laptop",
  description: "Sort and filter our full laptop database by score, price, battery life, brand, and specs. Compare laptops and export to CSV.",
  alternates: { canonical: "/laptop/tools/table" },
};

export default async function TablePage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  return (
    <>
      <SecondaryNav />
      <Breadcrumbs items={[{ label: "Laptops", href: "/laptop" }, { label: "Tools" }, { label: "Results Table" }]} />
      <div className="container-site pb-12">
        <h1 className="text-3xl font-extrabold">Laptop Results Table</h1>
        <p className="mb-6 mt-2 max-w-2xl text-ink-500">Filter and sort every laptop we have tested. Select two or more to compare them side by side.</p>
        <TableTool initialQuery={q ?? ""} />
      </div>
    </>
  );
}
