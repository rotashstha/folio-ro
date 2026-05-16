"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/animation/gsap-bridge";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// p2 fill finishes at 0.78s delay + 0.35s duration = 1.13s.
// Hold for a beat before wiping.
const ANIM_DONE_MS = 1400;

export function PageLoader() {
  const [isVisible, setIsVisible] = useState(true);
  const overlayRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    if (reduced) {
      window.__portfolioLoaded = true;
      window.dispatchEvent(new CustomEvent("portfolio-loaded"));
      setIsVisible(false);
      return;
    }

    const timer = setTimeout(() => {
      window.__portfolioLoaded = true;
      window.dispatchEvent(new CustomEvent("portfolio-loaded"));

      gsap.to(overlay, {
        clipPath: "inset(100% 0 0 0)",
        duration: 1.15,
        ease: "power4.inOut",
        onComplete: () => setIsVisible(false),
      });
    }, ANIM_DONE_MS);

    return () => clearTimeout(timer);
  }, [reduced]);

  if (!isVisible) return null;

  return (
    <div
      ref={overlayRef}
      style={{ clipPath: "inset(0 0 0 0)" }}
      className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Identical keyframes + classes as LogoMark in the header */}
      <style>{`
        @keyframes logo-draw {
          to { stroke-dashoffset: 0; }
        }
        @keyframes logo-fill {
          to { fill-opacity: 1; }
        }
        .loader-p1 {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          fill-opacity: 0;
          animation:
            logo-draw 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards 0.05s,
            logo-fill 0.35s ease forwards 0.65s;
        }
        .loader-p2 {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          fill-opacity: 0;
          animation:
            logo-draw 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards 0.18s,
            logo-fill 0.35s ease forwards 0.78s;
        }
      `}</style>
      <svg
        viewBox="0 0 51.4491 51"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width={96}
        height={96}
        aria-hidden
      >
        <path
          className="loader-p1"
          pathLength={1}
          d="M7.49047 11.741L0.874454 0.5H43.7442L50.8745 13.0899L46.3926 21.0035H33.2958L38.5416 11.741H7.49047Z"
          fill="white"
          stroke="white"
          strokeWidth="0.8"
        />
        <path
          className="loader-p2"
          pathLength={1}
          d="M22.9278 15.0684L16.5765 25.7699L30.2495 50.5H43.2169L22.9278 15.0684Z"
          fill="white"
          stroke="white"
          strokeWidth="0.8"
        />
      </svg>
    </div>
  );
}
