"use client";

import { useEffect, useMemo, useRef } from "react";

// Topographic contour lines behind the hero. Paths are generated
// deterministically (so server and client markup match), draw themselves in on
// load, and bow toward the pointer like a magnetic pull. The interaction is
// disabled on touch devices and when the user prefers reduced motion.

const VIEW_W = 1000;
const VIEW_H = 620;
const CENTER = { x: 505, y: 315 };
const CONTOURS = 7;
const SAMPLES = 46;
const PULL_RADIUS = 230; // viewBox units
const PULL_STRENGTH = 34; // max displacement in viewBox units

type Pt = { x: number; y: number };

// A shared low-frequency shape so the loops read as one nested elevation map.
function shape(theta: number): number {
  return (
    Math.sin(3 * theta + 0.6) * 0.5 +
    Math.sin(5 * theta + 2.1) * 0.28 +
    Math.sin(7 * theta + 4.0) * 0.16
  );
}

function buildContours(): Pt[][] {
  const contours: Pt[][] = [];
  for (let i = 0; i < CONTOURS; i++) {
    const base = 60 + i * 52;
    const rx = base * 1.42;
    const ry = base * 0.82;
    const pts: Pt[] = [];
    for (let s = 0; s < SAMPLES; s++) {
      const t = (s / SAMPLES) * Math.PI * 2;
      // Low-freq shared shape plus a small per-contour wobble.
      const wobble = 1 + 0.05 * shape(t) + 0.02 * Math.sin(4 * t + i * 1.3);
      pts.push({
        x: CENTER.x + rx * wobble * Math.cos(t),
        y: CENTER.y + ry * wobble * Math.sin(t),
      });
    }
    contours.push(pts);
  }
  return contours;
}

// Smooth closed Catmull-Rom path through the points.
function closedPath(pts: Pt[]): string {
  const n = pts.length;
  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d + " Z";
}

export function ContourLines({
  className = "",
  interactive = true,
}: {
  className?: string;
  interactive?: boolean;
}) {
  const contours = useMemo(() => buildContours(), []);
  const initialPaths = useMemo(
    () => contours.map((c) => closedPath(c)),
    [contours],
  );

  const svgRef = useRef<SVGSVGElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);

  useEffect(() => {
    if (!interactive) return;
    const svg = svgRef.current;
    if (!svg) return;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return; // static, no magnetic pull

    // Per-point current offset, eased toward a target each frame.
    const offsets = contours.map((c) => c.map(() => ({ x: 0, y: 0 })));
    let pointer: Pt | null = null;
    let raf = 0;

    const toViewBox = (clientX: number, clientY: number): Pt => {
      const rect = svg.getBoundingClientRect();
      return {
        x: ((clientX - rect.left) / rect.width) * VIEW_W,
        y: ((clientY - rect.top) / rect.height) * VIEW_H,
      };
    };

    const onMove = (e: PointerEvent) => {
      pointer = toViewBox(e.clientX, e.clientY);
    };
    const onLeave = () => {
      pointer = null;
    };

    const tick = () => {
      for (let ci = 0; ci < contours.length; ci++) {
        const pts = contours[ci];
        const off = offsets[ci];
        let moved = false;
        for (let pi = 0; pi < pts.length; pi++) {
          let tx = 0;
          let ty = 0;
          if (pointer) {
            const dx = pointer.x - pts[pi].x;
            const dy = pointer.y - pts[pi].y;
            const dist = Math.hypot(dx, dy);
            if (dist < PULL_RADIUS && dist > 0.001) {
              const falloff = 1 - dist / PULL_RADIUS;
              const mag = falloff * falloff * PULL_STRENGTH;
              tx = (dx / dist) * mag;
              ty = (dy / dist) * mag;
            }
          }
          // Spring toward the target (or back to rest when target is 0).
          off[pi].x += (tx - off[pi].x) * 0.12;
          off[pi].y += (ty - off[pi].y) * 0.12;
          if (Math.abs(off[pi].x) > 0.05 || Math.abs(off[pi].y) > 0.05) {
            moved = true;
          }
        }
        if (moved || pointer) {
          const displaced = pts.map((p, pi) => ({
            x: p.x + off[pi].x,
            y: p.y + off[pi].y,
          }));
          pathRefs.current[ci]?.setAttribute("d", closedPath(displaced));
        }
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [contours, interactive]);

  return (
    <svg
      ref={svgRef}
      className={className}
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      {initialPaths.map((d, i) => (
        <path
          key={i}
          ref={(el) => {
            pathRefs.current[i] = el;
          }}
          className="contour-path"
          d={d}
          fill="none"
          stroke="var(--color-haze)"
          strokeWidth={1}
          strokeOpacity={0.16 + (i / CONTOURS) * 0.16}
          vectorEffect="non-scaling-stroke"
          pathLength={1}
          style={{ animationDelay: `${i * 0.12}s` }}
        />
      ))}
    </svg>
  );
}
