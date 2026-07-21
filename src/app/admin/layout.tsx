import { UserButton } from "@clerk/nextjs";
import type { Metadata } from "next";

import { AdminSidebar } from "@/features/admin/shared/admin-sidebar";
import { requireAdmin } from "@/lib/admin-auth";
import { ThemeToggle } from "@/components/layout/theme-toggle";

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
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <div className="flex-1">
        <header className="flex h-16 items-center justify-end gap-3 border-b border-border bg-card px-6">
          <ThemeToggle />
          <UserButton />
        </header>
        <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
      </div>
    </div>
  );
}
