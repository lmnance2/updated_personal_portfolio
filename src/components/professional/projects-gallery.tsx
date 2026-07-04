"use client";

/**
 * Projects gallery v3.
 *
 * Default view (All):
 *   - 6 featured projects in varied composition:
 *     slot 1: full-width feature, slots 2-3: 2-col, slots 4-6: 3-col w/ one terracotta.
 *   - Archive (4) header + list rows.
 *
 * Filtered view (any category selected):
 *   - Unified flat 2-col card list of matching projects.
 *
 * Filter row: horizontal text tabs with counts. Single-select.
 *
 * Click any card/row to open a Sheet drawer from the right.
 */

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import {
  PROJECTS,
  ALL_CATEGORIES,
  countByCategory,
  type Project,
  type ProjectCategory,
} from "@/data/projects";
import { Sheet, SheetContent, SheetClose } from "@/components/ui/sheet";

type Filter = "All" | ProjectCategory;

export function ProjectsGallery() {
  const [filter, setFilter] = useState<Filter>("All");
  const [selected, setSelected] = useState<Project | null>(null);

  const featured = useMemo(
    () =>
      PROJECTS.filter((p) => p.featured).sort(
        (a, b) => (a.featuredSlot ?? 99) - (b.featuredSlot ?? 99),
      ),
    [],
  );
  const archive = useMemo(() => PROJECTS.filter((p) => !p.featured), []);

  const filtered = useMemo(() => {
    if (filter === "All") return [];
    return PROJECTS.filter((p) => p.categories.includes(filter));
  }, [filter]);

  const tabs: Filter[] = ["All", ...ALL_CATEGORIES];

  const openSheet = (p: Project) => setSelected(p);
  const closeSheet = () => setSelected(null);

  return (
    <section
      id="projects"
      className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="flex items-baseline justify-between">
        <h2 className="display-h2">Projects.</h2>
        {filter !== "All" && (
          <button
            type="button"
            onClick={() => setFilter("All")}
            className="ui text-[var(--accent-strong)] underline-offset-4 hover:underline"
          >
            Clear
          </button>
        )}
      </div>

      {/* Filter row */}
      <div
        className="no-scrollbar mt-6 flex items-center gap-3 overflow-x-auto border-b border-[var(--border)]"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 24px, black calc(100% - 24px), transparent)",
        }}
        role="tablist"
        aria-label="Project category filter"
      >
        {tabs.map((t) => {
          const isActive = filter === t;
          const count = countByCategory(t);
          return (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setFilter(t)}
              className="relative shrink-0 py-3"
            >
              <span
                className="ui"
                style={{ color: isActive ? "var(--fg)" : "var(--muted)" }}
              >
                {t} ({count})
              </span>
              {isActive && (
                <motion.span
                  layoutId="proj-tab-underline"
                  className="absolute -bottom-px left-0 right-0 h-0.5"
                  style={{ background: "var(--accent)" }}
                  transition={{ type: "spring", duration: 0.32, bounce: 0.2 }}
                  aria-hidden
                />
              )}
            </button>
          );
        })}
      </div>

      {filter === "All" ? (
        <DefaultView featured={featured} archive={archive} onOpen={openSheet} />
      ) : (
        <FilteredView items={filtered} onOpen={openSheet} />
      )}

      {/* Project detail Sheet */}
      <Sheet open={selected !== null} onOpenChange={(v) => !v && closeSheet()}>
        <SheetContent>
          <SheetClose className="absolute right-4 top-4">
            <X size={18} aria-hidden />
          </SheetClose>

          {selected && (
            <div className="mt-2">
              <h2 className="display-h2">{selected.name}</h2>

              {selected.longDescription && (
                <p className="body mt-4 measure">{selected.longDescription}</p>
              )}

              {/* Video — always include, fails gracefully if no file */}
              <video
                controls
                playsInline
                preload="metadata"
                className="mt-6 w-full rounded-md aspect-video bg-[var(--surface)]"
              >
                <source src={`/projects/${selected.slug}.mp4`} type="video/mp4" />
              </video>

              {/* Tech chips */}
              <ul className="mt-4 flex flex-wrap gap-2">
                {selected.techTags.map((t) => (
                  <li
                    key={t}
                    className="caption rounded-full border border-[var(--border)] px-3 py-1"
                  >
                    {t}
                  </li>
                ))}
              </ul>

              {/* Categories */}
              <p className="caption mt-3" style={{ color: "var(--muted)" }}>
                {selected.categories.join(" · ")}
              </p>

              {/* GitHub */}
              {selected.githubUrl && (
                <a
                  href={selected.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ui mt-4 inline-flex items-center gap-1 transition-colors hover:text-[var(--accent-strong)]"
                >
                  GitHub <ArrowUpRight className="h-4 w-4" aria-hidden />
                </a>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* DefaultView                                                          */
/* ------------------------------------------------------------------ */

function DefaultView({
  featured,
  archive,
  onOpen,
}: {
  featured: Project[];
  archive: Project[];
  onOpen: (p: Project) => void;
}) {
  const slot1 = featured[0];
  const slot2 = featured[1];
  const slot3 = featured[2];
  const slot4 = featured[3];
  const slot5 = featured[4];
  const slot6 = featured[5];

  return (
    <>
      {slot1 && (
        <div className="mt-10">
          <FeatureCard p={slot1} onOpen={onOpen} />
        </div>
      )}

      {(slot2 || slot3) && (
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {slot2 && <StandardCard p={slot2} onOpen={onOpen} />}
          {slot3 && <StandardCard p={slot3} onOpen={onOpen} />}
        </div>
      )}

      {(slot4 || slot5 || slot6) && (
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {slot4 && <StandardCard p={slot4} onOpen={onOpen} />}
          {slot5 && <StandardCard p={slot5} terra onOpen={onOpen} />}
          {slot6 && <StandardCard p={slot6} onOpen={onOpen} />}
        </div>
      )}

      {archive.length > 0 && (
        <div className="mt-16">
          <h3 className="display-h3" style={{ fontSize: "1.5rem" }}>
            Archive ({archive.length})
          </h3>
          <ul className="mt-4">
            {archive.map((p) => (
              <ArchiveRow key={p.slug} p={p} onOpen={onOpen} />
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* FilteredView                                                         */
/* ------------------------------------------------------------------ */

function FilteredView({
  items,
  onOpen,
}: {
  items: Project[];
  onOpen: (p: Project) => void;
}) {
  if (items.length === 0) {
    return (
      <p className="body mt-10 text-[var(--muted)]">
        Nothing yet in that category. Try another.
      </p>
    );
  }
  return (
    <div className="mt-10 grid gap-6 md:grid-cols-2">
      {items.map((p) => (
        <StandardCard key={p.slug} p={p} onOpen={onOpen} />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Archive row                                                          */
/* ------------------------------------------------------------------ */

function ArchiveRow({ p, onOpen }: { p: Project; onOpen: (p: Project) => void }) {
  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen(p);
    }
  };

  return (
    <li
      role="button"
      tabIndex={0}
      onClick={() => onOpen(p)}
      onKeyDown={handleKey}
      className="grid grid-cols-12 items-baseline gap-4 border-t border-[var(--border)] py-4 transition-colors hover:bg-[var(--surface)] cursor-pointer"
    >
      <div className="col-span-12 md:col-span-5">
        <p className="display-h3">{p.name}</p>
      </div>
      <div className="col-span-12 md:col-span-5">
        <ul className="flex flex-wrap gap-1.5">
          {p.techTags.map((t) => (
            <li
              key={t}
              className="caption rounded-full border border-[var(--border)] px-2 py-0.5"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
      <div className="col-span-12 md:col-span-2 md:text-right">
        {p.githubUrl && (
          <a
            href={p.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="ui inline-flex items-center gap-1 hover:text-[var(--accent-strong)] transition-colors"
          >
            GitHub <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
        )}
      </div>
    </li>
  );
}

/* ------------------------------------------------------------------ */
/* FeatureCard                                                          */
/* ------------------------------------------------------------------ */

function FeatureCard({ p, onOpen }: { p: Project; onOpen: (p: Project) => void }) {
  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen(p);
    }
  };

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onOpen(p)}
      onKeyDown={handleKey}
      className="overflow-hidden rounded-md border border-[var(--border)] bg-[var(--bg)] cursor-pointer transition-[border-color] hover:border-[1.5px] hover:border-[var(--accent)]"
    >
      <div className="relative aspect-video w-full bg-[var(--surface)]">
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <p
            className="display-hero"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", textAlign: "center" }}
          >
            {p.name}
          </p>
        </div>
      </div>
      <div className="p-6">
        <h3 className="display-h2" style={{ fontSize: "1.75rem" }}>
          {p.name}
        </h3>
        <p className="body mt-3 measure">{p.description}</p>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <ul className="flex flex-wrap gap-1.5">
            {p.techTags.map((t) => (
              <li
                key={t}
                className="caption rounded-full border border-[var(--border)] bg-[var(--surface)] px-2 py-0.5"
              >
                {t}
              </li>
            ))}
          </ul>
          {p.githubUrl && (
            <a
              href={p.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="ui inline-flex items-center gap-1 hover:text-[var(--accent-strong)] transition-colors"
            >
              GitHub <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* StandardCard                                                         */
/* ------------------------------------------------------------------ */

function StandardCard({
  p,
  terra,
  onOpen,
}: {
  p: Project;
  terra?: boolean;
  onOpen: (p: Project) => void;
}) {
  const surface = terra ? "var(--accent)" : "var(--bg)";
  const text = terra ? "var(--bg)" : "var(--fg)";
  const muted = terra ? "rgba(250,246,240,0.8)" : "var(--muted)";

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen(p);
    }
  };

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onOpen(p)}
      onKeyDown={handleKey}
      className="flex flex-col overflow-hidden rounded-md border cursor-pointer transition-[border-color] hover:border-[1.5px] hover:border-[var(--accent)]"
      style={{
        background: surface,
        color: text,
        borderColor: terra ? "var(--accent-strong)" : "var(--border)",
      }}
    >
      <div
        className="relative aspect-video w-full"
        style={{ background: terra ? "var(--accent-strong)" : "var(--surface)" }}
      >
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <p
            className="display-hero"
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
              textAlign: "center",
              color: text,
            }}
          >
            {p.name}
          </p>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="display-h3">{p.name}</h3>
        <p className="body mt-2 flex-1" style={{ color: text }}>
          {p.description}
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <ul className="flex flex-wrap gap-1.5">
            {p.techTags.slice(0, 4).map((t) => (
              <li
                key={t}
                className="caption rounded-full border px-2 py-0.5"
                style={{
                  borderColor: terra ? "rgba(250,246,240,0.5)" : "var(--border)",
                  color: text,
                }}
              >
                {t}
              </li>
            ))}
          </ul>
          {p.githubUrl && (
            <a
              href={p.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="ui inline-flex items-center gap-1 transition-colors"
              style={{ color: text }}
            >
              GitHub <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
