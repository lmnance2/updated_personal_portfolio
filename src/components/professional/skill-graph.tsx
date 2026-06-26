"use client";

/**
 * The Skill <-> Project graph centerpiece on /professional.
 *
 * Behavior:
 * - Chips form a roving-tabindex group: arrow keys traverse, Enter toggles, Esc clears.
 * - Multi-select uses AND logic.
 * - When any chip is selected (or hovered/focused), non-matching cards dim
 *   (opacity 0.3 + 1px blur) in a staggered wave.
 * - Hovering/focusing a card lights up matching chips with a 2px underline.
 * - A polite aria-live region announces the filter state.
 */

import { useCallback, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { SKILLS, EXPERIENCES, PROJECTS, type Experience, type Project } from "@/lib/data";

type Item = { id: string; title: string; sub: string; blurb: string; skills: string[] };

const toItem = (e: Experience): Item => ({
  id: `exp-${e.id}`,
  title: e.company,
  sub: `${e.role} · ${e.dates}`,
  blurb: e.summary,
  skills: e.skills,
});

const toProjectItem = (p: Project): Item => ({
  id: `proj-${p.id}`,
  title: p.title,
  sub: p.dates,
  blurb: p.blurb,
  skills: p.skills,
});

const ALL_ITEMS: Item[] = [
  ...EXPERIENCES.map(toItem),
  ...PROJECTS.map(toProjectItem),
];

const GROUPS = ["Languages", "Frameworks", "Tools"] as const;

export function SkillGraph() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [hovered, setHovered] = useState<string | null>(null);
  const [cardSkills, setCardSkills] = useState<string[] | null>(null);
  const [chipIdx, setChipIdx] = useState(0);
  const chipsRef = useRef<HTMLButtonElement[]>([]);

  const toggle = useCallback((name: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });
  }, []);

  const clearAll = useCallback(() => setSelected(new Set()), []);

  const activeKeys = useMemo(() => {
    const keys = new Set(selected);
    if (hovered) keys.add(hovered);
    return keys;
  }, [selected, hovered]);

  const matchedCount = useMemo(() => {
    if (activeKeys.size === 0) return ALL_ITEMS.length;
    return ALL_ITEMS.filter((it) =>
      [...activeKeys].every((k) => it.skills.includes(k)),
    ).length;
  }, [activeKeys]);

  // Keyboard: roving tabindex over the chip group.
  const onChipKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, idx: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      const next = (idx + 1) % SKILLS.length;
      setChipIdx(next);
      chipsRef.current[next]?.focus();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      const next = (idx - 1 + SKILLS.length) % SKILLS.length;
      setChipIdx(next);
      chipsRef.current[next]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      setChipIdx(0);
      chipsRef.current[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      const last = SKILLS.length - 1;
      setChipIdx(last);
      chipsRef.current[last]?.focus();
    } else if (e.key === "Escape") {
      e.preventDefault();
      clearAll();
    }
    // Enter/Space toggles via the native button behaviour.
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
      {/* Chip column */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="flex items-baseline justify-between">
          <h3 className="display-h3">Skills</h3>
          {selected.size > 0 && (
            <button
              type="button"
              onClick={clearAll}
              className="ui text-[var(--accent-strong)] underline-offset-4 hover:underline"
              aria-label="Clear all selected skills"
            >
              Clear
            </button>
          )}
        </div>
        <p className="caption mt-1 text-[var(--muted)]">
          Click chips to filter. Arrow keys traverse. Esc clears.
        </p>

        <div className="mt-6 space-y-6">
          {GROUPS.map((group) => {
            const groupSkills = SKILLS.filter((s) => s.group === group);
            return (
              <div key={group}>
                <h4 className="caption mb-2 text-[var(--muted)]" style={{ letterSpacing: 0 }}>
                  {group}
                </h4>
                <ul className="flex flex-wrap gap-2" role="group" aria-label={`${group} skills`}>
                  {groupSkills.map((s) => {
                    const overallIdx = SKILLS.findIndex((x) => x.name === s.name);
                    const isSel = selected.has(s.name);
                    const isLit = !!cardSkills && cardSkills.includes(s.name);
                    return (
                      <li key={s.name}>
                        <button
                          ref={(el) => {
                            if (el) chipsRef.current[overallIdx] = el;
                          }}
                          tabIndex={overallIdx === chipIdx ? 0 : -1}
                          type="button"
                          aria-pressed={isSel}
                          onClick={() => toggle(s.name)}
                          onMouseEnter={() => setHovered(s.name)}
                          onMouseLeave={() => setHovered(null)}
                          onFocus={() => setHovered(s.name)}
                          onBlur={() => setHovered(null)}
                          onKeyDown={(e) => onChipKeyDown(e, overallIdx)}
                          className={cn(
                            "ui h-9 min-h-[2.25rem] rounded-full border px-3.5 transition-all chip-underline",
                            isSel
                              ? "border-[var(--fg)] bg-[var(--accent)] text-[var(--fg)] shadow-[inset_0_-2px_0_0_var(--fg)]"
                              : "border-[var(--border)] bg-[var(--bg)] text-[var(--fg)] hover:bg-[var(--surface)]",
                            isLit && !isSel && "lit",
                          )}
                        >
                          {s.name}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>

        <p className="caption mt-6 text-[var(--muted)]" aria-live="polite">
          {activeKeys.size === 0
            ? `${ALL_ITEMS.length} entries.`
            : `Filtering by ${[...activeKeys].join(", ")}. ${matchedCount} of ${ALL_ITEMS.length} highlighted.`}
        </p>
      </div>

      {/* Cards column */}
      <div>
        <h3 className="display-h3">Where I&apos;ve used them</h3>
        <ul className="mt-4 space-y-3">
          {ALL_ITEMS.map((it, idx) => {
            const matches =
              activeKeys.size === 0 ||
              [...activeKeys].every((k) => it.skills.includes(k));
            return (
              <li
                key={it.id}
                onMouseEnter={() => setCardSkills(it.skills)}
                onMouseLeave={() => setCardSkills(null)}
                onFocus={() => setCardSkills(it.skills)}
                onBlur={() => setCardSkills(null)}
                tabIndex={0}
                className={cn(
                  "rounded-md border border-[var(--border)] bg-[var(--surface)] p-5 transition-[opacity,filter] duration-200",
                  !matches && "opacity-30 blur-[1px] saturate-50",
                )}
                style={{
                  transitionDelay: matches ? "0ms" : `${idx * 30}ms`,
                }}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h4 className="display-h3">{it.title}</h4>
                  <p className="caption text-[var(--muted)]">{it.sub}</p>
                </div>
                <p className="body mt-2 measure">{it.blurb}</p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {it.skills.map((sk) => (
                    <li
                      key={sk}
                      className={cn(
                        "caption rounded-full border border-[var(--border)] bg-[var(--bg)] px-2 py-0.5",
                        activeKeys.has(sk) && "border-[var(--fg)] bg-[var(--accent)] text-[var(--fg)]",
                      )}
                    >
                      {sk}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
