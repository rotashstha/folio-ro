# Portfolio Implementation Plan

This document outlines the strategy for building a highly tactile, editorial, and interactive portfolio website that balances bold aesthetics with performant, accessible code.

## 1. Information Architecture

**Navigation Model**
- **Hybrid Single-Page Structure:** The core experience is a single-page scrolling narrative that guides the user through your value proposition.
- **Deep Dives (Case Studies):** Full case studies exist as separate routes (`/work/[slug]`) rather than modals, featuring seamless page transitions from the homepage project cards.
- **Header:** Minimalist sticky or hide-on-scroll header containing "Portfolio" and "Resume" links.

**Page Sections (The Narrative Flow)**
1. **Hero:** High-impact introduction ("Strategy, Design, Interaction").
2. **Work:** Bold display type with device mockup project cards.
3. **Pick my brain (AI):** Interactive chat interface for visitors to query your knowledge base.
4. **Leadership:** Metrics (15+, 250) and a list of mentorship/speaking engagements.
5. **Strategy:** Detailed methodology breakdown with journey maps and architecture examples.
6. **Collaboration:** Testimonials mapped to striking visual accents.
7. **Footer:** Massive scrolling marquee text ("ROTASH SHRESTHA") and essential links.

## 2. Visual System

**Typography**
- **Display:** `Gallient` (Serif). Used for the massive, screen-filling background text ("Work", "Strategy") to give it an editorial, high-fashion feel.
- **Primary Sans:** `Elza` (Semibold/Regular). Used for bold, modern section headers.
- **Body & UI:** `Sofia Sans` / `Sofia Sans Condensed` & `Inter`. Highly legible, modern geometric sans for paragraphs and UI elements.
- **Accent:** `Gochi Hand`. Used for the "handwritten" annotations to give a tactile, "work-in-progress" workshop feel.

**Color Direction**
- **Mode-Switching (Dark/Light):** The design inherently uses high-contrast sections. We will implement a dynamic theme that shifts the background color (Black to White) as the user scrolls past specific thresholds (e.g., transitioning from the dark 'Work' section to the light 'Leadership' section).
- **Accents:** Neon Green (`#0d7412`), Vibrant Pink/Purple (`#c80aa7`), and Bright Orange (`#b96f00`). These will be used for underlines, highlights, and borders to pop against the monochromatic backgrounds.

**Grid and Spacing**
- **Confident Whitespace:** Asymmetrical grid system utilizing CSS Grid. Elements will intentionally break the grid (e.g., overlapping images and text) to emulate editorial print design.

**Imagery and Media**
- High-resolution device mockups placed within solid color blocks. Images will utilize lazy loading and WebP formats.

## 3. Motion and Interaction System

The goal is to make the site feel *physical*.

**Scroll Behavior**
- **Lenis Smooth Scroll:** To achieve that buttery, momentum-based scrolling feel.
- **Parallax Backgrounds:** The massive background text ("Work", "Leadership") will be standard parallax elements, using GSAP ScrollTrigger with scrub and a y-transform at roughly 0.5-0.7x scroll velocity. Parallax will be disabled below 768px so it doesn't fight mobile scroll.

**Cursor Behavior**
- **Custom Blending Cursor:** A custom cursor that uses `mix-blend-mode: difference` to ensure visibility across varying background colors.
- **Magnetic Hover:** Buttons and project cards will have a subtle magnetic pull toward the cursor, heavily inspired by *Dropify*.

**Micro-interactions & Specific Effects**
- **Entry / Page Load:** A slow, refined reveal of the typography, akin to *Studio Namma*. Text will mask-in from the bottom.
- **Project Cards (Steal from *Zero*):** On hover, the device mockups will slightly scale up, and a subtle drop shadow will smoothly transition to give a 3D depth effect.
- **Scroll-Triggered Reveals:** As elements enter the viewport, they will fade and slide up slightly. The colored accent lines under the testimonials will draw themselves on scroll.

**Page Transitions**
- Routing to case studies (`/work/[slug]`) will use the **View Transitions API** (fallback to GSAP) to seamlessly morph the project card on the homepage into the hero section of the case study.

## 4. Technical Architecture

**Framework Recommendation**
- **Next.js (App Router):** Chosen for its excellent performance out of the box, image optimization components, and Server Components which keep the initial JS payload tiny (crucial for hitting our Lighthouse targets with heavy animations).

**Animation Libraries**
- **GSAP (GreenSock) + ScrollTrigger:** GSAP is the industry standard for complex, sequenced, and scroll-driven animations. While Framer Motion is great for React, GSAP is far superior for parallax and complex scroll timelines required by this editorial design.

**Content Management Approach**
- **MDX (`/content/work/*.mdx`):** Case studies will be managed via flat MDX files in the local repository. This simplifies the initial build and avoids overhead.
- **Sanity CMS (Deferred):** We will defer headless CMS adoption unless the content management needs outgrow the flat-file MDX approach in the future.

**AI Architecture ("Pick my brain")**
- **Knowledge Base:** JSON format.
- **Backend:** Cloudflare Worker securely holding the Anthropic API key, performing IP-based rate limiting, and calling the Claude API (Claude Haiku 4.5 default model).
- **Frontend Integration:** The Next.js frontend interacts with the Cloudflare Worker via an internal API route handler.

**Deployment & Performance**
- **Vercel:** Seamless Next.js deployment.
- **Performance Budget:** Strict rules on image sizes (all processed via Next/Image). We will lazily load the GSAP animation scripts and the AI chat component to ensure a blazing fast First Contentful Paint (FCP).

## 5. Component Inventory

**Layout & Core**
- `SmoothScroller` (Lenis wrapper)
- `GridContainer` / `SectionWrapper`
- `CustomCursor`

**Typography**
- `MassiveMarqueeText` (Footer)
- `BackgroundParallaxText` ("Work", "Strategy")
- `AnimatedHeading` (Mask-in reveals)

**Interactive UI**
- `MagneticButton`
- `AIChatInterface` (Input, response bubble, loading states)
- `ProjectCard` (With hover interactions)

**Data Presentation**
- `TestimonialBlock` (With animating accent lines)
- `StatCounter` (For the 15+ / 250 metrics, animating from 0 on scroll)

## 6. Build Phases

**Phase 1: MVP Scope (Structure & AI Chat)**
- Setup Next.js and TailwindCSS.
- Build the static components and responsive layouts for the homepage.
- Setup `/work/[slug]` stub routes (placeholder pages) so links on the homepage aren't dead.
- Implement the AI Chat component and wire up the Next.js route handler to the Cloudflare Worker.

**Phase 2: The Motion Layer (The "Wow" Factor)**
- Integrate Lenis smooth scrolling.
- Wire up GSAP ScrollTrigger for parallax background text, section transitions (dark/light mode shifting), and scroll-reveals.
- Implement magnetic hover and custom cursor.

**Phase 3: Case Studies & Polish**
- Implement the MDX parsing layer and build out the case study templates at `/work/[slug]`.
- Populate MDX content for the initial case studies.
- Performance profiling (Lighthouse auditing, image optimization).
- Accessibility pass: ensure `prefers-reduced-motion` halts GSAP timelines, keyboard focus states are clear, and ARIA labels are present.

## 7. Risks and Decisions

- **Cloudflare Worker Cold Starts:** Because the AI chat relies on a Worker for the Anthropic connection, we may encounter latency during cold starts. We should monitor response times and consider keep-alive strategies if latency impacts UX.
- **MDX to Sanity Migration:** While MDX is perfect for starting out, migrating to Sanity CMS later (if you want non-code updates) will require rewriting the data fetching layer and potentially translating MDX components to Portable Text. We are explicitly accepting this technical debt.
- **Parallax vs. Mobile:** Parallax can cause jitter and performance issues on mobile devices. Our decision to strictly disable the GSAP parallax on screens below 768px mitigates this risk while preserving performance.
- **Asset Weight:** High-res PNG mockups can bloat the site. We must heavily compress these and serve them in WebP/AVIF formats.
