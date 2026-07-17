import type { Metadata } from "next";

import { ProductCard } from "@/components/product/product-card";
import { CategoryFilter } from "@/features/shop/components/category-filter";
import { getFeaturedCategories } from "@/services/category-service";
import { getShopProducts } from "@/services/product-service";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse our full collection of fine jewelry.",
};

const FILTER_HEADINGS: Record<string, string> = {
  "best-sellers": "Best Sellers",
  "new-arrivals": "New Arrivals",
  trending: "Trending Now",
  featured: "Featured Pieces",
};

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const categorySlug = firstParam(params.category);
  const occasion = firstParam(params.occasion);
  const filter = firstParam(params.filter);
  const sort = firstParam(params.sort);

  const [products, categories] = await Promise.all([
    getShopProducts({ categorySlug, occasion, filter, sort }),
    getFeaturedCategories(),
  ]);

  let heading = "All Jewelry";
  if (categorySlug) {
    heading =
      categories.find((category) => category.slug === categorySlug)?.name ??
      "All Jewelry";
  } else if (occasion) {
    heading = `${occasion.charAt(0).toUpperCase()}${occasion.slice(1)} Collection`;
  } else if (filter && FILTER_HEADINGS[filter]) {
    heading = FILTER_HEADINGS[filter];
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="border-b border-border pb-6">
        <h1 className="font-heading text-3xl font-semibold text-foreground">
          {heading}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {products.length} {products.length === 1 ? "piece" : "pieces"}
        </p>
      </header>

      <div className="mt-8 flex flex-col gap-8 lg:flex-row">
        <CategoryFilter
          activeSlug={categorySlug}
          isAllView={!categorySlug && !occasion && !filter}
        />

        <div className="flex-1">
          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-24 text-center">
              <p className="font-heading text-lg text-foreground">
                No pieces found
              </p>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                We couldn&apos;t find anything matching this filter. Try
                browsing all jewelry instead.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
