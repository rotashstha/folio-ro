"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MaskReveal } from "@/components/ui/MaskReveal";
import type { BeforeAfterBlock } from "@/types/case-study";

export function BeforeAfterBlockComponent({
  block,
}: {
  block: BeforeAfterBlock;
}) {
  const reduced = useReducedMotion();
  const isToggle = block.mode === "toggle" || reduced;
  const [showAfter, setShowAfter] = useState(false);
  const [position, setPosition] = useState(50);
  const wrapRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const aspect = (block.aspect ?? "16/9").replace("/", " / ");

  const setFromClientX = useCallback((clientX: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, pct)));
  }, []);

  useEffect(() => {
    if (isToggle) return;
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!draggingRef.current) return;
      const clientX =
        "touches" in e ? e.touches[0]?.clientX : (e as MouseEvent).clientX;
      if (typeof clientX === "number") setFromClientX(clientX);
    };
    const onUp = () => {
      draggingRef.current = false;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, [isToggle, setFromClientX]);

  return (
    <section className="cs-section-tight">
      <div className="cs-container">
        <MaskReveal duration={1} className="relative w-full overflow-hidden">
          <div
            ref={wrapRef}
            className="relative w-full select-none"
            style={{ aspectRatio: aspect }}
            role={isToggle ? undefined : "slider"}
            aria-valuemin={isToggle ? undefined : 0}
            aria-valuemax={isToggle ? undefined : 100}
            aria-valuenow={isToggle ? undefined : Math.round(position)}
            aria-label="Before / after comparison"
            tabIndex={isToggle ? -1 : 0}
            onKeyDown={(e) => {
              if (isToggle) return;
              if (e.key === "ArrowLeft") setPosition((p) => Math.max(0, p - 5));
              if (e.key === "ArrowRight")
                setPosition((p) => Math.min(100, p + 5));
            }}
          >
            <Image
              src={block.before.src}
              alt={block.before.alt}
              fill
              sizes="(min-width: 1280px) 1280px, 100vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0 overflow-hidden"
              style={{
                clipPath: isToggle
                  ? showAfter
                    ? "inset(0 0 0 0)"
                    : "inset(0 100% 0 0)"
                  : `inset(0 ${100 - position}% 0 0)`,
                transition: isToggle
                  ? "clip-path 0.5s var(--cs-ease-out)"
                  : "none",
              }}
            >
              <Image
                src={block.after.src}
                alt={block.after.alt}
                fill
                sizes="(min-width: 1280px) 1280px, 100vw"
                className="object-cover"
              />
            </div>
            {!isToggle && (
              <div
                className="cs-ba-handle"
                style={{ left: `${position}%`, pointerEvents: "auto" }}
                onMouseDown={() => {
                  draggingRef.current = true;
                }}
                onTouchStart={() => {
                  draggingRef.current = true;
                }}
              />
            )}
          </div>
        </MaskReveal>
        {isToggle && (
          <button
            type="button"
            onClick={() => setShowAfter((v) => !v)}
            className="font-sans mt-4 inline-flex text-sm tracking-widest uppercase opacity-80 hover:text-accent-magenta hover:opacity-100"
          >
            {showAfter ? "Show before" : "Show after"}
          </button>
        )}
      </div>
    </section>
  );
}
