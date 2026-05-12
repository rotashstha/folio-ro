# Elza

Drop `Elza-Regular.woff2` and `Elza-Semibold.woff2` into this directory, then
swap `lib/fonts.ts` to use `next/font/local`:

```ts
import localFont from "next/font/local";

export const elza = localFont({
  src: [
    { path: "../app/fonts/elza/Elza-Regular.woff2",  weight: "400", style: "normal" },
    { path: "../app/fonts/elza/Elza-Semibold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-elza",
  display: "swap",
});
```

Do not commit the font files unless the license permits redistribution.
