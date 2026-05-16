"use client";

import { useTheme } from "@/hooks/useTheme";

function SunIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
      <line x1="12" y1="2" x2="12" y2="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="12" y1="20" x2="12" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="2" y1="12" x2="4" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="20" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface ThemeToggleProps {
  /** Colour context from the header — drives the pill's visual contrast */
  isDark: boolean;
}

export function ThemeToggle({ isDark }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const isLight = theme === "light";

  const toggle = () => setTheme(isLight ? "dark" : "light");

  // Pill dimensions
  // Width 52px · Height 28px · Circle 22px · padding 3px each side
  // Circle travel: 52 - 6 - 22 = 24px

  const pillBorder = isDark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.18)";
  const pillBg = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)";
  const circleBg = isDark ? "rgba(255,255,255,0.92)" : "rgba(0,0,0,0.88)";
  const circleColor = isDark ? "#000" : "#fff";
  const iconColor = isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.38)";

  return (
    <button
      role="switch"
      aria-checked={isLight}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      onClick={toggle}
      onKeyDown={(e) => (e.key === " " || e.key === "Enter") && toggle()}
      style={{
        width: 52,
        height: 28,
        borderRadius: 999,
        border: `1px solid ${pillBorder}`,
        background: pillBg,
        position: "relative",
        cursor: "pointer",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        padding: "0 3px",
        transition: "border-color 350ms ease, background 350ms ease",
      }}
    >
      {/* Inactive icon — moon (left) */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          left: 7,
          color: iconColor,
          transition: "color 350ms ease, opacity 350ms ease",
          opacity: isLight ? 1 : 0,
          display: "flex",
          alignItems: "center",
        }}
      >
        <MoonIcon />
      </span>

      {/* Inactive icon — sun (right) */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          right: 7,
          color: iconColor,
          transition: "color 350ms ease, opacity 350ms ease",
          opacity: isLight ? 0 : 1,
          display: "flex",
          alignItems: "center",
        }}
      >
        <SunIcon />
      </span>

      {/* Sliding circle */}
      <span
        aria-hidden
        style={{
          width: 22,
          height: 22,
          borderRadius: "50%",
          background: circleBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: circleColor,
          transform: `translateX(${isLight ? 24 : 0}px)`,
          transition:
            "transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1), background 350ms ease, color 350ms ease",
          flexShrink: 0,
          position: "relative",
          zIndex: 1,
        }}
      >
        {isLight ? <SunIcon /> : <MoonIcon />}
      </span>
    </button>
  );
}
