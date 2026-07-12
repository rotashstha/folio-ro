import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCaseStudy, getAllCaseStudySlugs } from "@/lib/case-studies";
import { placeholderProjects } from "@/lib/projects";
import { CaseStudyHero } from "@/components/case-study/Hero";
import { CaseStudyMetaSection } from "@/components/case-study/Meta";
import { BlockRenderer } from "@/components/case-study/BlockRenderer";
import { NextProjectReveal } from "@/components/case-study/NextProjectReveal";
import { AtlasCarbon } from "@/components/case-study/projects/AtlasCarbon";
import { IAG } from "@/components/case-study/projects/IAG";
import { AWS } from "@/components/case-study/projects/AWS";
import { BP } from "@/components/case-study/projects/BP";
import { Carell } from "@/components/case-study/projects/Carell";
import { Woolworths } from "@/components/case-study/projects/Woolworths";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  const { frontmatter } = study;
  return {
    title: `${frontmatter.client} — ${frontmatter.title} · Rotash Shrestha`,
    description: frontmatter.summary,
    openGraph: {
      title: `${frontmatter.client} — ${frontmatter.title}`,
      description: frontmatter.summary,
      images: [{ url: frontmatter.cover }],
    },
  };
}

export default async function WorkSlugPage({ params }: PageProps) {
  const { slug } = await params;

  // Atlas Carbon ships as a bespoke, pixel-faithful page rather than via the
  // generic template. Other slugs use the template + content schema.
  if (slug === "atlas-carbon") {
    return <AtlasCarbon />;
  }
  if (slug === "iag-design-system") {
    return <IAG />;
  }
  if (slug === "aws-chatbot") {
    return <AWS />;
  }
  if (slug === "bp") {
    return <BP />;
  }
  if (slug === "carell") {
    return <Carell />;
  }
  if (slug === "woolworths") {
    return <Woolworths />;
  }

  const study = getCaseStudy(slug);
  if (!study) notFound();

  const theme = study.theme ?? "dark";
  const nextProject = study.meta.nextSlug
    ? placeholderProjects.find((p) => p.slug === study.meta.nextSlug)
    : null;

  return (
    <article data-cs-root data-theme={theme} className="relative">
      <div className="cs-container pt-32 md:pt-40">
        <Link
          href="/#work"
          data-cursor-trigger="Back"
          className="font-sans inline-flex items-center text-sm tracking-widest uppercase opacity-70 transition-colors hover:text-accent-magenta hover:opacity-100"
        >
          ← Back to work
        </Link>
      </div>

      <CaseStudyHero study={study} />
      <CaseStudyMetaSection meta={study.meta} />
      <BlockRenderer blocks={study.blocks} />
      {nextProject && (
        <NextProjectReveal nextSlug={nextProject.slug} next={nextProject} />
      )}
    </article>
  );
}
