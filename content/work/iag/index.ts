import type { CaseStudy } from "@/types/case-study";
import { placeholderProjects } from "@/lib/projects";

const frontmatter = placeholderProjects.find((p) => p.slug === "iag-design-system")!;

/**
 * IAG's full case study is rendered by the bespoke
 * components/case-study/projects/IAG.tsx component, NOT by the generic
 * block renderer. This stub exists only so getCaseStudy() can return
 * frontmatter + meta for ancillary uses (next-project lookup, sitemap
 * entries, og-image generation, etc.).
 */
export const iagCaseStudy: CaseStudy = {
  frontmatter,
  theme: "dark",
  heroSubtitle: "Scaling Design Systems for multi-brand web experiences",
  heroDisplay: "Insurance Aus Group",
  heroCardTone: "paper",
  heroMedia: {
    src: "/images/work/iag/hero.png",
    alt: "IAG / NRMA acquisition redesign — desktop and mobile mockups for car and home insurance journeys",
    aspect: "16/9",
  },
  meta: {
    role: "Lead UX/UI Designer / Design Systems SME",
    team: [
      "3 UX/UI Designers",
      "7 Engineers",
      "2 QE",
      "2 Business Analysts",
      "1 Integration Manager / PM",
    ],
    contribution: [
      "Token Architecture & Foundations",
      "Multi-brand Patterns",
      "Component Semantics & Interaction Patterns",
      "Flagship Brand Redesigns (NRMA, CGU, IAG, AMI, State NZ)",
    ],
    timeline: "16 months",
    nextSlug: "aws-chatbot",
  },
  blocks: [
    {
      kind: "labelledSection",
      label: "Coming soon",
      body: "IAG renders via the bespoke project component (see components/case-study/projects/IAG.tsx). This stub keeps frontmatter and meta available to the loader.",
    },
  ],
};
