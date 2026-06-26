"use client";

import { useEffect, useState } from "react";

/**
 * The mustard-drenched "Now" strip on /personal. Three columns:
 *   - Now reading (static)
 *   - Now playing (live: GitHub commits in the last 7 days as a sparkline)
 *   - Now in the feed (rotating array of NBA stat + Wordle streak)
 *
 * Data is fetched daily-cached via Next.js Route Handlers.
 * Every metric has a static fallback string.
 */

type GitHubData = { totalLast7: number | null; series: number[]; fallback?: string };
type FeedData = { items: string[]; fallback?: string };

export function NowStrip() {
  const [gh, setGh] = useState<GitHubData | null>(null);
  const [feed, setFeed] = useState<FeedData | null>(null);
  const [feedIdx, setFeedIdx] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/github")
      .then((r) => r.json())
      .then((j: GitHubData) => {
        if (!cancelled) setGh(j);
      })
      .catch(() => {
        if (!cancelled) setGh({ totalLast7: null, series: [], fallback: "data took a sick day." });
      });
    fetch("/api/feed")
      .then((r) => r.json())
      .then((j: FeedData) => {
        if (!cancelled) setFeed(j);
      })
      .catch(() => {
        if (!cancelled)
          setFeed({
            items: ["Pacers vs. Knicks series", "Wordle streak: 41 days"],
            fallback: "data took a sick day.",
          });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Rotate the feed every 4 seconds.
  useEffect(() => {
    if (!feed?.items?.length) return;
    const t = setInterval(() => {
      setFeedIdx((i) => (i + 1) % feed.items.length);
    }, 4000);
    return () => clearInterval(t);
  }, [feed]);

  const series = gh?.series ?? [];
  const maxY = Math.max(1, ...series);

  return (
    <section className="bg-[var(--spark)] py-20 text-[var(--fg)]">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          <Column label="Now reading">
            <p className="display-h2" style={{ fontSize: "1.6rem", color: "var(--fg)" }}>
              The Iliad
            </p>
            <p className="ui mt-1" style={{ color: "var(--fg)", opacity: 0.7 }}>
              Lattimore translation
            </p>
            <p className="body mt-4" style={{ color: "var(--fg)" }}>
              Book IX tonight. Currently negotiating the embassy to Achilles&apos; tent.
            </p>
          </Column>

          <Column label="Now playing">
            <p className="display-h2" style={{ fontSize: "1.6rem" }}>
              GitHub, last 7 days
            </p>
            <div className="mt-3 flex h-16 items-end gap-1">
              {series.length === 0 ? (
                <p className="ui" style={{ color: "var(--fg)", opacity: 0.7 }}>
                  {gh?.fallback ?? "loading."}
                </p>
              ) : (
                series.map((v, i) => (
                  <div
                    key={i}
                    className="w-3 rounded-sm bg-[var(--fg)]"
                    style={{ height: `${Math.max(6, (v / maxY) * 64)}px` }}
                    aria-label={`Day ${i + 1}: ${v} commits`}
                  />
                ))
              )}
            </div>
            {gh?.totalLast7 != null && (
              <p className="ui mt-3 tabular-nums" style={{ color: "var(--fg)" }}>
                {gh.totalLast7} commits this week.
              </p>
            )}
          </Column>

          <Column label="Now in the feed">
            <p className="display-h2 transition-opacity" style={{ fontSize: "1.6rem" }} key={feedIdx}>
              {feed?.items?.[feedIdx] ?? feed?.fallback ?? "loading."}
            </p>
            <p className="ui mt-4" style={{ color: "var(--fg)", opacity: 0.7 }}>
              live, updated daily.
            </p>
          </Column>
        </div>
      </div>
    </section>
  );
}

function Column({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="caption uppercase tracking-wider" style={{ color: "var(--fg)", opacity: 0.7 }}>
        {label}
      </p>
      <div className="mt-3">{children}</div>
    </div>
  );
}
