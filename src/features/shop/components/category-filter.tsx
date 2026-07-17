import Link from "next/link";

import { cn } from "@/lib/utils";
import { getFeaturedCategories } from "@/services/category-service";

export async function CategoryFilter({
  activeSlug,
  isAllView = false,
}: {
  activeSlug?: string;
  isAllView?: boolean;
}) {
  const categories = await getFeaturedCategories();

  const items = [
    { slug: undefined, name: "All Jewelry" },
    ...categories.map((category) => ({
      slug: category.slug,
      name: category.name,
    })),
  ];

  return (
    <>
      {/* Desktop sidebar */}
      <nav className="hidden w-56 shrink-0 lg:block">
        <h2 className="font-heading text-sm font-semibold tracking-wide text-foreground uppercase">
          Category
        </h2>
        <ul className="mt-4 space-y-1">
          {items.map((item) => {
            const isActive = item.slug
              ? activeSlug === item.slug
              : isAllView;
            return (
              <li key={item.name}>
                <Link
                  href={item.slug ? `/shop?category=${item.slug}` : "/shop"}
                  className={cn(
                    "block rounded-md px-3 py-2 text-sm transition-colors",
                    isActive
                      ? "bg-secondary font-medium text-secondary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile horizontal pills */}
      <nav className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 lg:hidden">
        {items.map((item) => {
          const isActive = activeSlug === item.slug;
          return (
            <Link
              key={item.name}
              href={item.slug ? `/shop?category=${item.slug}` : "/shop"}
              className={cn(
                "shrink-0 rounded-full border px-4 py-1.5 text-sm whitespace-nowrap transition-colors",
                isActive
                  ? "border-secondary bg-secondary text-secondary-foreground"
                  : "border-border text-muted-foreground hover:border-foreground/40",
              )}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
