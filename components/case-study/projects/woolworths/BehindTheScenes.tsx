"use client";

import { useEffect, useRef, useState } from "react";
import { WoolworthsStatsRow } from "./StatsRow";

const PILLARS = [
  "Component library",
  "Guidelines & documentation",
  "Accessibility",
  "Contribution model",
  "Team collaboration",
];

const LAYER_GRADIENTS = [
  "linear-gradient(135deg, #b2f2bb, #69db7c)",
  "linear-gradient(135deg, #69db7c, #40c057)",
  "linear-gradient(135deg, #40c057, #2f9e44)",
  "linear-gradient(135deg, #38b6c9, #1c9bb0)",
  "linear-gradient(135deg, #5b8def, #3b6fd4)",
];

function FigmaMark() {
  return (
    <svg width="18" height="27" viewBox="0 0 38 57" aria-hidden fill="none">
      <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE" />
      <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83" />
      <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262" />
      <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E" />
      <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF" />
    </svg>
  );
}

function ReactMark() {
  return (
    <svg width="26" height="24" viewBox="-11.5 -10.23 23 20.46" aria-hidden>
      <circle r="2.05" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

function AppleMark() {
  return (
    <svg width="20" height="24" viewBox="0 0 24 24" aria-hidden fill="currentColor">
      <path d="M16.365 1.43c0 1.14-.42 2.2-1.11 2.98-.83.94-2.2 1.67-3.28 1.58-.13-1.1.42-2.26 1.06-3 .72-.84 2.02-1.48 3.09-1.53.04.32.02.63.02.92h.22zM20.5 17.14c-.55 1.27-.81 1.84-1.52 2.96-.99 1.57-2.39 3.52-4.12 3.53-1.54.01-1.94-.99-4.03-.98-2.09.01-2.53.99-4.07.98-1.73-.01-3.05-1.77-4.04-3.34-2.77-4.4-3.06-9.56-1.35-12.3 1.21-1.95 3.13-3.09 4.93-3.09 1.84 0 2.99 1.01 4.51 1.01 1.47 0 2.37-1.01 4.5-1.01 1.6 0 3.3.87 4.51 2.38-3.96 2.17-3.31 7.82.25 9.86z" />
    </svg>
  );
}

function AndroidMark() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden fill="#3DDC84">
      <path d="M6 9v7a1 1 0 0 0 1 1h1v3.5a1.5 1.5 0 0 0 3 0V17h2v3.5a1.5 1.5 0 0 0 3 0V17h1a1 1 0 0 0 1-1V9H6zM3.5 9A1.5 1.5 0 0 0 2 10.5v4a1.5 1.5 0 0 0 3 0v-4A1.5 1.5 0 0 0 3.5 9zm17 0a1.5 1.5 0 0 0-1.5 1.5v4a1.5 1.5 0 0 0 3 0v-4A1.5 1.5 0 0 0 20.5 9zM15.53 2.16l1.3-1.3a.5.5 0 0 0-.7-.7l-1.48 1.48A6.97 6.97 0 0 0 12 1c-.98 0-1.9.2-2.74.56L7.77.16a.5.5 0 1 0-.7.7l1.3 1.3A6.99 6.99 0 0 0 6 8h12a6.99 6.99 0 0 0-2.47-5.84zM10 5.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5zm4 0a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5z" />
    </svg>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-body text-[24px] font-bold leading-tight text-paper md:text-[32px]">
      {children}
    </h3>
  );
}

function BlockCopy({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-8 flex flex-col gap-5 font-body text-[16px] leading-[1.6] text-paper/60 md:text-[18px]">
      {children}
    </div>
  );
}

/* Block 0 — Component library */
function LibrariesBlock() {
  return (
    <>
      <SectionHeading>Two libraries, one system — web &amp; mobile</SectionHeading>
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-[20px] border border-paper/12 bg-paper/[0.03] p-6">
          <p className="font-body text-[16px] font-bold text-paper">Web (React) Library</p>
          <div className="mt-5 flex items-center gap-4">
            <FigmaMark />
            <ReactMark />
          </div>
        </div>
        <div className="rounded-[20px] border border-paper/12 bg-paper/[0.03] p-6">
          <p className="font-body text-[16px] font-bold text-paper">Android &amp; iOS Library</p>
          <div className="mt-5 flex items-center gap-4">
            <FigmaMark />
            <AppleMark />
            <AndroidMark />
          </div>
        </div>
      </div>
      <BlockCopy>
        <p>
          We ship separate libraries for web (React) and mobile (iOS &amp; Android) so each stays
          lean and focused on how its designers actually work. Parity between design and code is the
          goal: the system supports the languages Woolworths builds in, keeping one system honest across
          every surface.
        </p>
      </BlockCopy>
      <div className="mt-14">
        <WoolworthsStatsRow />
      </div>
    </>
  );
}

/* Block 1 — Guidelines & documentation */
function GuidelinesBlock() {
  return (
    <>
      <SectionHeading>Guidelines that make the system easy to adopt</SectionHeading>
      <BlockCopy>
        <p>
          The Woolworths Design System serves designers, engineers and product managers every day. Clear documentation is
          what turns a component library into a system people actually reach for — so every pattern
          ships with guidance on when to use it, how it behaves, and where its edges are.
        </p>
        <p>
          Each entry covers accessibility, layout, content and tone, with worked examples designers
          can lift straight into a file.
        </p>
      </BlockCopy>
    </>
  );
}

/* Block 2 — Accessibility */
function KeyCap({ label, wide }: { label: string; wide?: boolean }) {
  return (
    <span
      className={`inline-flex h-9 items-center justify-center rounded-md border border-ink/10 bg-paper font-body text-[12px] font-medium text-ink/60 shadow-[0_2px_0_rgba(0,0,0,0.05)] ${
        wide ? "px-4" : "w-9"
      }`}
    >
      {label}
    </span>
  );
}

function AccessCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex min-h-[168px] flex-col justify-between rounded-[18px] border border-paper/12 bg-paper/[0.03] p-5">
      <p className="font-body text-[15px] font-bold text-paper">{label}</p>
      <div className="flex flex-1 items-center justify-center">{children}</div>
    </div>
  );
}

function AccessibilityBlock() {
  return (
    <>
      <SectionHeading>Inclusive by default</SectionHeading>
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <AccessCard label="Colour contrast">
          <div
            className="flex h-full w-full items-end justify-center rounded-xl p-3"
            style={{ background: "linear-gradient(135deg,#008446,#009958,#4aae7e)" }}
          >
            <span className="font-body text-[12px] font-medium text-white/95">WCAG AA: Pass</span>
          </div>
        </AccessCard>
        <AccessCard label="Keyboard controls">
          <div className="grid grid-cols-3 gap-1.5">
            <KeyCap label="tab" wide />
            <KeyCap label="Q" />
            <KeyCap label="W" />
            <KeyCap label="⇧" />
            <KeyCap label="Z" />
            <KeyCap label="X" />
          </div>
        </AccessCard>
        <AccessCard label="Focus state">
          <span className="animate-access-focus inline-flex items-center justify-center rounded-full border border-ink/15 bg-paper px-6 py-2.5 font-body text-[13px] font-medium text-ink">
            Button
          </span>
        </AccessCard>
        <AccessCard label="Annotation kit">
          <div className="flex w-full flex-col gap-2">
            <div className="relative rounded-md border-2 border-[#008446] px-3 py-2">
              <span className="absolute -left-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#008446] text-[8px] text-white">
                h1
              </span>
              <div className="h-1.5 w-3/4 rounded-full bg-paper/10" />
            </div>
            <div className="relative ml-6 rounded-md border-2 border-[#4aae7e] px-3 py-2">
              <span className="absolute -left-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#4aae7e] text-[8px] text-white">
                h3
              </span>
              <div className="h-1.5 w-2/3 rounded-full bg-paper/10" />
            </div>
          </div>
        </AccessCard>
        <AccessCard label="Screen reader">
          <div className="flex h-14 items-center gap-[3px]">
            {[10, 22, 40, 28, 52, 34, 18, 44, 30, 14, 38, 24, 12].map((h, i) => (
              <span
                key={i}
                className="w-[3px] rounded-full"
                style={{
                  height: `${h}px`,
                  background: "linear-gradient(to top,#008446,#c0e4d1)",
                }}
              />
            ))}
          </div>
        </AccessCard>
        <AccessCard label="Love">
          <svg width="52" height="52" viewBox="0 0 24 24" fill="#008446" aria-hidden className="animate-access-heartbeat">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </AccessCard>
      </div>
      <BlockCopy>
        <p>
          Woolworths reaches millions of customers, so the system has to work for all of them.
          Accessibility isn&apos;t a review step at the end — it&apos;s built into every component,
          checked against WCAG, and documented so teams inherit it for free.
        </p>
        <p>
          Colour contrast, keyboard paths, focus states, screen-reader labels and annotation kits
          all ship with the component, so accessibility is the default, not the exception.
        </p>
      </BlockCopy>
    </>
  );
}

/* Block 3 — Contribution model */
function ContributionBlock() {
  return (
    <>
      <SectionHeading>Built to scale through contribution</SectionHeading>
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-[20px] border border-paper/12 bg-paper/[0.03] p-5">
          <p className="font-body text-[15px] font-bold text-paper">Collaboration flow</p>
          <div className="mt-4 flex h-[150px] items-center justify-center gap-2 rounded-xl bg-paper p-4">
            {["Propose", "Review", "Refine", "Ship"].map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <span className="rounded-md border border-ink/10 px-2 py-1.5 font-body text-[10px] font-medium text-ink/60">
                  {step}
                </span>
                {i < 3 && <span className="h-px w-4 bg-ink/20" />}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[20px] border border-paper/12 bg-paper/[0.03] p-5">
          <p className="font-body text-[15px] font-bold text-paper">Component checklist</p>
          <div className="mt-4 flex h-[150px] flex-col justify-center gap-2.5 rounded-xl bg-paper px-5">
            {["States & variants", "Dark theme colours", "Accessibility notes", "Platform parity"].map(
              (item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <span className="flex h-3.5 w-3.5 items-center justify-center rounded-[4px] bg-brand-green text-[9px] text-white">
                    ✓
                  </span>
                  <span className="font-body text-[11px] text-ink/60">{item}</span>
                </div>
              )
            )}
          </div>
        </div>
      </div>
      <BlockCopy>
        <p>
          A small systems team can&apos;t cover every surface a retailer this size needs. The system
          grows through contribution: product teams propose patterns, we review for quality and
          consistency, and the best work becomes part of the shared library.
        </p>
        <p>
          A documented flow and a component checklist keep the bar high — governance without becoming
          a bottleneck.
        </p>
      </BlockCopy>
    </>
  );
}

/* Block 4 — Team collaboration */
const COMMUNITY_PILLS = [
  "🎨 Weekly design sync",
  "🚀 Monthly demo",
  "⏰ Open office hours",
  "🤍 Accessibility touchpoint",
  "💬 Shared Slack channel",
  "🛫 Design system onboarding",
];

function CommunityBlock() {
  return (
    <>
      <SectionHeading>Made with the community, not for it</SectionHeading>
      <div className="mt-10 flex flex-wrap gap-3">
        {COMMUNITY_PILLS.map((pill) => (
          <span
            key={pill}
            className="inline-flex items-center rounded-full border border-paper/12 bg-paper/[0.03] px-4 py-2 font-body text-[14px] text-paper/70"
          >
            {pill}
          </span>
        ))}
      </div>
      <BlockCopy>
        <p>
          The system lives or dies on the relationships around it. We run open office hours, weekly
          syncs and a shared channel so help is always a message away.
        </p>
        <p>
          Regular demos and onboarding keep teams close to what&apos;s shipping, and an accessibility
          touchpoint keeps inclusion front of mind across every squad.
        </p>
      </BlockCopy>
    </>
  );
}

const BLOCKS = [
  LibrariesBlock,
  GuidelinesBlock,
  AccessibilityBlock,
  ContributionBlock,
  CommunityBlock,
];

export function BehindTheScenes() {
  const [active, setActive] = useState(0);
  const blockRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const threshold = window.innerHeight * 0.4;
      let idx = 0;
      blockRefs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= threshold) idx = i;
      });
      setActive((prev) => (prev === idx ? prev : idx));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="pt-[120px] md:pt-[160px]">
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-[0.9fr_1.1fr] md:gap-12">
          <div className="md:sticky md:top-[16vh] md:h-fit md:self-start">
            <span className="inline-flex rounded-full border border-paper/20 px-4 py-1.5 font-body text-[12px] font-bold uppercase tracking-[0.14em] text-paper/50">
              Woolworths design system
            </span>
            <h2 className="mt-6 font-body text-[28px] font-bold leading-tight text-paper md:text-[40px]">
              Behind the scenes…
            </h2>
            <div className="mt-10 hidden flex-col items-start gap-8 md:flex md:flex-row md:items-center md:gap-6">
              <div className="flex h-[260px] w-[220px] shrink-0 items-center justify-center [perspective:1000px]">
                <div className="relative h-[190px] w-[190px] [transform-style:preserve-3d] [transform:rotateX(56deg)_rotateZ(-42deg)]">
                  {PILLARS.map((_, i) => {
                    const isActive = i === active;
                    return (
                      <div
                        key={i}
                        className="absolute inset-0 rounded-[24px] transition-all duration-500 ease-out"
                        style={{
                          background: LAYER_GRADIENTS[i],
                          transform: `translateZ(${(PILLARS.length - 1 - i) * 26 + (isActive ? 24 : 0)}px)`,
                          opacity: isActive ? 1 : 0.45,
                          boxShadow: isActive
                            ? "0 24px 44px rgba(0,0,0,0.20)"
                            : "0 8px 18px rgba(0,0,0,0.06)",
                        }}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="flex items-center gap-4 md:-translate-y-[30px]">
                <span className="h-px w-12 shrink-0 bg-paper/30 md:w-14" />
                <span
                  key={active}
                  className="cs-connector-label font-body text-[15px] font-medium text-paper md:text-[17px]"
                >
                  {PILLARS[active]}
                </span>
              </div>
            </div>
          </div>

          <div className="flex min-w-0 flex-col">
            {BLOCKS.map((Block, i) => (
              <div
                key={i}
                ref={(el) => {
                  blockRefs.current[i] = el;
                }}
                className="flex flex-col justify-center py-16 md:min-h-[88vh] md:py-0"
              >
                <Block />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
