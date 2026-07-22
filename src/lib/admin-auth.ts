import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { isAdminUser } from "@/lib/admin-access";
import { prisma } from "@/lib/prisma";

// Access is gated on an admin allowlist (email in ADMIN_EMAILS, or Clerk
// publicMetadata.role === "admin"), not on a single hardcoded user — any
// team member can be granted access without sharing credentials.
export async function requireAdmin() {
  const { userId } = await auth.protect({
    unauthenticatedUrl: "/login?redirect_url=/admin",
  });

  const clerkUser = await currentUser();
  const email = clerkUser?.primaryEmailAddress?.emailAddress;

  if (!email || !isAdminUser({ email, publicMetadata: clerkUser?.publicMetadata })) {
    redirect("/access-denied");
  }

  return prisma.user.upsert({
    where: { clerkId: userId },
    update: { email, role: "ADMIN" },
    create: {
      clerkId: userId,
      email,
      firstName: clerkUser?.firstName,
      lastName: clerkUser?.lastName,
      role: "ADMIN",
    },
  });
}
