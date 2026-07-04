"use client";

/**
 * Hover-to-autoplay on desktop, tap-to-play on mobile. Reserved 16:9.
 * No-op poster fallback if the .mp4 isn't shipped yet.
 */

import { useRef, useState } from "react";
import { Play } from "lucide-react";

export function HoverVideo({
  src,
  poster,
  label,
}: {
  src: string;
  poster?: string;
  label: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const onEnter = () => {
    const v = ref.current;
    if (!v) return;
    v.play().catch(() => {});
  };
  const onLeave = () => {
    const v = ref.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };
  const onTap = () => {
    const v = ref.current;
    if (!v) return;
    if (playing) {
      v.pause();
      setPlaying(false);
    } else {
      v.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <div
      className="relative aspect-video w-full overflow-hidden rounded-md border border-[var(--border)] bg-[var(--surface)]"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onTap}
      role="button"
      tabIndex={0}
      aria-label={`${label}. Click to play.`}
    >
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted
        playsInline
        preload="metadata"
        className="h-full w-full object-cover"
      />
      {!playing && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="rounded-full bg-[var(--bg)]/90 p-3 shadow-md">
            <Play className="h-5 w-5" aria-hidden />
          </span>
        </div>
      )}
    </div>
  );
}
