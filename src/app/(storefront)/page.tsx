import { BestSellers } from "@/features/home/components/best-sellers";
import { FeaturedCollections } from "@/features/home/components/featured-collections";
import { GiftPromoBanner } from "@/features/home/components/gift-promo-banner";
import { HeroSection } from "@/features/home/components/hero-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedCollections />
      <BestSellers />
      <GiftPromoBanner />
    </>
  );
}
