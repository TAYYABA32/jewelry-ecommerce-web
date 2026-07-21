"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import {
  type ProductFormValues,
  productFormSchema,
} from "@/features/admin/products/schema";

type ProductFieldErrors = Partial<Record<keyof ProductFormValues, string[]>> & {
  _root?: string[];
};

function slugify(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function uniqueSlug(name: string) {
  const base = slugify(name) || "product";
  let slug = base;
  let attempt = 1;

  while (await prisma.product.findUnique({ where: { slug } })) {
    attempt += 1;
    slug = `${base}-${attempt}`;
  }

  return slug;
}

function generateSku() {
  return `AUR-${Date.now().toString(36).toUpperCase()}${Math.floor(
    Math.random() * 900 + 100,
  )}`;
}

export async function createProduct(input: unknown) {
  await requireAdmin();

  const parsed = productFormSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false as const,
      error: parsed.error.flatten().fieldErrors as ProductFieldErrors,
    };
  }

  const { name, price, categoryId, occasion, material, description, imageUrl } =
    parsed.data;

  const slug = await uniqueSlug(name);

  const product = await prisma.product.create({
    data: {
      name,
      slug,
      sku: generateSku(),
      description,
      price,
      material,
      occasion: occasion || null,
      categoryId,
      images: { create: [{ url: imageUrl, position: 0 }] },
    },
  });

  revalidatePath("/admin/products");
  return { success: true as const, productId: product.id };
}

export async function updateProduct(productId: string, input: unknown) {
  await requireAdmin();

  const parsed = productFormSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false as const,
      error: parsed.error.flatten().fieldErrors as ProductFieldErrors,
    };
  }

  const existing = await prisma.product.findFirst({
    where: { id: productId, deletedAt: null },
    include: { images: { orderBy: { position: "asc" }, take: 1 } },
  });
  if (!existing) {
    return {
      success: false as const,
      error: { _root: ["This product could not be found."] } as ProductFieldErrors,
    };
  }

  const { name, price, categoryId, occasion, material, description, imageUrl } =
    parsed.data;

  await prisma.product.update({
    where: { id: productId },
    data: {
      name,
      description,
      price,
      material,
      occasion: occasion || null,
      categoryId,
    },
  });

  const primaryImage = existing.images[0];
  if (primaryImage) {
    await prisma.productImage.update({
      where: { id: primaryImage.id },
      data: { url: imageUrl },
    });
  } else {
    await prisma.productImage.create({
      data: { productId, url: imageUrl, position: 0 },
    });
  }

  revalidatePath("/admin/products");
  return { success: true as const };
}

export async function deleteProduct(productId: string) {
  await requireAdmin();

  await prisma.product.update({
    where: { id: productId },
    data: { deletedAt: new Date(), isActive: false },
  });

  revalidatePath("/admin/products");
  return { success: true as const };
}

export async function updateProductStock(productId: string, quantity: number) {
  await requireAdmin();

  if (!Number.isInteger(quantity) || quantity < 0) {
    return {
      success: false as const,
      error: "Stock quantity must be a non-negative whole number.",
    };
  }

  await prisma.product.update({
    where: { id: productId },
    data: { stockQuantity: quantity, isAvailable: quantity > 0 },
  });

  revalidatePath("/admin/inventory");
  return { success: true as const };
}
