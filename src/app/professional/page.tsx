import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { SkillGraph } from "@/components/professional/skill-graph";
import { ExperienceTimeline } from "@/components/professional/experience-timeline";
import { ProjectsGallery } from "@/components/professional/projects-gallery";
import { Education } from "@/components/professional/education";

export const metadata: Metadata = {
  title: "Professional — Liam Nance",
};

export default function ProfessionalPage() {
  return (
    <>
      {/* Section 1: page header on cream. */}
      <section className="mx-auto max-w-[1400px] px-4 pb-12 pt-16 sm:px-6 lg:px-8">
        <h1 className="display-h1">Professional.</h1>
        <p className="body-lg measure mt-5" style={{ color: "var(--fg)" }}>
          Backend intern at Brunswick. Undergrad researcher at URSA. Software intern at OpenMind AI. Project manager at Disruption Lab.
        </p>
        <p className="body mt-4 text-[var(--muted)] measure">
          Below, the skills I&apos;ve actually used, mapped to where I used them. Click chips to filter.
        </p>
        <div className="mt-8">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="ui inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 hover:bg-[var(--bg)]"
          >
            Download résumé.pdf
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* Section 2: skill graph */}
      <section className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-8">
        <SkillGraph />
      </section>

      {/* Section 3: drenched terracotta timeline */}
      <ExperienceTimeline />

      {/* Section 4: projects gallery */}
      <ProjectsGallery />

      {/* Section 5: education + extracurriculars */}
      <Education />
    </>
  );
}
