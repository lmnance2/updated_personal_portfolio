"use client";

import { SectionDivider } from "@/components/personal/section-divider";
import { SectionCarousel, type Slide } from "@/components/personal/section-carousel";

const slides: Slide[] = [
  { kind: "video", src: "/personal/dunk-1.mp4" },
  { kind: "image", src: "/personal/basketball-check.jpg", alt: "Checking up before a run." },
  { kind: "video", src: "/personal/dunk-2.mp4" },
  {
    kind: "stats",
    stats: [
      { lead: "Highest game.", emphasis: "31 pts" },
      { lead: "Opponents dropped.", emphasis: "1" },
      { lead: "First dunk.", emphasis: "Age 18" },
    ],
  },
];

export function BasketballSection() {
  return (
    <section id="basketball">
      <SectionDivider name="Basketball" tone="standard" />
      <div className="mx-auto max-w-[1400px] px-4 pb-20 sm:px-6 lg:px-8">
        <SectionCarousel slides={slides} label="Basketball section" />
      </div>
    </section>
  );
}
