"use client";

import { ShoppingBag } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCartItemCount } from "@/features/cart/store/cart-store";

export function CartButton() {
  const itemCount = useCartItemCount();

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Cart"
      className="relative"
      render={
        <Link href="/cart">
          <ShoppingBag className="size-5" />
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
