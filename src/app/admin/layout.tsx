import { UserButton } from "@clerk/nextjs";
import type { Metadata } from "next";
import Link from "next/link";

import { requireAdmin } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: {
    default: "Admin",
    template: "%s | Aurelia Admin",
  },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="min-h-screen bg-[#FBF9F4]">
      <header className="flex h-16 items-center justify-between border-b border-border bg-white px-6">
        <div className="flex items-center gap-8">
          <span className="font-heading text-lg font-semibold text-foreground">
            Aurelia Admin
          </span>
          <nav className="flex items-center gap-6">
            <Link
              href="/admin/products"
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              Products
            </Link>
            <Link
              href="/admin/orders"
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              Orders
            </Link>
          </nav>
        </div>
        <UserButton />
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
