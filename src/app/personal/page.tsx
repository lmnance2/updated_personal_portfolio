import { TennisSection } from "@/components/personal/sections/tennis";
import { BasketballSection } from "@/components/personal/sections/basketball";
import { GolfSection } from "@/components/personal/sections/golf";
import { LibrarySection } from "@/components/personal/sections/library";
import { FitnessSection } from "@/components/personal/sections/fitness";
import { NowStrip } from "@/components/personal/now-strip";
import { Guestbook } from "@/components/personal/guestbook";
import { ThreadsButton } from "@/components/personal/threads-button";
import { MusicEmptyState } from "@/components/personal/music-empty-state";
import { SectionDivider } from "@/components/personal/section-divider";
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

      {/* Music: quiet divider + empty state */}
      <div id="music">
        <SectionDivider name="Music." tone="quiet" />
        <div className="mx-auto max-w-[1400px] px-4 pb-20 sm:px-6 lg:px-8">
          <MusicEmptyState />
        </div>
      </div>

      <NowStrip />
      <Guestbook />
      <ThreadsButton />
    </>
  );
}
