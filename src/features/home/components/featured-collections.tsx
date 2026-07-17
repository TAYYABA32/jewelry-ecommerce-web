import Image from "next/image";
import Link from "next/link";

import { getFeaturedCategories } from "@/services/category-service";

export async function FeaturedCollections() {
  const categories = await getFeaturedCategories();

  if (categories.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="font-heading text-3xl font-semibold text-foreground">
          Shop by Category
        </h2>
        <p className="mt-2 text-muted-foreground">
          Explore our collections, each crafted with the same care.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="group relative flex aspect-square items-end overflow-hidden rounded-lg"
          >
            {category.imageUrl ? (
              <Image
                src={category.imageUrl}
                alt={category.name}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <span className="relative p-4 font-heading text-lg font-medium text-white">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
