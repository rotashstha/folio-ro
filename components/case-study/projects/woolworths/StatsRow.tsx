"use client";

import { StatCounter } from "@/components/ui/StatCounter";

const STATS: { value: number; suffix?: string; caption: string }[] = [
  { value: 120, caption: "Teams using the libraries" },
  { value: 4, caption: "Coding languages supported" },
  { value: 90, caption: "Components available to use" },
];

export function WoolworthsStatsRow() {
  return (
    <div className="grid grid-cols-1 gap-10 border-t border-black/10 pt-12 sm:grid-cols-3">
      {STATS.map((s) => (
        <div key={s.caption}>
          <StatCounter value={s.value} suffix={s.suffix} className="font-body text-[64px] font-bold leading-none tracking-[-0.02em] text-black md:text-[88px]" />
          <p className="font-body mt-4 text-[15px] leading-[1.5] text-black/55 md:text-[16px]">{s.caption}</p>
        </div>
      ))}
    </div>
  );
}
