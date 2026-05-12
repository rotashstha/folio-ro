import type { CaseStudy } from "@/types/case-study";
import { placeholderProjects } from "@/lib/projects";

const frontmatter = placeholderProjects.find((p) => p.slug === "aws-chatbot")!;

/**
 * AWS's full case study is rendered by the bespoke
 * components/case-study/projects/AWS.tsx component, NOT by the generic
 * block renderer. This stub exists only so getCaseStudy() can return
 * frontmatter + meta for ancillary uses (next-project lookup, sitemap
 * entries, og-image generation, etc.).
 */
export const awsCaseStudy: CaseStudy = {
  frontmatter,
  theme: "dark",
  heroSubtitle:
    "A unified conversational system for faster, smarter cloud support",
  heroDisplay: "AWS",
  heroCardTone: "navy",
  heroMedia: {
    src: "/images/work/aws/hero.png",
    alt: "AWS chatbot redesign — two iPhone mockups showing the conversational support entry and an active triage flow",
    aspect: "16/9",
  },
  meta: {
    role: "Experience Designer",
    team: ["1 Experience Designer", "2 Engineers", "1 Product Owner"],
    contribution: [
      "Discovery & Strategy",
      "Conversational Design",
      "Chatbot Experience Design",
    ],
    timeline: "24 Weeks",
    nextSlug: "bp",
  },
  blocks: [
    {
      kind: "labelledSection",
      label: "Coming soon",
      body: "AWS renders via the bespoke project component (see components/case-study/projects/AWS.tsx). This stub keeps frontmatter and meta available to the loader.",
    },
  ],
};
