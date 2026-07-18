import { prisma } from "@/lib/prisma";

export async function getAddressesByClerkId(clerkId: string) {
  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) return [];

  return prisma.address.findMany({
    where: { userId: user.id, deletedAt: null },
    orderBy: { createdAt: "desc" },
  });
}
