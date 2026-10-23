import HeroSequence from "@/components/HeroSequence";
import LivingCityMap from "@/components/LivingCityMap";
import MenuPreview from "@/components/MenuPreview";
import VegetarianStory from "@/components/VegetarianStory";
import OrderingOptions from "@/components/OrderingOptions";
import FranchiseSection from "@/components/FranchiseSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen bg-[#17130F] text-[#F6F0E5] selection:bg-[#FFBA12] selection:text-[#17130F]">
      
      {/* 
        1. Hero Image-Sequence Animation Layer:
        - Stays as background layer (z-0)
        - Scroll container height 400vh
        - Responsive desktop/mobile sequence loading
      */}
      <div className="relative z-0">
        <HeroSequence />
      </div>

      {/* 
        Foreground Brand Experience Content:
        - Stacks cleanly over/after the hero (z-10) with opaque solid backgrounds
        - REQUIRED FINAL LANDING PAGE FLOW:
          1. Hero (Desktop/Mobile Sequence)
          2. Living City Map — Bugeese Brand Journey
          3. Pick Your Craving — Menu Preview
          4. Vegetarian Brand Story (100% Vegetarian. Full-On Flavour.)
          5. Two Ways to Get Your Bugeese (Ordering Options)
          6. Franchise Section
          7. Footer
      */}
      <main className="relative z-10 w-full shadow-2xl">
        {/* 2. Living City Map: Bugeese Brand Journey */}
        <LivingCityMap />

        {/* 3. Pick Your Craving: Food Menu Preview */}
        <MenuPreview />

        {/* 4. Vegetarian Brand Story */}
        <VegetarianStory />

        {/* 5. Ordering Options */}
        <OrderingOptions />

        {/* 6. Franchise Section */}
        <FranchiseSection />
      </main>

      {/* 7. Footer */}
      <Footer />
    </div>
  );
}
