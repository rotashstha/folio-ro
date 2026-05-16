"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "./useReducedMotion";
import { EASING_SPRING } from "@/lib/animation/constants";

interface RevealOptions {
  y?: number;
  delay?: number;
  duration?: number;
  threshold?: number;
}

export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  options: RevealOptions = {}
) {
  const { y = 32, delay = 0, duration = 0.8, threshold = 0.15 } = options;
  const ref = useRef<T>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    el.style.opacity = "0";
    el.style.transform = `translateY(${y}px)`;
    el.style.transition = "none";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        requestAnimationFrame(() => {
          el.style.transition = `opacity ${duration}s ${EASING_SPRING} ${delay}s, transform ${duration}s ${EASING_SPRING} ${delay}s`;
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        });
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced, y, delay, duration, threshold]);

  return ref;
}
