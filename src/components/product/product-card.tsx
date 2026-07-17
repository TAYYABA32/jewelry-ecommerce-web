import Image from "next/image";
import Link from "next/link";

import { WishlistButton } from "@/components/product/wishlist-button";
import { StarRating } from "@/components/shared/star-rating";
import type { ProductCardData } from "@/types/product";
import { formatPrice } from "@/utils/format-price";

export function ProductCard({ product }: { product: ProductCardData }) {
  const primaryImage = product.images[0];
  const hasDiscount = product.discountPrice !== null;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col"
    >
      <div className="relative aspect-4/5 overflow-hidden rounded-lg bg-muted">
        {primaryImage ? (
          <Image
            src={primaryImage.url}
            alt={primaryImage.altText ?? product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : null}
        <WishlistButton productName={product.name} />
        {hasDiscount ? (
          <span className="absolute top-3 left-3 rounded-full bg-primary px-2.5 py-1 text-[11px] font-medium text-primary-foreground">
            Sale
          </span>
        ) : null}
      </div>

      <div className="mt-3 space-y-1">
        <p className="text-xs tracking-wide text-muted-foreground uppercase">
          {product.category.name}
        </p>
        <h3 className="font-heading text-base font-medium text-foreground">
          {product.name}
        </h3>
        <StarRating value={Number(product.ratingAverage)} count={product.ratingCount} />
        <div className="flex items-center gap-2 pt-1">
          <span className="font-medium text-foreground">
            {formatPrice(hasDiscount ? product.discountPrice! : product.price)}
          </span>
          {hasDiscount ? (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.price)}
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
