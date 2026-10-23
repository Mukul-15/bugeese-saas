import Image from "next/image";
import { BUGEESE_CONFIG } from "@/data/brandData";

export default function FranchiseSection() {
  return (
    <section
      id="franchise"
      className="relative z-10 w-full bg-[#120F0D] text-[#F6F0E5] px-4 py-24 sm:px-8 sm:py-32 border-t border-[#FFBA12]/20 overflow-hidden"
    >
      {/* Decorative Brand Accent Background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-bl from-[#FFBA12]/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-7xl">
        <div className="rounded-[36px] bg-[#2B241D]/90 border border-white/10 p-8 sm:p-14 lg:p-20 shadow-2xl backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7">
              <span className="inline-block text-xs sm:text-sm font-black tracking-widest uppercase bg-[#FFBA12] text-[#17130F] px-3.5 py-1 rounded-full mb-6">
                Franchise Partnership
              </span>

              <h2 className="font-condensed text-3xl sm:text-5xl lg:text-7xl font-black uppercase tracking-normal sm:tracking-tight text-white leading-tight sm:leading-[0.95] mb-6">
                Bring the Bugeese Experience to Your City.
              </h2>

              <p className="text-base sm:text-lg text-[#F6F0E5]/80 leading-relaxed mb-8">
                Join India&apos;s fastest growing 100% pure vegetarian fast-casual burger brand. Built on chef-driven culinary standards, highly streamlined kitchen operations, and dedicated brand support, Bugeese offers high-potential franchise formats tailored for high-density food hubs.
              </p>

              {/* Franchise Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-10 py-6 border-y border-white/10">
                <div>
                  <span className="text-xs uppercase text-white/50 block font-bold">Concept</span>
                  <span className="text-base sm:text-lg font-black text-[#FFBA12]">100% Pure Veg QSR</span>
                </div>
                <div>
                  <span className="text-xs uppercase text-white/50 block font-bold">Formats</span>
                  <span className="text-base sm:text-lg font-black text-white">Dine-In / Kiosk / Cloud</span>
                </div>
                <div>
                  <span className="text-xs uppercase text-white/50 block font-bold">Support</span>
                  <span className="text-base sm:text-lg font-black text-emerald-400">Full SOPs & Supply</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                <a
                  href={`mailto:${BUGEESE_CONFIG.franchise.inquiryEmail}?subject=Bugeese%20Franchise%20Inquiry`}
                  className="inline-flex items-center justify-center rounded-full bg-[#FFBA12] px-8 py-4 text-base font-black uppercase tracking-wider text-[#17130F] shadow-lg transition-transform duration-200 hover:scale-105 hover:bg-amber-400"
                >
                  Explore Franchise Opportunities
                </a>
                <a
                  href={`tel:${BUGEESE_CONFIG.franchise.inquiryPhone}`}
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-4 text-base font-bold text-white hover:bg-white/10 transition-colors"
                >
                  Call +91 93263 40687
                </a>
              </div>
            </div>

            {/* Right Visual Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-4/3 sm:aspect-4/5 rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-[#17130F]">
                <Image
                  src="/food/franchise.jpg"
                  alt="Bugeese restaurant franchise kitchen and dining experience"
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-contain sm:object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
                
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 p-4 sm:p-5 rounded-2xl bg-[#17130F]/90 backdrop-blur-md border border-white/10">
                  <span className="text-xs font-black uppercase tracking-wider text-[#FFBA12] block">High Demand</span>
                  <p className="text-xs sm:text-sm font-bold text-white mt-1">
                    Fast-growing presence across Madhya Pradesh with national expansion underway.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
