"use client";

import Link from "next/link";
import { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useHeaderTheme } from "@/hooks/useHeaderTheme";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { scrollToElement } from "@/lib/lenis-instance";
import { gsap } from "@/lib/animation/gsap-bridge";
import { LogoMark } from "@/components/ui/LogoMark";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

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
        className="flex w-full items-center justify-between px-6 py-8 md:py-[28px] xl:py-[36px] 2xl:py-[54px]"
      >
        <Link
          href="/"
          onClick={handleLogoClick}
          aria-label="Rotash Shrestha — homepage"
          className="block"
        >
          <LogoMark
            key={pathname}
            className="h-10 w-10 md:h-[50px] md:w-[50px]"
            color={isDark ? "white" : "black"}
          />
        </Link>
        <div className="flex items-center gap-8 md:gap-12">
          <ul
            className="font-body text-paper flex items-center gap-6 text-sm tracking-[0.08em] uppercase md:gap-10 md:text-[14px]"
            style={{ transition }}
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
          <ThemeToggle isDark={isDark} />
        </div>
      </nav>
    </header>
  );
}
