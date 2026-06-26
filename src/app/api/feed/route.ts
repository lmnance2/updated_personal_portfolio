/**
 * Live stats: "now in the feed" rotating items.
 * For now this is a static array; later we can wire NBA / Wordle APIs in.
 */

import { NextResponse } from "next/server";

export const revalidate = 86400;

export async function GET() {
  const items = [
    "Pacers vs. Knicks series, Game 6",
    "Wordle streak: 41 days",
    "Champaign weather: 47 and chasing rain",
    "Re-reading The Iliad, Book IX",
    "FantasyHoops league: 3rd, somehow",
  ];
  return NextResponse.json({ items });
}
