import { auth, currentUser } from "@clerk/nextjs/server";
import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { OrderCard } from "@/features/orders/components/order-card";
import { getOrdersByClerkId } from "@/services/order-service";

export const metadata: Metadata = {
  title: "My Orders",
  description: "View and track your Aurelia orders.",
};

export default async function MyOrdersPage() {
  const { userId } = await auth.protect({
    unauthenticatedUrl: "/login?redirect_url=/my-orders",
  });

  const [orders, clerkUser] = await Promise.all([
    getOrdersByClerkId(userId),
    currentUser(),
  ]);

  const firstName = clerkUser?.firstName;

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <header className="border-b border-border pb-6">
          <p className="text-sm font-medium tracking-[0.2em] text-primary uppercase">
            Your Account
          </p>
          <h1 className="mt-4 font-heading text-3xl font-semibold text-foreground sm:text-4xl">
            My Orders
          </h1>
          {firstName ? (
            <p className="mt-2 text-muted-foreground">
              Welcome back, {firstName}.
            </p>
          ) : null}
        </header>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#D4AF37]/30 py-24 text-center">
            <p className="font-heading text-xl text-foreground">
              Your collection is currently empty.
            </p>
            <Button
              className="mt-6 bg-[#D4AF37] text-[#111111] hover:bg-[#c9a227]"
              render={<Link href="/shop">Begin Your Collection</Link>}
            />
          </div>
        ) : (
          <div className="mt-10 space-y-6">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
