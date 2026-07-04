"use client";

import { SectionDivider } from "@/components/personal/section-divider";
import { SectionCarousel, type Slide } from "@/components/personal/section-carousel";

const slides: Slide[] = [
  { kind: "video", src: "/personal/lift-275.mp4" },
  { kind: "image", src: "/personal/mile-run.jpg", alt: "Mid-stride during a fast mile." },
  {
    kind: "stats",
    stats: [
      { lead: "Fastest mile.", emphasis: "5:39" },
      { lead: "Bench.", emphasis: "295 lb" },
      { lead: "Squat.", emphasis: "365 lb" },
      { lead: "Deadlift.", emphasis: "365 lb" },
    ],
  },
];

export function FitnessSection() {
  return (
    <section id="fitness">
      <SectionDivider name="Fitness" tone="standard" />
      <div className="mx-auto max-w-[1400px] px-4 pb-20 sm:px-6 lg:px-8">
        <SectionCarousel slides={slides} label="Fitness section" />
      </div>
    </section>
  );
}
