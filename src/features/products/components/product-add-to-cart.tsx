"use client";

import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/features/cart/store/cart-store";

export function ProductAddToCart({
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
  const addItem = useCartStore((state) => state.addItem);

  return (
    <Button
      size="lg"
      onClick={() => {
        addItem({ productId, slug, name, image, price });
        toast.success(`${name} added to cart`);
      }}
    >
      <ShoppingBag />
      Add to Cart
    </Button>
  );
}
