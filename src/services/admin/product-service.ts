import { prisma } from "@/lib/prisma";

export function getAdminProducts() {
  return prisma.product.findMany({
    where: { deletedAt: null },
    include: {
      category: true,
      images: { orderBy: { position: "asc" }, take: 1 },
    },
    orderBy: { createdAt: "desc" },
  });
}

export function getAdminProductById(id: string) {
  return prisma.product.findUnique({
    where: { id },
    include: { images: { orderBy: { position: "asc" } } },
  });
}

export function getAdminCategories() {
  return prisma.category.findMany({
    where: { deletedAt: null, isActive: true },
    orderBy: { position: "asc" },
  });
}
