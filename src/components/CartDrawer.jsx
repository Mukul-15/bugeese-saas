"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const router = useRouter();
  const {
    items,
    totalCount,
    subtotal,
    isDrawerOpen,
    closeDrawer,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isDrawerOpen) {
        closeDrawer();
      }
    };
    if (isDrawerOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen, closeDrawer]);

  const handleProceedToCheckout = () => {
    if (items.length === 0) return;
    closeDrawer();
    router.push("/checkout");
  };

  const handleClearConfirmed = () => {
    clearCart();
    setShowClearConfirm(false);
  };

  if (!isDrawerOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-title"
    >
      {/* Dimmed Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div
        className="relative z-10 flex h-full w-full max-w-md flex-col bg-[#17130F] text-[#F6F0E5] shadow-2xl border-l border-white/10 animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5 bg-[#1B1A17]">
          <div className="flex items-center gap-3">
            <h2
              id="cart-title"
              className="font-condensed text-3xl font-black uppercase tracking-tight text-white"
            >
              Your Order
            </h2>
            <span className="rounded-full bg-[#FFBA12] px-2.5 py-0.5 text-xs font-black text-[#17130F]">
              {totalCount} {totalCount === 1 ? "Item" : "Items"}
            </span>
          </div>

          <button
            type="button"
            onClick={closeDrawer}
            aria-label="Close shopping cart"
            className="rounded-full p-2 text-white/70 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
          >
            <svg className="w-6 h-6 stroke-current stroke-2" viewBox="0 0 24 24" fill="none">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content Area */}
        {items.length === 0 ? (
          /* Empty State */
          <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#2B241D] text-4xl mb-4 border border-white/5">
              🍔
            </div>
            <h3 className="font-condensed text-2xl font-black uppercase text-white mb-2">
              Your cart is looking a little hungry.
            </h3>
            <p className="text-sm text-[#F6F0E5]/70 max-w-xs mb-8">
              Explore our chef-crafted 100% pure vegetarian burgers, crispy sides, and thick shakes.
            </p>
            <button
              type="button"
              onClick={closeDrawer}
              className="rounded-full bg-[#FFBA12] px-7 py-3 text-sm font-black uppercase tracking-wider text-[#17130F] shadow-lg hover:bg-amber-400 transition-transform hover:scale-105 cursor-pointer"
            >
              Continue Browsing Menu
            </button>
          </div>
        ) : (
          /* Cart Items List */
          <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-white/5">
            {items.map((item) => (
              <div key={item.id} className="pt-4 first:pt-0 flex gap-4 items-center">
                {/* Thumbnail */}
                <div className="relative h-18 w-18 shrink-0 overflow-hidden rounded-xl bg-[#2B241D] border border-white/10">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="72px"
                    className="object-cover"
                  />
                </div>

                {/* Info & Quantity */}
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-bold text-white line-clamp-1">
                        {item.name}
                      </h4>
                      <p className="text-xs text-[#FFBA12] font-semibold mt-0.5">
                        ₹{item.price} each
                      </p>
                    </div>

                    {/* Remove Item Button */}
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      aria-label={`Remove ${item.name} from cart`}
                      className="text-white/40 hover:text-[#C8201A] p-1 transition-colors cursor-pointer"
                      title="Remove line"
                    >
                      <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>

                  {/* Quantity Controller & Subtotal */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center rounded-full bg-[#2B241D] border border-white/10 p-0.5">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, -1)}
                        aria-label={`Decrease quantity of ${item.name}`}
                        className="flex h-7 w-7 items-center justify-center rounded-full text-white hover:bg-white/10 transition-colors cursor-pointer font-bold"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-xs font-black text-white">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, 1)}
                        aria-label={`Increase quantity of ${item.name}`}
                        className="flex h-7 w-7 items-center justify-center rounded-full text-white hover:bg-white/10 transition-colors cursor-pointer font-bold"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-condensed text-lg font-black text-white">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Area with Subtotals & Actions */}
        {items.length > 0 && (
          <div className="border-t border-white/10 bg-[#1B1A17] p-6 space-y-4">
            {/* Clear Cart Confirmation Dialog or Action */}
            <div className="flex items-center justify-between text-xs text-white/50">
              {showClearConfirm ? (
                <div className="flex items-center gap-2">
                  <span className="text-[#C8201A] font-bold">Clear all items?</span>
                  <button
                    type="button"
                    onClick={handleClearConfirmed}
                    className="text-xs font-bold text-white bg-[#C8201A] px-2 py-0.5 rounded cursor-pointer"
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowClearConfirm(false)}
                    className="text-xs font-bold text-white/70 hover:text-white px-2 py-0.5 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowClearConfirm(true)}
                  className="hover:text-[#C8201A] underline underline-offset-2 transition-colors cursor-pointer"
                >
                  Clear Cart
                </button>
              )}

              <span>Pure Vegetarian Kitchen</span>
            </div>

            {/* Subtotal Calculation */}
            <div className="flex items-baseline justify-between border-t border-white/10 pt-3">
              <span className="text-base font-bold text-white/80">Subtotal</span>
              <span className="font-condensed text-3xl font-black text-[#FFBA12]">
                ₹{subtotal}
              </span>
            </div>
            <p className="text-[11px] text-white/50 leading-tight">
              Taxes and delivery calculated at outlet dispatch.
            </p>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={handleProceedToCheckout}
                className="w-full rounded-full bg-[#C8201A] py-4 text-center font-black uppercase tracking-wider text-white shadow-[0_4px_0_#7d120e] hover:translate-y-0.5 hover:shadow-[0_1px_0_#7d120e] transition-all cursor-pointer"
              >
                Proceed to Checkout &bull; ₹{subtotal}
              </button>

              <button
                type="button"
                onClick={closeDrawer}
                className="w-full rounded-full py-2.5 text-center text-xs font-bold uppercase tracking-wider text-white/70 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
