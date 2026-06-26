"use client";

/**
 * Small accessible side-panel ("Sheet") implementation that mirrors the
 * shadcn API minus the Radix dependency. It does the things we actually need:
 * focus trap, ESC to close, click-outside to close, focus restore.
 */

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import { cn } from "@/lib/cn";

type SheetContextValue = {
  open: boolean;
  setOpen: (v: boolean) => void;
};

const Ctx = createContext<SheetContextValue | null>(null);

export function Sheet({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  children: ReactNode;
}) {
  return (
    <Ctx.Provider value={{ open, setOpen: onOpenChange }}>{children}</Ctx.Provider>
  );
}

export function SheetContent({
  children,
  side = "right",
  className,
}: {
  children: ReactNode;
  side?: "right" | "bottom";
  className?: string;
}) {
  const ctx = useContext(Ctx);
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  // Open / close side effects: focus trap + esc + restore focus.
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

    // Move focus into the panel.
    const tFocus = setTimeout(() => {
      const list = focusables();
      (list[0] ?? panelRef.current)?.focus();
    }, 10);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
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
      clearTimeout(tFocus);
      restoreRef.current?.focus?.();
    };
  }, [ctx, ctx?.open]);

  if (!ctx?.open) return null;

  const isBottom = side === "bottom";

  return (
    <div className="fixed inset-0 z-50">
      <button
        aria-label="Close panel"
        className="absolute inset-0 bg-black/40"
        onClick={() => ctx.setOpen(false)}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        className={cn(
          "absolute bg-[var(--bg)] shadow-xl border-[var(--border)]",
          isBottom
            ? "left-0 right-0 bottom-0 max-h-[85vh] overflow-auto border-t"
            : "right-0 top-0 h-full w-full max-w-md overflow-auto border-l p-6",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function SheetClose({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const ctx = useContext(Ctx);
  const handle = useCallback(() => ctx?.setOpen(false), [ctx]);
  return (
    <button
      type="button"
      onClick={handle}
      className={cn(
        "rounded-md p-1 text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--fg)]",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
