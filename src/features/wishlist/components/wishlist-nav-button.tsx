"use client";

import { Heart } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useWishlistItemCount } from "@/features/wishlist/store/wishlist-store";

export function WishlistNavButton() {
  const itemCount = useWishlistItemCount();

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Wishlist"
      className="relative"
      render={
        <Link href="/wishlist">
          <Heart className="size-5" />
          {itemCount > 0 ? (
            <Badge className="absolute -top-1 -right-1 size-4 justify-center rounded-full p-0 text-[10px]">
              {itemCount > 9 ? "9+" : itemCount}
            </Badge>
          ) : null}
        </Link>
      }
    />
  );
}
