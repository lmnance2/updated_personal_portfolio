"use client";

/**
 * Hand-rolled 2D basketball toy. SVG ball with orange fill + ink seam lines
 * inside a terracotta-bordered container. requestAnimationFrame loop drives
 * position + velocity + gravity. Click the ball to launch it.
 */

import { useEffect, useRef, useState } from "react";

const RADIUS = 22;
const GRAVITY = 0.5;
const FRICTION_Y = 0.7;
const FRICTION_X = 0.6;

export function BasketballToy() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const ball = useRef({ x: 240, y: 140, vx: 0, vy: 0 });
  const [, force] = useState(0);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const wrap = wrapRef.current;
      if (!wrap) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      const b = ball.current;
      b.vy += GRAVITY;
      b.x += b.vx;
      b.y += b.vy;
      // ground
      if (b.y + RADIUS > h) {
        b.y = h - RADIUS;
        b.vy = -b.vy * FRICTION_Y;
        b.vx *= 0.9;
        if (Math.abs(b.vy) < 1.2) b.vy = 0;
      }
      // ceiling
      if (b.y - RADIUS < 0) {
        b.y = RADIUS;
        b.vy = -b.vy * FRICTION_Y;
      }
      // walls
      if (b.x - RADIUS < 0) {
        b.x = RADIUS;
        b.vx = -b.vx * FRICTION_X;
      }
      if (b.x + RADIUS > w) {
        b.x = w - RADIUS;
        b.vx = -b.vx * FRICTION_X;
      }
      force((n) => (n + 1) % 1000000);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const launch = () => {
    ball.current.vy = -14 - Math.random() * 4;
    ball.current.vx = (Math.random() - 0.5) * 10;
  };

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto w-full overflow-hidden border-2"
      style={{
        borderColor: "var(--accent)",
        background: "var(--bg)",
        height: 280,
        maxWidth: 480,
        borderRadius: 12,
      }}
      role="region"
      aria-label="Basketball physics toy. Click the ball to launch."
    >
      <button
        type="button"
        onClick={launch}
        aria-label="Launch the basketball"
        className="absolute focus-visible:outline-2"
        style={{
          left: ball.current.x - RADIUS,
          top: ball.current.y - RADIUS,
          width: RADIUS * 2,
          height: RADIUS * 2,
          padding: 0,
          background: "transparent",
          border: "none",
          cursor: "pointer",
        }}
      >
        <svg width={RADIUS * 2} height={RADIUS * 2} viewBox="0 0 44 44">
          <circle cx="22" cy="22" r="21" fill="#E07856" stroke="#1A1A1A" strokeWidth="1.5" />
          <path d="M1 22h42" stroke="#1A1A1A" strokeWidth="1.4" fill="none" />
          <path d="M22 1v42" stroke="#1A1A1A" strokeWidth="1.4" fill="none" />
          <path d="M5 6c7 6 25 6 34 0" stroke="#1A1A1A" strokeWidth="1.2" fill="none" />
          <path d="M5 38c7-6 25-6 34 0" stroke="#1A1A1A" strokeWidth="1.2" fill="none" />
        </svg>
      </button>
    </div>
  );
}
