import { FadeReveal } from "@/components/ui/FadeReveal";
import { ProjectCard } from "@/components/ui/ProjectCard";
import type { ProjectFrontmatter } from "@/types/project";

export interface WorkProps {
  projects: ProjectFrontmatter[];
  heading?: string;
}

export function Work({ projects, heading = "Folio" }: WorkProps) {
  const visible = projects
    .filter((p) => p.status === "published")
    .sort((a, b) => a.order - b.order);

  return (
    <section
      id="work"
      data-theme="dark"
      aria-label="Selected work"
      className="bg-ink text-paper relative overflow-hidden pt-10 pb-24 md:pt-20 md:pb-32"
    >
      <div className="relative w-full px-6">
        <h2
          aria-label={heading}
          data-cursor-target="work-heading"
          className="font-display pointer-events-none relative z-10 select-none text-left text-[30vw] leading-[0.85] text-paper md:text-[300px]"
        >
          {heading}
        </h2>

        <ul className="relative z-0 -mt-[40px] grid grid-cols-1 gap-6 md:-mt-[110px] md:grid-cols-2 md:gap-[24px]">
          {visible.map((project, i) => (
            <li key={project.slug}>
              <FadeReveal delay={i * 0.1}>
                <ProjectCard project={project} priority={i === 0} />
              </FadeReveal>
            </li>
          ))}
        </ul>
      </div>

    </section>
  );
}
