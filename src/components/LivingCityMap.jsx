"use client";

import { useEffect, useRef, useState, useSyncExternalStore, useCallback } from "react";
import Link from "next/link";
import { BUGEESE_CONFIG } from "@/data/brandData";

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

// 5 Chapters strictly matching Section 5 requirements
const MAP_CHAPTERS = [
  {
    id: "chapter-1",
    number: "01",
    tag: "Chapter 1 • The Beginning: Jabalpur",
    headline: "EVERY BIG IDEA STARTS SOMEWHERE.",
    body: "Bugeese began its journey in Jabalpur, starting with a single store and a bigger ambition.",
    locationBadge: "Jabalpur • Store #1",
    cta: null,
  },
  {
    id: "chapter-2",
    number: "02",
    tag: "Chapter 2 • Growing Locally: Two Additional Branches",
    headline: "ONE STORE BECAME THREE.",
    body: "Growing beyond the first location, Bugeese expanded its physical presence with two additional branches across Jabalpur.",
    locationBadge: "Jabalpur • 3 Active Outlets",
    cta: null,
  },
  {
    id: "chapter-3",
    number: "03",
    tag: "Chapter 3 • Beyond the Store: Online Delivery",
    headline: "FROM OUR KITCHEN TO YOUR DOORSTEP.",
    body: "Connecting kitchens directly to thousands of burger lovers via online delivery on Swiggy and Zomato, taking the crave-worthy experience anywhere.",
    locationBadge: "Delivery Network Active",
    cta: null,
  },
  {
    id: "chapter-4",
    number: "04",
    tag: "Chapter 4 • A New City: Indore",
    headline: "A NEW CITY. A BIGGER AMBITION.",
    body: "Bugeese expanded its journey into Indore, opening a new chapter for the brand and establishing its bold vegetarian flavour in Madhya Pradesh's food capital.",
    locationBadge: "Jabalpur ➔ Indore Route",
    cta: null,
  },
  {
    id: "chapter-5",
    number: "05",
    tag: "Chapter 5 • The Next Chapter: Franchise Opportunities",
    headline: "YOUR CITY COULD BE NEXT.",
    body: "Bugeese is looking for passionate franchise partners to help bring the 100% pure vegetarian gourmet burger brand to new cities and thriving food destinations.",
    locationBadge: "Franchise Expansion",
    cta: {
      text: "Explore Franchise Opportunities",
      href: "#franchise",
    },
  },
];

export default function LivingCityMap() {
  const containerRef = useRef(null);
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)", false);
  const [currentChapter, setCurrentChapter] = useState(0);

  // Jump to specific milestone on marker click
  const selectMilestone = useCallback((chapterIndex) => {
    setCurrentChapter(chapterIndex);
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const currentScrollY = window.scrollY;
      const containerTopY = currentScrollY + rect.top;
      const scrollableDistance = rect.height - window.innerHeight;
      if (scrollableDistance > 0) {
        // Target scroll progress representing the center of the chapter range
        const targetProgress = (chapterIndex + 0.4) / MAP_CHAPTERS.length;
        window.scrollTo({
          top: containerTopY + targetProgress * scrollableDistance,
          behavior: prefersReducedMotion ? "auto" : "smooth",
        });
      }
    }
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const el = containerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const q = el.getBoundingClientRect();
      const scrollableDistance = q.height - window.innerHeight;
      if (scrollableDistance <= 0) return;

      const progress = Math.min(0.999, Math.max(0, -q.top / scrollableDistance));
      const chapterIdx = Math.min(MAP_CHAPTERS.length - 1, Math.floor(progress * MAP_CHAPTERS.length));

      setCurrentChapter((prev) => (prev !== chapterIdx ? chapterIdx : prev));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [prefersReducedMotion]);

  const activeChap = MAP_CHAPTERS[currentChapter];

  // Visual state flags based on active chapter (0 to 4)
  const isJabalpurActive = currentChapter >= 0;
  const isBranchesActive = currentChapter >= 1;
  const isDeliveryActive = currentChapter >= 2;
  const isIndoreActive = currentChapter >= 3;
  const isFranchiseActive = currentChapter >= 4;

  return (
    <section
      id="living-city-map"
      ref={containerRef}
      className="relative z-10 w-full bg-[#F6F1E7] text-[#1B1A17]"
      style={{
        height: prefersReducedMotion ? "auto" : "360vh",
        padding: prefersReducedMotion ? "5rem 0" : 0,
      }}
      aria-label="Living City Map • Bugeese Brand Journey"
    >
      {/* 
        Sticky Viewport:
        - Pins cleanly at top: 0 with exact 100vh during scroll
        - Side-by-side or stacked layout of Narrative + Interactive Living Map
        - Releases smoothly into MenuPreview ("PICK YOUR CRAVING") when 360vh completes
      */}
      <div
        className="w-full flex flex-col justify-center px-4 sm:px-8 md:px-[5vw] lg:px-[6vw]"
        style={{
          position: prefersReducedMotion ? "static" : "sticky",
          top: 0,
          height: prefersReducedMotion ? "auto" : "100vh",
          overflow: "hidden",
        }}
      >
        {/* Top Header / Skip Link */}
        {!prefersReducedMotion && (
          <div className="absolute top-6 left-6 sm:left-12 right-6 sm:right-12 flex items-center justify-between z-30">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C8201A] animate-ping" />
              <span className="text-[11px] sm:text-xs font-black tracking-widest uppercase text-[#1B1A17]/70">
                Interactive Living City Map
              </span>
            </div>
            <a
              href="#menu-preview"
              className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1B1A17] border-b-2 border-[#C8201A] pb-0.5 hover:text-[#C8201A] transition-colors"
            >
              Skip to Menu &darr;
            </a>
          </div>
        )}

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 xl:gap-14 items-center w-full max-w-7xl mx-auto pt-10 lg:pt-0">
          
          {/* ── Left Column: Synchronized Story Narrative ── */}
          <div className="lg:col-span-5 flex flex-col justify-center relative min-h-[280px] sm:min-h-[340px] lg:min-h-[420px]">
            {MAP_CHAPTERS.map((chap, idx) => {
              const isActive = prefersReducedMotion || idx === currentChapter;
              return (
                <div
                  key={chap.id}
                  className="transition-all duration-600 ease-out flex flex-col justify-center"
                  style={{
                    position: prefersReducedMotion ? "static" : "absolute",
                    inset: 0,
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? "translateY(0) scale(1)" : "translateY(28px) scale(0.97)",
                    pointerEvents: isActive ? "auto" : "none",
                    marginBottom: prefersReducedMotion ? "3rem" : 0,
                  }}
                >
                  {/* Chapter Milestone Pill */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-block bg-[#F8B912] text-[#1B1A17] font-black text-xs uppercase tracking-widest px-3 py-1 rounded-sm shadow-xs">
                      {chap.tag}
                    </span>
                    <span className="text-xs font-bold text-[#1B1A17]/50 tracking-wider">
                      {chap.locationBadge}
                    </span>
                  </div>

                  {/* Headline */}
                  <h2 className="font-condensed text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase text-[#C8201A] leading-[0.92] mb-4 tracking-tight">
                    {chap.headline}
                  </h2>

                  {/* Body Text */}
                  <p className="text-base sm:text-lg md:text-xl text-[#2B241D] font-medium leading-relaxed max-w-lg mb-6">
                    {chap.body}
                  </p>

                  {/* Chapter 5 CTA Button */}
                  {chap.cta && (
                    <div className="flex items-center gap-4">
                      <a
                        href={chap.cta.href}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C8201A] px-7 py-4 text-sm sm:text-base font-black uppercase tracking-wider text-white shadow-[0_5px_0_#7d120e] hover:translate-y-0.5 hover:shadow-[0_2px_0_#7d120e] transition-all"
                      >
                        {chap.cta.text} &rarr;
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* ── Right Column: Living City Map SVG Illustration ── */}
          <div className="lg:col-span-7 relative w-full aspect-4/3 sm:aspect-16/11 max-h-[58vh] lg:max-h-[66vh] bg-[#FFFDF9] rounded-3xl border-2 border-[#1B1A17]/15 shadow-2xl p-4 sm:p-6 overflow-hidden">
            
            {/* Top Interactive Milestone Navigation Bar */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-auto">
              <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-[#1B1A17]/60">
                Milestone Navigation:
              </span>
              <div className="flex gap-1.5 sm:gap-2">
                {MAP_CHAPTERS.map((chap, i) => (
                  <button
                    key={chap.id}
                    type="button"
                    onClick={() => selectMilestone(i)}
                    className={`text-[10px] sm:text-xs font-black px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                      i === currentChapter
                        ? "bg-[#C8201A] text-white border-[#C8201A] shadow-xs scale-105"
                        : "bg-white/80 text-[#1B1A17]/70 border-black/15 hover:border-black/40 hover:bg-white"
                    }`}
                    aria-label={`Jump to Chapter ${i + 1}: ${chap.headline}`}
                  >
                    {chap.number}
                  </button>
                ))}
              </div>
            </div>

            {/* SVG Map Canvas */}
            <svg
              viewBox="0 0 800 560"
              className="w-full h-full select-none"
              style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.03))" }}
            >
              <defs>
                {/* Regional subtle terrain grid patterns */}
                <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E5DEC9" strokeWidth="0.75" />
                </pattern>
                
                {/* Glow Filter for active markers */}
                <filter id="markerGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#C8201A" floodOpacity="0.4" />
                </filter>
                <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#F8B912" floodOpacity="0.5" />
                </filter>
              </defs>

              {/* Map Ground & Subtle Terrain */}
              <rect width="800" height="560" rx="20" fill="#FBF8EE" />
              <rect width="800" height="560" rx="20" fill="url(#mapGrid)" opacity="0.6" />

              {/* Decorative Rivers / Geographic curves */}
              <path
                d="M 20 220 Q 200 240 380 200 T 780 230"
                fill="none"
                stroke="#E2D7BE"
                strokeWidth="14"
                strokeLinecap="round"
                opacity="0.5"
              />

              {/* ────────────────── CHAPTER 1 & 2: JABALPUR ROAD NETWORK ────────────────── */}
              {/* Local Road Jabalpur Base */}
              <path
                d="M 120 460 Q 180 430 220 380 T 260 300"
                fill="none"
                stroke="#1B1A17"
                strokeWidth="6"
                strokeLinecap="round"
                opacity={isJabalpurActive ? "0.9" : "0.2"}
                className="transition-opacity duration-700"
              />

              {/* Branching Road to Branch #2 & Branch #3 (Chapter 2) */}
              <path
                d="M 220 380 Q 280 410 320 390"
                fill="none"
                stroke="#1B1A17"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray="6 6"
                opacity={isBranchesActive ? "0.85" : "0"}
                className="transition-all duration-700"
              />
              <path
                d="M 220 380 Q 170 330 150 310"
                fill="none"
                stroke="#1B1A17"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray="6 6"
                opacity={isBranchesActive ? "0.85" : "0"}
                className="transition-all duration-700"
              />

              {/* ────────────────── CHAPTER 4: JABALPUR TO INDORE HIGHWAY ────────────────── */}
              {/* Highway connecting Jabalpur (220, 380) to Indore (600, 160) */}
              <path
                d="M 220 380 C 320 360, 420 230, 600 160"
                fill="none"
                stroke="#E2D7BE"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <path
                d="M 220 380 C 320 360, 420 230, 600 160"
                fill="none"
                stroke="#C8201A"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={isIndoreActive ? "none" : "8 8"}
                opacity={isIndoreActive ? "1" : "0.3"}
                className="transition-all duration-700"
              />

              {/* ────────────────── CHAPTER 5: FUTURE FRANCHISE DOTTED ROUTES ────────────────── */}
              {/* Branching from Indore and Jabalpur to future expansion hubs */}
              <g
                opacity={isFranchiseActive ? "1" : "0"}
                className="transition-opacity duration-700"
              >
                {/* Route to Future Hub North (Bhopal/Gwalior) */}
                <path
                  d="M 600 160 Q 640 100 680 80"
                  fill="none"
                  stroke="#F8B912"
                  strokeWidth="4"
                  strokeDasharray="5 5"
                />
                {/* Route to Future Hub West (Ujjain/Gujarat) */}
                <path
                  d="M 600 160 Q 670 200 730 220"
                  fill="none"
                  stroke="#F8B912"
                  strokeWidth="4"
                  strokeDasharray="5 5"
                />
                {/* Route to Future Hub South */}
                <path
                  d="M 220 380 Q 280 470 340 500"
                  fill="none"
                  stroke="#F8B912"
                  strokeWidth="4"
                  strokeDasharray="5 5"
                />
              </g>

              {/* ────────────────── STORE ILLUSTRATION 1: JABALPUR ORIGINAL STORE (CHAP 1) ────────────────── */}
              <g
                transform="translate(190, 310)"
                opacity={isJabalpurActive ? "1" : "0"}
                className="transition-all duration-700 origin-bottom"
                style={{ transformOrigin: "220px 380px" }}
              >
                {/* Illustrated Storefront */}
                <g transform="scale(0.85)">
                  {/* Store Body */}
                  <rect x="0" y="24" width="60" height="42" fill="#FFFFFF" stroke="#1B1A17" strokeWidth="2.5" rx="3" />
                  {/* Striped Awning */}
                  <rect x="-4" y="10" width="68" height="16" fill="#C8201A" rx="3" stroke="#1B1A17" strokeWidth="2" />
                  <line x1="12" y1="10" x2="12" y2="26" stroke="#F6F1E7" strokeWidth="3" />
                  <line x1="28" y1="10" x2="28" y2="26" stroke="#F6F1E7" strokeWidth="3" />
                  <line x1="44" y1="10" x2="44" y2="26" stroke="#F6F1E7" strokeWidth="3" />
                  {/* Golden Door */}
                  <rect x="22" y="38" width="16" height="28" fill="#F8B912" stroke="#1B1A17" strokeWidth="2" />
                  {/* Store Sign */}
                  <text x="30" y="33" textAnchor="middle" fill="#C8201A" fontSize="9" fontWeight="900" fontFamily="sans-serif">
                    BUGEESE
                  </text>
                </g>
              </g>

              {/* ────────────────── STORE ILLUSTRATIONS 2 & 3: TWO ADDITIONAL BRANCHES (CHAP 2) ────────────────── */}
              <g
                transform="translate(290, 330)"
                opacity={isBranchesActive ? "1" : "0"}
                className="transition-all duration-700"
              >
                {/* Branch #2 Storefront */}
                <g transform="scale(0.72)">
                  <rect x="0" y="24" width="60" height="42" fill="#FFFFFF" stroke="#1B1A17" strokeWidth="2.5" rx="3" />
                  <rect x="-4" y="10" width="68" height="16" fill="#C8201A" rx="3" stroke="#1B1A17" strokeWidth="2" />
                  <line x1="12" y1="10" x2="12" y2="26" stroke="#F6F1E7" strokeWidth="3" />
                  <line x1="28" y1="10" x2="28" y2="26" stroke="#F6F1E7" strokeWidth="3" />
                  <line x1="44" y1="10" x2="44" y2="26" stroke="#F6F1E7" strokeWidth="3" />
                  <rect x="22" y="38" width="16" height="28" fill="#F8B912" stroke="#1B1A17" strokeWidth="2" />
                  <text x="30" y="33" textAnchor="middle" fill="#C8201A" fontSize="9" fontWeight="900" fontFamily="sans-serif">
                    OUTLET 2
                  </text>
                </g>
              </g>

              <g
                transform="translate(110, 250)"
                opacity={isBranchesActive ? "1" : "0"}
                className="transition-all duration-700"
              >
                {/* Branch #3 Storefront */}
                <g transform="scale(0.72)">
                  <rect x="0" y="24" width="60" height="42" fill="#FFFFFF" stroke="#1B1A17" strokeWidth="2.5" rx="3" />
                  <rect x="-4" y="10" width="68" height="16" fill="#C8201A" rx="3" stroke="#1B1A17" strokeWidth="2" />
                  <line x1="12" y1="10" x2="12" y2="26" stroke="#F6F1E7" strokeWidth="3" />
                  <line x1="28" y1="10" x2="28" y2="26" stroke="#F6F1E7" strokeWidth="3" />
                  <line x1="44" y1="10" x2="44" y2="26" stroke="#F6F1E7" strokeWidth="3" />
                  <rect x="22" y="38" width="16" height="28" fill="#F8B912" stroke="#1B1A17" strokeWidth="2" />
                  <text x="30" y="33" textAnchor="middle" fill="#C8201A" fontSize="9" fontWeight="900" fontFamily="sans-serif">
                    OUTLET 3
                  </text>
                </g>
              </g>

              {/* ────────────────── CHAPTER 3: ONLINE DELIVERY VISUALS ────────────────── */}
              <g
                transform="translate(230, 230)"
                opacity={isDeliveryActive ? "1" : "0"}
                className="transition-all duration-700"
              >
                {/* Delivery Smartphone Device Mockup */}
                <rect x="0" y="0" width="70" height="110" rx="12" fill="#1B1A17" stroke="#FFFFFF" strokeWidth="2" filter="url(#markerGlow)" />
                <rect x="6" y="8" width="58" height="94" rx="8" fill="#F6F0E5" />
                
                {/* Mobile screen content */}
                <rect x="18" y="14" width="34" height="6" rx="3" fill="#C8201A" />
                <rect x="12" y="26" width="46" height="12" rx="4" fill="#FFFFFF" stroke="#E2D7BE" strokeWidth="1" />
                <text x="35" y="35" textAnchor="middle" fill="#E23744" fontSize="8" fontWeight="900" fontFamily="sans-serif">
                  ZOMATO
                </text>
                <rect x="12" y="42" width="46" height="12" rx="4" fill="#FFFFFF" stroke="#E2D7BE" strokeWidth="1" />
                <text x="35" y="51" textAnchor="middle" fill="#FC8019" fontSize="8" fontWeight="900" fontFamily="sans-serif">
                  SWIGGY
                </text>
                
                {/* Active delivery pulse icon */}
                <circle cx="35" cy="72" r="12" fill="#F8B912" />
                <text x="35" y="76" textAnchor="middle" fill="#1B1A17" fontSize="11" fontWeight="bold">
                  🛵
                </text>
                <rect x="14" y="90" width="42" height="7" rx="3.5" fill="#C8201A" />
              </g>

              {/* Delivery signal rings emitting outward */}
              <g
                opacity={isDeliveryActive ? "0.8" : "0"}
                className="transition-opacity duration-700"
              >
                <circle cx="265" cy="285" r="55" fill="none" stroke="#FC8019" strokeWidth="2" strokeDasharray="4 4" className="animate-ping" style={{ animationDuration: "3s" }} />
                <circle cx="265" cy="285" r="85" fill="none" stroke="#E23744" strokeWidth="1.5" strokeDasharray="6 6" />
              </g>

              {/* ────────────────── CHAPTER 4: INDORE EXPANSION DESTINATION ────────────────── */}
              <g
                transform="translate(560, 90)"
                opacity={isIndoreActive ? "1" : "0"}
                className="transition-all duration-700"
              >
                {/* Indore Storefront */}
                <g transform="scale(0.9)">
                  <rect x="0" y="24" width="68" height="46" fill="#FFFFFF" stroke="#1B1A17" strokeWidth="2.5" rx="3" />
                  <rect x="-4" y="8" width="76" height="18" fill="#C8201A" rx="3" stroke="#1B1A17" strokeWidth="2" />
                  <line x1="14" y1="8" x2="14" y2="26" stroke="#F6F1E7" strokeWidth="3" />
                  <line x1="34" y1="8" x2="34" y2="26" stroke="#F6F1E7" strokeWidth="3" />
                  <line x1="54" y1="8" x2="54" y2="26" stroke="#F6F1E7" strokeWidth="3" />
                  <rect x="25" y="40" width="18" height="30" fill="#F8B912" stroke="#1B1A17" strokeWidth="2" />
                  <text x="34" y="32" textAnchor="middle" fill="#C8201A" fontSize="9" fontWeight="900" fontFamily="sans-serif">
                    INDORE
                  </text>
                </g>
              </g>

              {/* ────────────────── CHAPTER 5: FUTURE EXPANSION HUBS (HOLLOW / DASHED) ────────────────── */}
              <g
                opacity={isFranchiseActive ? "1" : "0"}
                className="transition-opacity duration-700"
              >
                {/* Future Hub 1: North */}
                <g transform="translate(680, 80)">
                  <circle cx="0" cy="0" r="16" fill="#FFFFFF" stroke="#F8B912" strokeWidth="3" strokeDasharray="4 3" />
                  <circle cx="0" cy="0" r="6" fill="#F8B912" />
                  <text x="0" y="28" textAnchor="middle" fill="#1B1A17" fontSize="10" fontWeight="900">
                    YOUR CITY?
                  </text>
                </g>

                {/* Future Hub 2: West */}
                <g transform="translate(730, 220)">
                  <circle cx="0" cy="0" r="16" fill="#FFFFFF" stroke="#F8B912" strokeWidth="3" strokeDasharray="4 3" />
                  <circle cx="0" cy="0" r="6" fill="#F8B912" />
                  <text x="0" y="28" textAnchor="middle" fill="#1B1A17" fontSize="10" fontWeight="900">
                    FRANCHISE
                  </text>
                </g>

                {/* Future Hub 3: South */}
                <g transform="translate(340, 500)">
                  <circle cx="0" cy="0" r="16" fill="#FFFFFF" stroke="#F8B912" strokeWidth="3" strokeDasharray="4 3" />
                  <circle cx="0" cy="0" r="6" fill="#F8B912" />
                  <text x="0" y="28" textAnchor="middle" fill="#1B1A17" fontSize="10" fontWeight="900">
                    NEW HUB
                  </text>
                </g>
              </g>

              {/* ────────────────── INTERACTIVE CLICKABLE PINS ────────────────── */}
              {/* Jabalpur Primary Marker Pin */}
              <g
                transform="translate(220, 380)"
                onClick={() => selectMilestone(0)}
                className="cursor-pointer group"
                role="button"
                tabIndex={0}
                aria-label="Milestone 1: Jabalpur Original Store"
              >
                <circle cx="0" cy="0" r="18" fill="#F8B912" opacity="0.3" className="animate-ping" />
                <circle cx="0" cy="0" r="14" fill="#C8201A" stroke="#FFFFFF" strokeWidth="3" filter="url(#markerGlow)" />
                <circle cx="0" cy="0" r="5" fill="#F8B912" />
                <rect x="-38" y="18" width="76" height="20" rx="4" fill="#1B1A17" />
                <text x="0" y="32" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">
                  JABALPUR
                </text>
              </g>

              {/* Indore Destination Marker Pin */}
              <g
                transform="translate(600, 160)"
                onClick={() => selectMilestone(3)}
                className="cursor-pointer group"
                role="button"
                tabIndex={0}
                aria-label="Milestone 4: Indore Expansion"
                opacity={isIndoreActive ? "1" : "0.5"}
              >
                <circle cx="0" cy="0" r="18" fill="#F8B912" opacity={isIndoreActive ? "0.4" : "0"} className="animate-ping" />
                <circle cx="0" cy="0" r="14" fill="#C8201A" stroke="#FFFFFF" strokeWidth="3" filter="url(#markerGlow)" />
                <circle cx="0" cy="0" r="5" fill="#F8B912" />
                <rect x="-30" y="18" width="60" height="20" rx="4" fill="#1B1A17" />
                <text x="0" y="32" textAnchor="middle" fill="#F8B912" fontSize="10" fontWeight="bold">
                  INDORE
                </text>
              </g>
            </svg>

            {/* Bottom Map Legend */}
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] sm:text-xs text-[#1B1A17]/60 font-bold bg-[#FBF8EE]/80 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-black/5">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#C8201A]" /> Active Stores
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full border border-dashed border-[#F8B912] bg-[#F8B912]/40" /> Franchise Targets
                </span>
              </div>
              <span>Click markers to navigate</span>
            </div>

          </div>

        </div>

        {/* ── Bottom Progress Bar Rail ── */}
        {!prefersReducedMotion && (
          <div className="absolute left-4 sm:left-8 md:left-[6vw] bottom-6 flex items-center gap-2.5 z-20" aria-hidden="true">
            {MAP_CHAPTERS.map((chap, idx) => (
              <button
                key={chap.id}
                type="button"
                onClick={() => selectMilestone(idx)}
                className="group py-2 cursor-pointer focus:outline-hidden"
                aria-label={`Jump to ${chap.tag}`}
              >
                <div
                  className="h-1.5 rounded-full transition-all duration-400"
                  style={{
                    width: idx === currentChapter ? "48px" : "28px",
                    backgroundColor: idx <= currentChapter ? "#C8201A" : "rgba(27, 26, 23, 0.2)",
                  }}
                />
              </button>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
