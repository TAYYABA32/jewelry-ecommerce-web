import Image from "next/image";

import giftPromoImage from "@/assets/images/gift-promo.jpg";
import metalFinishStrip from "@/assets/images/metal-finish-strip.jpg";

export function FlatlayCraftsmanshipBreak() {
  return (
    <section className="grid w-full grid-cols-1 sm:grid-cols-2">
      <div className="relative h-72 w-full sm:h-96">
        <Image
          src={giftPromoImage}
          alt="An organized curation of gold jewelry pieces beside wrapped gift boxes"
          fill
          sizes="(min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="relative h-72 w-full sm:h-96">
        <Image
          src={metalFinishStrip}
          alt="A four-panel strip of jewelry sets in antique gold, gold, silver, and rose gold finishes"
          fill
          sizes="(min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
