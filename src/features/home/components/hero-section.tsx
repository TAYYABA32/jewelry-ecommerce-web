"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
      <div className="relative flex h-[80vh] min-h-[520px] items-center overflow-hidden rounded-2xl bg-secondary sm:rounded-3xl">
        <Image
          src="/images/hero-bridal.jpg"
          alt="A traditional South Asian bride wearing heavy red and gold bridal jewelry"
          fill
          priority
          sizes="(min-width: 1280px) 1280px, 100vw"
          className="object-cover object-[50%_38%]"
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
              The Aurelia Collection
            </p>
            <h1 className="mt-4 font-heading text-4xl font-semibold text-white sm:text-5xl lg:text-6xl">
              Timeless Fine Jewelry, Crafted to Last
            </h1>
            <p className="mt-4 max-w-md text-white/80">
              Ethically sourced diamonds and precious metals, handcrafted into
              pieces designed to be worn for a lifetime.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg" render={<Link href="/shop">Shop Now</Link>} />
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
                render={<Link href="/categories">Explore Collections</Link>}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
