"use client";

import { useState } from "react";
import { ArrowUpRight, X, Code2, CircleDot } from "lucide-react";
import { type Project } from "@/lib/data";
import { ProjectVideo } from "./project-video";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useParty } from "@/components/party/party-mode-provider";
import { useEasterEggs } from "@/components/easter-eggs/easter-egg-provider";
import { cn } from "@/lib/cn";

export function ProjectCard({ p }: { p: Project }) {
  const [open, setOpen] = useState(false);
  const { on: partyOn } = useParty();
  const { unlock } = useEasterEggs();

  const onOpen = () => {
    setOpen(true);
    if (partyOn) unlock("party-project");
  };

  const isTerra = p.variant === "terra";

  return (
    <>
      <button
        type="button"
        onClick={onOpen}
        className={cn(
          "group block w-full overflow-hidden rounded-md border text-left transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2",
          isTerra
            ? "border-[var(--accent-strong)] bg-[var(--accent)] text-[var(--bg)]"
            : "border-[var(--border)] bg-[var(--bg)]",
        )}
      >
        <ProjectVideo
          slug={p.id}
          title={p.title}
          surface={isTerra ? "terra" : "cream"}
        />
        <div className="p-5">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="display-h3" style={{ color: isTerra ? "var(--bg)" : undefined }}>
              {p.title}
            </h3>
            <p
              className="caption"
              style={{ color: isTerra ? "rgba(250,246,240,0.8)" : "var(--muted)" }}
            >
              {p.dates}
            </p>
          </div>
          <p className="body mt-2 measure" style={{ color: isTerra ? "var(--bg)" : undefined }}>
            {p.blurb}
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {p.skills.slice(0, 4).map((s) => (
              <span
                key={s}
                className="caption rounded-full border px-2 py-0.5"
                style={{
                  borderColor: isTerra ? "rgba(250,246,240,0.5)" : "var(--border)",
                  color: isTerra ? "var(--bg)" : "var(--fg)",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <div className="flex items-start justify-between">
            <div>
              <p className="caption text-[var(--muted)]">{p.dates}</p>
              <h2 className="display-h2 mt-1" style={{ fontSize: "2rem" }}>
                {p.title}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close project"
              className={cn(
                "rounded-md p-1 text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--fg)]",
                partyOn &&
                  "h-10 w-10 rounded-full bg-[var(--accent)] text-[var(--bg)] hover:bg-[var(--accent-strong)] hover:text-[var(--bg)]",
              )}
            >
              {partyOn ? (
                <CircleDot className="h-6 w-6" aria-hidden />
              ) : (
                <X className="h-5 w-5" />
              )}
            </button>
          </div>
          <p className="body-lg mt-6">{p.blurb}</p>
          <h3 className="display-h3 mt-8">What it is</h3>
          <ul className="mt-3 space-y-2">
            {p.bullets.map((b, i) => (
              <li key={i} className="body flex gap-2">
                <span className="text-[var(--accent-strong)]">·</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <h3 className="display-h3 mt-8">Stack</h3>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {p.skills.map((s) => (
              <li
                key={s}
                className="caption rounded-full border border-[var(--border)] bg-[var(--surface)] px-2 py-0.5"
              >
                {s}
              </li>
            ))}
          </ul>
          {(p.github || p.demo) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {p.github && (
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ui inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-4 py-2 hover:bg-[var(--surface)]"
                >
                  <Code2 className="h-4 w-4" /> Source
                </a>
              )}
              {p.demo && (
                <a
                  href={p.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ui inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-4 py-2 font-medium text-[var(--fg)] hover:bg-[var(--accent-strong)] hover:text-[var(--bg)]"
                >
                  Live demo <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
