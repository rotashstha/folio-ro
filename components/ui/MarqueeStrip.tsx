interface MarqueeStripProps {
  text: string;
  separator?: string;
  duration?: number;
  className?: string;
}

export function MarqueeStrip({
  text,
  separator = "✦",
  duration = 80,
  className = "",
}: MarqueeStripProps) {
  const copies = Array.from({ length: 5 }, (_, i) => (
    <span key={i} className="flex shrink-0 items-center gap-[0.5em]">
      {text}
      <span className="text-accent-magenta" aria-hidden="true">
        {separator}
      </span>
    </span>
  ));

  return (
    <div
      className={`relative overflow-hidden bg-paper py-6 md:py-10 ${className}`}
      aria-label={text}
    >
      <div
        className="flex w-max items-center gap-[0.5em] font-body text-[150px] font-extrabold uppercase leading-none tracking-tight text-ink"
        style={{
          animation: `marquee-scroll ${duration}s linear infinite`,
          willChange: "transform",
        }}
      >
        {copies}
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
