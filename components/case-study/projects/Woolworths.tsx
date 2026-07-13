import Image from "next/image";
import { FadeReveal } from "@/components/ui/FadeReveal";
import { MaskReveal } from "@/components/ui/MaskReveal";
import { WordReveal } from "@/components/ui/WordReveal";
import { TagPills } from "@/components/ui/TagPills";
import { HeroGrid } from "@/components/case-study/HeroGrid";
import { NextProjectReveal } from "@/components/case-study/NextProjectReveal";
import { placeholderProjects } from "@/lib/projects";
import { BehindTheScenes } from "./woolworths/BehindTheScenes";

const IMG = "/images/work/woolworths";
const project = placeholderProjects.find((p) => p.slug === "woolworths");
const tags = project?.tags ?? [];

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1728px] px-6 md:px-14 lg:px-[85px] ${className}`}>{children}</div>;
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="font-body text-[13px] font-bold uppercase tracking-[0.14em] text-paper/40">{children}</p>;
}

function Heading({ children }: { children: React.ReactNode }) {
  return <h2 className="font-body text-[28px] font-bold leading-tight text-paper md:text-[40px]">{children}</h2>;
}

function Body({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`font-body text-[16px] leading-[1.6] text-paper/60 md:text-[18px] ${className}`}>{children}</div>;
}

export function Woolworths() {
  return (
    <article data-cs-root data-theme="dark" className="font-body relative isolate overflow-x-clip bg-black text-paper antialiased">
      <section data-section="hero" aria-labelledby="cs-hero-title" className="relative pt-[160px] md:pt-[180px]">
        <HeroGrid />
        <Container>
          <div className="max-w-[640px]">
            <FadeReveal y={12}>
              <p id="cs-hero-tag" className="font-body text-[24px] leading-tight font-bold text-paper md:text-[32px]">Woolworths</p>
            </FadeReveal>
            <FadeReveal y={16} delay={0.05}>
              <h1 id="cs-hero-title" className="font-body mt-3 max-w-[540px] text-[18px] leading-snug font-normal text-paper/60 md:text-[24px]">A shared, accessible design system 120+ teams build on</h1>
            </FadeReveal>
            <TagPills tags={tags} className="mt-4" />
          </div>
        </Container>

        <div className="relative mt-[80px] md:mt-[120px]">
          <Container className="relative z-0">
            <FadeReveal y={32} delay={0.1}>
              <MaskReveal duration={1.1} delay={0.1}>
                <div className="relative w-full overflow-hidden rounded-[24px] bg-[#e7ffb4]">
                  <div className="relative w-full" style={{ aspectRatio: "1561 / 1080" }}>
                    <Image src={`${IMG}/hero.png`} alt="Woolworths Design System — token reference and component showcase in Figma" fill priority sizes="(min-width: 1280px) 1561px, 100vw" className="object-cover" />
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
              Woolworths
            </WordReveal>
          </p>
        </div>
      </section>

      {/* BRIEF + META */}
      <section className="pt-[120px] md:pt-[160px]">
        <Container>
          <FadeReveal y={20}>
            <Eyebrow>(brief)</Eyebrow>
            <Body className="mt-6 max-w-[820px] text-[22px] md:text-[30px] !leading-[1.4] !text-paper/80">
              <p>The Woolworths Design System is the shared foundation our teams build on — a library of accessible, consistent, production-ready components that lets designers and engineers ship trusted retail experiences faster, together.</p>
            </Body>
          </FadeReveal>
          <FadeReveal y={20} delay={0.06}>
            <div className="mt-[64px] grid grid-cols-2 gap-y-10 md:grid-cols-4">
              {[["Company","Woolworths"],["Tools","Figma, Claude Code"],["Role","Senior Design System Designer"],["Year","2026"]].map(([k,v]) => (
                <div key={k}>
                  <p className="font-body text-[13px] font-bold uppercase tracking-[0.14em] text-paper/40">{k}</p>
                  <p className="font-body mt-3 text-[18px] font-bold text-paper md:text-[20px]">{v}</p>
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
              <p>As senior design system designer, I shaped and maintained the Woolworths Design System across web and mobile. My work spanned design foundations and tokens, component build and governance, and the written guidelines that keep teams consistent. I partnered closely with our accessibility group to document inclusive patterns so every product ships an equivalent experience for all customers.</p>
            </Body>
          </FadeReveal>
        </Container>
        <Container className="mt-[56px] md:mt-[80px]">
          <div className="space-y-6 md:space-y-8">
            {[
              { src: "typography", alt: "Woolworths Design System type scale and Roboto web font foundations" },
              { src: "card-component", alt: "Woolworths ProductCard component live on woolworths.com.au" },
            ].map((img, i) => (
              <FadeReveal key={img.src} y={32} delay={0.05 * (i + 1)}>
                <MaskReveal duration={1} delay={0.05}>
                  <Image src={`${IMG}/${img.src}.png`} alt={img.alt} width={4683} height={2658} sizes="(min-width: 1728px) 1558px, 100vw" className="w-full rounded-[24px]" />
                </MaskReveal>
              </FadeReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* BEHIND THE SCENES — pinned pillars + libraries */}
      <BehindTheScenes />

      {/* KEY PROJECTS */}
      <section className="pt-[120px] md:pt-[160px]">
        <Container>
          <FadeReveal y={20}><Heading>Key projects</Heading></FadeReveal>
          <div className="mt-[56px] grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14">
            <div className="space-y-[64px]">
              <FadeReveal y={20}>
                <Eyebrow>(1)</Eyebrow>
                <h3 className="font-body mt-4 max-w-[720px] text-[24px] font-bold text-paper md:text-[32px]">Design tokens for effortless theming</h3>
                <Body className="mt-5 max-w-[820px]">
                  <p>With Figma variables, tokens finally live natively in design. The system was the ideal place to adopt them — Woolworths spans several brands and themes, so a robust token structure lets us switch themes effortlessly and speeds component work across the board.</p>
                </Body>
              </FadeReveal>
              <FadeReveal y={20} delay={0.05}>
                <Eyebrow>(2)</Eyebrow>
                <h3 className="font-body mt-4 max-w-[720px] text-[24px] font-bold text-paper md:text-[32px]">A new library for the web revamp</h3>
                <Body className="mt-5 max-w-[820px]">
                  <p>As we began revamping the retail web platform, I led a fresh library to hold the new standards on the latest framework — building foundation, components and tokens from the ground up, and restructuring the Figma files so designers can move cleanly between the core and new libraries.</p>
                </Body>
              </FadeReveal>
            </div>
            <FadeReveal y={28} delay={0.06}>
              <MaskReveal duration={1} delay={0.05}>
                <video
                  src="/videos/woolworths-cooking-mode.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="mx-auto w-full max-w-[560px] rounded-[20px]"
                />
              </MaskReveal>
            </FadeReveal>
          </div>
        </Container>
        <Container className="mt-[64px]">
          <FadeReveal y={28}>
            <MaskReveal duration={1}>
              <Image src={`${IMG}/cooking-flow.png`} alt="Woolworths guided Cooking Mode — step-by-step mobile flow with a built-in assistant" width={4668} height={2658} sizes="(min-width: 1728px) 1558px, 100vw" className="w-full rounded-[20px]" />
            </MaskReveal>
          </FadeReveal>
        </Container>
        <Container className="mt-6 md:mt-8">
          <FadeReveal y={28}>
            <MaskReveal duration={1}>
              <Image src={`${IMG}/solution.png`} alt="Woolworths recipes experience — meal ideas and guided cooking on woolworths.com.au" width={4671} height={2637} sizes="(min-width: 1728px) 1558px, 100vw" className="w-full rounded-[20px]" />
            </MaskReveal>
          </FadeReveal>
        </Container>
      </section>

      {/* REFLECTION */}
      <section className="pt-[120px] md:pt-[160px]">
        <Container>
          <FadeReveal y={20}>
            <Eyebrow>(reflection)</Eyebrow>
            <Heading>Looking back</Heading>
          </FadeReveal>
          <div className="mt-[56px] grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-14">
            <FadeReveal y={20}>
              <Body className="max-w-[560px]">
                <p>The components were never the hard part. The real work was earning enough trust that teams would build on a shared system instead of quietly forking their own. That trust came from showing up — office hours, fast reviews, and unblocking people before they gave up and rolled their own version.</p>
              </Body>
            </FadeReveal>
            <FadeReveal y={20} delay={0.06}>
              <Body className="max-w-[560px]">
                <p>If I started over, I&apos;d open contribution up much sooner. For too long the systems team was the bottleneck; the library only began to scale once other designers and engineers could add to it safely, with guardrails that kept the quality bar high. A system this size is never really finished — it&apos;s something you keep tending.</p>
              </Body>
            </FadeReveal>
          </div>
        </Container>
      </section>

      {/* NEXT PROJECT — scroll-driven panel rises and takes over */}
      <NextProjectReveal nextSlug="atlas-carbon" />
    </article>
  );
}
