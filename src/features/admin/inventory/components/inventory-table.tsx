import Image from "next/image";

import { StockCell } from "@/features/admin/inventory/components/stock-cell";
import { StockStatusBadge } from "@/features/admin/inventory/components/stock-status-badge";

type InventoryProduct = {
  id: string;
  name: string;
  sku: string;
  stockQuantity: number;
  category: { name: string };
  images: { url: string }[];
};

export function InventoryTable({
  products,
}: {
  products: InventoryProduct[];
}) {
  if (products.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border py-16 text-center text-muted-foreground">
        No products yet.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-border bg-muted/50 text-xs tracking-wide text-muted-foreground uppercase">
          <tr>
            <th className="px-4 py-3">Product</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">SKU</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Quantity</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {products.map((product) => (
            <tr key={product.id}>
              <td className="flex items-center gap-3 px-4 py-3">
                <div className="relative size-12 shrink-0 overflow-hidden rounded-md bg-muted">
                  {product.images[0] ? (
                    <Image
                      src={product.images[0].url}
                      alt={product.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  ) : null}
                </div>
                <span className="font-medium text-foreground">
                  {product.name}
                </span>
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {product.category.name}
              </td>
              <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                {product.sku}
              </td>
              <td className="px-4 py-3">
                <StockStatusBadge quantity={product.stockQuantity} />
              </td>
              <td className="px-4 py-3">
                <StockCell productId={product.id} quantity={product.stockQuantity} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
