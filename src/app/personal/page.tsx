import { TennisSection } from "@/components/personal/sections/tennis";
import { BasketballSection } from "@/components/personal/sections/basketball";
import { GolfSection } from "@/components/personal/sections/golf";
import { LibrarySection } from "@/components/personal/sections/library";
import { FitnessSection } from "@/components/personal/sections/fitness";
import { MusicSection } from "@/components/personal/sections/music";
import { NowStrip } from "@/components/personal/now-strip";
import { Guestbook } from "@/components/personal/guestbook";
import { ThreadsButton } from "@/components/personal/threads-button";
import { SectionNav } from "@/components/personal/section-nav";

export default function PersonalPage() {
  return (
    <>
      <section className="mx-auto max-w-[1400px] px-4 pb-12 pt-16 sm:px-6 lg:px-8">
        <h1 className="display-h1">Off the clock.</h1>
        <p className="body-lg measure mt-5">
          Six threads: tennis, basketball, golf, the library, fitness, and music.
        </p>
      </section>

      <SectionNav />

      <TennisSection />
      <BasketballSection />
      <GolfSection />
      <LibrarySection />
      <FitnessSection />
      <MusicSection />

      <NowStrip />
      <Guestbook />
      <ThreadsButton />
    </>
  );
}
