/**
 * Cover fetcher. Hits Open Library's search API for each book and writes
 * the highest-resolution cover to /public/covers/<slug>.jpg.
 *
 * Run:  npm run fetch-covers
 * Node 18+ required for built-in fetch.
 */

import { writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

type Book = { slug: string; title: string; author: string };

const BOOKS: Book[] = [
  { slug: "way-of-kings", title: "The Way of Kings", author: "Brandon Sanderson" },
  { slug: "words-of-radiance", title: "Words of Radiance", author: "Brandon Sanderson" },
  { slug: "oathbringer", title: "Oathbringer", author: "Brandon Sanderson" },
  { slug: "rhythm-of-war", title: "Rhythm of War", author: "Brandon Sanderson" },
  { slug: "wind-and-truth", title: "Wind and Truth", author: "Brandon Sanderson" },
  { slug: "warbreaker", title: "Warbreaker", author: "Brandon Sanderson" },
  { slug: "eye-of-the-world", title: "The Eye of the World", author: "Robert Jordan" },
  { slug: "great-hunt", title: "The Great Hunt", author: "Robert Jordan" },
  { slug: "dragon-reborn", title: "The Dragon Reborn", author: "Robert Jordan" },
  { slug: "shadow-rising", title: "The Shadow Rising", author: "Robert Jordan" },
  { slug: "fires-of-heaven", title: "The Fires of Heaven", author: "Robert Jordan" },
  { slug: "lord-of-chaos", title: "Lord of Chaos", author: "Robert Jordan" },
  { slug: "crown-of-swords", title: "A Crown of Swords", author: "Robert Jordan" },
  { slug: "path-of-daggers", title: "The Path of Daggers", author: "Robert Jordan" },
  { slug: "winters-heart", title: "Winter's Heart", author: "Robert Jordan" },
  { slug: "crossroads-of-twilight", title: "Crossroads of Twilight", author: "Robert Jordan" },
  { slug: "knife-of-dreams", title: "Knife of Dreams", author: "Robert Jordan" },
  { slug: "gathering-storm", title: "The Gathering Storm", author: "Brandon Sanderson" },
  { slug: "towers-of-midnight", title: "Towers of Midnight", author: "Brandon Sanderson" },
  { slug: "memory-of-light", title: "A Memory of Light", author: "Brandon Sanderson" },
  { slug: "new-spring", title: "New Spring", author: "Robert Jordan" },
  { slug: "final-empire", title: "The Final Empire", author: "Brandon Sanderson" },
  { slug: "well-of-ascension", title: "The Well of Ascension", author: "Brandon Sanderson" },
  { slug: "red-rising", title: "Red Rising", author: "Pierce Brown" },
  { slug: "golden-son", title: "Golden Son", author: "Pierce Brown" },
  { slug: "morning-star", title: "Morning Star", author: "Pierce Brown" },
];

type SearchDoc = { cover_i?: number };
type SearchResult = { docs?: SearchDoc[] };

async function getCoverId(book: Book): Promise<number | null> {
  const url = new URL("https://openlibrary.org/search.json");
  url.searchParams.set("title", book.title);
  url.searchParams.set("author", book.author);
  url.searchParams.set("limit", "5");
  const r = await fetch(url);
  if (!r.ok) return null;
  const j = (await r.json()) as SearchResult;
  const hit = j.docs?.find((d) => d.cover_i);
  return hit?.cover_i ?? null;
}

async function downloadCover(coverId: number, outPath: string) {
  const url = `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
  const r = await fetch(url);
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const buf = Buffer.from(await r.arrayBuffer());
  await writeFile(outPath, buf);
}

async function main() {
  const outDir = join(process.cwd(), "public", "covers");
  await mkdir(outDir, { recursive: true });

  for (const book of BOOKS) {
    const out = join(outDir, `${book.slug}.jpg`);
    try {
      const id = await getCoverId(book);
      if (!id) {
        console.warn(`no cover: ${book.title}`);
        continue;
      }
      await downloadCover(id, out);
      console.log(`ok: ${book.slug}`);
    } catch (err) {
      console.warn(`fail: ${book.slug}`, err);
    }
    // Be polite.
    await new Promise((r) => setTimeout(r, 300));
  }
}

main();
