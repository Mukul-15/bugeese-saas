import Link from "next/link";
import Image from "next/image";
import { MENU_PREVIEW_ITEMS } from "@/data/brandData";

export default function MenuPreview() {
  return (
    <section
      id="menu-preview"
      className="relative z-10 w-full bg-[#FFBA12] text-[#17130F] px-4 py-20 sm:px-8 sm:py-28 md:py-36"
    >
      <div className="mx-auto max-w-7xl">
        {/* Top Header */}
        <div className="text-center mb-14 sm:mb-20">
          <span className="inline-block text-xs sm:text-sm font-black tracking-widest uppercase bg-[#17130F] text-[#FFBA12] px-3.5 py-1 rounded-full mb-4">
            Craving Discovery
          </span>
          <h2 className="font-condensed text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight text-[#17130F] leading-none">
            Pick Your Craving
          </h2>
          <p className="mt-4 text-base sm:text-lg md:text-xl font-medium text-[#17130F]/80 max-w-2xl mx-auto">
            100% pure vegetarian. Handcrafted recipes, molten cheese layers, and crunchy golden bites.
          </p>
        </div>

        {/* 3 Food Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {MENU_PREVIEW_ITEMS.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col overflow-hidden rounded-3xl bg-[#F6F0E5] shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Food Image Container */}
              <div className="relative aspect-4/3 w-full overflow-hidden bg-black/10">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#17130F]/80 px-3 py-1 text-xs font-bold text-white backdrop-blur-xs">
                    <span className="h-2 w-2 rounded-full bg-[#10b981]" />
                    {item.badge}
                  </span>
                </div>
              </div>

              {/* Card Body - Warm Cream */}
              <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
                <div>
                  <h3 className="font-condensed text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#D9251B] mb-2">
                    {item.category}
                  </h3>
                  <p className="text-sm sm:text-base font-medium text-[#17130F]/80 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#17130F]/10 flex items-center justify-between">
                  <span className="text-xs uppercase font-bold tracking-wider text-[#17130F]/60">
                    Pure Vegetarian
                  </span>
                  <Link
                    href="/menu"
                    className="inline-flex items-center text-sm font-bold text-[#D9251B] group-hover:translate-x-1 transition-transform duration-200"
                  >
                    View Items &rarr;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Big Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <Link
            href="/menu"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-[#17130F] px-10 py-5 text-lg font-black uppercase tracking-wider text-[#F6F0E5] shadow-lg transition-transform duration-200 hover:scale-105 hover:bg-black focus:outline-hidden focus:ring-4 focus:ring-black/20"
          >
            Browse the Full Menu
          </Link>
        </div>
      </div>
    </section>
  );
}
