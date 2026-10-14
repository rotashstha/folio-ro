export type Accent = "neon" | "magenta" | "orange";
export type ProjectPalette = "teal" | "navy";

export interface DeviceMockup {
  src: string;
  alt: string;
}

export interface ProjectFrontmatter {
  title: string;
  label: string;
  slug: string;
  client: string;
  role: string;
  year: number;
  summary: string;
  cover: string;
  thumbnail: string;
  accent: Accent;
  palette: ProjectPalette;
  coverTone?: "light" | "dark";
  coverBg?: string;
  devices?: DeviceMockup[];
  tags: string[];
  tagTones?: Record<string, "light" | "dark">;
  status: "published" | "draft";
  order: number;
  footerLogo?: string;
  metrics?: { label: string; value: string }[];
  links?: { label: string; url: string }[];
  /**
   * Set when the case study lives on another site (e.g. a Pitch deck). Cards
   * and next-project links open such studies in a new tab, and the gate page
   * forwards to this URL once unlocked.
   */
  externalUrl?: string;
}

export interface Project extends ProjectFrontmatter {
  body: string;
}
