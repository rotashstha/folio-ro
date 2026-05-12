import { FadeReveal } from "@/components/ui/FadeReveal";
import { LineReveal } from "@/components/ui/LineReveal";
import type { LabelledSectionBlock } from "@/types/case-study";

const ESCAPE: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

function escapeHtml(input: string): string {
  return input.replace(/[&<>"']/g, (ch) => ESCAPE[ch]!);
}

function renderInline(text: string): string {
  const escaped = escapeHtml(text);
  return escaped
    .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold">$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em class="italic">$1</em>')
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="underline decoration-1 underline-offset-4 hover:text-accent-magenta">$1</a>'
    );
}

/**
 * Editorial labelled section: a label/heading on the left column and prose
 * on the right column. Matches the Figma case-study body pattern (Discovery,
 * Challenge, Design System, Remedies, etc.).
 *
 * Mobile collapses to a single column with the label sitting above the body.
 */
export function LabelledSectionBlockComponent({
  block,
}: {
  block: LabelledSectionBlock;
}) {
  const paragraphs = block.body
    .trim()
    .split(/\n{2,}/)
    .filter(Boolean);

  return (
    <section className="cs-section-tight">
      <div className="cs-container">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-4">
            <LineReveal>
              {block.eyebrow && (
                <p className="cs-eyebrow mb-2 opacity-60">{block.eyebrow}</p>
              )}
              <h2 className="font-display text-[clamp(1.75rem,3.2vw,2.75rem)] leading-tight">
                {block.label}
              </h2>
            </LineReveal>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <FadeReveal y={20}>
              {block.subhead && (
                <p className="font-sans mb-6 text-[clamp(1.1rem,1.5vw,1.4rem)] leading-snug font-medium opacity-90">
                  {block.subhead}
                </p>
              )}
              <div
                className="font-body space-y-5 text-[clamp(1rem,1.15vw,1.125rem)] leading-[1.7] opacity-90"
                style={{ maxWidth: "var(--cs-prose-max)" }}
              >
                {paragraphs.map((p, i) => (
                  <p key={i} dangerouslySetInnerHTML={{ __html: renderInline(p) }} />
                ))}
              </div>
            </FadeReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
