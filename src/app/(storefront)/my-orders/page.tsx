import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/shared/placeholder-page";

export const metadata: Metadata = {
  title: "My Orders",
  description: "View and track your Aurelia orders.",
};

export default function MyOrdersPage() {
  return (
    <PlaceholderPage
      eyebrow="Your Account"
      title="My Orders"
      description="Your order history will appear here once you've signed in and placed your first order with Aurelia."
    />
  );
}
