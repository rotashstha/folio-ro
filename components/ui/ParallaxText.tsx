"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ParallaxTextProps {
  children: React.ReactNode;
  speed?: number; // 0–1, fraction of scroll to apply as y offset
  className?: string;
}

export function ParallaxText({ children, speed = 0.35, className }: ParallaxTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced || window.innerWidth < 768) return;

    // Cache the element's absolute document position once; update on resize.
    // Using offsetTop avoids calling getBoundingClientRect() on every scroll frame.
    let elementAbsTop = el.getBoundingClientRect().top + window.scrollY;

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const distFromBottom = elementAbsTop - window.scrollY - window.innerHeight;
        el.style.transform = `translateY(${distFromBottom * speed}px)`;
        ticking = false;
      });
    };

    const onResize = () => {
      elementAbsTop = el.getBoundingClientRect().top + window.scrollY;
      onScroll();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [reduced, speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
