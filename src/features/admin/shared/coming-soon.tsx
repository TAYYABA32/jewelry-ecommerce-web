import type { LucideIcon } from "lucide-react";

export function ComingSoon({
  title,
  icon: Icon,
}: {
  title: string;
  icon: LucideIcon;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-24 text-center">
      <Icon className="size-8 text-muted-foreground" />
      <h1 className="mt-4 font-heading text-xl font-semibold text-foreground">
        {title}
      </h1>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        This module is coming soon — it isn&apos;t wired up to real data yet.
      </p>
    </div>
  );
}
