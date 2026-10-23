"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";

function subscribeMediaQuery(query, callback) {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia(query);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function useMediaQuery(query, serverFallback = false) {
  return useSyncExternalStore(
    (callback) => subscribeMediaQuery(query, callback),
    () => (typeof window !== "undefined" ? window.matchMedia(query).matches : serverFallback),
    () => serverFallback
  );
}

const STORY_STAGES = [
  {
    tag: "The Beginning",
    heading: "An idea, before a restaurant",
    body: "Bugeese began with a dream: to give India its own dedicated vegetarian burger brand.",
    source: "Source: bugeese.com, About Us",
    cta: null,
  },
  {
    tag: "June 2023 • Jabalpur",
    heading: "Founded in Jabalpur",
    body: "A chef trained in five-star hotels set out to show that vegetarian food can be bold, flavourful and satisfying, with handcrafted burgers at the centre.",
    source: "Source: bugeese.com, About Us",
    cta: null,
  },
  {
    tag: "January 2024 • Second Outlet",
    heading: "A second outlet opens",
    body: "Encouraged by customer response, Bugeese opened a second outlet in January 2024.",
    source: "Source: bugeese.com, About Us",
    cta: null,
  },
  {
    tag: "2024 and 2025 • Recognition",
    heading: "Best Burgers in Jabalpur",
    body: "Bugeese states that it earned this Swiggy recognition in both years.",
    source: "As stated on bugeese.com.",
    cta: null,
  },
  {
    tag: "Today",
    heading: "Bugeese, in your hands",
    body: "The next chapter is franchise opportunities and new cities. Now see what’s on the menu.",
    source: null,
    cta: {
      text: "Explore the menu",
      href: "/menu",
    },
  },
];

export default function JourneySection() {
  const storySectionRef = useRef(null);
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)", false);
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const stEl = storySectionRef.current;
    if (!stEl) return;

    const handleScroll = () => {
      const q = stEl.getBoundingClientRect();
      const scrollableDistance = q.height - window.innerHeight;
      if (scrollableDistance <= 0) return;

      // k goes strictly from 0 to 0.999
      const k = Math.min(0.999, Math.max(0, -q.top / scrollableDistance));
      const b = Math.floor(k * STORY_STAGES.length); // 0 to 4

      setCurrentStage(b);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [prefersReducedMotion]);

  // Visual state flags based on active stage
  const hideOrb = currentStage >= 1;
  const showStore1 = currentStage >= 1;
  const showStore2 = currentStage >= 2;
  const dimStores = currentStage >= 4;
  const showAward = currentStage === 3;
  const showPhone = currentStage >= 4;

  return (
    <section
      id="story"
      ref={storySectionRef}
      className="relative z-10 w-full bg-[#F6F1E7] text-[#1B1A17]"
      style={{
        height: prefersReducedMotion ? "auto" : "340vh",
        padding: prefersReducedMotion ? "5rem 0" : 0,
      }}
      aria-labelledby="st-h"
    >
      {/* 
        Sticky Viewport:
        - Pins cleanly at top: 0 while scrolling through the 340vh container.
        - Height is exactly 100vh so while pinned it perfectly occupies the screen.
        - Releases naturally into the next section (#vegetarian-section) when 340vh completes.
      */}
      <div
        className="px-4 sm:px-8 md:px-[6vw] flex flex-col justify-center"
        style={{
          position: prefersReducedMotion ? "static" : "sticky",
          top: 0,
          height: prefersReducedMotion ? "auto" : "100vh",
          overflow: "hidden",
        }}
      >
        {/* Top Skip Link */}
        {!prefersReducedMotion && (
          <a
            href="#vegetarian-section"
            className="absolute right-6 sm:right-10 top-8 z-20 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1B1A17] border-b-2 border-[#C8201A] pb-0.5 hover:text-[#C8201A] transition-colors"
          >
            Skip the story, see more &darr;
          </a>
        )}

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: Stacked Narrative Cards */}
          <div className="lg:col-span-6 relative min-h-[320px] sm:min-h-[380px] flex items-center">
            <h2
              id="st-h"
              style={{
                position: "absolute",
                width: "1px",
                height: "1px",
                overflow: "hidden",
                clip: "rect(0 0 0 0)",
              }}
            >
              The Bugeese Story
            </h2>

            {STORY_STAGES.map((stage, idx) => {
              const isActive = prefersReducedMotion || idx === currentStage;
              return (
                <div
                  key={idx}
                  className="transition-all duration-600 ease-out flex flex-col justify-center"
                  style={{
                    position: prefersReducedMotion ? "static" : "absolute",
                    inset: 0,
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? "translateY(0) scale(1)" : "translateY(32px) scale(0.97)",
                    pointerEvents: isActive ? "auto" : "none",
                    marginBottom: prefersReducedMotion ? "2.5rem" : 0,
                  }}
                >
                  <span className="inline-block self-start bg-[#F8B912] text-[#1B1A17] font-black text-xs uppercase tracking-widest px-3 py-1 rounded-sm mb-3 shadow-xs">
                    {stage.tag}
                  </span>
                  <h3 className="font-condensed text-4xl sm:text-6xl md:text-7xl font-black uppercase text-[#C8201A] leading-[0.95] mb-4 tracking-tight">
                    {stage.heading}
                  </h3>
                  <p className="text-base sm:text-lg md:text-xl text-[#2B241D] font-medium leading-relaxed max-w-lg mb-3">
                    {stage.body}
                  </p>
                  {stage.source && (
                    <p className="text-xs text-[#1B1A17]/60 italic mb-4">
                      {stage.source}
                    </p>
                  )}
                  {stage.cta && (
                    <Link
                      href={stage.cta.href}
                      className="inline-flex self-start items-center gap-2 rounded-full bg-[#C8201A] px-7 py-3.5 text-sm sm:text-base font-black uppercase tracking-wider text-white shadow-[0_5px_0_#7d120e] hover:translate-y-0.5 hover:shadow-[0_2px_0_#7d120e] transition-all"
                    >
                      {stage.cta.text} &rarr;
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Interactive Animated Visual Stage */}
          {!prefersReducedMotion && (
            <div className="lg:col-span-6 relative h-[280px] sm:h-[380px] lg:h-[480px] flex items-center justify-center" aria-hidden="true">
              
              {/* Ground line */}
              <div className="absolute left-0 right-0 bottom-[14%] h-1.5 bg-[#1B1A17] rounded-full" />

              {/* Stage 0: Golden Idea Pulse Orb */}
              <div
                className="absolute left-1/2 bottom-[calc(14%+30px)] -ml-12 w-24 h-24 rounded-full bg-[#F8B912] shadow-[0_0_40px_rgba(248,185,18,0.7)] transition-all duration-700 ease-out animate-pulse"
                style={{
                  opacity: hideOrb ? 0 : 1,
                  transform: hideOrb ? "scale(0.1)" : "scale(1)",
                }}
              />

              {/* Stage 1: Store 1 (June 2023 Jabalpur) */}
              <div
                className="absolute bottom-[calc(14%+6px)] left-[6%] w-[38%] aspect-square flex flex-col transition-all duration-700 ease-out origin-bottom"
                style={{
                  opacity: showStore1 ? (dimStores ? 0.35 : 1) : 0,
                  transform: showStore1 ? "scale(1) translateY(0)" : "scale(0.4) translateY(30px)",
                }}
              >
                <div className="h-[28%] rounded-t-lg border-2 border-[#1B1A17] bg-[repeating-linear-gradient(90deg,#C8201A_0_14%,#F6F1E7_14%_28%)] shadow-xs" />
                <div className="relative h-[72%] bg-white border-2 border-t-0 border-[#1B1A17] flex items-start justify-center pt-2 font-condensed text-xl sm:text-2xl font-black text-[#C8201A] shadow-md">
                  Bugeese
                  <div className="absolute bottom-0 left-[34%] w-[32%] h-[56%] bg-[#F8B912] border-2 border-b-0 border-[#1B1A17] rounded-t-xs" />
                </div>
              </div>

              {/* Stage 2: Store 2 (Jan 2024 Second Outlet) */}
              <div
                className="absolute bottom-[calc(14%+6px)] right-[6%] w-[38%] aspect-square flex flex-col transition-all duration-700 ease-out origin-bottom"
                style={{
                  opacity: showStore2 ? (dimStores ? 0.35 : 1) : 0,
                  transform: showStore2 ? "scale(1) translateY(0)" : "scale(0.4) translateY(30px)",
                }}
              >
                <div className="h-[28%] rounded-t-lg border-2 border-[#1B1A17] bg-[repeating-linear-gradient(90deg,#C8201A_0_14%,#F6F1E7_14%_28%)] shadow-xs" />
                <div className="relative h-[72%] bg-white border-2 border-t-0 border-[#1B1A17] flex items-start justify-center pt-2 font-condensed text-xl sm:text-2xl font-black text-[#C8201A] shadow-md">
                  Bugeese
                  <div className="absolute bottom-0 left-[34%] w-[32%] h-[56%] bg-[#F8B912] border-2 border-b-0 border-[#1B1A17] rounded-t-xs" />
                </div>
              </div>

              {/* Stage 3: Recognition Award Plaque */}
              <div
                className="absolute left-1/2 top-[8%] -translate-x-1/2 bg-[#1B1A17] text-[#F8B912] border border-[#F8B912]/40 rounded-xl px-5 py-3 text-center text-xs sm:text-sm font-black shadow-2xl transition-all duration-600 ease-out pointer-events-none"
                style={{
                  opacity: showAward ? 1 : 0,
                  transform: showAward ? "translate(-50%, 0)" : "translate(-50%, -24px)",
                }}
              >
                Swiggy &bull; Best Burgers in Jabalpur
                <br />
                <span className="text-white text-[11px] font-bold">2024 &amp; 2025 (per Bugeese)</span>
              </div>

              {/* Stage 4: Phone Digital Mockup */}
              <div
                className="absolute left-1/2 bottom-[10%] -ml-18 w-36 sm:w-44 h-64 sm:h-76 bg-[#1B1A17] rounded-[28px] p-2.5 shadow-2xl transition-all duration-700 ease-out border border-white/20"
                style={{
                  opacity: showPhone ? 1 : 0,
                  transform: showPhone ? "translateY(0) scale(1)" : "translateY(60px) scale(0.9)",
                }}
              >
                <div className="h-full bg-[#F6F1E7] rounded-[20px] p-3 flex flex-col justify-between">
                  <div>
                    <div className="w-8 h-1 bg-[#1B1A17]/20 rounded-full mx-auto mb-2" />
                    <div className="font-condensed text-lg font-black text-[#C8201A] uppercase mb-2">
                      Digital Menu
                    </div>
                    <div className="space-y-1.5">
                      <div className="h-7 bg-white rounded-md shadow-xs flex items-center px-2 text-[10px] font-bold text-[#1B1A17]">
                        Burgers &bull; ₹149
                      </div>
                      <div className="h-7 bg-white rounded-md shadow-xs flex items-center px-2 text-[10px] font-bold text-[#1B1A17]">
                        Fries &bull; ₹99
                      </div>
                      <div className="h-7 bg-white rounded-md shadow-xs flex items-center px-2 text-[10px] font-bold text-[#1B1A17]">
                        Thick Shake &bull; ₹119
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#C8201A] text-white text-[10px] font-black uppercase text-center py-2 rounded-lg">
                    Order Placed
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Bottom Progress Rail */}
        {!prefersReducedMotion && (
          <div className="absolute left-4 sm:left-8 md:left-[6vw] bottom-6 flex gap-2.5 z-10" aria-hidden="true">
            {STORY_STAGES.map((_, idx) => (
              <div
                key={idx}
                className="h-1.5 rounded-full transition-all duration-400"
                style={{
                  width: idx <= currentStage ? "44px" : "28px",
                  backgroundColor: idx <= currentStage ? "#C8201A" : "rgba(27, 26, 23, 0.2)",
                }}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
