"use server";

import { prisma } from "@/lib/prisma";
import { consultationSchema } from "@/features/contact/schema";

export async function submitConsultationRequest(input: unknown) {
  const parsed = consultationSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false as const,
      error: parsed.error.flatten().fieldErrors,
    };
  }

  const { preferredDate, ...rest } = parsed.data;

  await prisma.consultationRequest.create({
    data: {
      ...rest,
      preferredDate: preferredDate ? new Date(preferredDate) : null,
    },
  });

  return { success: true as const };
}
