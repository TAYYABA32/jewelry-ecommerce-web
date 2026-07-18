export function PlaceholderPage({
  eyebrow = "Aurelia",
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8">
      <p className="text-sm font-medium tracking-[0.2em] text-primary uppercase">
        {eyebrow}
      </p>
      <h1 className="mt-4 font-heading text-4xl font-semibold text-foreground sm:text-5xl">
        {title}
      </h1>
      <p className="mt-6 max-w-md text-muted-foreground">{description}</p>
    </div>
  );
}
