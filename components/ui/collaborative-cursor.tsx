"use client";

/**
 * Two-cursor collaborative system:
 *   1. RotashCursor  — purple, drifts autonomously while #hero is in view,
 *                      then lerps to the nearest data-cursor-target heading.
 *   2. YouCursor     — dark, follows the real mouse globally.
 */

import {
  useEffect,
  useRef,
  useState,
  useCallback,
  RefObject,
} from "react";
import { usePathname } from "next/navigation";

// ─── Tunable constants ────────────────────────────────────────────────────────

/** Normalised {x,y} waypoints Rotash's cursor loops through (0–1 of viewport) */
const Sn = [
  { x: 0.7, y: 0.3 },
  { x: 0.5, y: 0.5 },
  { x: 0.3, y: 0.35 },
  { x: 0.45, y: 0.65 },
  { x: 0.65, y: 0.55 },
  { x: 0.55, y: 0.25 },
];

/** Speed of autonomous waypoint traversal (index units per ms) */
const SS = 4e-4;

/** Lerp factor for scroll-targeted mode per rAF tick */
const ap = 0.1;

/**
 * data-cursor-target values the scroll-targeted cursor can snap to.
 * These match the data-cursor-target attributes placed on key section headings.
 */
const ES = [
  "work-heading",
  "leadership-heading",
  "strategy-heading",
  "collaboration-heading",
  "footer-links",
];

const MOBILE_BREAKPOINT = 768;
const HOME_PATH = "/";

/**
 * Fraction of the viewport height remaining above the hero's bottom edge
 * at which the cursor switches from autonomous → scroll-targeted.
 * 0.3 means "switch when hero has 30% of a viewport height left visible".
 */
const MODE_SWITCH_THRESHOLD = 0.3;

// ─── Shared primitives ────────────────────────────────────────────────────────

function CursorArrow({ fill, stroke }: { fill: string; stroke: string }) {
  return (
    <svg
      width="16"
      height="20"
      viewBox="0 0 16 20"
      fill="none"
      className="drop-shadow-sm"
    >
      <path
        d="M0.5 0.5L15 10L8 11L5 19.5L0.5 0.5Z"
        fill={fill}
        stroke={stroke}
        strokeWidth="0.5"
      />
    </svg>
  );
}

function CursorLabel({ label, bg }: { label: string; bg: string }) {
  return (
    <div
      className="absolute left-4 top-4 px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap shadow-sm"
      style={{ backgroundColor: bg, color: "white" }}
    >
      {label}
    </div>
  );
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const update = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    mq.addEventListener("change", update);
    update();
    return () => mq.removeEventListener("change", update);
  }, []);
  return !!isMobile;
}

export function useMouseCursor(containerRef?: RefObject<HTMLElement | null>) {
  const [state, setState] = useState({ x: 0, y: 0, visible: false });
  const rafRef = useRef(0);

  const onMove = useCallback((e: MouseEvent) => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setState({ x: e.clientX, y: e.clientY, visible: true });
    });
  }, []);

  const onLeave = useCallback(() => {
    setState((s) => ({ ...s, visible: false }));
  }, []);

  const onEnter = useCallback((e: MouseEvent) => {
    setState({ x: e.clientX, y: e.clientY, visible: true });
  }, []);

  useEffect(() => {
    const target: EventTarget = containerRef?.current ?? window;
    target.addEventListener("mousemove", onMove as EventListener);
    target.addEventListener("mouseleave", onLeave as EventListener);
    target.addEventListener("mouseenter", onEnter as EventListener);
    return () => {
      target.removeEventListener("mousemove", onMove as EventListener);
      target.removeEventListener("mouseleave", onLeave as EventListener);
      target.removeEventListener("mouseenter", onEnter as EventListener);
      cancelAnimationFrame(rafRef.current);
    };
  }, [containerRef, onMove, onLeave, onEnter]);

  return state;
}

// ─── lp() — nearest data-cursor-target to viewport centre ────────────────────

let cachedTargets: Element[] = [];

function refreshTargetCache() {
  cachedTargets = ES.flatMap((name) => {
    const el = document.querySelector(`[data-cursor-target="${name}"]`);
    return el ? [el] : [];
  });
}

function lp(): Element | null {
  const centre = window.innerHeight / 2;
  let closest: Element | null = null;
  let minDist = Infinity;
  for (const el of cachedTargets) {
    const rect = el.getBoundingClientRect();
    const dist = Math.abs((rect.top + rect.bottom) / 2 - centre);
    if (dist < minDist) {
      minDist = dist;
      closest = el;
    }
  }
  return closest;
}

// ─── RotashCursor (CS) ────────────────────────────────────────────────────────

export function RotashCursor({
  mode = "autonomous",
}: {
  mode?: "autonomous" | "scroll-targeted";
}) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });
  const indexRef = useRef(0);
  const rafRef = useRef(0);
  const convergedRef = useRef(false);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (mode !== "autonomous") return;
    if (prefersReducedMotion) {
      const p = {
        x: Sn[0].x * window.innerWidth,
        y: Sn[0].y * window.innerHeight,
      };
      setPos(p);
      posRef.current = p;
      return;
    }
    let lastTime = performance.now();
    const tick = (now: number) => {
      const dt = now - lastTime;
      lastTime = now;
      const raw = indexRef.current + SS * Math.max(0, dt);
      indexRef.current = ((raw % Sn.length) + Sn.length) % Sn.length;
      const f = Math.floor(indexRef.current);
      const t = indexRef.current - f;
      const a = Sn[f];
      const b = Sn[(f + 1) % Sn.length];
      const smooth = t * t * (3 - 2 * t);
      const next = {
        x: (a.x + (b.x - a.x) * smooth) * window.innerWidth,
        y: (a.y + (b.y - a.y) * smooth) * window.innerHeight,
      };
      setPos(next);
      posRef.current = next;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [mode, prefersReducedMotion]);

  useEffect(() => {
    if (mode !== "scroll-targeted") return;
    if (prefersReducedMotion) {
      const el = lp();
      if (el) {
        const rect = el.getBoundingClientRect();
        const p = { x: rect.right + 12, y: rect.top + 4 };
        setPos(p);
        posRef.current = p;
      }
      return;
    }
    refreshTargetCache();
    convergedRef.current = false;

    // Snap to target immediately so mode-switch doesn't lerp from stale autonomous position
    const initialEl = lp();
    if (initialEl) {
      const r = initialEl.getBoundingClientRect();
      const snap = { x: r.right + 12, y: r.top + 4 };
      posRef.current = snap;
      setPos(snap);
    }

    const tick = () => {
      const el = lp();
      if (el) {
        const rect = el.getBoundingClientRect();
        const cur = posRef.current;
        const tx = rect.right + 12;
        const ty = rect.top + 4;
        const dx = tx - cur.x;
        const dy = ty - cur.y;
        if (Math.abs(dx) > 0.3 || Math.abs(dy) > 0.3) {
          const next = { x: cur.x + dx * ap, y: cur.y + dy * ap };
          posRef.current = next;
          setPos(next);
        } else {
          // Cursor has reached target — pause the loop until next scroll
          convergedRef.current = true;
          return;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    const onScroll = () => {
      if (convergedRef.current) {
        convergedRef.current = false;
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
    };
  }, [mode, prefersReducedMotion]);

  return (
    <div
      className="fixed pointer-events-none"
      style={{ left: pos.x, top: pos.y, zIndex: 9998 }}
    >
      <CursorArrow fill="#8b5cf6" stroke="#7c3aed" />
      <CursorLabel label="Rotash" bg="#8b5cf6" />
    </div>
  );
}

// ─── YouCursor — follows the real mouse globally ─────────────────────────────

export function YouCursor({
  containerRef,
  showArrow = true,
  label = "You",
}: {
  containerRef?: RefObject<HTMLElement | null>;
  showArrow?: boolean;
  label?: string;
}) {
  const isMobile = useIsMobile();
  const cursor = useMouseCursor(containerRef);

  if (isMobile || !cursor.visible) return null;

  return (
    <div
      className="fixed pointer-events-none"
      style={{ left: cursor.x, top: cursor.y, zIndex: 9999 }}
    >
      {showArrow && <CursorArrow fill="#0f172a" stroke="#1e293b" />}
      <CursorLabel label={label} bg="#0f172a" />
    </div>
  );
}

// ─── CollaborativeCursor — layout drop-in ─────────────────────────────────────

/**
 * Mount once in the root layout.
 *
 * Behaviour:
 *  - cursor:none is applied globally (native cursor hidden everywhere).
 *  - YouCursor tracks the real mouse across the whole page.
 *  - RotashCursor drifts autonomously while #hero is visible, then switches to
 *    scroll-targeted mode (lerping to [data-cursor-target] section headings).
 */
export function CollaborativeCursor() {
  const isMobile = useIsMobile();
  const [mode, setMode] = useState<"autonomous" | "scroll-targeted">(
    "autonomous"
  );
  const [triggerLabel, setTriggerLabel] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setTriggerLabel(null);
  }, [pathname]);

  // Global cursor:none — native cursor hidden on desktop
  useEffect(() => {
    if (isMobile) {
      document.documentElement.style.cursor = "";
      return;
    }
    document.documentElement.style.cursor = "none";
    return () => {
      document.documentElement.style.cursor = "";
    };
  }, [isMobile]);

  // Find #hero and attach scroll listener in one effect — avoids the two-render-cycle
  // race from chaining heroEl state into a second effect. Initial mode check is deferred
  // one rAF to let SmoothScroller's Lenis scroll-reset land before we read scrollY.
  useEffect(() => {
    if (isMobile) return;
    const hero = document.getElementById("hero") as HTMLElement | null;
    if (!hero) {
      setMode("scroll-targeted");
      return;
    }
    const handleScroll = () => {
      const rect = hero.getBoundingClientRect();
      const next =
        rect.bottom > window.innerHeight * MODE_SWITCH_THRESHOLD
          ? "autonomous"
          : "scroll-targeted";
      setMode((prev) => (prev === next ? prev : next));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    const raf = requestAnimationFrame(handleScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobile, pathname]);

  // data-cursor-trigger hover labels for YouCursor
  useEffect(() => {
    if (isMobile) return;
    const onOver = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest?.(
        "[data-cursor-trigger]"
      ) as HTMLElement | null;
      if (el) setTriggerLabel(el.dataset.cursorTrigger ?? null);
    };
    const onOut = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest?.(
        "[data-cursor-trigger]"
      ) as HTMLElement | null;
      if (!el) return;
      const related = e.relatedTarget as Node | null;
      if (related && el.contains(related)) return;
      setTriggerLabel(null);
    };
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    return () => {
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {pathname === HOME_PATH && <RotashCursor mode={mode} />}
      <YouCursor showArrow={!triggerLabel} label={triggerLabel ?? "You"} />
    </>
  );
}

// ─── Demo wrapper ─────────────────────────────────────────────────────────────

export function CollaborativeCursorDemo() {
  return (
    <section
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: "#f5f5f4" }}
    >
      <div className="flex items-center justify-center h-screen">
        <p className="text-slate-400 text-sm select-none pointer-events-none">
          Move your mouse around
        </p>
      </div>
    </section>
  );
}
