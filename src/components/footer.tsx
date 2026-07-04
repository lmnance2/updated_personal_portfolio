import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg)]">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8" style={{ paddingTop: "64px", paddingBottom: "48px" }}>
        <p className="ui">
          <a
            href={`mailto:${SITE.email}`}
            className="hover:underline hover:underline-offset-4 transition-colors"
          >
            {SITE.email}
          </a>
          <span className="px-2 text-[var(--border)]" aria-hidden> · </span>
          <a
            href={SITE.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:underline-offset-4 transition-colors"
          >
            github.com/{SITE.github}
          </a>
          <span className="px-2 text-[var(--border)]" aria-hidden> · </span>
          <a
            href={SITE.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:underline-offset-4 transition-colors"
          >
            {SITE.linkedin}
          </a>
        </p>
        <p className="caption mt-2" style={{ color: "var(--muted)" }}>
          Built in Champaign, IL.
        </p>
      </div>
    </footer>
  );
}
