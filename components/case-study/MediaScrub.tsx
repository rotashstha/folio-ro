"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ensureScrollTrigger, gsap } from "@/lib/animation/gsap-bridge";

interface MediaScrubProps {
  children: React.ReactNode;
  className?: string;
  /** Range of scale to traverse from start → end of trigger. */
  scaleFrom?: number;
  scaleTo?: number;
}

/**
 * Wraps a media element and ties its scale to scroll progress via
 * GSAP ScrollTrigger. Disabled when reduced-motion is requested.
 *
 * GSAP is allowed to be imported here. Do not propagate this import.
 */
export function MediaScrub({
  children,
  className,
  scaleFrom = 1.12,
  scaleTo = 1,
}: MediaScrubProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = wrapRef.current;
    if (!el) return;

    const ScrollTrigger = ensureScrollTrigger();

    const tween = gsap.fromTo(
      el,
      { scale: scaleFrom },
      {
        scale: scaleTo,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      ScrollTrigger.refresh();
    };
  }, [reduced, scaleFrom, scaleTo]);

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{ willChange: "transform", transformOrigin: "center" }}
    >
      {children}
    </div>
  );
}
