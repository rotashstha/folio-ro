/**
 * Crosshatch grid backdrop for case-study heros — mirrors the homepage Hero
 * pattern so the project pages share the same visual language. The grid lines
 * are 1px at rgba(255,255,255,0.06) on a 96px (desktop) / 64px (mobile) cell,
 * defined as the `.hero-grid` @utility in globals.css. A radial-gradient
 * vignette layers on top to focus attention toward the centre.
 *
 * Render this as the first child of a hero section that has `relative` set.
 * Both layers are pointer-events: none so they never intercept clicks/drags.
 */
export function HeroGrid() {
  return (
    <>
      <div
        className="hero-grid pointer-events-none absolute inset-0"
        aria-hidden="true"
      />
      <div
        className="hero-vignette pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.6)_100%)]"
        aria-hidden="true"
      />
    </>
  );
}
