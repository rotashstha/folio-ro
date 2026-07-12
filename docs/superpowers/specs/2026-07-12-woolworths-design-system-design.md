# Woolworths Design System — Case Study Page

**Date:** 2026-07-12
**Branch:** `claude/woolworths-design-system`
**Slug:** `woolworths`

## Goal

Add a new bespoke case-study page for a Woolworths design system project. The page
adopts a light, airy, editorial layout (the genre used by minimal Framer portfolio
sites) and slots into the existing portfolio alongside Atlas, IAG, AWS, bp, and Carell.

## IP / originality note

The layout **structure, pacing, and light aesthetic** are drawn from a reference page
as a learning study. All **copy is original** (written here in a Woolworths voice), and
all **imagery is grey placeholders** at fixed dimensions for the user to replace with
real Woolworths assets. No third-party copy or screenshots are reproduced.

Placeholder system name: **"Orchard"** (editable — a fresh/grocery-flavoured working
name for the Woolworths design system; user renames later).

## Integration points

- **Route:** handled in `app/work/[slug]/page.tsx` — add `if (slug === "woolworths") return <Woolworths />;`
- **Component:** `components/case-study/projects/Woolworths.tsx` (bespoke, like the others)
- **Work card:** new entry in `lib/projects.ts` (`placeholderProjects`) so it appears in the homepage Work grid
- **Assets:** `public/images/work/woolworths/` — grey placeholder images at documented dimensions
- **Theme:** page is light-locked via `data-theme-fixed` so it does not flip with the site theme toggle
- **Animation:** reuse `EASING_SPRING` and existing scroll-reveal patterns from `lib/animation/constants.ts`

## Visual language

- **Background:** near-white (`#fafafa` / `#ffffff`), generous whitespace
- **Text:** near-black `#0a0a0a`, muted grey `#6b6b6b` for secondary/labels
- **Type:** existing portfolio fonts — Sofia Sans family already loaded; large editorial
  headings, small uppercase tracked labels for section eyebrows
- **Spacing:** wide vertical rhythm between sections (~120–200px), constrained content
  column with occasional full-bleed images
- **Accent:** a single restrained Woolworths-green accent for small highlights only

## Section structure (top → bottom)

Each section below lists: purpose, original placeholder copy, layout, and interaction.

### 1. Hero
- **Copy:** H1 "Orchard Design System" + full-bleed hero placeholder image
- **Layout:** centered/left title, then edge-to-edge hero image below
- **Interaction:** fade + subtle translate-up on load (EASING_SPRING)

### 2. Brief + meta row
- **Eyebrow:** "(brief)"
- **Copy (original):** "Orchard is the shared foundation Woolworths teams build on —
  a library of accessible, consistent, and production-ready components that lets
  designers and engineers ship trusted retail experiences faster, together."
- **Meta row:** Company — Woolworths · Tools — Figma · Role — Designer · Year — 2024
- **Interaction:** scroll fade-up

### 3. My role
- **Eyebrow:** "(my role)"
- **Copy (original):** one paragraph describing responsibilities — foundations,
  components, tokens, guidelines, and cross-team accessibility partnership. Sized to
  ~4 lines to match the reference rhythm.
- **Layout:** paragraph, then two side-by-side placeholder images
- **Interaction:** scroll fade-up

### 4. Behind the scenes — pillars
- **Heading:** "Behind the scenes…"
- **List (original pillar labels):** Component library · Guidelines & documentation ·
  Accessibility · Contribution model · Team collaboration
- **Interaction:** staggered reveal of each pillar line

### 5. Figma libraries + stat counters
- **Heading (original):** "Two libraries, one system — web & mobile"
- **Copy:** short paragraph on splitting web (React) and mobile (iOS/Android) libraries
- **Stats (placeholder numbers, count-up on scroll):**
  - `120` — Teams using the libraries
  - `4` — Coding languages supported
  - `90` — Components available
- **Interaction:** numbers count up when scrolled into view

### 6. Guidelines — doc marquee
- **Heading (original):** "Documentation that scales the system"
- **Copy:** short paragraph on why docs matter for a growing DS
- **Layout:** infinite horizontal marquee/ticker row of grey doc-screenshot placeholders
- **Interaction:** continuous CSS marquee (reuse MarqueeStrip mechanics or a scoped variant)

### 7. Inclusive & accessible
- **Heading:** "Inclusive and accessible"
- **Sub-elements (labels only, static or lightly interactive):** Colour contrast
  (WCAG AA: Pass) · Keyboard controls · Focus state · Screen reader · Annotation kit
- **Copy:** two short original paragraphs on the accessibility partnership and how
  a11y criteria are embedded per component
- **Interaction:** reveal on scroll; the sub-element chips can have simple hover states

### 8. Contribution & inner-source
- **Heading (original):** "Scaling through contribution"
- **Layout:** "Collaboration flow" placeholder image + "Component checklist" placeholder image
- **Copy:** two short original paragraphs on the contribution model and governance
- **Interaction:** reveal on scroll

### 9. Community & collaboration
- **Heading:** "It's all about community and collaboration"
- **List (original, marquee-repeated):** Weekly open office hours · Weekly design sync ·
  Monthly demo · Design-system onboarding · Slack support channel
- **Copy:** short original paragraph on rituals and cross-team support
- **Interaction:** marquee repeat of the ritual chips + reveal

### 10. System map
- **Layout:** three-tier diagram — "Orchard Design System" → "Shared tools & services"
  → "Client-facing platforms" — with a list of surfaces (e.g. Rewards app, Online store,
  Store ops, Checkout, Help centre) as placeholder labels
- **Interaction:** reveal on scroll

### 11. Key projects
- **Heading:** "Key projects"
- **(1) (original):** "Design tokens for effortless theming" — short paragraph on
  Figma variables enabling theme switching across Woolworths brands
- **(2) (original):** "A new library for the web revamp" — short paragraph on building
  a fresh component/token library for a platform revamp
- **Layout:** numbered eyebrows + image grid of placeholders
- **Interaction:** staggered reveal

### 12. Let's connect / footer
- **Copy:** "Have a new project or just want to say hi? Feel free to reach out." + link
- **Reuse:** existing footer / NextProjectReveal pattern where it fits

## Work card entry (`lib/projects.ts`)

```ts
{
  title: "A shared foundation for Woolworths teams",   // impact-first, editable
  label: "Woolworths | A shared foundation for Woolworths teams",
  slug: "woolworths",
  client: "Woolworths",
  role: "Senior Product Designer",
  year: 2024,
  summary: "Built Orchard — a light, accessible design system unifying web and mobile across Woolworths retail products.",
  cover: "/images/work/woolworths/cover.png",       // placeholder
  thumbnail: "/images/work/woolworths/cover.png",
  accent: "neon",                                    // green-leaning; confirm
  palette: "teal",
  coverTone: "light",
  tags: ["Retail", "Design System", "Accessibility", "Figma"],
  status: "published",
  order: 6,
}
```

## Placeholder image manifest (`public/images/work/woolworths/`)

| File | Dimensions | Section |
|------|-----------|---------|
| `cover.png` | 1600×1000 | Work card + hero |
| `hero.png` | 2000×1000 | Hero full-bleed |
| `role-1.png`, `role-2.png` | 800×600 each | My role |
| `guideline-1..5.png` | 600×400 each | Guidelines marquee |
| `collab-flow.png` | 1600×900 | Contribution |
| `checklist.png` | 800×1000 | Contribution |
| `project-1..6.png` | 800×600 each | Key projects |

Grey placeholders (e.g. `#e5e5e5` fill with centered dimension label) generated as
lightweight SVG/PNG so layout renders correctly before real assets arrive.

## Out of scope

- Real Woolworths copy and screenshots (user supplies later)
- Final system name (Orchard is a placeholder)
- Any reuse of the reference site's copy or imagery

## Success criteria

- Page renders at `/work/woolworths` in the light editorial style
- All 12 sections present in order with scroll reveals, stat count-up, and marquee working
- Responsive at mobile / tablet / desktop breakpoints
- Appears as a card in the homepage Work grid
- Copy is original and clearly editable; images are placeholders at documented sizes
