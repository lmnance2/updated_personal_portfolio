"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RotatingNumber } from "./rotating-number";
import { useEasterEggs } from "@/components/easter-eggs/easter-egg-provider";

export function HeroSplit() {
  const { unlock, pulses } = useEasterEggs();
  const [periodTaps, setPeriodTaps] = useState(0);
  const [burst, setBurst] = useState(0);

  const tagline =
    pulses.konami > 0
      ? "I write code. Mostly it doesn't compile the first time."
      : "I write code. Sometimes it does something useful.";

  // Split tagline into the part before the final period for the egg.
  const onPeriod = () => {
    const next = periodTaps + 1;
    setPeriodTaps(next);
    if (next >= 5) {
      unlock("period-clicks");
      setBurst((b) => b + 1);
      setPeriodTaps(0);
    }
  };

  // Render the headline with the last "." replaced by a button.
  // Tagline always ends with a period.
  const lastDot = tagline.lastIndexOf(".");
  const head = tagline.slice(0, lastDot);
  const tail = tagline.slice(lastDot + 1);

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

      {/* Terracotta half — drenched. */}
      <div className="relative flex items-center justify-center bg-[var(--accent)] px-6 py-16 text-[var(--bg)] md:py-0">
        <div className="max-w-xl">
          <h1 className="display-hero" style={{ color: "var(--bg)" }}>
            {head}
            <button
              type="button"
              aria-label="A small period"
              onClick={onPeriod}
              className="relative inline-block align-baseline focus-visible:outline-2"
              style={{ color: "var(--bg)" }}
            >
              .
              {burst > 0 && (
                <span
                  key={burst}
                  className="spark-burst pointer-events-none absolute -right-2 -top-2 h-4 w-4 rounded-full bg-[var(--spark)]"
                  aria-hidden
                />
              )}
            </button>
            {tail}
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
