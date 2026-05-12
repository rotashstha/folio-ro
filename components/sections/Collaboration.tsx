import {
  TestimonialBlock,
  type Testimonial,
} from "@/components/ui/TestimonialBlock";

export interface CollaborationProps {
  heading?: string;
  intro?: string;
  testimonials?: Testimonial[];
}

const defaultTestimonials: Testimonial[] = [
  {
    author: "Deepti Parvathaneni",
    role: "Software Architect, Slalom",
    paragraphs: [
      {
        segments: [
          {
            text: "Rotash has consistently shown strong abilities in both aligning design and development efforts and communicating effectively with stakeholders.",
            highlight: true,
          },
          {
            text: " He excels at collaborating with the development team to ensure that design concepts are not only visually appealing but also practical and feasible to implement.",
          },
        ],
      },
      {
        segments: [
          {
            text: "Rotash is also highly effective in stakeholder communication — proactively gathering feedback, clarifying requirements, and presenting design choices in a way that is clear and accessible to both technical and non-technical audiences. Overall, Rotash is a key contributor to the Atlas Carbon team, continually bridging the gap between design and development while keeping stakeholders informed and engaged throughout every stage of the process.",
          },
        ],
      },
    ],
  },
  {
    author: "Yu Qi",
    role: "UX Designer, Slalom (Japan)",
    paragraphs: [
      {
        segments: [
          {
            text: "Working with Rotash has been a wonderful experience. Rotash not only possesses exceptional design leadership quality but also brings a personal connection and incredible humanity to our design team.",
            highlight: true,
          },
        ],
      },
      {
        segments: [
          {
            text: "Whenever I reached out to Rotash with a design question, he consistently provided me with full support. He listens attentively, shares his valuable past experiences, and wholeheartedly helps me brainstorm solutions for the challenges I face. During our Amazon engagement, Rotash's constructive suggestions on table design proved to be incredibly valuable.",
          },
        ],
      },
      {
        segments: [
          {
            text: "Thank you for everything Rotash. I sincerely hope we will have more opportunities to collaborate in the future.",
          },
        ],
      },
    ],
  },
  {
    author: "Sab Chokkalingom",
    role: "AEM Developer/SME, Slalom",
    paragraphs: [
      {
        segments: [
          {
            text: "Over the past year, Rotash has consistently demonstrated exceptional growth and impact through his role as a UX and UI SME for the IAG CMS program. His contributions have been pivotal in delivering high-impact solutions, executing effectively, and serving IAG client with excellence. Executing Effectively:",
          },
        ],
      },
      {
        segments: [
          {
            text: "Rotash has been instrumental in delivering a comprehensive Design System from scratch for the IAG customer. This system has standardised our design processes, resulting in more than 50% increase in design efficiency and a consistent brand experience across multiple brands within IAG.",
            highlight: true,
          },
        ],
      },
      {
        segments: [
          {
            text: "I am sure, if not Slalom, no one else would have effectively setup this complicated beast of AEM CMS Design System implementation.",
          },
        ],
      },
    ],
  },
];

export function Collaboration({
  heading = "Collaboration",
  intro = "Efficient communication is key to productive and fulfilling relationships in a workplace; I walk that talk. Here is what some of the XFN I have worked with say about my collaboration style and communication.",
  testimonials = defaultTestimonials,
}: CollaborationProps) {
  return (
    <section
      id="collaboration"
      data-theme="dark"
      aria-label="Collaboration and testimonials"
      className="bg-ink text-paper relative overflow-hidden py-24 md:py-[140px]"
    >
      <div className="relative mx-auto w-full max-w-[1640px] px-6 md:px-14">
        <h2
          aria-label={heading}
          className="font-display select-none text-[13vw] leading-[0.85] text-white md:text-[18vw] xl:text-[300px]"
        >
          {heading}
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-16 md:mt-20 md:grid-cols-12 md:gap-[60px]">
          <div className="md:col-span-5">
            <p className="font-body max-w-[580px] text-[22px] font-bold leading-tight text-white md:text-[32px] md:leading-[1.2]">
              {intro}
            </p>
          </div>
          <ul className="flex flex-col gap-16 md:col-span-7 md:gap-[70px]">
            {testimonials.map((t) => (
              <li key={t.author}>
                <TestimonialBlock testimonial={t} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
