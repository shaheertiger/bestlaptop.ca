import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SecondaryNav } from "@/components/SecondaryNav";
import { GraphTool } from "@/components/tools/GraphTool";

export const metadata: Metadata = {
  title: "Laptop Graph Tool — Compare Test Results Visually",
  description: "Plot laptop test results on bar and scatter charts. Compare battery life, CPU and GPU benchmarks, noise, weight, and price.",
  alternates: { canonical: "/laptop/tools/graph" },
};

export default function GraphPage() {
  return (
    <>
      <SecondaryNav />
      <Breadcrumbs items={[{ label: "Laptops", href: "/laptop" }, { label: "Tools" }, { label: "Graph Tool" }]} />
      <div className="container-site pb-12">
        <h1 className="text-3xl font-extrabold">Graph Tool</h1>
        <p className="mb-6 mt-2 max-w-2xl text-ink-500">Compare test results across up to five laptops. Choose a metric for the bar chart, or read the price-vs-score scatter plot below.</p>
        <GraphTool />
      </div>
    </>
  );
}
