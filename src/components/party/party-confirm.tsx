"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useParty } from "./party-mode-provider";

export function PartyConfirm({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { toggle } = useParty();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <h2 className="display-h2" style={{ fontSize: "1.6rem" }}>
          Turn on party mode?
        </h2>
        <p className="body mt-2 text-[var(--muted)]">
          Plays a halftime track and a few visual effects. Press Esc to kill it from anywhere.
        </p>
        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="ui rounded-full border border-[var(--border)] px-4 py-2 hover:bg-[var(--surface)]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              toggle();
              onOpenChange(false);
            }}
            className="ui rounded-full bg-[var(--accent)] px-4 py-2 font-medium text-[var(--fg)] hover:bg-[var(--accent-strong)] hover:text-[var(--bg)]"
          >
            Tip off
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
