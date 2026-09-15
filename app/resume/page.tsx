import type { Metadata } from "next";
import Link from "next/link";
import { LogoMark } from "@/components/ui/LogoMark";
import "./resume.css";

export const metadata: Metadata = {
  title: "Rotash Shrestha — Resume",
  description:
    "Resume of Rotash Shrestha: principal product designer and design lead. 12+ years across insurance, energy, health, and enterprise B2B.",
};

const RESUME_PDF = "/resume/rotash-shrestha-resume-2026.pdf";

export default function ResumePage() {
  return (
    <div className="resume-page">
      <div className="grid min-h-screen grid-cols-[minmax(320px,38%)_minmax(0,1fr)] bg-white max-[820px]:grid-cols-[minmax(0,1fr)]">
        {/* Sidebar */}
        <aside className="resume-grid sticky top-0 box-border flex h-screen flex-col justify-between gap-8 overflow-auto border-r border-[#262626] px-12 py-[clamp(32px,6vh,64px)] text-[#f4f4f4] max-[820px]:static max-[820px]:h-auto max-[820px]:min-h-0 max-[820px]:border-r-0 max-[820px]:border-b max-[820px]:p-[40px_24px]">
          <div className="flex flex-col gap-8">
            <Link href="/" aria-label="Rotash Shrestha — homepage" className="block w-fit">
              <LogoMark className="h-11 w-11" color="white" />
            </Link>
            <h1 className="text-[clamp(34px,3.4vw,48px)] font-bold uppercase leading-[1.05] tracking-[0.02em] max-[820px]:text-[34px] max-[480px]:text-[30px]">
              Rotash Shrestha
            </h1>
            <div className="flex flex-col gap-2">
              <h2 className="text-balance text-base font-semibold uppercase leading-[1.4] tracking-[0.08em]">
                Principal Product Designer &amp; Design Lead
              </h2>
              <p className="text-[13px] leading-[1.5] text-[#8a8a8a]">
                Design Systems · 0→1 · Interaction and Visual Craft · AI Products
              </p>
            </div>
            <div className="flex flex-col gap-1.5 text-sm leading-[1.6] text-[#b5b5b5]">
              <p>Melbourne, VIC · Australian Citizen</p>
              <a href="mailto:rotas.shrestha@gmail.com">rotas.shrestha@gmail.com</a>
              <a href="tel:+61451075349">+61 (0) 451 075 349</a>
            </div>
            <a
              href={RESUME_PDF}
              download="Rotash Shrestha Resume 2026.pdf"
              className="inline-flex w-fit items-center self-start rounded-full border border-[#f4f4f4] px-[22px] py-3 text-xs font-semibold uppercase tracking-[0.1em] text-[#f4f4f4] transition-colors hover:bg-[#f4f4f4] hover:text-black"
            >
              Download Resume
            </a>
          </div>
          <div className="flex gap-5 text-xs uppercase tracking-[0.1em] text-[#8a8a8a]">
            <a href="https://www.linkedin.com/in/rotash/" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="https://rotash.com.au/" target="_blank" rel="noopener noreferrer">
              Portfolio
            </a>
          </div>
        </aside>

        {/* Main content */}
        <main className="box-border flex max-w-[760px] flex-col gap-16 bg-white px-[min(8vw,96px)] py-[72px] text-[17px] leading-[1.7] text-[#111111] max-[820px]:gap-12 max-[820px]:p-[40px_24px] max-[820px]:text-base max-[480px]:p-[32px_20px]">
          {/* About */}
          <section className="flex flex-col gap-5">
            <SectionHeading>About</SectionHeading>
            <p className="text-pretty text-[19px] leading-[1.6]">
              Principal product designer and design lead with 12+ years on data-heavy,
              multi-user platforms in regulated industries: insurance, energy, health, and
              enterprise B2B. I own the craft and the system around it.
            </p>
            <BulletList>
              <li>
                Currently at DEPT®, delivering design on the Google Store, a global e-commerce
                surface, working within Google&apos;s Material design system and review process
                alongside their product and brand teams.
              </li>
              <li>
                The most recent 0-to-1 work is the 1800MEDICARE ChatGPT app for Healthdirect
                Australia. I designed it from an open brief to a live product on OpenAI&apos;s
                Apps SDK: conversation flows, golden prompts, UI widgets, and a component system,
                plus the evaluation criteria and human oversight guardrails a national health
                service needed before it could ship.
              </li>
              <li>
                My deepest enterprise experience is with insurance products at IAG: multi-step
                quote and purchase journeys for home and vehicle insurance and the Chroma design
                system behind them. Consolidated 1,200+ design tokens to 348, lifted
                design-to-code parity from 95 to 99%, and cut release cycles by 25 to 30% across
                NRMA, CGU, and WFI.
              </li>
              <li>
                I led Accelerated Design at Slalom, an AI program that put LLMs and prototyping
                tools (V0, Claude, and Cursor with Figma MCP) into everyday design work.
                Functional prototypes replaced static mockups in testing, which sped up concept
                validation, stakeholder buy-in, and design-to-code handoff. On Atlas Carbon, that
                meant feature-targeted prototypes and much shorter design and testing cycles.
              </li>
            </BulletList>
          </section>

          {/* Experience */}
          <section className="flex flex-col gap-5">
            <SectionHeading>Experience</SectionHeading>
            <div className="flex flex-col gap-9">
              <article className="flex flex-col gap-3.5">
                <JobHeader title="DEPT® Agency" meta="Lead Design & Strategy, Melbourne | Feb 2026 – Present (Contract)" />
                <p className="text-[#333333]">
                  Leading design and strategy across concurrent client engagements, setting the
                  design direction and owning the client-facing design relationship. Directing
                  designers on each engagement and pairing UX, UI, and product thinking with
                  commercial context from discovery through delivery.
                </p>
                <BulletList>
                  <li>
                    <Strong>Google Store, global e-commerce.</Strong> Design lead on a flagship
                    retail workstream, delivering page patterns, content systems, and UX into a
                    live global storefront. Partner directly with Google product and brand teams,
                    working inside their design system and review process, and hold the design bar
                    across a high-volume commercial surface.
                  </li>
                  <li>
                    <Strong>Healthdirect Australia, 1800MEDICARE ChatGPT app.</Strong> Design lead
                    across clinical triage, service finder, and health knowledge. Defined eight
                    guardrail principles and the evaluation criteria behind a QA harness now used
                    for every release, and negotiated clinical thresholds with the health
                    service&apos;s medical director and clinical analytics lead.
                  </li>
                  <li>
                    <Strong>Zimmermann.</Strong> Leading discovery on a clienteling problem
                    spanning online and in-store, where the customer relationship is fragmented
                    between channels. Used coded prototypes early to pressure-test directions with
                    retail, digital, and brand stakeholders before recommending a path.
                  </li>
                  <li>
                    <Strong>UNSW College.</Strong> Leading discovery and design strategy for the
                    student-facing platform, mapping the student journey and setting the design and
                    content approach the build teams are taking forward.
                  </li>
                </BulletList>
              </article>

              <article className="flex flex-col gap-3.5">
                <JobHeader title="Slalom Consulting" meta="Principal Product Designer, Melbourne | Oct 2021 – Feb 2026 (Full-time)" />
                <p className="text-[#333333]">
                  Lead end-to-end product design initiatives for Fortune 500 clients. Work includes
                  design systems, AI-powered workflows, UX strategy, user research, and interaction
                  design. Facilitate discovery workshops and co-design sessions with cross-functional
                  stakeholders. Define product requirements and align technical execution with
                  business goals. Mentor design teams and establish scalable design practices across
                  multiple client engagements.
                </p>
                <SubLead>
                  IAG (NRMA, CGU, WFI)
                  <SubLeadMuted> · Chroma multi-brand design system</SubLeadMuted>
                </SubLead>
                <BulletList>
                  <li>
                    Led UI architecture and governance for a 12-brand insurance ecosystem. Defined
                    shared frameworks and component patterns in Figma and AEM so each brand could
                    move independently without fragmenting the system underneath.
                  </li>
                  <li>
                    Standards and roadmap ownership. Embedded design KPIs and WCAG 2.2 AA standards
                    with 12 brand stakeholders and aligned a two-year roadmap with product and
                    engineering leadership, covering quote journeys and content. Designed the
                    multi-step home and motor quote and buy flows under regulatory and compliance
                    constraints.
                  </li>
                  <li>
                    Designed the quote journeys and content page patterns each brand built on, so
                    teams could ship their own experiences without fragmenting the system
                    underneath.
                  </li>
                </BulletList>
                <SubLead>
                  Amazon Web Services
                  <SubLeadMuted> · Conversational AI support assistant</SubLeadMuted>
                </SubLead>
                <BulletList>
                  <li>
                    Halved average resolution time with a conversational assistant. Mapped 20+ user
                    intents, designed the conversation flows and validated prototypes with
                    customers, taking real load off the human support team.
                  </li>
                  <li>
                    Ran design sprints with data science and engineering to shape the intent model
                    and conversation patterns. Small wording and flow changes made the biggest
                    difference to self-service success rates.
                  </li>
                </BulletList>
                <SubLead>
                  BP
                  <SubLeadMuted> · Fuel management web portal</SubLeadMuted>
                </SubLead>
                <BulletList>
                  <li>
                    Replaced SAP and Excel workflows with a web portal co-designed with operators,
                    taking manual planning from weeks to days and lifting operational efficiency by
                    around 40%. Designed the interface through high-fidelity mockups and pattern
                    documentation with front-end engineering.
                  </li>
                  <li>
                    Set design system direction through high-fidelity mockups and pattern
                    documentation, working closely with product and front-end engineering to build a
                    usable modern interface.
                  </li>
                </BulletList>
                <SubLead>
                  Atlas Carbon
                  <SubLeadMuted> · Grazing management platform (0→1)</SubLeadMuted>
                </SubLead>
                <BulletList>
                  <li>
                    Owned the product end-to-end from a blank canvas. Framed the problem with
                    producers, defined the workflows and information architecture, designed iOS
                    first and then extended to web, and held the quality bar through launch.
                  </li>
                  <li>
                    Designed the geospatial interactions: paddock mapping, gate flows and
                    livestock-to-carbon dashboards that turned messy grazing data into decisions a
                    producer could make standing in the paddock.
                  </li>
                  <li>
                    Built a WCAG 2.1 AA component library in Figma with variants and tokens mirrored
                    in code, and prototyped in V0 and Claude to test flows with producers before
                    engineering picked them up. Recognised with Slalom&apos;s Team Mogul award in
                    2025 for this engagement.
                  </li>
                </BulletList>
                <p className="mt-1.5 text-[#333333]">
                  <Strong>Practice leadership and people leadership.</Strong> Led Accelerated
                  Design, Slalom&apos;s AI design programme, and was people leader to two senior
                  designers, owning their performance, development, and craft growth. Ran the
                  programme across engagements and coached designers into the workflow rather than
                  mandating it, so adoption stuck after each project ended.
                </p>
              </article>

              <article className="flex flex-col gap-3.5">
                <JobHeader title="Deakin University" meta="Senior UI Designer, Melbourne | May 2021 – Oct 2021 (Full-time)" />
                <p className="text-[#333333]">
                  Contributed to the development and expansion of Deakin&apos;s UI Design System,
                  partnering with product and engineering teams to design and launch accessible
                  features across student, lecturer, and staff platforms. Conducted user research
                  and usability testing to validate design decisions and improve user experience
                  across key university systems.
                </p>
                <BulletList>
                  <li>
                    Drove design system adoption to 85% across 4 core platforms and brought visual
                    inconsistencies down by around 30% through additions to the system.
                  </li>
                  <li>
                    Cut support tickets by 25% after shipping 10+ accessible features to WCAG 2.1,
                    simplifying key task flows from six steps to three and enabling real-time
                    updates.
                  </li>
                  <li>
                    Lifted engagement with key systems by around 15% by running research and
                    usability tests with 50+ staff and students and feeding the findings into
                    product decisions.
                  </li>
                </BulletList>
              </article>

              <article className="flex flex-col gap-3.5">
                <JobHeader title="AWD Digital" meta="Lead UX/UI Designer, Melbourne | Oct 2017 – May 2021 (Full-time)" />
                <p className="text-[#333333]">
                  Led B2B and e-commerce website projects for major clients, including Upland
                  Panviva, Monash University, and RACV. Delivered UI and interaction designs that
                  improved usability and customer engagement. Partnered with cross-functional
                  stakeholders in discovery workshops to shape digital strategies and ensure
                  alignment with business goals.
                </p>
                <BulletList>
                  <li>
                    Improved usability and customer engagement across multiple industries by leading
                    B2B and e-commerce projects for Upland Panviva, Monash University, and RACV,
                    delivering UI and interaction designs supporting diverse user bases.
                  </li>
                  <li>
                    Enabled measurable conversion improvements by delivering responsive UI systems
                    and interaction flows informed by analytics and customer testing through
                    data-driven design decisions.
                  </li>
                  <li>
                    Ensured alignment with business goals by partnering with cross-functional
                    stakeholders in discovery workshops to shape digital strategies that met user
                    needs and client objectives.
                  </li>
                </BulletList>
              </article>

              <article className="flex flex-col gap-3.5 text-[#333333]">
                <p className="text-[15px] font-bold uppercase tracking-[0.08em] text-[#111111]">
                  Extended Career History
                </p>
                <div className="flex flex-col gap-2">
                  <p>
                    <Strong>Varicon</Strong> · Senior UX Consultant (Freelance), Melbourne | Jan
                    2021 – Oct 2021
                  </p>
                  <p>
                    <Strong>ABF Events</Strong> · Digital Media Designer, Melbourne | Feb 2017 – Aug
                    2017
                  </p>
                  <p>
                    <Strong>Pebble Infotech Pvt. Ltd.</Strong> · Senior Multimedia Designer, USA and
                    Nepal | Mar 2013 – Feb 2016
                  </p>
                </div>
              </article>
            </div>
          </section>

          {/* Teaching & Mentoring */}
          <section className="flex flex-col gap-5">
            <SectionHeading>Teaching &amp; Mentoring</SectionHeading>
            <JobHeader title="Monash University" meta="Teaching Associate / Lecturer, Melbourne | Feb 2018 – Jun 2020" />
            <p className="text-[#333333]">
              Delivered workshops for Master&apos;s students across 4 cohorts, teaching user
              research methods, interaction design practices, portfolio storytelling, and UI
              patterns. This role developed students&apos; practical design skills and prepared them
              for professional careers in UX design.
            </p>
          </section>

          {/* Education */}
          <section className="flex flex-col gap-5">
            <SectionHeading>Education</SectionHeading>
            <div className="flex flex-col gap-[18px]">
              <JobHeader title="Master of Multimedia Design" meta="Monash University, Melbourne, Australia | 2017" />
              <JobHeader title="BSc (Hons) Multimedia Technology" meta="London Metropolitan University, London, UK | 2013" />
            </div>
          </section>

          {/* Skills */}
          <section className="flex flex-col gap-5">
            <SectionHeading>Skills</SectionHeading>
            <div className="flex flex-col gap-2.5 text-[#333333]">
              <p>
                <Strong>Business &amp; platform UX:</Strong> Multi-user workflows, role-based
                permissions and approval flows, admin and internal tooling, dashboards, analytics
                and reporting, high information density, auditability, onboarding journeys, i18n
              </p>
              <p>
                <Strong>Design systems:</Strong> Multi-brand token architecture, component
                libraries, governance and contribution models, documentation, design-to-code
                parity, WCAG 2.1 and 2.2 AA accessibility
              </p>
              <p>
                <Strong>Product &amp; craft:</Strong> Information architecture, user flows,
                interaction and motion design, high-fidelity UI, prototyping, cross-platform design
                (web, iOS, Android), responsive design
              </p>
              <p>
                <Strong>Research &amp; delivery:</Strong> Contextual interviews, usability and
                accessibility testing, A/B testing, journey mapping, metrics definition, post-launch
                validation
              </p>
              <p>
                <Strong>Leadership:</Strong> Line management and performance development, mentoring,
                design critique, workshop facilitation, executive stakeholder alignment, roadmap and
                capability planning, hiring and capability building
              </p>
              <p>
                <Strong>AI &amp; technical:</Strong> OpenAI Apps SDK and MCP, conversation design,
                AI evaluation and guardrails, Claude, V0, Cursor and Antigravity with Figma MCP,
                HTML, CSS, React, Tailwind, Figma, FigJam, Dovetail, Jira, Confluence
              </p>
            </div>
          </section>

          {/* Awards & Certifications */}
          <section className="flex flex-col gap-5">
            <SectionHeading>Awards &amp; Certifications</SectionHeading>
            <div className="flex flex-col gap-2.5 text-[#333333]">
              <p>
                <Strong>Team Mogul</Strong> | Slalom Global, 2025
              </p>
              <p>
                <Strong>Auditing Design Systems for Accessibility</Strong> | LinkedIn Learning, 2025
              </p>
              <p>
                <Strong>UX Certification</Strong> | NN/g (Nielsen Norman Group), 2021
              </p>
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className="resume-grid grid grid-cols-3 gap-8 border-t border-[#262626] px-[min(8vw,96px)] py-14 text-[#f4f4f4] max-[820px]:grid-cols-1 max-[820px]:p-[40px_24px]">
        <div className="flex flex-col gap-1.5">
          <p className="text-[11px] uppercase tracking-[0.16em] text-[#8a8a8a]">Location</p>
          <p className="text-[15px] font-medium">Melbourne, VIC · Australian Citizen</p>
        </div>
        <div className="flex flex-col gap-1.5">
          <p className="text-[11px] uppercase tracking-[0.16em] text-[#8a8a8a]">Contact details</p>
          <a href="mailto:rotas.shrestha@gmail.com" className="text-[15px] font-medium">
            rotas.shrestha@gmail.com
          </a>
          <a href="tel:+61451075349" className="text-[15px] font-medium">
            +61 (0) 451 075 349
          </a>
        </div>
        <div className="flex flex-col gap-1.5">
          <p className="text-[11px] uppercase tracking-[0.16em] text-[#8a8a8a]">Online</p>
          <a
            href="https://www.linkedin.com/in/rotash/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[15px] font-medium"
          >
            LinkedIn
          </a>
          <a
            href="https://rotash.com.au/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[15px] font-medium"
          >
            Portfolio <span className="font-normal text-[#8a8a8a]">[pwd: 3136]</span>
          </a>
        </div>
      </footer>
    </div>
  );
}

function JobHeader({ title, meta }: { title: string; meta: string }) {
  return (
    <div>
      <p className="text-[15px] font-bold uppercase tracking-[0.08em]">{title}</p>
      <p className="mt-0.5 text-[15px] text-[#6b6b6b]">{meta}</p>
    </div>
  );
}

function BulletList({ children }: { children: React.ReactNode }) {
  return <ul className="grid gap-3 text-[#333333]">{children}</ul>;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="relative pb-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#111111]">
      <span className="resume-hd-line absolute bottom-0 left-0 h-px w-full bg-[#111111]" />
      {children}
    </h3>
  );
}

function Strong({ children }: { children: React.ReactNode }) {
  return <strong className="font-semibold text-[#111111]">{children}</strong>;
}

function SubLead({ children }: { children: React.ReactNode }) {
  return <p className="mt-1.5 font-semibold">{children}</p>;
}

function SubLeadMuted({ children }: { children: React.ReactNode }) {
  return <span className="font-normal text-[#6b6b6b]">{children}</span>;
}
