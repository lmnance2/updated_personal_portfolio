"use client";

import { useEffect, useRef, useState } from "react";
import { useEasterEggs } from "@/components/easter-eggs/easter-egg-provider";

/**
 * The slowly-rotating "2028" on the cream half of the hero. Hover for 3 seconds
 * to flip to 2024 (when Liam started college) and back. Continuous rotation
 * pauses on hover. The mobile gesture replaces Konami: tap five times on the
 * number to unlock the Konami egg.
 */

export function RotatingNumber() {
  const { unlock, triggerPulse, pulses } = useEasterEggs();
  const [value, setValue] = useState<2028 | 2024>(2028);
  const hoverTimer = useRef<number | null>(null);
  const tapCount = useRef(0);
  const tapResetTimer = useRef<number | null>(null);

  // Apply pulse-driven temporary swap when Konami triggers (egg shows ephemeral state on hero).
  useEffect(() => {
    if (pulses.konami === 0) return;
    setValue(2024);
    const t = window.setTimeout(() => setValue(2028), 10000);
    return () => window.clearTimeout(t);
  }, [pulses.konami]);

  const onEnter = () => {
    if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => {
      setValue(2024);
      unlock("rotating-2024");
    }, 3000);
  };
  const onLeave = () => {
    if (hoverTimer.current) {
      window.clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
    window.setTimeout(() => setValue(2028), 400);
  };

  // Mobile tap: 5 taps in 2.5s == konami equivalent on mobile.
  const onTap = () => {
    if (tapResetTimer.current) window.clearTimeout(tapResetTimer.current);
    tapCount.current += 1;
    if (tapCount.current >= 5) {
      tapCount.current = 0;
      unlock("konami");
      triggerPulse("konami");
    } else {
      tapResetTimer.current = window.setTimeout(() => {
        tapCount.current = 0;
      }, 2500);
    }
  };

  return (
    <button
      type="button"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onTap}
      aria-label={`Graduating ${value}`}
      className="group block focus-visible:outline-2"
    >
      <span
        className="block spin-slow display-hero select-none tabular-nums"
        style={{
          fontSize: "clamp(8rem, 18vw, 14rem)",
          lineHeight: 0.9,
          fontWeight: 800,
        }}
      >
        {value}
      </span>
    </button>
  );
}
