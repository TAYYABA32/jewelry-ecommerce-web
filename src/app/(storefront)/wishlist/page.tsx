import type { Metadata } from "next";

import { WishlistView } from "@/features/wishlist/components/wishlist-view";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Save your favorite Aurelia pieces for later.",
};

export default function WishlistPage() {
  return <WishlistView />;
}
