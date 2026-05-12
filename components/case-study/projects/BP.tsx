import Image from "next/image";
import { NextProjectReveal } from "@/components/case-study/NextProjectReveal";
import { HeroGrid } from "@/components/case-study/HeroGrid";
import heroImg from "@/content/work/bp/hero.png";
import overviewSideImg from "@/content/work/bp/overview-side.png";
import brandUtilisationImg from "@/content/work/bp/brand-utilisation.png";
import researchImg from "@/content/work/bp/research.png";
import challengeImg from "@/content/work/bp/challenge.png";
import designSystem1Img from "@/content/work/bp/design-system-1.png";
import designSystem2Img from "@/content/work/bp/design-system-2.png";
import solution1Img from "@/content/work/bp/solution-1.png";
import solution2Img from "@/content/work/bp/solution-2.png";
import solution3Img from "@/content/work/bp/solution-3.png";
import { MaskReveal } from "@/components/ui/MaskReveal";
import { WordReveal } from "@/components/ui/WordReveal";
import { FadeReveal } from "@/components/ui/FadeReveal";

/**
 * bp — Fuel Supply Planning Platform.
 * Pixel-faithful rebuild of the Figma reference
 * (rv3fAJdzRW0Wwc7BVtsIKv, node 83:713 "Case 4").
 *
 * Follows the AtlasCarbon / AWS / IAG page system:
 *   1728px frame, 85px gutter, dark page (#000), white headings,
 *   #8e8e93 body, Sofia Sans body, Gallient display.
 *
 * Section order matches Figma top-to-bottom:
 *   Hero → Project meta → Overview / Challenge / Solution / Brand utilisation
 *   stack + side image → full-bleed brand image → Research → Challenge (detail)
 *   → Design System (two full-bleed images) → Solution (three stacked images)
 *   → Next Project.
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

export function BP() {
  return (
    <article
      data-cs-root
      data-theme="dark"
      className="font-body relative isolate overflow-x-clip bg-black text-white antialiased"
    >
      {/* ================================================================ */}
      {/* HERO                                                              */}
      {/* Top-left: BP p.l.c. tag + Fuel Supply Planning Platform subtitle. */}
      {/* Top-right: oversized "bp" wordmark that overlaps the dashboard.   */}
      {/* Below: dark hero card with the Midstream SPT dashboard mockup.    */}
      {/* ================================================================ */}
      <section
        data-section="hero"
        aria-labelledby="cs-hero-title"
        className="relative pt-[160px] md:pt-[180px]"
      >
        <HeroGrid />
        <Container>
          <div className="relative z-10 flex items-start justify-between gap-8">
            <div className="max-w-[640px]">
              <FadeReveal y={12}>
                <p
                  id="cs-hero-tag"
                  className="font-body text-[24px] leading-tight font-bold text-white md:text-[32px]"
                >
                  BP p.l.c.
                </p>
              </FadeReveal>
              <FadeReveal y={16} delay={0.05}>
                <h1
                  id="cs-hero-title"
                  className="font-body mt-3 max-w-[524px] text-[18px] leading-snug font-normal text-[#8e8e93] md:text-[24px]"
                >
                  Fuel Supply Planning Platform
                </h1>
              </FadeReveal>
            </div>

            {/* Giant editorial "bp" — Gallient, right-aligned, drops over the hero card. */}
            <p
              aria-hidden
              className="font-display pointer-events-none select-none text-right text-[clamp(6rem,16vw,18rem)] leading-[0.85] tracking-[-0.02em] text-white"
            >
              <WordReveal staggerMs={80} durationMs={950}>
                bp
              </WordReveal>
            </p>
          </div>
        </Container>

        {/* Hero card — pulled up so the "bp" wordmark above overlaps its top-right corner. */}
        <Container className="relative z-0 -mt-[40px] md:-mt-[90px]">
          <FadeReveal y={32} delay={0.1}>
            <MaskReveal duration={1.1} delay={0.1}>
              <div className="relative w-full overflow-hidden rounded-[24px] bg-black">
                <div
                  className="relative w-full"
                  style={{ aspectRatio: "1555 / 1056" }}
                >
                  <Image
                    src={heroImg}
                    alt="bp Midstream SPT — fuel supply planning dashboard with tank data, inventory grid, and nomination action modal"
                    fill
                    priority
                    sizes="(min-width: 1280px) 1555px, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </MaskReveal>
          </FadeReveal>
        </Container>
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
              <MetaValue className="mt-[45px]">Experience Designer</MetaValue>
            </FadeReveal>
            <FadeReveal y={20} delay={0.05}>
              <MetaLabel>Team</MetaLabel>
              <div className="mt-[45px] space-y-1">
                <MetaValue>1 Experience Designer</MetaValue>
                <MetaValue>3 Engineers</MetaValue>
                <MetaValue>2 Data Specialists</MetaValue>
                <MetaValue>1 Product Owner</MetaValue>
              </div>
            </FadeReveal>
            <FadeReveal y={20} delay={0.1}>
              <MetaLabel>My contribution</MetaLabel>
              <div className="mt-[45px] space-y-1">
                <MetaValue>Discovery &amp; User Interviews</MetaValue>
                <MetaValue>Co-design sessions with users</MetaValue>
                <MetaValue>End-to-end product design</MetaValue>
              </div>
            </FadeReveal>
            <FadeReveal y={20} delay={0.15}>
              <MetaLabel>Timeline</MetaLabel>
              <MetaValue className="mt-[45px]">18 Weeks</MetaValue>
            </FadeReveal>
          </div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* OVERVIEW STACK                                                    */}
      {/* Left col: Overview / Challenge / Solution / Brand utilisation.    */}
      {/* Right col: cargo-ship card with "Care for others".                */}
      {/* ================================================================ */}
      <section className="pt-[140px] pb-[60px]">
        <Container>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-7">
              <FadeReveal y={20}>
                <SectionHeading>Overview</SectionHeading>
                <BodyParagraph className="mt-5 max-w-[662px]">
                  <p className="mb-4">
                    I led the experience strategy and end-to-end design for
                    bp&apos;s Fuel Supply Planning Platform. It&apos;s the
                    system supply planners and operational teams sit inside
                    every day to coordinate fuel across the network.
                  </p>
                  <p>
                    The brief was to take a fragmented planning ecosystem and
                    turn it into one cohesive experience. Reduce the complexity
                    of high-pressure decisions, give planners better visibility
                    into what&apos;s happening, and put in place a foundation
                    the business could keep building on.
                  </p>
                </BodyParagraph>
              </FadeReveal>

              <FadeReveal y={20} delay={0.06}>
                <div className="mt-[100px]">
                  <SectionHeading>Challenge</SectionHeading>
                  <BodyParagraph className="mt-5 max-w-[662px]">
                    <p>
                      Planning was spread across legacy tools, spreadsheets,
                      and disconnected interfaces. Every system had its own
                      logic and its own visual language, so planners were
                      making time-critical decisions inside tools that lacked
                      consistency, transparency, and basic usability. The
                      cognitive load was heavy. The operational risk grew with
                      it.
                    </p>
                  </BodyParagraph>
                </div>
              </FadeReveal>

              <FadeReveal y={20} delay={0.12}>
                <div className="mt-[100px]">
                  <SectionHeading>Solution</SectionHeading>
                  <BodyParagraph className="mt-5 max-w-[662px]">
                    <p>
                      I led the experience strategy and a unified interaction
                      framework that pulled operational workflows into one
                      cohesive planning experience. Service design, systems
                      thinking, and UX strategy worked together to cut
                      complexity, sharpen efficiency, and create a foundation
                      that future products in the ecosystem could plug into.
                    </p>
                  </BodyParagraph>
                </div>
              </FadeReveal>

              <FadeReveal y={20} delay={0.18}>
                <div className="mt-[100px]">
                  <SectionHeading>Brand utilisation</SectionHeading>
                  <BodyParagraph className="mt-5 max-w-[662px]">
                    <p className="mb-4">
                      The platform supports time-sensitive decisions where
                      errors carry real downstream cost. The experience needed
                      to feel:
                    </p>
                    <ul className="ml-6 list-disc space-y-2">
                      <li>Calm under operational pressure</li>
                      <li>Clear and data-confident</li>
                      <li>Efficient without feeling robotic</li>
                      <li>Trustworthy for high-stakes decision-making</li>
                      <li>Consistent across complex workflows</li>
                      <li>Human-centred while supporting technical users</li>
                    </ul>
                    <p className="mt-4">
                      Across the visual and interaction language, clarity,
                      hierarchy, and decision support came first. Decoration
                      came second, if at all.
                    </p>
                  </BodyParagraph>
                </div>
              </FadeReveal>
            </div>

            {/* Right column — cargo ship card with "Care for others" */}
            <div className="md:col-span-5">
              <FadeReveal y={32} delay={0.05}>
                <MaskReveal duration={1} delay={0.1}>
                  <div className="relative w-full overflow-hidden rounded-[24px]">
                    <div
                      className="relative w-full"
                      style={{ aspectRatio: "736 / 906" }}
                    >
                      <Image
                        src={overviewSideImg}
                        alt="Aerial view of a bp container ship at sea with the brand statement Care for others overlaid"
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
      {/* BRAND UTILISATION — full-bleed bp Energy Experts image            */}
      {/* ================================================================ */}
      <section className="pt-[100px]">
        <FadeReveal y={32} delay={0.05}>
          <MaskReveal duration={1.1} delay={0.05}>
            <div
              className="relative w-full overflow-hidden bg-black"
              style={{ aspectRatio: "1727 / 975" }}
            >
              <Image
                src={brandUtilisationImg}
                alt="bp brand utilisation reference — BP Energy Experts campaign layout pairing facility, retail, and offshore imagery with brand statements"
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </MaskReveal>
        </FadeReveal>
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
                I led discovery to understand fuel supply planning as
                it&apos;s actually practised, not as it&apos;s documented.
                Across{" "}
                <span className="font-bold text-white">12 user interviews</span>{" "}
                and{" "}
                <span className="font-bold text-white">
                  2 rounds of co-design sessions
                </span>{" "}
                with planners, operations stakeholders, business analysts, and
                technical teams, we mapped the real workflows and the
                workarounds that had quietly become load-bearing.
              </p>
              <p className="mt-6 mb-3 font-bold text-white">What we learned</p>
              <ul className="ml-6 list-disc space-y-3">
                <li>
                  Critical information lived across disconnected platforms.
                  Planners stitched it together from memory and habit.
                </li>
                <li>
                  Spreadsheets had become an unofficial source of truth.
                  Fragile, duplicative, and high risk.
                </li>
                <li>
                  Workflows varied meaningfully between teams, but the
                  interfaces treated them as identical.
                </li>
                <li>
                  Under time pressure, dense screens and inconsistent patterns
                  added cognitive load instead of signal.
                </li>
                <li>
                  Planners wanted confidence in forecasting decisions. Not more
                  features.
                </li>
              </ul>
              <p className="mt-6">
                The work brought business and technical stakeholders around a
                shared view of operational complexity, and made the case for
                where experience improvements would do the most good.
              </p>
            </BodyParagraph>
          </FadeReveal>
        </Container>

        <Container className="mt-[80px]">
          <FadeReveal y={32} delay={0.1}>
            <MaskReveal duration={1} delay={0.05}>
              <div
                className="relative w-full overflow-hidden rounded-[24px] bg-black"
                style={{ aspectRatio: "1555 / 975" }}
              >
                <Image
                  src={researchImg}
                  alt="User research summary — 12 user interviews and 2 co-design sessions, with quotes from Supply Operators and Co-ordinators on data trust, spreadsheet duplication, and the need for a single source of truth"
                  fill
                  sizes="(min-width: 1280px) 1555px, 100vw"
                  className="object-cover"
                />
              </div>
            </MaskReveal>
          </FadeReveal>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* CHALLENGE (detailed)                                              */}
      {/* ================================================================ */}
      <section className="pt-[140px]">
        <Container>
          <FadeReveal y={20}>
            <SectionHeading>Challenge</SectionHeading>
            <BodyParagraph className="mt-5 max-w-[914px]">
              <p className="mb-4">
                Fuel supply planning is unavoidably complex. Teams coordinate
                supply, logistics, operational constraints, forecasting, and
                shifting business conditions in real time. The toolset had
                grown incrementally over many years, and the experience had
                drifted with it.
              </p>
              <ul className="ml-6 list-disc space-y-3">
                <li>
                  <span className="font-bold text-white">
                    Fragmented ecosystem.
                  </span>{" "}
                  A single planning task could span several systems,
                  spreadsheets, dashboards, and chat threads. Each with its own
                  logic.
                </li>
                <li>
                  <span className="font-bold text-white">
                    High cognitive load.
                  </span>{" "}
                  Critical decisions were made quickly inside dense interfaces
                  where the most important signal was often buried.
                </li>
                <li>
                  <span className="font-bold text-white">
                    Lack of consistency.
                  </span>{" "}
                  Different tools used different patterns, terminology, and
                  visual structures. That slowed onboarding and eroded
                  confidence over time.
                </li>
                <li>
                  <span className="font-bold text-white">
                    Operational pressure.
                  </span>{" "}
                  Time-sensitive decisions carry real downstream cost, so the
                  experience needed to actively support clarity, not just
                  contain information.
                </li>
                <li>
                  <span className="font-bold text-white">Scalability.</span>{" "}
                  New teams and workflows kept arriving. Any new design needed
                  to make the system simpler as it grew, not more complex.
                </li>
              </ul>
              <p className="mt-6">
                The real challenge wasn&apos;t redesigning a few screens. It
                was building a cohesive experience strategy that could hold
                usability, technical reality, and business-critical planning
                together inside one product.
              </p>
            </BodyParagraph>
          </FadeReveal>
        </Container>

        <Container className="mt-[80px]">
          <FadeReveal y={32} delay={0.1}>
            <MaskReveal duration={1} delay={0.05}>
              <div
                className="relative w-full overflow-hidden rounded-[24px] bg-black"
                style={{ aspectRatio: "1555 / 975" }}
              >
                <Image
                  src={challengeImg}
                  alt="Snapshot of the legacy planning surface — Comments thread, Tank Data and ULP chart, New contact modal, Move Vessel action, and a calendar picker spread across disconnected views"
                  fill
                  sizes="(min-width: 1280px) 1555px, 100vw"
                  className="object-cover"
                />
              </div>
            </MaskReveal>
          </FadeReveal>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* DESIGN SYSTEM                                                     */}
      {/* Two full-bleed system images stacked: color ramp + typography.    */}
      {/* ================================================================ */}
      <section className="pt-[140px]">
        <Container>
          <FadeReveal y={20}>
            <SectionHeading>Design System</SectionHeading>
            <BodyParagraph className="mt-5 max-w-[914px]">
              <p className="mb-4">
                I introduced a systems-led approach so consistency and scale
                stopped being a per-screen negotiation. Shared foundations like
                tokens, patterns, components, and behaviours supported multiple
                operational products while staying flexible enough for
                domain-specific needs.
              </p>
              <p className="mt-6 mb-3 font-bold text-white">Core principles</p>
              <ul className="ml-6 list-disc space-y-3">
                <li>
                  <span className="font-bold text-white">
                    Consistency at scale.
                  </span>{" "}
                  Reusable patterns and layouts cut friction across workflows
                  and made the product feel familiar even on first use.
                </li>
                <li>
                  <span className="font-bold text-white">
                    Data-first design.
                  </span>{" "}
                  Information hierarchy, readability, and operational clarity
                  came ahead of decoration.
                </li>
                <li>
                  <span className="font-bold text-white">
                    Reduced cognitive load.
                  </span>{" "}
                  Standardised behaviours kept attention on the decision, not
                  the system.
                </li>
                <li>
                  <span className="font-bold text-white">
                    Modular architecture.
                  </span>{" "}
                  Components and patterns built to evolve alongside future
                  capabilities.
                </li>
                <li>
                  <span className="font-bold text-white">
                    Cross-functional alignment.
                  </span>{" "}
                  Built alongside product, engineering, and business
                  stakeholders so it could ship realistically without watering
                  down the experience.
                </li>
              </ul>
              <p className="mt-6">
                The system worked as an operational framework. It made cohesive
                product experiences across the planning ecosystem possible, and
                it made them faster to ship.
              </p>
            </BodyParagraph>
          </FadeReveal>
        </Container>

        <div className="mt-[80px] space-y-0">
          <FadeReveal y={32} delay={0.05}>
            <MaskReveal duration={1.1} delay={0.05}>
              <div
                className="relative w-full overflow-hidden bg-white"
                style={{ aspectRatio: "1727 / 975" }}
              >
                <Image
                  src={designSystem1Img}
                  alt="bp brand colour ramp — eleven greens from G 900 to WHT alongside a brand poster reading Energizing the future of transportation with the words Energy, Drive, Ambition"
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            </MaskReveal>
          </FadeReveal>

          <FadeReveal y={32} delay={0.1}>
            <MaskReveal duration={1.1} delay={0.1}>
              <div
                className="relative w-full overflow-hidden bg-[#f4f4f4]"
                style={{ aspectRatio: "1727 / 975" }}
              >
                <Image
                  src={designSystem2Img}
                  alt="Typography reference — Helvetica Now used across optical sizes for display and text, with a large E2 specimen"
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            </MaskReveal>
          </FadeReveal>
        </div>
      </section>

      {/* ================================================================ */}
      {/* SOLUTION                                                          */}
      {/* Three container-width images stacked.                             */}
      {/* ================================================================ */}
      <section className="pt-[140px]">
        <Container>
          <FadeReveal y={20}>
            <SectionHeading>Solution</SectionHeading>
            <BodyParagraph className="mt-5 max-w-[914px]">
              <p className="mb-4">
                I led the end-to-end experience design that turned operational
                complexity into a single, unified planning surface. Clearer
                workflow structure, better data visibility, and more intuitive
                interaction patterns supported faster, more confident
                decisions.
              </p>
              <p className="mt-6 mb-3 font-bold text-white">What changed</p>
              <ul className="ml-6 list-disc space-y-3">
                <li>
                  <span className="font-bold text-white">
                    A unified operational experience.
                  </span>{" "}
                  Fragmented systems and external workarounds gave way to a
                  connected planning environment.
                </li>
                <li>
                  <span className="font-bold text-white">
                    Sharper information hierarchy.
                  </span>{" "}
                  The operational signal planners actually act on came to the
                  surface.
                </li>
                <li>
                  <span className="font-bold text-white">
                    Simplified workflows.
                  </span>{" "}
                  Fewer steps, less duplication, more flow.
                </li>
                <li>
                  <span className="font-bold text-white">
                    Scalable foundations.
                  </span>{" "}
                  Reusable experience patterns ready for the next set of
                  products in the ecosystem.
                </li>
                <li>
                  <span className="font-bold text-white">
                    Collaborative delivery.
                  </span>{" "}
                  Built end-to-end with product, engineering, business, and
                  operational teams.
                </li>
              </ul>
              <p className="mt-6 mb-3 font-bold text-white">The outcome</p>
              <ul className="ml-6 list-disc space-y-2">
                <li>Less friction across the operational day.</li>
                <li>
                  Greater confidence in planning and forecasting activities.
                </li>
                <li>Stronger alignment between teams and systems.</li>
                <li>
                  A scalable UX and design system foundation for what comes
                  next.
                </li>
              </ul>
              <p className="mt-6">
                The work showed how UX strategy, systems design, and a real
                grasp of operations can turn complex enterprise workflows into
                experiences that feel both human and trustworthy.
              </p>
            </BodyParagraph>
          </FadeReveal>
        </Container>

        <Container className="mt-[80px] space-y-6 md:space-y-8">
          <FadeReveal y={32} delay={0.05}>
            <MaskReveal duration={1.1} delay={0.05}>
              <div
                className="relative w-full overflow-hidden rounded-[24px] bg-black"
                style={{ aspectRatio: "1555 / 975" }}
              >
                <Image
                  src={solution1Img}
                  alt="Midstream SPT terminal overview — welcome banner, terminal search, and an All terminals list sorted by last updated"
                  fill
                  sizes="(min-width: 1280px) 1555px, 100vw"
                  className="object-cover"
                />
              </div>
            </MaskReveal>
          </FadeReveal>

          <FadeReveal y={32} delay={0.1}>
            <MaskReveal duration={1.1} delay={0.1}>
              <div
                className="relative w-full overflow-hidden rounded-[24px] bg-black"
                style={{ aspectRatio: "1555 / 975" }}
              >
                <Image
                  src={solution2Img}
                  alt="Port Douglas planning view — Tank Data and Truck Lifting Average summary above a daily inventory and demand grid with embedded charts"
                  fill
                  sizes="(min-width: 1280px) 1555px, 100vw"
                  className="object-cover"
                />
              </div>
            </MaskReveal>
          </FadeReveal>

          <FadeReveal y={32} delay={0.15}>
            <MaskReveal duration={1.1} delay={0.15}>
              <div
                className="relative w-full overflow-hidden rounded-[24px] bg-black"
                style={{ aspectRatio: "1555 / 975" }}
              >
                <Image
                  src={solution3Img}
                  alt="What-if scenario view — inventory grid alongside an open Charts panel with ULP and PULP capacity charts and tracking deltas highlighted"
                  fill
                  sizes="(min-width: 1280px) 1555px, 100vw"
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
      <NextProjectReveal nextSlug="carell" />
    </article>
  );
}
