"use server";

import { prisma } from "@/lib/prisma";
import { newsletterSchema } from "@/features/newsletter/schema";

export async function subscribeToNewsletter(input: unknown) {
  const parsed = newsletterSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false as const,
      error: parsed.error.flatten().fieldErrors,
    };
  }

  const email = parsed.data.email.toLowerCase();

  await prisma.newsletterSubscriber.upsert({
    where: { email },
    update: { isActive: true, unsubscribedAt: null },
    create: { email },
  });

  return { success: true as const };
}
