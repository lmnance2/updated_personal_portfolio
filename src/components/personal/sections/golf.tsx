"use client";

import { SectionDivider } from "@/components/personal/section-divider";
import { SectionCarousel, type Slide } from "@/components/personal/section-carousel";

const slides: Slide[] = [
  { kind: "video", src: "/personal/golf-1.mp4" },
  {
    kind: "stats",
    stats: [
      { lead: "Handicap.", emphasis: "15.1" },
      { lead: "Best score.", emphasis: "85" },
    ],
  },
  { kind: "video", src: "/personal/golf-2.mp4" },
];

export function GolfSection() {
  return (
    <section id="golf">
      <SectionDivider name="Golf" tone="standard" />
      <div className="mx-auto max-w-[1400px] px-4 pb-20 sm:px-6 lg:px-8">
        <SectionCarousel slides={slides} label="Golf section" />
      </div>
    </section>
  );
}
