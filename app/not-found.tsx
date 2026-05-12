import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="font-accent text-accent-magenta text-2xl">404</p>
      <h1 className="font-display text-5xl md:text-7xl">Page not found</h1>
      <p className="max-w-md text-base text-ink/70">
        That page isn&apos;t here. Try the homepage or jump back to the work.
      </p>
      <Link
        href="/"
        className="border-ink hover:bg-ink hover:text-paper rounded-full border px-6 py-3 text-sm uppercase tracking-wider transition-colors"
      >
        Back to homepage
      </Link>
    </section>
  );
}
