import Image from "next/image";
import Link from "next/link";

import { WishlistButton } from "@/components/product/wishlist-button";
import { StarRating } from "@/components/shared/star-rating";
import type { ProductCardData } from "@/types/product";
import { formatPrice } from "@/utils/format-price";

export function ProductCard({ product }: { product: ProductCardData }) {
  const primaryImage = product.images[0];
  const hasDiscount = product.discountPrice !== null;
  const discountPercent = hasDiscount
    ? Math.round(
        (1 - Number(product.discountPrice) / Number(product.price)) * 100,
      )
    : 0;

  return (
    <Link href={`/products/${product.slug}`} className="group flex flex-col">
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
          <span className="absolute top-3 left-3 border border-primary/50 bg-secondary/95 px-2.5 py-1 text-[10px] font-medium tracking-[0.15em] text-primary uppercase">
            {discountPercent}% Off
          </span>
        ) : null}
      </div>

      <div className="mt-4 flex flex-col">
        <p className="text-[11px] font-medium tracking-[0.15em] text-muted-foreground uppercase">
          {product.category.name}
        </p>
        <h3 className="mt-1.5 font-heading text-base leading-snug font-medium text-foreground">
          {product.name}
        </h3>
        <StarRating
          value={Number(product.ratingAverage)}
          count={product.ratingCount}
          className="mt-2"
        />
        <div className="mt-2 flex items-baseline gap-2">
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
