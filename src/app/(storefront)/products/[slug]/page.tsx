import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductAddToCart } from "@/features/products/components/product-add-to-cart";
import { ProductGallery } from "@/features/products/components/product-gallery";
import { ProductWishlistButton } from "@/features/products/components/product-wishlist-button";
import { StarRating } from "@/components/shared/star-rating";
import { getProductBySlug } from "@/services/product-service";
import { formatPrice } from "@/utils/format-price";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: product.name,
    description: product.shortDescription ?? product.description,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const hasDiscount = product.discountPrice !== null;
  const discountPercent = hasDiscount
    ? Math.round(
        (1 - Number(product.discountPrice) / Number(product.price)) * 100,
      )
    : 0;
  const effectivePrice = Number(
    (hasDiscount ? product.discountPrice! : product.price).toString(),
  );
  const primaryImage = product.images[0]?.url ?? "";
  const inStock = product.isAvailable && product.stockQuantity > 0;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <ProductGallery
          images={product.images.map((image) => ({
            url: image.url,
            altText: image.altText,
          }))}
          productName={product.name}
        />

        <div>
          <p className="text-xs font-medium tracking-[0.15em] text-muted-foreground uppercase">
            {product.category.name}
          </p>
          <h1 className="mt-2 font-heading text-3xl font-semibold text-foreground sm:text-4xl">
            {product.name}
          </h1>

          <StarRating
            value={Number(product.ratingAverage)}
            count={product.ratingCount}
            className="mt-3"
          />

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-2xl font-medium text-foreground">
              {formatPrice(effectivePrice)}
            </span>
            {hasDiscount ? (
              <>
                <span className="text-lg text-muted-foreground line-through">
                  {formatPrice(product.price)}
                </span>
                <span className="text-sm font-medium text-primary">
                  {discountPercent}% Off
                </span>
              </>
            ) : null}
          </div>

          <p className="mt-6 leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-6 text-sm">
            <div>
              <dt className="text-muted-foreground">Material</dt>
              <dd className="mt-1 font-medium text-foreground">
                {product.material}
              </dd>
            </div>
            {product.stoneType ? (
              <div>
                <dt className="text-muted-foreground">Stone</dt>
                <dd className="mt-1 font-medium text-foreground">
                  {product.stoneType}
                </dd>
              </div>
            ) : null}
          </dl>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            {inStock ? (
              <ProductAddToCart
                productId={product.id}
                slug={product.slug}
                name={product.name}
                image={primaryImage}
                price={effectivePrice}
              />
            ) : (
              <p className="text-sm font-medium text-destructive">
                Currently out of stock
              </p>
            )}
            <ProductWishlistButton
              productId={product.id}
              slug={product.slug}
              name={product.name}
              image={primaryImage}
              price={effectivePrice}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
