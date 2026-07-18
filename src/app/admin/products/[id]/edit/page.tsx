import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductForm } from "@/features/admin/products/components/product-form";
import {
  getAdminCategories,
  getAdminProductById,
} from "@/services/admin/product-service";

export const metadata: Metadata = { title: "Edit Product" };

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [product, categories] = await Promise.all([
    getAdminProductById(id),
    getAdminCategories(),
  ]);

  if (!product || product.deletedAt) {
    notFound();
  }

  return (
    <div>
      <header className="border-b border-border pb-6">
        <h1 className="font-heading text-2xl font-semibold text-foreground">
          Edit Product
        </h1>
      </header>

      <div className="mt-8">
        <ProductForm
          categories={categories.map((c) => ({ id: c.id, name: c.name }))}
          product={{
            id: product.id,
            name: product.name,
            price: Number(product.price.toString()),
            categoryId: product.categoryId,
            occasion: product.occasion,
            material: product.material,
            description: product.description,
            imageUrl: product.images[0]?.url ?? "",
          }}
        />
      </div>
    </div>
  );
}
