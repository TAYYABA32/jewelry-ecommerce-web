import { prisma } from "@/lib/prisma";
import { productCardInclude } from "@/types/product";

const activeProduct = { isActive: true, deletedAt: null } as const;

export function getBestSellerProducts(limit = 8) {
  return prisma.product.findMany({
    where: { ...activeProduct, isBestSeller: true },
    include: productCardInclude,
    orderBy: { ratingAverage: "desc" },
    take: limit,
  });
}

export function getFeaturedProducts(limit = 8) {
  return prisma.product.findMany({
    where: { ...activeProduct, isFeatured: true },
    include: productCardInclude,
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

export function getNewArrivalProducts(limit = 8) {
  return prisma.product.findMany({
    where: { ...activeProduct, isNewArrival: true },
    include: productCardInclude,
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

export function getTrendingProducts(limit = 8) {
  return prisma.product.findMany({
    where: { ...activeProduct, isTrending: true },
    include: productCardInclude,
    orderBy: { ratingCount: "desc" },
    take: limit,
  });
}
