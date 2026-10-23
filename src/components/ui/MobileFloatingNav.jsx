"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  UtensilsCrossed,
  MapPin,
  Store,
  PhoneCall,
} from "lucide-react";

export default function MobileFloatingNav() {
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    const updateHash = () => {
      setActiveHash(window.location.hash || "");
    };
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  const isHomeActive = pathname === "/" && (activeHash === "" || activeHash === "#");
  const isMenuActive = pathname === "/menu";
  const isStoryActive = pathname === "/" && activeHash === "#living-city-map";
  const isFranchiseActive = pathname === "/" && activeHash === "#franchise";
  const isOutletsActive = pathname === "/" && activeHash === "#outlets";

  return (
    <>
      <style jsx global>{`
        .bugeese-mobile-nav {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 12px;
          bottom: calc(12px + env(safe-area-inset-bottom, 0px));
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 99999;
          padding: 0 12px;
          pointer-events: none;
        }

        @media (min-width: 768px) {
          .bugeese-mobile-nav {
            display: none !important;
          }
        }

        .bugeese-mobile-menu {
          pointer-events: auto;
          position: relative;
          width: 100%;
          max-width: 520px;
          backdrop-filter: blur(16px) saturate(180%) contrast(150%);
          -webkit-backdrop-filter: blur(16px) saturate(180%) contrast(150%);
          background: rgba(23, 19, 15, 0.85);
          border: 1px solid rgba(255, 186, 18, 0.3);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(255, 186, 18, 0.12);
          padding: 6px;
          border-radius: 99rem;
          display: flex;
          justify-content: center;
          gap: 4px;
        }

        .bugeese-mobile-menu::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          box-shadow:
            inset 2px 2px 5px -2px rgba(255, 255, 255, 0.25),
            inset -2px -2px 5px 2px rgba(255, 186, 18, 0.15),
            inset 0 -2px 0 rgba(255, 255, 255, 0.15);
          pointer-events: none;
          z-index: -1;
        }

        .bugeese-mobile-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1 1 0;
          min-width: 0;
          color: rgba(246, 240, 229, 0.75);
          text-decoration: none;
          padding: 8px 4px;
          border-radius: 999rem;
          -webkit-tap-highlight-color: transparent;
          transition:
            background 0.18s cubic-bezier(0.175, 0.885, 0.32, 1.275),
            color 0.18s cubic-bezier(0.175, 0.885, 0.32, 1.275),
            transform 0.18s cubic-bezier(0.175, 0.885, 0.32, 1.275),
            box-shadow 0.3s ease-in-out;
        }

        .bugeese-mobile-item:hover,
        .bugeese-mobile-item:active {
          background-color: rgba(255, 255, 255, 0.15);
          box-shadow:
            inset 2px 2px 5px -2px rgba(255, 255, 255, 0.3),
            inset -2px -1px 5px 0 rgba(255, 186, 18, 0.2),
            inset 0 -2px 0 rgba(255, 255, 255, 0.15);
          color: #FFBA12;
        }

        .bugeese-mobile-item.active {
          background: rgba(255, 186, 18, 0.25);
          color: #FFBA12;
          box-shadow:
            inset 1px 1px 4px rgba(255, 255, 255, 0.3),
            0 0 12px rgba(255, 186, 18, 0.25);
        }

        .bugeese-mobile-item svg {
          width: 1.35rem;
          height: 1.35rem;
        }

        .bugeese-mobile-item span {
          font-size: 0.75rem;
          font-weight: 600;
          line-height: 1;
          margin-top: 4px;
          white-space: nowrap;
        }
      `}</style>

      <nav className="bugeese-mobile-nav" aria-label="Mobile Bottom Navigation">
        <div className="bugeese-mobile-menu">
          {/* Home */}
          <Link
            href="/"
            className={`bugeese-mobile-item ${isHomeActive ? "active" : ""}`}
            onClick={() => setActiveHash("")}
          >
            <Home />
            <span>Home</span>
          </Link>

          {/* Menu */}
          <Link
            href="/menu"
            className={`bugeese-mobile-item ${isMenuActive ? "active" : ""}`}
          >
            <UtensilsCrossed />
            <span>Menu</span>
          </Link>

          {/* Journey / City Map */}
          <Link
            href="/#living-city-map"
            className={`bugeese-mobile-item ${isStoryActive ? "active" : ""}`}
            onClick={() => setActiveHash("#living-city-map")}
          >
            <MapPin />
            <span>Journey</span>
          </Link>

          {/* Franchise */}
          <Link
            href="/#franchise"
            className={`bugeese-mobile-item ${isFranchiseActive ? "active" : ""}`}
            onClick={() => setActiveHash("#franchise")}
          >
            <Store />
            <span>Franchise</span>
          </Link>

          {/* Outlets / Contact */}
          <Link
            href="/#outlets"
            className={`bugeese-mobile-item ${isOutletsActive ? "active" : ""}`}
            onClick={() => setActiveHash("#outlets")}
          >
            <PhoneCall />
            <span>Outlets</span>
          </Link>
        </div>
      </nav>
    </>
  );
}
