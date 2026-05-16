"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Image-trail cursor effect — matched to strangepixels.co.
 *
 * Key feel knobs that make this feel right (vs. time-only spawning):
 *  - DISTANCE_THRESHOLD: spawn after N px of cursor travel → dense pile
 *    when moving fast, sparse when slow. This is what gives the
 *    "trail of breadcrumbs" feel rather than a metronome.
 *  - MIN_GAP_MS: floor on spawn frequency so trembling cursors don't spam.
 *  - APPEAR scales 0.85 → 1 (subtle; bigger range looks like a bounce).
 *  - EXIT scales 1 → 1.06 + fades; the slight grow-on-exit reads as a
 *    soft "puff" rather than a hard cut.
 */

const TRAIL_IMAGES = [
  "/images/hero-elements/A-dollars.png",
  "/images/hero-elements/AI.avif",
  "/images/hero-elements/Nikon.png",
  "/images/hero-elements/Soccer-ball.png",
  "/images/hero-elements/bitcoin.png",
  "/images/hero-elements/ps.png",
  "/images/hero-elements/soccer-boat.png",
];

const DISTANCE_THRESHOLD = 70;   // px of travel before next spawn
const MIN_GAP_MS         = 40;   // floor on spawn frequency
const MAX_ACTIVE         = 14;   // cap simultaneous DOM nodes
const APPEAR_MS          = 220;  // scale-in + fade-in
const HOLD_MS            = 420;  // full opacity dwell
const EXIT_MS            = 850;  // fade-out + slight scale-up
const TOTAL_MS           = APPEAR_MS + HOLD_MS + EXIT_MS;
const IMG_HEIGHT         = 170;

interface TrailEntry {
  img: HTMLImageElement;
  startTime: number;
}

export function HeroCursorTrail() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const imgIdx      = useRef(0);
  const lastSpawnAt = useRef(0);
  const mouseX      = useRef(-9999);
  const mouseY      = useRef(-9999);
  const lastSpawnX  = useRef(-9999);
  const lastSpawnY  = useRef(-9999);

  useEffect(() => {
    if (reduced) return;
    const container = containerRef.current;
    if (!container) return;
    const section = container.parentElement as HTMLElement | null;
    if (!section) return;

    TRAIL_IMAGES.forEach((src) => { const p = new Image(); p.src = src; });

    const active: TrailEntry[] = [];
    let rafId = 0;

    const tick = (now: number) => {
      if (mouseX.current > -9000 && active.length < MAX_ACTIVE) {
        const dx = mouseX.current - lastSpawnX.current;
        const dy = mouseY.current - lastSpawnY.current;
        const dist = Math.hypot(dx, dy);

        const firstSpawn = lastSpawnX.current < -9000;
        const farEnough = firstSpawn || dist >= DISTANCE_THRESHOLD;
        const longEnough = now - lastSpawnAt.current >= MIN_GAP_MS;

        if (farEnough && longEnough) {
          const src = TRAIL_IMAGES[imgIdx.current % TRAIL_IMAGES.length];
          imgIdx.current++;

          const img = document.createElement("img");
          img.src = src;
          img.alt = "";
          img.draggable = false;

          Object.assign(img.style, {
            position:      "absolute",
            left:          `${mouseX.current}px`,
            top:           `${mouseY.current}px`,
            height:        `${IMG_HEIGHT}px`,
            width:         "auto",
            maxWidth:      "260px",
            objectFit:     "contain",
            borderRadius:  "8px",
            transform:     "translate(-50%, -50%) scale(0.85)",
            opacity:       "0",
            pointerEvents: "none",
            willChange:    "opacity, transform",
          });

          container.appendChild(img);
          active.push({ img, startTime: now });
          lastSpawnAt.current = now;
          lastSpawnX.current  = mouseX.current;
          lastSpawnY.current  = mouseY.current;
        }
      }

      for (let i = active.length - 1; i >= 0; i--) {
        const { img, startTime } = active[i];
        const elapsed = now - startTime;

        let opacity: number;
        let scale: number;

        if (elapsed < APPEAR_MS) {
          const t = elapsed / APPEAR_MS;
          const eased = 1 - Math.pow(1 - t, 3);
          scale   = 0.85 + eased * 0.15;
          opacity = eased;
        } else if (elapsed < APPEAR_MS + HOLD_MS) {
          scale   = 1;
          opacity = 1;
        } else {
          const t = (elapsed - APPEAR_MS - HOLD_MS) / EXIT_MS;
          const eased = t * t;
          scale   = 1 + t * 0.06;
          opacity = 1 - eased;
        }

        img.style.opacity   = String(Math.max(0, opacity));
        img.style.transform = `translate(-50%, -50%) scale(${scale})`;

        if (elapsed >= TOTAL_MS) {
          img.remove();
          active.splice(i, 1);
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    const onMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      mouseX.current = e.clientX - rect.left;
      mouseY.current = e.clientY - rect.top;
    };

    const onMouseLeave = () => {
      mouseX.current = -9999;
      mouseY.current = -9999;
    };

    section.addEventListener("mousemove", onMouseMove, { passive: true });
    section.addEventListener("mouseleave", onMouseLeave, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      section.removeEventListener("mousemove", onMouseMove);
      section.removeEventListener("mouseleave", onMouseLeave);
      container.innerHTML = "";
    };
  }, [reduced]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    />
  );
}
