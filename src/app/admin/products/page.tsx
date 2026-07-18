import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ProductTable } from "@/features/admin/products/components/product-table";
import { getAdminProducts } from "@/services/admin/product-service";

export const metadata: Metadata = { title: "Products" };

export default async function AdminProductsPage() {
  const products = await getAdminProducts();

  return (
    <div>
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-foreground">
            Products
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {products.length} {products.length === 1 ? "product" : "products"}
          </p>
        </div>
        <Button render={<Link href="/admin/products/new">+ Add Product</Link>} />
      </header>

      <div className="mt-8">
        <ProductTable
          products={products.map((product) => ({
            id: product.id,
            name: product.name,
            price: product.price.toString(),
            category: { name: product.category.name },
            images: product.images.map((image) => ({ url: image.url })),
          }))}
        />
      </div>
    </div>
  );
}
