"use client";

import { useState } from "react";
import { Copy, Mail, ArrowDown } from "lucide-react";
import { SITE } from "@/lib/site";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // no-op
    }
  };

  return (
    <section
      id="contact"
      className="bg-[var(--bg)] py-24"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <h2 className="display-h2" style={{ fontWeight: 700, fontSize: "2.5rem" }}>
          Hire me, or talk shop.
        </h2>
        <p className="body-lg mt-5 measure">
          Easiest to reach by email. Resume below.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${SITE.email}`}
            className="ui inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 font-medium text-[var(--fg)] transition-colors hover:bg-[var(--accent-strong)] hover:text-[var(--bg)]"
          >
            <Mail className="h-4 w-4" aria-hidden /> Email Liam
          </a>
          <button
            type="button"
            onClick={onCopy}
            aria-label="Copy email to clipboard"
            className="ui inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg)] px-3 py-2 hover:bg-[var(--surface)]"
          >
            <Copy className="h-4 w-4" aria-hidden />
            <span aria-live="polite">{copied ? "Copied." : "Copy"}</span>
          </button>
        </div>

        <div className="mt-5">
          <a
            href="/Liam_Nance_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="ui inline-flex items-center gap-2 rounded-full border border-[var(--fg)] px-5 py-2 transition-colors hover:bg-[var(--accent)] hover:text-[var(--bg)]"
          >
            <ArrowDown className="h-4 w-4" aria-hidden /> Download Resume
          </a>
        </div>

        <p className="body mt-8 text-[var(--muted)]">
          <a
            href={SITE.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--fg)]"
          >
            github.com/{SITE.github}
          </a>
          <span className="px-3">·</span>
          <a
            href={SITE.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--fg)]"
          >
            {SITE.linkedin}
          </a>
        </p>
      </div>
    </section>
  );
}
