import type { Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { productCardInclude } from "@/types/product";

const activeProduct = { isActive: true, deletedAt: null } as const;

export type ShopFilter =
  | "best-sellers"
  | "new-arrivals"
  | "trending"
  | "featured";

export type ShopSort = "newest" | "price-asc" | "price-desc" | "rating";

const SHOP_FILTER_WHERE: Record<ShopFilter, Prisma.ProductWhereInput> = {
  "best-sellers": { isBestSeller: true },
  "new-arrivals": { isNewArrival: true },
  trending: { isTrending: true },
  featured: { isFeatured: true },
};

const SHOP_SORT_ORDER_BY: Record<ShopSort, Prisma.ProductOrderByWithRelationInput> = {
  newest: { createdAt: "desc" },
  "price-asc": { price: "asc" },
  "price-desc": { price: "desc" },
  rating: { ratingAverage: "desc" },
};

export async function getShopProducts({
  categorySlug,
  occasion,
  filter,
  sort = "newest",
}: {
  categorySlug?: string;
  occasion?: string;
  filter?: string;
  sort?: string;
}) {
  const where: Prisma.ProductWhereInput = {
    ...activeProduct,
    ...(categorySlug ? { category: { slug: categorySlug } } : {}),
    ...(occasion ? { occasion: { equals: occasion, mode: "insensitive" } } : {}),
    ...(filter && filter in SHOP_FILTER_WHERE
      ? SHOP_FILTER_WHERE[filter as ShopFilter]
      : {}),
  };

  const orderBy =
    sort in SHOP_SORT_ORDER_BY
      ? SHOP_SORT_ORDER_BY[sort as ShopSort]
      : SHOP_SORT_ORDER_BY.newest;

  return prisma.product.findMany({
    where,
    include: productCardInclude,
    orderBy,
  });
}

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

export function getProductsByIds(ids: string[]) {
  return prisma.product.findMany({
    where: { ...activeProduct, id: { in: ids } },
    include: productCardInclude,
  });
}
