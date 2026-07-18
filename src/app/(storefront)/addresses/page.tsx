import { auth } from "@clerk/nextjs/server";
import type { Metadata } from "next";

import { AddressesView } from "@/features/addresses/components/addresses-view";
import { getAddressesByClerkId } from "@/services/address-service";

export const metadata: Metadata = {
  title: "Addresses",
  description: "Manage your saved shipping addresses.",
};

export default async function AddressesPage() {
  const { userId } = await auth.protect({
    unauthenticatedUrl: "/login?redirect_url=/addresses",
  });

  const addresses = await getAddressesByClerkId(userId);

  return <AddressesView addresses={addresses} />;
}
