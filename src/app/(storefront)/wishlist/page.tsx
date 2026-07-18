import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/shared/placeholder-page";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Save your favorite Aurelia pieces for later.",
};

export default function WishlistPage() {
  return (
    <PlaceholderPage
      eyebrow="Your Account"
      title="Wishlist"
      description="Pieces you save will be collected here, so you can return to them whenever you're ready."
    />
  );
}
