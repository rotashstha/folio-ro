import type { Accent, ProjectFrontmatter } from "@/types/project";

export type Theme = "dark" | "light";

export interface MediaItem {
  src: string;
  alt: string;
  /** Numeric width in px — used by next/image to compute layout. */
  width?: number;
  height?: number;
}

export type Aspect = "16/9" | "4/5" | "1/1" | "21/9" | "3/2" | "9/16";

export type ProseBlock = {
  kind: "prose";
  markdown: string;
  align?: "left" | "center";
};

export type LabelledSectionBlock = {
  kind: "labelledSection";
  /** Section label shown in the left column / above the body. */
  label: string;
  /** Optional eyebrow above the label. */
  eyebrow?: string;
  /** Body markdown. Same minimal subset as ProseBlock. */
  body: string;
  /** Optional sub-heading sitting between label and body. */
  subhead?: string;
};

export type ImageBlock = {
  kind: "image";
  src: string;
  alt: string;
  aspect: Aspect;
  bleed?: "full" | "contained";
  caption?: string;
  /** Tie scale/translate to scroll progress via GSAP ScrollTrigger. */
  scrub?: boolean;
};

export type SideBySideBlock = {
  kind: "sideBySide";
  left: MediaItem & { aspect?: Aspect };
  right: MediaItem & { aspect?: Aspect };
  ratio?: "1:1" | "2:3" | "3:2";
};

export type VideoBlock = {
  kind: "video";
  src: string;
  poster: string;
  aspect: Aspect;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  caption?: string;
};

export type QuoteBlock = {
  kind: "quote";
  text: string;
  attribution?: string;
  accent?: Accent;
};

export type GalleryBlock = {
  kind: "gallery";
  items: (MediaItem & { aspect?: Aspect })[];
  columns: 2 | 3 | 4;
};

export type BeforeAfterBlock = {
  kind: "beforeAfter";
  before: MediaItem;
  after: MediaItem;
  mode: "slider" | "toggle";
  aspect?: Aspect;
};

export type StickyProcessBlock = {
  kind: "stickyProcess";
  steps: {
    eyebrow: string;
    title: string;
    body: string;
    media?: MediaItem;
  }[];
};

export type ResultsBlock = {
  kind: "results";
  metrics: {
    label: string;
    value: string;
    sub?: string;
  }[];
  narrative?: string;
  theme?: Theme;
};

export type Block =
  | ProseBlock
  | LabelledSectionBlock
  | ImageBlock
  | SideBySideBlock
  | VideoBlock
  | QuoteBlock
  | GalleryBlock
  | BeforeAfterBlock
  | StickyProcessBlock
  | ResultsBlock;

export interface CaseStudyMeta {
  /** Single role label, e.g. "Lead Product Designer". */
  role: string;
  /** Team makeup, one item per row, e.g. "5 Engineers". */
  team: string[];
  /** What this person contributed, one item per row. */
  contribution: string[];
  /** Project duration, e.g. "26 Weeks". */
  timeline: string;
  /** Slug of the next case study to link to. If omitted, no NextProject section renders. */
  nextSlug?: string;
}

export interface CaseStudyHeroMedia {
  src: string;
  alt: string;
  /** Defaults to "16/9". */
  aspect?: Aspect;
  /** When provided, treated as <video>. */
  poster?: string;
  type?: "image" | "video";
}

export interface CaseStudy {
  /** Case-study frontmatter is the existing project frontmatter — composed, not extended. */
  frontmatter: ProjectFrontmatter;
  /** Hero media override. Falls back to frontmatter.cover when omitted. */
  heroMedia?: CaseStudyHeroMedia;
  /**
   * Optional editorial subtitle displayed in the hero's left column above the
   * summary. Defaults to frontmatter.title when omitted.
   */
  heroSubtitle?: string;
  /**
   * Optional huge display headline in the hero's right column. Defaults to
   * frontmatter.client when omitted.
   */
  heroDisplay?: string;
  /**
   * Background tone for the hero media card. Defaults to "teal".
   */
  heroCardTone?: "teal" | "navy" | "ink" | "paper";
  meta: CaseStudyMeta;
  blocks: Block[];
  /** Page-level theme. Defaults to "dark". */
  theme?: Theme;
}
