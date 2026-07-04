"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

/* ------------------------------------------------------------------ */
/* Slide type definitions                                               */
/* ------------------------------------------------------------------ */

export type VideoSlide = {
  kind: "video";
  src: string;
  caption?: string;
};

export type ImageSlide = {
  kind: "image";
  src: string;
  alt: string;
  caption?: string;
};

export type StatsSlide = {
  kind: "stats";
  stats: Array<{ lead: string; emphasis: string }>;
};

export type BookSlide = {
  kind: "book";
  cover?: string;
  title: string;
  author: string;
  series?: string;
  seriesPos?: { index: number; total: number };
  stars: 0 | 1 | 2 | 3 | 4 | 5;
};

export type Slide = VideoSlide | ImageSlide | StatsSlide | BookSlide;

/* ------------------------------------------------------------------ */
/* Caption overlay (shared by video + image)                            */
/* ------------------------------------------------------------------ */

function CaptionOverlay({ text }: { text: string }) {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-12"
      style={{
        background:
          "linear-gradient(to top, rgba(26,26,26,0.75) 0%, transparent 100%)",
      }}
    >
      <p className="caption text-white">{text}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Video slide renderer                                                 */
/* ------------------------------------------------------------------ */

function VideoSlideRenderer({ slide }: { slide: VideoSlide }) {
  return (
    <div className="relative h-full w-full" style={{ background: "var(--fg)" }}>
      <video
        controls
        playsInline
        preload="metadata"
        className="h-full w-full object-contain"
      >
        <source src={`${slide.src}#t=0.001`} type="video/mp4" />
      </video>
      {slide.caption && <CaptionOverlay text={slide.caption} />}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Image slide renderer                                                 */
/* ------------------------------------------------------------------ */

function ImageSlideRenderer({ slide }: { slide: ImageSlide }) {
  return (
    <div className="relative h-full w-full" style={{ background: "var(--fg)" }}>
      <img
        src={slide.src}
        alt={slide.alt}
        className="h-full w-full object-contain"
      />
      {slide.caption && <CaptionOverlay text={slide.caption} />}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Stats slide renderer                                                 */
/* ------------------------------------------------------------------ */

type BubbleConfig = {
  top: string;
  left: string;
  size: string;
  heightOverride?: string;
};

function getBubbleConfigs(count: number): BubbleConfig[] {
  if (count === 2) {
    return [
      { top: "50%", left: "22%", size: "clamp(180px, 24vw, 280px)" },
      { top: "50%", left: "70%", size: "clamp(110px, 14vw, 160px)" },
    ];
  }
  if (count === 3) {
    return [
      { top: "45%", left: "28%", size: "clamp(180px, 22vw, 260px)" },
      { top: "22%", left: "65%", size: "clamp(110px, 14vw, 160px)" },
      {
        top: "72%",
        left: "72%",
        size: "clamp(100px, 12vw, 140px)",
        heightOverride: "calc(clamp(100px, 12vw, 140px) * 0.85)",
      },
    ];
  }
  return [
    { top: "38%", left: "26%", size: "clamp(180px, 22vw, 260px)" },
    { top: "18%", left: "60%", size: "clamp(110px, 13vw, 150px)" },
    { top: "65%", left: "58%", size: "clamp(100px, 12vw, 130px)" },
    { top: "50%", left: "82%", size: "clamp(110px, 13vw, 150px)" },
  ];
}

function StatsSlideRenderer({ slide }: { slide: StatsSlide }) {
  const configs = getBubbleConfigs(slide.stats.length);

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ background: "var(--surface)" }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          border: "1px solid var(--border)",
          borderRadius: "50%",
          top: -120,
          right: -180,
          pointerEvents: "none",
        }}
      />

      <div role="list" className="relative w-full h-full">
        {slide.stats.map((stat, index) => {
          const cfg = configs[index];
          const isHero = index === 0;

          const bubbleStyle: React.CSSProperties = {
            position: "absolute",
            top: cfg.top,
            left: cfg.left,
            width: cfg.size,
            height: cfg.heightOverride ?? cfg.size,
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "clamp(12px, 1.5vw, 20px)",
            boxShadow: "0 8px 24px rgba(26,26,26,0.08)",
            animation: `bubbleEnter 480ms cubic-bezier(0.16, 1, 0.3, 1) both`,
            animationDelay: `${index * 60}ms`,
            ...(isHero
              ? {
                  background: "var(--accent)",
                  border: "none",
                }
              : {
                  background: "var(--bg)",
                  border: "1.5px solid var(--fg)",
                }),
          };

          const leadColor = isHero
            ? "rgba(250, 246, 240, 0.85)"
            : "var(--muted)";
          const emphasisColor = isHero ? "var(--bg)" : "var(--fg)";
          const charLen = stat.emphasis.length;
          const heroSize =
            charLen > 8
              ? "clamp(1.25rem, 2.8vw, 2.25rem)"
              : "clamp(1.5rem, 3.6vw, 3rem)";
          const satSize =
            charLen > 6
              ? "clamp(0.875rem, 1.6vw, 1.25rem)"
              : "clamp(1.125rem, 2.2vw, 1.75rem)";
          const emphasisSize = isHero ? heroSize : satSize;

          return (
            <div
              key={index}
              role="listitem"
              className="stats-bubble"
              style={bubbleStyle}
              aria-label={`${stat.lead.replace(/\.$/, "")}: ${stat.emphasis}`}
            >
              <span
                style={{
                  fontFamily: "var(--font-bricolage)",
                  fontWeight: 600,
                  fontSize: "clamp(0.625rem, 0.9vw, 0.75rem)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "0.25rem",
                  color: leadColor,
                }}
              >
                {stat.lead.replace(/\.$/, "")}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-bricolage)",
                  fontWeight: 800,
                  fontSize: emphasisSize,
                  letterSpacing: "-0.02em",
                  lineHeight: 0.95,
                  color: emphasisColor,
                  whiteSpace: isHero ? "normal" : "nowrap",
                }}
              >
                {stat.emphasis}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Stars renderer                                                       */
/* ------------------------------------------------------------------ */

function Stars({ count }: { count: 0 | 1 | 2 | 3 | 4 | 5 }) {
  const boxSize = 18;
  const gap = 6;
  const totalWidth = 5 * boxSize + 4 * gap;

  return (
    <svg
      width={totalWidth}
      height={boxSize}
      aria-label={`${count} out of 5 stars`}
      role="img"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <rect
          key={i}
          x={i * (boxSize + gap)}
          y={0}
          width={boxSize}
          height={boxSize}
          fill={i < count ? "var(--accent)" : "none"}
          stroke={i < count ? "none" : "var(--border)"}
          strokeWidth={1}
        />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Book slide renderer                                                  */
/* ------------------------------------------------------------------ */

function CoverFallback({ title }: { title: string }) {
  return (
    <div
      className="flex h-full w-full items-center justify-center p-4"
      style={{ background: "var(--surface)" }}
    >
      <p
        style={{
          fontFamily: "var(--font-bricolage)",
          fontWeight: 700,
          fontSize: "1rem",
          color: "var(--fg)",
          textAlign: "center",
        }}
      >
        {title}
      </p>
    </div>
  );
}

function BookSlideRenderer({ slide }: { slide: BookSlide }) {
  const metaEl = (
    <div className="flex flex-col gap-2 p-5 md:p-6">
      {slide.series && (
        <div className="flex items-center justify-between gap-2">
          <span
            className="body"
            style={{ fontWeight: 500, color: "var(--fg)" }}
          >
            {slide.series}
          </span>
          {slide.seriesPos && (
            <span
              className="caption tabular-nums shrink-0"
              style={{ color: "var(--muted)" }}
            >
              book {slide.seriesPos.index} / {slide.seriesPos.total}
            </span>
          )}
        </div>
      )}
      <p
        style={{
          fontFamily: "var(--font-bricolage)",
          fontWeight: 700,
          fontSize: "1.75rem",
          color: "var(--fg)",
          lineHeight: 1.2,
        }}
      >
        {slide.title}
      </p>
      <p className="body" style={{ color: "var(--muted)" }}>
        {slide.author}
      </p>
      <div className="mt-2">
        <Stars count={slide.stars} />
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop: flex-row */}
      <div className="hidden h-full w-full md:flex md:flex-row md:items-start">
        <div className="h-full shrink-0" style={{ width: "40%" }}>
          {slide.cover ? (
            <img
              src={slide.cover}
              alt={`${slide.title} cover`}
              className="h-full w-full object-cover rounded-sm"
            />
          ) : (
            <CoverFallback title={slide.title} />
          )}
        </div>
        <div className="flex-1 overflow-auto">{metaEl}</div>
      </div>

      {/* Mobile: flex-col */}
      <div
        className="flex h-full w-full flex-col md:hidden"
        style={{ background: "var(--bg)" }}
      >
        <div className="max-h-80 overflow-hidden">
          {slide.cover ? (
            <img
              src={slide.cover}
              alt={`${slide.title} cover`}
              className="w-full object-contain"
              style={{ maxHeight: "320px" }}
            />
          ) : (
            <div style={{ height: "200px" }}>
              <CoverFallback title={slide.title} />
            </div>
          )}
        </div>
        {metaEl}
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Arrow button                                                         */
/* ------------------------------------------------------------------ */

function ArrowButton({
  dir,
  onClick,
  disabled,
  mobile,
}: {
  dir: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
  mobile?: boolean;
}) {
  const Icon = dir === "prev" ? ChevronLeft : ChevronRight;
  const label = dir === "prev" ? "Previous slide" : "Next slide";

  if (mobile) {
    return (
      <button
        type="button"
        aria-label={label}
        onClick={onClick}
        disabled={disabled}
        className={cn(
          "group inline-flex items-center justify-center rounded-full border-[1.5px] border-[var(--fg)] bg-[var(--bg)] transition-[background-color,border-color]",
          "hover:bg-[var(--accent-strong)] hover:border-[var(--accent-strong)]",
          disabled && "opacity-40 cursor-not-allowed pointer-events-none",
        )}
        style={{ height: 44, paddingLeft: 20, paddingRight: 20 }}
      >
        <Icon
          size={20}
          strokeWidth={1.5}
          className="text-[var(--accent)] group-hover:text-[var(--bg)] transition-colors"
          aria-hidden
        />
      </button>
    );
  }

  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "group inline-flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] border-[var(--fg)] bg-[var(--bg)] transition-[background-color,border-color]",
        "hover:bg-[var(--accent-strong)] hover:border-[var(--accent-strong)]",
        disabled && "opacity-40 cursor-not-allowed pointer-events-none",
      )}
    >
      <Icon
        size={20}
        strokeWidth={1.5}
        className="text-[var(--accent)] group-hover:text-[var(--bg)] transition-colors"
        aria-hidden
      />
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Main carousel                                                        */
/* ------------------------------------------------------------------ */

export function SectionCarousel({
  slides,
  label,
}: {
  slides: Slide[];
  label: string;
}) {
  const [current, setCurrent] = useState(0);
  const total = slides.length;

  const go = (idx: number) => {
    if (idx >= 0 && idx < total) setCurrent(idx);
  };

  const slide = slides[current];
  const isBook = slide.kind === "book";

  const renderSlide = () => {
    switch (slide.kind) {
      case "video":
        return <VideoSlideRenderer slide={slide} />;
      case "image":
        return <ImageSlideRenderer slide={slide} />;
      case "stats":
        return <StatsSlideRenderer slide={slide} />;
      case "book":
        return <BookSlideRenderer slide={slide} />;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") go(current - 1);
    if (e.key === "ArrowRight") go(current + 1);
  };

  const slideContainerClass = cn(
    "overflow-hidden rounded-md",
    !isBook && "aspect-video",
  );

  const slideContainerStyle = isBook
    ? { maxHeight: "min(500px, 70vh)" as const }
    : undefined;

  return (
    <div
      role="region"
      aria-label={label}
      aria-roledescription="carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="outline-none"
    >
      {/* Desktop layout: grid with arrows on sides */}
      <div className="hidden md:grid md:grid-cols-[48px_1fr_48px] md:items-center md:gap-4">
        <ArrowButton
          dir="prev"
          onClick={() => go(current - 1)}
          disabled={current === 0}
        />

        <div
          className={slideContainerClass}
          style={slideContainerStyle}
          aria-live="polite"
          aria-atomic="true"
        >
          {renderSlide()}
        </div>

        <ArrowButton
          dir="next"
          onClick={() => go(current + 1)}
          disabled={current === total - 1}
        />
      </div>

      {/* Mobile layout: slide full width, then buttons below */}
      <div className="md:hidden">
        <div
          className={slideContainerClass}
          style={slideContainerStyle}
          aria-live="polite"
          aria-atomic="true"
        >
          {renderSlide()}
        </div>
        <div className="mt-3 flex justify-center gap-3">
          <ArrowButton
            dir="prev"
            onClick={() => go(current - 1)}
            disabled={current === 0}
            mobile
          />
          <ArrowButton
            dir="next"
            onClick={() => go(current + 1)}
            disabled={current === total - 1}
            mobile
          />
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-4 flex items-center gap-3">
        <div
          className="relative flex-1"
          style={{ height: 1, background: "var(--fg)" }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              height: 1,
              width: `${((current + 1) / total) * 100}%`,
              background: "var(--accent)",
              transition: "width 240ms ease",
            }}
          />
        </div>
        <span
          className="caption tabular-nums shrink-0"
          style={{ color: "var(--muted)" }}
          aria-label={`Slide ${current + 1} of ${total}`}
        >
          {current + 1} / {total}
        </span>
      </div>
    </div>
  );
}
