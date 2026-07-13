// components/case-study/projects/woolworths/RitualMarquee.tsx
"use client";

const RITUALS = [
  "Weekly open office hours",
  "Weekly design sync",
  "Monthly demo",
  "Design-system onboarding",
  "Slack support channel",
];

export function RitualMarquee({ duration = 40 }: { duration?: number }) {
  const row = RITUALS.map((label) => (
    <span key={label} className="flex items-center gap-6 shrink-0">
      <span className="font-body text-[20px] md:text-[24px] text-black/70">{label}</span>
      <span className="font-body text-[20px] md:text-[24px] text-black/25 shrink-0">·</span>
    </span>
  ));

  return (
    <div className="relative overflow-hidden" aria-label="Community rituals">
      <div
        className="marquee-scroll-anim flex w-max items-center gap-6"
        style={{ animation: `marquee-scroll ${duration}s linear infinite`, willChange: "transform" }}
      >
        {row}{row}
      </div>
    </div>
  );
}
