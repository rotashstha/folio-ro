"use client";

import { useEffect, useState } from "react";
import { useHeaderTheme } from "@/hooks/useHeaderTheme";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { scrollToElement } from "@/lib/lenis-instance";

/**
 * Right-edge section scrubber: one horizontal tick per top-level section of
 * the case study. No labels — the active section's tick widens and brightens.
 * Click a tick to smooth-scroll to that section.
 */
export function SectionRail() {
  const isDark = useHeaderTheme() === "dark";
  const reduced = useReducedMotion();
  const [sections, setSections] = useState<HTMLElement[]>([]);
  const [active, setActive] = useState(0);

  // Collect top-level sections (skip sections nested inside another section).
  useEffect(() => {
    const root = document.querySelector("[data-cs-root]");
    if (!root) return;
    const found = Array.from(root.querySelectorAll("section")).filter(
      (s) => !s.parentElement?.closest("section")
    ) as HTMLElement[];
    setSections(found);
  }, []);

  // Active = the section crossing the viewport's vertical center.
  useEffect(() => {
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = sections.indexOf(entry.target as HTMLElement);
          if (idx !== -1) setActive(idx);
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [sections]);

  if (sections.length < 2) return null;

  return (
    <nav
      aria-label="Sections"
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 md:flex"
    >
      {sections.map((section, i) => {
        const isActive = i === active;
        return (
          <button
            key={i}
            type="button"
            onClick={() => scrollToElement(section, reduced)}
            aria-label={`Go to section ${i + 1}`}
            aria-current={isActive ? "true" : undefined}
            className="group flex h-3 items-center"
          >
            <span
              className={`h-px rounded-full transition-all duration-300 ${
                isActive
                  ? isDark
                    ? "w-8 bg-white"
                    : "w-8 bg-black"
                  : isDark
                    ? "w-4 bg-white/30 group-hover:w-6 group-hover:bg-white/60"
                    : "w-4 bg-black/25 group-hover:w-6 group-hover:bg-black/50"
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
}
