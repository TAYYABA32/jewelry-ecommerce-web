"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

import { Button } from "@/components/ui/button";

type Product = {
  id: string;
  name: string;
  image: string | null;
  totalSold: number;
};

export function TopSellingProducts({ products }: { products: Product[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -220 : 220,
      behavior: "smooth",
    });
  };

  if (products.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        No sales data yet.
      </p>
    );
  }

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="w-40 shrink-0 rounded-xl border border-border bg-card p-3"
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-muted">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="160px"
                  className="object-cover"
                />
              ) : null}
            </div>
            <p className="mt-2 truncate text-sm font-medium text-foreground">
              {product.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {product.totalSold} sold
            </p>
          </div>
        ))}
      </div>

      <div className="mt-3 flex justify-end gap-2">
        <Button
          variant="outline"
          size="icon-sm"
          aria-label="Scroll left"
          onClick={() => scroll("left")}
        >
          <ChevronLeft />
        </Button>
        <Button
          variant="outline"
          size="icon-sm"
          aria-label="Scroll right"
          onClick={() => scroll("right")}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
