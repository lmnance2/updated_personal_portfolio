"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

/**
 * The seven hidden surprises. Each has an id, a cryptic hint (shown until
 * found), an unlock message (shown when found), and a kind that the layer
 * components react to. State is persisted in localStorage.
 */

export type EggId =
  | "konami"
  | "whoami"
  | "period-clicks"
  | "rotating-2024"
  | "myth-cycle"
  | "party-project"
  | "devtools";

export type Egg = {
  id: EggId;
  hint: string;
  unlock: string;
};

export const EGGS: Egg[] = [
  {
    id: "konami",
    hint: "There is a code from 1986 that still works here. Try it on the home page.",
    unlock: "Konami code. The hero changes its tune.",
  },
  {
    id: "whoami",
    hint: "Type something a Unix system would understand. No input field. Just type.",
    unlock: "whoami. A terminal opens.",
  },
  {
    id: "period-clicks",
    hint: "Punctuation can be a pinata.",
    unlock: "Five taps on the hero period. Confetti.",
  },
  {
    id: "rotating-2024",
    hint: "Give the big number on the home page a long stare.",
    unlock: "Hovered the 2028 long enough that it remembered 2024.",
  },
  {
    id: "myth-cycle",
    hint: "On the personal page, the line from Homer is not the only line from Homer.",
    unlock: "Triple-click any Greek quote and it cycles.",
  },
  {
    id: "party-project",
    hint: "Open a project drawer while the party is on.",
    unlock: "Project drawer at halftime gets a basketball close button.",
  },
  {
    id: "devtools",
    hint: "Inspect the page properly. The console is friendly.",
    unlock: "Console greeting + a hiring email.",
  },
];

type EggState = Record<EggId, boolean>;

const initial: EggState = EGGS.reduce(
  (acc, e) => ({ ...acc, [e.id]: false }),
  {} as EggState,
);

type EggContext = {
  found: EggState;
  foundCount: number;
  unlock: (id: EggId) => void;
  /** A short-lived bus for components that need to react (e.g. the hero swap on Konami). */
  pulses: Record<EggId, number>;
  triggerPulse: (id: EggId) => void;
};

const Ctx = createContext<EggContext | null>(null);

const STORAGE_KEY = "ln_eggs_v1";

export function EasterEggProvider({ children }: { children: React.ReactNode }) {
  const [found, setFound] = useState<EggState>(initial);
  const [pulses, setPulses] = useState<Record<EggId, number>>(
    EGGS.reduce((acc, e) => ({ ...acc, [e.id]: 0 }), {} as Record<EggId, number>),
  );
  const hydrated = useRef(false);

  // Hydrate from localStorage on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<EggState>;
        setFound((prev) => ({ ...prev, ...parsed }));
      }
    } catch {
      // ignore
    }
    hydrated.current = true;
  }, []);

  // Persist.
  useEffect(() => {
    if (!hydrated.current) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(found));
    } catch {
      // ignore
    }
  }, [found]);

  const unlock = useCallback((id: EggId) => {
    setFound((prev) => (prev[id] ? prev : { ...prev, [id]: true }));
  }, []);

  const triggerPulse = useCallback((id: EggId) => {
    setPulses((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  }, []);

  const value = useMemo<EggContext>(() => {
    const foundCount = (Object.values(found) as boolean[]).filter(Boolean).length;
    return { found, foundCount, unlock, pulses, triggerPulse };
  }, [found, pulses, unlock, triggerPulse]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useEasterEggs() {
  const ctx = useContext(Ctx);
  if (!ctx) {
    throw new Error("useEasterEggs must be used inside EasterEggProvider");
  }
  return ctx;
}
