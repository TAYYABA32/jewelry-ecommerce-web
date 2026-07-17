import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
  description:
    "The House of Aurelia — preserving royal craftsmanship, handcrafted gold, and polki artistry.",
};

export default function AboutPage() {
  return (
    <div>
      <section className="relative flex h-[50vh] min-h-[360px] items-center justify-center overflow-hidden bg-secondary">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(201,162,39,0.15),transparent_60%)]" />
        <div className="relative text-center">
          <p className="text-sm font-medium tracking-[0.2em] text-primary uppercase">
            Est. in Tradition
          </p>
          <h1 className="mt-4 font-heading text-4xl font-semibold text-white sm:text-5xl lg:text-6xl">
            The House of Aurelia
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-sm font-medium tracking-[0.2em] text-primary uppercase">
              Our Heritage
            </p>
            <h2 className="mt-4 font-heading text-3xl font-semibold text-foreground sm:text-4xl">
              Ancient Craft, Carried Forward
            </h2>
            <div className="mt-6 space-y-5 text-muted-foreground">
              <p>
                Aurelia was founded on a simple conviction: that the
                goldsmithing traditions passed down through generations of
                royal ateliers deserve to be preserved, not diluted. Every
                piece that bears our name begins with techniques practiced
                for centuries — hand-forged gold, meticulously set polki, and
                stone work that owes nothing to shortcuts.
              </p>
              <p>
                Our karigars — master craftsmen trained in the same
                workshops that once served maharajas and begums — spend
                weeks, sometimes months, on a single piece. Uncut diamonds
                are set by hand into gold, exactly as they were when polki
                first adorned royal courts. Nothing is cast in a hurry;
                nothing leaves our atelier unfinished.
              </p>
              <p>
                We built Aurelia for the bride who wants her jewelry to
                carry weight — not just in gold, but in history. Each
                heirloom we create is designed to be worn once in
                celebration, and handed down for generations after.
              </p>
            </div>
          </div>

          <div className="relative aspect-4/5 overflow-hidden rounded-2xl sm:aspect-3/4">
            <Image
              src="https://images.unsplash.com/photo-1609619742069-f5e18afeef17?w=1000&q=80&auto=format&fit=crop"
              alt="A goldsmith hand-soldering a piece of fine jewelry in a traditional workshop"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-16 text-center sm:grid-cols-3 sm:px-6 lg:px-8">
          <div>
            <p className="font-heading text-4xl font-semibold text-primary">
              25+
            </p>
            <p className="mt-2 text-sm tracking-wide text-muted-foreground uppercase">
              Years of Craftsmanship
            </p>
          </div>
          <div>
            <p className="font-heading text-4xl font-semibold text-primary">
              100%
            </p>
            <p className="mt-2 text-sm tracking-wide text-muted-foreground uppercase">
              Hand-Finished Pieces
            </p>
          </div>
          <div>
            <p className="font-heading text-4xl font-semibold text-primary">
              1,000+
            </p>
            <p className="mt-2 text-sm tracking-wide text-muted-foreground uppercase">
              Brides Adorned
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
