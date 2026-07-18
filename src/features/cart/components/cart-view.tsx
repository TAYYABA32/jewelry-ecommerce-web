"use client";

import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  useCartStore,
  useCartTotal,
} from "@/features/cart/store/cart-store";
import { formatPrice } from "@/utils/format-price";

export function CartView() {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const subtotal = useCartTotal();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-24 text-center">
        <ShoppingBag className="size-10 text-muted-foreground" />
        <p className="mt-4 font-heading text-lg text-foreground">
          Your cart is empty
        </p>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          Browse the collection and add a piece you love.
        </p>
        <Button
          className="mt-6"
          render={<Link href="/shop">Continue Shopping</Link>}
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <ul className="divide-y divide-border">
          {items.map((item) => (
            <li key={item.productId} className="flex gap-4 py-6 first:pt-0">
              <Link
                href={`/products/${item.slug}`}
                className="relative size-24 shrink-0 overflow-hidden rounded-lg bg-muted"
              >
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                ) : null}
              </Link>

              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-4">
                  <Link
                    href={`/products/${item.slug}`}
                    className="font-heading text-base font-medium text-foreground hover:text-primary"
                  >
                    {item.name}
                  </Link>
                  <p className="font-medium text-foreground">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2 rounded-lg border border-border">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      aria-label="Decrease quantity"
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity - 1)
                      }
                    >
                      <Minus />
                    </Button>
                    <span className="w-6 text-center text-sm">
                      {item.quantity}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      aria-label="Increase quantity"
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity + 1)
                      }
                    >
                      <Plus />
                    </Button>
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`Remove ${item.name} from cart`}
                    onClick={() => removeItem(item.productId)}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="h-fit rounded-lg border border-border p-6">
        <h2 className="font-heading text-lg font-semibold text-foreground">
          Order Summary
        </h2>
        <Separator className="my-4" />
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium text-foreground">
            {formatPrice(subtotal)}
          </span>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Shipping and taxes calculated at checkout.
        </p>
        <Button
          size="lg"
          className="mt-6 w-full"
          render={<Link href="/checkout">Proceed to Checkout</Link>}
        />
      </div>
    </div>
  );
}
