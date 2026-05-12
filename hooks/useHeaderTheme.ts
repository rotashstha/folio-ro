"use client";

import { useEffect, useState } from "react";

export type HeaderTheme = "light" | "dark";

/**
 * Watches all [data-theme] sections with IntersectionObserver.
 * Returns "dark" when a dark-theme section dominates the viewport,
 * "light" when a light-theme section dominates.
 *
 * Uses a Map to accumulate every section's current intersection ratio
 * (the observer fires only changed entries per batch, so we must keep
 * the latest ratio for all sections ourselves). The section with the
 * highest ratio wins; ties go to the topmost section in DOM order.
 *
 * threshold: 0.1 — fires as soon as 10 % of a section enters the
 * viewport, keeping the header colour in sync even for very tall
 * sections (e.g. SectionTransition at calc(100vh + 200px)).
 */
export function useHeaderTheme(): HeaderTheme {
  const [theme, setTheme] = useState<HeaderTheme>("dark");

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-theme]")
    ).filter((el) => getComputedStyle(el).position !== "fixed");
    if (!sections.length) return;

    // Map: element → latest intersection ratio
    const ratioMap = new Map<Element, number>(
      sections.map((el) => [el, 0])
    );

    const pick = () => {
      let dominantTheme: HeaderTheme = "dark";
      let highestRatio = 0;

      // Iterate in DOM order so ties resolve to the topmost section
      sections.forEach((el) => {
        const ratio = ratioMap.get(el) ?? 0;
        if (ratio > highestRatio) {
          highestRatio = ratio;
          const t = el.dataset.theme as HeaderTheme;
          if (t === "dark" || t === "light") dominantTheme = t;
        }
      });

      if (highestRatio > 0) setTheme(dominantTheme);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratioMap.set(entry.target, entry.intersectionRatio);
        });
        pick();
      },
      {
        // Fire at many points across the range so large sections
        // (e.g. SectionTransition) still update the header promptly.
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return theme;
}
