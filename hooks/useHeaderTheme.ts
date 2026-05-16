"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export type HeaderTheme = "light" | "dark";

/**
 * Watches all [data-theme] sections with IntersectionObserver.
 * Returns "dark" when a dark-theme section dominates the viewport,
 * "light" when a light-theme section dominates.
 *
 * Re-initialises on every route change (usePathname dep) so client-side
 * navigation correctly picks up the new page's sections.
 * A rAF delay lets React finish committing the new DOM before we query.
 */
export function useHeaderTheme(): HeaderTheme {
  const [theme, setTheme] = useState<HeaderTheme>("dark");
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;
    let observer: IntersectionObserver | undefined;
    let themeObserver: MutationObserver | undefined;

    const init = () => {
      if (cancelled) return;

      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("[data-theme]")
      ).filter((el) => getComputedStyle(el).position !== "fixed");

      if (!sections.length) return;

      const ratioMap = new Map<Element, number>(
        sections.map((el) => [el, 0])
      );

      const pick = () => {
        if (cancelled) return;
        const rootTheme =
          document.documentElement.getAttribute("data-theme") ?? "dark";

        let dominantTheme: HeaderTheme = "dark";
        let highestRatio = 0;

        sections.forEach((el) => {
          const ratio = ratioMap.get(el) ?? 0;
          if (ratio > highestRatio) {
            highestRatio = ratio;
            const raw = el.dataset.theme as HeaderTheme;
            if (raw !== "dark" && raw !== "light") return;

            // Fixed sections are pinned to their own appearance — don't invert.
            const isFixed = el.hasAttribute("data-theme-fixed");
            const effective =
              !isFixed && rootTheme === "light"
                ? raw === "dark"
                  ? "light"
                  : "dark"
                : raw;

            dominantTheme = effective;
          }
        });

        if (highestRatio > 0) setTheme(dominantTheme);
      };

      // Re-run pick whenever the root data-theme attribute changes
      themeObserver = new MutationObserver(pick);
      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-theme"],
      });

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            ratioMap.set(entry.target, entry.intersectionRatio);
          });
          pick();
        },
        {
          threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        }
      );

      sections.forEach((el) => observer!.observe(el));
    };

    // Wait one rAF so React has committed the new page's DOM before querying
    const raf = requestAnimationFrame(init);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      observer?.disconnect();
      themeObserver?.disconnect();
    };
  }, [pathname]);

  return theme;
}
