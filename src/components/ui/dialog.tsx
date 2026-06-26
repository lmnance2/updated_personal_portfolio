"use client";

/**
 * Tiny centered modal dialog with focus trap + esc + click-outside.
 */

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
} from "react";
import { cn } from "@/lib/cn";

type Ctx = {
  open: boolean;
  setOpen: (v: boolean) => void;
};
const C = createContext<Ctx | null>(null);

export function Dialog({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  children: ReactNode;
}) {
  return <C.Provider value={{ open, setOpen: onOpenChange }}>{children}</C.Provider>;
}

export function DialogContent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ctx = useContext(C);
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ctx?.open) return;
    restoreRef.current = (document.activeElement as HTMLElement) ?? null;

    const focusables = () =>
      panelRef.current
        ? Array.from(
            panelRef.current.querySelectorAll<HTMLElement>(
              'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])',
            ),
          ).filter((el) => !el.hasAttribute("disabled"))
        : [];

    const t = setTimeout(() => {
      const list = focusables();
      (list[0] ?? panelRef.current)?.focus();
    }, 10);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        ctx.setOpen(false);
        return;
      }
      if (e.key === "Tab") {
        const list = focusables();
        if (list.length === 0) return;
        const first = list[0];
        const last = list[list.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      clearTimeout(t);
      restoreRef.current?.focus?.();
    };
  }, [ctx, ctx?.open]);

  if (!ctx?.open) return null;
  return (
    <div className="fixed inset-0 z-[55] flex items-center justify-center p-4">
      <button
        aria-label="Close dialog"
        className="absolute inset-0 bg-black/40"
        onClick={() => ctx.setOpen(false)}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        className={cn(
          "relative z-10 w-full max-w-md rounded-lg border border-[var(--border)] bg-[var(--bg)] p-6 shadow-2xl",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
