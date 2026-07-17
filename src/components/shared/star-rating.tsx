import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

export function StarRating({
  value,
  count,
  className,
}: {
  value: number;
  count?: number;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex" aria-hidden="true">
        {Array.from({ length: 5 }, (_, i) => {
          const filled = i + 1 <= Math.round(value);
          return (
            <Star
              key={i}
              className={cn(
                "size-3.5",
                filled
                  ? "fill-primary text-primary"
                  : "fill-transparent text-muted-foreground",
              )}
            />
          );
        })}
      </div>
      <span className="sr-only">{value.toFixed(1)} out of 5 stars</span>
      {typeof count === "number" ? (
        <span className="text-xs text-muted-foreground">({count})</span>
      ) : null}
    </div>
  );
}
