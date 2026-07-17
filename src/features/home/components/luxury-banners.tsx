import Image from "next/image";
import Link from "next/link";

const BANNERS = [
  {
    title: "The Bridal Edit",
    subtitle: "Engagement rings and wedding bands, made to be treasured.",
    href: "/shop?occasion=engagement",
    cta: "Shop Bridal",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&q=80&auto=format&fit=crop",
  },
  {
    title: "Gifts That Last",
    subtitle: "Considered pieces for the moments worth marking.",
    href: "/shop?filter=best-sellers",
    cta: "Shop Gifts",
    image:
      "https://images.unsplash.com/photo-1545844568-98bb15133ec0?w=1200&q=80&auto=format&fit=crop",
  },
] as const;

export function LuxuryBanners() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-6 sm:grid-cols-2">
        {BANNERS.map((banner) => (
          <Link
            key={banner.title}
            href={banner.href}
            className="group relative flex aspect-4/5 items-end overflow-hidden rounded-2xl sm:aspect-3/4 sm:rounded-3xl"
          >
            <Image
              src={banner.image}
              alt={banner.title}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="relative p-8">
              <h3 className="font-heading text-2xl font-semibold text-white">
                {banner.title}
              </h3>
              <p className="mt-2 max-w-xs text-sm text-white/80">
                {banner.subtitle}
              </p>
              <span className="mt-4 inline-block border-b border-primary text-sm font-medium text-primary">
                {banner.cta}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
