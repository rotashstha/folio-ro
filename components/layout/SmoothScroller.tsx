"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { lenisInstance } from "@/lib/lenis-instance";

export function SmoothScroller({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const reduced = useReducedMotion();
  const pathname = usePathname();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      // `lerp` gives a snappier, framerate-friendly feel than `duration` —
      // each frame eases toward the target by 10% (lower = smoother but
      // laggier; higher = snappier). 0.1 is a good balance.
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;
    lenisInstance.current = lenis;

    let raf: number;
    function loop(time: number) {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
      lenisInstance.current = null;
    };
  }, [reduced]);

  // Lenis owns the scroll position and survives route changes, so Next.js's
  // default scroll-to-top doesn't take effect. Force it on every pathname
  // change — but if the URL carries a hash (e.g. /#work), scroll to that
  // element instead so in-page anchors still work after a route navigation.
  useEffect(() => {
    const settle = requestAnimationFrame(() => {
      const id = window.location.hash.slice(1);
      const target = id ? document.getElementById(id) : null;

      if (target) {
        if (reduced) {
          (target as HTMLElement).scrollIntoView({
            behavior: "instant",
            block: "start",
          });
        } else {
          lenisRef.current?.scrollTo(target as HTMLElement, {
            immediate: true,
            force: true,
          });
        }
        return;
      }

      if (reduced) {
        window.scrollTo(0, 0);
      } else {
        lenisRef.current?.scrollTo(0, { immediate: true, force: true });
      }
    });
    return () => cancelAnimationFrame(settle);
  }, [pathname, reduced]);

  return <>{children}</>;
}
