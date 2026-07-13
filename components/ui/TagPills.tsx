import { FadeReveal } from "@/components/ui/FadeReveal";

interface TagPillsProps {
  tags: string[];
  className?: string;
  tone?: "light" | "dark";
}

export function TagPills({ tags, className = "", tone = "dark" }: TagPillsProps) {
  const visible = tags.slice(0, 5);
  if (visible.length === 0) return null;

  const pillClass =
    tone === "light"
      ? "font-body rounded-full border border-black/15 px-3 py-[5px] text-[11px] tracking-widest uppercase text-black/60"
      : "font-body rounded-full border border-paper/20 px-3 py-[5px] text-[11px] tracking-widest uppercase text-paper/60";

  return (
    <FadeReveal y={12} delay={0.1}>
      <div className={`flex flex-wrap gap-2 ${className}`}>
        {visible.map((tag) => (
          <span key={tag} className={pillClass}>
            {tag}
          </span>
        ))}
      </div>
    </FadeReveal>
  );
}
