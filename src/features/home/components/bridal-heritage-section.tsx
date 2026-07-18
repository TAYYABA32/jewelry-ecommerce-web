import Image from "next/image";

import bridalHeritagePortrait from "@/assets/images/bridal-heritage-portrait.jpg";

export function BridalHeritageSection() {
  return (
    <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
      <div className="relative aspect-4/5 w-full overflow-hidden lg:aspect-3/4">
        <Image
          src={bridalHeritagePortrait}
          alt="A bride in traditional red and gold bridal wear, adorned with heirloom polki jewelry"
          fill
          sizes="(min-width: 1024px) 40vw, 90vw"
          className="object-cover"
        />
      </div>

      <div className="lg:pl-8">
        <h2 className="font-heading text-3xl font-semibold tracking-widest text-foreground uppercase sm:text-4xl">
          The Heritage Pieces
        </h2>
        <p className="mt-6 max-w-md text-muted-foreground">
          Handcrafted validation of traditional luxury, designed to anchor
          your legacy.
        </p>
      </div>
    </section>
  );
}
