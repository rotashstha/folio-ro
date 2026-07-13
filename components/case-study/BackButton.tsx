"use client";

import Link from "next/link";
import { useHeaderTheme } from "@/hooks/useHeaderTheme";

export function BackButton() {
  const isDark = useHeaderTheme() === "dark";

  return (
    <Link
      href="/#work"
      data-cursor-trigger="Back"
      aria-label="Back to work"
      className={`group inline-flex items-center gap-2 rounded-full border px-4 py-2 font-body text-[13px] font-medium uppercase tracking-[0.1em] backdrop-blur-md backdrop-saturate-150 transition-colors ${
        isDark
          ? "border-white/25 bg-white/[0.06] text-white hover:bg-white/[0.12]"
          : "border-black/20 bg-black/[0.04] text-[#0a0a0a] hover:bg-black/[0.08]"
      }`}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
        className="transition-transform duration-300 group-hover:-translate-x-0.5"
      >
        <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Back
    </Link>
  );
}
