import { prisma } from "@/lib/prisma";

export async function getOrdersByClerkId(clerkId: string) {
  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) return [];

  return prisma.order.findMany({
    where: { userId: user.id, deletedAt: null },
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });
}
