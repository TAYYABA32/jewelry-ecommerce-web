import { prisma } from "@/lib/prisma";

export async function getInventoryProducts() {
  return prisma.product.findMany({
    where: { deletedAt: null },
    include: {
      category: { select: { name: true } },
      images: { orderBy: { position: "asc" }, take: 1 },
    },
    orderBy: { stockQuantity: "asc" },
  });
}
