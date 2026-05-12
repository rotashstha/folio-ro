"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/**
 * Ensures GSAP ScrollTrigger is registered exactly once.
 * Safe to call from multiple components — the second call is a no-op.
 *
 * GSAP imports are deliberately scoped to this module + the three
 * components that need pin/scrub:
 *   - components/case-study/blocks/StickyProcess.tsx
 *   - components/case-study/MediaScrub.tsx
 *   - components/case-study/NextProject.tsx
 * Do not import GSAP elsewhere.
 */
export function ensureScrollTrigger(): typeof ScrollTrigger {
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return ScrollTrigger;
}

/**
 * Drives ScrollTrigger updates from window scroll. We don't bind directly
 * to Lenis here — Lenis already drives the native scroll position via raf,
 * and ScrollTrigger listens to native scroll by default. We only need to
 * force a refresh on resize, which ScrollTrigger handles itself.
 *
 * If we later swap to a custom scroller (e.g. CSS scroll-container), we'd
 * wire `ScrollTrigger.scrollerProxy` here.
 */
export function refreshScrollTrigger(): void {
  ScrollTrigger.refresh();
}

export { gsap };
