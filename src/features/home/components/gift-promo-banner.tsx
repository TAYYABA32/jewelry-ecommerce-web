import Image from "next/image";

import bridalCollageImage from "@/assets/images/bridal-collage.jpg";

export function GiftPromoBanner() {
  return (
    <section className="relative isolate flex h-[70vh] min-h-[420px] w-full items-center overflow-hidden">
      <Image
        src={bridalCollageImage}
        alt="A collage of bridal jewelry — a bride in traditional dress, kundan necklace, and gold earrings and bangles"
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />

      <div className="relative px-6 sm:px-12 lg:px-20">
        <p className="font-heading text-3xl tracking-widest text-white italic sm:text-4xl">
          Gifts That Last
        </p>
        <h2 className="mt-3 font-heading text-4xl font-semibold tracking-wide text-white sm:text-5xl">
          On Order Above
        </h2>
        <div className="mt-6 inline-flex items-center justify-center bg-primary px-5 py-2.5">
          <span className="text-base font-bold tracking-wide text-white sm:text-lg">
            2500. Only
          </span>
        </div>
      </div>
    </section>
  );
}
