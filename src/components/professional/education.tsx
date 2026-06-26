import { SITE } from "@/lib/site";
import { COURSEWORK, EXTRACURRICULARS } from "@/lib/data";

export function Education() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <h2 className="display-h2">Education.</h2>
          <p className="body-lg mt-3" style={{ color: "var(--fg)" }}>
            {SITE.school}, Grainger College of Engineering.
          </p>
          <p className="body mt-1 text-[var(--muted)]">
            {SITE.major}. GPA {SITE.gpa}. Expected {SITE.expectedGrad}.
          </p>
          <h3 className="display-h3 mt-8">Coursework</h3>
          <p className="body mt-2 measure">{COURSEWORK.join(", ")}.</p>
        </div>
        <div>
          <h2 className="display-h2">Extracurriculars.</h2>
          <ul className="mt-6 space-y-3">
            {EXTRACURRICULARS.map((x) => (
              <li
                key={x.name}
                className="ui flex items-baseline justify-between gap-4 border-b border-[var(--border)] pb-2"
              >
                <span>{x.name}</span>
                <span className="caption text-[var(--muted)]">{x.role}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
