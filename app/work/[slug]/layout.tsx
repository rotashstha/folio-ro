import { CaseStudyChrome } from "@/components/case-study/CaseStudyChrome";
import { Footer } from "@/components/sections/Footer";

export default function WorkSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CaseStudyChrome>
      {/* Mirrors the homepage reveal: opaque z-10 wrapper occludes the fixed
          footer below it; the transparent h-svh spacer creates scroll room so
          the footer peels into view at the end of the page. */}
      <div className="relative z-10 bg-ink">{children}</div>
      <div className="relative h-svh w-full" aria-hidden="true" />
      <Footer />
    </CaseStudyChrome>
  );
}
