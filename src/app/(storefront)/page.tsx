import { BestSellers } from "@/features/home/components/best-sellers";
import { BridalHeritageSection } from "@/features/home/components/bridal-heritage-section";
import { FeaturedCollections } from "@/features/home/components/featured-collections";
import { FlatlayCraftsmanshipBreak } from "@/features/home/components/flatlay-craftsmanship-break";
import { GiftPromoBanner } from "@/features/home/components/gift-promo-banner";
import { HeroSection } from "@/features/home/components/hero-section";
import { OccasionEditsSection } from "@/features/home/components/occasion-edits-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BridalHeritageSection />
      <FeaturedCollections />
      <FlatlayCraftsmanshipBreak />
      <BestSellers />
      <GiftPromoBanner />
      <OccasionEditsSection />
    </>
  );
}
