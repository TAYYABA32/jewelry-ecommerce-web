"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

import { deleteProduct } from "@/actions/admin/products";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/utils/format-price";

type AdminProduct = {
  id: string;
  name: string;
  price: string | number;
  category: { name: string };
  images: { url: string }[];
};

export function ProductTable({ products }: { products: AdminProduct[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = (product: AdminProduct) => {
    if (
      typeof window !== "undefined" &&
      !window.confirm(`Delete "${product.name}"? This cannot be undone.`)
    ) {
      return;
    }

    startTransition(async () => {
      const result = await deleteProduct(product.id);
      if (result.success) {
        toast.success("Product deleted");
        router.refresh();
      } else {
        toast.error("Could not delete this product.");
      }
    });
  };

  if (products.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border py-16 text-center text-muted-foreground">
        No products yet. Add your first piece to get started.
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
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3 text-right">Actions</th>
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
              <td className="px-4 py-3 text-foreground">
                {formatPrice(product.price)}
              </td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    render={
                      <Link href={`/admin/products/${product.id}/edit`}>
                        Edit
                      </Link>
                    }
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={isPending}
                    onClick={() => handleDelete(product)}
                    className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
