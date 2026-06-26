"use client";

import { useEffect, useState } from "react";
import { useParty } from "./party-mode-provider";
import { Volume2, VolumeX } from "lucide-react";

function useReducedMotion() {
  const [r, setR] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setR(m.matches);
    update();
    m.addEventListener("change", update);
    return () => m.removeEventListener("change", update);
  }, []);
  return r;
}

export function PartyOverlay() {
  const { on, score, volume, muted, setVolume, toggleMute } = useParty();
  const reduce = useReducedMotion();
  const [confetti, setConfetti] = useState<{ id: number; left: number; color: string; delay: number }[]>([]);

  // Periodic confetti bursts every ~7s. Disabled under reduced motion.
  useEffect(() => {
    if (!on || reduce) return;
    let id = 0;
    const fire = () => {
      const batch = Array.from({ length: 9 }, () => ({
        id: ++id + Math.random(),
        left: Math.random() * 100,
        color: ["#E07856", "#F2C14E", "#1A1A1A", "#FAF6F0"][Math.floor(Math.random() * 4)],
        delay: Math.random() * 300,
      }));
      setConfetti(batch);
      // Auto-clear after the animation duration.
      setTimeout(() => setConfetti([]), 3500);
    };
    const first = setTimeout(fire, 400);
    const t = setInterval(fire, 7000);
    return () => {
      clearTimeout(first);
      clearInterval(t);
    };
  }, [on, reduce]);

  if (!on) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[45]">
      {/* Top scoreboard strip */}
      <div className="pointer-events-auto absolute left-0 right-0 top-16 border-y border-[var(--fg)] bg-[var(--spark)]">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-3 px-4 py-2 sm:px-6">
          <div className="flex items-center gap-4">
            <div className="ui font-bold tracking-wide">
              LIAM <span className="tabular-nums" style={{ fontSize: "1.25rem" }}>{score.home}</span>
            </div>
            <div className="ui">·</div>
            <div className="ui font-bold tracking-wide">
              VISITORS <span className="tabular-nums" style={{ fontSize: "1.25rem" }}>{score.visitors}</span>
            </div>
            <div className="ui">·</div>
            <div className="ui tabular-nums">{score.clock}</div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleMute}
              aria-label={muted ? "Unmute" : "Mute"}
              className="rounded-md p-1 hover:bg-[var(--fg)]/10"
            >
              {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              aria-label="Volume"
              className="h-1.5 w-24 cursor-pointer accent-[var(--fg)]"
            />
            {reduce && (
              <span className="caption italic text-[var(--fg)]/70">
                visuals reduced
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Stadium-light corner flashes — disabled under reduced motion. */}
      {!reduce && (
        <>
          <span className="flash-tl absolute left-0 top-0 h-40 w-40 rounded-br-full bg-[var(--spark)] opacity-0" aria-hidden />
          <span className="flash-tr absolute right-0 top-0 h-40 w-40 rounded-bl-full bg-[var(--accent)] opacity-0" aria-hidden />
          <span className="flash-bl absolute bottom-0 left-0 h-40 w-40 rounded-tr-full bg-[var(--accent)] opacity-0" aria-hidden />
          <span className="flash-br absolute bottom-0 right-0 h-40 w-40 rounded-tl-full bg-[var(--spark)] opacity-0" aria-hidden />
        </>
      )}

      {/* Confetti */}
      {!reduce &&
        confetti.map((c) => (
          <span
            key={c.id}
            className="confetti"
            style={{
              left: `${c.left}%`,
              background: c.color,
              animationDelay: `${c.delay}ms`,
            }}
            aria-hidden
          />
        ))}
    </div>
  );
}
