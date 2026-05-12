"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="font-accent text-accent-magenta text-2xl">Error</p>
      <h1 className="font-display text-5xl md:text-7xl">Something went wrong</h1>
      <p className="max-w-md text-base text-ink/70">
        An unexpected error occurred. Try again or head back to the homepage.
      </p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="border-ink hover:bg-ink hover:text-paper rounded-full border px-6 py-3 text-sm uppercase tracking-wider transition-colors"
        >
          Try again
        </button>
        <Link
          href="/"
          className="border-ink hover:bg-ink hover:text-paper rounded-full border px-6 py-3 text-sm uppercase tracking-wider transition-colors"
        >
          Back to homepage
        </Link>
      </div>
    </section>
  );
}
