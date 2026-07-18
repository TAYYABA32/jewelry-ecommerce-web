import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { getFeaturedCategories } from "@/services/category-service";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse fine jewelry by category.",
};

export default async function CategoriesPage() {
  const categories = await getFeaturedCategories();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="text-center">
        <h1 className="font-heading text-3xl font-semibold text-foreground sm:text-4xl">
          Shop by Category
        </h1>
        <p className="mt-2 text-muted-foreground">
          Explore our collections, each crafted with the same care.
        </p>
      </header>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/shop?category=${category.slug}`}
            className="group relative flex aspect-4/5 items-end overflow-hidden rounded-2xl"
          >
            {category.imageUrl ? (
              <Image
                src={category.imageUrl}
                alt={category.name}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
            <div className="relative p-6">
              <span className="font-heading text-xl font-medium text-white">
                {category.name}
              </span>
              {category.description ? (
                <p className="mt-1 max-w-xs text-sm text-white/80">
                  {category.description}
                </p>
              ) : null}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
