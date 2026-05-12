import type { ReactNode } from "react";

export type SectionTone = "paper" | "ink";

export interface SectionWrapperProps {
  id: string;
  tone?: SectionTone;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}

const toneClasses: Record<SectionTone, string> = {
  paper: "bg-paper text-ink",
  ink: "bg-ink text-paper",
};

export function SectionWrapper({
  id,
  tone = "paper",
  children,
  className = "",
  ariaLabel,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`${toneClasses[tone]} scroll-mt-24 py-24 md:py-32 ${className}`}
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">{children}</div>
    </section>
  );
}
