"use client";

import { useEffect } from "react";
import { CaseStudyNotice, NOTICE_BUTTON } from "@/components/case-study/CaseStudyNotice";

interface ExternalCaseStudyProps {
  /** Absolute URL of the externally hosted case study. */
  href: string;
  projectName: string;
}

/**
 * Forwards to an externally hosted case study once the gate unlocks.
 * `location.replace` keeps this page out of the back history; the link is a
 * fallback for browsers that halt scripted navigation.
 */
export function ExternalCaseStudy({ href, projectName }: ExternalCaseStudyProps) {
  useEffect(() => {
    window.location.replace(href);
  }, [href]);

  return (
    <CaseStudyNotice
      eyebrow="Opening case study"
      title={projectName}
      body="Taking you to the case study."
    >
      <a href={href} className={`mt-8 block ${NOTICE_BUTTON}`}>
        Open case study
      </a>
    </CaseStudyNotice>
  );
}
