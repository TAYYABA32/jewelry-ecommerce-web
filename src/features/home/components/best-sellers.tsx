import Link from "next/link";

import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { getBestSellerProducts } from "@/services/product-service";

export async function BestSellers() {
  const products = await getBestSellerProducts(4);

  if (products.length === 0) return null;

  return (
    <section className="bg-muted py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-heading text-3xl font-semibold text-foreground">
              Best Sellers
            </h2>
            <p className="mt-2 text-muted-foreground">
              Our most-loved pieces, chosen by customers again and again.
            </p>
          </div>
          <Button
            variant="outline"
            className="hidden sm:inline-flex"
            render={<Link href="/shop?filter=best-sellers">View All</Link>}
          />
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Button
            variant="outline"
            render={<Link href="/shop?filter=best-sellers">View All</Link>}
          />
        </div>
      </div>
    </section>
  );
}
