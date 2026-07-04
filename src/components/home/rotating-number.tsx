"use client";

import { useRef, useState } from "react";

/**
 * The slowly-rotating "2028" on the cream half of the hero. Hover for 3 seconds
 * to flip to 2024 (when Liam started college) and back. Continuous rotation
 * pauses on hover.
 */

export function RotatingNumber() {
  const [value, setValue] = useState<2028 | 2024>(2028);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onEnter = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => {
      setValue(2024);
    }, 3000);
  };

  const onLeave = () => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
    setTimeout(() => setValue(2028), 400);
  };

  return (
    <button
      type="button"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
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
