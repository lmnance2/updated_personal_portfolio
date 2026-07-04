"use client";

/**
 * Sticky desktop sub-nav for /professional. Hides on scroll-down, shows on
 * scroll-up with 10px hysteresis. Active indicator is a 2px terracotta
 * underline animated with Framer Motion `layoutId`.
 *
 * Mobile: hidden; <JumpButton /> renders a floating bottom-right popover
 * with the same anchors.
 */

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const SECTIONS = [
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
] as const;

export function ProfessionalSubNav() {
  const [active, setActive] = useState<string>("skills");
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { threshold: 0.3 },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastY.current;
      if (Math.abs(dy) < 10) return;
      setHidden(dy > 0 && y > 100);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Professional sections"
      className="sticky z-30 hidden border-b border-[var(--border)] bg-[var(--bg)] transition-transform duration-200 md:block"
      style={{
        top: 64,
        transform: hidden ? "translateY(-100%)" : "translateY(0)",
      }}
    >
      <div className="mx-auto flex max-w-[1400px] items-center gap-3 px-4 sm:px-6 lg:px-8">
        {SECTIONS.map((s, i) => {
          const isActive = active === s.id;
          return (
            <div key={s.id} className="flex items-center gap-3">
              {i > 0 && <span className="text-[var(--border)]">·</span>}
              <Link
                href={`#${s.id}`}
                className="ui relative py-3 transition-colors"
                style={{ color: isActive ? "var(--fg)" : "var(--muted)" }}
              >
                {s.label}
                {isActive && (
                  <motion.span
                    layoutId="prof-sub-nav-underline"
                    className="absolute -bottom-px left-0 right-0 h-0.5"
                    style={{ background: "var(--accent)" }}
                    transition={{ type: "spring", duration: 0.32, bounce: 0.2 }}
                    aria-hidden
                  />
                )}
              </Link>
            </div>
          );
        })}
      </div>
    </nav>
  );
}

export function JumpButton() {
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
    <div ref={ref} className="fixed bottom-4 right-4 z-30 md:hidden">
      {open && (
        <ul className="mb-2 rounded-md border border-[var(--border)] bg-[var(--bg)] p-2 shadow-lg">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={() => setOpen(false)}
                className="ui block rounded px-3 py-2 hover:bg-[var(--surface)]"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Jump to section"
        className="ui inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg)] px-4 py-2 shadow-md"
      >
        <span
          className="h-2 w-2 rounded-full"
          style={{ background: "var(--accent)" }}
          aria-hidden
        />
        Jump
      </button>
    </div>
  );
}
