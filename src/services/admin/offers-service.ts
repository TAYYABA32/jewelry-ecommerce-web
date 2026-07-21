import { prisma } from "@/lib/prisma";

export async function getCoupons() {
  return prisma.coupon.findMany({
    orderBy: { createdAt: "desc" },
  });
}
