import Image from "next/image";
import Link from "next/link";
import { FadeReveal } from "@/components/ui/FadeReveal";
import { MaskReveal } from "@/components/ui/MaskReveal";
import { TagPills } from "@/components/ui/TagPills";
import { placeholderProjects } from "@/lib/projects";
import { WoolworthsStatsRow } from "./woolworths/StatsRow";
import { DocMarquee } from "./woolworths/DocMarquee";
import { RitualMarquee } from "./woolworths/RitualMarquee";

const IMG = "/images/work/woolworths";
const project = placeholderProjects.find((p) => p.slug === "woolworths");
const tags = project?.tags ?? [];

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-6 md:px-10 ${className}`}>{children}</div>;
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="font-body text-[13px] font-bold uppercase tracking-[0.14em] text-black/40">{children}</p>;
}

function Heading({ children }: { children: React.ReactNode }) {
  return <h2 className="font-body text-[28px] font-bold leading-tight text-black md:text-[40px]">{children}</h2>;
}

function Body({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`font-body text-[16px] leading-[1.6] text-black/60 md:text-[18px] ${className}`}>{children}</div>;
}

export function Woolworths() {
  return (
    <article data-cs-root data-theme="light" className="font-body relative isolate overflow-x-clip antialiased">
      <div className="cs-container pt-32 md:pt-40">
        <Link href="/#work" data-cursor-trigger="Back" className="font-sans inline-flex items-center text-sm uppercase tracking-widest opacity-60 transition-colors hover:opacity-100">
          ← Back to work
        </Link>
      </div>

      <section data-section="hero" className="pt-[64px] md:pt-[88px]">
        <Container>
          <FadeReveal y={16}>
            <h1 className="font-body text-[48px] font-bold leading-[1.02] tracking-[-0.02em] text-black md:text-[88px]">Orchard Design System</h1>
          </FadeReveal>
          <TagPills tags={tags} className="mt-6" />
        </Container>
        <Container className="mt-[48px] md:mt-[72px]">
          <FadeReveal y={32} delay={0.1}>
            <MaskReveal duration={1.1} delay={0.1}>
              <Image src={`${IMG}/hero.svg`} alt="Orchard design system hero" width={2000} height={1000} priority className="w-full rounded-[24px]" />
            </MaskReveal>
          </FadeReveal>
        </Container>
      </section>

      {/* BRIEF + META */}
      <section className="pt-[120px] md:pt-[160px]">
        <Container>
          <FadeReveal y={20}>
            <Eyebrow>(brief)</Eyebrow>
            <Body className="mt-6 max-w-[820px] text-[22px] md:text-[30px] !leading-[1.4] !text-black/80">
              <p>Orchard is the shared foundation Woolworths teams build on — a library of accessible, consistent, production-ready components that lets designers and engineers ship trusted retail experiences faster, together.</p>
            </Body>
          </FadeReveal>
          <FadeReveal y={20} delay={0.06}>
            <div className="mt-[64px] grid grid-cols-2 gap-y-10 md:grid-cols-4">
              {[["Company","Woolworths"],["Tools","Figma"],["Role","Designer"],["Year","2024"]].map(([k,v]) => (
                <div key={k}>
                  <p className="font-body text-[13px] font-bold uppercase tracking-[0.14em] text-black/40">{k}</p>
                  <p className="font-body mt-3 text-[18px] font-bold text-black md:text-[20px]">{v}</p>
                </div>
              ))}
            </div>
          </FadeReveal>
        </Container>
      </section>

      {/* MY ROLE */}
      <section className="pt-[120px] md:pt-[160px]">
        <Container>
          <FadeReveal y={20}>
            <Eyebrow>(my role)</Eyebrow>
            <Body className="mt-6 max-w-[820px]">
              <p>As senior product designer, I shaped and maintained Orchard across web and mobile. My work spanned design foundations and tokens, component build and governance, and the written guidelines that keep teams consistent. I partnered closely with our accessibility group to document inclusive patterns so every product ships an equivalent experience for all customers.</p>
            </Body>
          </FadeReveal>
        </Container>
        <Container className="mt-[56px] md:mt-[80px]">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {["role-1","role-2"].map((n, i) => (
              <FadeReveal key={n} y={32} delay={0.05 * (i + 1)}>
                <MaskReveal duration={1} delay={0.05}>
                  <Image src={`${IMG}/${n}.svg`} alt={`Orchard role image ${i + 1}`} width={800} height={600} className="w-full rounded-[24px]" />
                </MaskReveal>
              </FadeReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* BEHIND THE SCENES — PILLARS */}
      <section className="pt-[120px] md:pt-[160px]">
        <Container>
          <FadeReveal y={20}><Heading>Behind the scenes…</Heading></FadeReveal>
          <div className="mt-[48px] border-t border-black/10">
            {["Component library","Guidelines & documentation","Accessibility","Contribution model","Team collaboration"].map((label, i) => (
              <FadeReveal key={label} y={16} delay={0.04 * i}>
                <div className="flex items-baseline gap-6 border-b border-black/10 py-6">
                  <span className="font-body text-[14px] font-bold text-black/30">——</span>
                  <span className="font-body text-[22px] font-normal text-black md:text-[28px]">{label}</span>
                </div>
              </FadeReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* FIGMA LIBRARIES + STATS */}
      <section className="pt-[120px] md:pt-[160px]">
        <Container>
          <FadeReveal y={20}><Heading>Two libraries, one system — web &amp; mobile</Heading></FadeReveal>
          <FadeReveal y={20} delay={0.06}>
            <Body className="mt-6 max-w-[820px]">
              <p>We ship separate libraries for web (React) and mobile (iOS &amp; Android) so each stays lean and focused on how its designers actually work. Parity between design and code is the goal: Orchard supports the languages Woolworths builds in, keeping one system honest across every surface.</p>
            </Body>
          </FadeReveal>
          <FadeReveal y={24} delay={0.1}>
            <div className="mt-[56px]"><WoolworthsStatsRow /></div>
          </FadeReveal>
        </Container>
      </section>

      {/* GUIDELINES — DOC MARQUEE */}
      <section className="pt-[120px] md:pt-[160px]">
        <Container>
          <FadeReveal y={20}><Heading>Documentation that scales the system</Heading></FadeReveal>
          <FadeReveal y={20} delay={0.06}>
            <Body className="mt-6 max-w-[820px]">
              <p>Thousands of people touch Orchard every week — journey designers, engineers, and PMs. Clear how-to guidance is what turns a component library into a system: accessibility notes, patterns, behaviours, usage, and voice, all in one place.</p>
            </Body>
          </FadeReveal>
        </Container>
        <FadeReveal y={24} delay={0.1}>
          <div className="mt-[56px]"><DocMarquee /></div>
        </FadeReveal>
      </section>

      {/* INCLUSIVE & ACCESSIBLE */}
      <section className="pt-[120px] md:pt-[160px]">
        <Container>
          <FadeReveal y={20}><Heading>Inclusive and accessible</Heading></FadeReveal>
          <FadeReveal y={20} delay={0.05}>
            <div className="mt-[40px] flex flex-wrap gap-3">
              {["Colour contrast · WCAG AA","Keyboard controls","Focus state","Screen reader","Annotation kit"].map((chip) => (
                <span key={chip} className="rounded-full border border-black/12 bg-black/[0.03] px-5 py-2.5 font-body text-[14px] font-medium text-black/70 transition-colors hover:border-black/25 hover:text-black">{chip}</span>
              ))}
            </div>
          </FadeReveal>
          <FadeReveal y={20} delay={0.1}>
            <Body className="mt-[48px] max-w-[820px]">
              <p className="mb-4">Orchard has to meet a high accessibility bar so every Woolworths customer can use the products built on it. We work alongside a dedicated accessibility partner through the whole creation process, not just at review.</p>
              <p>Accessibility spans contrast ratios, keyboard control, screen-reader support, focus states, and annotated documentation. Orchard bakes these criteria into each component's Figma docs, raising awareness and making the accessible choice the default one.</p>
            </Body>
          </FadeReveal>
        </Container>
      </section>

      {/* CONTRIBUTION & INNER-SOURCE */}
      <section className="pt-[120px] md:pt-[160px]">
        <Container>
          <FadeReveal y={20}><Heading>Scaling through contribution</Heading></FadeReveal>
          <FadeReveal y={20} delay={0.06}>
            <Body className="mt-6 max-w-[820px]">
              <p className="mb-4">A small system team can't outpace a whole bank of product work. So Orchard grows through contribution: we promote inner-source across design and engineering, closing the gap between what exists and the patterns teams still need.</p>
              <p>Contribution is a core measure of our success. Rather than a walled-off team, we act as an extension of every product team — governing quality and system thinking while a clear flow and checklist make contributing easy.</p>
            </Body>
          </FadeReveal>
        </Container>
        <Container className="mt-[56px] md:mt-[80px]">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <FadeReveal y={32} className="md:col-span-2">
              <MaskReveal duration={1}>
                <Image src={`${IMG}/collab-flow.svg`} alt="Orchard collaboration flow" width={1600} height={900} className="w-full rounded-[24px]" />
              </MaskReveal>
            </FadeReveal>
            <FadeReveal y={32} delay={0.08}>
              <MaskReveal duration={1} delay={0.05}>
                <Image src={`${IMG}/checklist.svg`} alt="Orchard component checklist" width={800} height={1000} className="w-full rounded-[24px]" />
              </MaskReveal>
            </FadeReveal>
          </div>
        </Container>
      </section>
      {/* COMMUNITY & COLLABORATION */}
      <section className="pt-[120px] md:pt-[160px]">
        <Container>
          <FadeReveal y={20}><Heading>It&apos;s all about community and collaboration</Heading></FadeReveal>
          <FadeReveal y={20} delay={0.06}>
            <Body className="mt-6 max-w-[820px]">
              <p>Internally we sync weekly so everyone knows what&apos;s in flight and can jam on solutions together. With product teams we run a dedicated Slack channel for quick cross-functional support, plus open office hours designers can book into — the fastest ways to reach us and coordinate work across the bank.</p>
            </Body>
          </FadeReveal>
        </Container>
        <FadeReveal y={20} delay={0.1}>
          <div className="mt-[48px]">
            <RitualMarquee />
          </div>
        </FadeReveal>
      </section>
      {/* SYSTEM MAP */}
      <section className="pt-[120px] md:pt-[160px]">
        <Container>
          <FadeReveal y={20}>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {[
                ["Orchard Design System","The single source of foundations, tokens, and components."],
                ["Shared tools & services","Reused across product teams — auth, payments, content."],
                ["Client-facing platforms","Where customers meet the work, powered by the system."],
              ].map(([t, d], i) => (
                <FadeReveal key={t} y={20} delay={0.05 * i}>
                  <div className="rounded-[20px] border border-black/10 p-7">
                    <p className="font-body text-[20px] font-bold text-black md:text-[24px]">{t}</p>
                    <p className="font-body mt-3 text-[15px] leading-[1.5] text-black/55">{d}</p>
                  </div>
                </FadeReveal>
              ))}
            </div>
          </FadeReveal>
          <FadeReveal y={20} delay={0.12}>
            <div className="mt-[40px] flex flex-wrap gap-3">
              {["Rewards app","Online store","Store ops","Checkout","Help centre","Everyday Market","Profile & settings"].map((s) => (
                <span key={s} className="rounded-full bg-black/[0.04] px-5 py-2.5 font-body text-[14px] text-black/70">{s}</span>
              ))}
            </div>
          </FadeReveal>
        </Container>
      </section>

      {/* KEY PROJECTS */}
      <section className="pt-[120px] md:pt-[160px]">
        <Container>
          <FadeReveal y={20}><Heading>Key projects</Heading></FadeReveal>
          <div className="mt-[56px] space-y-[80px]">
            <FadeReveal y={20}>
              <Eyebrow>(1)</Eyebrow>
              <h3 className="font-body mt-4 max-w-[720px] text-[24px] font-bold text-black md:text-[32px]">Design tokens for effortless theming</h3>
              <Body className="mt-5 max-w-[820px]">
                <p>With Figma variables, tokens finally live natively in design. Orchard was the ideal place to adopt them — Woolworths spans several brands and themes, so a robust token structure lets us switch themes effortlessly and speeds component work across the board.</p>
              </Body>
            </FadeReveal>
            <FadeReveal y={20} delay={0.05}>
              <Eyebrow>(2)</Eyebrow>
              <h3 className="font-body mt-4 max-w-[720px] text-[24px] font-bold text-black md:text-[32px]">A new library for the web revamp</h3>
              <Body className="mt-5 max-w-[820px]">
                <p>As we began revamping the retail web platform, I led a fresh library to hold the new standards on the latest framework — building foundation, components, and tokens from the ground up, and restructuring the Figma files so designers can move cleanly between the core and new libraries.</p>
              </Body>
            </FadeReveal>
          </div>
        </Container>
        <Container className="mt-[64px]">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
            {["project-1","project-2","project-3","project-4","project-5","project-6"].map((n, i) => (
              <FadeReveal key={n} y={28} delay={0.04 * i}>
                <MaskReveal duration={0.9} delay={0.03}>
                  <Image src={`${IMG}/${n}.svg`} alt={`Orchard project image ${i + 1}`} width={800} height={600} className="w-full rounded-[16px]" />
                </MaskReveal>
              </FadeReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* LET'S CONNECT */}
      <section className="pt-[120px] pb-[160px] md:pt-[160px]">
        <Container>
          <FadeReveal y={20}>
            <Heading>Let&apos;s connect</Heading>
            <Body className="mt-6 max-w-[620px]">
              <p>Have a new project or just want to say hi?{" "}
                <Link href="/#contact" className="font-medium text-black underline underline-offset-4 transition-opacity hover:opacity-70">Feel free to reach out.</Link>
              </p>
            </Body>
          </FadeReveal>
        </Container>
      </section>
    </article>
  );
}
