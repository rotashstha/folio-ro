import { FadeReveal } from "@/components/ui/FadeReveal";

interface TagPillsProps {
  tags: string[];
  className?: string;
}

export function TagPills({ tags, className = "" }: TagPillsProps) {
  const visible = tags.slice(0, 5);
  if (visible.length === 0) return null;

  return (
    <FadeReveal y={12} delay={0.1}>
      <div className={`flex flex-wrap gap-2 ${className}`}>
        {visible.map((tag) => (
          <span
            key={tag}
            className="font-body rounded-full border border-paper/20 px-3 py-[5px] text-[11px] tracking-widest uppercase text-paper/60"
          >
            {tag}
          </span>
        ))}
      </div>
    </FadeReveal>
  );
}
