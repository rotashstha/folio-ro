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
    if (!ref.current) return;
    // Skip on first load — PageLoader + Hero handle initial reveal
    if (typeof window === "undefined" || !window.__portfolioLoaded) return;

    if (pathname === HOME_PATH) {
      // Reset opacity so Hero's own animations take over cleanly
      gsap.set(ref.current, { opacity: 1, y: 0 });
      return;
    }

    if (reduced) {
      gsap.set(ref.current, { opacity: 1, y: 0 });
      return;
    }

    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.55, ease: "power2.out", clearProps: "all" }
    );
  }, [pathname, reduced]);

  return (
    <div ref={ref} id="page-content">
      {children}
    </div>
  );
}
