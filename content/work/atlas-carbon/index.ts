import type { CaseStudy } from "@/types/case-study";
import { placeholderProjects } from "@/lib/projects";

const frontmatter = placeholderProjects.find((p) => p.slug === "atlas-carbon")!;

/**
 * Atlas Carbon's full case study is rendered by the bespoke
 * components/case-study/projects/AtlasCarbon.tsx component, NOT by the
 * generic block renderer. This stub exists only so getCaseStudy() can
 * return frontmatter + meta for ancillary uses (next-project lookup,
 * sitemap entries, og-image generation, etc.).
 */
export const atlasCarbonCaseStudy: CaseStudy = {
  frontmatter,
  theme: "dark",
  heroSubtitle: "Empowering Farmers with Smarter, Simpler Tools",
  heroDisplay: "Atlas Carbon",
  heroCardTone: "teal",
  heroMedia: {
    src: "/images/work/atlas-carbon/hero.webp",
    alt: "Maia farming app — two iPhone 16 Pro mockups showing the redesigned grazing dashboard and overview",
    aspect: "16/9",
  },
  meta: {
    role: "Lead Product Designer",
    team: ["2 Product Designers", "5 Engineers", "1 QE"],
    contribution: [
      "Discovery",
      "0→1 Product Strategy",
      "End-to-end UI & Interaction design",
      "Design system",
    ],
    timeline: "26 Weeks",
    nextSlug: "iag-design-system",
  },
  blocks: [
    {
      kind: "labelledSection",
      label: "Coming soon",
      body: "Atlas Carbon renders via the bespoke project component (see components/case-study/projects/AtlasCarbon.tsx). This stub keeps frontmatter and meta available to the loader.",
    },
  ],
};
