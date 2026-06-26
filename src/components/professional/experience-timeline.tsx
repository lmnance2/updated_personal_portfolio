"use client";

import { EXPERIENCES } from "@/lib/data";

/**
 * The drenched terracotta moment for the page. Cream text on terracotta,
 * a vertical rail down the left side, each entry stacked.
 */

export function ExperienceTimeline() {
  return (
    <section className="bg-[var(--accent)] py-20 text-[var(--bg)]">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <h2 className="display-h2" style={{ color: "var(--bg)" }}>
          Experience.
        </h2>
        <p className="body-lg mt-3 max-w-2xl" style={{ color: "var(--bg)", opacity: 0.92 }}>
          Four roles across hardware, ML research, AI agents, and product work, and each one taught me a different way of breaking things.
        </p>

        <ol className="mt-14 space-y-16 border-l border-[var(--bg)]/40 pl-6 md:pl-10">
          {EXPERIENCES.map((e) => (
            <li key={e.id} className="relative">
              <span
                aria-hidden
                className="absolute -left-[33px] md:-left-[49px] top-2 h-3 w-3 rounded-full border-2 border-[var(--bg)] bg-[var(--accent)]"
              />
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3
                  className="display-h2"
                  style={{
                    color: "var(--bg)",
                    fontSize: "clamp(1.6rem, 2.6vw, 2.4rem)",
                  }}
                >
                  {e.company}
                </h3>
                <p className="ui" style={{ color: "var(--bg)", opacity: 0.85 }}>
                  {e.dates}
                </p>
              </div>
              <p className="body mt-1" style={{ color: "var(--bg)", opacity: 0.92 }}>
                {e.role} · {e.location}
              </p>
              <p className="body-lg mt-4 measure" style={{ color: "var(--bg)" }}>
                {e.summary}
              </p>
              <ul className="mt-5 space-y-2.5">
                {e.bullets.map((b, i) => (
                  <li key={i} className="body flex gap-3" style={{ color: "var(--bg)" }}>
                    <span aria-hidden className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--bg)]/70" />
                    <span className="measure">{b}</span>
                  </li>
                ))}
              </ul>
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {e.skills.map((s) => (
                  <li
                    key={s}
                    className="ui rounded-full border border-[var(--bg)]/60 px-3 py-1"
                    style={{ color: "var(--bg)", fontSize: "0.8125rem" }}
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
