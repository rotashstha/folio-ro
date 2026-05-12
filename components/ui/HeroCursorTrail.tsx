"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Image-trail cursor effect — inspired by strangepixels.co.
 *
 * As the mouse moves across the hero, project images appear at the cursor,
 * scale in, then fade out and scale up slightly — leaving a flowing trail.
 *
 * Images are created as DOM nodes (not React state) for maximum performance.
 * The component renders only an overflow-hidden container div; all trail
 * images are injected/removed imperatively.
 */

const TRAIL_IMAGES = [
  "/images/figma/Work/AWS.png",
  "/images/figma/Work/Atlas.png",
  "/images/figma/Work/IAG.png",
  "/images/figma/Work/bp.png",
  "/images/figma/Work/Carell.png",
];

/** Minimum px the cursor must travel before spawning the next image. */
const DISTANCE_THRESHOLD = 140;
/** How long (ms) the image stays at full opacity before fading out. */
const HOLD_MS = 380;
/** Duration (ms) of the fade-out + scale-up exit. */
const EXIT_MS = 550;

export function HeroCursorTrail() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const imgIdx = useRef(0);
  const lastX = useRef(0);
  const lastY = useRef(0);
  const seeded = useRef(false);

  useEffect(() => {
    if (reduced) return;
    const container = containerRef.current;
    if (!container) return;
    // The container is `absolute inset-0` inside the hero <section>
    const section = container.parentElement as HTMLElement | null;
    if (!section) return;

    const spawnImage = (x: number, y: number) => {
      const src = TRAIL_IMAGES[imgIdx.current % TRAIL_IMAGES.length];
      imgIdx.current++;

      const img = document.createElement("img");
      img.src = src;
      img.alt = "";
      img.draggable = false;

      Object.assign(img.style, {
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        width: "220px",
        height: "auto",
        maxHeight: "160px",
        objectFit: "cover",
        borderRadius: "6px",
        transform: "translate(-50%, -50%) scale(0.82)",
        opacity: "0",
        pointerEvents: "none",
        willChange: "opacity, transform",
        transition: `opacity 0.18s ease, transform 0.18s ease`,
        zIndex: "10",
      });

      container.appendChild(img);

      // Appear: scale up + fade in
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          img.style.opacity = "1";
          img.style.transform = "translate(-50%, -50%) scale(1)";
        })
      );

      // Exit: fade out + scale up slightly
      const exitTimer = setTimeout(() => {
        img.style.transition = `opacity ${EXIT_MS}ms ease, transform ${EXIT_MS}ms ease`;
        img.style.opacity = "0";
        img.style.transform = "translate(-50%, -50%) scale(1.1)";
        const removeTimer = setTimeout(() => img.remove(), EXIT_MS);
        return () => clearTimeout(removeTimer);
      }, HOLD_MS);

      return () => clearTimeout(exitTimer);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const dx = x - lastX.current;
      const dy = y - lastY.current;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (!seeded.current || dist >= DISTANCE_THRESHOLD) {
        lastX.current = x;
        lastY.current = y;
        seeded.current = true;
        spawnImage(x, y);
      }
    };

    section.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => {
      section.removeEventListener("mousemove", onMouseMove);
      // Clear any lingering images on unmount
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
