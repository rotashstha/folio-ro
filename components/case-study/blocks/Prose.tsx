import { FadeReveal } from "@/components/ui/FadeReveal";
import type { ProseBlock } from "@/types/case-study";

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

/**
 * Tiny markdown subset: paragraphs, **bold**, *italic*, [text](url).
 * Authored content is trusted (TS files in repo) — we still escape raw text
 * so accidental angle brackets in copy render visually instead of breaking.
 */
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

export function ProseBlockComponent({ block }: { block: ProseBlock }) {
  const paragraphs = block.markdown
    .trim()
    .split(/\n{2,}/)
    .filter(Boolean);
  const align = block.align ?? "left";

  return (
    <section className="cs-section-tight">
      <div className="cs-container">
        <FadeReveal>
          <div
            className={`font-body space-y-6 text-[clamp(1rem,1.2vw,1.15rem)] leading-[1.7] opacity-90 ${
              align === "center" ? "mx-auto text-center" : ""
            }`}
            style={{ maxWidth: "var(--cs-prose-max)" }}
          >
            {paragraphs.map((p, i) => (
              <p
                key={i}
                dangerouslySetInnerHTML={{ __html: renderInline(p) }}
              />
            ))}
          </div>
        </FadeReveal>
      </div>
    </section>
  );
}
