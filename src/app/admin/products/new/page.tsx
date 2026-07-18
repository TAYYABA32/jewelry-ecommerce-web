import type { Metadata } from "next";

import { ProductForm } from "@/features/admin/products/components/product-form";
import { getAdminCategories } from "@/services/admin/product-service";

export const metadata: Metadata = { title: "Add Product" };

export default async function NewProductPage() {
  const categories = await getAdminCategories();

  return (
    <div>
      <header className="border-b border-border pb-6">
        <h1 className="font-heading text-2xl font-semibold text-foreground">
          Add Product
        </h1>
      </header>

      <div className="mt-8">
        <ProductForm
          categories={categories.map((c) => ({ id: c.id, name: c.name }))}
        />
      </div>
    </div>
  );
}
