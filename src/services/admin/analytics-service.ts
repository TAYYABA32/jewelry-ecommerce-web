import { prisma } from "@/lib/prisma";

import type { OrderStatus } from "@/generated/prisma";

const EXCLUDED_STATUSES: OrderStatus[] = ["CANCELLED", "REFUNDED"];

export async function getMonthlyRevenue(months = 6) {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth() - (months - 1), 1);

  const orders = await prisma.order.findMany({
    where: {
      deletedAt: null,
      createdAt: { gte: start },
      status: { notIn: EXCLUDED_STATUSES },
    },
    select: { totalAmount: true, createdAt: true },
  });

  const buckets = new Map<string, number>();
  for (let i = 0; i < months; i++) {
    const d = new Date(start.getFullYear(), start.getMonth() + i, 1);
    buckets.set(`${d.getFullYear()}-${d.getMonth()}`, 0);
  }

  for (const order of orders) {
    const key = `${order.createdAt.getFullYear()}-${order.createdAt.getMonth()}`;
    const existing = buckets.get(key);
    if (existing !== undefined) {
      buckets.set(key, existing + Number(order.totalAmount.toString()));
    }
  }

  return Array.from(buckets.entries()).map(([key, revenue]) => {
    const [year, month] = key.split("-").map(Number);
    return {
      month: new Date(year, month, 1).toLocaleDateString("en-US", {
        month: "short",
      }),
      revenue,
    };
  });
}

export async function getCategoryBreakdown() {
  const items = await prisma.orderItem.findMany({
    where: {
      order: { deletedAt: null, status: { notIn: EXCLUDED_STATUSES } },
    },
    select: {
      price: true,
      quantity: true,
      product: { select: { category: { select: { name: true } } } },
    },
  });

  const byCategory = new Map<string, number>();
  for (const item of items) {
    const categoryName = item.product.category.name;
    const revenue = Number(item.price.toString()) * item.quantity;
    byCategory.set(categoryName, (byCategory.get(categoryName) ?? 0) + revenue);
  }

  return Array.from(byCategory.entries())
    .map(([name, revenue]) => ({ name, revenue }))
    .sort((a, b) => b.revenue - a.revenue);
}

export async function getRepeatCustomerRate() {
  const users = await prisma.user.findMany({
    where: { deletedAt: null, role: "CUSTOMER" },
    include: {
      orders: {
        where: { deletedAt: null, status: { notIn: EXCLUDED_STATUSES } },
        select: { id: true },
      },
    },
  });

  const withOrders = users.filter((user) => user.orders.length > 0);
  const repeat = withOrders.filter((user) => user.orders.length > 1);

  return {
    rate:
      withOrders.length === 0
        ? 0
        : Math.round((repeat.length / withOrders.length) * 100),
    repeatCustomers: repeat.length,
    totalCustomers: withOrders.length,
  };
}
