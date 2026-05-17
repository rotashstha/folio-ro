interface MarqueeStripProps {
  text: string;
  /** Separator glyph between repeats */
  separator?: string;
  /** Total animation duration in seconds */
  duration?: number;
  className?: string;
}

export function MarqueeStrip({
  text,
  separator = "✦",
  duration = 32,
  className = "",
}: MarqueeStripProps) {
  // Render 6 copies — enough to fill any viewport without a gap at 100vw
  const copies = Array.from({ length: 6 }, (_, i) => (
    <span key={i} className="flex shrink-0 items-center gap-[0.6em]">
      {text}
      <span className="text-accent-magenta" aria-hidden="true">
        {separator}
      </span>
    </span>
  ));

  return (
    <div
      className={`relative overflow-hidden border-y border-white/10 py-5 md:py-7 ${className}`}
      aria-label={text}
    >
      {/* Animate two identical tracks so the seam is invisible */}
      <div
        className="flex w-max gap-[0.6em] font-body-condensed text-[clamp(2.5rem,7vw,6rem)] font-black uppercase leading-none tracking-tight text-paper"
        style={{
          animation: `marquee-scroll ${duration}s linear infinite`,
          willChange: "transform",
        }}
      >
        {copies}
        {/* Duplicate for seamless loop */}
        {copies}
      </div>

      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="marquee-scroll"] { animation: none; }
        }
      `}</style>
    </div>
  );
}
