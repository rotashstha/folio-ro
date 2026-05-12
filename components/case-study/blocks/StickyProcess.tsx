"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ensureScrollTrigger, gsap } from "@/lib/animation/gsap-bridge";
import type { StickyProcessBlock } from "@/types/case-study";

/**
 * Pinned narrative: media column stays fixed while text steps swap as
 * the user scrolls. GSAP ScrollTrigger pin is used here. When reduced
 * motion is on, falls back to a plain stacked layout (no pin).
 *
 * GSAP imports are allowed in this file. Do not propagate.
 */
export function StickyProcessBlockComponent({
  block,
}: {
  block: StickyProcessBlock;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    const stepsContainer = stepsRef.current;
    if (!section || !stepsContainer) return;
    const stepEls = Array.from(
      stepsContainer.querySelectorAll<HTMLElement>("[data-step]")
    );
    if (!stepEls.length) return;

    const ScrollTrigger = ensureScrollTrigger();
    const triggers: ScrollTrigger[] = [];

    stepEls.forEach((el, idx) => {
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: "top center",
        end: "bottom center",
        onToggle: (self) => {
          if (self.isActive) setActiveStep(idx);
        },
      });
      triggers.push(trigger);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [reduced, block.steps.length]);

  const activeMedia = block.steps[activeStep]?.media;

  return (
    <section
      ref={sectionRef}
      className="cs-section relative"
      aria-label="Process"
    >
      <div className="cs-container">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-6">
            <div className="md:sticky md:top-32">
              <div
                className="relative w-full overflow-hidden bg-paper/5"
                style={{ aspectRatio: "4 / 5" }}
              >
                {block.steps.map((step, i) => (
                  <div
                    key={i}
                    aria-hidden={i !== activeStep}
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{
                      opacity: i === activeStep ? 1 : 0,
                    }}
                  >
                    {step.media && (
                      <Image
                        src={step.media.src}
                        alt={step.media.alt}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                      />
                    )}
                  </div>
                ))}
                {!activeMedia && (
                  <div className="absolute inset-0 grid place-items-center opacity-30">
                    <span className="cs-eyebrow">No media for step</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div ref={stepsRef} className="md:col-span-6 space-y-32 md:space-y-48">
            {block.steps.map((step, i) => (
              <div
                key={i}
                data-step={i}
                className={`transition-opacity duration-500 ${
                  reduced || i === activeStep ? "opacity-100" : "opacity-50"
                }`}
              >
                <p className="cs-eyebrow text-accent-magenta">
                  {String(i + 1).padStart(2, "0")} · {step.eyebrow}
                </p>
                <h3 className="font-display mt-3 text-[clamp(2rem,3.6vw,3.5rem)] leading-tight">
                  {step.title}
                </h3>
                <p className="font-body mt-5 text-[clamp(1rem,1.2vw,1.15rem)] leading-relaxed opacity-85">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
