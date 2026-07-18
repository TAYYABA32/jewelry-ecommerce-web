import Image from "next/image";

import baratTradition from "@/assets/images/barat-tradition.jpg";
import mehndiDholki from "@/assets/images/mehndi-dholki.jpg";
import walimaLuxe from "@/assets/images/walima-luxe.jpg";

const EDITS = [
  {
    label: "Mehndi & Dholki",
    image: mehndiDholki,
    alt: "A bride in a green and pink Mehndi outfit with henna and marigold details",
  },
  {
    label: "The Barat Tradition",
    image: baratTradition,
    alt: "A bride in a champagne gold Barat outfit with a maroon-accented necklace",
  },
  {
    label: "The Walima Luxe",
    image: walimaLuxe,
    alt: "A woman in a sage green outfit admiring fine jewelry",
  },
] as const;

export function OccasionEditsSection() {
  return (
    <section className="w-full bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-sm font-semibold tracking-widest text-foreground uppercase">
          The Occasion Edits
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {EDITS.map((edit) => (
            <div
              key={edit.label}
              className="group relative flex aspect-4/5 items-end overflow-hidden rounded-lg"
            >
              <Image
                src={edit.image}
                alt={edit.alt}
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
              <span className="relative p-5 text-sm font-medium tracking-widest text-white uppercase">
                {edit.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
