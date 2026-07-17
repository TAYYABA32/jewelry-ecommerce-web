"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative flex h-[85vh] min-h-[560px] items-center overflow-hidden bg-secondary">
      <Image
        src="https://images.unsplash.com/photo-1665159882377-385d68d2bdff?w=1800&q=80&auto=format&fit=crop"
        alt="Diamond chandelier earrings"
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
            <Button
              size="lg"
              render={<Link href="/shop">Shop Now</Link>}
            />
            <Button
              size="lg"
              variant="outline"
              className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
              render={<Link href="/categories">Explore Collections</Link>}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
