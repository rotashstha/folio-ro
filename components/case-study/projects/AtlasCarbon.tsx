import Image from "next/image";
import overviewUtilityImg from "@/content/work/atlas-carbon/webp/Overview-utility.webp";
import remediesImg from "@/content/work/atlas-carbon/webp/Remedies.webp";
import { MaskReveal } from "@/components/ui/MaskReveal";
import { WordReveal } from "@/components/ui/WordReveal";
import { FadeReveal } from "@/components/ui/FadeReveal";
import { NextProjectReveal } from "@/components/case-study/NextProjectReveal";
import { HeroGrid } from "@/components/case-study/HeroGrid";

/**
 * Atlas Carbon — pixel-faithful rebuild of the Figma reference
 * (rv3fAJdzRW0Wwc7BVtsIKv, node 45:5308).
 *
 * Theme: DARK page (bg-black) with white headings + #8e8e93 body gray.
 * Typography: Sofia Sans for body/headings (matches homepage system),
 * Gallient for the giant editorial display.
 *
 * Frame: 1728px wide, 85px gutter. We translate to a centered max-width
 * container with a clamped gutter so the page reflows below 1728px.
 *
 * Body color tokens used:
 *   - text-white            (#ffffff)  — display, headings, meta values, link text
 *   - text-[#8e8e93]        (#8e8e93)  — meta labels, body paragraphs
 *   - bg-black              (#000000)  — page surface
 *   - bg-card-teal          (#d6f3f7)  — hero / map / utility cards
 *   - bg-[#0f0f0f]                     — placeholder dark cards (Discovery, Challenge grid…)
 */

const ATLAS_BRAND_RAMP = [
  "#f7ffe6",
  "#ecffc4",
  "#d6ff8d",
  "#beff4b",
  "#d6ff35",
  "#afeb00",
  "#82b228",
  "#5d7d18",
  "#3b5906",
  "#243807",
  "#0e1c01",
];

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

/**
 * Section heading at 24px Sofia Sans Regular, white. Matches every body
 * section label in the Figma (Overview, Challenge, Discovery, Solution,
 * Design System, Remedies, Leveraging AI).
 */
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-body text-[20px] leading-tight font-normal text-white md:text-[24px]">
      {children}
    </h2>
  );
}

/**
 * Body paragraph: Sofia Sans Regular 16px gray (#8e8e93). Generous
 * line-height for an editorial dark-mode read.
 */
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

/** Meta column label — gray. */
function MetaLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-body text-[20px] leading-tight font-normal text-[#8e8e93] md:text-[24px]">
      {children}
    </h3>
  );
}

/** Meta column value — bold white. */
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

function ImageCaption({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-body mt-5 text-center text-[14px] font-bold text-[#8e8e93] md:text-[16px]">
      {children}
    </p>
  );
}

export function AtlasCarbon() {
  return (
    <article
      data-cs-root
      data-theme="dark"
      className="relative isolate overflow-x-clip bg-black font-body text-white antialiased"
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
          {/* Tag + subtitle stacked at top-left */}
          <div className="max-w-[640px]">
            <FadeReveal y={12}>
              <p
                id="cs-hero-tag"
                className="font-body text-[24px] leading-tight font-bold text-white md:text-[32px]"
              >
                Atlas Carbon
              </p>
            </FadeReveal>
            <FadeReveal y={16} delay={0.05}>
              <h1
                id="cs-hero-title"
                className="font-body mt-3 max-w-[524px] text-[18px] leading-snug font-normal text-[#8e8e93] md:text-[24px]"
              >
                Empowering Farmers with Smarter, Simpler Tools
              </h1>
            </FadeReveal>
          </div>
        </Container>

        {/* Wordmark + mint hero card — wordmark sits in front, right-aligned, bleeding off the right edge */}
        <div className="relative mt-[80px] md:mt-[120px]">
          <Container className="relative z-0">
            <FadeReveal y={32} delay={0.1}>
              <MaskReveal duration={1.1} delay={0.1}>
                <div className="relative w-full overflow-hidden rounded-[24px] bg-[#d6f3f7]">
                  <div
                    className="relative w-full"
                    style={{ aspectRatio: "1561 / 1080" }}
                  >
                    <Image
                      src="/images/work/atlas-carbon/hero.webp"
                      alt="Maia farming app — two iPhone 16 Pro mockups showing the redesigned grazing dashboard and overview"
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
              Atlas Carbon
            </WordReveal>
          </p>
        </div>
      </section>

      {/* ================================================================ */}
      {/* PROJECT META — 4 columns: Role / Team / My contribution / Timeline */}
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
                Lead Product
                <br />
                Designer
              </MetaValue>
            </FadeReveal>
            <FadeReveal y={20} delay={0.05}>
              <MetaLabel>Team</MetaLabel>
              <div className="mt-[45px] space-y-1">
                <MetaValue>2 Product Designers</MetaValue>
                <MetaValue>5 Engineers</MetaValue>
                <MetaValue>1 QE</MetaValue>
              </div>
            </FadeReveal>
            <FadeReveal y={20} delay={0.1}>
              <MetaLabel>My contribution</MetaLabel>
              <div className="mt-[45px] space-y-1">
                <MetaValue>Discovery</MetaValue>
                <MetaValue>0&gt;1 Product Strategy</MetaValue>
                <MetaValue>End-to-end UI &amp; Interaction design</MetaValue>
                <MetaValue>Design system</MetaValue>
              </div>
            </FadeReveal>
            <FadeReveal y={20} delay={0.15}>
              <MetaLabel>Timeline</MetaLabel>
              <MetaValue className="mt-[45px]">26 Weeks</MetaValue>
            </FadeReveal>
          </div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* OVERVIEW — left column has Overview/Challenge/Solution stack,     */}
      {/* right column has the offline-mode photo card.                      */}
      {/* ================================================================ */}
      <section className="pt-[140px] pb-[60px]">
        <Container>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-12">
            {/* Left: 3 labelled paragraphs stacked */}
            <div className="md:col-span-7">
              <FadeReveal y={20}>
                <SectionHeading>Overview</SectionHeading>
                <BodyParagraph className="mt-5 max-w-[662px]">
                  <p className="mb-4">
                    Maia is a powerful tool for graziers and carbon farmers,
                    but its complexity was limiting adoption. I led the 0→1
                    redesign of the experience to test whether simplifying
                    core grazing workflows could unlock confidence, faster
                    decision-making, and sustained usage, without stripping
                    away capability for advanced users.
                  </p>
                  <p>
                    The work focused on validating which moments truly
                    mattered to farmers in the field, and reshaping the
                    product around those signals.
                  </p>
                </BodyParagraph>
              </FadeReveal>

              <FadeReveal y={20} delay={0.06}>
                <div className="mt-[100px]">
                  <SectionHeading>Challenge</SectionHeading>
                  <BodyParagraph className="mt-5 max-w-[662px]">
                    <p className="mb-4">
                      Maia struggled with adoption despite strong
                      product–market fit. New users found the depth of
                      capability overwhelming; long-term customers had built
                      workarounds for inconsistent UI; and decisions in the
                      paddock took longer than they should.
                    </p>
                    <p>
                      The core question we needed to answer was whether
                      simplifying the surface — without removing power — could
                      materially shift activation and trust.
                    </p>
                  </BodyParagraph>
                </div>
              </FadeReveal>

              <FadeReveal y={20} delay={0.12}>
                <div className="mt-[100px]">
                  <SectionHeading>Solution</SectionHeading>
                  <BodyParagraph className="mt-5 max-w-[662px]">
                    <p className="mb-4">
                      A tokenised system, opinionated information
                      architecture, and a single decision surface that
                      collapses calendars, mobs, paddocks, and tasks.
                    </p>
                    <p>
                      Guidance for new users sits next to power tools for
                      experienced ones — without requiring re-onboarding. The
                      result is a product that earns trust quickly and grows
                      with the operator.
                    </p>
                  </BodyParagraph>
                </div>
              </FadeReveal>
            </div>

            {/* Right: Offline-mode photo card */}
            <div className="md:col-span-5">
              <FadeReveal y={32} delay={0.05}>
                <MaskReveal duration={1} delay={0.1}>
                  <div className="relative w-full overflow-hidden rounded-[24px]">
                    <div
                      className="relative w-full"
                      style={{ aspectRatio: "736 / 740" }}
                    >
                      <Image
                        src={overviewUtilityImg}
                        alt="Two graziers in a CFMOTO 4x4 utility vehicle on rangeland, with an offline-mode notification overlay"
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
      {/* DISCOVERY                                                          */}
      {/* ================================================================ */}
      <section className="pt-[140px]">
        <Container>
          <FadeReveal y={20}>
            <SectionHeading>Discovery</SectionHeading>
            <BodyParagraph className="mt-5 max-w-[914px]">
              <p className="mb-4">
                I led the full product design process from discovery through
                to a validated MVP, starting with what we didn&apos;t yet
                know.
              </p>
              <ul className="ml-6 list-disc space-y-3">
                <li>
                  <span className="font-bold text-white">
                    Challenged assumptions:
                  </span>{" "}
                  We initially believed feature depth was the main value
                  driver. Conversations with 20+ farmers, new users, long-term
                  customers, churned users, and competitors&apos; users,
                  revealed that confidence and decision clarity were the real
                  adoption blockers.
                </li>
                <li>
                  <span className="font-bold text-white">
                    Mapped user maturity:
                  </span>{" "}
                  Instead of designing for &ldquo;average&rdquo; users, I
                  tested how needs changed from first-time grazers to
                  experienced carbon project leads. This shaped when to guide,
                  when to automate, and when to step back.
                </li>
                <li>
                  <span className="font-bold text-white">
                    Iterated on workflows:
                  </span>{" "}
                  Core grazing plans, mob movements, and task tracking were
                  repeatedly restructured to reduce cognitive load and surface
                  the next best action, rather than more options. This phase
                  created a learning-led foundation for a more intuitive and
                  resilient product.
                </li>
              </ul>
            </BodyParagraph>
          </FadeReveal>
        </Container>

        {/* Discovery imagery card — full image with embedded callouts */}
        <Container className="mt-[80px]">
          <FadeReveal y={32} delay={0.1}>
            <MaskReveal duration={1} delay={0.1}>
              <div
                className="relative w-full overflow-hidden rounded-[24px] bg-[#0f0f0f]"
                style={{ aspectRatio: "1556 / 886" }}
              >
                <Image
                  src="/images/work/atlas-carbon/discovery.webp"
                  alt="Discovery process diagram with Design Principles, Scenario Flow Mapping, and Early Solution Ideas callouts"
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
      {/* CHALLENGE — heading + bullets + 3 image callout cards              */}
      {/* ================================================================ */}
      <section className="pt-[140px]">
        <Container>
          <FadeReveal y={20}>
            <SectionHeading>Challenge</SectionHeading>
            <BodyParagraph className="mt-5 max-w-[914px]">
              <p className="mb-4">
                Despite strong product-market fit, Maia showed clear signs of
                friction that directly impacted growth:
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>Steep learning curves for new and aspirational users</li>
                <li>
                  Inconsistent UI making grazing decisions feel harder than
                  they should
                </li>
                <li>Legacy design debt across devices and modules</li>
                <li>
                  Feature-rich but visually fragmented workflows, reducing
                  confidence and slowing onboarding
                </li>
              </ul>
            </BodyParagraph>

            <p className="font-body mt-12 max-w-[699px] text-[15px] leading-snug font-normal text-[#8e8e93] italic md:text-[16px]">
              The goal wasn&apos;t just to modernise the interface, it was to
              test whether unifying decision-making could improve activation
              and trust for new users, while still supporting expert farmers.
            </p>
          </FadeReveal>
        </Container>

        {/* 3 portrait image cards — Planning Overview / Grazing Stats / Mob Activity */}
        <Container className="mt-[80px]">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {[
              {
                label: "Planning Overview",
                src: "/images/work/atlas-carbon/planning-overview.webp",
                delay: 0,
              },
              {
                label: "Grazing Stats",
                src: "/images/work/atlas-carbon/grazing-stats.webp",
                delay: 0.08,
              },
              {
                label: "Grazing / Mob Activity",
                src: "/images/work/atlas-carbon/grazing-mob-activity.webp",
                delay: 0.16,
              },
            ].map((card) => (
              <FadeReveal key={card.label} y={24} delay={card.delay}>
                <MaskReveal duration={0.9} delay={card.delay}>
                  <div
                    className="relative w-full overflow-hidden rounded-[24px] bg-[#0f0f0f]"
                    style={{ aspectRatio: "503 / 668" }}
                  >
                    <Image
                      src={card.src}
                      alt={`${card.label} screen — Maia mobile app`}
                      fill
                      sizes="(min-width: 1280px) 503px, 50vw"
                      className="object-cover"
                    />
                  </div>
                </MaskReveal>
                <ImageCaption>{card.label}</ImageCaption>
              </FadeReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* PLANNING OVERVIEW DESKTOP VIEW — full-width map dashboard          */}
      {/* ================================================================ */}
      <section className="pt-[100px]">
        <Container>
          <FadeReveal y={32}>
            <MaskReveal duration={1} delay={0.05}>
              <div className="relative w-full overflow-hidden rounded-[24px] bg-[#d6f3f7]">
                <div
                  className="relative w-full"
                  style={{ aspectRatio: "1556 / 886" }}
                >
                  <Image
                    src="/images/work/atlas-carbon/planning-overview-desktop.webp"
                    alt="Maia desktop dashboard — Cloverton Fields paddock map with mob chips overlaid on satellite imagery"
                    fill
                    sizes="(min-width: 1280px) 1556px, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </MaskReveal>
            <ImageCaption>Planning Overview Desktop View</ImageCaption>
          </FadeReveal>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* DESIGN SYSTEM                                                      */}
      {/* ================================================================ */}
      <section className="pt-[140px]">
        <Container>
          <FadeReveal y={20}>
            <SectionHeading>Design System</SectionHeading>
            <BodyParagraph className="mt-5 max-w-[914px]">
              I built the design system featuring typography, color styles,
              layouts, components and variables for fast implementations of
              new designs. Variables were built with collaboration with iOS
              engineer so that we could use the same variable names in the
              code.
            </BodyParagraph>
          </FadeReveal>
        </Container>

        {/* Two side-by-side design-system panels */}
        <Container className="mt-[80px]">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            <FadeReveal y={24}>
              <MaskReveal duration={0.9} delay={0.05}>
                <div
                  className="relative w-full overflow-hidden rounded-[24px] bg-[#0f0f0f] p-6 md:p-10"
                  style={{ aspectRatio: "768 / 883" }}
                >
                  <div className="relative h-full w-full">
                    <Image
                      src="/images/work/atlas-carbon/design-system-1.webp"
                      alt="Atlas Carbon design system — components, typography, and color tokens"
                      fill
                      sizes="(min-width: 1280px) 700px, 45vw"
                      className="object-contain"
                    />
                  </div>
                </div>
              </MaskReveal>
            </FadeReveal>
            <FadeReveal y={24} delay={0.08}>
              <MaskReveal duration={0.9} delay={0.13}>
                <div
                  className="relative w-full overflow-hidden rounded-[24px] bg-[#0f0f0f] p-6 md:p-10"
                  style={{ aspectRatio: "768 / 883" }}
                >
                  <div className="relative h-full w-full">
                    <Image
                      src="/images/work/atlas-carbon/design-system-2.webp"
                      alt="Atlas Carbon design system — variables and component states"
                      fill
                      sizes="(min-width: 1280px) 700px, 45vw"
                      className="object-contain"
                    />
                  </div>
                </div>
              </MaskReveal>
            </FadeReveal>
          </div>
        </Container>

        {/* Brand color ramp — 11 swatches, edge-to-edge */}
        <Container className="mt-12">
          <FadeReveal y={16} delay={0.1}>
            <div className="grid grid-cols-11 gap-3 md:gap-5">
              {ATLAS_BRAND_RAMP.map((value, i) => (
                <div
                  key={i}
                  className="aspect-square w-full rounded-[12px]"
                  style={{ backgroundColor: value }}
                />
              ))}
            </div>
          </FadeReveal>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* REMEDIES — flow diagram                                            */}
      {/* ================================================================ */}
      <section className="pt-[140px]">
        <Container>
          <FadeReveal y={20}>
            <SectionHeading>Remedies</SectionHeading>
            <BodyParagraph className="mt-5 max-w-[914px]">
              Once the main flow was designed and improved based on feedback
              from the team and customers, I built the map with different
              remedies such as payment issues, power problems, plug issues,
              unexpected disconnections, and others.
            </BodyParagraph>
          </FadeReveal>
        </Container>

        <Container className="mt-[80px]">
          <FadeReveal y={32} delay={0.1}>
            <MaskReveal duration={1} delay={0.05}>
              <div className="relative w-full overflow-hidden rounded-[24px] bg-[#0f0f0f]">
                <div
                  className="relative w-full"
                  style={{ aspectRatio: "1556 / 886" }}
                >
                  <Image
                    src={remediesImg}
                    alt="Tasks scenario flow map — phone screen on the left connected to a network of yellow and green annotated steps covering Add new, New task, User Input, Edit, Modal confirmation, and Notifications"
                    fill
                    sizes="(min-width: 1280px) 1556px, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </MaskReveal>
          </FadeReveal>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* LEVERAGING AI                                                      */}
      {/* ================================================================ */}
      <section className="pt-[140px]">
        <Container>
          <FadeReveal y={20}>
            <SectionHeading>Leveraging AI</SectionHeading>
            <BodyParagraph className="mt-5 max-w-[914px]">
              <p className="mb-4">
                I accelerate product development by using AI to transform
                sketches into visual concepts and building functional
                prototypes in Cursor powered by real backend data. From
                implementing micro-animations to shipping UI fixes, I leverage
                Xcode 26 to push high-polish changes directly to production,
                drastically reducing the time from ideation to launch.
              </p>
              <p className="mb-4">
                The complexity of farm workflows meant we needed fast learning
                loops, not polished guesses.
              </p>
              <ul className="ml-6 list-disc space-y-3">
                <li>
                  <span className="font-bold text-white">
                    Rapid experimentation:
                  </span>{" "}
                  Used ChatGPT as a thinking partner to map edge cases,
                  pressure-test logic, and explore alternative flows before
                  committing to UI.
                </li>
                <li>
                  <span className="font-bold text-white">Fast validation:</span>{" "}
                  v0.dev prototypes enabled quick testing of structure and
                  hierarchy with stakeholders and farmers, allowing us to
                  discard weaker models early.
                </li>
                <li>
                  <span className="font-bold text-white">System-first bets:</span>{" "}
                  Instead of designing screens in isolation, I shaped a
                  tokenised UI kit in Figma early, testing whether a system-led
                  approach could support speed and flexibility under a
                  six-month MVP timeline.
                </li>
              </ul>
            </BodyParagraph>
          </FadeReveal>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* LEVERAGING AI                                                       */}
      {/* ================================================================ */}
      <section className="pt-[100px]">
        <Container>
          <FadeReveal y={32} delay={0.05}>
            <MaskReveal duration={1.1} delay={0.05}>
              <div
                className="relative w-full overflow-hidden rounded-[24px] bg-[#0f0f0f]"
                style={{ aspectRatio: "4668 / 2658" }}
              >
                <Image
                  src="/images/work/atlas-carbon/leveraging-ai.png"
                  alt="Leveraging AI — Cursor and Xcode 26 prototyping workflow alongside ChatGPT exploration"
                  fill
                  sizes="(min-width: 1280px) 1726px, 100vw"
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
              <p className="mb-4">
                The final MVP focused on removing friction at the moments that
                mattered most:
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>
                  Reduced context-switching by collapsing calendars, mobs,
                  paddocks, and tasks into a single decision surface.
                </li>
                <li>
                  Supported user progression: guided for new farmers,
                  efficient and powerful for experienced users, without
                  re-onboarding.
                </li>
                <li>
                  Optimised for in-field use, enabling faster updates and
                  real-time decisions.
                </li>
                <li>
                  Fewer ambiguities in flows led to faster implementation and
                  better cross-team alignment.
                </li>
              </ul>
              <p className="mt-4">
                <span className="font-bold text-white">Early signals:</span>{" "}
                The MVP was pilot-ready with strong engagement from rotational
                grazing farmers, validating the core hypothesis around
                simplification and confidence.
              </p>
            </BodyParagraph>
          </FadeReveal>
        </Container>

        {/* 4-image 2x2 grid */}
        <Container className="mt-[80px]">
          <FadeReveal y={32} delay={0.05}>
            <MaskReveal duration={1.1} delay={0.05}>
              <div
                className="relative w-full overflow-hidden rounded-[24px]"
                style={{ aspectRatio: "1727 / 1491" }}
              >
                <Image
                  src="/images/work/atlas-carbon/solution.webp"
                  alt="Final MVP screens — 2x2 grid showing Forecasting analytics, Import livestock table, paddock boundary configuration on the map, and the Graze planner timeline"
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
      {/* NEXT PROJECT — scroll-driven panel rises and takes over          */}
      {/* ================================================================ */}
      <NextProjectReveal nextSlug="iag-design-system" />

    </article>
  );
}
