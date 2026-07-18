import { auth, currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

import { ADMIN_EMAIL } from "@/constants/admin";
import { prisma } from "@/lib/prisma";

// Access is gated on a single known email, not just "signed in" — an
// unauthorized signed-in user gets a plain 404, not a redirect, so the
// existence of /admin isn't revealed to them.
export async function requireAdmin() {
  const { userId } = await auth.protect({
    unauthenticatedUrl: "/login?redirect_url=/admin",
  });

  const clerkUser = await currentUser();
  const email = clerkUser?.primaryEmailAddress?.emailAddress;

  if (!email || email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
    notFound();
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
