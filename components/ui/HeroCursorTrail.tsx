"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Cursor trail — exact replica of strangepixels.co.
 *
 * Approach: all images pre-rendered hidden in DOM. On mousemove, when
 * |dx| >= 35 || |dy| >= 35 (their exact threshold), cycle to the next
 * image and place it at the cursor. Previous images stay at their last
 * position (building the trail). No animation — images appear/disappear
 * instantly via display:block/none and z-index cycling.
 */

const TRAIL_IMAGES = [
  "/images/hero-elements/AI.avif",
  "/images/hero-elements/Nikon.png",
  "/images/hero-elements/Soccer-ball.png",
  "/images/hero-elements/bitcoin.png",
  "/images/hero-elements/ps.png",
  "/images/hero-elements/soccer-b.png",
  "/images/hero-elements/mac.png",
];

const DISTANCE_THRESHOLD = 35;

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function HeroCursorTrail() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const currentIdx = useRef(-1);
  const lastPos = useRef({ x: 0, y: 0 });
  const zCounter = useRef(0);

  // Shuffle after mount — must not run on server to avoid hydration mismatch
  const [images, setImages] = useState<string[]>([]);
  useEffect(() => {
    setImages(shuffleArray(TRAIL_IMAGES));
  }, []);

  useEffect(() => {
    if (reduced) return;
    const container = containerRef.current;
    if (!container) return;
    const section = container.parentElement as HTMLElement | null;
    if (!section) return;

    const onMouseMove = (e: MouseEvent) => {
      const dx = Math.abs(lastPos.current.x - e.pageX);
      const dy = Math.abs(lastPos.current.y - e.pageY);

      if (dx < DISTANCE_THRESHOLD && dy < DISTANCE_THRESHOLD) return;

      const imgs = imgRefs.current.filter(Boolean) as HTMLImageElement[];
      if (!imgs.length) return;

      const rect = container.getBoundingClientRect();
      const containerTop = rect.top + window.scrollY;

      let nextIdx = currentIdx.current + 1;
      if (nextIdx >= imgs.length) nextIdx = 0;
      currentIdx.current = nextIdx;

      const img = imgs[nextIdx];
      img.style.display = "block";
      img.style.top = `${e.pageY - containerTop}px`;
      img.style.left = `${e.pageX - rect.left}px`;
      img.style.zIndex = String(++zCounter.current);

      lastPos.current = { x: e.pageX, y: e.pageY };
    };

    section.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => {
      section.removeEventListener("mousemove", onMouseMove);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {images.map((src, i) => (
        <img
          key={src}
          ref={(el) => {
            imgRefs.current[i] = el;
          }}
          src={src}
          alt=""
          draggable={false}
          style={{
            display: "none",
            position: "absolute",
            height: "140px",
            width: "auto",
            pointerEvents: "none",
            transform: "translateY(-50%) translateX(-50%)",
          }}
        />
      ))}
    </div>
  );
}
