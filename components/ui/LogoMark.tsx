"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";

interface LogoMarkProps {
  className?: string;
  color?: string;
}

export function LogoMark({ className = "", color = "white" }: LogoMarkProps) {
  const reduced = useReducedMotion();

  const sharedStyle = reduced
    ? {}
    : {
        strokeDasharray: 1,
        strokeDashoffset: 1,
        fillOpacity: 0,
      };

  return (
    <>
      {!reduced && (
        <style>{`
          @keyframes logo-draw {
            to { stroke-dashoffset: 0; }
          }
          @keyframes logo-fill {
            to { fill-opacity: 1; }
          }
          .logo-p1 {
            stroke-dasharray: 1;
            stroke-dashoffset: 1;
            fill-opacity: 0;
            animation:
              logo-draw 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards 0.05s,
              logo-fill 0.35s ease forwards 0.65s;
          }
          .logo-p2 {
            stroke-dasharray: 1;
            stroke-dashoffset: 1;
            fill-opacity: 0;
            animation:
              logo-draw 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards 0.18s,
              logo-fill 0.35s ease forwards 0.78s;
          }
        `}</style>
      )}
      <svg
        viewBox="0 0 51.4491 51"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden
        style={{ color }}
      >
        <path
          className={reduced ? undefined : "logo-p1"}
          pathLength={1}
          d="M7.49047 11.741L0.874454 0.5H43.7442L50.8745 13.0899L46.3926 21.0035H33.2958L38.5416 11.741H7.49047Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="0.8"
          style={sharedStyle}
        />
        <path
          className={reduced ? undefined : "logo-p2"}
          pathLength={1}
          d="M22.9278 15.0684L16.5765 25.7699L30.2495 50.5H43.2169L22.9278 15.0684Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="0.8"
          style={sharedStyle}
        />
      </svg>
    </>
  );
}
