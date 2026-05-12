# Gallient

Drop `Gallient-Regular.woff2` into this directory, then swap `lib/fonts.ts` to
use `next/font/local` per the commented block at the top of that file.

`.woff2` files in this directory are imported at build time by `next/font/local`.
They are NOT served from `/public` — Next hashes them and handles preloading
automatically.

Do not commit the font file unless the license permits redistribution.
