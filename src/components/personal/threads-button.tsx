"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";

const THREADS = [
  { id: "tennis", label: "Tennis" },
  { id: "basketball", label: "Basketball" },
  { id: "golf", label: "Golf" },
  { id: "library", label: "Library" },
  { id: "fitness", label: "Fitness" },
  { id: "music", label: "Music" },
];

export function ThreadsButton() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("mousedown", onClick);
    return () => window.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div ref={ref} className="fixed bottom-4 right-4 z-30">
      {open && (
        <ul className="mb-2 rounded-md border border-[var(--border)] bg-[var(--bg)] p-2 shadow-lg">
          {THREADS.map((t) => (
            <li key={t.id}>
              <a
                href={`#${t.id}`}
                onClick={() => setOpen(false)}
                className="ui block rounded px-3 py-2 hover:bg-[var(--surface)]"
              >
                {t.label}
              </a>
            </li>
          ))}
        </ul>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Jump to thread"
        className="ui inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg)] px-4 py-2 shadow-md"
      >
        Threads <ArrowDown className="h-4 w-4" aria-hidden />
      </button>
    </div>
  );
}
