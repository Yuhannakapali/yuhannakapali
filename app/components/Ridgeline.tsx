"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

// A hand-drawn-feeling Himalayan ridgeline along the bottom of the hero.
// The silhouette is a filled path with a thin haze stroke along its top edge.
// Five named summits are marked with marigold dots that reveal a label on
// hover / focus / tap and link through to /treks.
//
// The SVG uses preserveAspectRatio="none" so viewBox coordinates map linearly
// to the box. That lets the HTML dot + label overlays sit at exact percentage
// positions on top of the drawn ridge at any width, with crisp typography.

const VB_W = 1200;
const VB_H = 300;

type Pt = { x: number; y: number };

type Summit = { name: string; altitude: number; x: number; y: number };

// Left to right in a pleasing rhythm; peak height (y) tracks altitude.
const SUMMITS: Summit[] = [
  { name: "Everest", altitude: 8849, x: 140, y: 70 },
  { name: "Kanchenjunga", altitude: 8586, x: 370, y: 78 },
  { name: "Manaslu", altitude: 8163, x: 600, y: 91 },
  { name: "Annapurna I", altitude: 8091, x: 830, y: 93 },
  { name: "Langtang Lirung", altitude: 7227, x: 1050, y: 120 },
];

// The full ridge profile: summits plus valleys and minor peaks for realism.
const PROFILE: Pt[] = [
  { x: 0, y: 205 },
  { x: 70, y: 158 },
  { x: 140, y: 70 }, // Everest
  { x: 215, y: 150 },
  { x: 285, y: 128 },
  { x: 370, y: 78 }, // Kanchenjunga
  { x: 450, y: 166 },
  { x: 520, y: 138 },
  { x: 600, y: 91 }, // Manaslu
  { x: 685, y: 172 },
  { x: 760, y: 148 },
  { x: 830, y: 93 }, // Annapurna I
  { x: 912, y: 176 },
  { x: 985, y: 150 },
  { x: 1050, y: 120 }, // Langtang Lirung
  { x: 1130, y: 176 },
  { x: 1200, y: 200 },
];

// Open Catmull-Rom curve through the profile points; returns the segment string
// after the initial move, so it can be reused for both line and fill.
function ridgeSegments(pts: Pt[]): string {
  const n = pts.length;
  let d = "";
  for (let i = 0; i < n - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? pts[i + 1];
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}

export function Ridgeline({ className = "" }: { className?: string }) {
  const [active, setActive] = useState<number | null>(null);
  const isTouch = useRef(false);
  const touchRevealed = useRef<number | null>(null);

  useEffect(() => {
    isTouch.current = window.matchMedia("(hover: none)").matches;
  }, []);

  const { lineD, fillD } = useMemo(() => {
    const first = PROFILE[0];
    const seg = ridgeSegments(PROFILE);
    return {
      lineD: `M ${first.x} ${first.y}${seg}`,
      fillD: `M 0 ${VB_H} L ${first.x} ${first.y}${seg} L ${VB_W} ${VB_H} Z`,
    };
  }, []);

  return (
    <div className={`pointer-events-none absolute inset-x-0 bottom-0 ${className}`}>
      <div className="relative h-[40vh] max-h-[300px] min-h-[180px] w-full">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          {/* Silhouette, a shade darker than the ink hero. */}
          <path d={fillD} fill="#0b1420" />
          {/* Thin haze stroke along the top of the ridge. */}
          <path
            d={lineD}
            fill="none"
            stroke="var(--color-haze)"
            strokeOpacity={0.5}
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Interactive summit dots + labels as HTML overlays. */}
        {SUMMITS.map((s, i) => {
          const isActive = active === i;
          return (
            <div
              key={s.name}
              className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${(s.x / VB_W) * 100}%`, top: `${(s.y / VB_H) * 100}%` }}
            >
              <div className="relative flex h-11 w-11 items-center justify-center">
                {/* Label (only one open at a time). */}
                <div
                  aria-hidden="true"
                  className={`absolute bottom-full mb-1 flex flex-col items-center whitespace-nowrap text-center transition-all duration-200 ${
                    isActive
                      ? "translate-y-0 opacity-100"
                      : "pointer-events-none translate-y-1 opacity-0"
                  }`}
                >
                  <span className="font-display text-[15px] font-semibold leading-tight text-snow">
                    {s.name}
                  </span>
                  <span className="font-sans text-[12px] leading-tight text-haze">
                    {s.altitude.toLocaleString("en-US")} m
                  </span>
                </div>

                <Link
                  href="/treks"
                  aria-label={`${s.name}, ${s.altitude.toLocaleString("en-US")} metres. Open trek guides.`}
                  className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full"
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive((c) => (c === i ? null : c))}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive((c) => (c === i ? null : c))}
                  onClick={(e) => {
                    // On touch, first tap reveals the label; a second tap follows the link.
                    if (isTouch.current && touchRevealed.current !== i) {
                      e.preventDefault();
                      setActive(i);
                      touchRevealed.current = i;
                    }
                  }}
                >
                  <span
                    className={`block rounded-full bg-marigold transition-all duration-200 ${
                      isActive
                        ? "h-3 w-3 -translate-y-1 shadow-[0_0_10px_2px_rgba(232,161,61,0.6)]"
                        : "h-2.5 w-2.5"
                    }`}
                  />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
