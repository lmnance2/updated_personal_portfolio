"use client";

import { SectionDivider } from "@/components/personal/section-divider";
import { SectionCarousel, type Slide } from "@/components/personal/section-carousel";

const slides: Slide[] = [
  { kind: "book", rank: 10, cover: "/covers/warbreaker.jpg", title: "Warbreaker", author: "Brandon Sanderson", rating: 8.0 },
  { kind: "book", rank: 9, cover: "/covers/words-of-radiance.jpg", title: "Words of Radiance", author: "Brandon Sanderson", series: "Stormlight Archive", seriesPos: { index: 2, total: 5 }, rating: 8.0 },
  { kind: "book", rank: 8, cover: "/covers/towers-of-midnight.jpg", title: "Towers of Midnight", author: "Brandon Sanderson", series: "Wheel of Time", seriesPos: { index: 13, total: 14 }, rating: 8.0 },
  { kind: "book", rank: 7, cover: "/covers/red-rising.jpg", title: "Red Rising", author: "Pierce Brown", series: "Red Rising", seriesPos: { index: 1, total: 3 }, rating: 8.5 },
  { kind: "book", rank: 6, cover: "/covers/shadow-rising.jpg", title: "The Shadow Rising", author: "Robert Jordan", series: "Wheel of Time", seriesPos: { index: 4, total: 14 }, rating: 8.5 },
  { kind: "book", rank: 5, cover: "/covers/oathbringer.jpg", title: "Oathbringer", author: "Brandon Sanderson", series: "Stormlight Archive", seriesPos: { index: 3, total: 5 }, rating: 8.5 },
  { kind: "book", rank: 4, cover: "/covers/golden-son.jpg", title: "Golden Son", author: "Pierce Brown", series: "Red Rising", seriesPos: { index: 2, total: 3 }, rating: 9.0 },
  { kind: "book", rank: 3, cover: "/covers/way-of-kings.jpg", title: "The Way of Kings", author: "Brandon Sanderson", series: "Stormlight Archive", seriesPos: { index: 1, total: 5 }, rating: 9.0 },
  { kind: "book", rank: 2, cover: "/covers/memory-of-light.jpg", title: "A Memory of Light", author: "Brandon Sanderson/Robert Jordan", series: "Wheel of Time", seriesPos: { index: 14, total: 14 }, rating: 9.5 },
  { kind: "book", rank: 1, cover: "/covers/morning-star.jpg", title: "Morning Star", author: "Pierce Brown", series: "Red Rising", seriesPos: { index: 3, total: 3 }, rating: 9.5 },
];

export function LibrarySection() {
  return (
    <section id="library">
      <SectionDivider name="My Top Books" tone="standard" />
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <p
          className="body mb-6"
          style={{ color: "var(--muted)" }}
        >
          Counting down to the one.
        </p>
        <div className="pb-20">
          <SectionCarousel slides={slides} label="Top 10 books section" paginator="dots" />
        </div>
      </div>
    </section>
  );
}
