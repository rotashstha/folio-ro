"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/animation/gsap-bridge";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const HOME_PATH = "/";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.__portfolioLoaded) return;

    // Reset opacity so Hero's own animations take over, or skip animation for reduced motion
    if (pathname === HOME_PATH || reduced) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    const tween = gsap.fromTo(
      el,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.55, ease: "power2.out", clearProps: "all" }
    );
    return () => { tween.kill(); };
  }, [pathname, reduced]);

  return (
    <div ref={ref} id="page-content">
      {children}
    </div>
  );
}
