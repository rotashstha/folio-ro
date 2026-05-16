"use client";

import { useCallback, useEffect, useState } from "react";

export type Theme = "dark" | "light";
const STORAGE_KEY = "portfolio-theme";
const DEFAULT: Theme = "dark";

function readRootTheme(): Theme {
  const v = document.documentElement.getAttribute("data-theme");
  return v === "light" ? "light" : "dark";
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(DEFAULT);

  useEffect(() => {
    // Sync with what the no-flash inline script already applied
    setThemeState(readRootTheme());

    const handleStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return;
      const next = e.newValue === "light" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      setThemeState(next);
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const setTheme = useCallback((next: Theme) => {
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem(STORAGE_KEY, next);
    setThemeState(next);
  }, []);

  return { theme, setTheme };
}
