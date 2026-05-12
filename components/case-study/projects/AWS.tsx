import Image from "next/image";
import { MaskReveal } from "@/components/ui/MaskReveal";
import { WordReveal } from "@/components/ui/WordReveal";
import { FadeReveal } from "@/components/ui/FadeReveal";
import { NextProjectReveal } from "@/components/case-study/NextProjectReveal";
import { HeroGrid } from "@/components/case-study/HeroGrid";

/**
 * AWS — pixel-faithful rebuild of the Figma reference
 * (rv3fAJdzRW0Wwc7BVtsIKv, node 73:1113, "Case 3").
 *
 * Mirrors the AtlasCarbon / IAG page system (dark theme, Sofia Sans body,
 * Gallient display, 85px gutter on a 1728 frame) with AWS-specific surfaces:
 *   - Hero card bg #0f1a2b (deep AWS navy) with the giant "AWS" wordmark
 *   - Stacked Overview / Challenge / Solution column paired with a photo card
 *   - Research, Challenge, Wireframes and Designs (×2) and Solution image bands
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

export function AWS() {
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
                AWS
              </p>
            </FadeReveal>
            <FadeReveal y={16} delay={0.05}>
              <h1
                id="cs-hero-title"
                className="font-body mt-3 max-w-[540px] text-[18px] leading-snug font-normal text-[#8e8e93] md:text-[24px]"
              >
                A unified conversational system for faster, smarter cloud
                support
              </h1>
            </FadeReveal>
          </div>
        </Container>

        {/* Wordmark + navy hero card */}
        <div className="relative mt-[80px] md:mt-[120px]">
          <Container className="relative z-0">
            <FadeReveal y={32} delay={0.1}>
              <MaskReveal duration={1.1} delay={0.1}>
                <div className="relative w-full overflow-hidden rounded-[24px] bg-[#0f1a2b]">
                  <div
                    className="relative w-full"
                    style={{ aspectRatio: "1561 / 1080" }}
                  >
                    <Image
                      src="/images/work/aws/hero.png"
                      alt="AWS chatbot redesign — two iPhone mockups showing the conversational support entry and an active triage flow"
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
              AWS
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
              <MetaValue className="mt-[45px]">Experience Designer</MetaValue>
            </FadeReveal>
            <FadeReveal y={20} delay={0.05}>
              <MetaLabel>Team</MetaLabel>
              <div className="mt-[45px] space-y-1">
                <MetaValue>1 Experience Designer</MetaValue>
                <MetaValue>2 Engineers</MetaValue>
                <MetaValue>1 Product Owner</MetaValue>
              </div>
            </FadeReveal>
            <FadeReveal y={20} delay={0.1}>
              <MetaLabel>My contribution</MetaLabel>
              <div className="mt-[45px] space-y-1">
                <MetaValue>Discovery &amp; Strategy</MetaValue>
                <MetaValue>Conversational Design</MetaValue>
                <MetaValue>Chatbot Experience Design</MetaValue>
              </div>
            </FadeReveal>
            <FadeReveal y={20} delay={0.15}>
              <MetaLabel>Timeline</MetaLabel>
              <MetaValue className="mt-[45px]">24 Weeks</MetaValue>
            </FadeReveal>
          </div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* OVERVIEW — left column stack (Overview/Challenge/Solution) +      */}
      {/* right column photo card                                            */}
      {/* ================================================================ */}
      <section className="pt-[140px] pb-[60px]">
        <Container>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-7">
              <FadeReveal y={20}>
                <SectionHeading>Overview</SectionHeading>
                <BodyParagraph className="mt-5 max-w-[662px]">
                  I co-led the redesign of the AWS chatbot with the AWS
                  Product Manager, driving research, conversational design
                  sprints, and end-to-end delivery. Together, we built a
                  multi-modal support system that reduces customer
                  frustration, surfaces real-time context for agents, cuts
                  handling time by ~20%, and unifies customer journeys
                  across chat, email, and callbacks.
                </BodyParagraph>
              </FadeReveal>

              <FadeReveal y={20} delay={0.06}>
                <div className="mt-[100px]">
                  <SectionHeading>Challenge</SectionHeading>
                  <BodyParagraph className="mt-5 max-w-[662px]">
                    Customers hit a sprawling, fragmented support surface.
                    Routing was unreliable, context was missing, and there
                    was no scalable path to a real human when stakes
                    spiked. The chatbot looked smart but rarely closed the
                    loop.
                  </BodyParagraph>
                </div>
              </FadeReveal>

              <FadeReveal y={20} delay={0.12}>
                <div className="mt-[100px]">
                  <SectionHeading>Solution</SectionHeading>
                  <BodyParagraph className="mt-5 max-w-[662px]">
                    A multi-modal support layer with a context-rich agent
                    desk, ML-driven routing, and a unified entry point
                    across chat, email, and voice callbacks; the chatbot
                    becomes a triage surface, not a dead end.
                  </BodyParagraph>
                </div>
              </FadeReveal>
            </div>

            <div className="md:col-span-5">
              <FadeReveal y={32} delay={0.05}>
                <div
                  className="relative flex w-full items-center gap-4 md:gap-6"
                  style={{ aspectRatio: "736 / 700" }}
                >
                  {/* AWS palette — floats OUTSIDE the photo on the left.
                      Each swatch has its own staggered float loop so they
                      drift independently. */}
                  <div className="flex h-full w-[14%] shrink-0 flex-col justify-center gap-3 md:gap-4">
                    {[
                      { value: "#ff9900", delay: "0s" },
                      { value: "#1768e5", delay: "0.4s" },
                      { value: "#1a1a1a", delay: "0.8s" },
                      { value: "#232f3e", delay: "1.2s" },
                      { value: "#f4f4f5", delay: "1.6s" },
                    ].map((sw, i) => (
                      <FadeReveal key={sw.value} y={14} delay={0.18 + i * 0.06}>
                        <div
                          className="aspect-square w-full rounded-[18%] shadow-[0_8px_24px_rgba(0,0,0,0.35)] animate-swatch-float"
                          style={{
                            backgroundColor: sw.value,
                            animationDelay: sw.delay,
                          }}
                        />
                      </FadeReveal>
                    ))}
                  </div>

                  {/* Photo card — fills the remaining width on the right */}
                  <MaskReveal
                    duration={1}
                    delay={0.1}
                    className="relative h-full flex-1 rounded-[24px]"
                    innerClassName="relative h-full w-full"
                  >
                    <Image
                      src="/images/work/aws/overview-right.png"
                      alt="AWS support persona portrait — a customer at sunrise next to the AWS chatbot triage screen"
                      fill
                      sizes="(min-width: 1280px) 600px, 80vw"
                      className="object-cover"
                    />
                  </MaskReveal>
                </div>
              </FadeReveal>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* RESEARCH                                                           */}
      {/* ================================================================ */}
      <section className="pt-[140px]">
        <Container>
          <FadeReveal y={20}>
            <SectionHeading>Research</SectionHeading>
            <BodyParagraph className="mt-5 max-w-[914px]">
              <p className="mb-4">
                Our starting point was to understand who we were designing
                for, and what pressure they were under when they reached
                for help.
              </p>

              <div className="mt-8">
                <SubHead>Key questions guiding discovery</SubHead>
                <ul className="mt-3 ml-6 list-disc space-y-2">
                  <li>
                    Who is using the system, and what pressures are they
                    under?
                  </li>
                  <li>What slows them down today?</li>
                  <li>
                    What do they need to act confidently and quickly in
                    high-stakes moments?
                  </li>
                </ul>
              </div>
            </BodyParagraph>

            <PullQuote>
              This clarity shaped every design decision and ensured the
              chatbot directly addressed real customer pain points
              instead of guesses.
            </PullQuote>
          </FadeReveal>
        </Container>

        <Container className="mt-[80px]">
          <FadeReveal y={32} delay={0.1}>
            <MaskReveal duration={1} delay={0.05}>
              <div
                className="relative w-full overflow-hidden rounded-[24px] bg-[#0f0f0f]"
                style={{ aspectRatio: "1556 / 886" }}
              >
                <Image
                  src="/images/work/aws/research.png"
                  alt="Research artefacts — Quick triage, Personality, Onboarding flow and Speaking style breakdown for the AWS support assistant"
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
              <SubHead>Where the experience was breaking down</SubHead>
              <ul className="mt-3 ml-6 list-disc space-y-2">
                <li>
                  Incorrect or irrelevant routing from Lex / Kendra led to
                  user frustration
                </li>
                <li>
                  No visibility into a customer&apos;s history, past
                  issues, or pages visited
                </li>
                <li>No scalable callback or escalation flow</li>
                <li>
                  Support fragmented across chat, email, and phone with no
                  shared state
                </li>
              </ul>
            </BodyParagraph>
          </FadeReveal>
        </Container>

        <Container className="mt-[80px]">
          <FadeReveal y={32} delay={0.1}>
            <MaskReveal duration={1} delay={0.05}>
              <div
                className="relative w-full overflow-hidden rounded-[24px] bg-[#0f0f0f]"
                style={{ aspectRatio: "1556 / 886" }}
              >
                <Image
                  src="/images/work/aws/challenge.png"
                  alt="Conversational journey audit — current-state map of the AWS chatbot routing, fallbacks and escalation gaps"
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
      {/* WIREFRAMES AND DESIGNS                                            */}
      {/* ================================================================ */}
      <section className="pt-[140px]">
        <Container>
          <FadeReveal y={20}>
            <SectionHeading>Wireframes and Designs</SectionHeading>
            <BodyParagraph className="mt-5 max-w-[914px]">
              <p className="mb-4">
                Designing a conversational experience that works in the
                real world. Our sprint focused on two parallel flows
                running in lockstep.
              </p>

              <div className="mt-8">
                <SubHead>1. Customer-facing chatbot flow</SubHead>
                <ul className="mt-3 ml-6 list-disc space-y-2">
                  <li>
                    Streamlined onboarding for users in distress (e.g.
                    identity lockouts)
                  </li>
                  <li>Introduced quick actions for technical triage</li>
                  <li>Added a seamless path to Voice Callback</li>
                  <li>
                    Tuned ML routing so it aligned with real user intent
                    rather than keyword guesses
                  </li>
                </ul>
                <p className="mt-3">
                  Wireframes 1.0 to 4.0 visualise how users move from
                  first message to resolution.
                </p>
              </div>

              <div className="mt-8">
                <SubHead>2. Agent dashboard (parallel flow)</SubHead>
                <ul className="mt-3 ml-6 list-disc space-y-2">
                  <li>
                    Context-rich agent interface surfacing recent errors,
                    pages viewed, and past chats
                  </li>
                  <li>
                    Smart ML routing logic to classify and direct queries
                    before they hit the queue
                  </li>
                  <li>
                    Unified support layer threading chat to callback to
                    follow-up under one record
                  </li>
                </ul>
                <p className="mt-3">
                  The result: a single source of truth for agents, and
                  dramatically less back-and-forth questioning during
                  live handling.
                </p>
              </div>
            </BodyParagraph>
          </FadeReveal>
        </Container>

        <Container className="mt-[80px]">
          <FadeReveal y={32} delay={0.05}>
            <MaskReveal duration={1.1} delay={0.05}>
              <div
                className="relative w-full overflow-hidden rounded-[24px] bg-[#0f0f0f]"
                style={{ aspectRatio: "1556 / 1165" }}
              >
                <Image
                  src="/images/work/aws/wireframes-1.png"
                  alt="Customer-facing chatbot wireframes — onboarding, quick triage, and voice callback handoff screens on mobile"
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
                className="relative w-full overflow-hidden rounded-[24px] bg-[#0f0f0f]"
                style={{ aspectRatio: "1556 / 1165" }}
              >
                <Image
                  src="/images/work/aws/wireframes-2.png"
                  alt="Agent dashboard wireframes — Salesforce-integrated case view, ML routing pane, and unified support timeline"
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
              <div>
                <SubHead>Problem solved</SubHead>
                <p className="mt-3">
                  Context switching and inefficient AWS resource
                  management were eliminated by folding management
                  capabilities directly into the chat interface.
                </p>
              </div>

              <div className="mt-8">
                <SubHead>Customer experience</SubHead>
                <p className="mt-3">
                  The chatbot became a central hub for cloud operations,
                  enabling users to access diagnostics, monitor
                  resources, and execute commands in real time without
                  jumping between consoles.
                </p>
              </div>

              <div className="mt-8">
                <SubHead>Agent efficiency</SubHead>
                <p className="mt-3">
                  A context-rich agent interface integrated with
                  Salesforce delivers instant history and signals (e.g.
                  pages visited, recent errors), so agents can resolve
                  issues faster and with less repeated questioning.
                </p>
              </div>

              <div className="mt-8">
                <SubHead>Core systems</SubHead>
                <p className="mt-3">
                  Bespoke ML routing logic and a unified
                  &ldquo;support everywhere&rdquo; entry point across
                  channels, backed by a robust voice callback system.
                </p>
              </div>
            </BodyParagraph>
          </FadeReveal>
        </Container>

        <Container className="mt-[80px]">
          <FadeReveal y={32} delay={0.05}>
            <MaskReveal duration={1.1} delay={0.05}>
              <div
                className="relative w-full overflow-hidden rounded-[24px] bg-[#0f0f0f]"
                style={{ aspectRatio: "1557 / 987" }}
              >
                <Image
                  src="/images/work/aws/solution.png"
                  alt="Final AWS support flow — four iPhone mockups showing entry triage, voice callback handoff, agent context panel, and resolution summary"
                  fill
                  sizes="(min-width: 1280px) 1557px, 100vw"
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
      <NextProjectReveal nextSlug="bp" />
    </article>
  );
}
