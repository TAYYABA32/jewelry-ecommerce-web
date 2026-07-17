import { prisma } from "@/lib/prisma";

export function getFeaturedCategories() {
  return prisma.category.findMany({
    where: { isActive: true, deletedAt: null, parentId: null },
    orderBy: { position: "asc" },
  });
}
