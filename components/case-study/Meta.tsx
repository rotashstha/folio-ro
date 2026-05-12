import { FadeReveal } from "@/components/ui/FadeReveal";
import type { CaseStudyMeta } from "@/types/case-study";

interface CaseStudyMetaProps {
  meta: CaseStudyMeta;
}

function MetaColumn({
  label,
  items,
  delay,
}: {
  label: string;
  items: string[];
  delay: number;
}) {
  return (
    <FadeReveal y={20} delay={delay}>
      <h3 className="cs-eyebrow">{label}</h3>
      <ul className="font-sans mt-3 space-y-1.5 text-base leading-snug md:text-[1.0625rem]">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </FadeReveal>
  );
}

export function CaseStudyMetaSection({ meta }: CaseStudyMetaProps) {
  return (
    <section
      data-section="meta"
      className="cs-section-tight"
      aria-label="Project meta"
    >
      <div className="cs-container">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:gap-x-10">
          <MetaColumn label="Role" items={[meta.role]} delay={0} />
          <MetaColumn label="Team" items={meta.team} delay={0.05} />
          <MetaColumn
            label="My contribution"
            items={meta.contribution}
            delay={0.1}
          />
          <MetaColumn label="Timeline" items={[meta.timeline]} delay={0.15} />
        </div>
      </div>
    </section>
  );
}
