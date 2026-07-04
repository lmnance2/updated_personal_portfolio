"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/professional", label: "Professional" },
  { href: "/personal", label: "Personal" },
] as const;

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--bg)]"
      style={{ height: "64px" }}
    >
      <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="text-[var(--fg)] hover:text-[var(--accent-strong)] transition-colors"
          style={{ fontWeight: 800, fontSize: "22px", fontFamily: "var(--font-bricolage)" }}
        >
          Liam Nance
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
          {NAV.map((n) => {
            const active = pathname === n.href;
            return (
              <Link
                key={n.href}
                href={n.href}
                className={cn(
                  "ui relative py-1 transition-colors",
                  active
                    ? "text-[var(--fg)]"
                    : "text-[var(--muted)] hover:text-[var(--fg)]",
                )}
                aria-current={active ? "page" : undefined}
              >
                {n.label}
                {active && (
                  <span
                    className="absolute left-0 right-0 h-0.5 bg-[var(--accent)]"
                    style={{ bottom: "-1px" }}
                    aria-hidden
                  />
                )}
              </Link>
            );
          })}

          <a
            href="/Liam_Nance_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="ui inline-flex items-center text-[var(--fg)] hover:text-[var(--accent-strong)] transition-colors"
            style={{ gap: "4px" }}
          >
            Resume
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="rounded-md p-2 hover:bg-[var(--surface)] transition-colors md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="border-t border-[var(--border)] bg-[var(--bg)] md:hidden">
          <nav
            className="mx-auto flex max-w-[1400px] flex-col px-4 py-2"
            aria-label="Mobile"
          >
            {NAV.map((n) => {
              const active = pathname === n.href;
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "ui border-b border-[var(--border)] py-3 last:border-b-0 transition-colors",
                    active ? "text-[var(--fg)]" : "text-[var(--muted)]",
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {n.label}
                </Link>
              );
            })}
            <a
              href="/Liam_Nance_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="ui inline-flex items-center gap-1 py-3 text-[var(--accent-strong)]"
            >
              Resume <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
