import type { Metadata } from "next";

import { CartView } from "@/features/cart/components/cart-view";

export const metadata: Metadata = {
  title: "Your Cart",
  description: "Review the pieces you've selected before checkout.",
};

export default function CartPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="border-b border-border pb-6">
        <h1 className="font-heading text-3xl font-semibold text-foreground">
          Your Cart
        </h1>
      </header>

      <div className="mt-8">
        <CartView />
      </div>
    </div>
  );
}
