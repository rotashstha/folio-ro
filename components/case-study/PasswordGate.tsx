"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "cs-unlocked";

interface PasswordGateProps {
  /** The passcode that unlocks the content. */
  password: string;
  /** Name shown on the lock screen, e.g. "Healthdirect". */
  projectName: string;
  children: React.ReactNode;
}

/**
 * Soft passcode gate for protected case studies. This is a client-side gate,
 * not real security: it keeps casual visitors out, but the content and the
 * passcode still live in the bundle. Unlocking once (correct passcode) is
 * remembered for the browser session and applies to every gated case study.
 */
export function PasswordGate({
  password,
  projectName,
  children,
}: PasswordGateProps) {
  const [unlocked, setUnlocked] = useState(false);
  const [ready, setReady] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") setUnlocked(true);
    } catch {
      // sessionStorage unavailable (private mode etc.) — stay locked.
    }
    setReady(true);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (value.trim() === password) {
      setUnlocked(true);
      setError(false);
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        // ignore — still unlocked for this render.
      }
    } else {
      setError(true);
    }
  }

  // Avoid a flash of the lock screen for already-unlocked visitors.
  if (!ready) {
    return (
      <div data-theme="dark" className="min-h-screen bg-ink" aria-hidden="true" />
    );
  }

  if (unlocked) return <>{children}</>;

  return (
    <main
      data-theme="dark"
      className="font-body flex min-h-screen flex-col items-center justify-center bg-ink px-6 text-paper"
    >
      <div className="w-full max-w-[360px] text-center">
        <p className="font-sans text-[12px] tracking-[0.18em] uppercase text-paper/45">
          Protected case study
        </p>
        <h1 className="font-body mt-3 text-[28px] leading-tight font-bold text-paper md:text-[34px]">
          {projectName}
        </h1>
        <p className="font-body mt-3 text-[15px] leading-[1.5] text-paper/60">
          This case study is password protected. Enter the passcode to view it.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3">
          <label htmlFor="cs-passcode" className="sr-only">
            Passcode
          </label>
          <input
            id="cs-passcode"
            type="password"
            inputMode="numeric"
            autoComplete="off"
            autoFocus
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (error) setError(false);
            }}
            placeholder="Passcode"
            aria-invalid={error}
            className={`w-full rounded-full border bg-paper/[0.04] px-5 py-3 text-center text-[16px] text-paper placeholder:text-paper/35 outline-none transition-colors focus:border-accent-magenta ${
              error ? "border-accent-magenta" : "border-paper/15"
            }`}
          />
          <button
            type="submit"
            className="w-full rounded-full bg-paper px-5 py-3 text-[15px] font-bold text-ink transition-opacity hover:opacity-85"
          >
            Unlock
          </button>
          <p
            role="alert"
            className={`font-body text-[13px] text-accent-magenta transition-opacity ${
              error ? "opacity-100" : "opacity-0"
            }`}
          >
            Incorrect passcode. Try again.
          </p>
        </form>

        <a
          href="/#work"
          className="font-sans mt-2 inline-block text-[12px] tracking-[0.14em] uppercase text-paper/45 transition-colors hover:text-paper"
        >
          ← Back to work
        </a>
      </div>
    </main>
  );
}
