import Image from "next/image";
import { MaskReveal } from "@/components/ui/MaskReveal";
import type { GalleryBlock, Aspect } from "@/types/case-study";

const colsClass: Record<2 | 3 | 4, string> = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-2 lg:grid-cols-4",
};

function aspectStyle(aspect: Aspect | undefined): React.CSSProperties {
  return { aspectRatio: (aspect ?? "1/1").replace("/", " / ") };
}

export function GalleryBlockComponent({ block }: { block: GalleryBlock }) {
  return (
    <section className="cs-section-tight">
      <div className="cs-container">
        <div className={`grid grid-cols-1 gap-4 md:gap-6 ${colsClass[block.columns]}`}>
          {block.items.map((item, i) => (
            <MaskReveal
              key={`${item.src}-${i}`}
              delay={Math.min(i * 0.07, 0.4)}
              duration={1}
              className="relative w-full overflow-hidden"
            >
              <div className="relative w-full" style={aspectStyle(item.aspect)}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes={
                    block.columns === 4
                      ? "(min-width: 1024px) 320px, 50vw"
                      : "(min-width: 768px) 33vw, 100vw"
                  }
                  className="object-cover"
                />
              </div>
            </MaskReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
