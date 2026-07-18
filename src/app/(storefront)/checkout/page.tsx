import { auth } from "@clerk/nextjs/server";
import type { Metadata } from "next";

import { CheckoutView } from "@/features/checkout/components/checkout-view";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your order.",
};

export default async function CheckoutPage() {
  await auth.protect({
    unauthenticatedUrl: "/login?redirect_url=/checkout",
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="border-b border-border pb-6">
        <h1 className="font-heading text-3xl font-semibold text-foreground">
          Checkout
        </h1>
      </header>

      <div className="mt-8">
        <CheckoutView />
      </div>
    </div>
  );
}
