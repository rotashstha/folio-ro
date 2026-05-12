import { WordReveal } from "@/components/ui/WordReveal";
import { LineReveal } from "@/components/ui/LineReveal";
import { FadeReveal } from "@/components/ui/FadeReveal";
import type { QuoteBlock } from "@/types/case-study";
import type { Accent } from "@/types/project";

const accentClass: Record<Accent, string> = {
  neon: "text-accent-neon",
  magenta: "text-accent-magenta",
  orange: "text-accent-orange",
};

export function QuoteBlockComponent({ block }: { block: QuoteBlock }) {
  const accent = block.accent ?? "magenta";
  return (
    <section className="cs-section">
      <div className="cs-container">
        <blockquote className="mx-auto max-w-4xl text-center">
          <span className={`font-display text-5xl ${accentClass[accent]}`} aria-hidden>
            “
          </span>
          <p className="font-display mt-4 text-[clamp(1.75rem,3.6vw,3.25rem)] leading-[1.15]">
            <WordReveal staggerMs={50} durationMs={700}>
              {block.text}
            </WordReveal>
          </p>
          {block.attribution && (
            <FadeReveal y={12} delay={0.2}>
              <LineReveal className="mx-auto mt-10 inline-block">
                <cite className="cs-eyebrow not-italic">{block.attribution}</cite>
              </LineReveal>
            </FadeReveal>
          )}
        </blockquote>
      </div>
    </section>
  );
}
