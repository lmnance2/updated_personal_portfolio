"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { PHOTOS } from "@/lib/photos";
import { useEasterEggs } from "@/components/easter-eggs/easter-egg-provider";

const ILIAD_QUOTES = [
  "Sing, O Goddess, the anger of Achilles, son of Peleus.",
  "Even were he made of stone, he would not stay still.",
  "The dawn rose like dropped roses, fingers and all.",
  "There is the heat of love, the pulsing rush of longing, the lover's whisper, irresistible.",
];

export function PhotoEssay() {
  const { unlock } = useEasterEggs();
  const [quoteIndex, setQuoteIndex] = useState(0);

  // Triple-click any Greek quote -> cycles. Implementation: count clicks within 600ms.
  useEffect(() => {
    let timer: number | null = null;
    let clicks = 0;
    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t?.closest("[data-greek-quote]")) return;
      clicks += 1;
      if (timer) window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        clicks = 0;
      }, 600);
      if (clicks >= 3) {
        clicks = 0;
        setQuoteIndex((i) => (i + 1) % ILIAD_QUOTES.length);
        unlock("myth-cycle");
      }
    };
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("click", onClick);
      if (timer) window.clearTimeout(timer);
    };
  }, [unlock]);

  return (
    <div>
      {/* 1. Tennis — full-bleed photo with overlaid display caption. */}
      <section className="relative w-full" style={{ height: "80vh" }}>
        <Image
          src={PHOTOS.tennis.src}
          alt={PHOTOS.tennis.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" aria-hidden />
        <div className="absolute inset-0 flex items-end p-6 md:p-16">
          <p
            className="display-hero"
            style={{
              color: "var(--bg)",
              fontSize: "clamp(2rem, 6vw, 5rem)",
              textShadow: "0 2px 24px rgba(0,0,0,0.3)",
            }}
          >
            Best serve: 102 mph (allegedly).
          </p>
        </div>
      </section>

      {/* 2. D&D — split block: text on the left, dice photo on the right. */}
      <section className="mx-auto grid max-w-[1400px] gap-0 px-4 py-20 sm:px-6 md:grid-cols-2 md:items-center md:gap-16">
        <div className="order-2 md:order-1">
          <p className="caption uppercase tracking-wider text-[var(--muted)]">D and D</p>
          <h3 className="display-h2 mt-2">
            I&apos;m the DM. Forty-seven sessions and counting.
          </h3>
          <p className="body-lg mt-5 measure">
            We started in a tavern in 2022 and somehow nobody has died yet. The rogue still talks to the goose like it owes her money. I keep the maps in a Notion, the lore in my head, and the snacks well above any health code.
          </p>
        </div>
        <div className="order-1 md:order-2 relative aspect-[4/3] overflow-hidden rounded-md">
          <Image
            src={PHOTOS.dice.src}
            alt={PHOTOS.dice.alt}
            fill
            sizes="(min-width:768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* 3. NBA analysis — three photos in a horizontal scroll strip (not autoplay). */}
      <section className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <h3 className="display-h2">NBA, parsed.</h3>
          <p className="caption text-[var(--muted)] max-w-sm">
            Pacers up 3-2. Indy at +6.5 next game. I made the spreadsheet you didn&apos;t ask for.
          </p>
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <div className="relative aspect-[4/3] overflow-hidden rounded-md">
            <Image
              src={PHOTOS.basketballHoop.src}
              alt={PHOTOS.basketballHoop.alt}
              fill
              sizes="(min-width:768px) 33vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-[var(--surface)] p-6">
            <p className="caption uppercase tracking-wider text-[var(--muted)]">shot chart</p>
            <p className="display-h2 mt-2" style={{ fontSize: "1.6rem" }}>
              Haliburton from the corner.
            </p>
            <p className="body mt-2 text-[var(--muted)] measure">
              45% from the left wing in clutch minutes. Stop helping off, please.
            </p>
            <p className="ui mt-4 tabular-nums" style={{ color: "var(--accent-strong)" }}>
              eFG 58%
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-md">
            <Image
              src={PHOTOS.starsMountains.src}
              alt="Stadium-feel night photo — the cathedral mood of playoff basketball."
              fill
              sizes="(min-width:768px) 33vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 4. Greek myth — drenched terracotta, no photo. Triple-click swaps the quote. */}
      <section className="bg-[var(--accent)] py-24 text-[var(--bg)]">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <blockquote
            data-greek-quote
            className="display-hero cursor-text select-text"
            style={{
              color: "var(--bg)",
              fontSize: "clamp(2rem, 5vw, 4.2rem)",
              fontStyle: "italic",
              lineHeight: 1.1,
            }}
          >
            “{ILIAD_QUOTES[quoteIndex]}”
          </blockquote>
          <p className="body-lg mt-8 measure" style={{ color: "var(--bg)" }}>
            Currently re-reading The Iliad (Lattimore). Working on an annotated digital edition: side-by-side glosses, character map, full-text search, and footnotes that actually help.
          </p>
          <p className="caption mt-3" style={{ color: "var(--bg)", opacity: 0.75 }}>
            (try triple-clicking the quote)
          </p>
        </div>
      </section>

      {/* 5. Reading — three book covers + a "currently reading" pinned book. */}
      <section className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6">
        <h3 className="display-h2">On the nightstand.</h3>
        <div className="mt-10 grid gap-8 lg:grid-cols-[2fr_3fr]">
          <div className="relative aspect-[3/4] overflow-hidden rounded-md">
            <Image
              src={PHOTOS.bookshelfTunnel.src}
              alt={PHOTOS.bookshelfTunnel.alt}
              fill
              sizes="(min-width:1024px) 40vw, 100vw"
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-5">
              <p className="caption" style={{ color: "var(--bg)", opacity: 0.85 }}>
                currently reading
              </p>
              <p className="display-h2" style={{ color: "var(--bg)", fontSize: "1.5rem" }}>
                The Iliad, Lattimore translation
              </p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { t: "Gödel, Escher, Bach", a: "Hofstadter", n: "the canonical one" },
              { t: "The Old Man and the Sea", a: "Hemingway", n: "shortest. best." },
              { t: "Where the Crawdads Sing", a: "Owens", n: "surprised me" },
            ].map((b) => (
              <div
                key={b.t}
                className="flex flex-col justify-between rounded-md border border-[var(--border)] bg-[var(--surface)] p-5"
              >
                <p className="display-h3">{b.t}</p>
                <div>
                  <p className="caption text-[var(--muted)]">{b.a}</p>
                  <p className="caption mt-3" style={{ color: "var(--accent-strong)" }}>
                    {b.n}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Movies — strip with two photos + one typographic card. */}
      <section className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6">
        <h3 className="display-h2">Recently watched.</h3>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="relative aspect-[3/4] overflow-hidden rounded-md">
            <Image src={PHOTOS.filmReels.src} alt={PHOTOS.filmReels.alt} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover" />
          </div>
          <div className="relative aspect-[3/4] overflow-hidden rounded-md">
            <Image src={PHOTOS.movieClapboard.src} alt={PHOTOS.movieClapboard.alt} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover" />
          </div>
          <div className="aspect-[3/4] rounded-md bg-[var(--accent)] p-6 text-[var(--bg)]">
            <p className="caption uppercase tracking-wider" style={{ color: "var(--bg)", opacity: 0.85 }}>
              this week
            </p>
            <p className="display-h2 mt-3" style={{ color: "var(--bg)", fontSize: "1.7rem", lineHeight: 1.1 }}>
              Past Lives. Sicario. Dune Pt 2.
            </p>
            <p className="body mt-3" style={{ color: "var(--bg)" }}>
              Letterboxd four-star streak going strong. Currently making my way through Villeneuve&apos;s filmography in reverse.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Sports trio (Lifting / Biking / Golf / Basketball) — one large + three small. */}
      <section className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6">
        <h3 className="display-h2">The rest of the body.</h3>
        <div className="mt-8 grid gap-4 md:grid-cols-3 md:grid-rows-2">
          <div className="relative col-span-2 row-span-2 aspect-[4/3] overflow-hidden rounded-md md:aspect-auto">
            <Image
              src={PHOTOS.golfSwing.src}
              alt={PHOTOS.golfSwing.alt}
              fill
              sizes="(min-width:768px) 66vw, 100vw"
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-5">
              <p className="display-h2" style={{ color: "var(--bg)", fontSize: "1.6rem" }}>
                Golf. Handicap dropping (slowly).
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-md">
            <Image
              src={PHOTOS.liftingFitness.src}
              alt={PHOTOS.liftingFitness.alt}
              fill
              sizes="(min-width:768px) 33vw, 100vw"
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
              <p className="ui" style={{ color: "var(--bg)" }}>
                Lifting
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-md">
            <Image
              src={PHOTOS.cyclingPeloton.src}
              alt={PHOTOS.cyclingPeloton.alt}
              fill
              sizes="(min-width:768px) 33vw, 100vw"
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
              <p className="ui" style={{ color: "var(--bg)" }}>
                Biking
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
