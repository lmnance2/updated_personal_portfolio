"use client";

/**
 * Guestbook. Form posts to /api/guestbook. GET returns last 100 entries.
 * If KV isn't configured, the server returns 503 and we render the
 * "be the first to sign" coming-soon state.
 */

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

type Entry = {
  id: string;
  name?: string;
  message: string;
  createdAt: number;
};

type ErrorCode =
  | "profanity"
  | "rate_limit"
  | "too_long"
  | "empty"
  | "network"
  | null;

const ERROR_MESSAGES: Record<Exclude<ErrorCode, null>, string> = {
  profanity: "· Cool it on the trash talk.",
  rate_limit: "· One a day. Try again tomorrow.",
  too_long: "· That's a paragraph. 240 max.",
  empty: "· Say something.",
  network: "· Could not load entries. Refresh to retry.",
};

function resolveError(code: string | null): ErrorCode {
  if (!code) return null;
  if (code === "profanity") return "profanity";
  if (code === "rate_limit") return "rate_limit";
  if (code === "too_long") return "too_long";
  if (code === "empty") return "empty";
  if (code === "network") return "network";
  return null;
}

export function Guestbook() {
  const [entries, setEntries] = useState<Entry[] | null>(null);
  const [unavailable, setUnavailable] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [errorCode, setErrorCode] = useState<ErrorCode>(null);

  const charCount = message.length;

  const load = async () => {
    try {
      const r = await fetch("/api/guestbook");
      if (r.status === 503) {
        setUnavailable(true);
        return;
      }
      const j = await r.json();
      setEntries(j.entries ?? []);
    } catch {
      setUnavailable(true);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      setErrorCode("empty");
      return;
    }
    setSubmitting(true);
    setErrorCode(null);
    try {
      const r = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          message: message.trim(),
          name: name.trim() || undefined,
        }),
      });
      if (!r.ok) {
        const j = await r.json().catch(() => ({}));
        const code = resolveError(j.error ?? null);
        setErrorCode(code ?? "network");
      } else {
        setMessage("");
        setName("");
        await load();
      }
    } catch {
      setErrorCode("network");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      {/* Headline */}
      <h2 style={{ fontWeight: 700, fontSize: "2rem", color: "var(--fg)", fontFamily: "var(--font-bricolage)", lineHeight: 1.2 }}>
        Sign the wall.
      </h2>
      <p className="body mt-2" style={{ color: "var(--fg)" }}>
        One line. That&apos;s the whole rule.
      </p>

      {unavailable ? (
        <div className="mt-8">
          <p className="body-lg mt-8">Be the first to sign.</p>
          <p className="body mt-2">One line. That&apos;s the whole rule.</p>
        </div>
      ) : (
        <>
          <form onSubmit={submit} className="mt-8 space-y-3">
            {/* Message textarea */}
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, 240))}
              placeholder="Leave a line"
              maxLength={240}
              required
              aria-label="Your line"
              className="w-full rounded-md px-3 py-2"
              style={{
                minHeight: "80px",
                border: "1.5px solid var(--border)",
                background: "var(--surface)",
                color: "var(--fg)",
                fontFamily: "var(--font-bricolage)",
                fontSize: "1rem",
                resize: "vertical",
                outline: "none",
              }}
            />

            {/* Character counter */}
            <div className="mt-1 flex justify-end">
              <span
                className="caption tabular-nums"
                style={{
                  color: charCount >= 220 ? "var(--accent-strong)" : "var(--muted)",
                }}
              >
                {charCount} / 240
              </span>
            </div>

            {/* Name input */}
            <div>
              <label
                htmlFor="guestbook-name"
                className="caption"
                style={{ color: "var(--muted)", display: "block", marginBottom: "4px" }}
              >
                Name (optional)
              </label>
              <input
                id="guestbook-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value.slice(0, 40))}
                placeholder="Anonymous"
                maxLength={40}
                aria-label="Your name"
                className="rounded-md px-3 py-2 max-w-xs w-full"
                style={{
                  border: "1px solid var(--border)",
                  background: "var(--bg)",
                  color: "var(--fg)",
                  fontFamily: "var(--font-bricolage)",
                  fontSize: "1rem",
                  outline: "none",
                }}
              />
            </div>

            {/* Submit button — right aligned */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submitting || !message.trim()}
                className="ui inline-flex items-center gap-2 rounded-md px-5 transition-colors"
                style={{
                  minHeight: "44px",
                  background: "var(--accent)",
                  color: "var(--fg)",
                  fontWeight: 500,
                  opacity: submitting || !message.trim() ? 0.5 : 1,
                  cursor: submitting || !message.trim() ? "not-allowed" : "pointer",
                }}
              >
                {submitting && <Loader2 size={16} className="animate-spin" aria-hidden />}
                Leave it.
              </button>
            </div>

            {/* Error slot */}
            <div aria-live="polite" className="min-h-[1.25rem]">
              {errorCode && (
                <p className="body" style={{ color: "var(--accent-strong)" }}>
                  {ERROR_MESSAGES[errorCode]}
                </p>
              )}
            </div>
          </form>

          {/* Entries */}
          {entries !== null && entries.length === 0 ? (
            <div className="mt-8">
              <p className="body-lg">Be the first to sign.</p>
              <p className="body mt-2">One line. That&apos;s the whole rule.</p>
            </div>
          ) : (
            <ul className="mt-12 space-y-4">
              {(entries ?? []).map((e, idx) => {
                const d = new Date(e.createdAt);
                return (
                  <li
                    key={e.id}
                    className="rounded-md border border-[var(--border)] bg-[var(--surface)] p-4"
                    style={
                      idx === 0
                        ? { transform: "rotate(-1.5deg)" }
                        : undefined
                    }
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="body" style={{ fontWeight: 500, color: "var(--fg)" }}>
                        {e.name || "Anonymous"}
                      </span>
                      <span className="caption" style={{ color: "var(--muted)" }}>
                        {d.toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <p className="body mt-1">{e.message}</p>
                  </li>
                );
              })}
            </ul>
          )}
        </>
      )}
    </section>
  );
}
