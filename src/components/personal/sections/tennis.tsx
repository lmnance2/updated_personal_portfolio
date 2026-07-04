"use client";

import { SectionDivider } from "@/components/personal/section-divider";
import { SectionCarousel, type Slide } from "@/components/personal/section-carousel";

const slides: Slide[] = [
  { kind: "video", src: "/personal/tennis-1.mp4" },
  { kind: "image", src: "/personal/tennis-hero.jpg", alt: "Liam on a tennis court." },
  { kind: "video", src: "/personal/tennis-2.mp4" },
  {
    kind: "stats",
    stats: [
      { lead: "Fastest serve.", emphasis: "115 mph" },
      { lead: "Peak UTR.", emphasis: "7.91" },
      { lead: "Racket.", emphasis: "Pro Staff" },
    ],
  },
];

export function TennisSection() {
  return (
    <section id="tennis">
      <SectionDivider name="Tennis" tone="opener" />
      <div className="mx-auto max-w-[1400px] px-4 pb-20 sm:px-6 lg:px-8">
        <SectionCarousel slides={slides} label="Tennis section" />
      </div>
    </section>
  );
}
