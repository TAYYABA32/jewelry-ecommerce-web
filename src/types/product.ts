import type { Prisma } from "@/generated/prisma";

export const productCardInclude = {
  images: { orderBy: { position: "asc" } },
  category: true,
} satisfies Prisma.ProductInclude;

export type ProductCardData = Prisma.ProductGetPayload<{
  include: typeof productCardInclude;
}>;
