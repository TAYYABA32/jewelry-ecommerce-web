"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import giftPromoImage from "@/assets/images/gift-promo.jpg";

export function HeroSection() {
  return (
    <section className="relative flex h-[80vh] min-h-[520px] w-full items-center overflow-hidden">
      <Image
        src={giftPromoImage}
        alt="A woman admiring gold jewelry pieces beside wrapped gift boxes"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

      <div className="relative px-6 sm:px-10 lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-xl"
        >
          <p className="text-sm font-medium tracking-[0.2em] text-primary uppercase">
            The Bridal Heritage
          </p>
          <h1 className="mt-4 font-heading text-4xl font-semibold text-white sm:text-5xl lg:text-6xl">
            Regal Masterpieces for Your Forever Day
          </h1>
          <p className="mt-4 max-w-md text-white/80">
            Handcrafted gold, polki, and premium bridal masterpieces
            designed to carry forward the rich traditions of royal
            craftsmanship.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button
              size="lg"
              render={<Link href="/shop?occasion=engagement">Explore Bridal</Link>}
            />
            <Button
              size="lg"
              variant="outline"
              className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
              render={<Link href="/contact">Book Consultation</Link>}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
