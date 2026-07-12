import Image from "next/image";
import Link from "next/link";
import { FadeReveal } from "@/components/ui/FadeReveal";
import { MaskReveal } from "@/components/ui/MaskReveal";
import { TagPills } from "@/components/ui/TagPills";
import { placeholderProjects } from "@/lib/projects";
import { WoolworthsStatsRow } from "./woolworths/StatsRow";
import { DocMarquee } from "./woolworths/DocMarquee";

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
    </article>
  );
}
