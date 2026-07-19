"use client";

import { Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  useIsWishlisted,
  useWishlistStore,
} from "@/features/wishlist/store/wishlist-store";
import { cn } from "@/lib/utils";

export function ProductWishlistButton({
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
    <Button
      variant="outline"
      size="lg"
      aria-pressed={saved}
      onClick={() => toggleItem({ productId, slug, name, image, price })}
    >
      <Heart className={cn("size-4", saved && "fill-primary text-primary")} />
      {saved ? "Saved" : "Wishlist"}
    </Button>
  );
}
