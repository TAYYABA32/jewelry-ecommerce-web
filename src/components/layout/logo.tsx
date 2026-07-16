import Link from "next/link";

import { SITE_NAME } from "@/constants/site";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "font-heading text-2xl font-semibold tracking-wide text-foreground",
        className,
      )}
    >
      {SITE_NAME}
    </Link>
  );
}
