"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ContourLines } from "./ContourLines";
import { Ridgeline } from "./Ridgeline";

const heroContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const heroItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

// Landing hero: ink background, contour motif and interactive ridgeline behind
// the name. The contour and ridge layers drift by different amounts on pointer
// move for a subtle two-layer parallax (off on touch and reduced motion).
export function HeroSection() {
  const contourRef = useRef<HTMLDivElement>(null);
  const ridgeRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

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
          below it; the text itself is not interactive. Motion orchestrates a
          staggered entrance on load. */}
      <motion.div
        className="pointer-events-none relative z-10 flex flex-1 flex-col items-center justify-center px-5 text-center"
        variants={heroContainer}
        initial={reduce ? false : "hidden"}
        animate="show"
      >
        <motion.p
          variants={heroItem}
          className="font-sans text-[13px] uppercase tracking-[0.2em] text-marigold"
        >
          Kathmandu, Nepal
        </motion.p>
        <motion.h1
          variants={heroItem}
          className="font-display mt-4 text-[40px] font-semibold leading-[1.05] tracking-tight text-snow md:text-[72px]"
        >
          Yuhanna Kapali
        </motion.h1>
        <motion.p
          variants={heroItem}
          className="mt-5 max-w-[34rem] font-sans text-[16px] leading-relaxed text-haze md:text-[18px]"
        >
          Software engineer. I write about building things, the films I watch,
          and the trails above Kathmandu.
        </motion.p>
      </motion.div>

      {/* Quiet scroll hint */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-6 z-20 flex justify-center"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduce ? 0 : 0.9, duration: 0.6 }}
      >
        <span className="flex flex-col items-center gap-1 text-[11px] uppercase tracking-[0.2em] text-haze">
          Scroll
          <motion.svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            animate={reduce ? undefined : { y: [0, 3, 0] }}
            transition={
              reduce
                ? undefined
                : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
            }
          >
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </span>
      </motion.div>
    </section>
  );
}
