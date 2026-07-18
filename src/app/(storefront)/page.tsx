import { BestSellers } from "@/features/home/components/best-sellers";
import { FeaturedCollections } from "@/features/home/components/featured-collections";
import { FlatlayCraftsmanshipBreak } from "@/features/home/components/flatlay-craftsmanship-break";
import { GiftPromoBanner } from "@/features/home/components/gift-promo-banner";
import { HeroSection } from "@/features/home/components/hero-section";
import { OccasionEditsSection } from "@/features/home/components/occasion-edits-section";
import { WalimaLuxeSection } from "@/features/home/components/walima-luxe-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WalimaLuxeSection />
      <FeaturedCollections />
      <FlatlayCraftsmanshipBreak />
      <BestSellers />
      <GiftPromoBanner />
      <OccasionEditsSection />
    </>
  );
}
