/**
 * Centred full-screen notice used by the passcode gate and the external
 * hand-off page, so the two screens (which render back to back) share one
 * layout and never drift apart.
 */

export const NOTICE_BUTTON =
  "w-full rounded-full bg-paper px-5 py-3 text-[15px] font-bold text-ink transition-opacity hover:opacity-85";

interface CaseStudyNoticeProps {
  eyebrow: string;
  title: string;
  body: React.ReactNode;
  children?: React.ReactNode;
}

export function CaseStudyNotice({ eyebrow, title, body, children }: CaseStudyNoticeProps) {
  return (
    <main
      data-theme="dark"
      className="font-body flex min-h-screen flex-col items-center justify-center bg-ink px-6 text-paper"
    >
      <div className="w-full max-w-[360px] text-center">
        <p className="font-sans text-[12px] tracking-[0.18em] uppercase text-paper/45">{eyebrow}</p>
        <h1 className="font-body mt-3 text-[28px] leading-tight font-bold text-paper md:text-[34px]">
          {title}
        </h1>
        <p className="font-body mt-3 text-[15px] leading-[1.5] text-paper/60">{body}</p>
        {children}
      </div>
    </main>
  );
}
