/**
 * Live stats: GitHub commit activity for the last 7 days.
 *
 * Strategy: hit the public events endpoint for the user. Push events count
 * commits via the payload. This avoids needing a token for public activity.
 * Cached daily.
 */

import { NextResponse } from "next/server";
import { SITE } from "@/lib/site";

export const revalidate = 86400; // 24h

type Bucket = { date: string; count: number };

const FALLBACK_SERIES = [3, 5, 2, 6, 4, 7, 3];

export async function GET() {
  const user = SITE.github;
  try {
    const res = await fetch(`https://api.github.com/users/${user}/events/public?per_page=100`, {
      // Cache at the edge for a day, then revalidate.
      next: { revalidate },
      headers: { "User-Agent": "ln-portfolio" },
    });
    if (!res.ok) throw new Error(`status ${res.status}`);
    type GhEvent = { type: string; created_at: string; payload?: { commits?: unknown[] } };
    const events = (await res.json()) as GhEvent[];

    const now = new Date();
    const buckets: Bucket[] = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(now);
      d.setDate(now.getDate() - (6 - i));
      return { date: d.toISOString().slice(0, 10), count: 0 };
    });
    const indexByDate = new Map(buckets.map((b, i) => [b.date, i]));

    for (const ev of events) {
      if (ev.type !== "PushEvent") continue;
      const day = String(ev.created_at).slice(0, 10);
      const idx = indexByDate.get(day);
      if (idx == null) continue;
      const commitsLen = Array.isArray(ev.payload?.commits) ? ev.payload!.commits!.length : 1;
      buckets[idx].count += commitsLen;
    }

    const series = buckets.map((b) => b.count);
    const totalLast7 = series.reduce((a, b) => a + b, 0);
    return NextResponse.json({ totalLast7, series });
  } catch {
    return NextResponse.json({
      totalLast7: null,
      series: FALLBACK_SERIES,
      fallback: "GitHub took a sick day.",
    });
  }
}
