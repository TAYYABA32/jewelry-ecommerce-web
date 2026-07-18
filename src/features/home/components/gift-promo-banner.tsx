import Image from "next/image";

import giftPromoImage from "@/assets/images/gift-promo.jpg";

export function GiftPromoBanner() {
  return (
    <section className="relative isolate flex h-[70vh] min-h-[420px] w-full items-center overflow-hidden">
      <Image
        src={giftPromoImage}
        alt="A woman admiring gold jewelry pieces beside wrapped gift boxes"
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/10 to-transparent" />

      <div className="relative px-6 sm:px-12 lg:px-20">
        <p className="font-heading text-3xl tracking-widest text-[#FAF6EF] italic [text-shadow:0_2px_16px_rgb(0_0_0_/_35%)] sm:text-4xl">
          Gifts That Last
        </p>
        <h2 className="mt-3 font-heading text-4xl font-semibold tracking-wide text-[#FAF6EF] [text-shadow:0_2px_16px_rgb(0_0_0_/_35%)] sm:text-5xl">
          On Order Above
        </h2>
        <div className="mt-6 inline-flex items-center justify-center bg-[#D4AF37] px-5 py-2.5">
          <span className="text-base font-bold tracking-wide text-white sm:text-lg">
            2500. Only
          </span>
        </div>
      </div>
    </section>
  );
}
