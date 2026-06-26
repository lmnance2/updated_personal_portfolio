"use client";

import { useEffect, useState } from "react";

/**
 * Tiny event-bus so the nav can open the egg panel without prop drilling.
 * Pure browser event; no provider necessary.
 */

const EVENT = "ln:egg-panel";

export function useEggPanel() {
  const [open, setLocalOpen] = useState(false);

  useEffect(() => {
    const onEvt = (e: Event) => {
      const detail = (e as CustomEvent<{ open: boolean }>).detail;
      setLocalOpen(!!detail?.open);
    };
    window.addEventListener(EVENT, onEvt as EventListener);
    return () => window.removeEventListener(EVENT, onEvt as EventListener);
  }, []);

  const setOpen = (v: boolean) => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new CustomEvent(EVENT, { detail: { open: v } }));
  };

  return { open, setOpen };
}
