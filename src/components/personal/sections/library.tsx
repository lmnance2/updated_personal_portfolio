"use client";

import { SectionDivider } from "@/components/personal/section-divider";
import { SectionCarousel, type Slide } from "@/components/personal/section-carousel";

const slides: Slide[] = [
  { kind: "book", cover: "/covers/warbreaker.jpg", title: "Warbreaker", author: "Brandon Sanderson", stars: 4 },
  { kind: "book", cover: "/covers/words-of-radiance.jpg", title: "Words of Radiance", author: "Brandon Sanderson", series: "Stormlight Archive", seriesPos: { index: 2, total: 5 }, stars: 4 },
  { kind: "book", cover: "/covers/towers-of-midnight.jpg", title: "Towers of Midnight", author: "Brandon Sanderson", series: "Wheel of Time", seriesPos: { index: 13, total: 14 }, stars: 5 },
  { kind: "book", cover: "/covers/red-rising.jpg", title: "Red Rising", author: "Pierce Brown", series: "Red Rising", seriesPos: { index: 1, total: 3 }, stars: 5 },
  { kind: "book", cover: "/covers/shadow-rising.jpg", title: "The Shadow Rising", author: "Robert Jordan", series: "Wheel of Time", seriesPos: { index: 4, total: 14 }, stars: 5 },
  { kind: "book", cover: "/covers/oathbringer.jpg", title: "Oathbringer", author: "Brandon Sanderson", series: "Stormlight Archive", seriesPos: { index: 3, total: 5 }, stars: 5 },
  { kind: "book", cover: "/covers/golden-son.jpg", title: "Golden Son", author: "Pierce Brown", series: "Red Rising", seriesPos: { index: 2, total: 3 }, stars: 5 },
  { kind: "book", cover: "/covers/way-of-kings.jpg", title: "The Way of Kings", author: "Brandon Sanderson", series: "Stormlight Archive", seriesPos: { index: 1, total: 5 }, stars: 5 },
  { kind: "book", cover: "/covers/memory-of-light.jpg", title: "A Memory of Light", author: "Brandon Sanderson/Robert Jordan", series: "Wheel of Time", seriesPos: { index: 14, total: 14 }, stars: 5 },
  { kind: "book", cover: "/covers/morning-star.jpg", title: "Morning Star", author: "Pierce Brown", series: "Red Rising", seriesPos: { index: 3, total: 3 }, stars: 5 },
  /*{ kind: "book", cover: "/covers/rhythm-of-war.jpg", title: "Rhythm of War", author: "Brandon Sanderson", series: "Stormlight Archive", seriesPos: { index: 4, total: 5 }, stars: 4 },
  { kind: "book", cover: "/covers/wind-and-truth.jpg", title: "Wind and Truth", author: "Brandon Sanderson", series: "Stormlight Archive", seriesPos: { index: 5, total: 5 }, stars: 4 },
  { kind: "book", cover: "/covers/eye-of-the-world.jpg", title: "The Eye of the World", author: "Robert Jordan", series: "Wheel of Time", seriesPos: { index: 1, total: 15 }, stars: 3 },
  { kind: "book", cover: "/covers/great-hunt.jpg", title: "The Great Hunt", author: "Robert Jordan", series: "Wheel of Time", seriesPos: { index: 2, total: 15 }, stars: 3 },
  { kind: "book", cover: "/covers/dragon-reborn.jpg", title: "The Dragon Reborn", author: "Robert Jordan", series: "Wheel of Time", seriesPos: { index: 3, total: 15 }, stars: 4 },*/
  /*{ kind: "book", cover: "/covers/fires-of-heaven.jpg", title: "The Fires of Heaven", author: "Robert Jordan", series: "Wheel of Time", seriesPos: { index: 5, total: 15 }, stars: 4 },
  { kind: "book", cover: "/covers/lord-of-chaos.jpg", title: "Lord of Chaos", author: "Robert Jordan", series: "Wheel of Time", seriesPos: { index: 6, total: 15 }, stars: 4 },
  { kind: "book", cover: "/covers/crown-of-swords.jpg", title: "A Crown of Swords", author: "Robert Jordan", series: "Wheel of Time", seriesPos: { index: 7, total: 15 }, stars: 3 },
  { kind: "book", cover: "/covers/path-of-daggers.jpg", title: "The Path of Daggers", author: "Robert Jordan", series: "Wheel of Time", seriesPos: { index: 8, total: 15 }, stars: 2 },
  { kind: "book", cover: "/covers/winters-heart.jpg", title: "Winter's Heart", author: "Robert Jordan", series: "Wheel of Time", seriesPos: { index: 9, total: 15 }, stars: 3 },
  { kind: "book", cover: "/covers/crossroads-of-twilight.jpg", title: "Crossroads of Twilight", author: "Robert Jordan", series: "Wheel of Time", seriesPos: { index: 10, total: 15 }, stars: 2 },
  { kind: "book", cover: "/covers/knife-of-dreams.jpg", title: "Knife of Dreams", author: "Robert Jordan", series: "Wheel of Time", seriesPos: { index: 11, total: 15 }, stars: 4 },
  { kind: "book", cover: "/covers/gathering-storm.jpg", title: "The Gathering Storm", author: "Brandon Sanderson", series: "Wheel of Time", seriesPos: { index: 12, total: 15 }, stars: 4 },*/
  /*{ kind: "book", cover: "/covers/final-empire.jpg", title: "The Final Empire", author: "Brandon Sanderson", series: "Mistborn Era 1", seriesPos: { index: 1, total: 3 }, stars: 4 },
  { kind: "book", cover: "/covers/well-of-ascension.jpg", title: "The Well of Ascension", author: "Brandon Sanderson", series: "Mistborn Era 1", seriesPos: { index: 2, total: 3 }, stars: 4 },*/
  //{ kind: "book", cover: "/covers/new-spring.jpg", title: "New Spring", author: "Robert Jordan", series: "Wheel of Time", seriesPos: { index: 15, total: 15 }, stars: 2 },
];

export function LibrarySection() {
  return (
    <section id="library">
      <SectionDivider name="Library" tone="standard" />
      <div className="mx-auto max-w-[1400px] px-4 pb-20 sm:px-6 lg:px-8">
        <SectionCarousel slides={slides} label="Library section" />
      </div>
    </section>
  );
}
