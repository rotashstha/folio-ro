import Image from "next/image";
import { NextProjectReveal } from "@/components/case-study/NextProjectReveal";
import { HeroGrid } from "@/components/case-study/HeroGrid";
import heroImg from "@/content/work/carell/hero.png";
import overviewSideImg from "@/content/work/carell/overview-side.png";
import researchImg from "@/content/work/carell/research.png";
import challengeImg from "@/content/work/carell/challenge.png";
import solutionImg from "@/content/work/carell/solution.png";
import { MaskReveal } from "@/components/ui/MaskReveal";
import { WordReveal } from "@/components/ui/WordReveal";
import { FadeReveal } from "@/components/ui/FadeReveal";
import { CarellStatsGrid } from "@/components/case-study/projects/carell/StatsGrid";

/**
 * Carell — Designing Movement with Meaning.
 * Pixel-faithful rebuild of the Figma reference
 * (rv3fAJdzRW0Wwc7BVtsIKv, node 90:726 "Case 5").
 *
 * Same page system as AtlasCarbon / AWS / IAG / BP:
 *   1728px frame, 85px gutter, dark page (#000), white headings,
 *   #8e8e93 body, Sofia Sans body, Gallient display.
 *
 * Section order matches the Figma top-to-bottom:
 *   Hero → Project meta → Overview / Challenge / Solution stack + side image
 *   → Research → Challenge (detail) → Solution (detail + annotated mockups)
 *   → Impact / Results (interactive stats grid) → Next Project.
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

export function Carell() {
  return (
    <article
      data-cs-root
      data-theme="dark"
      className="font-body relative isolate overflow-x-clip bg-black text-white antialiased"
    >
      {/* ================================================================ */}
      {/* HERO                                                              */}
      {/* Top-left: "Carell" tag + subtitle stacked.                        */}
      {/* Giant Gallient "Carell" wordmark sits in front, right-aligned,    */}
      {/* bleeding down across the top edge of the hero card.               */}
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
                Carell
              </p>
            </FadeReveal>
            <FadeReveal y={16} delay={0.05}>
              <h1
                id="cs-hero-title"
                className="font-body mt-3 max-w-[524px] text-[18px] leading-snug font-normal text-[#8e8e93] md:text-[24px]"
              >
                Designing Movement with Meaning
              </h1>
            </FadeReveal>
          </div>
        </Container>

        {/* Wordmark + hero card — wordmark sits in front, right-aligned,
            bleeding off the right edge with its lower portion overlapping
            the top of the dark stone hero card. */}
        <div className="relative mt-[80px] md:mt-[120px]">
          <Container className="relative z-0">
            <FadeReveal y={32} delay={0.1}>
              <MaskReveal duration={1.1} delay={0.1}>
                <div className="relative w-full overflow-hidden rounded-[24px] bg-black">
                  <div
                    className="relative w-full"
                    style={{ aspectRatio: "1561 / 1080" }}
                  >
                    <Image
                      src={heroImg}
                      alt="Carell mobile app — Projects screen showing Apartment Place, Marine's Apartment Complex, and Gallery Apartment on iPhone, set against a stone slab background"
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
            className="font-display pointer-events-none absolute inset-x-0 top-0 z-10 -translate-y-[55%] pr-6 text-right text-[clamp(4rem,14vw,14rem)] leading-[0.95] tracking-[-0.02em] whitespace-nowrap text-white md:-translate-y-[58%] md:pr-14 lg:pr-[85px]"
          >
            <WordReveal staggerMs={80} durationMs={950}>
              Carell
            </WordReveal>
          </p>
        </div>
      </section>

      {/* ================================================================ */}
      {/* PROJECT META — Role / Team / Contribution / Timeline              */}
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
                Lead UX/UI
                <br />
                Designer
              </MetaValue>
            </FadeReveal>
            <FadeReveal y={20} delay={0.05}>
              <MetaLabel>Team</MetaLabel>
              <div className="mt-[45px] space-y-1">
                <MetaValue>1 Experience Designer</MetaValue>
                <MetaValue>2 Engineers</MetaValue>
                <MetaValue>1 Product Manager</MetaValue>
              </div>
            </FadeReveal>
            <FadeReveal y={20} delay={0.1}>
              <MetaLabel>My contribution</MetaLabel>
              <div className="mt-[45px] space-y-1">
                <MetaValue>Discovery &amp; User Research</MetaValue>
                <MetaValue>Visual Design</MetaValue>
                <MetaValue>Prototyping</MetaValue>
                <MetaValue>User Testing</MetaValue>
              </div>
            </FadeReveal>
            <FadeReveal y={20} delay={0.15}>
              <MetaLabel>Timeline</MetaLabel>
              <MetaValue className="mt-[45px]">21 Weeks</MetaValue>
            </FadeReveal>
          </div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* OVERVIEW STACK                                                    */}
      {/* Left col: Overview / Challenge / Solution (one-liners).           */}
      {/* Right col: portrait city/skyline side image.                      */}
      {/* ================================================================ */}
      <section className="pt-[140px] pb-[60px]">
        <Container>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-7">
              <FadeReveal y={20}>
                <SectionHeading>Overview</SectionHeading>
                <BodyParagraph className="mt-5 max-w-[662px]">
                  <p>
                    Carell is a mobile-first operations platform for joinery
                    manufacturers and installation teams. I led the UX/UI design
                    end-to-end — from on-site research through to a
                    high-fidelity prototype the team could test, validate, and
                    hand to engineering. The brief was to take a coordination
                    problem stitched together by spreadsheets, phone calls, and
                    paper job sheets, and turn it into a single, calm surface
                    that works one-handed on a noisy site.
                  </p>
                </BodyParagraph>
              </FadeReveal>

              <FadeReveal y={20} delay={0.06}>
                <div className="mt-[100px]">
                  <SectionHeading>Challenge</SectionHeading>
                  <BodyParagraph className="mt-5 max-w-[662px]">
                    <p>
                      Production floors, site teams, and office managers were
                      operating in three different versions of reality. Status
                      lived across different tools, dependencies were unclear,
                      and the day was spent chasing updates instead of moving
                      work.
                    </p>
                  </BodyParagraph>
                </div>
              </FadeReveal>

              <FadeReveal y={20} delay={0.12}>
                <div className="mt-[100px]">
                  <SectionHeading>Solution</SectionHeading>
                  <BodyParagraph className="mt-5 max-w-[662px]">
                    <p>
                      A unified mobile platform that connects production,
                      shipping, and installation under one source of truth.
                      Designed for the conditions the work actually happens in —
                      dusty workshops, noisy sites, gloves on, and sun on the
                      screen.
                    </p>
                  </BodyParagraph>
                </div>
              </FadeReveal>
            </div>

            {/* Right column — portrait side image */}
            <div className="md:col-span-5">
              <FadeReveal y={32} delay={0.05}>
                <MaskReveal duration={1} delay={0.1}>
                  <div className="relative w-full overflow-hidden rounded-[24px]">
                    <div
                      className="relative w-full"
                      style={{ aspectRatio: "736 / 809" }}
                    >
                      <Image
                        src={overviewSideImg}
                        alt="High-rise residential tower against a city skyline at dusk — context image for Carell's joinery and installation projects"
                        fill
                        sizes="(min-width: 1280px) 736px, 100vw"
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
      {/* RESEARCH                                                          */}
      {/* ================================================================ */}
      <section className="pt-[140px]">
        <Container>
          <FadeReveal y={20}>
            <SectionHeading>Research</SectionHeading>
            <BodyParagraph className="mt-5 max-w-[914px]">
              <p className="mb-4">
                I immersed myself in real construction workflows, walking
                through joinery shops, observing installers, and mapping how
                jobs move from cutting benches to finished sites. From this,
                three design principles emerged:
              </p>
              <ul className="ml-6 list-disc space-y-3">
                <li>
                  <span className="font-bold text-white">
                    See the whole picture instantly.
                  </span>{" "}
                  A project overview that surfaces stages, tasks, risks, and
                  delays at a glance.
                </li>
                <li>
                  <span className="font-bold text-white">
                    Tap into the details only when you need them.
                  </span>{" "}
                  Drill-down views for items, materials, checklists, and
                  installation notes.
                </li>
                <li>
                  <span className="font-bold text-white">
                    Design for one-hand, on-site usability.
                  </span>{" "}
                  Large touch targets, simplified actions, dark-mode support,
                  and offline resilience.
                </li>
              </ul>
              <p className="mt-6">
                These principles shaped a product that feels fast, grounded, and
                built for real-world environments — dusty workshops, noisy
                sites, and teams always on the move.
              </p>
            </BodyParagraph>
          </FadeReveal>
        </Container>

        <Container className="mt-[80px]">
          <FadeReveal y={32} delay={0.1}>
            <MaskReveal duration={1} delay={0.05}>
              <div className="relative w-full overflow-hidden rounded-[24px]">
                <Image
                  src={researchImg}
                  alt="Research artefacts — joinery production plans, item schedules, and on-site checklist references mapped across the workflow"
                  sizes="(min-width: 1280px) 1556px, 100vw"
                  className="h-auto w-full"
                  placeholder="empty"
                />
              </div>
            </MaskReveal>
          </FadeReveal>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* CHALLENGE (detail)                                                */}
      {/* ================================================================ */}
      <section className="pt-[140px]">
        <Container>
          <FadeReveal y={20}>
            <SectionHeading>Challenge</SectionHeading>
            <BodyParagraph className="mt-5 max-w-[914px]">
              <p className="mb-4">
                Before Carell, manufacturers and installers relied on
                spreadsheets, phone calls, and paper job sheets to coordinate
                work. This meant:
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>
                  No real-time visibility of production or installation status.
                </li>
                <li>
                  Frequent delays from missing information and unclear
                  dependencies.
                </li>
                <li>
                  High operational waste, from miscommunication to rework.
                </li>
                <li>
                  Teams constantly &ldquo;chasing updates&rdquo; instead of
                  doing meaningful work.
                </li>
              </ul>
              <p className="mt-6">
                The opportunity was clear: create a single, intuitive interface
                that brings production floors, site teams, and managers into one
                shared source of truth.
              </p>
            </BodyParagraph>
          </FadeReveal>
        </Container>

        <Container className="mt-[80px]">
          <FadeReveal y={32} delay={0.1}>
            <MaskReveal duration={1} delay={0.05}>
              <div
                className="relative w-full overflow-hidden rounded-[24px] bg-black"
                style={{ aspectRatio: "1556 / 886" }}
              >
                <Image
                  src={challengeImg}
                  alt="Legacy state — Stage list with kitchen bench, vanity cabinets, doors and jams, laundry installation alongside a Kitchen Bench detail view with item code, quantity, colour, and checklist"
                  fill
                  sizes="(min-width: 1280px) 1556px, 100vw"
                  className="object-contain"
                />
              </div>
            </MaskReveal>
          </FadeReveal>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* SOLUTION (detail)                                                 */}
      {/* ================================================================ */}
      <section className="pt-[140px]">
        <Container>
          <FadeReveal y={20}>
            <SectionHeading>Solution</SectionHeading>
            <BodyParagraph className="mt-5 max-w-[683px]">
              <p className="mb-4 font-bold text-white">
                A simple interface for incredibly complex work.
              </p>
              <p className="mb-4">
                The result is a unified mobile platform that turns operational
                chaos into coordinated action:
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>
                  Live project views showing progress across buildings, units,
                  and rooms.
                </li>
                <li>
                  Item-level tracking for every bench, cabinet, or installation
                  component.
                </li>
                <li>
                  Smart checklists and on-site logging for quality, issues, and
                  photos.
                </li>
                <li>
                  Real-time sync so office teams and installers stay aligned.
                </li>
              </ul>
            </BodyParagraph>
          </FadeReveal>
        </Container>

        {/* Annotated solution mockups — full-bleed image; annotations are baked
            into the asset (Track and Label / Builders and Contractors / Receive
            Live data / Actions and Defects) to match the Figma exactly. */}
        <Container className="mt-[80px]">
          <FadeReveal y={32} delay={0.05}>
            <MaskReveal duration={1.1} delay={0.05}>
              <div
                className="relative w-full overflow-hidden rounded-[24px] bg-black"
                style={{ aspectRatio: "1557 / 879" }}
              >
                <Image
                  src={solutionImg}
                  alt="Five Carell app screens fanned across a dark canvas with hand-drawn annotations — Track and Label production, shipping, and installations; Builders and Contractors can easily collaborate; Receive live data on workflows, site progress, and installations; Actions and Defects notifications"
                  fill
                  sizes="(min-width: 1280px) 1557px, 100vw"
                  className="object-contain"
                />
              </div>
            </MaskReveal>
          </FadeReveal>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* IMPACT / RESULTS — interactive stats grid                         */}
      {/* ================================================================ */}
      <section className="pt-[140px]">
        <Container>
          <FadeReveal y={20}>
            <SectionHeading>Impact / Results</SectionHeading>
            <BodyParagraph className="mt-5 max-w-[914px]">
              <p>
                Carell moved from concept to a tested, high-fidelity prototype
                in 21 weeks — validated with the joinery and installation teams
                it was built for. The early signal: faster quotes, clearer
                ownership, and a measurable lift in the moments that drive
                conversion.
              </p>
            </BodyParagraph>
          </FadeReveal>
        </Container>

        <Container className="mt-[60px] md:mt-[80px]">
          <FadeReveal y={24} delay={0.05}>
            <CarellStatsGrid />
          </FadeReveal>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* NEXT PROJECT — scroll-driven panel rises and takes over          */}
      {/* ================================================================ */}
      <NextProjectReveal nextSlug="atlas-carbon" />
    </article>
  );
}
