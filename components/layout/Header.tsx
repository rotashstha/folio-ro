"use client";

import Link from "next/link";
import { useHeaderTheme } from "@/hooks/useHeaderTheme";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export interface HeaderProps {
  resumeHref?: string;
}

export function Header({ resumeHref = "/resume.pdf" }: HeaderProps) {
  const theme = useHeaderTheme();
  const reduced = useReducedMotion();

  const isDark = theme === "dark";
  const transition = reduced ? "none" : "color 0.4s ease, filter 0.4s ease";

  return (
    <header className="fixed top-0 right-0 left-0 z-50">
      <nav
        aria-label="Primary"
        className="mx-auto flex w-full max-w-[1640px] items-center justify-between px-6 py-8 md:px-14 md:py-[54px]"
      >
        <Link
          href="/"
          aria-label="Rotash Shrestha — homepage"
          className="block"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/figma/logo-r.svg"
            alt=""
            width={50}
            height={50}
            className="h-10 w-10 md:h-[50px] md:w-[50px]"
            style={{
              filter: isDark ? "none" : "invert(1)",
              transition,
            }}
          />
        </Link>
        <ul
          className="font-sans flex items-center gap-10 text-base md:gap-[80px] md:text-[18px]"
          style={{ color: isDark ? "#ffffff" : "#000000", transition }}
        >
          <li>
            <Link
              href="/#work"
              className="font-medium transition-colors hover:text-accent-magenta"
            >
              Portfolio
            </Link>
          </li>
          <li>
            <a
              href={resumeHref}
              rel="noopener"
              className="font-medium transition-colors hover:text-accent-magenta"
            >
              Resume
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
