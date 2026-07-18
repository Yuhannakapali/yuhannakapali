"use client";

import { useEffect, useRef } from "react";
import { ContourLines } from "./ContourLines";
import { Ridgeline } from "./Ridgeline";

// Landing hero: ink background, contour motif and interactive ridgeline behind
// the name. The contour and ridge layers drift by different amounts on pointer
// move for a subtle two-layer parallax (off on touch and reduced motion).
export function HeroSection() {
  const contourRef = useRef<HTMLDivElement>(null);
  const ridgeRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    let targetX = 0;
    let curContour = 0;
    let curRidge = 0;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1..1
    };

    const tick = () => {
      // Contour drifts more than the ridge (ridge is the slower, deeper layer).
      curContour += (targetX * 14 - curContour) * 0.06;
      curRidge += (targetX * 7 - curRidge) * 0.06;
      if (contourRef.current) {
        contourRef.current.style.transform = `translate3d(${curContour.toFixed(2)}px,0,0)`;
      }
      if (ridgeRef.current) {
        ridgeRef.current.style.transform = `translate3d(${curRidge.toFixed(2)}px,0,0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    section.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      section.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink"
    >
      <div ref={contourRef} className="absolute inset-0 will-change-transform">
        <ContourLines className="h-full w-full" />
      </div>
      <div ref={ridgeRef} className="absolute inset-0 will-change-transform">
        <Ridgeline />
      </div>

      {/* Hero text. pointer-events-none so it never covers the ridgeline dots
          below it; the text itself is not interactive. */}
      <div className="pointer-events-none relative z-10 flex flex-1 flex-col items-center justify-center px-5 text-center">
        <p
          className="hero-rise font-sans text-[13px] uppercase tracking-[0.2em] text-marigold"
          style={{ animationDelay: "0.05s" }}
        >
          Kathmandu, Nepal
        </p>
        <h1
          className="hero-rise font-display mt-4 text-[40px] font-semibold leading-[1.05] tracking-tight text-snow md:text-[72px]"
          style={{ animationDelay: "0.15s" }}
        >
          Yuhanna Kapali
        </h1>
        <p
          className="hero-rise mt-5 max-w-[34rem] font-sans text-[16px] leading-relaxed text-haze md:text-[18px]"
          style={{ animationDelay: "0.28s" }}
        >
          Software engineer. I write about building things, the films I watch,
          and the trails above Kathmandu.
        </p>
      </div>

      {/* Quiet scroll hint */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-20 flex justify-center">
        <span className="hero-rise flex flex-col items-center gap-1 text-[11px] uppercase tracking-[0.2em] text-haze" style={{ animationDelay: "0.5s" }}>
          Scroll
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </section>
  );
}
