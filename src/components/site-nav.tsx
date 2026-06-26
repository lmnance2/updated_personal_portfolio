"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, CircleDot, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { useEasterEggs } from "@/components/easter-eggs/easter-egg-provider";
import { useParty } from "@/components/party/party-mode-provider";
import { PartyConfirm } from "@/components/party/party-confirm";
import { useEggPanel } from "@/components/easter-eggs/use-egg-panel";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/professional", label: "Professional" },
  { href: "/personal", label: "Personal" },
] as const;

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { foundCount } = useEasterEggs();
  const { on: partyOn, turnOff } = useParty();
  const { setOpen: setEggPanelOpen } = useEggPanel();

  const onPartyClick = () => {
    if (partyOn) {
      turnOff();
      return;
    }
    setConfirmOpen(true);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--bg)]/85">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="display-h3 font-bold tracking-tight text-[var(--fg)] hover:text-[var(--accent-strong)]"
          style={{ fontSize: "1.2rem", fontWeight: 700 }}
        >
          Liam Nance
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
          {NAV.map((n) => {
            const active = pathname === n.href;
            return (
              <Link
                key={n.href}
                href={n.href}
                className={cn(
                  "ui relative py-1 transition-colors",
                  active ? "text-[var(--fg)]" : "text-[var(--muted)] hover:text-[var(--fg)]",
                )}
                aria-current={active ? "page" : undefined}
              >
                {n.label}
                {active && (
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--accent)]"
                    aria-hidden
                  />
                )}
              </Link>
            );
          })}

          <button
            type="button"
            onClick={onPartyClick}
            aria-pressed={partyOn}
            aria-label={partyOn ? "Turn off party mode" : "Turn on party mode"}
            className={cn(
              "ui inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] px-3 py-1 transition-colors",
              partyOn
                ? "bg-[var(--spark)] text-[var(--fg)]"
                : "hover:bg-[var(--surface)]",
            )}
          >
            <CircleDot className="h-4 w-4" aria-hidden />
            <span>{partyOn ? "Halftime on" : "Party"}</span>
          </button>

          {foundCount > 0 && (
            <button
              type="button"
              onClick={() => setEggPanelOpen(true)}
              aria-label={`Open secrets panel. ${foundCount} of 7 found.`}
              className="relative h-4 w-4 rounded-full bg-[var(--accent)] focus-visible:outline-2"
            >
              <span className="sr-only">Secrets: {foundCount} of 7</span>
            </button>
          )}

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="ui inline-flex items-center gap-1 text-[var(--fg)] hover:text-[var(--accent-strong)]"
          >
            Resume
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={onPartyClick}
            aria-pressed={partyOn}
            aria-label={partyOn ? "Turn off party mode" : "Turn on party mode"}
            className={cn(
              "ui inline-flex items-center gap-1 rounded-full border border-[var(--border)] px-2 py-1",
              partyOn ? "bg-[var(--spark)]" : "",
            )}
          >
            <CircleDot className="h-4 w-4" aria-hidden />
          </button>
          {foundCount > 0 && (
            <button
              type="button"
              onClick={() => setEggPanelOpen(true)}
              aria-label={`Open secrets panel. ${foundCount} of 7 found.`}
              className="h-3 w-3 rounded-full bg-[var(--accent)]"
            />
          )}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="rounded-md p-2 hover:bg-[var(--surface)]"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-[var(--border)] bg-[var(--bg)]">
          <nav className="mx-auto flex max-w-[1400px] flex-col px-4 py-2" aria-label="Mobile">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="ui py-3 border-b border-[var(--border)] last:border-b-0"
              >
                {n.label}
              </Link>
            ))}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="ui py-3 text-[var(--accent-strong)] inline-flex items-center gap-1"
            >
              Resume <ArrowUpRight className="h-4 w-4" />
            </a>
          </nav>
        </div>
      )}

      <PartyConfirm open={confirmOpen} onOpenChange={setConfirmOpen} />
    </header>
  );
}
