"use client";

import { useEffect, useRef, useState } from "react";
import type { gsap as GsapType } from "gsap";
import { gsap } from "@/lib/animation/gsap-bridge";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function PageLoader() {
  const [isVisible, setIsVisible] = useState(true);
  const overlayRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const overlay = overlayRef.current;
    const counterEl = counterRef.current;

    if (!overlay || !counterEl) return;

    if (reduced) {
      window.__portfolioLoaded = true;
      window.dispatchEvent(new CustomEvent("portfolio-loaded"));
      setIsVisible(false);
      return;
    }

    let intervalId: ReturnType<typeof setInterval> | null = null;
    let dispatchTimeout: ReturnType<typeof setTimeout> | null = null;
    let count = 0;
    const tweens: ReturnType<typeof GsapType.to>[] = [];

    tweens.push(
      gsap.to(counterEl, {
        y: "0%",
        duration: 0.8,
        ease: "expo.out",
        delay: 0.3,
        onComplete: () => {
          intervalId = setInterval(() => {
            counterEl.textContent = String(++count);
            if (count >= 100) {
              if (intervalId) clearInterval(intervalId);
              setTimeout(() => {
                tweens.push(
                  gsap.to(counterEl, {
                    y: "-110%",
                    duration: 0.8,
                    ease: "power3.inOut",
                    onStart: () => {
                      dispatchTimeout = setTimeout(() => {
                        window.__portfolioLoaded = true;
                        window.dispatchEvent(new CustomEvent("portfolio-loaded"));
                      }, 300);
                      tweens.push(
                        gsap.to(overlay, {
                          clipPath: "inset(100% 0 0 0)",
                          duration: 1.2,
                          ease: "power4.inOut",
                          delay: 0.3,
                          onComplete: () => setIsVisible(false),
                        })
                      );
                    },
                  })
                );
              }, 400);
            }
          }, 16);
        },
      })
    );

    return () => {
      if (intervalId) clearInterval(intervalId);
      if (dispatchTimeout) clearTimeout(dispatchTimeout);
      tweens.forEach((t) => t.kill());
    };
  }, [reduced]);

  if (!isVisible) return null;

  return (
    <div
      ref={overlayRef}
      style={{ clipPath: "inset(0 0 0 0)" }}
      className="bg-ink fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden"
    >
      <div
        className="overflow-hidden"
        style={{
          fontSize: "64px",
          lineHeight: 1,
          height: "1em",
        }}
      >
        <p
          ref={counterRef}
          style={{
            fontSize: "inherit",
            fontFamily: "var(--font-body)",
            fontWeight: 800,
            color: "var(--color-paper)",
            transform: "translateY(100%)",
            lineHeight: 1,
            margin: 0,
            userSelect: "none",
          }}
        >
          0
        </p>
      </div>
    </div>
  );
}
