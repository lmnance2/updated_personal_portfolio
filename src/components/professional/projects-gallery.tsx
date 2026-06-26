"use client";

import { PROJECTS } from "@/lib/data";
import { ProjectCard } from "./project-card";

/**
 * Varied composition. One feature project full-width up top, then a 2-col row,
 * then a 3-col row. NOT identical card grid.
 */

export function ProjectsGallery() {
  const feature = PROJECTS.find((p) => p.variant === "feature");
  const terra = PROJECTS.find((p) => p.variant === "terra");
  const cards = PROJECTS.filter((p) => p.variant === "card");

  const twoCol = cards.slice(0, 2);
  const threeCol = [...cards.slice(2), ...(terra ? [terra] : [])];

  return (
    <section className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-8">
      <div className="flex items-baseline justify-between">
        <h2 className="display-h2">Projects.</h2>
        <p className="ui text-[var(--muted)]">a selection</p>
      </div>

      {feature && (
        <div className="mt-10">
          <ProjectCard p={feature} />
        </div>
      )}

      {twoCol.length > 0 && (
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {twoCol.map((p) => (
            <ProjectCard key={p.id} p={p} />
          ))}
        </div>
      )}

      {threeCol.length > 0 && (
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {threeCol.map((p) => (
            <ProjectCard key={p.id} p={p} />
          ))}
        </div>
      )}
    </section>
  );
}
