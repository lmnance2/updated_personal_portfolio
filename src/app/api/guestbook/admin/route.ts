import { NextResponse } from "next/server";
import { deleteEntry } from "@/lib/guestbook-store";

export async function DELETE(req: Request) {
  const token = process.env.GUESTBOOK_ADMIN_TOKEN;
  if (!token) return NextResponse.json({ error: "no-token-configured" }, { status: 503 });

  const auth = req.headers.get("authorization") ?? "";
  if (auth !== `Bearer ${token}`) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "missing-id" }, { status: 400 });

  try {
    await deleteEntry(id);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "store-error" }, { status: 503 });
  }
}
