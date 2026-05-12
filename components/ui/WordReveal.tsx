"use client";

import { Children, useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface WordRevealProps {
  children: React.ReactNode;
  className?: string;
  staggerMs?: number;
  durationMs?: number;
  threshold?: number;
}

interface Token {
  key: string;
  word: string;
  bold: boolean;
  light: boolean;
  extraClass: string;
}

// Pull color classes (text-white, text-accent-*, text-white/95, etc.) but
// skip arbitrary values like text-[28px] so font-size doesn't leak onto
// every word span. The optional `/N` tail keeps Tailwind opacity modifiers.
const COLOR_CLASS_RE = /\btext-(?!\[)[a-z][\w-]*(?:\/\d+)?/g;

function tokenize(
  node: React.ReactNode,
  bold = false,
  light = false,
  extraClass = "",
  prefix = "0",
): Token[] {
  const out: Token[] = [];

  Children.forEach(Children.toArray(node), (child, idx) => {
    const keyBase = `${prefix}-${idx}`;

    if (typeof child === "string" || typeof child === "number") {
      const text = String(child);
      const parts = text.split(/(\s+)/);
      parts.forEach((part, partIdx) => {
        if (!part || /^\s+$/.test(part)) return;
        out.push({ key: `${keyBase}-${partIdx}`, word: part, bold, light, extraClass });
      });
      return;
    }

    if (child && typeof child === "object" && "props" in child) {
      const el = child as React.ReactElement<{ children?: React.ReactNode; className?: string }>;
      const cls = el.props.className ?? "";
      const childBold = bold || /\bfont-bold\b/.test(cls) || el.type === "strong" || el.type === "b";
      const childLight = light || /\bfont-light\b/.test(cls);
      const colorMatch = cls.match(COLOR_CLASS_RE)?.join(" ") ?? "";
      const childExtra = [extraClass, colorMatch].filter(Boolean).join(" ");
      out.push(...tokenize(el.props.children, childBold, childLight, childExtra, keyBase));
    }
  });

  return out;
}

export function WordReveal({
  children,
  className,
  staggerMs = 40,
  durationMs = 600,
  threshold = 0.25,
}: WordRevealProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);

  const tokens = useMemo(() => tokenize(children), [children]);

  useEffect(() => {
    if (reduced) {
      setVisible(true);
      return;
    }
    const node = containerRef.current;
    if (!node) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        });
      },
      { threshold }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [reduced, threshold]);

  return (
    <span ref={containerRef} className={className}>
      {tokens.map((tok, i) => {
        const weightClass = tok.bold ? "font-bold" : tok.light ? "font-light" : "";
        const finalClass = [weightClass, tok.extraClass].filter(Boolean).join(" ");
        return (
          <span key={tok.key} style={{ display: "inline-block", whiteSpace: "pre" }}>
            <span
              className={finalClass}
              style={{
                display: "inline-block",
                opacity: visible || reduced ? 1 : 0,
                transform: visible || reduced ? "none" : "translateY(0.5em)",
                transition: reduced
                  ? "none"
                  : `opacity ${durationMs}ms cubic-bezier(0.16,1,0.3,1) ${i * staggerMs}ms, transform ${durationMs}ms cubic-bezier(0.16,1,0.3,1) ${i * staggerMs}ms`,
                willChange: "opacity, transform",
              }}
            >
              {tok.word}
            </span>
            {i < tokens.length - 1 ? " " : ""}
          </span>
        );
      })}
    </span>
  );
}
