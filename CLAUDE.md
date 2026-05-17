# Portfolio Project

Read docs/PLAN.md for the full build plan.

## Conventions
- Next.js 15, App Router, TypeScript strict
- pnpm for package management
- Tailwind only — no inline styles except animation keyframes
- Server Components by default; `"use client"` only when needed
- Git worktree: active branch is `claude/frosty-einstein-7530b2`

## Where to find things
- `docs/PLAN.md` — master build plan
- `app/page.tsx` — homepage (Hero → Work → MarqueeStrip → AIChatInterface → Leadership → Strategy → Collaboration)
- `app/globals.css` — theme tokens, light/dark overrides, custom animation keyframes
- `components/sections/` — full-page sections
- `components/ui/` — reusable UI primitives
- `components/ai-chat/` — AI chat interface
- `components/case-study/projects/` — individual case study pages
- `lib/projects.ts` — all project data (titles, tags, coverTone, tagTones)
- `lib/animation/constants.ts` — shared `EASING_SPRING` and `PORTFOLIO_LOADED_EVENT`
- `types/project.ts` — project type definitions
- `public/images/figma/Work/` — work card cover images
- `public/videos/showreel.mp4` — showreel video

## Theme system
- Default is **dark mode** (`html[data-theme="dark"]` or no attribute)
- Light mode via `html[data-theme="light"]`; toggled by `ThemeToggle` component
- Tokens flip: dark → `--color-ink: #000`, `--color-paper: #fff`; light → inverse
- Sections that don't participate in the flip use `data-theme-fixed`
- Light-mode scoped overrides live in `app/globals.css` under `html[data-theme="light"]`

## Work cards — pill system
Pills sit bottom-left of each card figure. Key fields in `lib/projects.ts`:
- `coverTone?: "light" | "dark"` — drives default pill style for the whole card
  - `"light"` covers (Atlas, IAG, bp): borderless gradient-white glass, dark `#0a0a0a` text
  - `"dark"` covers (AWS, Carell): `border border-white/30 bg-white/15`, white text
- `tagTones?: Record<string, "light" | "dark">` — per-tag override (bp uses this: Energy and ERP Dashboard both set to `"dark"` because the bottom of the cover is dark green)
- Pills are uppercase, `text-[10px] md:text-[11px]`, `tracking-[0.12em]`, `backdrop-blur-xl backdrop-saturate-150`
- Light pill extra: `bg-gradient-to-b from-white/55 to-white/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]`

## Key components built/modified this session

### `components/ui/ShowReelButton.tsx`
- Renders a play button + modal video player using `createPortal` to escape stacking context
- Portal renders at `document.body` with `z-[200]` — avoids header overlap
- Tagline: "What I'm up to" (no question mark)
- Video: `/videos/showreel.mp4`

### `components/ui/MarqueeStrip.tsx`
- Infinite CSS marquee, server component (no `"use client"`)
- Props: `text`, `separator` (default `✦`), `duration` (default 160s)
- Font: Sofia Sans ExtraBold (`font-body font-extrabold`), 150px, uppercase
- Dark mode: `bg-paper text-ink` (white bg, black text)
- Light mode: transparent bg, `#0a0a0a` text — via `.marquee-strip` / `.marquee-text` in globals.css
- Placed between `<Work>` and `<AIChatInterface>` in `app/page.tsx`
- Current text: `"CONNECTING PEOPLE THROUGH DESIGN."`

### `components/ui/ProjectCard.tsx`
- Pill rendering uses `coverTone` + `tagTones` from project data
- `isLightCover` drives base pill class; `tagTones?.[label]` overrides per tag

### `components/ai-chat/AIChatInterface.tsx`
- Input `font-size` pinned to `16px` on mobile (prevents iOS Safari auto-zoom), `14px` at `md:`

### `lib/animation/constants.ts`
- `EASING_SPRING = "cubic-bezier(0.16,1,0.3,1)"` — used across all reveal animations
- `PORTFOLIO_LOADED_EVENT = "portfolio-loaded"` — fired by PageLoader when ready

## Card titles (impact-first)
| Project | Title |
|---------|-------|
| Atlas Carbon | From messy paddocks to a working MVP |
| IAG | 50%+ design efficiency across IAG's brands |
| AWS | An AI assistant users actually trust |
| bp | Fragmented fuel ops, unified |
| Carell | +21.9% conversion in joinery ops |

## Skills for this project

Apply these skills when relevant:
- frontend-design — production-grade component patterns and quality
- ui-designer — visual craft, CSS, design tokens, pixel-perfect work
- humanizer — scrub AI-sounding phrasing from any user-facing copy

Do NOT apply these skills — this is a personal portfolio, not a client project:
- slalom-brand, dept-brand-presentation, dept-unsw-brand, rmit-brand-presentation
- product-strategist, product-discovery
- ux-designer (IA and flow decisions are already locked in docs/PLAN.md)
