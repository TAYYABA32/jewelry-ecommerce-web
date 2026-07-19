"use client";

import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/features/cart/store/cart-store";
import {
  type WishlistItem,
  useWishlistStore,
} from "@/features/wishlist/store/wishlist-store";
import { formatPrice } from "@/utils/format-price";

export function WishlistView() {
  const items = useWishlistStore((state) => state.items);
  const removeItem = useWishlistStore((state) => state.removeItem);
  const addToCart = useCartStore((state) => state.addItem);

  const handleMoveToBag = (item: WishlistItem) => {
    addToCart({
      productId: item.productId,
      slug: item.slug,
      name: item.name,
      image: item.image,
      price: item.price,
    });
    removeItem(item.productId);
    toast.success(`${item.name} moved to your bag`);
  };

  if (items.length === 0) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-background px-4 text-center">
        <h1 className="font-heading text-4xl font-semibold text-foreground sm:text-5xl">
          Wishlist
        </h1>
        <p className="mt-4 max-w-md text-muted-foreground">
          Curate your personal collection of timeless masterpieces.
        </p>
        <Button
          className="mt-8 bg-[#D4AF37] text-[#111111] hover:bg-[#c9a227]"
          render={<Link href="/shop">Explore Collections</Link>}
        />
      </div>
    );
  }

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <header className="border-b border-border pb-6">
          <p className="text-sm font-medium tracking-[0.2em] text-primary uppercase">
            Your Account
          </p>
          <h1 className="mt-4 font-heading text-3xl font-semibold text-foreground sm:text-4xl">
            Wishlist
          </h1>
        </header>

        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.productId} className="flex flex-col">
              <Link
                href={`/products/${item.slug}`}
                className="relative aspect-4/5 overflow-hidden rounded-lg bg-muted"
              >
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                    className="object-cover"
                  />
                ) : null}
              </Link>

              <Link href={`/products/${item.slug}`}>
                <h3 className="mt-4 font-heading text-base leading-snug font-medium text-foreground">
                  {item.name}
                </h3>
              </Link>
              <p className="mt-1 font-medium text-foreground">
                {formatPrice(item.price)}
              </p>

              <Button
                variant="outline"
                className="mt-4 w-full"
                onClick={() => handleMoveToBag(item)}
              >
                Move to Bag
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
