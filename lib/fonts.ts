import localFont from "next/font/local";
import {
  Inter_Tight,
  Sofia_Sans,
  Sofia_Sans_Condensed,
  Gochi_Hand,
} from "next/font/google";

export const gallient = localFont({
  src: [
    {
      path: "../app/fonts/gallient/GallientRegular-eZoMp.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-gallient",
  display: "swap",
});

export const elza = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-elza",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const sofia = Sofia_Sans({
  subsets: ["latin"],
  variable: "--font-sofia",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const sofiaCondensed = Sofia_Sans_Condensed({
  subsets: ["latin"],
  variable: "--font-sofia-condensed",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const gochi = Gochi_Hand({
  subsets: ["latin"],
  variable: "--font-gochi",
  display: "swap",
  weight: ["400"],
});
