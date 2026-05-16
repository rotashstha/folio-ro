"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASING_SPRING } from "@/lib/animation/constants";

interface LineRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function LineReveal({ children, className, delay = 0 }: LineRevealProps) {
  const lineRef = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const line = lineRef.current;
    if (!line || reduced) {
      if (line) line.style.transform = "scaleX(1)";
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setTimeout(() => {
          line.style.transition = `transform 0.6s ${EASING_SPRING}`;
          line.style.transform = "scaleX(1)";
        }, delay * 1000);
      },
      { threshold: 0.3 }
    );

    observer.observe(line);
    return () => observer.disconnect();
  }, [delay, reduced]);

  return (
    <div className={`relative pb-px ${className ?? ""}`}>
      {children}
      <span
        ref={lineRef}
        aria-hidden
        style={{ transform: "scaleX(0)", transformOrigin: "left" }}
        className="absolute bottom-0 left-0 h-px w-full bg-accent-magenta"
      />
    </div>
  );
}
