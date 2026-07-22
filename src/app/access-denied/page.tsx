import { UserButton } from "@clerk/nextjs";
import { ShieldAlert } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Access Denied",
  robots: { index: false, follow: false },
};

export default function AccessDeniedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <ShieldAlert className="size-7" />
      </div>

      <h1 className="mt-6 font-heading text-2xl font-semibold text-foreground">
        Access Denied
      </h1>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        You&apos;re signed in, but this account doesn&apos;t have admin
        access. If you believe this is a mistake, ask a store admin to add
        your email to the admin list.
      </p>

      <div className="mt-8 flex items-center gap-4">
        <Button nativeButton={false} render={<Link href="/">Return Home</Link>} />
        <UserButton />
      </div>
    </div>
  );
}
