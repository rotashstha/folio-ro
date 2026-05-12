import Image from "next/image";
import { MaskReveal } from "@/components/ui/MaskReveal";
import type { SideBySideBlock, MediaItem, Aspect } from "@/types/case-study";

const ratioGrid: Record<NonNullable<SideBySideBlock["ratio"]>, string> = {
  "1:1": "md:grid-cols-2",
  "2:3": "md:grid-cols-[2fr_3fr]",
  "3:2": "md:grid-cols-[3fr_2fr]",
};

function aspectStyle(aspect: Aspect | undefined): React.CSSProperties {
  return { aspectRatio: (aspect ?? "4/5").replace("/", " / ") };
}

function Pane({
  item,
  delay,
}: {
  item: MediaItem & { aspect?: Aspect };
  delay: number;
}) {
  return (
    <MaskReveal duration={1} delay={delay} className="relative w-full overflow-hidden">
      <div className="relative w-full" style={aspectStyle(item.aspect)}>
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="(min-width: 1280px) 640px, 50vw"
          className="object-cover"
        />
      </div>
    </MaskReveal>
  );
}

export function SideBySideBlockComponent({
  block,
}: {
  block: SideBySideBlock;
}) {
  const ratio = block.ratio ?? "1:1";
  return (
    <section className="cs-section-tight">
      <div className="cs-container">
        <div className={`grid grid-cols-1 gap-6 md:gap-8 ${ratioGrid[ratio]}`}>
          <Pane item={block.left} delay={0} />
          <Pane item={block.right} delay={0.1} />
        </div>
      </div>
    </section>
  );
}
