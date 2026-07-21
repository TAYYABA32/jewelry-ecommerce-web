"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import {
  type CouponFormValues,
  couponFormSchema,
} from "@/features/admin/offers/schema";

type CouponFieldErrors = Partial<Record<keyof CouponFormValues, string[]>> & {
  _root?: string[];
};

export async function createCoupon(input: unknown) {
  await requireAdmin();

  const parsed = couponFormSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false as const,
      error: parsed.error.flatten().fieldErrors as CouponFieldErrors,
    };
  }

  const { code, type, value, minPurchase, maxDiscount, usageLimit, startsAt, expiresAt } =
    parsed.data;

  const existing = await prisma.coupon.findUnique({
    where: { code: code.toUpperCase() },
  });
  if (existing) {
    return {
      success: false as const,
      error: { code: ["This code is already in use."] } as CouponFieldErrors,
    };
  }

  await prisma.coupon.create({
    data: {
      code: code.toUpperCase(),
      type,
      value,
      minPurchase,
      maxDiscount,
      usageLimit,
      startsAt: new Date(startsAt),
      expiresAt: new Date(expiresAt),
    },
  });

  revalidatePath("/admin/offers");
  return { success: true as const };
}

export async function toggleCouponStatus(couponId: string, isActive: boolean) {
  await requireAdmin();

  await prisma.coupon.update({
    where: { id: couponId },
    data: { isActive },
  });

  revalidatePath("/admin/offers");
  return { success: true as const };
}

export async function deleteCoupon(couponId: string) {
  await requireAdmin();

  await prisma.coupon.delete({ where: { id: couponId } });

  revalidatePath("/admin/offers");
  return { success: true as const };
}
