import Image from "next/image";
import { MaskReveal } from "@/components/ui/MaskReveal";
import { WordReveal } from "@/components/ui/WordReveal";
import { FadeReveal } from "@/components/ui/FadeReveal";
import { HeroGrid } from "@/components/case-study/HeroGrid";
import type { CaseStudy } from "@/types/case-study";

interface CaseStudyHeroProps {
  study: CaseStudy;
}

const heroCardBg: Record<NonNullable<CaseStudy["heroCardTone"]>, string> = {
  teal: "bg-card-teal",
  navy: "bg-card-navy",
  ink: "bg-ink",
  paper: "bg-paper",
};

export function CaseStudyHero({ study }: CaseStudyHeroProps) {
  const { frontmatter, heroMedia, heroSubtitle, heroDisplay, heroCardTone } =
    study;
  const subtitle = heroSubtitle ?? frontmatter.title;
  const display = heroDisplay ?? frontmatter.client;
  const cardTone = heroCardTone ?? "teal";

  const mediaSrc = heroMedia?.src ?? frontmatter.cover;
  const mediaAlt = heroMedia?.alt ?? frontmatter.label;
  const aspect = heroMedia?.aspect ?? "21/9";

  return (
    <section
      data-section="hero"
      className="relative pt-12 pb-12 md:pt-16 md:pb-20"
      aria-labelledby="cs-hero-title"
    >
      <HeroGrid />
      <div className="cs-container relative">
        {/* Editorial split: tag/subtitle (left) + huge display (right) */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end md:gap-8">
          <div className="md:col-span-5">
            <FadeReveal y={16}>
              <p className="cs-eyebrow">{frontmatter.client}</p>
            </FadeReveal>
            <h1
              id="cs-hero-title"
              className="font-sans mt-3 max-w-md text-[clamp(1.25rem,1.6vw,1.5rem)] leading-snug font-medium opacity-90"
            >
              <WordReveal staggerMs={35} durationMs={600}>
                {subtitle}
              </WordReveal>
            </h1>
          </div>

          <div
            className="font-display md:col-span-7 md:text-right"
            aria-hidden={display === subtitle}
          >
            <p className="text-[clamp(3.25rem,12vw,12.5rem)] leading-[0.92] tracking-tight">
              <WordReveal staggerMs={70} durationMs={950}>
                {display}
              </WordReveal>
            </p>
          </div>
        </div>
      </div>

      {/* Hero media card */}
      <FadeReveal className="cs-container mt-12 md:mt-16" y={32} delay={0.18}>
        <MaskReveal
          duration={1.1}
          delay={0.05}
          className={`relative w-full overflow-hidden rounded-3xl ${heroCardBg[cardTone]}`}
        >
          <div
            className="relative w-full"
            style={{ aspectRatio: aspect.replace("/", " / ") }}
          >
            <Image
              src={mediaSrc}
              alt={mediaAlt}
              fill
              priority
              sizes="(min-width: 1280px) 1280px, 100vw"
              className="object-contain object-center md:object-cover"
            />
          </div>
        </MaskReveal>
      </FadeReveal>
    </section>
  );
}
