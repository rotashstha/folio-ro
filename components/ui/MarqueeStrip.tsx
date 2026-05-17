interface MarqueeStripProps {
  text: string;
  separator?: string;
  duration?: number;
  className?: string;
}

export function MarqueeStrip({
  text,
  separator = "✦",
  duration = 160,
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
      className={`marquee-strip relative overflow-hidden bg-paper py-6 md:py-10 ${className}`}
      aria-label={text}
    >
      <div
        className="marquee-text flex w-max items-center gap-[0.5em] font-body text-[72px] sm:text-[150px] font-extrabold uppercase leading-none tracking-tight text-ink"
        style={{
          animation: `marquee-scroll ${duration}s linear infinite`,
          willChange: "transform",
        }}
      >
        {copies}
        {copies}
      </div>
    </div>
  );
}
