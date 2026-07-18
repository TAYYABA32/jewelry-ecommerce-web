"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import bridalCollageImage from "@/assets/images/bridal-collage.jpg";

export function HeroSection() {
  return (
    <section className="relative flex h-[80vh] min-h-[520px] w-full items-center overflow-hidden">
      <Image
        src={bridalCollageImage}
        alt="A collage of bridal jewelry — a bride in traditional dress, kundan necklace, and gold earrings and bangles"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/8 to-transparent" />

      <div className="relative px-6 sm:px-10 lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-xl"
        >
          <p className="font-heading text-sm font-semibold tracking-widest text-[#D4AF37] uppercase">
            The Bridal Heritage
          </p>
          <h1 className="mt-4 font-heading text-4xl font-semibold text-[#FAF6EF] [text-shadow:0_2px_16px_rgb(0_0_0_/_45%)] sm:text-5xl lg:text-6xl">
            Regal Masterpieces for Your Forever Day
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-[#E4E0D8]">
            Handcrafted gold, polki, and premium bridal masterpieces
            designed to carry forward the rich traditions of royal
            craftsmanship.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button
              size="lg"
              className="bg-[#D4AF37] text-[#111111] hover:bg-[#c9a227]"
              render={<Link href="/shop?occasion=engagement">Explore Bridal</Link>}
            />
            <Button
              size="lg"
              variant="outline"
              className="border border-white/60 bg-transparent text-white transition-colors duration-300 hover:bg-white/15 hover:text-white"
              render={<Link href="/contact">Book Consultation</Link>}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
