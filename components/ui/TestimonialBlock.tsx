export interface TestimonialSegment {
  text: string;
  highlight?: boolean;
}

export interface TestimonialParagraph {
  segments: TestimonialSegment[];
}

export interface Testimonial {
  author: string;
  role: string;
  paragraphs: TestimonialParagraph[];
}

export interface TestimonialBlockProps {
  testimonial: Testimonial;
}

export function TestimonialBlock({ testimonial }: TestimonialBlockProps) {
  const { author, role, paragraphs } = testimonial;

  return (
    <figure>
      <figcaption className="font-body-condensed text-[20px] font-bold leading-[1.4] text-paper md:text-[24px]">
        {author}
        <br />
        <span className="font-bold">{role}</span>
      </figcaption>
      <div className="font-body mt-4 space-y-3 text-[14px] leading-[1.5] text-paper md:text-[16px]">
        {paragraphs.map((para, i) => (
          <p key={i}>
            {para.segments.map((seg, j) =>
              seg.highlight ? (
                <span
                  key={j}
                  className="bg-accent-orange px-[0.1em] py-[0.08em] text-white [box-decoration-break:clone] [-webkit-box-decoration-break:clone]"
                >
                  {seg.text}
                </span>
              ) : (
                <span key={j}>{seg.text}</span>
              )
            )}
          </p>
        ))}
      </div>
    </figure>
  );
}
