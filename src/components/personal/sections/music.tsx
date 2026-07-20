import { SectionDivider } from "@/components/personal/section-divider";

type Track = {
  rank: number;
  title: string;
  artist: string;
  album: string;
  cover?: string;
};

const tracks: Track[] = [
  { rank: 1,  title: "Eternity",              artist: "Alex Warren",        album: "You'll Be Alright, Kid", cover: "/music/alex-warren-youll-be-alright-kid.jpg" },
  { rank: 2,  title: "When I Was Your Man",   artist: "Bruno Mars",         album: "Unorthodox Jukebox",     cover: "/music/bruno-mars-unorthodox-jukebox.jpg" },
  { rank: 3,  title: "7 Years",               artist: "Lukas Graham",       album: "Lukas Graham",           cover: "/music/lukas-graham-lukas-graham.jpg" },
  { rank: 4,  title: "Young and Beautiful",   artist: "Lana Del Rey",       album: "The Great Gatsby OST",   cover: "/music/lana-del-rey-great-gatsby.jpg" },
  { rank: 5,  title: "Stressed Out",          artist: "Twenty One Pilots",  album: "Blurryface",             cover: "/music/twenty-one-pilots-blurryface.jpg" },
  { rank: 6,  title: "Humankind",             artist: "David Kushner",      album: "The Dichotomy",          cover: "/music/david-kushner-the-dichotomy.jpg" },
  { rank: 7,  title: "Locked Out of Heaven",  artist: "Bruno Mars",         album: "Unorthodox Jukebox",     cover: "/music/bruno-mars-unorthodox-jukebox.jpg" },
  { rank: 8,  title: "I Gotta Feeling",       artist: "Black Eyed Peas",    album: "The E.N.D.",             cover: "/music/black-eyed-peas-the-end.jpg" },
  { rank: 9,  title: "Burning Down",          artist: "Alex Warren",        album: "You'll Be Alright, Kid", cover: "/music/alex-warren-youll-be-alright-kid.jpg" },
];

function TrackCard({ track }: { track: Track }) {
  const isTop = track.rank === 1;

  return (
    <figure
      className={[
        "bg-surface rounded-xl overflow-hidden border border-border",
        "group transition-all duration-200 ease-out",
        "hover:-translate-y-1 hover:shadow-md",
        isTop ? "col-span-2" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Album art */}
      <div className="aspect-square w-full overflow-hidden relative">
        {track.cover ? (
          <img
            src={track.cover}
            alt={`${track.title} by ${track.artist} — album cover`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-surface to-spark/40" />
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/8 transition-colors duration-200" />
      </div>

      {/* Card body */}
      <figcaption className="p-3 flex flex-col gap-0.5">
        <span
          className={`${isTop ? "text-base" : "text-sm"} font-semibold text-fg truncate`}
        >
          {track.title}
        </span>
        <span className="text-xs text-muted truncate">{track.artist}</span>
        <span className="text-xs text-muted">#{track.rank}</span>
      </figcaption>
    </figure>
  );
}

export function MusicSection() {
  return (
    <section id="music">
      <SectionDivider name="My Playlist" tone="standard" />
      <div className="mx-auto max-w-[1400px] px-4 pb-20 sm:px-6 lg:px-8">
        <p className="body mb-6" style={{ color: "var(--muted)" }}>
          What's been playing lately.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {tracks.map((track) => (
            <TrackCard key={track.rank} track={track} />
          ))}
        </div>
      </div>
    </section>
  );
}
