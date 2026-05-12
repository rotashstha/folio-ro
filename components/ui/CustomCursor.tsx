"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const reduced = useReducedMotion();
  const pathname = usePathname();

  // Clicking a data-cursor-trigger link unmounts the element mid-click before
  // mouseout fires, so the pill label stays. Reset it on every route change.
  useEffect(() => {
    setLabel(null);
    ringRef.current?.classList.remove("scale-[2.5]");
  }, [pathname]);

  useEffect(() => {
    if (reduced || !dotRef.current || !ringRef.current) return;

    document.documentElement.style.cursor = "none";

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let pillX = -100;
    let pillY = -100;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const loop = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
      }
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;
      }
      // Pill lags slightly more for an organic feel
      pillX += (mouseX - pillX) * 0.18;
      pillY += (mouseY - pillY) * 0.18;
      if (pillRef.current) {
        const w = pillRef.current.offsetWidth;
        const h = pillRef.current.offsetHeight;
        pillRef.current.style.transform = `translate(${pillX - w / 2}px, ${pillY - h / 2}px)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);

    // Generic interactive elements: scale the ring slightly
    const onEnter = () => ringRef.current?.classList.add("scale-[2.5]");
    const onLeave = () => ringRef.current?.classList.remove("scale-[2.5]");
    const interactives = document.querySelectorAll("a, button, [role='button']");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    // data-cursor-trigger="...": swap dot+ring for a labelled pill
    const onOver = (e: MouseEvent) => {
      const target = (e.target as Element | null)?.closest?.(
        "[data-cursor-trigger]",
      ) as HTMLElement | null;
      if (!target) return;
      setLabel(target.dataset.cursorTrigger ?? null);
    };
    const onOut = (e: MouseEvent) => {
      const target = (e.target as Element | null)?.closest?.(
        "[data-cursor-trigger]",
      ) as HTMLElement | null;
      if (!target) return;
      const related = e.relatedTarget as Node | null;
      if (related && target.contains(related)) return;
      setLabel(null);
    };
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
      document.documentElement.style.cursor = "";
    };
  }, [reduced]);

  if (reduced) return null;

  const labelActive = label !== null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 z-[9999] h-2 w-2 rounded-full bg-white mix-blend-difference transition-opacity duration-200 will-change-transform ${
          labelActive ? "opacity-0" : "opacity-100"
        }`}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 z-[9999] h-9 w-9 rounded-full border border-white mix-blend-difference transition-[transform,opacity] duration-200 will-change-transform ${
          labelActive ? "opacity-0 scale-0" : "opacity-100"
        }`}
      />
      <div
        ref={pillRef}
        aria-hidden="true"
        className={`font-body pointer-events-none fixed top-0 left-0 z-[9999] flex items-center justify-center rounded-full bg-white px-5 py-3 text-[12px] font-semibold tracking-[0.08em] text-black uppercase whitespace-nowrap transition-[opacity,scale] duration-200 will-change-transform ${
          labelActive ? "opacity-100 scale-100" : "opacity-0 scale-50"
        }`}
      >
        {label ?? ""}
      </div>
    </>
  );
}
