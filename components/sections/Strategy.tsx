import Image from "next/image";
import { FadeReveal } from "@/components/ui/FadeReveal";

interface StrategyCase {
  title: string;
  intro: string;
  client: string;
  year: string;
  body: string[];
  image: { src: string; alt: string };
  reverse?: boolean;
}

export interface StrategyProps {
  heading?: string;
  lead?: string;
  subLead?: string;
  cases?: StrategyCase[];
}

const defaultCases: StrategyCase[] = [
  {
    title: "Functional framework",
    intro:
      "Define high level functional flows and map out data elements to help engineers in building the data schemas and app framework.",
    client: "Client: Atlas Carbon",
    year: "Year: 2025",
    body: [
      "For Atlas Carbon, I translated messy real-world behaviour into a functional system model. Through interviews, field shadowing, and rapid prototypes, I identified the actions, rules, and data relationships farmers needed across grazing, paddock planning, and livestock management.",
      "This functional framework became the backbone for the MVP — aligning engineering on schema, shaping the navigation model, and guiding decisions on what to automate, simplify, or completely reinvent.",
    ],
    image: {
      src: "/images/figma/strategy-chatbot-flow.png",
      alt: "Functional framework diagram for Atlas Carbon",
    },
  },
  {
    title: "Journey map",
    intro:
      "Define high level functional flows and map out data elements to help engineers in building the data schemas and app framework.",
    client: "Client: Virtus Health",
    year: "Year: Oct – Nov 2025 (6 Weeks discovery)",
    body: [
      "At Virtus Health, I used journey mapping to make staff experience visible. I led discovery workshops and 1:1 sessions with clinicians, nurses, and admin teams to surface operational pain points that impacted both staff and patients.",
      "By visualising the full patient and staff journey, we uncovered bottlenecks, emotional moments, and systemic breakdowns — giving the organisation a clear, human-centred foundation for redesigning their patient management tool (VPS).",
    ],
    image: {
      src: "/images/figma/strategy-journey-map.png",
      alt: "Patient and staff journey map for Virtus Health",
    },
  },
  {
    title: "Change Architecture / Governance",
    intro:
      "Frequently collaborate with engineers and PMs to map out user flows and understand multi-step, cross platform information architecture and setting up ways of working.",
    client: "Client: IAG",
    year: "Year: 2023–2024",
    body: [
      "At IAG, I used flow modelling to bring structure to ambiguity. By partnering with engineers and PMs, I mapped multi-channel user journeys and operational workflows across brands, revealing hidden dependencies, decision points, and governance gaps.",
      "This approach helped teams move from assumptions to shared clarity, enabling scalable ways of working and informing how new patterns and system rules should be introduced across the design system portfolio.",
    ],
    image: {
      src: "/images/figma/strategy-governance.png",
      alt: "Governance and change architecture diagram for IAG",
    },
  },
];

function HighlightedBlock({ lines }: { lines: string[] }) {
  return (
    <div className="font-accent space-y-4 text-[17px] leading-[1.7] text-paper md:text-[19px]">
      {lines.map((paragraph) => (
        <p key={paragraph} className="max-w-[440px]">
          <span className="bg-accent-neon px-[0.1em] py-[0.08em] text-white [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">
            {paragraph}
          </span>
        </p>
      ))}
    </div>
  );
}

export function Strategy({
  heading = "Strategy",
  lead = "Design is a team sport. I help translate business strategy into product roadmaps by facilitating collaborative, in-depth conversations with cross-functional teams (XFN), as well as liaison with engineers to design a great experience.",
  subLead = "Here is a glimpse of some of the design thinking workshops I have led to uncover answers to challenging problems and inform product vision – ranging from design sprints to co-creation workshops, customer journey mapping, and more.",
  cases = defaultCases,
}: StrategyProps) {
  return (
    <section
      id="strategy"
      data-theme="dark"
      data-theme-fixed
      aria-label="Strategy methodology"
      className="bg-ink text-paper relative overflow-hidden py-24 md:py-[140px]"
    >
      <div className="relative w-full px-6">
        <h2
          aria-label={heading}
          data-cursor-target="strategy-heading"
          className="font-display pointer-events-none select-none text-[20vw] leading-[0.85] text-paper md:text-[24vw] xl:text-[300px]"
        >
          {heading}
        </h2>

        <div className="mt-12 max-w-[1200px] md:mt-20">
          <p className="font-body text-[22px] font-bold leading-tight text-paper md:text-[32px] md:leading-[1.2]">
            {lead}
          </p>
          <p className="font-body-condensed mt-8 max-w-[900px] text-[18px] text-paper md:text-[24px] md:leading-[1.5]">
            {subLead}
          </p>
        </div>

        <div className="mt-20 flex flex-col gap-20 md:gap-[60px]">
          {cases.map((c, i) => (
            <FadeReveal key={c.title} delay={0.05}>
            <article className="border-t border-paper/20 pt-12">
              <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-[60px]">
                <div className="md:col-span-5">
                  <h3 className="font-body text-[26px] font-bold leading-tight text-paper md:text-[32px]">
                    {c.title}
                  </h3>
                  <p className="font-body-condensed mt-4 max-w-[440px] text-[15px] leading-[1.5] text-paper md:text-[16px]">
                    {c.intro}
                  </p>
                  <div className="font-accent mt-10 text-[16px] leading-[1.5] text-paper md:text-[18px]">
                    <p>{c.client}</p>
                    <p>{c.year}</p>
                  </div>
                  <div className="mt-6">
                    <HighlightedBlock lines={c.body} />
                  </div>
                </div>
                <div className="md:col-span-7">
                  <div className="relative aspect-[918/555] w-full overflow-hidden">
                    <Image
                      src={c.image.src}
                      alt={c.image.alt}
                      fill
                      sizes="(min-width: 900px) 55vw, 100vw"
                      className="object-cover"
                      loading={i === 0 ? "eager" : "lazy"}
                    />
                  </div>
                </div>
              </div>
            </article>
            </FadeReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
