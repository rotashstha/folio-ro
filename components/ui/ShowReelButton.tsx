"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface ShowReelButtonProps {
  /** Public path to the showreel video (e.g. "/videos/showreel.mp4"). */
  src?: string;
  /** Optional poster image shown before the video plays. */
  poster?: string;
  /** Text displayed under the play icon. */
  label?: string;
  /** Handwritten tag above the button. */
  tagline?: string;
}

export function ShowReelButton({
  src = "/videos/showreel.mp4",
  poster,
  label = "SHOW REEL 2026",
  tagline = "What I'm up to?",
}: ShowReelButtonProps) {
  const [open, setOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);

  const close = useCallback(() => {
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) {
      if (wasOpenRef.current) buttonRef.current?.focus({ preventScroll: true });
      wasOpenRef.current = false;
      return;
    }
    wasOpenRef.current = true;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    videoRef.current?.play().catch(() => {});
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Play ${label}`}
        className="group pointer-events-auto relative flex flex-col items-end gap-2 text-paper outline-none focus-visible:ring-2 focus-visible:ring-accent-magenta focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
      >
        <span
          className="font-accent text-[22px] leading-none text-paper/95 md:text-[26px]"
          aria-hidden="true"
        >
          {tagline}
        </span>
        <span className="flex items-center gap-2">
          <PlayIcon className="h-[22px] w-[22px] text-accent-magenta transition-transform duration-300 group-hover:scale-110 md:h-[26px] md:w-[26px]" />
          <span className="font-body text-[15px] font-semibold tracking-[0.12em] uppercase md:text-[18px]">
            {label}
          </span>
        </span>
      </button>

      {open && createPortal(
            <div
              role="dialog"
              aria-modal="true"
              aria-label={label}
              className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-sm"
              onClick={close}
            >
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); close(); }}
                aria-label="Close showreel"
                className="absolute top-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none md:top-10 md:right-10"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
              <video
                ref={videoRef}
                src={src}
                poster={poster}
                controls
                playsInline
                preload="metadata"
                className="max-h-[90vh] max-w-[92vw] rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </div>,
            document.body
          )}
    </>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 8.5v7l6-3.5-6-3.5Z" fill="currentColor" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
