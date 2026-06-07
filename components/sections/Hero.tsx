"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { HeroCursorTrail } from "@/components/ui/HeroCursorTrail";
import { WordReveal } from "@/components/ui/WordReveal";
import { DraggableFigmaObject } from "@/components/ui/DraggableFigmaObject";
import { HERO_GLYPHS } from "@/components/ui/heroSvgPaths";
import { ShowReelButton } from "@/components/ui/ShowReelButton";
import { EASING_SPRING, PORTFOLIO_LOADED_EVENT } from "@/lib/animation/constants";

export interface HeroProps {
  name?: string;
  intro?: string;
  emphasis?: string;
}

export function Hero({
  name = "Rotash Shrestha",
  emphasis = "Lead, Design & Strategy at DEPT® Agency.",
  intro = "12+\u00A0Years shipping B2C Websites, ERPs, DXR projects as Design Lead. I help teams find the sharpest problem, then ship the cleanest solution.",
}: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const typeRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const els = [typeRef.current, bodyRef.current].filter(Boolean) as HTMLElement[];

    if (reduced) {
      els.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      });
      return;
    }

    const alreadyLoaded = window.__portfolioLoaded === true;

    els.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(28px)";
      el.style.transition = "none";
    });

    const timers: ReturnType<typeof setTimeout>[] = [];

    const reveal = () => {
      els.forEach((el, i) => {
        timers.push(
          setTimeout(() => {
            el.style.transition = `opacity 0.9s ${EASING_SPRING} ${i * 0.15}s, transform 0.9s ${EASING_SPRING} ${i * 0.15}s`;
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }, i * 150)
        );
      });
    };

    if (alreadyLoaded) {
      const rafId = requestAnimationFrame(reveal);
      return () => {
        cancelAnimationFrame(rafId);
        timers.forEach(clearTimeout);
      };
    }

    window.addEventListener(PORTFOLIO_LOADED_EVENT, reveal, { once: true });

    return () => {
      window.removeEventListener(PORTFOLIO_LOADED_EVENT, reveal);
      timers.forEach(clearTimeout);
    };
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      data-theme="dark"
      aria-label="Introduction"
      className="bg-ink relative flex h-screen min-h-[760px] flex-col overflow-hidden pt-[160px] pb-6 md:pt-[116px] md:pb-10 xl:pt-[132px] xl:pb-10 2xl:pt-[clamp(100px,calc(100vh_-_656px),220px)] 2xl:pb-8"
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
        className="hero-vignette pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.6)_100%)]"
        aria-hidden="true"
      />

      <div className="flex w-full flex-1 flex-col px-6">
        <div className="flex-1" aria-hidden="true" />
        <div
          ref={typeRef}
          className="relative mx-auto flex w-full max-w-[880px] flex-col gap-1 text-paper md:max-w-[500px] lg:max-w-[620px] xl:max-w-[600px] wide:max-w-[700px]"
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

        <div className="flex-1" aria-hidden="true" />
        <div ref={bodyRef} className="grid grid-cols-1 items-end gap-8 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="font-body max-w-[420px] text-paper/95 text-xl leading-snug md:text-[20px] md:leading-[1.3]">
              <WordReveal>
                <span className="font-bold">{emphasis} </span>
                <span className="font-light">{intro}</span>
              </WordReveal>
            </p>
            <p className="font-body mt-6 text-[20px] font-semibold text-paper md:mt-8">
              {name}
            </p>
          </div>
          <div className="flex justify-end md:col-span-6">
            <ShowReelButton />
          </div>
        </div>
      </div>
    </section>
  );
}
