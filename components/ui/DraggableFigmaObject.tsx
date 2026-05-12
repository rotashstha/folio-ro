"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface DraggableFigmaObjectProps {
  label: string;
  children: React.ReactNode;
  boundsRef: React.RefObject<HTMLElement | null>;
  className?: string;
  style?: React.CSSProperties;
  defaultSelected?: boolean;
}

const FIGMA_BLUE = "#2D7FF9";
const SNAP_MS = 400;
const FADE_MS = 200;
const DF_MARKER = "data-df-draggable";

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

  // Sticky selection model:
  // - Click this element → it becomes selected (chrome stays).
  // - Click another draggable → that one selects, this one deselects (via broadcast).
  // - Click empty canvas (anywhere outside any draggable) → all deselect.
  // - Hover does nothing.
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
  } | null>(null);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    const wrap = wrapRef.current;
    const bounds = boundsRef.current;
    if (!wrap || !bounds) return;

    // Click selects this element
    claimSelection();

    const wrapRect = wrap.getBoundingClientRect();
    dragState.current = {
      pointerId: e.pointerId,
      offsetX: e.clientX - wrapRect.left,
      offsetY: e.clientY - wrapRect.top,
      startWrapX: wrapRect.left - pos.x,
      startWrapY: wrapRect.top - pos.y,
    };
    wrap.setPointerCapture(e.pointerId);
    setDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const ds = dragState.current;
    const wrap = wrapRef.current;
    const bounds = boundsRef.current;
    if (!ds || ds.pointerId !== e.pointerId || !wrap || !bounds) return;

    const boundsRect = bounds.getBoundingClientRect();
    const wrapRect = wrap.getBoundingClientRect();
    const wrapW = wrapRect.width;
    const wrapH = wrapRect.height;

    const desiredLeft = e.clientX - ds.offsetX;
    const desiredTop = e.clientY - ds.offsetY;

    const minLeft = boundsRect.left;
    const maxLeft = boundsRect.right - wrapW;
    const minTop = boundsRect.top;
    const maxTop = boundsRect.bottom - wrapH;

    const clampedLeft = Math.min(Math.max(desiredLeft, minLeft), maxLeft);
    const clampedTop = Math.min(Math.max(desiredTop, minTop), maxTop);

    setPos({
      x: clampedLeft - ds.startWrapX,
      y: clampedTop - ds.startWrapY,
    });
  };

  const releasePointer = (e: React.PointerEvent<HTMLDivElement>) => {
    const ds = dragState.current;
    if (!ds || ds.pointerId !== e.pointerId) return;
    const wrap = wrapRef.current;
    if (wrap?.hasPointerCapture(e.pointerId)) {
      wrap.releasePointerCapture(e.pointerId);
    }
    dragState.current = null;
    setDragging(false);
    // Figma-like: the glyph stays where it was dropped. Escape resets.
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
      setPos({ x: 0, y: 0 });
      setSelected(false);
    }
  };

  useEffect(() => {
    return () => {
      dragState.current = null;
    };
  }, []);

  const chromeVisible = selected || dragging || hovered;

  // Build the transform string. AVOID emitting `translate(0,0) none` (invalid CSS that
  // some browsers parse as a sub-pixel matrix and visibly tilts the chrome). When at rest,
  // emit either `none` or a clean `translate(...)` with no trailing function.
  let transform: string;
  if (dragging && !reduced) {
    transform = `translate(${pos.x}px, ${pos.y}px) rotate(-1deg) scale(1.02)`;
  } else if (pos.x === 0 && pos.y === 0) {
    transform = "none";
  } else {
    transform = `translate(${pos.x}px, ${pos.y}px)`;
  }

  const transitionTransform = dragging
    ? "none"
    : reduced
      ? "none"
      : `transform ${SNAP_MS}ms cubic-bezier(0.34, 1.56, 0.64, 1)`;

  return (
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
        zIndex: dragging ? 10 : 1,
        filter: dragging && !reduced ? "drop-shadow(0 8px 16px rgba(0,0,0,0.25))" : "none",
        willChange: "transform",
        ...style,
      }}
    >
      {/* Visible glyph. Horizontal px keeps a usable hit area around the
          glyph's optical edges; vertical padding is intentionally 0 so
          stacked draggables (e.g. the hero word stack) sit tight to the
          parent's `gap` rather than collecting padding on both sides. */}
      <span className="relative block px-[10px] py-0">{children}</span>

      {/* Selection chrome — non-interactive, axis-aligned to the wrapper bounds */}
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
          }}
        >
          Text
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
  );
}
