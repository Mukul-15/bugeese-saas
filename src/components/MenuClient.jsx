"use client";

import { useEffect } from "react";
import Link from "next/link";
import { FULL_MENU_DATA, BUGEESE_CONFIG } from "@/data/brandData";
import { useCart } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";

export default function MenuClient() {
  const { totalCount, openDrawer, addItem, toastMessage } = useCart();

  useEffect(() => {
    // Ensure the page always begins at the top when navigating to Menu
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return (
    <div className="min-h-screen bg-[#17130F] text-[#F6F0E5] relative">
      {/* ── Top Navigation Bar with Cart Button (Exclusive to Menu Page) ── */}
      <header className="sticky top-0 z-40 w-full bg-[#17130F]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-condensed text-3xl font-black uppercase tracking-tight text-white">
              BUGEESE<span className="text-[#D9251B]">.</span>
            </span>
          </Link>

          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/"
              className="text-xs sm:text-sm font-bold text-white/80 hover:text-[#FFBA12] transition-colors"
            >
              &larr; <span className="hidden sm:inline">Back to Experience</span><span className="sm:hidden">Home</span>
            </Link>

            {/* Direct Delivery Platform Links */}
            <a
              href={BUGEESE_CONFIG.ordering.zomato.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex rounded-full border border-white/20 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10"
            >
              Zomato
            </a>
            <a
              href={BUGEESE_CONFIG.ordering.swiggy.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex rounded-full border border-white/20 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10"
            >
              Swiggy
            </a>

            {/* Cart Trigger Button */}
            <button
              type="button"
              onClick={openDrawer}
              aria-label={`Open shopping cart with ${totalCount} items`}
              className="flex items-center gap-2.5 rounded-full bg-[#FFBA12] px-4 sm:px-5 py-2 text-xs sm:text-sm font-black uppercase tracking-wider text-[#17130F] shadow-md hover:bg-amber-400 hover:scale-105 transition-all cursor-pointer"
            >
              <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span>Cart</span>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#C8201A] text-[11px] font-black text-white">
                {totalCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Confirmation Toast ── */}
      {toastMessage && (
        <div className="fixed top-20 right-4 sm:top-24 sm:right-6 z-[100] max-w-[90vw] rounded-2xl bg-[#C8201A] px-5 py-3.5 text-xs sm:text-sm font-black uppercase tracking-wider text-white shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200 border border-white/20 flex items-center gap-2.5 backdrop-blur-md">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-[#C8201A] text-xs font-black">✓</span>
          <span className="truncate">{toastMessage}</span>
        </div>
      )}

      {/* ── Cart Drawer Component ── */}
      <CartDrawer />

      {/* ── Menu Banner ── */}
      <div className="bg-[#FFBA12] text-[#17130F] px-4 py-14 sm:px-8 sm:py-20 text-center">
        <div className="mx-auto max-w-4xl">
          <span className="inline-block text-xs font-black tracking-widest uppercase bg-[#17130F] text-[#FFBA12] px-3.5 py-1 rounded-full mb-3">
            100% Pure Vegetarian
          </span>
          <h1 className="font-condensed text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight leading-none">
            The Bugeese Menu
          </h1>
          <p className="mt-4 text-base sm:text-lg font-medium text-[#17130F]/80 max-w-xl mx-auto">
            From our legendary Bugs Americano Cheese Burger to artisan toasted paninis, loaded fries, and thick shakes. Add items to your cart below.
          </p>
        </div>
      </div>

      {/* ── Menu Categories Grid ── */}
      <main className="mx-auto max-w-7xl px-4 sm:px-8 py-14 sm:py-20">
        <div className="space-y-16">
          {FULL_MENU_DATA.map((section, idx) => (
            <div key={idx} className="border-b border-white/10 pb-16 last:border-0">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-condensed text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#FFBA12]">
                  {section.category}
                </h2>
                <span className="text-xs uppercase font-bold text-white/50">
                  {section.items.length} Items
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col justify-between rounded-2xl bg-[#2B241D] p-6 border border-white/5 shadow-md hover:border-[#FFBA12]/30 transition-all group"
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-black uppercase tracking-wider text-[#D9251B] bg-[#D9251B]/15 px-2.5 py-0.5 rounded-full">
                          {item.tag}
                        </span>
                        <span className="flex items-center justify-center w-4 h-4 rounded-xs border border-[#10b981] p-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                        </span>
                      </div>

                      {/* Product Name */}
                      <h3 className="font-condensed text-2xl font-black uppercase text-white mb-2 group-hover:text-[#FFBA12] transition-colors">
                        {item.name}
                      </h3>

                      {/* Product Description */}
                      <p className="text-sm text-[#F6F0E5]/70 leading-relaxed mb-4">
                        {item.desc}
                      </p>
                    </div>

                    {/* Bottom Pricing & Add to Cart Action */}
                    <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-white/50 block font-bold uppercase tracking-wider">Price</span>
                        <span className="font-condensed text-2xl font-black text-white">
                          ₹{item.price}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => addItem(item)}
                        aria-label={`Add ${item.name} to cart for ₹${item.price}`}
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#C8201A] px-5 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-md hover:bg-[#b01c13] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                      >
                        <span className="text-base leading-none">+</span>
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Delivery Platforms Callout */}
        <div className="mt-16 rounded-3xl bg-linear-to-r from-[#D9251B] to-[#b01c13] p-8 sm:p-12 text-center text-white shadow-2xl">
          <h3 className="font-condensed text-3xl sm:text-5xl font-black uppercase">
            Order for Instant Delivery
          </h3>
          <p className="mt-2 text-base text-white/90 max-w-lg mx-auto">
            Prefer food delivery apps? Order directly from Bugeese Jabalpur outlets on Swiggy or Zomato.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a
              href={BUGEESE_CONFIG.ordering.zomato.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white px-7 py-3.5 text-sm font-black uppercase tracking-wider text-[#17130F] shadow-lg hover:bg-gray-100 transition-transform hover:scale-105"
            >
              Order on Zomato
            </a>
            <a
              href={BUGEESE_CONFIG.ordering.swiggy.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#17130F] px-7 py-3.5 text-sm font-black uppercase tracking-wider text-white shadow-lg hover:bg-black transition-transform hover:scale-105"
            >
              Order on Swiggy
            </a>
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-white/10 py-10 px-4 text-center text-xs text-white/50">
        <p>© 2026 Bugeese Fast Casual. 100% Pure Vegetarian Brand.</p>
        <div className="mt-2 flex justify-center gap-4">
          <Link href="/" className="hover:text-white">Home Experience</Link>
          <a href={`mailto:${BUGEESE_CONFIG.contact.email}`} className="hover:text-white">Franchise Inquiry</a>
        </div>
      </footer>
    </div>
  );
}
