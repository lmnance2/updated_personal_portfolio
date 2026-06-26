"use client";

import { useEffect, useRef } from "react";

const LINES = [
  "$ ~/bio.sh",
  "",
  "  _ _                                          ",
  " | (_)                                         ",
  " | |_  __ _ _ __ ___    _ __   __ _ _ __   ___ ",
  " | | |/ _` | '_ ` _ \\  | '_ \\ / _` | '_ \\ / __|",
  " | | | (_| | | | | | | | | | | (_| | | | | (__ ",
  " |_|_|\\__,_|_| |_| |_| |_| |_|\\__,_|_| |_|\\___|",
  "",
  "  undergrad cs @ uiuc, expected may 2028.",
  "  backend intern @ brunswick. researcher @ ursa.",
  "  likes: tennis, the iliad, the pacers.",
  "  reach me: liamnance06@gmail.com",
  "",
  "  press esc to close.",
];

export function TerminalOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="whoami terminal"
      className="fixed inset-0 z-[60] bg-black/95 p-4 sm:p-12"
    >
      <button
        ref={closeRef}
        onClick={onClose}
        aria-label="Close terminal"
        className="absolute right-4 top-4 rounded-md border border-zinc-700 px-3 py-1 font-mono text-xs text-zinc-300 hover:bg-zinc-800"
        style={{ fontFamily: "var(--font-jetbrains)" }}
      >
        esc
      </button>
      <pre
        className="mt-6 max-w-[80ch] whitespace-pre-wrap text-zinc-100"
        style={{
          fontFamily: "var(--font-jetbrains)",
          fontSize: "0.875rem",
          lineHeight: 1.5,
        }}
      >
        {LINES.join("\n")}
      </pre>
    </div>
  );
}
