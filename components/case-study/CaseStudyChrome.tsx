"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Wraps every /work/[slug] page. Provides:
 * - data-cs-root + data-theme on the outer wrapper (page.tsx sets the theme)
 * - a thin top reading-progress bar driven by document scroll
 * - graceful reduced-motion fallback (static bar)
 *
 * This is a client component because it hosts the scroll listener.
 * Theme is delegated to the page so server-rendered metadata picks it up.
 */
export function CaseStudyChrome({ children }: { children: React.ReactNode }) {
  const fillRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const fill = fillRef.current;
    if (!fill) return;

    let raf = 0;
    // Use transform: scaleX instead of width — scaleX is GPU-composited and
    // doesn't trigger layout/paint on every scroll frame.
    fill.style.width = "100%";
    fill.style.transformOrigin = "left center";
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const progress = max > 0 ? Math.min(1, doc.scrollTop / max) : 0;
      fill.style.transform = `scaleX(${progress})`;
      raf = 0;
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <>
      <div className="cs-progress" aria-hidden>
        <div ref={fillRef} className="cs-progress__fill" />
      </div>
      {children}
    </>
  );
}
