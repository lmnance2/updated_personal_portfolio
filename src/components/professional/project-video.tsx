"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

/**
 * Reserved 16:9 area for a demo video. If a local video file exists at
 * /public/projects/{slug}.mp4 it autoplays muted on hover (desktop). Otherwise
 * the typographic placeholder (project title set huge) shows through.
 */

export function ProjectVideo({
  slug,
  title,
  surface = "cream",
}: {
  slug: string;
  title: string;
  surface?: "cream" | "terra" | "spark";
}) {
  const [hasVideo, setHasVideo] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Probe whether the video file actually exists. HEAD request via fetch.
  useEffect(() => {
    let cancelled = false;
    fetch(`/projects/${slug}.mp4`, { method: "HEAD" })
      .then((r) => {
        if (!cancelled) setHasVideo(r.ok);
      })
      .catch(() => {
        if (!cancelled) setHasVideo(false);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const onEnter = () => {
    if (hasVideo && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };
  const onLeave = () => {
    if (hasVideo && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const bg =
    surface === "terra"
      ? "bg-[var(--accent)] text-[var(--bg)]"
      : surface === "spark"
        ? "bg-[var(--spark)] text-[var(--fg)]"
        : "bg-[var(--surface)] text-[var(--fg)]";

  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={`relative aspect-video w-full overflow-hidden rounded-md ${bg}`}
    >
      {hasVideo && (
        <video
          ref={videoRef}
          src={`/projects/${slug}.mp4`}
          poster={`/projects/${slug}.jpg`}
          muted
          playsInline
          preload="metadata"
          loop
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      {/* Typographic placeholder underneath (or above when no video). */}
      {!hasVideo && (
        <>
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <span
              className="display-hero text-center"
              style={{
                fontSize: "clamp(2rem, 6vw, 5rem)",
                lineHeight: 0.95,
                opacity: 0.65,
              }}
            >
              {title}
            </span>
          </div>
          <div className="absolute right-3 top-3 rounded-full border border-current/30 bg-black/0 p-2">
            <Play className="h-4 w-4" aria-hidden />
          </div>
        </>
      )}
    </div>
  );
}
