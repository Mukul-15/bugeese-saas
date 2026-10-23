"use client";

// components/HeroSequence.jsx
// Scroll-linked image-sequence animation rendered onto an HTML canvas.
// -------------------------------------------------------------------
// • Responsive sequence selection:
//     - Desktop (>= 768px): /hero-sequence (240 frames, ezgif-frame-XXX.jpg)
//     - Mobile  (< 768px):  /hero-sequence-mobile (102 frames, webp)
// • Preloads appropriate sequence before playing.
// • Maps scroll position → frame index (Apple-style sticky canvas).
// • Uses requestAnimationFrame; only redraws when the frame changes.
// • Respects prefers-reduced-motion, mobile sequence, and window resize.
//
// SPEED TUNING ─ two knobs:
//   1. CONTAINER_HEIGHT_VH  → taller = slower  (more scroll per frame)
//   2. The frame count itself → fewer frames = faster visual steps
// -------------------------------------------------------------------

import { useEffect, useRef, useState, useCallback, useSyncExternalStore } from "react";
import mobileFrameNames from "./mobileFrames.json";

// ── Desktop Config (Preserved) ───────────────────────────────────────
const DESKTOP_FRAME_PATH = "/hero-sequence";       // public folder
const DESKTOP_TOTAL_FRAMES = 240;                  // total frames on disk
const CONTAINER_HEIGHT_VH = 400;                   // height of scroll container

// ── Mobile Config ───────────────────────────────────────────────────
const MOBILE_FRAME_PATH = "/hero-sequence-mobile"; // public folder

/**
 * Build the desktop file name for a given 1-based frame number.
 * Files are named "ezgif-frame-001.jpg" … "ezgif-frame-240.jpg".
 */
function desktopFrameSrc(n) {
  return `${DESKTOP_FRAME_PATH}/ezgif-frame-${String(n).padStart(3, "0")}.jpg`;
}

/**
 * Build the mobile file name for a given 0-based index or filename.
 * Uses exact URL-encoded filenames from the verified manifest.
 */
function mobileFrameSrc(filename) {
  return `${MOBILE_FRAME_PATH}/${encodeURIComponent(filename)}`;
}

/**
 * Returns an array of image URLs to preload based on viewport mode.
 * - Desktop (>= 768px): All 240 desktop frames
 * - Mobile (< 768px): All 102 mobile frames (already optimized sequence)
 */
function buildFrameUrls(isMobile) {
  if (isMobile) {
    return mobileFrameNames.map((name) => mobileFrameSrc(name));
  }
  const urls = [];
  for (let i = 1; i <= DESKTOP_TOTAL_FRAMES; i++) {
    urls.push(desktopFrameSrc(i));
  }
  return urls;
}

/** Promise wrapper around Image loading. */
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    // ── Pre-decode images for instant crisp canvas drawing ──────────
    img.decode()
      .then(() => resolve(img))
      .catch(() => resolve(img)); // fallback gracefully if decode() is unsupported
  });
}

// ── Media query subscriptions via useSyncExternalStore ──────────────
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

// ── Component ───────────────────────────────────────────────────────
export default function HeroSequence() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const imagesRef = useRef([]);           // loaded HTMLImageElement[]
  const currentFrameRef = useRef(-1);     // last-drawn frame index
  const targetFrameRef = useRef(0);       // desired frame index from scroll
  const rafIdRef = useRef(null);

  // Responsive state (< 768px vs >= 768px) and accessibility
  const isMobile = useMediaQuery("(max-width: 767px)", false);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)", false);

  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0); // 0–100

  // ── Draw a single frame, preserving aspect ratio with High DPI & image smoothing ──
  const drawFrame = useCallback((idx) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const img = imagesRef.current[idx];
    if (!ctx || !img) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cw = canvas.width / dpr;
    const ch = canvas.height / dpr;
    const iw = img.naturalWidth || img.width;
    const ih = img.naturalHeight || img.height;
    if (!iw || !ih) return;

    const scale = Math.max(cw / iw, ch / ih);
    const sw = iw * scale;
    const sh = ih * scale;
    const sx = (cw - sw) / 2;
    const sy = (ch - sh) / 2;

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, sx, sy, sw, sh);
    ctx.restore();
  }, []);

  // ── Resize canvas to fill the viewport taking DPR into account ───
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    // Set canvas internal resolution to DPR * CSS dimensions
    canvas.width = Math.round(displayWidth * dpr);
    canvas.height = Math.round(displayHeight * dpr);
    canvas.style.width = `${displayWidth}px`;
    canvas.style.height = `${displayHeight}px`;

    // Redraw after resize so we don't flash blank
    if (currentFrameRef.current >= 0 && imagesRef.current[currentFrameRef.current]) {
      drawFrame(currentFrameRef.current);
    }
  }, [drawFrame]);

  // ── Preload images for current viewport sequence ──────────────────
  useEffect(() => {
    let cancelled = false;

    async function preload() {
      setLoading(true);
      setProgress(0);
      currentFrameRef.current = -1;

      if (reducedMotion) {
        // Only load the first frame of the active sequence for a static display
        try {
          const firstSrc = isMobile
            ? mobileFrameSrc(mobileFrameNames[0])
            : desktopFrameSrc(1);
          const img = await loadImage(firstSrc);
          if (!cancelled) {
            imagesRef.current = [img];
            setLoading(false);
          }
        } catch (e) {
          console.error("Reduced motion image load error:", e);
          if (!cancelled) setLoading(false);
        }
        return;
      }

      const urls = buildFrameUrls(isMobile);
      let loaded = 0;

      try {
        const imgs = await Promise.all(
          urls.map((url) =>
            loadImage(url).then((img) => {
              loaded++;
              if (!cancelled) {
                setProgress(Math.round((loaded / urls.length) * 100));
              }
              return img;
            })
          )
        );
        if (!cancelled) {
          imagesRef.current = imgs;
          setLoading(false);
        }
      } catch (e) {
        console.error("Image sequence preload error:", e);
        if (!cancelled) setLoading(false);
      }
    }

    preload();
    return () => {
      cancelled = true;
    };
  }, [isMobile, reducedMotion]);

  // ── Initial canvas setup + resize listener ────────────────────────
  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  // ── Draw initial frame once loaded (and for reduced-motion) ───────
  useEffect(() => {
    if (!loading && imagesRef.current.length > 0) {
      resizeCanvas();
      const container = containerRef.current;
      let initialFrame = 0;
      if (container) {
        const rect = container.getBoundingClientRect();
        const scrolled = -rect.top;
        const scrollable = container.scrollHeight - window.innerHeight;
        const progressVal = scrollable > 0 ? Math.min(Math.max(scrolled / scrollable, 0), 1) : 0;
        initialFrame = Math.round(progressVal * (imagesRef.current.length - 1));
      }
      targetFrameRef.current = initialFrame;
      currentFrameRef.current = initialFrame;
      drawFrame(initialFrame);
    }
  }, [loading, drawFrame, resizeCanvas]);

  // ── Scroll → frame mapping + rAF loop ─────────────────────────────
  useEffect(() => {
    if (loading || reducedMotion) return;

    const container = containerRef.current;
    if (!container) return;
    const totalImages = imagesRef.current.length;
    if (totalImages === 0) return;

    // ---------------------------------------------------------------
    // SCROLL-TO-FRAME MAPPING
    //
    //   progress = (scrollY - containerTop) / scrollableDistance
    //
    //   scrollableDistance = container height − viewport height
    //   (i.e. how many px the user can scroll while inside the
    //    container). Increasing CONTAINER_HEIGHT_VH makes this
    //    number larger → more scroll per frame → slower animation.
    //
    //   frameIndex = Math.round(progress × (totalImages − 1))
    //
    //   To make the animation SLOWER:  increase CONTAINER_HEIGHT_VH
    //   To make the animation FASTER:  decrease CONTAINER_HEIGHT_VH
    // ---------------------------------------------------------------

    const onScroll = () => {
      const rect = container.getBoundingClientRect();
      // How far we've scrolled past the top of the container
      const scrolled = -rect.top;
      // Total scrollable distance within the container
      const scrollable = container.scrollHeight - window.innerHeight;
      // Normalised progress 0 → 1
      const progress = scrollable > 0 ? Math.min(Math.max(scrolled / scrollable, 0), 1) : 0;
      // Map to frame index for the currently loaded sequence
      targetFrameRef.current = Math.round(progress * (totalImages - 1));
    };

    // rAF loop — only repaints when the frame actually changes
    let running = true;
    const tick = () => {
      if (!running) return;
      const target = targetFrameRef.current;
      if (target !== currentFrameRef.current) {
        currentFrameRef.current = target;
        drawFrame(target);
      }
      rafIdRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();           // set initial frame based on current scroll
    tick();               // start render loop

    return () => {
      running = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      window.removeEventListener("scroll", onScroll);
    };
  }, [loading, reducedMotion, drawFrame]);

  // ── Render ────────────────────────────────────────────────────────
  return (
    <section
      ref={containerRef}
      className="relative w-full"
      style={{ height: `${CONTAINER_HEIGHT_VH}vh` }}
    >
      {/* Canvas sticks to the viewport while the user scrolls */}
      <canvas
        ref={canvasRef}
        className="sticky top-0 left-0 w-full h-screen block"
        style={{ opacity: loading ? 0 : 1, transition: "opacity 0.4s" }}
      />

      {/* Loading indicator */}
      {loading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
          <div className="h-1 w-48 overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full bg-white transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-3 text-sm text-white/60">Loading {progress}%</p>
        </div>
      )}
    </section>
  );
}
