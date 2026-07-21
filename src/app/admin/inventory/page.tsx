import type { Metadata } from "next";

import { InventoryTable } from "@/features/admin/inventory/components/inventory-table";
import { getInventoryProducts } from "@/services/admin/inventory-service";

export const metadata: Metadata = { title: "Inventory" };

export default async function AdminInventoryPage() {
  const products = await getInventoryProducts();

  return (
    <div>
      <header className="border-b border-border pb-6">
        <h1 className="font-heading text-2xl font-semibold text-foreground">
          Inventory
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {products.length} {products.length === 1 ? "product" : "products"}{" "}
          &middot; click a quantity to edit it
        </p>
      </header>

      <div className="mt-8">
        <InventoryTable
          products={products.map((product) => ({
            id: product.id,
            name: product.name,
            sku: product.sku,
            stockQuantity: product.stockQuantity,
            category: product.category,
            images: product.images,
          }))}
        />
      </div>
    </div>
  );
}
