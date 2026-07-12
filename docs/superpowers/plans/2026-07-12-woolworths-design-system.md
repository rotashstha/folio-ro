# Woolworths Design System Case Study — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a bespoke, light-themed Woolworths ("Orchard") design-system case-study page at `/work/woolworths`, matching the 12-section structure in the spec.

**Architecture:** One bespoke server component (`Woolworths.tsx`) following the same page system as `Carell.tsx`, plus two small client sub-components for the count-up stats row and the image marquee. Route is wired by slug in `app/work/[slug]/page.tsx`; a Work-card entry in `lib/projects.ts` surfaces it on the homepage. Page is light-locked via `data-theme="light"` on the `[data-cs-root]` article.

**Tech Stack:** Next.js 15 App Router, TypeScript strict, Tailwind, existing reveal primitives (`FadeReveal`, `MaskReveal`), `StatCounter`, `next/image`.

## Global Constraints

- Next.js 15, App Router, Server Components by default; `"use client"` only for the stats row and marquee.
- Tailwind only — no inline styles except animation/aspect-ratio values (matches existing case studies).
- **All copy is original** (written in this plan). Do NOT copy the reference site's wording or images.
- Placeholder system name is **"Orchard"** — editable.
- Images are grey placeholders under `public/images/work/woolworths/`, referenced by string path with explicit `width`/`height`.
- Page is **light** (`data-theme="light"`) and does not flip with the site toggle.
- Slug is `woolworths`. Work-card `order: 6`.
- Verification per task = typecheck (`pnpm exec tsc --noEmit`) passes + preview at `http://localhost:3001/work/woolworths` renders without console errors. There is no component unit-test harness in this repo; the browser preview is the test cycle.
- Commit after each task.

---

## File Structure

- Create: `components/case-study/projects/Woolworths.tsx` — main page, all presentational sections
- Create: `components/case-study/projects/woolworths/StatsRow.tsx` — `"use client"` count-up stats
- Create: `components/case-study/projects/woolworths/DocMarquee.tsx` — `"use client"` infinite image marquee
- Create: `public/images/work/woolworths/*.svg` — grey placeholders (manifest below)
- Modify: `app/work/[slug]/page.tsx` — import + `if (slug === "woolworths") return <Woolworths />;`
- Modify: `lib/projects.ts` — append Woolworths `ProjectFrontmatter` entry

Placeholder manifest (all `#e5e5e5` fill, centered dimension label, `viewBox` matches):

| File | w×h | Section |
|------|-----|---------|
| `cover.svg` | 1600×1000 | Work card + hero |
| `hero.svg` | 2000×1000 | Hero full-bleed |
| `role-1.svg`, `role-2.svg` | 800×600 | My role |
| `guideline-1.svg`…`guideline-5.svg` | 600×400 | Guidelines marquee |
| `collab-flow.svg` | 1600×900 | Contribution |
| `checklist.svg` | 800×1000 | Contribution |
| `project-1.svg`…`project-6.svg` | 800×600 | Key projects |

---

### Task 1: Placeholder image assets

**Files:**
- Create: `public/images/work/woolworths/gen-placeholders.mjs` (throwaway generator, deleted after run)
- Create: `public/images/work/woolworths/*.svg`

- [ ] **Step 1: Write the generator script**

```js
// public/images/work/woolworths/gen-placeholders.mjs
import { writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const specs = [
  ["cover", 1600, 1000], ["hero", 2000, 1000],
  ["role-1", 800, 600], ["role-2", 800, 600],
  ["guideline-1", 600, 400], ["guideline-2", 600, 400], ["guideline-3", 600, 400],
  ["guideline-4", 600, 400], ["guideline-5", 600, 400],
  ["collab-flow", 1600, 900], ["checklist", 800, 1000],
  ["project-1", 800, 600], ["project-2", 800, 600], ["project-3", 800, 600],
  ["project-4", 800, 600], ["project-5", 800, 600], ["project-6", 800, 600],
];

for (const [name, w, h] of specs) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><rect width="${w}" height="${h}" fill="#e5e5e5"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="${Math.round(w/24)}" fill="#9a9a9a">${w}×${h}</text></svg>`;
  writeFileSync(`${dir}/${name}.svg`, svg);
}
console.log(`Generated ${specs.length} placeholders`);
```

- [ ] **Step 2: Run the generator**

Run: `node "public/images/work/woolworths/gen-placeholders.mjs"`
Expected: `Generated 17 placeholders`

- [ ] **Step 3: Verify files exist and delete the generator**

Run: `ls public/images/work/woolworths/ | wc -l` → expect `17` (after removing the script)
Then: `rm "public/images/work/woolworths/gen-placeholders.mjs"`

- [ ] **Step 4: Commit**

```bash
git add public/images/work/woolworths
git commit -m "Add grey placeholder assets for Woolworths case study"
```

---

### Task 2: Route wiring, Work card, and page stub

**Interfaces:**
- Produces: `export function Woolworths()` (server component) consumed by `app/work/[slug]/page.tsx`.

**Files:**
- Create: `components/case-study/projects/Woolworths.tsx`
- Modify: `app/work/[slug]/page.tsx`
- Modify: `lib/projects.ts`

- [ ] **Step 1: Create the page stub** (hero title only, light theme, so the route resolves)

```tsx
// components/case-study/projects/Woolworths.tsx
import Image from "next/image";
import Link from "next/link";
import { FadeReveal } from "@/components/ui/FadeReveal";
import { MaskReveal } from "@/components/ui/MaskReveal";
import { TagPills } from "@/components/ui/TagPills";
import { placeholderProjects } from "@/lib/projects";

const IMG = "/images/work/woolworths";
const project = placeholderProjects.find((p) => p.slug === "woolworths");
const tags = project?.tags ?? [];

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-6 md:px-10 ${className}`}>{children}</div>;
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="font-body text-[13px] font-bold uppercase tracking-[0.14em] text-black/40">{children}</p>;
}

function Heading({ children }: { children: React.ReactNode }) {
  return <h2 className="font-body text-[28px] font-bold leading-tight text-black md:text-[40px]">{children}</h2>;
}

function Body({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`font-body text-[16px] leading-[1.6] text-black/60 md:text-[18px] ${className}`}>{children}</div>;
}

export function Woolworths() {
  return (
    <article data-cs-root data-theme="light" className="font-body relative isolate overflow-x-clip antialiased">
      <div className="cs-container pt-32 md:pt-40">
        <Link href="/#work" data-cursor-trigger="Back" className="font-sans inline-flex items-center text-sm uppercase tracking-widest opacity-60 transition-colors hover:opacity-100">
          ← Back to work
        </Link>
      </div>

      <section data-section="hero" className="pt-[64px] md:pt-[88px]">
        <Container>
          <FadeReveal y={16}>
            <h1 className="font-body text-[48px] font-bold leading-[1.02] tracking-[-0.02em] text-black md:text-[88px]">Orchard Design System</h1>
          </FadeReveal>
          <TagPills tags={tags} className="mt-6" />
        </Container>
        <Container className="mt-[48px] md:mt-[72px]">
          <FadeReveal y={32} delay={0.1}>
            <MaskReveal duration={1.1} delay={0.1}>
              <Image src={`${IMG}/hero.svg`} alt="Orchard design system hero" width={2000} height={1000} priority className="w-full rounded-[24px]" />
            </MaskReveal>
          </FadeReveal>
        </Container>
      </section>
    </article>
  );
}
```

- [ ] **Step 2: Wire the route** — in `app/work/[slug]/page.tsx`, add the import after the `Carell` import (line 14) and the branch after the `carell` branch (line 61):

```tsx
import { Woolworths } from "@/components/case-study/projects/Woolworths";
```
```tsx
  if (slug === "woolworths") {
    return <Woolworths />;
  }
```

- [ ] **Step 3: Add the Work-card entry** — append to `placeholderProjects` in `lib/projects.ts` before the closing `];`:

```ts
  {
    title: "A shared foundation for Woolworths teams",
    label: "Woolworths | A shared foundation for Woolworths teams",
    slug: "woolworths",
    client: "Woolworths",
    role: "Senior Product Designer",
    year: 2024,
    summary:
      "Built Orchard — a light, accessible design system unifying web and mobile across Woolworths retail products.",
    cover: "/images/work/woolworths/cover.svg",
    thumbnail: "/images/work/woolworths/cover.svg",
    accent: "neon",
    palette: "teal",
    coverTone: "light",
    tags: ["Retail", "Design System", "Accessibility", "Figma"],
    status: "published",
    order: 6,
  },
```

- [ ] **Step 4: Verify** — Run `pnpm exec tsc --noEmit` (expect no errors). Load `http://localhost:3001/work/woolworths` via preview; expect a white page with "Orchard Design System" heading + hero placeholder, no console errors. Also confirm a new card appears at `http://localhost:3001/#work`.

- [ ] **Step 5: Commit**

```bash
git add components/case-study/projects/Woolworths.tsx app/work/[slug]/page.tsx lib/projects.ts
git commit -m "Wire Woolworths case study route, Work card, and hero stub"
```

---

### Task 3: Brief + meta row, and My role sections

**Files:** Modify: `components/case-study/projects/Woolworths.tsx`

- [ ] **Step 1: Add the Brief + meta section** after the hero `</section>`. Use original copy exactly as below:

```tsx
      {/* BRIEF + META */}
      <section className="pt-[120px] md:pt-[160px]">
        <Container>
          <FadeReveal y={20}>
            <Eyebrow>(brief)</Eyebrow>
            <Body className="mt-6 max-w-[820px] text-[22px] md:text-[30px] !leading-[1.4] !text-black/80">
              <p>Orchard is the shared foundation Woolworths teams build on — a library of accessible, consistent, production-ready components that lets designers and engineers ship trusted retail experiences faster, together.</p>
            </Body>
          </FadeReveal>
          <FadeReveal y={20} delay={0.06}>
            <div className="mt-[64px] grid grid-cols-2 gap-y-10 md:grid-cols-4">
              {[["Company","Woolworths"],["Tools","Figma"],["Role","Designer"],["Year","2024"]].map(([k,v]) => (
                <div key={k}>
                  <p className="font-body text-[13px] font-bold uppercase tracking-[0.14em] text-black/40">{k}</p>
                  <p className="font-body mt-3 text-[18px] font-bold text-black md:text-[20px]">{v}</p>
                </div>
              ))}
            </div>
          </FadeReveal>
        </Container>
      </section>
```

- [ ] **Step 2: Add the My role section**:

```tsx
      {/* MY ROLE */}
      <section className="pt-[120px] md:pt-[160px]">
        <Container>
          <FadeReveal y={20}>
            <Eyebrow>(my role)</Eyebrow>
            <Body className="mt-6 max-w-[820px]">
              <p>As senior product designer, I shaped and maintained Orchard across web and mobile. My work spanned design foundations and tokens, component build and governance, and the written guidelines that keep teams consistent. I partnered closely with our accessibility group to document inclusive patterns so every product ships an equivalent experience for all customers.</p>
            </Body>
          </FadeReveal>
        </Container>
        <Container className="mt-[56px] md:mt-[80px]">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {["role-1","role-2"].map((n, i) => (
              <FadeReveal key={n} y={32} delay={0.05 * (i + 1)}>
                <MaskReveal duration={1} delay={0.05}>
                  <Image src={`${IMG}/${n}.svg`} alt={`Orchard role image ${i + 1}`} width={800} height={600} className="w-full rounded-[24px]" />
                </MaskReveal>
              </FadeReveal>
            ))}
          </div>
        </Container>
      </section>
```

- [ ] **Step 3: Verify** — `pnpm exec tsc --noEmit` passes; preview shows brief, meta row (4 columns), role paragraph + two side-by-side placeholders; no console errors.

- [ ] **Step 4: Commit**

```bash
git add components/case-study/projects/Woolworths.tsx
git commit -m "Add Woolworths brief, meta row, and my-role sections"
```

---

### Task 4: Pillars ("Behind the scenes")

**Files:** Modify: `components/case-study/projects/Woolworths.tsx`

- [ ] **Step 1: Add the pillars section**:

```tsx
      {/* BEHIND THE SCENES — PILLARS */}
      <section className="pt-[120px] md:pt-[160px]">
        <Container>
          <FadeReveal y={20}><Heading>Behind the scenes…</Heading></FadeReveal>
          <div className="mt-[48px] border-t border-black/10">
            {["Component library","Guidelines & documentation","Accessibility","Contribution model","Team collaboration"].map((label, i) => (
              <FadeReveal key={label} y={16} delay={0.04 * i}>
                <div className="flex items-baseline gap-6 border-b border-black/10 py-6">
                  <span className="font-body text-[14px] font-bold text-black/30">——</span>
                  <span className="font-body text-[22px] font-normal text-black md:text-[28px]">{label}</span>
                </div>
              </FadeReveal>
            ))}
          </div>
        </Container>
      </section>
```

- [ ] **Step 2: Verify** — typecheck passes; preview shows five pillar rows with staggered reveal; no console errors.

- [ ] **Step 3: Commit**

```bash
git add components/case-study/projects/Woolworths.tsx
git commit -m "Add Woolworths pillars section"
```

---

### Task 5: Figma libraries + count-up stats row

**Interfaces:**
- Produces: `export function WoolworthsStatsRow()` (client) consumed by `Woolworths.tsx`.
- Consumes: `StatCounter` from `@/components/ui/StatCounter` (`{ value: number; suffix?: string; className?: string }`).

**Files:**
- Create: `components/case-study/projects/woolworths/StatsRow.tsx`
- Modify: `components/case-study/projects/Woolworths.tsx`

- [ ] **Step 1: Create the stats row client component**:

```tsx
// components/case-study/projects/woolworths/StatsRow.tsx
"use client";

import { StatCounter } from "@/components/ui/StatCounter";

const STATS: { value: number; suffix?: string; caption: string }[] = [
  { value: 120, caption: "Teams using the libraries" },
  { value: 4, caption: "Coding languages supported" },
  { value: 90, caption: "Components available to use" },
];

export function WoolworthsStatsRow() {
  return (
    <div className="grid grid-cols-1 gap-10 border-t border-black/10 pt-12 sm:grid-cols-3">
      {STATS.map((s) => (
        <div key={s.caption}>
          <StatCounter value={s.value} suffix={s.suffix} className="font-body text-[64px] font-bold leading-none tracking-[-0.02em] text-black md:text-[88px]" />
          <p className="font-body mt-4 text-[15px] leading-[1.5] text-black/55 md:text-[16px]">{s.caption}</p>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Add the libraries section** to `Woolworths.tsx` (add `import { WoolworthsStatsRow } from "./woolworths/StatsRow";` at top):

```tsx
      {/* FIGMA LIBRARIES + STATS */}
      <section className="pt-[120px] md:pt-[160px]">
        <Container>
          <FadeReveal y={20}><Heading>Two libraries, one system — web &amp; mobile</Heading></FadeReveal>
          <FadeReveal y={20} delay={0.06}>
            <Body className="mt-6 max-w-[820px]">
              <p>We ship separate libraries for web (React) and mobile (iOS &amp; Android) so each stays lean and focused on how its designers actually work. Parity between design and code is the goal: Orchard supports the languages Woolworths builds in, keeping one system honest across every surface.</p>
            </Body>
          </FadeReveal>
          <FadeReveal y={24} delay={0.1}>
            <div className="mt-[56px]"><WoolworthsStatsRow /></div>
          </FadeReveal>
        </Container>
      </section>
```

- [ ] **Step 3: Verify** — typecheck passes; scroll to the section in preview and confirm the three numbers count up from 0 (120 / 4 / 90) on entry; no console errors.

- [ ] **Step 4: Commit**

```bash
git add components/case-study/projects/woolworths/StatsRow.tsx components/case-study/projects/Woolworths.tsx
git commit -m "Add Woolworths libraries section with count-up stats"
```

---

### Task 6: Guidelines — infinite image marquee

**Interfaces:**
- Produces: `export function DocMarquee()` (client) consumed by `Woolworths.tsx`.
- Reuses the `marquee-scroll` keyframe already defined in `app/globals.css` (used by `MarqueeStrip`).

**Files:**
- Create: `components/case-study/projects/woolworths/DocMarquee.tsx`
- Modify: `components/case-study/projects/Woolworths.tsx`

- [ ] **Step 1: Create the marquee client component** (duplicates the image set twice for a seamless loop, matching `MarqueeStrip`'s technique):

```tsx
// components/case-study/projects/woolworths/DocMarquee.tsx
"use client";

import Image from "next/image";

const DOCS = ["guideline-1","guideline-2","guideline-3","guideline-4","guideline-5"];
const IMG = "/images/work/woolworths";

export function DocMarquee({ duration = 60 }: { duration?: number }) {
  const row = DOCS.map((n) => (
    <div key={n} className="relative aspect-[3/2] w-[360px] shrink-0 overflow-hidden rounded-[16px] md:w-[440px]">
      <Image src={`${IMG}/${n}.svg`} alt="Orchard documentation page" fill sizes="440px" className="object-cover" />
    </div>
  ));
  return (
    <div className="relative overflow-hidden" aria-label="Documentation gallery">
      <div className="flex w-max items-center gap-6" style={{ animation: `marquee-scroll ${duration}s linear infinite`, willChange: "transform" }}>
        {row}{row}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Add the guidelines section** (add `import { DocMarquee } from "./woolworths/DocMarquee";`):

```tsx
      {/* GUIDELINES — DOC MARQUEE */}
      <section className="pt-[120px] md:pt-[160px]">
        <Container>
          <FadeReveal y={20}><Heading>Documentation that scales the system</Heading></FadeReveal>
          <FadeReveal y={20} delay={0.06}>
            <Body className="mt-6 max-w-[820px]">
              <p>Thousands of people touch Orchard every week — journey designers, engineers, and PMs. Clear how-to guidance is what turns a component library into a system: accessibility notes, patterns, behaviours, usage, and voice, all in one place.</p>
            </Body>
          </FadeReveal>
        </Container>
        <FadeReveal y={24} delay={0.1}>
          <div className="mt-[56px]"><DocMarquee /></div>
        </FadeReveal>
      </section>
```

- [ ] **Step 3: Verify** — typecheck passes; preview shows a continuously scrolling row of five doc placeholders looping seamlessly; no console errors.

- [ ] **Step 4: Commit**

```bash
git add components/case-study/projects/woolworths/DocMarquee.tsx components/case-study/projects/Woolworths.tsx
git commit -m "Add Woolworths guidelines doc marquee"
```

---

### Task 7: Inclusive & accessible

**Files:** Modify: `components/case-study/projects/Woolworths.tsx`

- [ ] **Step 1: Add the accessibility section** with static chips and two original paragraphs:

```tsx
      {/* INCLUSIVE & ACCESSIBLE */}
      <section className="pt-[120px] md:pt-[160px]">
        <Container>
          <FadeReveal y={20}><Heading>Inclusive and accessible</Heading></FadeReveal>
          <FadeReveal y={20} delay={0.05}>
            <div className="mt-[40px] flex flex-wrap gap-3">
              {["Colour contrast · WCAG AA","Keyboard controls","Focus state","Screen reader","Annotation kit"].map((chip) => (
                <span key={chip} className="rounded-full border border-black/12 bg-black/[0.03] px-5 py-2.5 font-body text-[14px] font-medium text-black/70 transition-colors hover:border-black/25 hover:text-black">{chip}</span>
              ))}
            </div>
          </FadeReveal>
          <FadeReveal y={20} delay={0.1}>
            <Body className="mt-[48px] max-w-[820px]">
              <p className="mb-4">Orchard has to meet a high accessibility bar so every Woolworths customer can use the products built on it. We work alongside a dedicated accessibility partner through the whole creation process, not just at review.</p>
              <p>Accessibility spans contrast ratios, keyboard control, screen-reader support, focus states, and annotated documentation. Orchard bakes these criteria into each component's Figma docs, raising awareness and making the accessible choice the default one.</p>
            </Body>
          </FadeReveal>
        </Container>
      </section>
```

- [ ] **Step 2: Verify** — typecheck passes; preview shows chips (with hover state) + two paragraphs; no console errors.

- [ ] **Step 3: Commit**

```bash
git add components/case-study/projects/Woolworths.tsx
git commit -m "Add Woolworths accessibility section"
```

---

### Task 8: Contribution & inner-source

**Files:** Modify: `components/case-study/projects/Woolworths.tsx`

- [ ] **Step 1: Add the contribution section** (flow image + checklist image + two paragraphs):

```tsx
      {/* CONTRIBUTION & INNER-SOURCE */}
      <section className="pt-[120px] md:pt-[160px]">
        <Container>
          <FadeReveal y={20}><Heading>Scaling through contribution</Heading></FadeReveal>
          <FadeReveal y={20} delay={0.06}>
            <Body className="mt-6 max-w-[820px]">
              <p className="mb-4">A small system team can't outpace a whole bank of product work. So Orchard grows through contribution: we promote inner-source across design and engineering, closing the gap between what exists and the patterns teams still need.</p>
              <p>Contribution is a core measure of our success. Rather than a walled-off team, we act as an extension of every product team — governing quality and system thinking while a clear flow and checklist make contributing easy.</p>
            </Body>
          </FadeReveal>
        </Container>
        <Container className="mt-[56px] md:mt-[80px]">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <FadeReveal y={32} className="md:col-span-2">
              <MaskReveal duration={1}>
                <Image src={`${IMG}/collab-flow.svg`} alt="Orchard collaboration flow" width={1600} height={900} className="w-full rounded-[24px]" />
              </MaskReveal>
            </FadeReveal>
            <FadeReveal y={32} delay={0.08}>
              <MaskReveal duration={1} delay={0.05}>
                <Image src={`${IMG}/checklist.svg`} alt="Orchard component checklist" width={800} height={1000} className="w-full rounded-[24px]" />
              </MaskReveal>
            </FadeReveal>
          </div>
        </Container>
      </section>
```

- [ ] **Step 2: Verify** — typecheck passes; preview shows a 2/3 + 1/3 image pair below the paragraphs; no console errors.

- [ ] **Step 3: Commit**

```bash
git add components/case-study/projects/Woolworths.tsx
git commit -m "Add Woolworths contribution section"
```

---

### Task 9: Community & collaboration (ritual marquee)

**Files:** Modify: `components/case-study/projects/Woolworths.tsx`

- [ ] **Step 1: Add the community section** using the shared `MarqueeStrip` for the ritual ticker (add `import { MarqueeStrip } from "@/components/ui/MarqueeStrip";` if not present). Rituals joined into one marquee string:

```tsx
      {/* COMMUNITY & COLLABORATION */}
      <section className="pt-[120px] md:pt-[160px]">
        <Container>
          <FadeReveal y={20}><Heading>It&apos;s all about community and collaboration</Heading></FadeReveal>
          <FadeReveal y={20} delay={0.06}>
            <Body className="mt-6 max-w-[820px]">
              <p>Internally we sync weekly so everyone knows what's in flight and can jam on solutions together. With product teams we run a dedicated Slack channel for quick cross-functional support, plus open office hours designers can book into — the fastest ways to reach us and coordinate work across the bank.</p>
            </Body>
          </FadeReveal>
        </Container>
        <FadeReveal y={20} delay={0.1}>
          <div className="mt-[48px]">
            <MarqueeStrip text="Weekly open office hours · Weekly design sync · Monthly demo · Design-system onboarding · Slack support channel" separator="✦" duration={90} className="!bg-transparent !py-6" />
          </div>
        </FadeReveal>
      </section>
```

Note: `MarqueeStrip` renders large uppercase text on `bg-paper`. The `!bg-transparent` override keeps it on the light page. If the font size (150px) is too large here, reduce by wrapping in a `text-[32px]`-scoped container is NOT possible (size is internal) — if it reads too big during verification, replace this with a scoped inline marquee mirroring `DocMarquee`'s technique but with text chips. Decide during Step 2.

- [ ] **Step 2: Verify** — typecheck passes; preview shows the ritual ticker scrolling. If the 150px type overwhelms the section, swap to a scoped text marquee (chips at `text-[20px]`) using the same `marquee-scroll` animation pattern as `DocMarquee`, then re-verify.

- [ ] **Step 3: Commit**

```bash
git add components/case-study/projects/Woolworths.tsx
git commit -m "Add Woolworths community section"
```

---

### Task 10: System map

**Files:** Modify: `components/case-study/projects/Woolworths.tsx`

- [ ] **Step 1: Add the system-map section** (three tiers + surface labels):

```tsx
      {/* SYSTEM MAP */}
      <section className="pt-[120px] md:pt-[160px]">
        <Container>
          <FadeReveal y={20}>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {[
                ["Orchard Design System","The single source of foundations, tokens, and components."],
                ["Shared tools & services","Reused across product teams — auth, payments, content."],
                ["Client-facing platforms","Where customers meet the work, powered by the system."],
              ].map(([t, d], i) => (
                <FadeReveal key={t} y={20} delay={0.05 * i}>
                  <div className="rounded-[20px] border border-black/10 p-7">
                    <p className="font-body text-[20px] font-bold text-black md:text-[24px]">{t}</p>
                    <p className="font-body mt-3 text-[15px] leading-[1.5] text-black/55">{d}</p>
                  </div>
                </FadeReveal>
              ))}
            </div>
          </FadeReveal>
          <FadeReveal y={20} delay={0.12}>
            <div className="mt-[40px] flex flex-wrap gap-3">
              {["Rewards app","Online store","Store ops","Checkout","Help centre","Everyday Market","Profile & settings"].map((s) => (
                <span key={s} className="rounded-full bg-black/[0.04] px-5 py-2.5 font-body text-[14px] text-black/70">{s}</span>
              ))}
            </div>
          </FadeReveal>
        </Container>
      </section>
```

- [ ] **Step 2: Verify** — typecheck passes; preview shows three tier cards + surface chips; no console errors.

- [ ] **Step 3: Commit**

```bash
git add components/case-study/projects/Woolworths.tsx
git commit -m "Add Woolworths system-map section"
```

---

### Task 11: Key projects

**Files:** Modify: `components/case-study/projects/Woolworths.tsx`

- [ ] **Step 1: Add the key-projects section** (numbered entries + image grid):

```tsx
      {/* KEY PROJECTS */}
      <section className="pt-[120px] md:pt-[160px]">
        <Container>
          <FadeReveal y={20}><Heading>Key projects</Heading></FadeReveal>
          <div className="mt-[56px] space-y-[80px]">
            <FadeReveal y={20}>
              <Eyebrow>(1)</Eyebrow>
              <h3 className="font-body mt-4 max-w-[720px] text-[24px] font-bold text-black md:text-[32px]">Design tokens for effortless theming</h3>
              <Body className="mt-5 max-w-[820px]">
                <p>With Figma variables, tokens finally live natively in design. Orchard was the ideal place to adopt them — Woolworths spans several brands and themes, so a robust token structure lets us switch themes effortlessly and speeds component work across the board.</p>
              </Body>
            </FadeReveal>
            <FadeReveal y={20} delay={0.05}>
              <Eyebrow>(2)</Eyebrow>
              <h3 className="font-body mt-4 max-w-[720px] text-[24px] font-bold text-black md:text-[32px]">A new library for the web revamp</h3>
              <Body className="mt-5 max-w-[820px]">
                <p>As we began revamping the retail web platform, I led a fresh library to hold the new standards on the latest framework — building foundation, components, and tokens from the ground up, and restructuring the Figma files so designers can move cleanly between the core and new libraries.</p>
              </Body>
            </FadeReveal>
          </div>
        </Container>
        <Container className="mt-[64px]">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
            {["project-1","project-2","project-3","project-4","project-5","project-6"].map((n, i) => (
              <FadeReveal key={n} y={28} delay={0.04 * i}>
                <MaskReveal duration={0.9} delay={0.03}>
                  <Image src={`${IMG}/${n}.svg`} alt={`Orchard project image ${i + 1}`} width={800} height={600} className="w-full rounded-[16px]" />
                </MaskReveal>
              </FadeReveal>
            ))}
          </div>
        </Container>
      </section>
```

- [ ] **Step 2: Verify** — typecheck passes; preview shows two numbered write-ups + a 3-col image grid; no console errors.

- [ ] **Step 3: Commit**

```bash
git add components/case-study/projects/Woolworths.tsx
git commit -m "Add Woolworths key-projects section"
```

---

### Task 12: Footer / connect + responsive & final pass

**Files:** Modify: `components/case-study/projects/Woolworths.tsx`

- [ ] **Step 1: Add the connect footer** before the closing `</article>`:

```tsx
      {/* LET'S CONNECT */}
      <section className="pt-[120px] pb-[160px] md:pt-[160px]">
        <Container>
          <FadeReveal y={20}>
            <Heading>Let&apos;s connect</Heading>
            <Body className="mt-6 max-w-[620px]">
              <p>Have a new project or just want to say hi?{" "}
                <Link href="/#contact" className="font-medium text-black underline underline-offset-4 transition-opacity hover:opacity-70">Feel free to reach out.</Link>
              </p>
            </Body>
          </FadeReveal>
        </Container>
      </section>
```

- [ ] **Step 2: Responsive verification** — in preview, resize to mobile (375), tablet (768), desktop (1280). Confirm: hero heading scales, meta row collapses to 2 columns on mobile, stats stack, marquees don't overflow the viewport, image grids reflow. Fix any overflow with the existing responsive class patterns; re-verify.

- [ ] **Step 3: Full-page smoke check** — reload `http://localhost:3001/work/woolworths`; scroll top→bottom; confirm all 12 sections reveal in order, stats count up once, both marquees loop, no console errors. Confirm the Work card links here from `/#work`.

- [ ] **Step 4: Typecheck + build** — Run `pnpm exec tsc --noEmit` (no errors). Optionally `pnpm exec next build` to confirm the static param generates.

- [ ] **Step 5: Commit**

```bash
git add components/case-study/projects/Woolworths.tsx
git commit -m "Add Woolworths connect footer and finalize responsive pass"
```

---

## Self-Review

**Spec coverage:** All 12 spec sections map to tasks — Hero (T2), Brief+meta (T3), My role (T3), Pillars (T4), Libraries+stats (T5), Guidelines marquee (T6), Accessibility (T7), Contribution (T8), Community (T9), System map (T10), Key projects (T11), Connect footer (T12). Integration points (route, Work card, placeholder manifest, light theme) covered in T1–T2.

**Placeholder scan:** No "TBD"/"implement later" left. Task 9 contains a documented conditional (swap marquee style if type too large) with a concrete fallback — a decision point, not a gap.

**Type consistency:** `WoolworthsStatsRow` and `DocMarquee` names are consistent between their defining tasks (T5/T6) and their imports in `Woolworths.tsx`. `StatCounter` props match `@/components/ui/StatCounter`. Image paths use the `IMG` constant consistently.

**Copy check:** All section copy is original, written in this plan; no reference-site wording reused.
