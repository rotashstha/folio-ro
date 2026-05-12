# Case-study design system

This page documents the tokens, components, and animation primitives used by the `/work/[slug]` case-study template. Homepage tokens live separately in `app/globals.css` under the first `@theme` block — case-study tokens are namespaced `--cs-*` so the two systems can evolve independently.

## Tokens

All case-study tokens are defined in `app/globals.css` inside the second `@theme` block. They surface as Tailwind utilities (`pt-cs-section`, `aspect-cs-hero`, `duration-cs-mask`).

| Token | Value | Use |
|---|---|---|
| `--cs-pad-section` | `clamp(4rem, 8vw, 9rem)` | Vertical padding on full sections (hero, process, results, next-project). |
| `--cs-pad-section-tight` | `clamp(2.5rem, 4vw, 4rem)` | Tighter vertical padding for body block stacks. |
| `--cs-gutter` | `clamp(1.25rem, 4vw, 3rem)` | Horizontal page gutter inside `.cs-container`. |
| `--cs-content-max` | `1280px` | Max content width. |
| `--cs-prose-max` | `68ch` | Reading width for prose blocks. |
| `--cs-aspect-hero` | `16 / 9` | Default hero media aspect. |
| `--cs-aspect-hero-tall` | `4 / 5` | Tall hero variant. |
| `--cs-aspect-side` | `4 / 5` | Default side-by-side pane aspect. |
| `--cs-ease-mask` | `cubic-bezier(0.65, 0.05, 0, 1)` | Mask reveals (sharp at start, slow at end). |
| `--cs-ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Body fades and softer reveals. |
| `--cs-dur-mask` | `0.9s` | Mask reveal duration. |
| `--cs-dur-fade` | `0.6s` | Fade-and-slide reveal duration. |
| `--cs-dur-pin` | `1.2s` | Pinned step transition duration. |
| `--cs-text-eyebrow` | `0.75rem` | Eyebrow type size. |
| `--cs-tracking-eyebrow` | `0.18em` | Eyebrow letter-spacing. |
| `--cs-text-caption` | `0.8125rem` | Caption type size. |

**Token rule:** anything that appears more than twice across case-study components moves into `--cs-*`. Per-project accent colours (neon, magenta, orange, purple) stay on the existing `--color-accent-*` tokens — case studies *use* those, they don't redefine them.

## Theme handling

A case study declares its dominant theme via `frontmatter`-adjacent fields:

```ts
const study: CaseStudy = {
  theme: "light",            // "dark" | "light", default "dark"
  // ...
};
```

The page renderer wraps the article in `<article data-cs-root data-theme={theme}>`, which:

1. Sets the case-study background and text colour.
2. Is read by `useHeaderTheme.ts` (existing) so the global header inverts to match.

For a per-section override (e.g. a light Results panel on a dark page), pass `theme` to the relevant block, which renders `<section data-theme="…">`. No new context, no new hook.

## Component map

```
components/case-study/
├── CaseStudyChrome.tsx     ← layout shell + scroll-progress bar
├── Hero.tsx                ← editorial split: eyebrow+subtitle | huge display
├── Meta.tsx                ← 4-column Role / Team / Contribution / Timeline
├── BlockRenderer.tsx       ← switch(block.kind) dispatcher
├── NextProject.tsx         ← GSAP-driven exit transition
├── MediaScrub.tsx          ← shared ScrollTrigger scrub wrapper
└── blocks/
    ├── Prose.tsx
    ├── LabelledSection.tsx ← left-col label + right-col body (most body sections)
    ├── Image.tsx
    ├── SideBySide.tsx
    ├── Video.tsx
    ├── Quote.tsx
    ├── Gallery.tsx
    ├── BeforeAfter.tsx
    ├── StickyProcess.tsx   ← GSAP ScrollTrigger pin
    └── Results.tsx
```

## Animation boundaries

Reveal primitives in `components/ui/` (`MaskReveal`, `WordReveal`, `FadeReveal`, `LineReveal`) are reused across case-study components for entry reveals.

**GSAP imports are scoped to three files:**

- `components/case-study/MediaScrub.tsx` (parallax/scale-tied)
- `components/case-study/blocks/StickyProcess.tsx` (pinned narrative)
- `components/case-study/NextProject.tsx` (exit timeline)

Plus `lib/animation/gsap-bridge.ts` which holds the registration helper.

Do not import `gsap` or `ScrollTrigger` from any other file. If a future component needs scrub or pin behaviour, extend `MediaScrub` / `StickyProcess` rather than adding a new import site.

**Reduced motion:** every GSAP component bails before timeline creation when `useReducedMotion()` returns true. Pinned sections fall back to native CSS sticky + IO step changes; pages remain fully functional.

## Adding a new case study

1. **Create the content module** at `content/work/<slug>/index.ts`:

   ```ts
   import type { CaseStudy } from "@/types/case-study";
   import { placeholderProjects } from "@/lib/projects";

   const frontmatter = placeholderProjects.find((p) => p.slug === "<slug>")!;

   export const myCaseStudy: CaseStudy = {
     frontmatter,
     theme: "light",
     heroSubtitle: "One-line editorial subtitle",
     heroDisplay: "Big Display Headline",
     heroCardTone: "teal",
     meta: {
       role: "Lead Product Designer",
       team: ["3 Engineers", "1 PM"],
       contribution: ["Discovery", "Strategy", "End-to-end UI"],
       timeline: "12 Weeks",
       nextSlug: "next-slug",
     },
     blocks: [
       { kind: "labelledSection", label: "Overview", body: "..." },
       { kind: "image", src: "/images/...", alt: "...", aspect: "16/9", bleed: "contained" },
       // ...
     ],
   };
   ```

2. **Register it** in `lib/case-studies.ts`:

   ```ts
   import { myCaseStudy } from "@/content/work/<slug>";

   const caseStudyMap: Record<string, CaseStudy> = {
     "atlas-carbon": atlasCarbonCaseStudy,
     "<slug>": myCaseStudy,
   };
   ```

3. **Add the project** to `lib/projects.ts` if it isn't already in `placeholderProjects` — that file drives the homepage grid and `generateStaticParams()`.

4. **Drop assets** under `content/work/<slug>/` or `public/images/...` and reference them by their `/`-rooted public path.

5. **Visit `/work/<slug>`.** No build step required for content changes (Next dev hot-reloads the module).

## Block kinds

| Kind | Use |
|---|---|
| `prose` | Plain centred or left-aligned paragraph block. |
| `labelledSection` | Editorial label/heading on the left, body markdown on the right. The dominant body pattern. |
| `image` | Single image. `bleed: "full"` for edge-to-edge, `scrub: true` for scroll-tied scale. |
| `sideBySide` | Two media items in a 1:1, 2:3, or 3:2 ratio. |
| `video` | Lazy-loaded `<video>`; auto-pauses when offscreen. |
| `quote` | Display-typography pull quote with optional accent and attribution. |
| `gallery` | 2/3/4-column grid of media. |
| `beforeAfter` | Drag-handle slider, with toggle fallback for touch + reduced motion. |
| `stickyProcess` | Pinned narrative with GSAP ScrollTrigger; CSS-sticky fallback under reduced motion. |
| `results` | Outcome metric grid + optional narrative; supports per-section theme override. |

The schema is a discriminated union on `kind`, so `BlockRenderer` narrows each block to its exact prop shape with zero casts. Adding a new kind: extend `Block` in `types/case-study.ts`, add a component under `components/case-study/blocks/`, and add the `case` to `BlockRenderer.tsx`.

## MDX migration path (deferred)

The current authoring source is typed TypeScript. When MDX is needed:

1. Add an MDX loader (`@next/mdx` or `next-mdx-remote`).
2. Move frontmatter to MDX frontmatter and the `Block[]` array to a `<CaseStudyBlocks>` MDX component or a YAML block.
3. The renderer signature does not change — `BlockRenderer` still takes `Block[]`.

Because every block is a plain serialisable object, the migration is mechanical.

## Performance and accessibility

- All images use `next/image` with explicit `sizes` attributes.
- Videos have `preload="metadata"` and only play when intersecting.
- Fonts are loaded via `next/font` (no FOUT).
- Lenis honours `prefers-reduced-motion`; GSAP timelines bail under reduced motion.
- The `<NextProject>` exit timeline degrades to a normal `<Link>` under reduced motion.
- Block headings start at `<h2>` (one `<h1>` per page, in the hero).
