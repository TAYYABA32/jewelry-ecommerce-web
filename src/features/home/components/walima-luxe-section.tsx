import Image from "next/image";

import walimaLuxeImage from "@/assets/images/walima-luxe.jpg";

export function WalimaLuxeSection() {
  return (
    <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 bg-white px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
      <div className="relative aspect-4/5 w-full overflow-hidden lg:aspect-3/4">
        <Image
          src={walimaLuxeImage}
          alt="A woman in a sage green outfit admiring fine jewelry for her Walima reception look"
          fill
          sizes="(min-width: 1024px) 40vw, 90vw"
          className="object-cover"
        />
      </div>

      <div className="lg:pl-8">
        <p className="text-sm font-medium tracking-widest text-primary uppercase">
          The Post-Wedding Essentials
        </p>
        <h2 className="mt-4 font-heading text-3xl font-semibold text-foreground sm:text-4xl">
          The Walima Luxe
        </h2>
        <p className="mt-6 max-w-lg leading-relaxed text-muted-foreground">
          Designed for the modern bride&apos;s final curtain call, our
          Walima collection shifts from heavy traditional gold to
          understated, high-contrast sophistication. We hand-select premium
          cubic zirconia, fine silver plating, and delicate pearl drop
          details that perfectly complement contemporary pastel gowns and
          mint-toned ensembles. Each piece is meticulously checked for stone
          alignment and absolute comfort, ensuring a lightweight yet regal
          presence. This is fine artificial craftsmanship curated for the
          discerning woman who demands pristine brilliance, effortless
          grace, and an unforgettable legacy for her reception look.
        </p>
      </div>
    </section>
  );
}
