import Image from "next/image";
import { MaskReveal } from "@/components/ui/MaskReveal";
import { WordReveal } from "@/components/ui/WordReveal";
import { FadeReveal } from "@/components/ui/FadeReveal";
import { TagPills } from "@/components/ui/TagPills";
import { TestimonialBlock } from "@/components/ui/TestimonialBlock";
import { NextProjectReveal } from "@/components/case-study/NextProjectReveal";
import { HeroGrid } from "@/components/case-study/HeroGrid";
import { AtAGlance, DecisionCallout } from "@/components/case-study/Highlights";
import { placeholderProjects } from "@/lib/projects";

/**
 * Healthdirect: "Medicare-grade health advice, inside ChatGPT".
 *
 * Neutral dark case-study page matching the Atlas Carbon system: bg-black,
 * white headings + #8e8e93 (paper/60) body gray, Sofia Sans body, Gallient
 * reserved for the giant hero wordmark. No accent colour. Content is first
 * person with Rotash as Design Lead; delivered with Healthdirect × DEPT® × AWS.
 */

const IMG = "/images/work/healthdirect";

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
    <h2 className="font-body text-[20px] leading-tight font-normal text-paper md:text-[24px]">
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
      className={`font-body text-[15px] leading-[1.6] font-normal text-paper/60 md:text-[16px] ${className}`}
    >
      {children}
    </div>
  );
}

function MetaLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-body text-[20px] leading-tight font-normal text-paper/60 md:text-[24px]">
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
      className={`font-body text-[20px] leading-tight font-bold text-paper md:text-[24px] ${className}`}
    >
      {children}
    </p>
  );
}

/** Neutral stat: big white Sofia value, gray uppercase label. */
function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="font-body text-[52px] leading-none font-bold text-paper md:text-[68px]">
        {value}
      </span>
      <span className="font-sans max-w-xs text-sm tracking-widest uppercase text-paper/60">
        {label}
      </span>
    </div>
  );
}

/** Centered image caption, matches the Atlas Carbon pattern. */
function ImageCaption({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-body mt-5 text-center text-[14px] font-bold text-paper/60 md:text-[16px]">
      {children}
    </p>
  );
}

/** Rounded, fixed-aspect media frame wrapping a fill Image or video. */
function MediaFrame({
  aspect,
  bordered = false,
  children,
}: {
  aspect: string;
  bordered?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-[24px] bg-[#0f0f0f]${
        bordered ? " border border-paper/10" : ""
      }`}
      style={{ aspectRatio: aspect }}
    >
      {children}
    </div>
  );
}

const CAPABILITIES: { title: string; body: string }[] = [
  {
    title: "Symptom Triage",
    body: "Clinically validated guidance, built on Healthdirect's existing triage logic.",
  },
  {
    title: "Nurse Escalation",
    body: "A direct path to a real 1800MEDICARE nurse, with chat history handed over from ChatGPT.",
  },
  {
    title: "Service Finder",
    body: "Nearby GPs, pharmacies and emergency care, found through Healthdirect's national directory.",
  },
  {
    title: "AI Dermatologist",
    body: "A link out to an AI skin-analysis app so a user can skip an unnecessary GP visit.",
  },
  {
    title: "Health Information",
    body: "Current, trusted content from Healthdirect and Infermedica, drawing on 150,000 hours of physician expertise, in 26 languages.",
  },
  {
    title: "Medicines Information",
    body: "Accurate medicines guidance drawn from Healthdirect's and Infermedica's medicines database.",
  },
  {
    title: "Trust & Safety Harness",
    body: "Governance, monitoring and audit built in from day one, not bolted on after.",
  },
];

const TIMELINE: { date: string; label: string }[] = [
  { date: "Mid May", label: "Program kick-off" },
  { date: "Jun 1", label: "First prototype" },
  { date: "Jun", label: "Alpha reviewed with real integrations" },
  { date: "Jun 12", label: "Alpha 1.0 to the clinical SME panel" },
  { date: "Jul 14", label: "Alpha 1.1 hardening" },
  { date: "24 Jul", label: "Consumer pilot begins, led by Healthdirect" },
];

const VISION_STEPS: string[] = [
  "Someone asks ChatGPT a health question.",
  "The 1800MEDICARE app responds with safe clinical guidance, a symptom checker or a service finder.",
  "They get advice, triage at home, emergency care, or a real nurse when it matters.",
];

const DEMOS: { title: string; body: string; img: string; alt: string }[] = [
  {
    title: "Knowledge graph",
    img: `${IMG}/demo-knowledge-graph.jpg`,
    alt: "1800MEDICARE health-topic card inside ChatGPT, showing a Whooping cough explainer with key facts and a start-a-symptom-check action",
    body: "The knowledge graph is the data layer underneath the app. It connects Healthdirect's existing content and APIs into a structured, relationship-based model, so the app pulls accurate, contextually linked health information rather than letting the model infer connections on its own.",
  },
  {
    title: "Nurse escalation",
    img: `${IMG}/demo-nurse-escalation.jpg`,
    alt: "Nurse escalation screen inside ChatGPT with a reference number, step-by-step call instructions, and a note that the chat summary was securely shared with the 1800MEDICARE team",
    body: "Nurse escalation is the pathway that hands a user off from the AI to a real registered nurse. It triggers when symptoms point to a level of urgency or complexity the automated tools shouldn't resolve on their own. The chat summary travels with them, so nobody repeats themselves.",
  },
  {
    title: "Symptom checker",
    img: `${IMG}/demo-symptom-checker.jpg`,
    alt: "Symptom-check result inside ChatGPT advising the user to see a doctor within 24 hours, with urgent care and GP options to book",
    body: "The symptom checker is a guided, question-based tool. It helps users describe what they're experiencing and directs them to the right level of care, from self-care advice through to emergency services, all grounded in clinically validated triage logic.",
  },
];

const hdProject = placeholderProjects.find((p) => p.slug === "healthdirect");
const hdTags = hdProject?.tags ?? [];

const bettina = {
  author: "Bettina McMahon",
  role: "Chief Executive Officer, Healthdirect Australia",
  paragraphs: [
    {
      segments: [
        {
          text: "This new technology has the potential to help millions of Australians make better choices about their health every day, and to connect with the right services. We're clear-eyed about what can go wrong, but even clearer about our duty to use every tool we have to reach a healthier Australia. The greater risk lies in standing still.",
        },
      ],
    },
  ],
};

const vanessa = {
  author: "Vanessa Halter",
  role: "Portfolio Director, Healthdirect Australia",
  paragraphs: [
    {
      segments: [
        {
          text: "A highly valued partner throughout the project, combining deep expertise with strong design and delivery. Their ability to navigate ambiguity and focus on practical outcomes helped us move from concept to a functioning consumer product in a remarkably short timeframe.",
        },
      ],
    },
  ],
};

export function Healthdirect() {
  return (
    <article
      data-cs-root
      data-theme="dark"
      className="font-body relative isolate overflow-x-clip bg-black text-paper antialiased"
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
                className="font-body text-[24px] leading-tight font-bold text-paper md:text-[32px]"
              >
                Healthdirect
              </p>
            </FadeReveal>
            <FadeReveal y={16} delay={0.05}>
              <h1
                id="cs-hero-title"
                className="font-body mt-3 max-w-[560px] text-[18px] leading-snug font-normal text-paper/60 md:text-[24px]"
              >
                Medicare-grade health advice, inside ChatGPT
              </h1>
            </FadeReveal>
            <FadeReveal y={12} delay={0.08}>
              <p className="font-sans mt-4 text-[12px] tracking-[0.14em] uppercase text-paper/45">
                Healthdirect · DEPT® · AWS ProServe
              </p>
            </FadeReveal>
            <TagPills tags={hdTags} className="mt-5" />
          </div>
        </Container>

        {/* Wordmark + hero card */}
        <div className="relative mt-[80px] md:mt-[120px]">
          <Container className="relative z-0">
            <FadeReveal y={32} delay={0.1}>
              <MaskReveal duration={1.1} delay={0.1}>
                <div className="relative w-full overflow-hidden rounded-[24px] bg-[#0f0f0f]">
                  <div
                    className="relative w-full"
                    style={{ aspectRatio: "1561 / 1080" }}
                  >
                    <Image
                      src={`${IMG}/hero-2.jpg`}
                      alt="A person holding a phone showing the 1800MEDICARE nurse-escalation screen inside ChatGPT, with a reference number and steps to call a registered nurse"
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
            className="font-display pointer-events-none absolute inset-x-0 top-0 z-10 -translate-y-[55%] pr-0 text-right text-[clamp(4rem,14vw,14rem)] leading-[0.95] tracking-[-0.02em] whitespace-nowrap text-paper md:-translate-y-[58%]"
          >
            <WordReveal staggerMs={80} durationMs={950}>
              Healthdirect
            </WordReveal>
          </p>
        </div>
      </section>

      {/* ================================================================ */}
      {/* PROJECT META                                                      */}
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
              <MetaValue className="mt-[45px]">Design Lead</MetaValue>
            </FadeReveal>
            <FadeReveal y={20} delay={0.05}>
              <MetaLabel>Team</MetaLabel>
              <div className="mt-[45px] space-y-1">
                <MetaValue>Healthdirect</MetaValue>
                <MetaValue>DEPT®</MetaValue>
                <MetaValue>AWS ProServe</MetaValue>
              </div>
            </FadeReveal>
            <FadeReveal y={20} delay={0.1}>
              <MetaLabel>My contribution</MetaLabel>
              <div className="mt-[45px] space-y-1">
                <MetaValue>End-to-end product design</MetaValue>
                <MetaValue>Golden prompt &amp; conversation design</MetaValue>
                <MetaValue>Workshops &amp; clinical coordination</MetaValue>
                <MetaValue>Consumer testing</MetaValue>
              </div>
            </FadeReveal>
            <FadeReveal y={20} delay={0.15}>
              <MetaLabel>Timeline</MetaLabel>
              <MetaValue className="mt-[45px]">10 Weeks</MetaValue>
              <p className="font-body mt-2 text-[13px] text-paper/45">
                Brief to consumer pilot
              </p>
            </FadeReveal>
          </div>
        </Container>
      </section>

      {/* AT A GLANCE: skimmable problem / role / outcome summary */}
      <AtAGlance
        className="pt-[100px] md:pt-[120px]"
        items={[
          {
            label: "The problem",
            body: "Australians were already asking AI about their health, and a leading AI tool under-triaged half of emergency cases. Healthdirect could stand back, or bring clinical rigour into the tools people already reach for.",
          },
          {
            label: "My role",
            body: "Design Lead. I inherited an early agentic concept and owned it end to end: the golden prompt, conversation design, clinical coordination and consumer testing.",
          },
          {
            label: "The outcome",
            body: "1800MEDICARE inside ChatGPT: clinical triage, symptom checking and nurse escalation, taken from brief to consumer pilot in ~10 weeks, built for 62M+ interactions a year.",
          },
        ]}
      />

      {/* ================================================================ */}
      {/* THE CHALLENGE                                                     */}
      {/* ================================================================ */}
      <section className="pt-[140px]">
        <Container>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-6">
              <FadeReveal y={20}>
                <SectionHeading>
                  Australians are already asking AI about their health
                </SectionHeading>
                <BodyParagraph className="mt-5 max-w-[520px]">
                  Healthdirect saw a choice: let this happen without them, or
                  bring their clinical rigour into the tools people already
                  reach for. I was brought in to design and build the second:
                  an agentic 1800MEDICARE experience, safe enough to carry
                  Medicare&apos;s name, living inside ChatGPT.
                </BodyParagraph>
              </FadeReveal>
            </div>

            <div className="md:col-span-6">
              <div className="flex flex-col gap-12">
                <FadeReveal y={20} delay={0.05}>
                  <StatBlock
                    value="61%"
                    label="of Australian adults have used ChatGPT to ask about their health"
                  />
                </FadeReveal>
                <div className="h-px w-full bg-paper/10" />
                <FadeReveal y={20} delay={0.1}>
                  <StatBlock
                    value="50%"
                    label="of emergency cases were under-triaged by a leading AI health tool (Feb 2026 study)"
                  />
                </FadeReveal>
              </div>
            </div>
          </div>

          <FadeReveal y={20} delay={0.08}>
            <blockquote className="font-body mt-16 max-w-[820px] text-[20px] leading-[1.45] font-normal text-paper md:text-[28px]">
              &ldquo;We are clear-eyed about what can go wrong, and we are
              designing safeguards built to scale nationally. But we are even
              clearer about our mission of a healthier Australia, and our duty
              to use every tool we have to reach it. The greater risk lies in
              standing still.&rdquo;
              <footer className="font-sans mt-6 text-[13px] tracking-[0.12em] uppercase text-paper/50">
                Bettina McMahon, CEO, Healthdirect
              </footer>
            </blockquote>
          </FadeReveal>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* THE VISION                                                        */}
      {/* ================================================================ */}
      <section className="pt-[140px]">
        <Container>
          <FadeReveal y={20}>
            <SectionHeading>
              Trusted care, where people are already asking
            </SectionHeading>
            <BodyParagraph className="mt-5 max-w-[760px]">
              1800MEDICARE is a ChatGPT app that puts Healthdirect&apos;s
              clinical triage, service-finding, symptom checking and nurse
              escalation directly inside everyday ChatGPT conversations. It is
              an agent people can talk to, not another form to fill in.
            </BodyParagraph>
          </FadeReveal>

          <div className="mt-[80px] grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-5">
            {VISION_STEPS.map((step, i) => (
              <FadeReveal key={i} y={24} delay={0.05 + i * 0.06}>
                <div className="relative flex h-full flex-col rounded-[24px] border border-paper/10 bg-[#0f0f0f] p-7">
                  <span className="font-body text-[32px] leading-none font-bold text-paper/40">
                    0{i + 1}
                  </span>
                  <p className="font-body mt-6 text-[16px] leading-[1.5] text-paper/60 md:text-[17px]">
                    {step}
                  </p>
                  {i < VISION_STEPS.length - 1 && (
                    <span
                      aria-hidden
                      className="absolute top-1/2 -right-4 hidden -translate-y-1/2 text-[24px] text-paper/40 md:block"
                    >
                      →
                    </span>
                  )}
                </div>
              </FadeReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* HOW I APPROACHED IT: role + process                               */}
      {/* ================================================================ */}
      <section className="pt-[140px]">
        <Container>
          <FadeReveal y={20}>
            <SectionHeading>How I approached it</SectionHeading>
            <BodyParagraph className="mt-5 max-w-[914px]">
              <p className="mb-4">
                I inherited an early agentic concept and owned it end to end. The
                design problem was unusual: no fixed screen to perfect, a medium
                that could hand out unsafe advice if left alone, and one hard
                moment at the centre of it all, passing a worried person from an
                AI to a real nurse without making them start over. With no
                settled playbook for health AI, most of the real work happened
                with people, not in a design file.
              </p>
              <ul className="ml-6 list-disc space-y-3">
                <li>
                  <span className="font-bold text-paper">
                    Workshops with the people building it:
                  </span>{" "}
                  I ran working sessions with Healthdirect&apos;s engineering and
                  CX teams to agree how the agent should behave: where it should
                  help, where it should defer, and when it should get out of the
                  way.
                </li>
                <li>
                  <span className="font-bold text-paper">
                    The golden prompt was the product:
                  </span>{" "}
                  In an agentic experience there&apos;s no fixed screen to
                  perfect. The system prompt sets the agent&apos;s clinical
                  guardrails, its tone, and the exact moment it hands a user to a
                  real nurse. I owned that prompt and iterated it against real
                  scenarios until every response stayed inside safe,
                  evidence-based bounds.
                </li>
                <li>
                  <span className="font-bold text-paper">
                    Coordinating with the clinical team:
                  </span>{" "}
                  I worked closely with Healthdirect&apos;s clinicians to
                  validate triage logic and escalation thresholds,
                  pressure-testing edge cases so the agent knew its limits.
                </li>
                <li>
                  <span className="font-bold text-paper">
                    Testing with a consumer group:
                  </span>{" "}
                  I put the experience in front of real people to see how they
                  actually talk to a health agent, then fed what confused or
                  worried them straight back into the prompt and the flows.
                </li>
                <li>
                  <span className="font-bold text-paper">
                    End-to-end product design:
                  </span>{" "}
                  I designed the whole experience against OpenAI&apos;s design
                  system and Apps SDK guidelines, so 1800MEDICARE felt native to
                  ChatGPT rather than bolted on.
                </li>
              </ul>
            </BodyParagraph>

            <DecisionCallout
              className="mt-12"
              label="The reframe"
              decision="Treat the system prompt as the product, not the screens."
            >
              In an agentic experience there&apos;s no fixed screen to perfect.
              I bet the real design surface was the golden prompt: its clinical
              guardrails, its tone, and the exact moment it hands a user to a
              nurse. Iterating that against real scenarios is what kept every
              response inside safe, evidence-based bounds.
            </DecisionCallout>
          </FadeReveal>
        </Container>

        {/* Workshop artefact: the flow-mapping done with the teams */}
        <Container className="mt-[80px]">
          <FadeReveal y={24} delay={0.08}>
            <BodyParagraph className="mb-6 max-w-[914px]">
              Mapping the Service Finder and clinical decision-support flows with
              the engineering and CX teams, agreeing turn by turn how the agent
              should behave before a line of the prompt was written.
            </BodyParagraph>
            <MaskReveal duration={0.9} delay={0.05}>
              <MediaFrame aspect="2400 / 1335" bordered>
                <Image
                  src={`${IMG}/workshop.jpg`}
                  alt="A collaborative whiteboard mapping the 1800MEDICARE Service Finder and clinical decision-support conversation flows, with node diagrams, screen references and sticky notes"
                  fill
                  sizes="(min-width: 1280px) 1560px, 100vw"
                  className="object-cover"
                />
              </MediaFrame>
            </MaskReveal>
          </FadeReveal>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* WHAT WE BUILT: seven capabilities                                 */}
      {/* ================================================================ */}
      <section className="pt-[140px]">
        <Container>
          <FadeReveal y={20}>
            <SectionHeading>Seven capabilities, one experience</SectionHeading>
            <BodyParagraph className="mt-5 max-w-[760px]">
              I designed each surface of the agent end to end, from how it opens
              a conversation to the moment it hands someone to a real nurse.
            </BodyParagraph>
          </FadeReveal>

          <div className="mt-[80px] grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CAPABILITIES.map((cap, i) => (
              <FadeReveal key={cap.title} y={24} delay={0.03 * i}>
                <div className="flex h-full flex-col rounded-[24px] border border-paper/10 bg-[#0f0f0f] p-6">
                  <h3 className="font-body text-[17px] font-bold text-paper md:text-[18px]">
                    {cap.title}
                  </h3>
                  <p className="font-body mt-3 text-[14px] leading-[1.5] text-paper/60 md:text-[15px]">
                    {cap.body}
                  </p>
                </div>
              </FadeReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* THE BUILD: weeks not months                                       */}
      {/* ================================================================ */}
      <section className="pt-[140px]">
        <Container>
          <FadeReveal y={20}>
            <SectionHeading>Weeks, not months</SectionHeading>
            <BodyParagraph className="mt-5 max-w-[620px]">
              From a research question to a live clinical Alpha in under three
              months, ready for Commonwealth and TGA conversations.
            </BodyParagraph>
          </FadeReveal>

          <div className="mt-[80px]">
            {/* connecting rail */}
            <div className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-6 lg:gap-4">
              <div
                aria-hidden
                className="absolute top-[7px] left-0 hidden h-px w-full bg-paper/15 lg:block"
              />
              {TIMELINE.map((step, i) => (
                <FadeReveal key={step.date} y={20} delay={0.05 * i}>
                  <div className="relative flex gap-4 lg:flex-col lg:gap-0">
                    <span
                      aria-hidden
                      className="mt-[2px] h-[14px] w-[14px] shrink-0 rounded-full bg-paper ring-4 ring-black"
                    />
                    <div className="lg:mt-6">
                      <p className="font-sans text-[12px] tracking-[0.1em] uppercase text-paper/50">
                        {step.date}
                      </p>
                      <p className="font-body mt-2 text-[15px] leading-[1.4] text-paper/80">
                        {step.label}
                      </p>
                    </div>
                  </div>
                </FadeReveal>
              ))}
            </div>
            <p className="font-body mt-12 text-[13px] text-paper/40">
              Full public launch continues under Healthdirect&apos;s ownership,
              building on the foundation delivered here.
            </p>
          </div>

          <DecisionCallout
            className="mt-16"
            label="The non-negotiable"
            decision="Move at start-up speed, but build trust and safety in from day one, not after."
          >
            The pressure to ship fast is exactly where a health product cuts the
            wrong corners. Governance, monitoring and audit went in from the
            first prototype, and clinical SMEs reviewed every alpha, so speed
            never came at the cost of the clinical bar.
          </DecisionCallout>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* DEMOS                                                             */}
      {/* ================================================================ */}
      <section className="pt-[140px]">
        <Container>
          <FadeReveal y={20}>
            <SectionHeading>Three moments that carry the weight</SectionHeading>
            <BodyParagraph className="mt-5 max-w-[914px]">
              The three surfaces I spent the most time getting right: the
              knowledge graph that grounds every answer, the nurse-escalation
              hand-off, and the guided symptom checker. Each one was shaped by
              what the clinical team and consumer testing told us. On the
              escalation screen especially, I designed the hand-off states down
              to the reference number and the securely-shared chat summary, so a
              worried user never has to repeat their symptoms to the nurse.
            </BodyParagraph>
          </FadeReveal>
        </Container>

        <Container className="mt-[80px]">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {DEMOS.map((demo, i) => (
              <FadeReveal key={demo.title} y={24} delay={0.08 * i}>
                <MaskReveal duration={0.9} delay={0.05 + 0.05 * i}>
                  <MediaFrame aspect="1754 / 2024">
                    <Image
                      src={demo.img}
                      alt={demo.alt}
                      fill
                      sizes="(min-width: 1280px) 503px, 50vw"
                      className="object-cover"
                    />
                  </MediaFrame>
                </MaskReveal>
                <ImageCaption>{demo.title}</ImageCaption>
                <BodyParagraph className="mt-3">{demo.body}</BodyParagraph>
              </FadeReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* WALKTHROUGH VIDEO                                                 */}
      {/* ================================================================ */}
      <section className="pt-[140px]">
        <Container>
          <FadeReveal y={20}>
            <SectionHeading>See it in action</SectionHeading>
            <BodyParagraph className="mt-5 max-w-[760px]">
              A run through the service-finder flow in the internal playground we
              used to pressure-test the agent, stepping turn by turn from a plain
              question to a clinically grounded answer.
            </BodyParagraph>
          </FadeReveal>
        </Container>

        <Container className="mt-[60px]">
          <FadeReveal y={28} delay={0.05}>
            <MaskReveal duration={0.9} delay={0.05}>
              <MediaFrame aspect="1600 / 1034" bordered>
                <video
                  className="h-full w-full object-cover"
                  poster={`${IMG}/walkthrough-poster.jpg`}
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  preload="metadata"
                  aria-label="Walkthrough of the 1800MEDICARE service-finder flow inside the ChatGPT app playground"
                >
                  <source
                    src="/videos/healthdirect-walkthrough.mp4"
                    type="video/mp4"
                  />
                </video>
              </MediaFrame>
            </MaskReveal>
          </FadeReveal>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* PRESENCE: quotes                                                  */}
      {/* ================================================================ */}
      <section className="pt-[140px]">
        <Container>
          <FadeReveal y={20}>
            <SectionHeading>What the team said</SectionHeading>
          </FadeReveal>

          <div className="mt-[80px] grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
            <FadeReveal y={24}>
              <TestimonialBlock testimonial={bettina} />
            </FadeReveal>
            <FadeReveal y={24} delay={0.08}>
              <TestimonialBlock testimonial={vanessa} />
            </FadeReveal>
          </div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* WHAT'S NEXT                                                       */}
      {/* ================================================================ */}
      <section className="pt-[140px]">
        <Container>
          <FadeReveal y={20}>
            <SectionHeading>Where it goes from here</SectionHeading>
          </FadeReveal>

          <ol className="mt-[80px] grid grid-cols-1 gap-x-16 gap-y-10 md:grid-cols-2">
            {[
              "Expanding features on the back of real feedback from the consumer pilot.",
              "Strengthening production infrastructure: monitoring, resilience and security hardening.",
              "Pursuing a formal path to regulatory certification with the TGA and the Commonwealth.",
              "Extending support beyond ChatGPT to other leading AI platforms like Claude and Gemini.",
            ].map((item, i) => (
              <FadeReveal key={i} y={20} delay={0.04 * i}>
                <li className="flex gap-5">
                  <span className="font-body text-[28px] leading-none font-bold text-paper/40">
                    0{i + 1}
                  </span>
                  <p className="font-body mt-1 text-[16px] leading-[1.5] text-paper/75 md:text-[17px]">
                    {item}
                  </p>
                </li>
              </FadeReveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* CLOSING METRICS                                                   */}
      {/* ================================================================ */}
      <section className="pt-[140px] pb-[40px]">
        <Container>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-7">
              <FadeReveal y={20}>
                <SectionHeading>Bringing Medicare to ChatGPT</SectionHeading>
                <BodyParagraph className="mt-5 max-w-[620px]">
                  <p className="mb-4">
                    When an Australian opens ChatGPT at 11pm to ask about a
                    child&apos;s fever or a mole that&apos;s changed, they&apos;re
                    usually on their own. This puts clinically governed
                    Australian health advice inside that conversation, with a
                    real nurse one tap away.
                  </p>
                  <p>
                    It runs on Healthdirect&apos;s own secure AWS environment
                    and on open standards, so the clinical logic and data
                    governance stay with Healthdirect.
                  </p>
                </BodyParagraph>
              </FadeReveal>
            </div>
            <div className="md:col-span-5">
              <div className="flex flex-col gap-12">
                <FadeReveal y={20} delay={0.05}>
                  <StatBlock value="62M+" label="Interactions / year" />
                </FadeReveal>
                <FadeReveal y={20} delay={0.1}>
                  <StatBlock value="10 Weeks" label="Brief to consumer pilot" />
                </FadeReveal>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* REFLECTION                                                        */}
      {/* ================================================================ */}
      <section className="pt-[140px] pb-[40px]">
        <Container>
          <FadeReveal y={20}>
            <SectionHeading>What I took from it</SectionHeading>
            <BodyParagraph className="mt-5 max-w-[820px]">
              <p className="mb-4">
                This project reset how I think about design. Most of the work
                never touched a design file. It lived in how the agent behaves:
                where it leads, where it defers to clinical logic, and the exact
                moment it hands someone to a nurse. On an AI surface, that
                behaviour is the design.
              </p>
              <p className="mb-4">
                It also pushed me further into design technology. I built the
                design system straight from Figma with MCP and worked in the real
                codebase alongside engineering, shaping a working product instead
                of a flat mockup. The distance between design and build keeps
                shrinking, and this is the part of the craft I want to keep
                pushing.
              </p>
              <p>
                The last lesson had nothing to do with tools. Getting something
                this sensitive from brief to pilot in ten weeks came down to
                agreeing early on what the first release had to prove, and what
                could wait. That clarity is what let us move fast without
                lowering the clinical bar.
              </p>
            </BodyParagraph>
          </FadeReveal>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* NEXT PROJECT                                                      */}
      {/* ================================================================ */}
      <NextProjectReveal currentSlug="healthdirect" />
    </article>
  );
}
