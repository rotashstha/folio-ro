"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { HeroCursorTrail } from "@/components/ui/HeroCursorTrail";
import { WordReveal } from "@/components/ui/WordReveal";
import { DraggableFigmaObject } from "@/components/ui/DraggableFigmaObject";
import { HERO_GLYPHS } from "@/components/ui/heroSvgPaths";

export interface HeroProps {
  name?: string;
  intro?: string;
  emphasis?: string;
}

export function Hero({
  name = "Rotash Shrestha",
  emphasis = "Lead product designer at Slalom.",
  intro = "12+ Years shipping B2C Websites, ERPs, DXR projects as Design Lead. I help teams find the sharpest problem, then ship the cleanest solution.",
}: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const typeRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const els = [typeRef.current, bodyRef.current].filter(Boolean) as HTMLElement[];
    // Set initial state
    els.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(28px)";
      el.style.transition = "none";
    });

    // Stagger reveal
    const timers = els.map((el, i) =>
      setTimeout(() => {
        el.style.transition = `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${i * 0.15}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${i * 0.15}s`;
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 100 + i * 150)
    );

    return () => timers.forEach(clearTimeout);
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      data-theme="dark"
      aria-label="Introduction"
      className="bg-ink relative overflow-hidden pt-[160px] pb-20 md:pt-[220px] md:pb-32"
    >
      <p className="sr-only">
        The hero words Strategy, Design, and Interaction are draggable. Tab to focus a word, then use arrow keys to nudge (Shift+arrow for larger steps), Escape to reset its position. With a pointer, click and drag to move; the word stays where you drop it.
      </p>
      {/* Image cursor trail — appears on mouse move */}
      <HeroCursorTrail />

      {/* Crosshatch grid backdrop */}
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />

      {/* Edge vignette to focus type */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.6)_100%)]"
        aria-hidden="true"
      />

      <div className="mx-auto flex w-full max-w-[1640px] flex-col px-6 md:px-14">
        <div
          ref={typeRef}
          className="relative mx-auto mt-4 flex w-full max-w-[880px] flex-col gap-1 text-white"
        >
          {HERO_GLYPHS.map((glyph, i) => {
            // Proportional widths: bbox width / original 879 viewBox width
            const widthPct = (glyph.w / 879) * 100;
            const justify =
              i === 0 ? "justify-start" : i === 1 ? "justify-end" : "justify-start";
            return (
              <div key={glyph.label} className={`flex ${justify}`}>
                <DraggableFigmaObject
                  label={glyph.label}
                  boundsRef={sectionRef}
                  defaultSelected={i === 0}
                  style={{ width: `${widthPct}%`, minWidth: "200px" }}
                >
                  <svg
                    viewBox={glyph.viewBox}
                    fill="currentColor"
                    aria-hidden="true"
                    style={{ display: "block", width: "100%", height: "auto" }}
                  >
                    <path d={glyph.d} />
                  </svg>
                </DraggableFigmaObject>
              </div>
            );
          })}
        </div>

        <div ref={bodyRef} className="mt-20 grid grid-cols-1 gap-8 md:mt-28 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="font-body max-w-[525px] text-white/95 text-xl leading-snug md:text-[24px] md:leading-[1.3]">
              <WordReveal>
                <span className="font-bold">{emphasis} </span>
                <span className="font-light">{intro}</span>
              </WordReveal>
            </p>
            <p className="font-body mt-8 text-lg font-semibold text-white md:mt-12 md:text-[24px]">
              {name}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
