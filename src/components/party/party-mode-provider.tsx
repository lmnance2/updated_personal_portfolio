"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

type PartyState = {
  on: boolean;
  volume: number;
  muted: boolean;
  track: string;
  score: { home: number; visitors: number; clock: string };
};

type PartyContext = PartyState & {
  toggle: () => void;
  turnOff: () => void;
  setVolume: (v: number) => void;
  toggleMute: () => void;
  setTrack: (t: string) => void;
};

const Ctx = createContext<PartyContext | null>(null);

export function PartyModeProvider({ children }: { children: React.ReactNode }) {
  const [on, setOn] = useState(false);
  const [volume, setVolumeRaw] = useState(0.4);
  const [muted, setMuted] = useState(false);
  const [track, setTrack] = useState("/party/halftime.mp3");
  const [score, setScore] = useState({ home: 21, visitors: 19, clock: "Q4 0:42" });

  // Animate the scoreboard upward at a slow tick while party mode is on.
  useEffect(() => {
    if (!on) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tick = setInterval(() => {
      setScore((prev) => {
        const r = Math.random();
        const homeUp = r > 0.55;
        const visUp = r < 0.4;
        const inc = (n: number, c: boolean) => (c ? n + (r > 0.85 ? 3 : 2) : n);
        return {
          home: inc(prev.home, homeUp),
          visitors: inc(prev.visitors, visUp),
          clock: prev.clock,
        };
      });
    }, reduce ? 9000 : 4500);
    return () => clearInterval(tick);
  }, [on]);

  // Apply / remove party-mode body classes for cursor + pulse.
  useEffect(() => {
    if (typeof document === "undefined") return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.body.classList.toggle("party-cursor", on);
    document.body.classList.toggle("party-pulse", on && !reduce);
    return () => {
      document.body.classList.remove("party-cursor", "party-pulse");
    };
  }, [on]);

  // Audio element.
  const audioRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const audio = new Audio(track);
    audio.loop = true;
    audio.volume = volume;
    audio.muted = muted;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, [track]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = volume;
    a.muted = muted;
  }, [volume, muted]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    if (on) {
      a.currentTime = 0;
      a.play().catch(() => {
        // Browsers may block autoplay until a gesture. The toggle itself is a gesture, so it should be allowed; if not, silently fall through.
      });
    } else {
      a.pause();
    }
  }, [on]);

  // Esc kills party mode globally.
  useEffect(() => {
    if (!on) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOn(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [on]);

  const toggle = useCallback(() => setOn((p) => !p), []);
  const turnOff = useCallback(() => setOn(false), []);
  const setVolume = useCallback((v: number) => setVolumeRaw(Math.max(0, Math.min(1, v))), []);
  const toggleMute = useCallback(() => setMuted((m) => !m), []);

  const value = useMemo<PartyContext>(
    () => ({
      on,
      volume,
      muted,
      track,
      score,
      toggle,
      turnOff,
      setVolume,
      toggleMute,
      setTrack,
    }),
    [on, volume, muted, track, score, toggle, turnOff, setVolume, toggleMute],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useParty() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useParty must be used inside PartyModeProvider");
  return ctx;
}
