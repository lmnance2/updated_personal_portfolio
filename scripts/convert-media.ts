/**
 * Media conversion pipeline. Reads from personal_page_media/, writes to public/personal/.
 * Run:  npm run convert-media
 * Add --force to re-convert existing outputs.
 */

import { existsSync } from "node:fs";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join, resolve } from "node:path";
import { statSync } from "node:fs";

const ROOT = resolve(process.cwd());
const SRC = join(ROOT, "personal_page_media");
const OUT = join(ROOT, "public", "personal");
const FORCE = process.argv.includes("--force");

function fmtBytes(n: number) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}

function fileSize(p: string) {
  try { return statSync(p).size; } catch { return 0; }
}

async function ensureOut() {
  if (!existsSync(OUT)) await mkdir(OUT, { recursive: true });
}

async function convertImage(src: string, dest: string, label: string) {
  if (!FORCE && existsSync(dest)) {
    console.log(`skip (exists): ${label}`);
    return;
  }
  try {
    const sharp = (await import("sharp")).default;
    await sharp(src).resize({ width: 2400, withoutEnlargement: true }).jpeg({ quality: 85 }).toFile(dest);
    const before = fileSize(src);
    const after = fileSize(dest);
    console.log(`ok: ${label}  ${fmtBytes(before)} -> ${fmtBytes(after)}`);
  } catch (err) {
    console.error(`fail: ${label}`, err);
  }
}

async function convertHeic(src: string, dest: string, label: string) {
  if (!FORCE && existsSync(dest)) {
    console.log(`skip (exists): ${label}`);
    return;
  }
  try {
    const heicConvert = (await import("heic-convert")).default;
    const sharp = (await import("sharp")).default;
    const input = await readFile(src);
    const converted = await heicConvert({ buffer: input as Buffer, format: "JPEG", quality: 1 });
    const tmp = dest + ".tmp.jpg";
    await writeFile(tmp, Buffer.from(converted as ArrayBuffer));
    await sharp(tmp).resize({ width: 2400, withoutEnlargement: true }).jpeg({ quality: 85 }).toFile(dest);
    const { unlink } = await import("node:fs/promises");
    await unlink(tmp).catch(() => {});
    const before = fileSize(src);
    const after = fileSize(dest);
    console.log(`ok: ${label}  ${fmtBytes(before)} -> ${fmtBytes(after)}`);
  } catch (err) {
    console.error(`fail: ${label}`, err);
  }
}

async function convertVideo(src: string, dest: string, label: string) {
  if (!FORCE && existsSync(dest)) {
    console.log(`skip (exists): ${label}`);
    return;
  }
  let ffmpegPath: string | undefined;
  try {
    ffmpegPath = (await import("ffmpeg-static")).default ?? undefined;
  } catch {
    console.error(
      `fail: ${label} — ffmpeg-static not installed. Run: npm install ffmpeg-static --no-save`,
    );
    return;
  }
  try {
    const ffmpeg = (await import("fluent-ffmpeg")).default;
    if (ffmpegPath) ffmpeg.setFfmpegPath(ffmpegPath);
    await new Promise<void>((resolve, reject) => {
      ffmpeg(src)
        .videoCodec("libx264")
        .outputOptions(["-crf 23", "-preset slow", "-movflags +faststart"])
        .audioCodec("aac")
        .on("end", () => resolve())
        .on("error", reject)
        .save(dest);
    });
    const before = fileSize(src);
    const after = fileSize(dest);
    console.log(`ok: ${label}  ${fmtBytes(before)} -> ${fmtBytes(after)}`);
  } catch (err) {
    console.error(`fail: ${label}`, err);
  }
}

type Task =
  | { type: "heic"; src: string; dest: string; label: string }
  | { type: "image"; src: string; dest: string; label: string }
  | { type: "video"; src: string; dest: string; label: string };

const TASKS: Task[] = [
  { type: "heic", src: join(SRC, "Tennis_Picture.heic"), dest: join(OUT, "tennis-hero.jpg"), label: "tennis-hero.jpg" },
  { type: "image", src: join(SRC, "Mile_Run.PNG"), dest: join(OUT, "mile-run.jpg"), label: "mile-run.jpg" },
  { type: "image", src: join(SRC, "Basketball_Check_Picture.jpg"), dest: join(OUT, "basketball-check.jpg"), label: "basketball-check.jpg" },
  { type: "video", src: join(SRC, "Tennis_Video_1.MP4"), dest: join(OUT, "tennis-1.mp4"), label: "tennis-1.mp4" },
  { type: "video", src: join(SRC, "Tennis_Video_2.MP4"), dest: join(OUT, "tennis-2.mp4"), label: "tennis-2.mp4" },
  { type: "video", src: join(SRC, "Dunk_Off_1.MOV"), dest: join(OUT, "dunk-1.mp4"), label: "dunk-1.mp4" },
  { type: "video", src: join(SRC, "Dunk_Off_2.MOV"), dest: join(OUT, "dunk-2.mp4"), label: "dunk-2.mp4" },
  { type: "video", src: join(SRC, "Golf_Video_1.MOV"), dest: join(OUT, "golf-1.mp4"), label: "golf-1.mp4" },
  { type: "video", src: join(SRC, "Golf_Video_2.MOV"), dest: join(OUT, "golf-2.mp4"), label: "golf-2.mp4" },
  { type: "video", src: join(SRC, "275_lift.MOV"), dest: join(OUT, "lift-275.mp4"), label: "lift-275.mp4" },
];

async function main() {
  await ensureOut();

  if (!existsSync(SRC)) {
    console.error(`Source directory not found: ${SRC}`);
    console.error("Place your media files in personal_page_media/ first.");
    process.exit(1);
  }

  for (const task of TASKS) {
    if (!existsSync(task.src)) {
      console.warn(`skip (source missing): ${task.label}`);
      continue;
    }
    if (task.type === "heic") await convertHeic(task.src, task.dest, task.label);
    else if (task.type === "image") await convertImage(task.src, task.dest, task.label);
    else await convertVideo(task.src, task.dest, task.label);
  }

  console.log("\nDone.");
}

main();
