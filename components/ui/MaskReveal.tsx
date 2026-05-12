"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface MaskRevealProps {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  /** seconds before the inner translation starts */
  delay?: number;
  /** seconds for the translation */
  duration?: number;
  /** 0–1 viewport portion required before firing */
  threshold?: number;
  /** outer wrapper element; the inner is always a div */
  as?: ElementType;
}

export function MaskReveal({
  children,
  className,
  innerClassName,
  delay = 0,
  duration = 0.9,
  threshold = 0.2,
  as: Tag = "div",
}: MaskRevealProps) {
  const wrapRef = useRef<HTMLElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;

    if (reduced) {
      inner.style.transform = "translateY(0)";
      return;
    }

    inner.style.transform = "translateY(100%)";
    inner.style.transition = "none";

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        requestAnimationFrame(() => {
          inner.style.transition = `transform ${duration}s cubic-bezier(0.65, 0.05, 0, 1) ${delay}s`;
          inner.style.transform = "translateY(0)";
        });
      },
      { threshold },
    );

    io.observe(wrap);
    return () => io.disconnect();
  }, [delay, duration, threshold, reduced]);

  const Comp = Tag as ElementType;
  return (
    <Comp
      ref={wrapRef as never}
      className={`overflow-hidden ${className ?? ""}`}
      style={{ display: "block" }}
    >
      <div
        ref={innerRef}
        className={innerClassName}
        style={{ willChange: "transform" }}
      >
        {children}
      </div>
    </Comp>
  );
}
