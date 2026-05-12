"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

interface FadeRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

export function FadeReveal({ children, className, delay = 0, y = 32 }: FadeRevealProps) {
  const ref = useScrollReveal<HTMLDivElement>({ delay, y });
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
