import type { LucideIcon } from "lucide-react";
import { TrendingDown, TrendingUp } from "lucide-react";

import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  changePercent,
  icon: Icon,
}: {
  label: string;
  value: string;
  changePercent?: number;
  icon: LucideIcon;
}) {
  const isPositive = (changePercent ?? 0) >= 0;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-5">
      <Icon className="absolute -top-3 -right-3 size-20 text-primary/10" />
      <div className="relative">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          {label}
        </p>
        <p className="mt-1 text-[11px] text-muted-foreground">Last 30 days</p>
        <div className="mt-3 flex items-end justify-between gap-2">
          <span className="font-heading text-2xl font-semibold text-foreground">
            {value}
          </span>
          {typeof changePercent === "number" ? (
            <span
              className={cn(
                "flex items-center gap-0.5 text-xs font-medium",
                isPositive ? "text-emerald-600" : "text-destructive",
              )}
            >
              {isPositive ? (
                <TrendingUp className="size-3.5" />
              ) : (
                <TrendingDown className="size-3.5" />
              )}
              {Math.abs(changePercent)}%
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
