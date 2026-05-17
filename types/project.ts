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
  devices?: DeviceMockup[];
  tags: string[];
  status: "published" | "draft";
  order: number;
  footerLogo?: string;
  metrics?: { label: string; value: string }[];
  links?: { label: string; url: string }[];
}

export interface Project extends ProjectFrontmatter {
  body: string;
}
