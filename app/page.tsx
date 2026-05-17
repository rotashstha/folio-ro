import { AIChatInterface } from "@/components/ai-chat/AIChatInterface";
import { Collaboration } from "@/components/sections/Collaboration";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Leadership } from "@/components/sections/Leadership";
import { Strategy } from "@/components/sections/Strategy";
import { Work } from "@/components/sections/Work";
import { MarqueeStrip } from "@/components/ui/MarqueeStrip";
import { placeholderProjects } from "@/lib/projects";

export default function HomePage() {
  return (
    <>
      {/* All sections live above the fixed footer with z-10 + bg-ink so they
          fully occlude it. The footer reveals from below as the page scrolls
          past the spacer at the end. */}
      <div className="relative z-10 bg-ink">
        <Hero />
        <Work projects={placeholderProjects} />
        <MarqueeStrip text="CONNECTING PEOPLE THROUGH DESIGN AND TECHNOLOGY TO CREATE MEANINGFUL EXPERIENCES." />
        <AIChatInterface />
        <Leadership />
        <Strategy />
        <Collaboration />
      </div>
      {/* Transparent spacer — provides scroll room for the footer to peel into view */}
      <div className="relative h-svh w-full" aria-hidden="true" />
      <Footer />
    </>
  );
}
