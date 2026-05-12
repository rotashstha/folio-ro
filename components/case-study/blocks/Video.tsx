"use client";

import { useEffect, useRef } from "react";
import { MaskReveal } from "@/components/ui/MaskReveal";
import { FadeReveal } from "@/components/ui/FadeReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { VideoBlock } from "@/types/case-study";

export function VideoBlockComponent({ block }: { block: VideoBlock }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const autoplay = block.autoplay !== false;

  useEffect(() => {
    if (reduced || !autoplay) return;
    const el = videoRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced, autoplay]);

  return (
    <section className="cs-section-tight">
      <div className="cs-container">
        <MaskReveal duration={1} className="relative w-full overflow-hidden">
          <div
            className="relative w-full"
            style={{ aspectRatio: block.aspect.replace("/", " / ") }}
          >
            <video
              ref={videoRef}
              src={block.src}
              poster={block.poster}
              muted={block.muted ?? true}
              loop={block.loop ?? true}
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </MaskReveal>
        {block.caption && (
          <FadeReveal y={12} delay={0.1}>
            <p className="cs-caption mt-4">{block.caption}</p>
          </FadeReveal>
        )}
      </div>
    </section>
  );
}
