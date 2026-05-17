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

    // Hand control back to the page's own reveal (and clear any residual inline
    // transform from a prior route's tween). Leaving a `translate(0,0)` here
    // creates a CSS containing block that breaks `position: fixed` on the
    // footer — see Footer's peel-into-view reveal in app/page.tsx.
    if (pathname === HOME_PATH || reduced) {
      gsap.set(el, { clearProps: "all" });
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
