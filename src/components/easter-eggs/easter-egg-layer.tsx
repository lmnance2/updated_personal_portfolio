"use client";

/**
 * Global hooks + visual surfaces for the egg system. Mounted once at the root.
 * - Konami listener (anywhere, not while typing in an input).
 * - whoami listener that opens the terminal overlay.
 * - The egg-checklist side panel.
 * - aria-live region for unlock announcements.
 */

import { useEffect, useRef, useState } from "react";
import { useEasterEggs, EGGS, type EggId } from "./easter-egg-provider";
import { TerminalOverlay } from "./terminal-overlay";
import { useEggPanel } from "./use-egg-panel";
import { Sheet, SheetContent, SheetClose } from "@/components/ui/sheet";
import { X } from "lucide-react";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

function isTextTarget(t: EventTarget | null) {
  if (!t || !(t instanceof HTMLElement)) return false;
  const tag = t.tagName.toLowerCase();
  return tag === "input" || tag === "textarea" || (t as HTMLElement).isContentEditable;
}

export function EasterEggLayer() {
  const { unlock, triggerPulse, found, foundCount } = useEasterEggs();
  const [terminalOpen, setTerminalOpen] = useState(false);
  const buffer = useRef<string[]>([]);
  const typed = useRef<string>("");
  const [announce, setAnnounce] = useState("");

  // Konami code + whoami text capture.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isTextTarget(e.target)) return;
      // Konami buffer
      buffer.current.push(e.key);
      if (buffer.current.length > KONAMI.length) {
        buffer.current.shift();
      }
      const match =
        buffer.current.length === KONAMI.length &&
        buffer.current.every((k, i) => k.toLowerCase() === KONAMI[i].toLowerCase());
      if (match) {
        unlock("konami");
        triggerPulse("konami");
        setAnnounce("Konami code unlocked.");
      }

      // whoami: collect characters into a short rolling string.
      if (e.key.length === 1 && /[a-z]/i.test(e.key)) {
        typed.current = (typed.current + e.key.toLowerCase()).slice(-12);
        if (typed.current.endsWith("whoami")) {
          unlock("whoami");
          setTerminalOpen(true);
          setAnnounce("whoami unlocked.");
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [unlock, triggerPulse]);

  // Listen for "egg unlocked" via found state changes for the announcer.
  const seen = useRef<EggId[]>([]);
  useEffect(() => {
    const justFound = (Object.entries(found) as [EggId, boolean][])
      .filter(([, v]) => v)
      .map(([k]) => k);
    const fresh = justFound.find((id) => !seen.current.includes(id));
    if (fresh) {
      seen.current = justFound;
      const egg = EGGS.find((e) => e.id === fresh);
      if (egg) setAnnounce(egg.unlock);
    }
  }, [found]);

  return (
    <>
      <TerminalOverlay open={terminalOpen} onClose={() => setTerminalOpen(false)} />
      <EggChecklistPanel />
      <div aria-live="polite" className="sr-only">
        {announce}
        {foundCount > 0 ? ` ${foundCount} of 7 secrets found.` : ""}
      </div>
    </>
  );
}

function EggChecklistPanel() {
  const { open, setOpen } = useEggPanel();
  const { found, foundCount } = useEasterEggs();
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent>
        <div className="flex items-start justify-between">
          <div>
            <h2 className="display-h2" style={{ fontSize: "1.6rem" }}>
              Secrets
            </h2>
            <p className="ui mt-1 text-[var(--muted)]">
              {foundCount} of 7 found. Cryptic hints below.
            </p>
          </div>
          <SheetClose aria-label="Close secrets">
            <X className="h-5 w-5" />
          </SheetClose>
        </div>

        <ul className="mt-6 space-y-3">
          {EGGS.map((e, i) => {
            const isFound = !!found[e.id];
            return (
              <li
                key={e.id}
                className="rounded-md border border-[var(--border)] bg-[var(--surface)] p-3"
              >
                <div className="flex items-baseline gap-3">
                  <span
                    className="caption tabular-nums w-6 shrink-0"
                    style={{ color: "var(--muted)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <div className="ui">
                      {isFound ? (
                        <span style={{ color: "var(--accent-strong)" }}>{e.unlock}</span>
                      ) : (
                        <span className="italic text-[var(--muted)]">{e.hint}</span>
                      )}
                    </div>
                  </div>
                  <span
                    className="caption shrink-0 tabular-nums"
                    style={{
                      color: isFound ? "var(--accent-strong)" : "var(--muted)",
                    }}
                  >
                    {isFound ? "found" : "—"}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
