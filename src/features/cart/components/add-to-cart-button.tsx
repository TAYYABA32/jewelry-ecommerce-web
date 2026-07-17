"use client";

import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";

import { useCartStore } from "@/features/cart/store/cart-store";
import { cn } from "@/lib/utils";

export function AddToCartButton({
  productId,
  slug,
  name,
  image,
  price,
  className,
}: {
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  className?: string;
}) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <button
      type="button"
      aria-label={`Add ${name} to cart`}
      onClick={(e) => {
        e.preventDefault();
        addItem({ productId, slug, name, image, price });
        toast.success(`${name} added to cart`);
      }}
      className={cn(
        "absolute top-14 right-3 z-10 flex size-8 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur transition-colors hover:text-primary",
        className,
      )}
    >
      <ShoppingBag className="size-4" />
    </button>
  );
}
