import { BestSellers } from "@/features/home/components/best-sellers";
import { FeaturedCollections } from "@/features/home/components/featured-collections";
import { HeroSection } from "@/features/home/components/hero-section";
import { LuxuryBanners } from "@/features/home/components/luxury-banners";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedCollections />
      <BestSellers />
      <LuxuryBanners />
    </>
  );
}
