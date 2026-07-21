import { prisma } from "@/lib/prisma";

import type { OrderStatus } from "@/generated/prisma";

const ACTIVE_ORDER = { deletedAt: null } as const;
const EXCLUDED_STATUSES: OrderStatus[] = ["CANCELLED", "REFUNDED"];

function percentChange(current: number, previous: number) {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
}

export async function getDashboardStats() {
  const now = new Date();
  const periodStart = new Date(now);
  periodStart.setDate(periodStart.getDate() - 30);
  const previousPeriodStart = new Date(periodStart);
  previousPeriodStart.setDate(previousPeriodStart.getDate() - 30);

  const [
    currentOrders,
    previousOrders,
    currentCustomers,
    previousCustomers,
    pendingDelivery,
  ] = await Promise.all([
    prisma.order.findMany({
      where: {
        ...ACTIVE_ORDER,
        createdAt: { gte: periodStart },
        status: { notIn: EXCLUDED_STATUSES },
      },
      select: { totalAmount: true },
    }),
    prisma.order.findMany({
      where: {
        ...ACTIVE_ORDER,
        createdAt: { gte: previousPeriodStart, lt: periodStart },
        status: { notIn: EXCLUDED_STATUSES },
      },
      select: { totalAmount: true },
    }),
    prisma.user.count({
      where: { createdAt: { gte: periodStart }, deletedAt: null },
    }),
    prisma.user.count({
      where: {
        createdAt: { gte: previousPeriodStart, lt: periodStart },
        deletedAt: null,
      },
    }),
    prisma.order.count({
      where: {
        ...ACTIVE_ORDER,
        status: { notIn: ["DELIVERED", "CANCELLED", "REFUNDED"] },
      },
    }),
  ]);

  const currentRevenue = currentOrders.reduce(
    (sum, order) => sum + Number(order.totalAmount.toString()),
    0,
  );
  const previousRevenue = previousOrders.reduce(
    (sum, order) => sum + Number(order.totalAmount.toString()),
    0,
  );

  return {
    revenue: {
      value: currentRevenue,
      changePercent: percentChange(currentRevenue, previousRevenue),
    },
    orders: {
      value: currentOrders.length,
      changePercent: percentChange(currentOrders.length, previousOrders.length),
    },
    customers: {
      value: currentCustomers,
      changePercent: percentChange(currentCustomers, previousCustomers),
    },
    pendingDelivery: {
      value: pendingDelivery,
    },
  };
}

export async function getRevenueSeries(days = 14) {
  const now = new Date();
  const start = new Date(now);
  start.setDate(start.getDate() - (days - 1));
  start.setHours(0, 0, 0, 0);

  const orders = await prisma.order.findMany({
    where: {
      ...ACTIVE_ORDER,
      createdAt: { gte: start },
      status: { notIn: EXCLUDED_STATUSES },
    },
    select: { totalAmount: true, createdAt: true },
  });

  const byDay = new Map<string, number>();
  for (let i = 0; i < days; i++) {
    const day = new Date(start);
    day.setDate(day.getDate() + i);
    byDay.set(day.toISOString().slice(0, 10), 0);
  }

  for (const order of orders) {
    const key = order.createdAt.toISOString().slice(0, 10);
    const existing = byDay.get(key);
    if (existing !== undefined) {
      byDay.set(key, existing + Number(order.totalAmount.toString()));
    }
  }

  return Array.from(byDay.entries()).map(([date, revenue]) => ({
    date,
    revenue,
  }));
}

export async function getFulfillmentRate() {
  const [delivered, total] = await Promise.all([
    prisma.order.count({ where: { ...ACTIVE_ORDER, status: "DELIVERED" } }),
    prisma.order.count({
      where: { ...ACTIVE_ORDER, status: { notIn: EXCLUDED_STATUSES } },
    }),
  ]);

  return {
    delivered,
    total,
    rate: total === 0 ? 0 : Math.round((delivered / total) * 100),
  };
}

export async function getTopSellingProducts(limit = 8) {
  const grouped = await prisma.orderItem.groupBy({
    by: ["productId"],
    _sum: { quantity: true },
    orderBy: { _sum: { quantity: "desc" } },
    take: limit,
  });

  if (grouped.length === 0) return [];

  const products = await prisma.product.findMany({
    where: { id: { in: grouped.map((g) => g.productId) } },
    include: { images: { orderBy: { position: "asc" }, take: 1 } },
  });

  return grouped
    .map((group) => {
      const product = products.find((p) => p.id === group.productId);
      if (!product) return null;
      return {
        id: product.id,
        name: product.name,
        image: product.images[0]?.url ?? null,
        totalSold: group._sum.quantity ?? 0,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);
}
