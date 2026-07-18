export function LegalPage({
  title,
  intro,
  sections,
}: {
  title: string;
  intro: string;
  sections: { heading: string; body: string }[];
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
      <header className="text-center">
        <p className="text-sm font-medium tracking-widest text-primary uppercase">
          Legal
        </p>
        <h1 className="mt-4 font-heading text-4xl font-semibold text-foreground sm:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-muted-foreground">{intro}</p>
      </header>

      <div className="mt-16 space-y-12">
        {sections.map((section) => (
          <section key={section.heading}>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              {section.heading}
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              {section.body}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
