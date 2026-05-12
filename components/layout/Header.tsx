"use client";

import Link from "next/link";
import { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useHeaderTheme } from "@/hooks/useHeaderTheme";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { scrollToElement } from "@/lib/lenis-instance";
import { gsap } from "@/lib/animation/gsap-bridge";

export interface HeaderProps {
  resumeHref?: string;
}

const RESUME_HREF =
  "https://docs.google.com/document/d/1f4EVMSNDu_NrEU4Axu0dXh3ia4vTFwXYB5Vm6wIa4no/edit?usp=sharing";

export function Header({ resumeHref = RESUME_HREF }: HeaderProps) {
  const theme = useHeaderTheme();
  const reduced = useReducedMotion();
  const pathname = usePathname();
  const router = useRouter();

  const isDark = theme === "dark";
  const transition = reduced ? "none" : "color 0.4s ease, filter 0.4s ease";

  const handleLogoClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (pathname === "/") return;
      e.preventDefault();
      const content = document.getElementById("page-content");
      if (!reduced && content) {
        gsap.killTweensOf(content);
        gsap.to(content, {
          opacity: 0,
          y: -20,
          duration: 0.35,
          ease: "power2.in",
          onComplete: () => router.push("/"),
        });
      } else {
        router.push("/");
      }
    },
    [pathname, reduced, router]
  );

  const handlePortfolioClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (pathname !== "/") return;
      e.preventDefault();
      scrollToElement(document.getElementById("work"), reduced);
    },
    [pathname, reduced]
  );

  return (
    <header className="fixed top-0 right-0 left-0 z-50">
      <nav
        aria-label="Primary"
        className="mx-auto flex w-full max-w-[1640px] items-center justify-between px-6 py-8 md:px-14 md:py-[54px]"
      >
        <Link
          href="/"
          onClick={handleLogoClick}
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
              onClick={handlePortfolioClick}
              className="font-medium transition-colors hover:text-accent-magenta"
            >
              Portfolio
            </Link>
          </li>
          <li>
            <a
              href={resumeHref}
              target="_blank"
              rel="noopener noreferrer"
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
