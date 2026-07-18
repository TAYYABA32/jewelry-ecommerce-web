"use client";

import { Heart } from "lucide-react";

import {
  useIsWishlisted,
  useWishlistStore,
} from "@/features/wishlist/store/wishlist-store";
import { cn } from "@/lib/utils";

export function WishlistButton({
  productId,
  slug,
  name,
  image,
  price,
}: {
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
}) {
  const saved = useIsWishlisted(productId);
  const toggleItem = useWishlistStore((state) => state.toggleItem);

  return (
    <button
      type="button"
      aria-label={
        saved ? `Remove ${name} from wishlist` : `Add ${name} to wishlist`
      }
      aria-pressed={saved}
      onClick={(e) => {
        e.preventDefault();
        toggleItem({ productId, slug, name, image, price });
      }}
      className="absolute top-3 right-3 z-10 flex size-8 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur transition-colors hover:text-primary"
    >
      <Heart className={cn("size-4", saved && "fill-primary text-primary")} />
    </button>
  );
}
