// components/case-study/projects/woolworths/DocMarquee.tsx
"use client";

import Image from "next/image";

const DOCS = ["guideline-1","guideline-2","guideline-3","guideline-4","guideline-5"];
const IMG = "/images/work/woolworths";

export function DocMarquee({ duration = 60 }: { duration?: number }) {
  const row = DOCS.map((n) => (
    <div key={n} className="relative aspect-[3/2] w-[360px] shrink-0 overflow-hidden rounded-[16px] md:w-[440px]">
      <Image src={`${IMG}/${n}.svg`} alt="Orchard documentation page" fill sizes="440px" className="object-cover" />
    </div>
  ));
  return (
    <div className="relative overflow-hidden" aria-label="Documentation gallery">
      <div className="flex w-max items-center gap-6" style={{ animation: `marquee-scroll ${duration}s linear infinite`, willChange: "transform" }}>
        {row}{row}
      </div>
    </div>
  );
}
