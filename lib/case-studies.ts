import type { CaseStudy } from "@/types/case-study";
import type { ProjectFrontmatter } from "@/types/project";
import { placeholderProjects } from "@/lib/projects";
import { atlasCarbonCaseStudy } from "@/content/work/atlas-carbon";
import { iagCaseStudy } from "@/content/work/iag";
import { awsCaseStudy } from "@/content/work/aws";

const caseStudyMap: Record<string, CaseStudy> = {
  "atlas-carbon": atlasCarbonCaseStudy,
  "iag-design-system": iagCaseStudy,
  "aws-chatbot": awsCaseStudy,
};

export function getCaseStudy(slug: string): CaseStudy | null {
  if (caseStudyMap[slug]) return caseStudyMap[slug];
  const fallback = buildFallback(slug);
  return fallback;
}

export function getAllCaseStudySlugs(): string[] {
  return placeholderProjects.map((p) => p.slug);
}

export function getNextCaseStudy(slug: string): ProjectFrontmatter | null {
  const ordered = [...placeholderProjects].sort((a, b) => a.order - b.order);
  const idx = ordered.findIndex((p) => p.slug === slug);
  if (idx === -1) return null;
  const next = ordered[(idx + 1) % ordered.length];
  return next.slug === slug ? null : next;
}

/**
 * For projects without populated content yet, render a "coming soon" stub
 * so homepage links keep working without 404s.
 */
function buildFallback(slug: string): CaseStudy | null {
  const frontmatter = placeholderProjects.find((p) => p.slug === slug);
  if (!frontmatter) return null;

  return {
    frontmatter,
    meta: {
      role: frontmatter.role,
      team: ["Cross-functional partners"],
      contribution: frontmatter.tags,
      timeline: `${frontmatter.year}`,
      nextSlug: getNextCaseStudy(slug)?.slug,
    },
    blocks: [
      {
        kind: "labelledSection",
        label: "Coming soon",
        body: "Full case study is being staged from working files. The template and motion layer are live; narrative, process imagery, and outcomes follow shortly.",
      },
    ],
    theme: "light",
  };
}
