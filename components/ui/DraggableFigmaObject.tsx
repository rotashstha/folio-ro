"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASING_SPRING } from "@/lib/animation/constants";

interface DraggableFigmaObjectProps {
  label: string;
  children: React.ReactNode;
  boundsRef: React.RefObject<HTMLElement | null>;
  className?: string;
  style?: React.CSSProperties;
  defaultSelected?: boolean;
}

const FIGMA_BLUE = "#2D7FF9";
const PINK = "#FF3366";
const PURPLE = "#7C3AED";
const SNAP_MS = 800;
const FADE_MS = 200;
const TYPE_INTERVAL_MS = 38;
const POST_TYPE_PAUSE_MS = 900;
const DF_MARKER = "data-df-draggable";
const DRAG_THRESHOLD = 14;
// Bouncy overshoot used only for the snap-back; differs from the project's standard EASING_SPRING.
const SNAP_EASING = "cubic-bezier(0.34, 1.56, 0.64, 1)";
const MONO_FONT =
  "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace";
const SANS_FONT =
  "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif";

const DRAG_MESSAGES = [
  "Let's keep this centered, please.",
  "bruhh.. stop breaking my layout.",
  "Again? We just fixed this.",
  "I'm locking this layer. (just kidding)",
];
const ALIGN_MESSAGE = "Aligning to Grid...";
const CHROME_LABEL = "Text — Drag to move";
const CHROME_TYPE_INTERVAL_MS = 32;

const HANDLE_POSITIONS = [
  { top: "0%", left: "0%", cursor: "nwse-resize" },
  { top: "0%", left: "50%", cursor: "ns-resize" },
  { top: "0%", left: "100%", cursor: "nesw-resize" },
  { top: "50%", left: "100%", cursor: "ew-resize" },
  { top: "100%", left: "100%", cursor: "nwse-resize" },
  { top: "100%", left: "50%", cursor: "ns-resize" },
  { top: "100%", left: "0%", cursor: "nesw-resize" },
  { top: "50%", left: "0%", cursor: "ew-resize" },
] as const;

type Phase = "idle" | "dragging" | "commenting" | "aligning";

interface OriginRect {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

interface DragHUDProps {
  phase: Phase;
  originRect: OriginRect;
  current: { x: number; y: number };
  pointer: { x: number; y: number };
  typedText: string;
  fullMessage: string;
}

// Figma-style cursor arrow
function CursorArrow({ color }: { color: string }) {
  return (
    <svg
      width="14"
      height="18"
      viewBox="0 0 14 18"
      style={{ display: "block", flexShrink: 0 }}
      aria-hidden="true"
    >
      <path
        d="M0.5 0.7L0.5 14.4L4.0 11.0L6.5 16.7L8.4 15.9L5.9 10.2L10.6 10.2L0.5 0.7Z"
        fill={color}
        stroke="#ffffff"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DragHUD({
  phase,
  originRect,
  current,
  pointer,
  typedText,
  fullMessage,
}: DragHUDProps) {
  const dragging = phase === "dragging";
  const commenting = phase === "commenting";
  const aligning = phase === "aligning";

  const originCx = (originRect.left + originRect.right) / 2;
  const originCy = (originRect.top + originRect.bottom) / 2;
  const elementHalfWidth = (originRect.right - originRect.left) / 2;
  const elementHalfHeight = (originRect.bottom - originRect.top) / 2;

  const dx = Math.round(current.x - originCx);
  const dy = Math.round(current.y - originCy);

  // `current` already animates to origin during aligning (pos is set to {0,0}),
  // so a single source of truth drives both the pill and the comment anchor.
  // CSS transitions handle the in-flight motion.
  const anchorX = current.x + elementHalfWidth - 24;
  const anchorY = current.y + elementHalfHeight - 12;

  const bubbleText = aligning ? ALIGN_MESSAGE : typedText;
  const typingComplete = typedText.length === fullMessage.length;
  const showCaret = commenting && !typingComplete;
  const cursorVisible = commenting || aligning;

  return (
    <>
      {/* Pink dashed alignment guide */}
      <svg
        aria-hidden="true"
        className="pointer-events-none fixed inset-0"
        style={{ width: "100vw", height: "100vh", zIndex: 9998 }}
      >
        <line
          x1={originCx}
          y1={originCy}
          x2={current.x}
          y2={current.y}
          stroke={PINK}
          strokeWidth="1"
          strokeDasharray="5 4"
          style={{
            opacity: dragging ? 1 : 0,
            transition: "opacity 140ms ease-out",
          }}
        />
        <circle
          cx={originCx}
          cy={originCy}
          r="3"
          fill={PINK}
          style={{ opacity: dragging ? 1 : 0, transition: "opacity 140ms ease-out" }}
        />
        <circle
          cx={current.x}
          cy={current.y}
          r="3"
          fill={PINK}
          style={{ opacity: dragging ? 1 : 0, transition: "opacity 140ms ease-out" }}
        />
      </svg>

      {/* dx/dy pink pill — drag only */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed select-none"
        style={{
          left: current.x,
          top: current.y,
          transform: "translate(-50%, calc(-100% - 16px))",
          background: PINK,
          color: "#fff",
          fontSize: 11,
          fontWeight: 600,
          fontFamily: MONO_FONT,
          letterSpacing: "0.04em",
          padding: "3px 9px",
          borderRadius: 3,
          whiteSpace: "nowrap",
          zIndex: 9999,
          opacity: dragging ? 1 : 0,
          transition: "opacity 140ms ease-out",
        }}
      >
        dx: {dx}, dy: {dy}
      </div>

      {/* "You" cursor label — follows the pointer during drag */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed select-none"
        style={{
          left: pointer.x + 14,
          top: pointer.y + 16,
          background: "#ffffff",
          color: "#0a0a0a",
          fontSize: 11,
          fontWeight: 600,
          fontFamily: MONO_FONT,
          letterSpacing: "0.02em",
          padding: "2px 7px",
          borderRadius: 3,
          whiteSpace: "nowrap",
          zIndex: 9999,
          opacity: dragging ? 1 : 0,
          transition: "opacity 140ms ease-out",
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        }}
      >
        You
      </div>

      {/* Figma-style comment cursor + speech bubble */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed select-none"
        style={{
          left: anchorX,
          top: anchorY,
          zIndex: 9999,
          opacity: cursorVisible ? 1 : 0,
          transition: aligning
            ? `left ${SNAP_MS}ms ${SNAP_EASING}, top ${SNAP_MS}ms ${SNAP_EASING}, opacity 200ms ${EASING_SPRING}`
            : `opacity 220ms ${EASING_SPRING}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          <CursorArrow color={PURPLE} />
          <div
            style={{
              marginLeft: 4,
              marginTop: 3,
              background: PURPLE,
              color: "#ffffff",
              fontSize: 11,
              fontWeight: 600,
              fontFamily: MONO_FONT,
              letterSpacing: "0.02em",
              padding: "2px 8px",
              borderRadius: 3,
              whiteSpace: "nowrap",
              boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
            }}
          >
            Rotash
          </div>
        </div>

        <div
          style={{
            marginTop: 4,
            marginLeft: 12,
            background: PURPLE,
            color: "#ffffff",
            fontSize: 13,
            fontWeight: 500,
            fontFamily: SANS_FONT,
            lineHeight: 1.35,
            padding: "8px 13px",
            borderRadius: 12,
            borderTopLeftRadius: 4,
            whiteSpace: "nowrap",
            boxShadow: "0 8px 24px rgba(124, 58, 237, 0.35), 0 0 0 1px rgba(124, 58, 237, 0.25)",
          }}
        >
          {bubbleText}
          {showCaret && <span className="df-typing-caret" />}
          {commenting && !typingComplete && (
            // Reserve the final width so the bubble doesn't reflow as characters land.
            <span style={{ visibility: "hidden", whiteSpace: "pre" }}>
              {fullMessage.slice(typedText.length)}
            </span>
          )}
        </div>
      </div>
    </>
  );
}

export function DraggableFigmaObject({
  label,
  children,
  boundsRef,
  className,
  style,
  defaultSelected = false,
}: DraggableFigmaObjectProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const [selected, setSelected] = useState(defaultSelected);
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [phase, setPhase] = useState<Phase>("idle");
  const [originRect, setOriginRect] = useState<OriginRect>({
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  });
  const [pointerPos, setPointerPos] = useState({ x: 0, y: 0 });
  const [fullMessage, setFullMessage] = useState("");
  const [typedText, setTypedText] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [chromeLabelTyped, setChromeLabelTyped] = useState("");

  const phaseTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      phaseTimersRef.current.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const onSelectionClaimed = (e: Event) => {
      if (e instanceof CustomEvent && e.detail?.from === wrap) return;
      setSelected(false);
    };

    const onWindowPointerDown = (e: PointerEvent) => {
      const target = e.target as Element | null;
      if (target && target.closest(`[${DF_MARKER}]`)) return;
      setSelected(false);
    };

    window.addEventListener("df-selection-claimed", onSelectionClaimed);
    window.addEventListener("pointerdown", onWindowPointerDown);
    return () => {
      window.removeEventListener("df-selection-claimed", onSelectionClaimed);
      window.removeEventListener("pointerdown", onWindowPointerDown);
    };
  }, []);

  const claimSelection = () => {
    setSelected(true);
    window.dispatchEvent(
      new CustomEvent("df-selection-claimed", { detail: { from: wrapRef.current } })
    );
  };

  const dragState = useRef<{
    pointerId: number;
    offsetX: number;
    offsetY: number;
    startWrapX: number;
    startWrapY: number;
    startClientX: number;
    startClientY: number;
    originLeft: number;
    originTop: number;
    originRight: number;
    originBottom: number;
    boundsLeft: number;
    boundsRight: number;
    boundsTop: number;
    boundsBottom: number;
    wrapW: number;
    wrapH: number;
    moved: boolean;
  } | null>(null);

  const clearPhaseTimers = () => {
    phaseTimersRef.current.forEach(clearTimeout);
    phaseTimersRef.current = [];
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    const wrap = wrapRef.current;
    const bounds = boundsRef.current;
    if (!wrap || !bounds) return;

    claimSelection();
    clearPhaseTimers();
    setPhase("idle");
    setTypedText("");

    const wrapRect = wrap.getBoundingClientRect();
    const boundsRect = bounds.getBoundingClientRect();
    const originLeft = wrapRect.left - pos.x;
    const originTop = wrapRect.top - pos.y;
    const originRight = wrapRect.right - pos.x;
    const originBottom = wrapRect.bottom - pos.y;

    dragState.current = {
      pointerId: e.pointerId,
      offsetX: e.clientX - wrapRect.left,
      offsetY: e.clientY - wrapRect.top,
      startWrapX: originLeft,
      startWrapY: originTop,
      startClientX: e.clientX,
      startClientY: e.clientY,
      originLeft,
      originTop,
      originRight,
      originBottom,
      boundsLeft: boundsRect.left,
      boundsRight: boundsRect.right,
      boundsTop: boundsRect.top,
      boundsBottom: boundsRect.bottom,
      wrapW: wrapRect.width,
      wrapH: wrapRect.height,
      moved: false,
    };

    setOriginRect({ left: originLeft, top: originTop, right: originRight, bottom: originBottom });
    setPointerPos({ x: e.clientX, y: e.clientY });

    try {
      wrap.setPointerCapture(e.pointerId);
    } catch {
      // synthetic events may lack an active pointer — drag still works without capture
    }
    setDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const ds = dragState.current;
    if (!ds || ds.pointerId !== e.pointerId) return;

    setPointerPos({ x: e.clientX, y: e.clientY });

    const desiredLeft = e.clientX - ds.offsetX;
    const desiredTop = e.clientY - ds.offsetY;

    const clampedLeft = Math.min(
      Math.max(desiredLeft, ds.boundsLeft),
      ds.boundsRight - ds.wrapW
    );
    const clampedTop = Math.min(
      Math.max(desiredTop, ds.boundsTop),
      ds.boundsBottom - ds.wrapH
    );

    setPos({ x: clampedLeft - ds.startWrapX, y: clampedTop - ds.startWrapY });

    if (!ds.moved) {
      const ddx = e.clientX - ds.startClientX;
      const ddy = e.clientY - ds.startClientY;
      if (Math.sqrt(ddx * ddx + ddy * ddy) > DRAG_THRESHOLD) {
        ds.moved = true;
        setPhase("dragging");
      }
    }
  };

  const startTypingSequence = (message: string) => {
    setFullMessage(message);
    setTypedText("");

    let i = 0;
    const typeNext = () => {
      i += 1;
      setTypedText(message.slice(0, i));
      if (i < message.length) {
        const t = setTimeout(typeNext, TYPE_INTERVAL_MS);
        phaseTimersRef.current.push(t);
      } else {
        const pause = setTimeout(() => {
          setPhase("aligning");
          setPos({ x: 0, y: 0 });
          const done = setTimeout(() => {
            setPhase("idle");
          }, SNAP_MS + 250);
          phaseTimersRef.current.push(done);
        }, POST_TYPE_PAUSE_MS);
        phaseTimersRef.current.push(pause);
      }
    };
    // small delay so the bubble can fade in before typing begins
    const start = setTimeout(typeNext, 120);
    phaseTimersRef.current.push(start);
  };

  const releasePointer = (e: React.PointerEvent<HTMLDivElement>) => {
    const ds = dragState.current;
    if (!ds || ds.pointerId !== e.pointerId) return;
    const wrap = wrapRef.current;
    if (wrap?.hasPointerCapture(e.pointerId)) {
      try {
        wrap.releasePointerCapture(e.pointerId);
      } catch {
        // ignore — pointer may already be released
      }
    }

    const didDrag = ds.moved;
    dragState.current = null;
    setDragging(false);

    if (!didDrag) {
      setPos({ x: 0, y: 0 });
      setPhase("idle");
      return;
    }

    // Element stays at last drag position. Comment cursor + bubble appear and type.
    setPhase("commenting");
    const message = DRAG_MESSAGES[Math.floor(Math.random() * DRAG_MESSAGES.length)];
    startTypingSequence(message);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 32 : 8;
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setPos((p) => ({ ...p, y: p.y - step }));
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setPos((p) => ({ ...p, y: p.y + step }));
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPos((p) => ({ ...p, x: p.x - step }));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPos((p) => ({ ...p, x: p.x + step }));
    } else if (e.key === "Escape") {
      e.preventDefault();
      clearPhaseTimers();
      setPos({ x: 0, y: 0 });
      setPhase("idle");
      setSelected(false);
    }
  };

  useEffect(() => {
    return () => {
      dragState.current = null;
    };
  }, []);

  const chromeVisible = selected || dragging || hovered;
  const chromeLabelComplete = chromeLabelTyped.length === CHROME_LABEL.length;

  // Type out the chrome label whenever the selection chrome appears. Resumes
  // from the current typed length so StrictMode's effect double-invoke and
  // App Router cached remounts both pick up cleanly.
  useEffect(() => {
    if (!chromeVisible || reduced) return;
    if (chromeLabelTyped.length >= CHROME_LABEL.length) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let i = chromeLabelTyped.length;
    const typeNext = () => {
      i += 1;
      setChromeLabelTyped(CHROME_LABEL.slice(0, i));
      if (i < CHROME_LABEL.length) {
        timers.push(setTimeout(typeNext, CHROME_TYPE_INTERVAL_MS));
      }
    };
    timers.push(setTimeout(typeNext, 180));
    return () => timers.forEach(clearTimeout);
    // chromeLabelTyped intentionally omitted — typeNext mutates it and we don't
    // want the effect to retrigger on every character. Length is only read for
    // the resume offset on first entry.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chromeVisible, reduced]);

  // Reduced-motion: skip animation, show full label immediately.
  useEffect(() => {
    if (reduced && chromeLabelTyped !== CHROME_LABEL) {
      setChromeLabelTyped(CHROME_LABEL);
    }
  }, [reduced, chromeLabelTyped]);

  let transform: string;
  if (dragging && !reduced) {
    transform = `translate(${pos.x}px, ${pos.y}px) rotate(-1deg) scale(1.02)`;
  } else if (pos.x === 0 && pos.y === 0) {
    transform = "none";
  } else {
    transform = `translate(${pos.x}px, ${pos.y}px)`;
  }

  // While commenting, the element is "frozen" at its dropped position — no transition.
  // During aligning, animate back over SNAP_MS with the spring easing.
  const transitionTransform = (() => {
    if (dragging || reduced) return "none";
    if (phase === "commenting") return "none";
    return `transform ${SNAP_MS}ms ${SNAP_EASING}`;
  })();

  const hudActive = isMounted && phase !== "idle" && !reduced;
  const currentCenter = {
    x: (originRect.left + originRect.right) / 2 + pos.x,
    y: (originRect.top + originRect.bottom) / 2 + pos.y,
  };

  return (
    <>
      <div
        ref={wrapRef}
        role="button"
        tabIndex={0}
        aria-label={`Draggable: ${label}`}
        aria-pressed={selected}
        {...{ [DF_MARKER]: "" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={releasePointer}
        onPointerCancel={releasePointer}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onFocus={claimSelection}
        onKeyDown={onKeyDown}
        className={`relative inline-block select-none outline-none ${className ?? ""}`}
        style={{
          cursor: dragging ? "grabbing" : "grab",
          touchAction: "none",
          transform,
          transition: transitionTransform,
          zIndex: dragging || phase === "commenting" ? 10 : 1,
          filter: dragging && !reduced ? "drop-shadow(0 8px 16px rgba(0,0,0,0.25))" : "none",
          willChange: "transform",
          ...style,
        }}
      >
        <span className="relative block px-[10px] py-0">{children}</span>

        {/* Selection chrome */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: chromeVisible ? 1 : 0,
            transition: `opacity ${FADE_MS}ms ease-out`,
          }}
        >
          <span
            className="absolute inset-0 block"
            style={{ border: `1px solid ${FIGMA_BLUE}` }}
          />

          <span
            className="absolute font-sans"
            style={{
              top: 0,
              left: 0,
              transform: "translateY(-100%)",
              background: FIGMA_BLUE,
              color: "#fff",
              fontSize: "11px",
              fontWeight: 500,
              lineHeight: "16px",
              padding: "2px 8px",
              borderRadius: "4px 4px 0 0",
              letterSpacing: "0.01em",
              whiteSpace: "nowrap",
            }}
          >
            {chromeLabelTyped}
            {!chromeLabelComplete && <span className="df-typing-caret" />}
            {!chromeLabelComplete && (
              // Reserve final width so the chip doesn't reflow during typing.
              <span style={{ visibility: "hidden", whiteSpace: "pre" }}>
                {CHROME_LABEL.slice(chromeLabelTyped.length)}
              </span>
            )}
          </span>

          {HANDLE_POSITIONS.map((h, i) => (
            <span
              key={i}
              className="absolute block"
              style={{
                top: h.top,
                left: h.left,
                width: 8,
                height: 8,
                marginLeft: -4,
                marginTop: -4,
                background: "#fff",
                border: `1px solid ${FIGMA_BLUE}`,
                boxSizing: "border-box",
              }}
            />
          ))}
        </span>
      </div>

      {hudActive &&
        createPortal(
          <DragHUD
            phase={phase}
            originRect={originRect}
            current={currentCenter}
            pointer={pointerPos}
            typedText={typedText}
            fullMessage={fullMessage}
          />,
          document.body
        )}
    </>
  );
}
