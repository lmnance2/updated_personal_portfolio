"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RotatingNumber } from "./rotating-number";

export function HeroSplit() {
  const tagline = "I write code. Sometimes it does something useful.";

  return (
    <section className="relative grid min-h-[calc(100dvh-64px)] grid-cols-1 md:grid-cols-2">
      {/* Cream half. Intentionally near-empty, anchored by the rotating number. */}
      <div className="relative flex items-center justify-center bg-[var(--bg)] px-6 py-16 md:py-0">
        <div className="text-center md:text-left">
          <RotatingNumber />
          <p className="ui mt-4 max-w-xs text-[var(--muted)]" style={{ fontSize: "0.95rem" }}>
            expected graduation. UIUC Grainger CS.
          </p>
        </div>
      </div>

      {/* Terracotta half. Drenched. */}
      <div className="relative flex items-center justify-center bg-[var(--accent)] px-6 py-16 text-[var(--bg)] md:py-0">
        <div className="max-w-xl">
          <h1 className="display-hero" style={{ color: "var(--bg)" }}>
            {tagline}
          </h1>

          <div className="mt-8 h-px w-12 bg-[var(--bg)]/80" aria-hidden />

          <p className="body-lg mt-8 max-w-sm" style={{ color: "var(--bg)", opacity: 0.92 }}>
            Liam Nance. Undergrad CS, University of Illinois.
          </p>

          <div className="mt-10 flex flex-col gap-3">
            <Link
              href="/professional"
              className="ui inline-flex w-full items-center justify-between gap-2 rounded-full bg-[var(--bg)] px-5 py-3 font-medium text-[var(--fg)] transition hover:bg-[var(--surface)] sm:w-auto sm:min-w-[260px]"
            >
              Professional
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/personal"
              className="ui inline-flex w-full items-center justify-between gap-2 rounded-full bg-[var(--bg)] px-5 py-3 font-medium text-[var(--fg)] transition hover:bg-[var(--surface)] sm:w-auto sm:min-w-[260px]"
            >
              Personal
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
