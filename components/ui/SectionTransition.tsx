interface SectionTransitionProps {
  /** Starting colour (top). Defaults to black. */
  from?: string;
  /** Ending colour (bottom). Defaults to white. */
  to?: string;
  /** Height of the gradient band in pixels. */
  travel?: number;
  "data-theme"?: "light" | "dark";
}

/**
 * A short, scroll-natural colour bridge between two sections of contrasting
 * background. Renders as a `travel`-tall gradient band — no JS, no sticky,
 * no scroll listener. The browser paints the gradient natively, so the
 * transition stays buttery regardless of scroll speed or smooth-scroll engine.
 */
export function SectionTransition({
  from = "#000000",
  to = "#ffffff",
  travel = 160,
  "data-theme": dataTheme,
}: SectionTransitionProps) {
  return (
    <div
      data-theme={dataTheme}
      aria-hidden="true"
      style={{
        height: `${travel}px`,
        background: `linear-gradient(to bottom, ${from}, ${to})`,
      }}
      className="relative w-full"
    />
  );
}
