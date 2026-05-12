"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FadeReveal } from "@/components/ui/FadeReveal";

const BRAND_TILES = [
  {
    name: "IAG",
    label: "IAG",
    src: "/images/work/iag/iag.png",
    href: "https://www.iag.com.au",
  },
  {
    name: "NRMA",
    label: "NRMA Insurance",
    src: "/images/work/iag/nrma.png",
    href: "https://www.nrma.com.au",
  },
  {
    name: "CGU",
    label: "CGU Insurance",
    src: "/images/work/iag/cgu.png",
    href: "https://www.cgu.com.au",
  },
  {
    name: "AMI",
    label: "AMI",
    src: "/images/work/iag/ami.png",
    href: "https://www.ami.co.nz",
  },
  {
    name: "State",
    label: "State Insurance",
    src: "/images/work/iag/state.png",
    href: "https://www.state.co.nz",
  },
];

/**
 * Dock — the visual brand strip used in two places:
 *   1. inline in the page (between hero and meta)
 *   2. as a fixed pinned copy that drops in once the inline copy has
 *      scrolled out of view.
 * Hover/focus behaviour modelled on mariavareva.com (.framer-W0dUx):
 * gray indicator dot beneath each tile in rest state morphs into a
 * pill tooltip above the tile on hover, with a lift + scale.
 */
function Dock({ pinned = false }: { pinned?: boolean }) {
  return (
    <div
      className={`flex w-fit items-end gap-3 rounded-[24px] bg-[#0f0f0f] px-4 py-3 md:px-5 ${
        pinned ? "shadow-[0_20px_48px_-12px_rgba(0,0,0,0.6)]" : "mx-auto"
      }`}
    >
      {BRAND_TILES.map((tile) => (
        <a
          key={tile.name}
          href={tile.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${tile.label} (opens in a new tab)`}
          className="group relative block focus-visible:outline-none"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[calc(100%+10px)] left-1/2 z-10 -translate-x-1/2 translate-y-1 scale-95 rounded-full bg-[#1a1a1a] px-4 py-2 text-[12px] leading-none font-medium whitespace-nowrap text-white opacity-0 shadow-[0_8px_24px_rgba(0,0,0,0.4)] transition-[opacity,transform] duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:scale-100 group-focus-visible:opacity-100"
          >
            {tile.label}
          </span>
          <span className="relative block h-[48px] w-[48px] shrink-0 overflow-hidden rounded-[14px] transition-transform duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:-translate-y-[6px] group-hover:scale-[1.1] group-focus-visible:-translate-y-[6px] group-focus-visible:scale-[1.1] group-focus-visible:ring-2 group-focus-visible:ring-accent-magenta group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-[#0f0f0f] sm:h-[60px] sm:w-[60px] sm:rounded-[16px] md:h-[70px] md:w-[70px] md:rounded-[20px]">
            <Image
              src={tile.src}
              alt=""
              fill
              sizes="70px"
              className="object-cover"
            />
          </span>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-[calc(100%+4px)] left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-[#828282] opacity-100 transition-opacity duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-0 group-focus-visible:opacity-0"
          />
        </a>
      ))}
    </div>
  );
}

/**
 * BrandStrip — renders the inline dock and a fixed bottom dock that fades
 * in once the inline copy has scrolled past, and fades out again when
 * the Next Project section enters the viewport (so it doesn't fight the
 * footer reveal).
 */
export function BrandStrip() {
  const inlineRef = useRef<HTMLDivElement | null>(null);
  const [pinnedVisible, setPinnedVisible] = useState(false);
  const [nearBottom, setNearBottom] = useState(false);

  useEffect(() => {
    const el = inlineRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        // Show the pinned dock only when the inline copy has scrolled
        // ABOVE the viewport (i.e. user has passed it on the way down).
        if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
          setPinnedVisible(true);
        } else if (entry.isIntersecting) {
          setPinnedVisible(false);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const next = document.querySelector('[aria-label="Next project"]');
    if (!next) return;
    const io = new IntersectionObserver(
      ([entry]) => setNearBottom(entry.isIntersecting),
      { threshold: 0.15 },
    );
    io.observe(next);
    return () => io.disconnect();
  }, []);

  const showPinned = pinnedVisible && !nearBottom;

  return (
    <>
      <div ref={inlineRef}>
        <FadeReveal y={20} delay={0.05}>
          <Dock />
        </FadeReveal>
      </div>

      <div
        aria-hidden={!showPinned}
        inert={!showPinned}
        className={`pointer-events-none fixed inset-x-0 bottom-6 z-40 flex justify-center px-4 transition-[opacity,transform] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] md:bottom-8 ${
          showPinned
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-6 opacity-0"
        }`}
      >
        <div className={showPinned ? "pointer-events-auto" : ""}>
          <Dock pinned />
        </div>
      </div>
    </>
  );
}
