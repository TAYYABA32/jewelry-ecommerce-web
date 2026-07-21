import { prisma } from "@/lib/prisma";

import type { OrderStatus } from "@/generated/prisma";

const EXCLUDED_STATUSES: OrderStatus[] = ["CANCELLED", "REFUNDED"];

export async function getCustomers() {
  const users = await prisma.user.findMany({
    where: { deletedAt: null, role: "CUSTOMER" },
    include: {
      orders: {
        where: { deletedAt: null, status: { notIn: EXCLUDED_STATUSES } },
        select: { totalAmount: true, createdAt: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return users
    .map((user) => {
      const totalSpent = user.orders.reduce(
        (sum, order) => sum + Number(order.totalAmount.toString()),
        0,
      );
      const lastOrderDate = user.orders.length
        ? user.orders.reduce(
            (latest, order) => (order.createdAt > latest ? order.createdAt : latest),
            user.orders[0].createdAt,
          )
        : null;

      return {
        id: user.id,
        name: [user.firstName, user.lastName].filter(Boolean).join(" ") || "—",
        email: user.email,
        totalOrders: user.orders.length,
        totalSpent,
        lastOrderDate,
      };
    })
    .sort((a, b) => b.totalSpent - a.totalSpent);
}
