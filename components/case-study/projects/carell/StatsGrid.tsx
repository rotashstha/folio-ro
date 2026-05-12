"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface StatItem {
  eyebrow: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  caption: string;
  highlight?: boolean;
  /** When true, the value is shown as-is (e.g. "1") with a fade-in instead of count-up. */
  staticValue?: boolean;
}

const STATS: StatItem[] = [
  {
    eyebrow: "User impact",
    value: 21.9,
    suffix: "%",
    decimals: 1,
    caption: "increase in quote-to-confirm conversion.",
  },
  {
    eyebrow: "Speed",
    value: 3.4,
    suffix: "×",
    decimals: 1,
    caption: "faster time-to-quote versus the prior spreadsheet flow.",
  },
  {
    eyebrow: "Coordination",
    value: 42,
    prefix: "−",
    suffix: "%",
    caption: "reduction in status-chasing calls between site and office.",
  },
  {
    eyebrow: "Source of truth",
    value: 1,
    caption:
      "unified platform replacing spreadsheets, phone calls, and paper job sheets.",
    highlight: true,
    staticValue: true,
  },
];

function formatNumber(n: number, decimals = 0) {
  return n.toFixed(decimals);
}

interface StatCardProps {
  stat: StatItem;
  index: number;
  active: boolean;
}

function StatCard({ stat, index, active }: StatCardProps) {
  const { eyebrow, value, prefix = "", suffix = "", decimals = 0, caption, highlight, staticValue } = stat;
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState<number>(reduced || staticValue ? value : 0);

  useEffect(() => {
    if (!active) return;
    if (reduced || staticValue) {
      setDisplay(value);
      return;
    }

    const duration = 1400;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out: cubic-bezier(0.16, 1, 0.3, 1)-ish via 1 - (1-t)^3
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Number((eased * value).toFixed(decimals)));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, reduced, value, decimals, staticValue]);

  // Card reveal styles: opacity + translateY transition, staggered by index.
  const revealStyle: React.CSSProperties = reduced
    ? { opacity: 1, transform: "none" }
    : {
        opacity: active ? 1 : 0,
        transform: active ? "translateY(0)" : "translateY(12px)",
        transition: `opacity 600ms cubic-bezier(0.22, 1, 0.36, 1) ${index * 80}ms, transform 600ms cubic-bezier(0.22, 1, 0.36, 1) ${index * 80}ms`,
      };

  return (
    <div
      style={revealStyle}
      className={[
        "relative flex h-full flex-col justify-between rounded-[24px] p-6 md:p-7",
        highlight
          ? "bg-[#ff5b29] text-white shadow-[0_20px_60px_-30px_rgba(255,91,41,0.7)]"
          : "bg-white text-black shadow-[0_10px_30px_-20px_rgba(0,0,0,0.35)]",
      ].join(" ")}
    >
      <p
        className={[
          "font-body text-[12px] font-bold tracking-[0.14em] uppercase md:text-[13px]",
          highlight ? "text-white/85" : "text-black/65",
        ].join(" ")}
      >
        {eyebrow}
      </p>

      <p
        aria-label={`${prefix}${formatNumber(value, decimals)}${suffix}`}
        className={[
          "font-body mt-2 text-[56px] leading-[1.05] font-bold tracking-[-0.02em] md:text-[72px] lg:text-[80px]",
          highlight ? "text-white" : "text-black",
        ].join(" ")}
      >
        <span aria-hidden>
          {prefix}
          {staticValue ? value : formatNumber(display, decimals)}
          {suffix}
        </span>
      </p>

      <p
        className={[
          "font-body mt-auto pt-10 text-[14px] leading-[1.5] font-normal md:text-[15px]",
          highlight ? "text-white/90" : "text-black/70",
        ].join(" ")}
      >
        {caption}
      </p>
    </div>
  );
}

export function CarellStatsGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4"
    >
      {STATS.map((stat, i) => (
        <StatCard key={stat.eyebrow} stat={stat} index={i} active={active} />
      ))}
    </div>
  );
}
