import { Breadcrumbs } from "./Breadcrumbs";

export function ContentPage({
  title,
  intro,
  children,
  crumb,
}: {
  title: string;
  intro?: string;
  children: React.ReactNode;
  crumb: string;
}) {
  return (
    <>
      <Breadcrumbs items={[{ label: crumb }]} />
      <div className="container-site max-w-3xl pb-16">
        <h1 className="text-3xl font-extrabold sm:text-4xl">{title}</h1>
        {intro && <p className="mt-3 text-lg text-ink-700">{intro}</p>}
        <div className="prose-site mt-8 space-y-6 [&_h2]:mb-2 [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-bold [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
          {children}
        </div>
      </div>
    </>
  );
}
