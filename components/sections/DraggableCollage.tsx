"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export interface CollageImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  displayWidth?: number;
}

interface Photo {
  src: string;
  alt: string;
  width: number;
  height: number;
  x: number;
  y: number;
  rotation: number;
  z: number;
}

interface DraggableCollageProps {
  images: CollageImage[];
  className?: string;
}

// Hand-tuned cluster offsets for a tight, organic overlap.
// Each offset is in fractions of the photo width / height around the cluster center.
const CLUSTER_OFFSETS: Array<{ ox: number; oy: number }> = [
  { ox: -0.7, oy: -0.35 },
  { ox: 0.15, oy: -0.55 },
  { ox: 0.75, oy: -0.1 },
  { ox: -0.3, oy: 0.3 },
  { ox: 0.45, oy: 0.45 },
];

const SELECTION_COLOR = "#0c8ce9";
const COLLAGE_PHOTO_ATTR = "data-collage-photo";

const SELECTION_HANDLES: Array<React.CSSProperties> = [
  { top: -4, left: -4 },
  { top: -4, left: "50%", transform: "translateX(-50%)" },
  { top: -4, right: -4 },
  { top: "50%", left: -4, transform: "translateY(-50%)" },
  { top: "50%", right: -4, transform: "translateY(-50%)" },
  { bottom: -4, left: -4 },
  { bottom: -4, left: "50%", transform: "translateX(-50%)" },
  { bottom: -4, right: -4 },
];

export function DraggableCollage({
  images,
  className = "",
}: DraggableCollageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const reduced = useReducedMotion();
  const zRef = useRef(0);

  const dragRef = useRef<{
    idx: number;
    pointerId: number;
    grabOffsetX: number;
    grabOffsetY: number;
    containerLeft: number;
    containerTop: number;
    lastTime: number;
    lastX: number;
    lastY: number;
    vx: number;
    vy: number;
  } | null>(null);

  const momentumRef = useRef<
    Array<{ vx: number; vy: number; raf: number | null }>
  >([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const W = rect.width;
    const H = rect.height;

    const isNarrow = W < 520;
    const dispWBase = isNarrow ? 90 : 230;

    const offsetsX = CLUSTER_OFFSETS.map((o) => o.ox);
    const minOx = Math.min(...offsetsX);
    const maxOx = Math.max(...offsetsX);

    // Anchor the cluster to the container's right edge with breathing room so
    // it doesn't crash into the viewport wall on wide screens.
    const rightPad = isNarrow ? 8 : Math.max(120, W * 0.08);
    const rightExtent = maxOx * dispWBase + dispWBase / 2;
    const cx = W - rightPad - rightExtent;
    // Vertically centered within the container.
    const cy = H * 0.5;

    // Clamp cx so the leftmost photo doesn't push past the container's left edge.
    const leftExtent = -minOx * dispWBase + dispWBase / 2;
    const minCx = leftExtent + 8;
    const finalCx = Math.max(cx, minCx);

    const next: Photo[] = images.map((img, i) => {
      const dispW = img.displayWidth ?? dispWBase;
      const dispH = (img.height / img.width) * dispW;
      const off = CLUSTER_OFFSETS[i] ?? { ox: 0, oy: 0 };
      const jitterX = (Math.random() - 0.5) * 24;
      const jitterY = (Math.random() - 0.5) * 24;
      const x = finalCx + off.ox * dispW + jitterX - dispW / 2;
      const y = cy + off.oy * dispH + jitterY - dispH / 2;

      return {
        src: img.src,
        alt: img.alt,
        width: dispW,
        height: dispH,
        x,
        y,
        rotation: 0,
        z: i + 1,
      };
    });

    zRef.current = images.length;
    momentumRef.current = images.map(() => ({ vx: 0, vy: 0, raf: null }));
    setPhotos(next);
  }, [images]);

  useEffect(() => {
    return () => {
      momentumRef.current.forEach((m) => {
        if (m.raf != null) cancelAnimationFrame(m.raf);
      });
    };
  }, []);

  useEffect(() => {
    if (selectedIndex == null) return;
    const onWindowPointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest(`[${COLLAGE_PHOTO_ATTR}]`)) return;
      setSelectedIndex(null);
    };
    window.addEventListener("pointerdown", onWindowPointerDown, true);
    return () =>
      window.removeEventListener("pointerdown", onWindowPointerDown, true);
  }, [selectedIndex]);

  const cancelMomentum = (i: number) => {
    const m = momentumRef.current[i];
    if (m && m.raf != null) {
      cancelAnimationFrame(m.raf);
      m.raf = null;
    }
  };

  const startMomentum = useCallback((i: number, vx: number, vy: number) => {
    const m = momentumRef.current[i];
    if (!m) return;
    m.vx = vx;
    m.vy = vy;

    const friction = 0.9;
    const minVel = 0.08;

    const tick = () => {
      const photo = momentumRef.current[i];
      if (!photo) return;
      photo.vx *= friction;
      photo.vy *= friction;
      const dx = photo.vx;
      const dy = photo.vy;

      setPhotos((prev) => {
        const p = prev[i];
        if (!p) return prev;
        const next = prev.slice();
        next[i] = { ...p, x: p.x + dx, y: p.y + dy };
        return next;
      });

      if (Math.abs(photo.vx) < minVel && Math.abs(photo.vy) < minVel) {
        photo.raf = null;
        return;
      }
      photo.raf = requestAnimationFrame(tick);
    };

    m.raf = requestAnimationFrame(tick);
  }, []);

  const handlePointerDown =
    (i: number) => (e: React.PointerEvent<HTMLDivElement>) => {
      e.preventDefault();
      cancelMomentum(i);
      e.currentTarget.setPointerCapture(e.pointerId);

      const container = containerRef.current;
      const photo = photos[i];
      if (!container || !photo) return;
      const rect = container.getBoundingClientRect();

      zRef.current += 1;
      const nextZ = zRef.current;
      setSelectedIndex(i);
      setPhotos((prev) =>
        prev.map((p, idx) => (idx === i ? { ...p, z: nextZ } : p)),
      );

      dragRef.current = {
        idx: i,
        pointerId: e.pointerId,
        grabOffsetX: e.clientX - rect.left - photo.x,
        grabOffsetY: e.clientY - rect.top - photo.y,
        containerLeft: rect.left,
        containerTop: rect.top,
        lastTime: performance.now(),
        lastX: e.clientX,
        lastY: e.clientY,
        vx: 0,
        vy: 0,
      };
    };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;

    const newX = e.clientX - drag.containerLeft - drag.grabOffsetX;
    const newY = e.clientY - drag.containerTop - drag.grabOffsetY;

    const now = performance.now();
    const dt = Math.max(now - drag.lastTime, 1);
    drag.vx = ((e.clientX - drag.lastX) / dt) * 16;
    drag.vy = ((e.clientY - drag.lastY) / dt) * 16;
    drag.lastTime = now;
    drag.lastX = e.clientX;
    drag.lastY = e.clientY;

    setPhotos((prev) => {
      const p = prev[drag.idx];
      if (!p) return prev;
      const next = prev.slice();
      next[drag.idx] = { ...p, x: newX, y: newY };
      return next;
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    if (!reduced) startMomentum(drag.idx, drag.vx, drag.vy);
    dragRef.current = null;
  };

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 ${className}`}
      aria-hidden="true"
    >
      {photos.map((p, i) => {
        const isSelected = selectedIndex === i;
        return (
          <div
            key={i}
            {...{ [COLLAGE_PHOTO_ATTR]: "" }}
            className="pointer-events-none md:pointer-events-auto absolute left-0 top-0 cursor-grab touch-none select-none transition-opacity duration-[600ms] ease-out will-change-transform active:cursor-grabbing"
            style={{
              width: p.width,
              height: p.height,
              transform: `translate3d(${p.x}px, ${p.y}px, 0) rotate(${p.rotation}deg)`,
              zIndex: p.z,
              opacity: photos.length ? 1 : 0,
            }}
            onPointerDown={handlePointerDown(i)}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.src}
              alt={p.alt}
              draggable={false}
              loading="lazy"
              decoding="async"
              className="pointer-events-none block h-full w-full select-none object-cover"
            />
            {isSelected ? <SelectionOverlay /> : null}
          </div>
        );
      })}
    </div>
  );
}

function SelectionOverlay() {
  // Eight handles around the photo: four corners + four edge midpoints.
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{ outline: `1.5px solid ${SELECTION_COLOR}`, outlineOffset: 0 }}
    >
      {/* "Image" label, Figma-style, anchored at the top-left of the selection */}
      <div
        className="absolute font-body leading-none text-white"
        style={{
          top: -18,
          left: -1,
          background: SELECTION_COLOR,
          padding: "2px 6px",
          fontSize: 10,
          letterSpacing: 0.2,
          borderRadius: 2,
        }}
      >
        Image
      </div>

      {/* Corner + edge handles */}
      {SELECTION_HANDLES.map((pos, i) => (
        <span
          key={i}
          className="absolute block"
          style={{
            width: 7,
            height: 7,
            background: "#ffffff",
            border: `1px solid ${SELECTION_COLOR}`,
            boxSizing: "border-box",
            ...pos,
          }}
        />
      ))}
    </div>
  );
}
