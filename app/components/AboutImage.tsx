"use client";

import { useEffect, useRef } from "react";

// Wide mountain photo with a slow, subtle scale-on-scroll, clipped inside a
// softly rounded frame. No effect when the user prefers reduced motion.
export function AboutImage({ src, alt }: { src: string; alt: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      const wrap = wrapRef.current;
      const img = imgRef.current;
      if (wrap && img) {
        const rect = wrap.getBoundingClientRect();
        const vh = window.innerHeight;
        // 0 as the frame enters from the bottom, 1 as it leaves the top.
        const progress = Math.min(
          1,
          Math.max(0, (vh - rect.top) / (vh + rect.height)),
        );
        img.style.transform = `scale(${(1 + progress * 0.08).toFixed(4)})`;
      }
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="aspect-[16/10] w-full overflow-hidden rounded-2xl"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-100 ease-out will-change-transform"
      />
    </div>
  );
}
