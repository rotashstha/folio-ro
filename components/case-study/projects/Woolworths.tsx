import Image from "next/image";
import Link from "next/link";
import { FadeReveal } from "@/components/ui/FadeReveal";
import { MaskReveal } from "@/components/ui/MaskReveal";
import { TagPills } from "@/components/ui/TagPills";
import { placeholderProjects } from "@/lib/projects";

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
    </article>
  );
}
