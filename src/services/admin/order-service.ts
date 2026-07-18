import { prisma } from "@/lib/prisma";

export function getAdminOrders() {
  return prisma.order.findMany({
    where: { deletedAt: null },
    include: {
      items: true,
      shippingAddress: true,
    },
    orderBy: { createdAt: "desc" },
  });
}
