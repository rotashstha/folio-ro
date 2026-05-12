import Image from "next/image";
import Link from "next/link";
import type { ProjectFrontmatter, ProjectPalette } from "@/types/project";

export interface ProjectCardProps {
  project: ProjectFrontmatter;
  priority?: boolean;
}

const paletteClasses: Record<ProjectPalette, string> = {
  teal: "bg-[#d6f3f7]",
  navy: "bg-[#161a2a]",
};

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const { slug, title, client, label, cover, devices, palette, footerLogo } = project;

  const hasDevices = devices && devices.length > 0;

  const captionRow = (
    <div className="work-card__caption-row">
      <span className="work-card__caption-name">{client}</span>
      <span className="work-card__caption-divider" aria-hidden="true">
        -
      </span>
      <span className="work-card__caption-meta">{title}</span>
    </div>
  );

  return (
    <Link
      href={`/work/${slug}`}
      aria-label={label}
      data-cursor-trigger="View case"
      className="work-card group block focus-visible:outline-none"
    >
      <figure
        className={`work-card__figure relative aspect-[761/748] w-full overflow-hidden ${hasDevices ? paletteClasses[palette] : ""}`}
      >
        {hasDevices ? (
          <>
            <div className="absolute inset-0 flex items-end justify-center gap-6 md:gap-10">
              {devices.map((device, i) => (
                <div
                  key={device.src}
                  className={`relative h-full w-[34%] translate-y-[12%] transition-transform duration-500 group-hover:translate-y-[8%] ${
                    i === 0 ? "md:-translate-x-4" : "md:translate-x-4"
                  }`}
                  style={{ filter: "drop-shadow(0 40px 40px rgba(0,0,0,0.35))" }}
                >
                  <Image
                    src={device.src}
                    alt={device.alt}
                    fill
                    sizes="(min-width: 1200px) 260px, 30vw"
                    className="object-contain object-bottom"
                    priority={priority && i === 0}
                  />
                </div>
              ))}
            </div>
            {footerLogo && (
              <div className="absolute right-10 bottom-8 w-[40%] md:w-[290px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={footerLogo} alt="" width={290} height={38} className="h-auto w-full opacity-95" />
              </div>
            )}
          </>
        ) : (
          <Image
            src={cover}
            alt={label}
            fill
            sizes="(min-width: 900px) 50vw, 100vw"
            className="work-card__image object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            priority={priority}
          />
        )}
      </figure>
      <figcaption className="work-card__caption font-body mt-6 text-[20px] font-bold text-[#c6c6c6] md:text-[24px]">
        {captionRow}
        <div aria-hidden="true">{captionRow}</div>
      </figcaption>
    </Link>
  );
}
