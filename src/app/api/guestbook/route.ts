import { NextResponse } from "next/server";
import { getEntries, addEntry, checkRateLimit } from "@/lib/guestbook-store";
import { checkToxicity } from "@/lib/toxicity";

export const runtime = "nodejs";
export const maxDuration = 30;

const MAX_LEN = 240;

// Flip to `true` to reinstate the one-post-per-IP-per-day guestbook rate limit.
const RATE_LIMIT_ENABLED = false;

async function getProfanity() {
  try {
    const mod = await import("bad-words");
    type Filter = { isProfane: (s: string) => boolean };
    type Ctor = new () => Filter;
    const Ctor: Ctor =
      (mod as unknown as { Filter?: Ctor }).Filter ??
      (mod as unknown as { default: Ctor }).default;
    return new Ctor();
  } catch {
    return null;
  }
}

export async function GET() {
  try {
    const entries = await getEntries();
    return NextResponse.json({ entries: entries.slice(0, 5) });
  } catch {
    return NextResponse.json({ error: "store-error" }, { status: 503 });
  }
}

export async function POST(req: Request) {
  let body: { message?: string; name?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad-json" }, { status: 400 });
  }

  const message = (body.message ?? "").trim();
  const name = (body.name ?? "").trim().slice(0, 40) || undefined;

  if (!message) return NextResponse.json({ error: "empty" }, { status: 400 });
  if (message.length > MAX_LEN) return NextResponse.json({ error: "too_long" }, { status: 400 });

  const filter = await getProfanity();
  if (filter && (filter.isProfane(message) || (name && filter.isProfane(name)))) {
    return NextResponse.json({ error: "profanity" }, { status: 400 });
  }

  const tox = await checkToxicity(name ? `${name}: ${message}` : message);
  if (!tox.ok) {
    return NextResponse.json({ error: "toxic" }, { status: 400 });
  }

  if (RATE_LIMIT_ENABLED) {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "anon";

    const rl = await checkRateLimit(ip);
    if (!rl.allowed) return NextResponse.json({ error: "rate_limit" }, { status: 429 });
  }

  try {
    const entry = await addEntry({ message, name });
    return NextResponse.json({ ok: true, entry });
  } catch {
    return NextResponse.json({ error: "store-error" }, { status: 503 });
  }
}
