import Image from "next/image";
import { MaskReveal } from "@/components/ui/MaskReveal";
import { WordReveal } from "@/components/ui/WordReveal";
import { FadeReveal } from "@/components/ui/FadeReveal";
import { BrandStrip } from "@/components/case-study/projects/iag/BrandStrip";
import { NextProjectReveal } from "@/components/case-study/NextProjectReveal";
import { HeroGrid } from "@/components/case-study/HeroGrid";

/**
 * IAG — pixel-faithful rebuild of the Figma reference
 * (rv3fAJdzRW0Wwc7BVtsIKv, node 61:474, "Case 2").
 *
 * Mirrors the AtlasCarbon page system (dark theme, Sofia Sans body,
 * Gallient display, 85px gutter) with IAG-specific surfaces:
 *   - Hero card bg #f7f1ea (light beige)
 *   - Multi-brand logo strip floating between hero and meta
 *   - 2x2 Overview / Challenge / Solution / My Role intro grid
 *   - Multi-brand "team poster" split section
 *   - Impact panel rendered from the pre-composed Impact-result.png
 */

function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-[1728px] px-6 md:px-14 lg:px-[85px] ${className}`}
    >
      {children}
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-body text-[20px] leading-tight font-normal text-white md:text-[24px]">
      {children}
    </h2>
  );
}

function BodyParagraph({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`font-body text-[15px] leading-[1.6] font-normal text-[#8e8e93] md:text-[16px] ${className}`}
    >
      {children}
    </div>
  );
}

function MetaLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-body text-[20px] leading-tight font-normal text-[#8e8e93] md:text-[24px]">
      {children}
    </h3>
  );
}

function MetaValue({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`font-body text-[20px] leading-tight font-bold text-white md:text-[24px] ${className}`}
    >
      {children}
    </p>
  );
}

function SubHead({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-body text-[15px] leading-snug font-bold text-white md:text-[16px]">
      {children}
    </p>
  );
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-body mt-10 max-w-[760px] text-[15px] leading-snug font-normal text-[#8e8e93] italic md:text-[16px]">
      {children}
    </p>
  );
}

export function IAG() {
  return (
    <article
      data-cs-root
      data-theme="dark"
      className="font-body relative isolate overflow-x-clip bg-black text-white antialiased"
    >
      {/* ================================================================ */}
      {/* HERO                                                              */}
      {/* ================================================================ */}
      <section
        data-section="hero"
        aria-labelledby="cs-hero-title"
        className="relative pt-[160px] md:pt-[180px]"
      >
        <HeroGrid />
        <Container>
          <div className="max-w-[640px]">
            <FadeReveal y={12}>
              <p
                id="cs-hero-tag"
                className="font-body text-[24px] leading-tight font-bold text-white md:text-[32px]"
              >
                Insurance Australia Group (IAG)
              </p>
            </FadeReveal>
            <FadeReveal y={16} delay={0.05}>
              <h1
                id="cs-hero-title"
                className="font-body mt-3 max-w-[540px] text-[18px] leading-snug font-normal text-[#8e8e93] md:text-[24px]"
              >
                Scaling Design Systems for multi-brand web experiences
              </h1>
            </FadeReveal>
          </div>
        </Container>

        {/* Wordmark + beige hero card */}
        <div className="relative mt-[80px] md:mt-[120px]">
          <Container className="relative z-0">
            <FadeReveal y={32} delay={0.1}>
              <MaskReveal duration={1.1} delay={0.1}>
                <div className="relative w-full overflow-hidden rounded-[24px] bg-[#f7f1ea]">
                  <div
                    className="relative w-full"
                    style={{ aspectRatio: "1561 / 1080" }}
                  >
                    <Image
                      src="/images/work/iag/hero.png"
                      alt="IAG / NRMA acquisition redesign — desktop and mobile mockups for car and home insurance journeys"
                      fill
                      priority
                      sizes="(min-width: 1280px) 1561px, 100vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </MaskReveal>
            </FadeReveal>
          </Container>

          <p
            aria-hidden
            className="font-display pointer-events-none absolute inset-x-0 top-0 z-10 -translate-y-[55%] pr-0 text-right text-[clamp(4rem,14vw,14rem)] leading-[0.95] tracking-[-0.02em] whitespace-nowrap text-white md:-translate-y-[58%]"
          >
            <WordReveal staggerMs={80} durationMs={950}>
              Insurance Aus
            </WordReveal>
          </p>
        </div>

        {/* Floating multi-brand logo strip — see BrandStrip.tsx. The inline
            copy renders here; once it scrolls past, a fixed dock pins to
            the viewport bottom until the Next Project section comes into
            view. Hover behaviour mirrors mariavareva.com's .framer-W0dUx. */}
        <Container className="mt-[80px] md:mt-[100px]">
          <BrandStrip />
        </Container>
      </section>

      {/* ================================================================ */}
      {/* PROJECT META — 4 columns                                          */}
      {/* ================================================================ */}
      <section
        data-section="meta"
        aria-label="Project meta"
        className="pt-[120px] pb-[60px] md:pt-[154px]"
      >
        <Container>
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4 md:gap-x-12">
            <FadeReveal y={20} delay={0}>
              <MetaLabel>Role</MetaLabel>
              <MetaValue className="mt-[45px]">
                Lead UX/UI Designer
                <br />/ Design Systems SME
              </MetaValue>
            </FadeReveal>
            <FadeReveal y={20} delay={0.05}>
              <MetaLabel>Team</MetaLabel>
              <div className="mt-[45px] space-y-1">
                <MetaValue>3 UX/UI Designers</MetaValue>
                <MetaValue>7 Engineers</MetaValue>
                <MetaValue>2 QE</MetaValue>
                <MetaValue>2 Business Analysts</MetaValue>
                <MetaValue>1 Integration Manager / PM</MetaValue>
              </div>
            </FadeReveal>
            <FadeReveal y={20} delay={0.1}>
              <MetaLabel>My contribution</MetaLabel>
              <div className="mt-[45px] space-y-1">
                <MetaValue>Token Architecture &amp; Foundations</MetaValue>
                <MetaValue>Multi-brand Patterns</MetaValue>
                <MetaValue>
                  Component Semantics &amp; Interaction Patterns
                </MetaValue>
                <MetaValue>
                  Flagship Brand Redesigns (NRMA, CGU, IAG, AMI, State NZ)
                </MetaValue>
              </div>
            </FadeReveal>
            <FadeReveal y={20} delay={0.15}>
              <MetaLabel>Timeline</MetaLabel>
              <MetaValue className="mt-[45px]">16 months</MetaValue>
            </FadeReveal>
          </div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* OVERVIEW — 2x2 grid: Overview / Challenge / Solution / My Role     */}
      {/* ================================================================ */}
      <section className="pt-[120px] pb-[60px]">
        <Container>
          <div className="grid grid-cols-1 gap-x-[100px] gap-y-[80px] md:grid-cols-2">
            <FadeReveal y={20}>
              <SectionHeading>Overview</SectionHeading>
              <BodyParagraph className="mt-6 max-w-[662px]">
                Led IAG&apos;s multi-brand design system across 12 brands,
                defining tokens, components, and governance; partnered with
                engineering to ensure system integrity and validated the
                model through the NRMA Home Loans acquisition redesign.
              </BodyParagraph>
            </FadeReveal>
            <FadeReveal y={20} delay={0.05}>
              <SectionHeading>Challenge</SectionHeading>
              <BodyParagraph className="mt-6 max-w-[662px]">
                Twelve brands, twelve flavours of the same component, and a
                quote journey that lost confidence at every step. The
                acquisition flow needed to feel native to each brand without
                the team rebuilding it from scratch each time.
              </BodyParagraph>
            </FadeReveal>
            <FadeReveal y={20} delay={0.1}>
              <SectionHeading>Solution</SectionHeading>
              <BodyParagraph className="mt-6 max-w-[662px]">
                A tokenised foundation, a shared AEM component library, and a
                hybrid governance model — validated end-to-end on the NRMA
                Home Loans redesign so every following brand had a
                derisked, production-proven path to adopt the system.
              </BodyParagraph>
            </FadeReveal>
            <FadeReveal y={20} delay={0.15}>
              <SectionHeading>My Role</SectionHeading>
              <BodyParagraph className="mt-6 max-w-[662px]">
                As Design Systems SME I owned token architecture, multi-brand
                pattern semantics, and the governance ritual that kept the
                system honest. I led the design pod through the flagship
                NRMA, CGU, AMI and State NZ rebrands and worked shoulder to
                shoulder with engineering to land ~99% design-to-code parity.
              </BodyParagraph>
            </FadeReveal>
          </div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* DISCOVERY                                                          */}
      {/* ================================================================ */}
      <section className="pt-[140px]">
        <Container>
          <FadeReveal y={20}>
            <SectionHeading>Discovery</SectionHeading>
            <BodyParagraph className="mt-5 max-w-[914px]">
              <SubHead>Discovery Activities</SubHead>
              <ul className="mt-3 ml-6 list-disc space-y-2">
                <li>
                  Conducted 15+ customer interviews and surveys across car
                  and home insurance
                </li>
                <li>
                  Shadowed contact centre teams to understand real questions,
                  friction points, and FAQs
                </li>
                <li>
                  Analysed analytics and session replays to identify
                  drop-off hotspots
                </li>
                <li>
                  Reviewed hundreds of customer reviews to surface recurring
                  pain points
                </li>
              </ul>

              <div className="mt-8">
                <SubHead>Key Insights</SubHead>
                <ul className="mt-3 ml-6 list-disc space-y-2">
                  <li>
                    Customers were not &ldquo;browsing&rdquo;, intent to
                    purchase was high
                  </li>
                  <li>
                    Coverage selection, not price, was the primary point of
                    hesitation
                  </li>
                  <li>
                    Long forms, dense tables, and jargon reduced confidence
                  </li>
                  <li>Mobile users struggled most with cognitive load</li>
                </ul>
              </div>

              <div className="mt-8">
                <SubHead>Strategic Reframe</SubHead>
                <p className="mt-3">
                  The challenge shifted from driving more traffic to
                  designing clearer, more supportive journeys delivered
                  through a reusable system of patterns.
                </p>
              </div>
            </BodyParagraph>
          </FadeReveal>
        </Container>

        <Container className="mt-[80px]">
          <FadeReveal y={32} delay={0.1}>
            <MaskReveal duration={1} delay={0.1}>
              <div
                className="relative w-full overflow-hidden rounded-[24px] bg-[#0f0f0f]"
                style={{ aspectRatio: "1556 / 886" }}
              >
                <Image
                  src="/images/work/iag/discovery.png"
                  alt="Discovery artefacts — NRMA Acquisition Journey strategy workshop board and a stakeholder interview clustering exercise"
                  fill
                  sizes="(min-width: 1280px) 1556px, 100vw"
                  className="object-cover"
                />
              </div>
            </MaskReveal>
          </FadeReveal>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* CHALLENGE                                                          */}
      {/* ================================================================ */}
      <section className="pt-[140px]">
        <Container>
          <FadeReveal y={20}>
            <SectionHeading>Challenge</SectionHeading>
            <BodyParagraph className="mt-5 max-w-[914px]">
              <SubHead>Observed Challenges</SubHead>
              <ul className="mt-3 ml-6 list-disc space-y-2">
                <li>Long, inconsistent quote journeys</li>
                <li>Dense coverage tables + jargon-heavy copy</li>
                <li>
                  High drop-off at Landing → Start Quote → Coverage
                </li>
                <li>No shared component library</li>
              </ul>

              <div className="mt-8">
                <SubHead>Operational Impact</SubHead>
                <ul className="mt-3 ml-6 list-disc space-y-2">
                  <li>No shared component library across brands</li>
                  <li>Slow delivery and repeated rework</li>
                  <li>
                    Low confidence for customers starting and completing
                    quotes
                  </li>
                </ul>
              </div>
            </BodyParagraph>

            <PullQuote>
              To create sustainable impact, the acquisition experience and
              the underlying design system had to be redesigned together.
            </PullQuote>
          </FadeReveal>
        </Container>

        <Container className="mt-[80px]">
          <FadeReveal y={32} delay={0.1}>
            <MaskReveal duration={1} delay={0.05}>
              <div
                className="relative w-full overflow-hidden rounded-[24px] bg-[#101010]"
                style={{ aspectRatio: "1556 / 886" }}
              >
                <Image
                  src="/images/work/iag/challenge.png"
                  alt="NRMA car insurance quote journey — desktop, tablet, and mobile screens showing the legacy acquisition flow"
                  fill
                  sizes="(min-width: 1280px) 1556px, 100vw"
                  className="object-cover"
                />
              </div>
            </MaskReveal>
          </FadeReveal>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* DESIGN SYSTEM — STRATEGY & IMPLEMENTATION                          */}
      {/* ================================================================ */}
      <section className="pt-[140px]">
        <Container>
          <FadeReveal y={20}>
            <SectionHeading>
              Design System – Strategy &amp; Implementation
            </SectionHeading>
            <BodyParagraph className="mt-5 max-w-[914px]">
              <p>
                I built the design system featuring typography, color
                styles, layouts, components and variables for fast
                implementations of new designs. Variables were built in
                collaboration with engineering so that we could use the same
                variable names across Figma and code.
              </p>

              <div className="mt-8">
                <SubHead>System Strategy</SubHead>
                <ul className="mt-3 ml-6 list-disc space-y-2">
                  <li>
                    Led a comprehensive audit of 12 brand websites and apps
                  </li>
                  <li>
                    Identified shared UX patterns, component overlap, and
                    inconsistencies
                  </li>
                  <li>
                    Defined a unified library of reusable components — forms
                    and inputs, coverage and comparison cards, calls-to-action
                    and modules
                  </li>
                </ul>
              </div>

              <div className="mt-8">
                <SubHead>Tokenised Foundations</SubHead>
                <ul className="mt-3 ml-6 list-disc space-y-2">
                  <li>
                    Partnered closely with engineering to implement tokenised
                    design foundations
                  </li>
                  <li>
                    Consolidated ~1,200 legacy variables into ~350 design
                    tokens
                  </li>
                  <li>
                    Covered colour, typography, spacing, and interaction
                  </li>
                  <li>Achieved ~99% design-to-code parity</li>
                </ul>
              </div>

              <div className="mt-8">
                <SubHead>Platform Enablement</SubHead>
                <ul className="mt-3 ml-6 list-disc space-y-2">
                  <li>Built as shared AEM component libraries</li>
                  <li>Enabled parallel adoption across brands</li>
                  <li>
                    Used NRMA acquisition as the flagship validation journey
                  </li>
                </ul>
              </div>
            </BodyParagraph>

            <PullQuote>
              The result was one system that could support distinct brands
              without re-designing from scratch.
            </PullQuote>
          </FadeReveal>
        </Container>

        <Container className="mt-[80px]">
          <FadeReveal y={32} delay={0.05}>
            <MaskReveal duration={1.1} delay={0.05}>
              <div
                className="relative w-full overflow-hidden rounded-[24px] bg-[#0f0f0f]"
                style={{ aspectRatio: "1578 / 883" }}
              >
                <Image
                  src="/images/work/iag/design-system-main.png"
                  alt="AEM brand-library architecture — Chroma theme tokens feeding the AEM Base Component Library and outwards to 11 IAG brand websites"
                  fill
                  sizes="(min-width: 1280px) 1556px, 100vw"
                  className="object-contain p-6 md:p-10"
                />
              </div>
            </MaskReveal>
          </FadeReveal>
        </Container>

        <Container className="mt-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            <FadeReveal y={24}>
              <MaskReveal duration={0.9} delay={0.05}>
                <div
                  className="relative w-full overflow-hidden rounded-[24px] bg-[#0f0f0f]"
                  style={{ aspectRatio: "768 / 883" }}
                >
                  <Image
                    src="/images/work/iag/design-system-1.png"
                    alt="Design tokens — typography, colour and spacing scale documentation"
                    fill
                    sizes="(min-width: 1280px) 700px, 45vw"
                    className="object-contain p-4 md:p-6"
                  />
                </div>
              </MaskReveal>
            </FadeReveal>
            <FadeReveal y={24} delay={0.08}>
              <MaskReveal duration={0.9} delay={0.13}>
                <div
                  className="relative w-full overflow-hidden rounded-[24px] bg-[#0f0f0f]"
                  style={{ aspectRatio: "768 / 883" }}
                >
                  <Image
                    src="/images/work/iag/design-system-2.png"
                    alt="Component library — interaction states, semantic variants and theming hooks"
                    fill
                    sizes="(min-width: 1280px) 700px, 45vw"
                    className="object-contain p-4 md:p-6"
                  />
                </div>
              </MaskReveal>
            </FadeReveal>
          </div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* GOVERNANCE                                                         */}
      {/* ================================================================ */}
      <section className="pt-[140px]">
        <Container>
          <FadeReveal y={20}>
            <SectionHeading>Governance</SectionHeading>
            <BodyParagraph className="mt-5 max-w-[914px]">
              <SubHead>Why Governance Mattered</SubHead>
              <ul className="mt-3 ml-6 list-disc space-y-2">
                <li>Prevented fragmentation as adoption scaled</li>
                <li>Enabled safe, transparent system evolution</li>
                <li>Reduced ad-hoc decision-making and rework</li>
              </ul>

              <div className="mt-8">
                <SubHead>Governance Model</SubHead>
                <ul className="mt-3 ml-6 list-disc space-y-2">
                  <li>
                    Co-designed a hybrid governance approach with design,
                    engineering, content, and brand
                  </li>
                  <li>
                    Defined clear roles, responsibilities, and decision
                    pathways
                  </li>
                  <li>
                    Established an end-to-end token and component change
                    process
                  </li>
                </ul>
              </div>

              <div className="mt-8">
                <SubHead>Adoption &amp; Enablement</SubHead>
                <ul className="mt-3 ml-6 list-disc space-y-2">
                  <li>Introduced contribution guidelines for product teams</li>
                  <li>
                    Established rituals including office hours, reviews, and
                    show-and-tells
                  </li>
                  <li>
                    Mentored designers and content teams on
                    &ldquo;designing with the system&rdquo;
                  </li>
                </ul>
              </div>
            </BodyParagraph>

            <PullQuote>
              This governance model made design system decisions transparent,
              predictable and inclusive instead of ad-hoc.
            </PullQuote>
          </FadeReveal>
        </Container>

        <Container className="mt-[80px]">
          <FadeReveal y={32} delay={0.05}>
            <MaskReveal duration={1} delay={0.05}>
              <div
                className="relative w-full overflow-hidden rounded-[24px] bg-[#f7f1ea]"
                style={{ aspectRatio: "1556 / 886" }}
              >
                <Image
                  src="/images/work/iag/governance-1.png"
                  alt="Governance change pathway — Coach, Advise, Manage/Govern/Improve, and Production swimlanes mapping how a design change moves to production"
                  fill
                  sizes="(min-width: 1280px) 1556px, 100vw"
                  className="object-cover"
                />
              </div>
            </MaskReveal>
          </FadeReveal>
        </Container>

        <Container className="mt-8">
          <FadeReveal y={32} delay={0.05}>
            <MaskReveal duration={1.1} delay={0.05}>
              <div
                className="relative w-full overflow-hidden rounded-[24px] bg-[#f7f1ea]"
                style={{ aspectRatio: "1557 / 1530" }}
              >
                <Image
                  src="/images/work/iag/governance-2.png"
                  alt="Governance artefacts — design system governance models, token change process, breakpoint annotations, design change map and token structure"
                  fill
                  sizes="(min-width: 1280px) 1556px, 100vw"
                  className="object-cover"
                />
              </div>
            </MaskReveal>
          </FadeReveal>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* SOLUTION                                                           */}
      {/* ================================================================ */}
      <section className="pt-[140px]">
        <Container>
          <FadeReveal y={20}>
            <SectionHeading>Solution</SectionHeading>
            <BodyParagraph className="mt-5 max-w-[914px]">
              <SubHead>Journey Redesign</SubHead>
              <ul className="mt-3 ml-6 list-disc space-y-2">
                <li>
                  Rebuilt the acquisition flow from Landing → Quote start →
                  Coverage selection
                </li>
                <li>Introduced progressive disclosure and contextual help</li>
                <li>Applied auto-filled defaults to reduce effort</li>
              </ul>

              <div className="mt-8">
                <SubHead>Key UX Improvements</SubHead>
                <ul className="mt-3 ml-6 list-disc space-y-2">
                  <li>
                    &ldquo;Help me choose&rdquo; guided flow explaining cover
                    types in plain English
                  </li>
                  <li>
                    Mobile-first layouts with scannable cards and clear
                    hierarchy
                  </li>
                  <li>Clear progress indicators to reduce cognitive load</li>
                </ul>
              </div>

              <div className="mt-8">
                <SubHead>System Validation</SubHead>
                <ul className="mt-3 ml-6 list-disc space-y-2">
                  <li>Entire journey built using shared system components</li>
                  <li>WCAG accessibility standards met</li>
                  <li>Proven reusable across brands and products</li>
                </ul>
              </div>
            </BodyParagraph>

            <PullQuote>
              This deep dive de-risked the system and gave stakeholders
              tangible proof of its value in a mission-critical journey.
            </PullQuote>
          </FadeReveal>
        </Container>

        <Container className="mt-[80px]">
          <FadeReveal y={32} delay={0.05}>
            <MaskReveal duration={1.1} delay={0.05}>
              <div
                className="relative w-full overflow-hidden rounded-[24px] bg-[#f7f1ea]"
                style={{ aspectRatio: "1727 / 1491" }}
              >
                <Image
                  src="/images/work/iag/solution.png"
                  alt="Multi-brand solution composite — CGU, IAG, AMI, State and NRMA acquisition pages assembled on the same component foundation"
                  fill
                  sizes="(min-width: 1280px) 1727px, 100vw"
                  className="object-cover"
                />
              </div>
            </MaskReveal>
          </FadeReveal>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* MULTI-BRAND AT SCALE — text left / Team poster right              */}
      {/* ================================================================ */}
      <section className="pt-[140px]">
        <Container>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-7">
              <FadeReveal y={20}>
                <SectionHeading>Multi-brand at Scale</SectionHeading>
                <BodyParagraph className="mt-5 max-w-[764px]">
                  <p className="mb-4">
                    Once the foundations and governance were in place, we
                    focused on making the system truly multi-brand. Instead
                    of maintaining 12 separate libraries, we created a
                    shared core of components and wired brand expression
                    through tokens; colour, typography, imagery and tone.
                  </p>
                  <p className="mb-4">
                    Working side-by-side with engineering, we connected
                    these tokens directly into AEM so that switching from
                    NRMA to CGU, AMI or NZI became a matter of changing a
                    theme, not redesigning a page. Brand teams kept their
                    distinct identities, while product teams finally worked
                    from the same, trusted building blocks.
                  </p>
                  <p>
                    The impact was immediate: marketing and producer squads
                    could launch new campaigns using pre-approved patterns,
                    designers spent less time redrawing the basics, and
                    engineers shipped updates faster because they were
                    building on a single, well-documented system. The
                    design system moved from &ldquo;documentation&rdquo; to
                    the everyday engine behind how IAG&apos;s brands show
                    up online.
                  </p>
                </BodyParagraph>
              </FadeReveal>

              <FadeReveal y={20} delay={0.08}>
                <div className="mt-[80px] max-w-[764px]">
                  <h2 className="font-accent text-[20px] leading-tight md:text-[24px]">
                    <span className="bg-accent-neon px-[0.1em] py-[0.08em] text-white [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">
                      Breather – the team behind the system
                    </span>
                  </h2>
                  <div className="font-accent mt-5 space-y-4 text-[17px] leading-[1.7] md:text-[19px]">
                    <p>
                      <span className="bg-accent-neon px-[0.1em] py-[0.08em] text-white [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">
                        The image on the right is a poster I created for our
                        Slalom × IAG crew. We were a 40+ blended squad of
                        internal teams, vendors and contractors, but day to
                        day we operated as small, focused PODs — ours was
                        nicknamed Thunderbolts. I designed this as a playful
                        way to set the tone for how we worked together: open,
                        collaborative and a bit nerdy. It gave people
                        permission to bring their personality to the project,
                        not just their job title. I led a pod of five
                        designers (I&apos;m the &ldquo;Captain America&rdquo;
                        in the poster 😄), and this kind of shared visual
                        (used in showcases, stand-ups, retros) helped break
                        down silos quickly. It made it easier to have honest
                        conversations, challenge ideas, and keep the energy
                        high while we were doing serious work on a complex,
                        multi-brand design system.
                      </span>
                    </p>
                  </div>
                </div>
              </FadeReveal>
            </div>

            <div className="md:col-span-5">
              <FadeReveal y={32} delay={0.05}>
                <MaskReveal duration={1} delay={0.1}>
                  <div className="relative w-full overflow-hidden rounded-[24px] bg-[#0f0f0f]">
                    <div
                      className="relative w-full"
                      style={{ aspectRatio: "642 / 908" }}
                    >
                      <Image
                        src="/images/work/iag/team.png"
                        alt="Thunderbolts Strike Again — a playful Marvel-style poster of the Slalom × IAG design pod"
                        fill
                        sizes="(min-width: 1280px) 642px, 100vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </MaskReveal>
              </FadeReveal>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* IMPACT / RESULTS                                                   */}
      {/* ================================================================ */}
      <section className="pt-[140px]">
        <Container>
          <FadeReveal y={20}>
            <SectionHeading>Impact / Results</SectionHeading>
            <BodyParagraph className="mt-5 max-w-[914px]">
              <p>
                <span className="font-bold text-white">
                  Design Systems as a Business Accelerator.
                </span>{" "}
                The investment in a scalable system paid off in measurable
                user and operational metrics. We didn&apos;t just make it
                look better; we made it perform.
              </p>
            </BodyParagraph>
          </FadeReveal>
        </Container>

        <Container className="mt-[60px]">
          <FadeReveal y={32} delay={0.05}>
            <MaskReveal duration={1.1} delay={0.05}>
              <div
                className="relative w-full overflow-hidden rounded-[24px] bg-[#1e1e1e]"
                style={{ aspectRatio: "1556 / 886" }}
              >
                <Image
                  src="/images/work/iag/impact-result.png"
                  alt="Impact results — User Impact 21.9% conversion uplift, Operational Impact 36% faster form completion, and a Cultural Impact card on collaborative system thinking"
                  fill
                  sizes="(min-width: 1280px) 1556px, 100vw"
                  className="object-cover"
                />
              </div>
            </MaskReveal>
          </FadeReveal>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* NEXT PROJECT — scroll-driven panel rises and takes over          */}
      {/* ================================================================ */}
      <NextProjectReveal nextSlug="aws-chatbot" />
    </article>
  );
}
