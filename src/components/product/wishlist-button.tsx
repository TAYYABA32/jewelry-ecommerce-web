"use client";

import { Heart } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

// Visual-only for now — persists nothing. Wiring to the Wishlist model
// (and Clerk-authenticated state) lands with the Wishlist feature.
export function WishlistButton({ productName }: { productName: string }) {
  const [saved, setSaved] = useState(false);

  return (
    <button
      type="button"
      aria-label={
        saved ? `Remove ${productName} from wishlist` : `Add ${productName} to wishlist`
      }
      aria-pressed={saved}
      onClick={(e) => {
        e.preventDefault();
        setSaved((prev) => !prev);
      }}
      className="absolute top-3 right-3 z-10 flex size-8 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur transition-colors hover:text-primary"
    >
      <Heart className={cn("size-4", saved && "fill-primary text-primary")} />
    </button>
  );
}
