import { prisma } from "@/lib/prisma";

export async function getSalesTransactions() {
  return prisma.order.findMany({
    where: { deletedAt: null },
    include: {
      shippingAddress: { select: { fullName: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}
