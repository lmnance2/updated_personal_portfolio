import { NextResponse } from "next/server";
import { getStoreInfo } from "@/lib/guestbook-store";

export async function GET() {
  try {
    const info = await getStoreInfo();
    return NextResponse.json({ ok: true, store: info.type, entryCount: info.entryCount });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
