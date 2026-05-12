import { StatCounter } from "@/components/ui/StatCounter";
import { FadeReveal } from "@/components/ui/FadeReveal";
import { LineReveal } from "@/components/ui/LineReveal";

export interface LeadershipHighlight {
  label: string;
}

export interface LeadershipProps {
  heading?: string;
  intro?: string;
  highlights?: LeadershipHighlight[];
  mentorshipLead?: string;
  mentorshipCopy?: string;
  deiLead?: string;
  deiCopy?: string;
}

const defaultHighlights: LeadershipHighlight[] = [
  { label: "Lecturer (part-time) at Monash University for the UX/UI and Multimedia program" },
  { label: "Mentor at adplist.org — a global mentorship community for design and product professionals" },
  { label: "Interviewed 37 candidates for design teams at Slalom (on-going)" },
  { label: "Leading the Accelerated AI Initiative at Slalom Australia to integrate AI tools into the existing workflow" },
  { label: "Provided 1:1 pro-bono mentorship to 15+ designers (on-going)" },
];

export function Leadership({
  heading = "Leadership",
  intro = "Shipping products is rewarding, but what I find even more meaningful is helping others grow. I offer pro-bono mentorship to early-career designers and people transitioning into UX, supporting them as they take their first steps into the industry.",
  highlights = defaultHighlights,
  mentorshipLead = "Pro-bono mentorship sessions",
  mentorshipCopy = "Hold weekly 1:1's with designers to help educate, guide and assess design process, communication and execution.",
  deiLead = "Trained on DEI in Design",
  deiCopy = "Trained and delivered 250+ new students on Diversity, Equity and Inclusion in Design topics as part of my teaching associate role at Monash University.",
}: LeadershipProps) {
  return (
    <section
      id="leadership"
      data-theme="light"
      aria-label="Leadership and community"
      className="bg-paper text-ink relative overflow-hidden pb-24 md:pb-32"
    >
      <div className="relative mx-auto w-full max-w-[1640px] px-6 md:px-14">
        <h2
          aria-label={heading}
          className="font-display select-none text-left text-[16vw] leading-[0.85] text-black md:text-[22vw] xl:text-[300px]"
        >
          {heading}
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-14 md:mt-20 md:grid-cols-12 md:gap-[60px]">
          <div className="md:col-span-5">
            <p className="font-body max-w-[500px] text-[22px] font-bold leading-tight text-black md:text-[30px] md:leading-[1.18]">
              {intro}
            </p>
          </div>

          <div className="md:col-span-3">
            <FadeReveal>
            <p className="font-body text-[70px] font-extrabold leading-none text-black md:text-[90px]">
              <StatCounter value={15} suffix="+" />
            </p>
            <p className="font-body-condensed mt-6 text-[20px] font-bold text-black md:text-[24px]">
              {mentorshipLead}
            </p>
            <p className="font-body-condensed mt-1 text-[18px] text-black md:text-[24px] md:leading-[1.35]">
              {mentorshipCopy}
            </p>
            </FadeReveal>
          </div>

          <div className="md:col-span-4">
            <FadeReveal delay={0.1}>
            <p className="font-body text-[70px] font-extrabold leading-none text-black md:text-[90px]">
              <StatCounter value={250} />
            </p>
            <p className="font-body-condensed mt-6 text-[20px] font-bold text-black md:text-[24px]">
              {deiLead}
            </p>
            <p className="font-body-condensed mt-1 text-[18px] text-black md:text-[24px] md:leading-[1.35]">
              {deiCopy}
            </p>
            </FadeReveal>
          </div>

          <div className="md:col-span-7 md:col-start-6">
            <p className="font-body text-[20px] font-extrabold text-black md:text-[24px]">
              Highlights
            </p>
            <ul className="mt-4">
              {highlights.map((item, i) => (
                <li key={item.label} className="font-body-condensed py-[10px] text-[16px] text-black md:text-[18px] md:leading-[1.5]">
                  <LineReveal delay={i * 0.08}>
                    {item.label}
                  </LineReveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
