import type { Block } from "@/types/case-study";
import { ProseBlockComponent } from "./blocks/Prose";
import { LabelledSectionBlockComponent } from "./blocks/LabelledSection";
import { ImageBlockComponent } from "./blocks/Image";
import { SideBySideBlockComponent } from "./blocks/SideBySide";
import { VideoBlockComponent } from "./blocks/Video";
import { QuoteBlockComponent } from "./blocks/Quote";
import { GalleryBlockComponent } from "./blocks/Gallery";
import { BeforeAfterBlockComponent } from "./blocks/BeforeAfter";
import { StickyProcessBlockComponent } from "./blocks/StickyProcess";
import { ResultsBlockComponent } from "./blocks/Results";

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, idx) => {
        const key = `${block.kind}-${idx}`;
        switch (block.kind) {
          case "prose":
            return <ProseBlockComponent key={key} block={block} />;
          case "labelledSection":
            return <LabelledSectionBlockComponent key={key} block={block} />;
          case "image":
            return <ImageBlockComponent key={key} block={block} />;
          case "sideBySide":
            return <SideBySideBlockComponent key={key} block={block} />;
          case "video":
            return <VideoBlockComponent key={key} block={block} />;
          case "quote":
            return <QuoteBlockComponent key={key} block={block} />;
          case "gallery":
            return <GalleryBlockComponent key={key} block={block} />;
          case "beforeAfter":
            return <BeforeAfterBlockComponent key={key} block={block} />;
          case "stickyProcess":
            return <StickyProcessBlockComponent key={key} block={block} />;
          case "results":
            return <ResultsBlockComponent key={key} block={block} />;
        }
      })}
    </>
  );
}
