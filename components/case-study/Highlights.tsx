import type { ReactNode } from "react";
import { FadeReveal } from "@/components/ui/FadeReveal";

/**
 * Shared case-study callouts that improve scannability and surface the
 * "why" behind decisions. Neutral aesthetic only (white / paper-gray on
 * black) to match the AtlasCarbon / IAG / Woolworths page system.
 *
 * - AtAGlance: skimmable summary card placed right after the meta section
 *   (problem / role / outcome). A 5-second read that front-loads impact.
 * - DecisionCallout: inline block that makes a design decision + its
 *   tradeoff explicit. Placed within an existing section's container.
 */

function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-[1728px] px-6 md:px-14 lg:px-[85px] ${className}`}>
      {children}
    </div>
  );
}

export interface GlanceItem {
  label: string;
  body: ReactNode;
}

export function AtAGlance({
  items,
  className = "pt-[80px] md:pt-[100px]",
}: {
  items: GlanceItem[];
  className?: string;
}) {
  return (
    <section aria-label="At a glance" className={className}>
      <Container>
        <FadeReveal y={20}>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[24px] border border-white/10 bg-white/10 md:grid-cols-3">
            {items.map((item) => (
              <div key={item.label} className="bg-[#0f0f0f] p-8 md:p-10">
                <p className="font-body text-[12px] font-bold uppercase tracking-[0.14em] text-paper/40">
                  {item.label}
                </p>
                <div className="font-body mt-4 text-[17px] leading-[1.5] font-normal text-paper md:text-[19px]">
                  {item.body}
                </div>
              </div>
            ))}
          </div>
        </FadeReveal>
      </Container>
    </section>
  );
}

export function DecisionCallout({
  label = "Why this call",
  decision,
  children,
  className = "",
}: {
  label?: string;
  decision: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <FadeReveal y={20}>
      <aside className={`border-l-2 border-white/25 pl-6 md:pl-8 ${className}`}>
        <p className="font-body text-[12px] font-bold uppercase tracking-[0.14em] text-paper/40">
          {label}
        </p>
        <p className="font-body mt-3 max-w-[760px] text-[18px] leading-snug font-bold text-paper md:text-[22px]">
          {decision}
        </p>
        <div className="font-body mt-3 max-w-[680px] text-[15px] leading-[1.6] font-normal text-paper/60 md:text-[16px]">
          {children}
        </div>
      </aside>
    </FadeReveal>
  );
}
