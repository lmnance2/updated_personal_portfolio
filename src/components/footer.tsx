"use client";

import { SITE } from "@/lib/site";
import { useEasterEggs } from "@/components/easter-eggs/easter-egg-provider";

export function Footer() {
  const { foundCount } = useEasterEggs();
  return (
    <footer className="mt-24 border-t border-[var(--border)] bg-[var(--bg)]">
      <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8">
        <p className="ui text-[var(--muted)]">
          <a className="hover:text-[var(--fg)]" href={`mailto:${SITE.email}`}>{SITE.email}</a>
          <span className="px-2 text-[var(--border)]">/</span>
          <a className="hover:text-[var(--fg)]" href={SITE.githubUrl} target="_blank" rel="noopener noreferrer">github.com/{SITE.github}</a>
          <span className="px-2 text-[var(--border)]">/</span>
          <a className="hover:text-[var(--fg)]" href={SITE.linkedinUrl} target="_blank" rel="noopener noreferrer">{SITE.linkedin}</a>
        </p>
        <p className="ui mt-3" style={{ color: "var(--accent-strong)" }}>
          secrets: {foundCount}/7
        </p>
        <p className="ui mt-3 text-[var(--muted)]">
          Built with Next.js. {SITE.location}.
        </p>
      </div>
    </footer>
  );
}
