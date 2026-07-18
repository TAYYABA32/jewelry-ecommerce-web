import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/shared/placeholder-page";

export const metadata: Metadata = {
  title: "Addresses",
  description: "Manage your saved shipping addresses.",
};

export default function AddressesPage() {
  return (
    <PlaceholderPage
      eyebrow="Your Account"
      title="Addresses"
      description="Your saved shipping addresses will appear here for faster checkout on future orders."
    />
  );
}
