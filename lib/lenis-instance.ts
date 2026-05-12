import type Lenis from "lenis";

export const lenisInstance: { current: Lenis | null } = { current: null };

export function scrollToElement(
  target: HTMLElement | null,
  reduced: boolean
): void {
  if (!target) return;
  if (reduced || !lenisInstance.current) {
    target.scrollIntoView({ behavior: reduced ? "instant" : "smooth" });
    return;
  }
  lenisInstance.current.scrollTo(target);
}
