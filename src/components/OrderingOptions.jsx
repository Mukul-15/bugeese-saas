import Link from "next/link";
import { BUGEESE_CONFIG } from "@/data/brandData";

export default function OrderingOptions() {
  return (
    <section
      id="ordering-section"
      className="relative z-10 w-full bg-[#17130F] text-[#F6F0E5] px-4 py-20 sm:px-8 sm:py-28 md:py-36 border-t border-white/10"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-14 sm:mb-20 text-center md:text-left">
          <span className="inline-block text-xs sm:text-sm font-black tracking-widest uppercase text-[#FFBA12] mb-3">
            Instant Satisfaction
          </span>
          <h2 className="font-condensed text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-none">
            Two Ways to Get Your Bugeese
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#F6F0E5]/70 max-w-xl">
            Whether you&apos;re dining at our outlets or enjoying a feast on your couch, your next bite is just moments away.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: 2 Big Info Panels */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Panel A: AT THE OUTLET */}
            <div className="rounded-3xl bg-[#2B241D] p-8 sm:p-10 border border-white/5 shadow-xl transition-all hover:border-[#FFBA12]/30">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black uppercase tracking-widest text-[#FFBA12]">
                  Dine-In & Takeaway
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-white/60">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" /> Open Now
                </span>
              </div>
              <h3 className="font-condensed text-3xl sm:text-4xl font-black uppercase text-white mb-3">
                At The Outlet
              </h3>
              <p className="text-base text-[#F6F0E5]/80 mb-6 leading-relaxed">
                Visit your nearest Bugeese outlet, explore the menu, and enjoy your favourites in person with piping-hot crunch and friendly energy.
              </p>
              <div className="flex flex-wrap gap-4 items-center">
                <Link
                  href="/menu"
                  className="inline-flex items-center justify-center rounded-full bg-[#FFBA12] px-8 py-3.5 text-sm sm:text-base font-black uppercase tracking-wider text-[#17130F] shadow-md transition-transform duration-200 hover:scale-105 hover:bg-amber-400"
                >
                  Explore the Menu
                </Link>
                <a
                  href="#outlets"
                  className="text-sm font-bold text-white/80 hover:text-white underline underline-offset-4"
                >
                  View Outlet Locations
                </a>
              </div>
            </div>

            {/* Panel B: AT HOME */}
            <div className="rounded-3xl bg-[#2B241D] p-8 sm:p-10 border border-white/5 shadow-xl transition-all hover:border-[#D9251B]/30">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black uppercase tracking-widest text-[#D9251B]">
                  Doorstep Delivery
                </span>
                <span className="text-xs text-white/60">Fast & Hot</span>
              </div>
              <h3 className="font-condensed text-3xl sm:text-4xl font-black uppercase text-white mb-3">
                At Home
              </h3>
              <p className="text-base text-[#F6F0E5]/80 mb-6 leading-relaxed">
                Craving Bugeese at home? Choose your preferred delivery platform and order your favourites straight to your doorstep.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Zomato Button */}
                <a
                  href={BUGEESE_CONFIG.ordering.zomato.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#E23744] px-7 py-3.5 text-sm sm:text-base font-black uppercase tracking-wider text-white shadow-md transition-transform duration-200 hover:scale-105 hover:bg-[#d02431]"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2V7h2v10z" />
                  </svg>
                  Order on Zomato
                </a>

                {/* Swiggy Button */}
                <a
                  href={BUGEESE_CONFIG.ordering.swiggy.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FC8019] px-7 py-3.5 text-sm sm:text-base font-black uppercase tracking-wider text-white shadow-md transition-transform duration-200 hover:scale-105 hover:bg-[#e76e0a]"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm1 14.5c0 .3-.2.5-.5.5s-.5-.2-.5-.5v-4c0-.3.2-.5.5-.5s.5.2.5.5v4zm0-6.5c0 .3-.2.5-.5.5s-.5-.2-.5-.5V8c0-.3.2-.5.5-.5s.5.2.5.5v1.5z" />
                  </svg>
                  Order on Swiggy
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Phone Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm rounded-[42px] bg-[#120F0D] p-3.5 shadow-2xl ring-1 ring-white/20">
              
              {/* Outer Phone Shell & Notch */}
              <div className="relative rounded-[34px] bg-[#F6F0E5] text-[#17130F] p-5 overflow-hidden shadow-inner flex flex-col justify-between min-h-[500px]">
                
                {/* Speaker Bar & Status */}
                <div>
                  <div className="mx-auto w-24 h-4 rounded-full bg-[#17130F]/15 mb-4 flex items-center justify-center">
                    <div className="w-10 h-1 rounded-full bg-black/30" />
                  </div>

                  {/* App Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#17130F]/10">
                    <div>
                      <span className="text-[10px] font-black tracking-widest uppercase text-[#D9251B] block">Express Order</span>
                      <h4 className="font-condensed text-xl font-black uppercase leading-tight">Bugeese Vijay Nagar</h4>
                    </div>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">Dine-In #04</span>
                  </div>

                  {/* Sample Items in Checkout */}
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between bg-white p-3 rounded-xl shadow-xs">
                      <div>
                        <div className="text-xs font-bold text-[#17130F]">Bugs Americano Cheese Burger</div>
                        <div className="text-[10px] text-[#17130F]/60">1x Regular &bull; Extra Melt</div>
                      </div>
                      <span className="text-xs font-bold text-[#D9251B]">₹149</span>
                    </div>

                    <div className="flex items-center justify-between bg-white p-3 rounded-xl shadow-xs">
                      <div>
                        <div className="text-xs font-bold text-[#17130F]">Peri Peri Cheese Fries</div>
                        <div className="text-[10px] text-[#17130F]/60">1x Large Crispy</div>
                      </div>
                      <span className="text-xs font-bold text-[#D9251B]">₹99</span>
                    </div>

                    <div className="flex items-center justify-between bg-white p-3 rounded-xl shadow-xs">
                      <div>
                        <div className="text-xs font-bold text-[#17130F]">Belgian Chocolate Shake</div>
                        <div className="text-[10px] text-[#17130F]/60">1x Thick Cream</div>
                      </div>
                      <span className="text-xs font-bold text-[#D9251B]">₹119</span>
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div className="mt-4 rounded-xl bg-[#FFBA12]/20 p-3 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#17130F]">Payment Mode</span>
                    <span className="text-xs font-black uppercase text-[#17130F]">UPI / Counter Pay</span>
                  </div>
                </div>

                {/* Bottom Checkout Total & Action */}
                <div className="pt-4 border-t border-[#17130F]/10 mt-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-[#17130F]/70">Bill Total</span>
                    <span className="text-lg font-black text-[#17130F]">₹367</span>
                  </div>

                  <button
                    type="button"
                    className="w-full rounded-2xl bg-[#D9251B] py-3.5 text-center text-sm font-black uppercase tracking-wider text-white shadow-md hover:bg-[#b01c13] transition-colors"
                  >
                    Place Order &bull; Send to Kitchen
                  </button>
                  <p className="mt-2 text-center text-[10px] text-[#17130F]/50">
                    Live checkout preview. Connects to outlet pos.
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
