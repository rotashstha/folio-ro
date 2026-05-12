import type { Accent } from "@/types/project";

export interface StatProps {
  value: string;
  label: string;
  accent?: Accent;
}

const accentText: Record<Accent, string> = {
  neon: "text-accent-neon",
  magenta: "text-accent-magenta",
  orange: "text-accent-orange",
};

export function Stat({ value, label, accent = "magenta" }: StatProps) {
  return (
    <div className="flex flex-col gap-3">
      <span
        className={`font-display text-7xl leading-none md:text-9xl ${accentText[accent]}`}
      >
        {value}
      </span>
      <span className="font-sans max-w-xs text-sm tracking-widest uppercase opacity-70">
        {label}
      </span>
    </div>
  );
}
