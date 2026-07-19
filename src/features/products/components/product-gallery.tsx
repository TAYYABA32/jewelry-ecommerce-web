"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

export function ProductGallery({
  images,
  productName,
}: {
  images: { url: string; altText: string | null }[];
  productName: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = images[activeIndex];

  return (
    <div>
      <div className="relative aspect-4/5 w-full overflow-hidden rounded-lg bg-muted">
        {active ? (
          <Image
            src={active.url}
            alt={active.altText ?? productName}
            fill
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        ) : null}
      </div>

      {images.length > 1 ? (
        <div className="mt-4 grid grid-cols-5 gap-3">
          {images.map((image, index) => (
            <button
              key={image.url}
              type="button"
              aria-label={`Show image ${index + 1} of ${productName}`}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "relative aspect-square overflow-hidden rounded-md bg-muted ring-2 transition-colors",
                index === activeIndex ? "ring-primary" : "ring-transparent",
              )}
            >
              <Image
                src={image.url}
                alt={image.altText ?? productName}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
