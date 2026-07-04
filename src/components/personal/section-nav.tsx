"use client";

// Sticky section nav for the personal page — scroll-spy with framer-motion underline.

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const SECTIONS = [
  { id: "tennis",     num: "01", label: "tennis" },
  { id: "basketball", num: "02", label: "basketball" },
  { id: "golf",       num: "03", label: "golf" },
  { id: "library",    num: "04", label: "library" },
  { id: "fitness",    num: "05", label: "fitness" },
  { id: "music",      num: "06", label: "music" },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

export function SectionNav() {
  const [active, setActive] = useState<SectionId | null>(() => {
    if (typeof window === "undefined") return null;
    const hash = window.location.hash.replace("#", "");
    return SECTIONS.some((s) => s.id === hash) ? (hash as SectionId) : null;
  });

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries
          .filter((e) => e.isIntersecting && e.boundingClientRect.top >= 0)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (intersecting.length > 0) {
          setActive(intersecting[0].target.id as SectionId);
        }
      },
      { rootMargin: "-128px 0px -55% 0px", threshold: 0 },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.pushState(null, "", `#${id}`);
      setActive(id as SectionId);
    }
  }

  return (
    <div className="sticky top-16 z-30 border-b border-[var(--border)] bg-[color:var(--bg)]/95 backdrop-blur-sm">
      <nav
        aria-label="Personal page sections"
        className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8"
      >
        <div
          className="no-scrollbar flex items-center gap-x-6 overflow-x-auto py-3 md:gap-x-8"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 24px, black calc(100% - 24px), transparent)",
          }}
        >
          {SECTIONS.map(({ id, num, label }) => {
            const isActive = active === id;
            return (
              <Link
                key={id}
                href={`#${id}`}
                onClick={(e) => handleClick(e, id)}
                aria-current={isActive ? "location" : undefined}
                className="relative shrink-0 whitespace-nowrap py-2"
                style={{ textDecoration: "none" }}
              >
                <span
                  className="caption tabular-nums"
                  style={{ color: "var(--muted)", marginRight: "6px" }}
                >
                  {num}
                </span>
                <span
                  className="ui"
                  style={{
                    color: isActive ? "var(--fg)" : "var(--muted)",
                    transition: "color 150ms",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = "var(--fg)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = "var(--muted)";
                  }}
                >
                  {label}
                </span>
                {isActive && (
                  <motion.span
                    layoutId="personal-section-underline"
                    className="absolute -bottom-px left-0 right-0 h-[2px] bg-[var(--accent)]"
                    transition={{ type: "spring", duration: 0.32, bounce: 0.2 }}
                    aria-hidden
                  />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
