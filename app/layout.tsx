import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { PageTransition } from "@/components/layout/PageTransition";
import { SmoothScroller } from "@/components/layout/SmoothScroller";
import { CollaborativeCursor } from "@/components/ui/collaborative-cursor";
import { PageLoader } from "@/components/ui/PageLoader";
import {
  elza,
  gallient,
  gochi,
  sofia,
  sofiaCondensed,
} from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: "Rotash Shrestha — Strategy, Design, Interaction",
  description:
    "Portfolio of Rotash Shrestha: product strategy, design systems, and interactive experiences.",
};

const fontVars = [
  gallient.variable,
  elza.variable,
  sofia.variable,
  sofiaCondensed.variable,
  gochi.variable,
].join(" ");

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVars}>
      <body suppressHydrationWarning className="bg-ink font-body text-paper antialiased">
        <PageLoader />
        <CollaborativeCursor />
        <SmoothScroller>
          <Header />
          <main id="main">
            <PageTransition>{children}</PageTransition>
          </main>
        </SmoothScroller>
      </body>
    </html>
  );
}
