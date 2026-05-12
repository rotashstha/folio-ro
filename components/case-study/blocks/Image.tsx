import Image from "next/image";
import { MaskReveal } from "@/components/ui/MaskReveal";
import { FadeReveal } from "@/components/ui/FadeReveal";
import { MediaScrub } from "@/components/case-study/MediaScrub";
import type { ImageBlock } from "@/types/case-study";

function aspectStyle(aspect: ImageBlock["aspect"]): React.CSSProperties {
  return { aspectRatio: aspect.replace("/", " / ") };
}

export function ImageBlockComponent({ block }: { block: ImageBlock }) {
  const isFullBleed = block.bleed === "full";

  const figure = (
    <figure className={isFullBleed ? "" : "cs-container"}>
      <MaskReveal duration={1} className="relative w-full overflow-hidden">
        <div className="relative w-full" style={aspectStyle(block.aspect)}>
          {block.scrub ? (
            <MediaScrub className="absolute inset-0">
              <Image
                src={block.src}
                alt={block.alt}
                fill
                sizes={isFullBleed ? "100vw" : "(min-width: 1280px) 1280px, 100vw"}
                className="object-cover"
              />
            </MediaScrub>
          ) : (
            <Image
              src={block.src}
              alt={block.alt}
              fill
              sizes={isFullBleed ? "100vw" : "(min-width: 1280px) 1280px, 100vw"}
              className="object-cover"
            />
          )}
        </div>
      </MaskReveal>
      {block.caption && (
        <FadeReveal y={12} delay={0.15}>
          <figcaption
            className={`cs-caption mt-4 ${isFullBleed ? "px-[var(--cs-gutter)]" : ""}`}
          >
            {block.caption}
          </figcaption>
        </FadeReveal>
      )}
    </figure>
  );

  return <section className="cs-section-tight">{figure}</section>;
}
