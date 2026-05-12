import { FadeReveal } from "@/components/ui/FadeReveal";
import { LineReveal } from "@/components/ui/LineReveal";
import type { ResultsBlock } from "@/types/case-study";

export function ResultsBlockComponent({ block }: { block: ResultsBlock }) {
  const sectionTheme = block.theme;
  return (
    <section
      className="cs-section"
      data-theme={sectionTheme}
      aria-label="Results"
    >
      <div className="cs-container">
        <LineReveal className="pb-10 md:pb-14">
          <p className="cs-eyebrow">Outcomes</p>
        </LineReveal>

        {block.narrative && (
          <FadeReveal y={20}>
            <p className="font-display max-w-3xl text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.15]">
              {block.narrative}
            </p>
          </FadeReveal>
        )}

        <div className="mt-14 grid grid-cols-1 gap-8 md:mt-20 md:grid-cols-3 md:gap-10">
          {block.metrics.map((m, i) => (
            <FadeReveal key={`${m.label}-${i}`} delay={i * 0.08} y={24}>
              <div className="border-t pt-6" style={{ borderColor: "currentColor" }}>
                <p className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-none">
                  {m.value}
                </p>
                <p className="cs-eyebrow mt-4">{m.label}</p>
                {m.sub && (
                  <p className="font-body mt-2 text-sm opacity-70">{m.sub}</p>
                )}
              </div>
            </FadeReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
