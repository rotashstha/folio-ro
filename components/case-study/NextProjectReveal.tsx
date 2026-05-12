"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { placeholderProjects } from "@/lib/projects";
import type { ProjectFrontmatter } from "@/types/project";

interface NextProjectRevealProps {
  /** Slug of the next case study. */
  nextSlug: string;
  /** Optional override — defaults to lookup in `placeholderProjects`. */
  next?: ProjectFrontmatter;
  className?: string;
}

/**
 * Caiguangxi-style end-of-case-study block — sticky meta with a thin scroll-
 * driven progress bar. As the user scrolls into the trigger zone, the
 * `--work-next-progress` CSS variable scrubs from 0 → 1, the bar fills, and
 * once full the router pushes to the next case study.
 *
 * The trigger section is `1.2 × 100vh` tall so the user has to scroll roughly
 * one extra viewport past the credits before navigation kicks in — that
 * intentional "extra room" keeps the gesture from firing accidentally.
 *
 * Reduced-motion users get a plain link; no scrub, no auto-navigation.
 */
export function NextProjectReveal({
  nextSlug,
  next: nextOverride,
  className,
}: NextProjectRevealProps) {
  const next =
    nextOverride ?? placeholderProjects.find((p) => p.slug === nextSlug);
  const router = useRouter();
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const barRef = useRef<HTMLSpanElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const navigatingRef = useRef(false);

  useEffect(() => {
    if (!next) return;
    router.prefetch(`/work/${next.slug}`);
  }, [router, next]);

  useEffect(() => {
    if (reduced || !next) return;
    const section = sectionRef.current;
    const bar = barRef.current;
    const track = trackRef.current;
    if (!section || !bar || !track) return;

    // Capture the pathname this instance was mounted on; if the URL changes
    // (e.g. user clicks the Portfolio link mid-transition) we must not race
    // ahead with our own router.push to the next case study.
    const mountedPathname = window.location.pathname;
    let frame = 0;
    let lastProgress = -1;
    // Skip auto-nav until the user actually scrolls — prevents a bounce when a route change carries scroll position from the previous page.
    let canAutoNavigate = false;

    const update = () => {
      frame = 0;
      if (navigatingRef.current) return;

      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;

      // Section is 1.2 × vh. Progress = 0 when section top hits viewport
      // bottom, progress = 1 when section bottom hits viewport bottom.
      const traveled = vh - rect.top;
      const total = rect.height;
      const progress = Math.max(0, Math.min(1, traveled / total));

      if (Math.abs(progress - lastProgress) >= 0.001) {
        lastProgress = progress;
        section.style.setProperty("--work-next-progress", progress.toFixed(4));
        bar.style.transform = `scaleX(${progress})`;
        track.setAttribute("aria-valuenow", String(Math.round(progress * 100)));
      }

      if (
        progress >= 0.995 &&
        canAutoNavigate &&
        window.location.pathname === mountedPathname
      ) {
        navigatingRef.current = true;
        router.push(`/work/${next.slug}`);
      }
    };

    const onScroll = () => {
      canAutoNavigate = true;
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduced, next, router]);

  if (!next) return null;

  const baseLabelClasses =
    "font-mono text-[11px] uppercase tracking-[0.22em] opacity-60";
  const titleClasses =
    "font-display mt-6 block text-[clamp(3rem,9vw,9rem)] leading-[0.95] tracking-[-0.02em] md:mt-8";

  if (reduced) {
    return (
      <section
        aria-label={`Next project: ${next.client}`}
        className={`pt-[160px] pb-[80px] ${className ?? ""}`}
      >
        <div className="mx-auto w-full max-w-[1640px] px-6 text-center md:px-14">
          <p className={baseLabelClasses}>Next Project</p>
          <Link
            href={`/work/${next.slug}`}
            data-cursor-trigger="Next case"
            className={`${titleClasses} transition-opacity duration-500 hover:opacity-70 focus-visible:outline-none`}
          >
            {next.client}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      aria-label={`Next project: ${next.client}`}
      className={`work-next relative ${className ?? ""}`}
      style={
        {
          minHeight: "120vh",
          ["--work-next-progress" as string]: "0",
        } as React.CSSProperties
      }
    >
      {/* Sticky inner — pinned for the duration of the scrub so the meta and
          progress bar stay perfectly centered while the user scrolls. */}
      <div className="work-next__inner sticky top-0 flex h-screen flex-col items-center justify-center px-6 md:px-14">
        <div className="work-next__meta flex flex-col items-center text-center">
          <p className={`work-next__label ${baseLabelClasses}`}>Next Project</p>
          <Link
            href={`/work/${next.slug}`}
            data-cursor-trigger="Next case"
            className={`work-next__title ${titleClasses} transition-opacity duration-500 hover:opacity-70 focus-visible:outline-none`}
          >
            {next.client}
          </Link>
        </div>

        {/* Thin progress track — fills horizontally as the user scrolls. The
            <span> uses transform: scaleX(progress) so the fill is GPU-cheap
            and there's no layout thrash. */}
        <div
          ref={trackRef}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={0}
          aria-label={`Scroll progress to ${next.client}`}
          className="work-next__track relative mt-12 h-px w-[min(560px,80vw)] overflow-hidden bg-current/20 md:mt-16"
        >
          <span
            ref={barRef}
            className="work-next__bar absolute inset-y-0 left-0 block h-full w-full origin-left bg-current"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </section>
  );
}
