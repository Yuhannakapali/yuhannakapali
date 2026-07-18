"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

// Wide mountain photo with a slow scroll-linked scale, clipped in a softly
// rounded frame. Uses framer-motion's scroll values with a spring for a smooth,
// natural feel. No effect when the visitor prefers reduced motion.
export function AboutImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scaleRaw = useTransform(scrollYProgress, [0, 1], [1.02, 1.14]);
  const scale = useSpring(scaleRaw, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  return (
    <div
      ref={ref}
      className="aspect-[16/10] w-full overflow-hidden rounded-2xl"
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        style={reduce ? undefined : { scale }}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
