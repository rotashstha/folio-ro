"use client";

import Link from "next/link";
import { useCallback } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { scrollToElement } from "@/lib/lenis-instance";
import {
  DraggableCollage,
  type CollageImage,
} from "@/components/sections/DraggableCollage";

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterProps {
  wordmark?: string;
  links?: FooterLink[];
}

const defaultLinks: FooterLink[] = [
  {
    label: "Linkedin",
    href: "https://www.linkedin.com/in/rotash/",
    external: true,
  },
  {
    label: "Github",
    href: "https://github.com/rotashstha",
    external: true,
  },
  {
    label: "Resume",
    href: "https://docs.google.com/document/d/1f4EVMSNDu_NrEU4Axu0dXh3ia4vTFwXYB5Vm6wIa4no/edit?usp=sharing",
    external: true,
  },
];

const collageImages: CollageImage[] = [
  { src: "/images/footer/photo-1.png", alt: "", width: 540, height: 558 },
  { src: "/images/footer/photo-2.png", alt: "", width: 472, height: 516 },
  { src: "/images/footer/photo-3.png", alt: "", width: 532, height: 554 },
  { src: "/images/footer/photo-4.png", alt: "", width: 540, height: 558 },
  { src: "/images/footer/wedding.png", alt: "", width: 540, height: 558 },
];

const LINK_CLASSES =
  "font-body group inline-flex items-center gap-3 text-[18px] font-semibold text-ink md:text-[20px]";

function ArrowRight() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M5 12h14M13 5l7 7-7 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowUp() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M12 19V5M5 12l7-7 7 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Footer({
  wordmark = "ROTASH SHRESTHA",
  links = defaultLinks,
}: FooterProps) {
  const reduced = useReducedMotion();

  const handleBackToTop = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const hero = document.getElementById("hero");
    if (hero) {
      scrollToElement(hero, reduced);
    } else {
      window.scrollTo({ top: 0, behavior: reduced ? "instant" : "smooth" });
    }
  }, [reduced]);

  return (
    <footer
      id="footer"
      data-theme="light"
      data-theme-fixed
      aria-labelledby="footer-heading"
      className="bg-paper text-ink fixed bottom-0 left-0 right-0 z-0 flex h-svh w-full flex-col justify-between overflow-hidden pb-10 md:pb-12"
    >
      <h2 id="footer-heading" className="sr-only">
        Get in touch
      </h2>

      {/* Draggable photo collage — full width on desktop, right column on mobile so it can't sit behind the CTAs. */}
      <DraggableCollage
        images={collageImages}
        className="left-[38%] md:left-0"
      />

      {/* Marquee wordmark — animated horizontal scroll */}
      <div
        className="relative z-10 overflow-hidden pt-16 md:pt-20"
        aria-hidden="true"
        role="presentation"
      >
        <div className="flex w-max animate-marquee">
          {[0, 1].map((n) => (
            <p
              key={n}
              className="font-body whitespace-nowrap text-[18vw] font-extrabold leading-none text-ink select-none md:text-[150px]"
            >
              {wordmark}
              <span className="px-6">–</span>
              {wordmark}
              <span className="px-6">–</span>
            </p>
          ))}
        </div>
      </div>

      {/* Links */}
      <div className="relative z-10 w-full px-6">
        <ul data-cursor-target="footer-links" className="space-y-4 md:space-y-5">
          {links.map((link) => (
            <li key={link.label}>
              {link.external ? (
                <a
                  href={link.href}
                  rel="noopener noreferrer"
                  target="_blank"
                  className={LINK_CLASSES}
                >
                  <span className="hover-underline">{link.label}</span>
                  <ArrowRight />
                </a>
              ) : (
                <Link href={link.href} className={LINK_CLASSES}>
                  <span className="hover-underline">{link.label}</span>
                  <ArrowRight />
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Copyright bar */}
      <div className="relative z-10 w-full px-6">
        <div className="border-t border-black/20" />
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="font-body text-[16px] text-ink/60 md:text-[18px]">
            © {new Date().getFullYear()} Rotash Shrestha
          </p>
          <a
            href="#hero"
            onClick={handleBackToTop}
            className="font-body inline-flex items-center gap-3 text-[16px] text-ink/60 transition-colors hover:text-ink md:text-[18px]"
          >
            <ArrowUp />
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
