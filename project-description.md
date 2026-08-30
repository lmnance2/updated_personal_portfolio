# Project Description — Liam Nance Portfolio

## 1. Purpose

This codebase is **Liam Nance's personal portfolio**: a single Next.js site that presents him to recruiters, collaborators, and curious visitors. Liam is an undergraduate Computer Science student at the University of Illinois Urbana–Champaign (Grainger College of Engineering, expected May 2028, GPA 3.90, minor in Business).

The site is organized around an explicit two-halves framing stated on the homepage:

- **Professional side** (`/professional`) — the resume: skills, experience, projects, education, and contact.
- **Personal side** (`/personal`) — the off-the-clock stuff: tennis, basketball, golf, books, fitness, music, plus a guestbook.

The product goals (from `CLAUDE.md`) are: present a strong undergrad CS student, showcase technical projects clearly, inject personality without feeling generic or corporate, stay easy to extend, and balance polish with playfulness. The design direction explicitly avoids dark mode unless aesthetically necessary, prioritizes clear visual hierarchy, smooth-but-not-distracting animation, accessibility, and a strong first impression.

## 2. Tech stack

| Layer                   | Choice                                                                        |
| ----------------------- | ----------------------------------------------------------------------------- |
| Framework               | **Next.js 16** (App Router)                                                   |
| Runtime                 | **React 19**, React DOM 19                                                    |
| Language                | **TypeScript 5** (strict mode)                                                |
| Styling                 | **Tailwind CSS v4** (`@tailwindcss/postcss`), CSS variables for design tokens |
| Animation               | **Framer Motion 12** (layout-id underlines, springs)                          |
| Icons                   | **lucide-react**                                                              |
| Class merging           | `clsx` + `tailwind-merge` (wrapped in `src/lib/cn.ts`)                        |
| Font                    | **Bricolage Grotesque** (Google Fonts, with `opsz` + `wdth` axes)             |
| Server state            | Next.js Route Handlers with `revalidate` caching                              |
| Persistence (guestbook) | **Vercel KV** in prod; file-backed JSON in `.data/` for dev                   |
| Profanity filter        | `bad-words` (lazy) + local `@xenova/transformers` running `Xenova/toxic-bert` |
| Media pipeline          | `sharp`, `heic-convert`, `ffmpeg-static` + `fluent-ffmpeg` via `tsx` scripts  |
| Linting                 | ESLint 9 (`eslint-config-next`)                                               |
| Deployment              | Vercel-ready vanilla Next.js project                                          |

`next.config.ts` only customizes one thing: allowing remote images from `images.unsplash.com`. Path alias `@/*` → `./src/*` is set in `tsconfig.json`.

## 3. Top-level layout

```
.
├── CLAUDE.md                    # orchestrator instructions for Claude Code
├── README.md                    # public-facing how-to
├── MEDIA-CONVERSION.md          # how to run the media + cover scripts
├── changes.md                   # the v2 punch-list driving current refactor
├── resume.md                    # source-of-truth resume copy
├── project-description.md       # (this file)
├── package.json                 # scripts: dev / build / start / lint / convert-media / fetch-covers
├── next.config.ts
├── tsconfig.json                # paths: @/* → ./src/*
├── postcss.config.mjs
├── eslint.config.mjs
├── .env.example                 # GUESTBOOK_ADMIN_TOKEN + KV_* keys
├── .data/                       # gitignored: file-backed guestbook in dev
├── personal_page_media/         # raw uploads (HEIC, MOV, PNG)
├── public/
│   ├── personal/                # processed photos + videos (script output)
│   ├── covers/                  # book covers (script output)
│   ├── projects/                # optional project demo videos / posters
│   └── party/                   # halftime.mp3 slot (legacy)
├── scripts/
│   ├── convert-media.ts         # HEIC→JPG, PNG→JPG, MOV→MP4 pipeline
│   └── fetch-covers.ts          # Open Library cover downloader
└── src/
    ├── app/                     # App Router pages, layout, route handlers
    ├── components/              # Feature-grouped React components
    ├── data/                    # Project catalog (new v2)
    └── lib/                     # Pure data + utilities
```

## 4. Design system

All theming lives at the top of `src/app/globals.css` as CSS variables, bridged into Tailwind v4 via `@theme inline`:

| Token             | Value     | Role                                    |
| ----------------- | --------- | --------------------------------------- |
| `--bg`            | `#FAF6F0` | cream paper background                  |
| `--surface`       | `#F2EDE3` | raised paper                            |
| `--fg`            | `#1A1A1A` | ink (primary text)                      |
| `--muted`         | `#6B6B6B` | soft ink (secondary)                    |
| `--accent`        | `#E07856` | terracotta solid (primary brand color)  |
| `--accent-strong` | `#B85A3D` | terracotta as text on cream (AA-safe)   |
| `--spark`         | `#F2C14E` | mustard, used to "drench" the Now strip |
| `--border`        | `#E4DDD0` | hairline borders                        |
| `--ring`          | `#1A1A1A` | focus outline                           |

The palette is light-mode only and intentionally "cream paper + terracotta + mustard" — a printed-zine feel rather than SaaS gradients.

**Typography utilities** (`globals.css`): `.display-hero`, `.display-h1`, `.display-h2`, `.display-h3`, `.body-lg`, `.body`, `.ui`, `.caption`, plus `.measure` (max 65ch). Bricolage Grotesque is loaded with optical-size and width axes for tight display headlines.

**Accessibility primitives** baked into the global CSS:

- A mandatory `@media (prefers-reduced-motion: reduce)` guard that flattens transitions, animation duration, and scroll behavior.
- A global `*:focus-visible` rule: 2px solid ring, 2px offset, never `outline: none`.
- `::selection` colored with the accent.

Custom keyframes: `.spin-slow` (30s linear infinite, pauses on hover) used by the homepage rotating year, `.chip-underline` / `.chip-underline.lit` for the skill-graph hover-link relationship, `bubbleEnter` for the stats slide floating bubbles, and `rankFadeIn` for the book slide rank numeral entrance (200ms ease-out-quart, wrapped in `prefers-reduced-motion: no-preference`).

## 5. App Router pages

### `src/app/layout.tsx` — Root

Loads Bricolage, sets metadata, and renders the persistent `SiteNav` + `Footer` around `{children}`. `<main>` is padded by `pt-[64px]` to clear the sticky nav.

### `src/app/page.tsx` — Home (`/`)

Two pieces:

1. `<HeroSplit />` — the brand impression.
2. A below-the-fold editorial paragraph that does the information architecture work, with a gradient bridge from accent → bg and two text links to `/professional` and `/personal`.

### `src/app/professional/page.tsx` — Professional

A six-section vertical: sub-nav, page header (with a "Download resume.pdf" pill), `<SkillGraph />`, `<ExperienceTimeline />`, `<ProjectsGallery />`, `<Education />`, `<Contact />`, and a mobile-only `<JumpButton />`.

### `src/app/personal/page.tsx` — Personal

The new v2 layout: a header ("Off the clock."), then six `Section` components (`Tennis`, `Basketball`, `Golf`, `Library`, `Fitness`, `Music`), then `<NowStrip />`, `<Guestbook />`, and `<ThreadsButton />`. Each sports/library/fitness section uses a `<SectionCarousel />` for slide-through content; the music section uses a custom card grid layout.

### `src/app/not-found.tsx` — 404

A friendly 404 with an interactive `<BasketballToy />` (a hand-rolled `requestAnimationFrame` physics ball: gravity, friction, click-to-launch) and links back to the three top pages.

### `src/app/api/` — Route Handlers

| Route                  | Method     | Purpose                                                                                                                                                             |
| ---------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/api/github`          | GET        | Aggregates public GitHub PushEvents for `SITE.github` into a 7-day commits-per-day sparkline. `revalidate = 86400` (24h). Falls back to a static series on failure. |
| `/api/feed`            | GET        | Returns a static array of rotating "now in the feed" items (NBA series, Wordle streak, weather, etc.). 24h revalidate.                                              |
| `/api/guestbook`       | GET / POST | Lists or creates guestbook entries. POST runs `bad-words` profanity check, a local `Xenova/toxic-bert` toxicity classifier (thresholds per label; graceful no-op if the model is unavailable), and per-IP rate-limit (1 / 24h). |
| `/api/guestbook/admin` | DELETE     | Token-protected delete-by-id. Reads `GUESTBOOK_ADMIN_TOKEN` from env; returns 503 if unset.                                                                         |
| `/api/guestbook/test`  | GET        | Diagnostics: which store backend (`kv` vs `file`) and entry count.                                                                                                  |

## 6. Components — Professional

### `home/hero-split.tsx` (used by `/`)

Two-column hero: cream half with the slow-rotating year, terracotta-drenched half with the tagline ("I write code. Sometimes it does something useful."), a hairline divider, name plate, and two pill CTAs to the two halves.

### `home/rotating-number.tsx`

"2028" rendered in display-hero type, continuously rotating via `.spin-slow`. Hover for 3 s flips the digit to 2024 (when he started college) and back on leave.

### `site-nav.tsx`

Sticky 64px top header. Logo links home; three nav items (`Home`, `Professional`, `Personal`) get an animated terracotta underline when active. Resume link opens `/Liam_Nance_Resume.pdf` in a new tab. Mobile: hamburger toggles a dropdown.

### `footer.tsx`

Single line: email · `github.com/<handle>` · LinkedIn URL. Built in Champaign, IL caption.

### `professional/sub-nav.tsx` — `ProfessionalSubNav`

Desktop sticky secondary nav under the main one. Uses `IntersectionObserver` (threshold 0.3) to detect which section is in view and animates a Framer Motion `layoutId` underline between tabs. Hides on scroll-down with 10px hysteresis. Mobile shows `<JumpButton />` (bottom-right floating popover with the same anchors).

### `professional/skill-graph.tsx` — `SkillGraph`

Centerpiece of the professional page. Two-column layout:

- **Left:** chip cloud grouped by `Languages` / `Frameworks` / `Tools` from `SKILLS` in `src/lib/data.ts`. Chips are a roving-tabindex group: arrows traverse, Enter toggles, Esc clears, Home/End jump. Selection is multi with AND logic. An `aria-live="polite"` region announces the filter state.
- **Right:** "Where I've used them" — a unified list of every Experience + Project. Default cap is 10 with a fade mask and a `"N more."` toggle; any filter bypasses the cap. Non-matching cards stagger-fade to `opacity-30 blur-[1px] saturate-50`. Hovering a card lights up the chips it touches (`.chip-underline.lit`).

### `professional/experience-timeline.tsx` — `ExperienceTimeline`

The "drenched" terracotta moment of the page: cream text on accent, vertical rail with bullet medallions, stacked entries from `EXPERIENCES`. Each entry shows company, role, location, dates, summary, bullets, and skill chips.

### `professional/projects-gallery.tsx` — `ProjectsGallery`

v3 gallery driven by `src/data/projects.ts`:

- Default ("All") view: 6 featured projects in a composed layout — a full-width feature card, a 2-col row, then a 3-col row where slot 5 is rendered on the terracotta surface (`StandardCard terra`). Below that, an `Archive` section lists the rest as rows.
- Filtered view: a flat 2-col card grid of projects matching the selected category.
- A horizontal tab strip with counts is the filter UI (single-select, Framer Motion `layoutId` underline).
- Click any card → a Sheet drawer slides in from the right with the long description, an autoplay-on-demand video element (`/projects/<slug>.mp4`), tech chips, categories, and a GitHub link if present.

### `professional/education.tsx` — `Education`

Two-column block: Education (school, major, GPA, expected grad, coursework join) and Extracurriculars (`EXTRACURRICULARS` list, name + role per row).

### `professional/contact.tsx` — `Contact`

"Hire me, or talk shop." Mail link, copy-email button (`navigator.clipboard`, `aria-live` confirmation), download-resume pill, plus footer-style social links.

## 7. Components — Personal

### `personal/section-divider.tsx` — `SectionDivider`

A title-only slide that creates the breathing room between threads. `tone` in `opener` (60vh padding-bottom) / `standard` (36vh) / `quiet` (20vh). Renders the section title in giant Bricolage.

### `personal/section-carousel.tsx` — `SectionCarousel`

The unified slide widget used by every personal section. Supports four slide kinds:

- `VideoSlide` — `<video controls playsInline preload="metadata">` whose `src` is appended with `#t=0.001` so browsers render the first frame as the natural poster. Wrapper has a dark `var(--fg)` letterbox; `<video>` uses `object-contain` so portrait clips are not cropped. Optional caption overlay.
- `ImageSlide` — `<img>` with `object-contain` and the same dark letterbox wrapper, so tall portrait images render in full.
- `StatsSlide` — a single "floating bubbles" composition that combines all of a section's stats. Hero bubble (index 0) is drenched terracotta with cream text; satellites are cream paper with an ink hairline border. Bubbles are absolutely positioned with editorial asymmetry (2-, 3-, and 4-bubble layouts), sized via `clamp()`, and animated in with a staggered 480ms `bubbleEnter` keyframe (defined in `globals.css`). Hover lifts the shadow and adds a `var(--accent)` outline ring. Long emphasis values auto-scale font size and use `white-space: nowrap` on satellites to keep "295 lb" / "Age 18" on one line. Background includes a single oversized hairline outline circle peeking from the top-right corner for editorial layering.
- `BookSlide` — three-column editorial layout (desktop): 28% rank hero / 32% cover / 40% meta. The rank hero shows the numero glyph, a giant rank numeral (`clamp(6rem, 12vw, 10rem)`) in weight 900, a hairline rule, and "10" at 35% opacity as denominator. The rank numeral fades in (200ms ease-out-quart) on slide change via CSS `rankFadeIn` keyframe triggered by React `key` remount. Cover gets a warm drop shadow. Meta shows series topline (uppercase, dot-separated with book position), title, author, and an inline star-plus-rating (Lucide Star filled, numeric in Bricolage weight 600 at 1.75rem, "/10" in body muted). Mobile omits the giant fraction and instead shows a compact "No 3" rank line above the cover. Full ARIA wiring on rank container and rating element.

Navigation: prev/next chevron buttons on desktop sides, below the slide on mobile, plus left/right arrow keys when the carousel region is focused. Two paginator modes: a horizontal progress bar (default, used by non-book sections) or dot segments (6px circles, filled/unfilled) selected via an optional `paginator="dots"` prop. Includes accessibility wiring (`role="region"`, `aria-roledescription="carousel"`, `aria-live="polite"`).

### `personal/sections/tennis.tsx` — `TennisSection`

Slides: two tennis videos (first-frame previews), the tennis hero photo, and one stats slide combining Fastest serve 115 mph, Peak UTR 7.91, and Racket Pro Staff.

### `personal/sections/basketball.tsx` — `BasketballSection`

Slides: two dunk videos (first-frame previews), the "checking up" photo, and one stats slide combining Highest game 31 pts, Opponents dropped 1, and First dunk Age 18.

### `personal/sections/golf.tsx` — `GolfSection`

Two golf videos (first-frame previews) and one stats slide with Handicap 15.1 and Best score 85.

### `personal/sections/library.tsx` — `LibrarySection`

**Top 10 Books redesign (2026-07-03).** The section is now titled "Ten I'd Reread" with a subtitle "Counting down to the one." The `BookSlide` type has replaced `stars: 0-5` with `rank: number` (1-10) and `rating: number` (0-10). The 10 active books are assigned ranks 10 down to 1 (first slide = rank 10, last = rank 1), with ratings in the 7.5-10 range and Morning Star (rank 1) receiving a 10/10. The carousel uses `paginator="dots"` for dot-segment navigation. The commented-out bonus books are preserved in place.

### `personal/sections/fitness.tsx` — `FitnessSection`

A 275-lb lift video, the mile-run photo, and one stats slide combining Fastest mile 5:39, Bench 295 lb, Squat 365 lb, and Deadlift 365 lb.

### `personal/sections/music.tsx` — `MusicSection`

Statically-curated playlist grid. Defines a local `Track` type (`rank`, `title`, `artist`, `album`, `cover?`) and a `tracks` array of 10 entries. Renders a responsive card grid (`grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5`) where each card is a `<figure>` with a square album art area and a `<figcaption>` body (title in `text-fg`, artist and rank in `text-muted`). The rank-1 card spans 2 columns and has a larger title. When no `cover` is set, the art area shows a warm `from-surface to-spark/40` gradient fallback. Hover lifts cards with `-translate-y-1 shadow-md`. Cover images go in `personal_page_media/music/` and are served from `/personal_page_media/music/<filename>`.

### `personal/now-strip.tsx` — `NowStrip`

A mustard-drenched, three-column strip below all the sections. Three static columns Liam updates by hand:

- **Currently reading** — Iron Gold, Pierce Brown.
- **Currently watching** — Vikings.
- **Currently building** — Event Consolidator Website.

Now a plain server component (no fetches, no rotation, no fallbacks needed).

### `personal/guestbook.tsx` — `Guestbook`

Form posts `{ message, name? }` to `/api/guestbook`. Character counter (240 cap, warns at 220), name optional (40 cap, defaults to "Anonymous"), client-side validation for empty. Error codes from the server are mapped to short copy: `profanity` → "Cool it on the trash talk.", `rate_limit` → "One a day. Try again tomorrow.", `too_long`, `empty`, `network`. Entries render as paper cards (the newest is rotated 1.5 degrees for a tacked-up feel). If the server returns 503 (no store available), shows a "Be the first to sign" empty state.

### `personal/threads-button.tsx` — `ThreadsButton`

Bottom-right floating pill that opens a popover with anchor links to the six section ids (`tennis`, `basketball`, `golf`, `library`, `fitness`, `music`). Click-outside closes.

### `personal/hover-video.tsx` — `HoverVideo`

Hover-to-autoplay-muted (desktop) / tap-to-play (mobile) reserved 16:9 video block with a play-button overlay. Used by older parts of the gallery; the new carousel uses standard `<video controls>` directly.

### `not-found/basketball-toy.tsx` — `BasketballToy`

2D bouncing ball physics toy on the 404 page (hand-rolled with `requestAnimationFrame`, gravity 0.5, ground friction 0.7, wall friction 0.6, click to launch with randomized velocity).

## 8. UI primitives

`src/components/ui/sheet.tsx` — `Sheet`, `SheetContent`, `SheetClose`. A from-scratch shadcn-style side panel without Radix: context provider, focus trap on tab cycling, esc-to-close, click-outside backdrop, body scroll lock, focus restore on unmount. Supports `side="right" | "bottom"`.

`src/components/ui/dialog.tsx` — A complementary tiny centered modal with the same trap/esc/click-outside pattern.

## 9. Data layer (`src/lib/`, `src/data/`)

- **`src/lib/site.ts`** — `SITE` constant: name, email, GitHub handle (`lmnance2`) + URL, LinkedIn, location, school, major, GPA, expected grad. Single source for site-wide identity strings.
- **`src/lib/data.ts`** — `SKILLS` (grouped Languages/Frameworks/Tools), `EXPERIENCES`, `PROJECTS` (legacy schema used by `SkillGraph`), `EXTRACURRICULARS`, `COURSEWORK`. Each experience and project lists the skills it touches, which `SkillGraph` filters with AND logic.
- **`src/data/projects.ts`** — The new v2 project catalog used by `ProjectsGallery`. `Project` has `slug`, `name`, `description`, `longDescription`, `techTags`, `categories[]` (`ML | AI | Frontend | Backend | Database | Full-Stack | CV | Mobile | Research`), optional `githubUrl`, `featured` + `featuredSlot` for gallery composition. Includes a `gh()` helper that builds `https://github.com/lmnance2/<repo>` URLs and a `countByCategory()` helper for tab counts.
- **`src/lib/photos.ts`** — Stable Unsplash photo IDs with verified URLs and alt text.
- **`src/lib/cn.ts`** — `cn = twMerge(clsx(...))` helper.
- **`src/lib/guestbook-store.ts`** — Dual-backend store. Detects `KV_REST_API_URL` + `KV_REST_API_TOKEN` to lazy-import `@vercel/kv`; otherwise falls back to a JSON file at `.data/guestbook.json` plus a rate-limit file `.data/guestbook-rl.json`. Exposes `getEntries`, `addEntry`, `deleteEntry`, `checkRateLimit`, `getStoreInfo`. Caps entries at 500 and ratelimits at one post per IP per 24h (in KV: 24h TTL; in file: timestamp sweep).

## 10. Scripts

`package.json` scripts:

- `dev` / `build` / `start` — standard Next.
- `lint` — `eslint`.
- `convert-media` — runs `scripts/convert-media.ts` via `tsx`. Reads `personal_page_media/` and writes `public/personal/`. Pipelines: HEIC → JPEG via `heic-convert` then resized through `sharp`; PNG → JPEG via `sharp`; MOV → MP4 (`libx264`, CRF 23, preset slow, `+faststart`, AAC audio) via `ffmpeg-static` + `fluent-ffmpeg`. Idempotent; pass `--force` to re-convert. Specific source/dest mappings are hardcoded in the `TASKS` array.
- `fetch-covers` — runs `scripts/fetch-covers.ts` to download Open Library covers into `public/covers/` keyed by slug.

Optional peer deps (`ffmpeg-static`, `fluent-ffmpeg`) and devDeps (`sharp`, `heic-convert`) keep the prod bundle slim while still enabling the local conversion pipeline.

## 11. Environment

`.env.example` documents:

- `GUESTBOOK_ADMIN_TOKEN` — bearer used by `DELETE /api/guestbook/admin?id=...`.
- `KV_REST_API_URL`, `KV_REST_API_TOKEN`, `KV_REST_API_READ_ONLY_TOKEN`, `KV_URL` — Vercel KV. Pull via `vercel env pull .env.local`.

No env vars are required for a basic build. Without KV the guestbook degrades to file storage in dev or to the "be the first" empty state in prod.

## 12. Notable behavior + conventions

- **Single source of truth for resume content** — everything renders from `SKILLS`, `EXPERIENCES` (lib) and the gallery's `PROJECTS` (data). The SkillGraph now pulls its project entries from `data/projects.ts` directly, so every gallery project is filterable from the skills chips.
- **Reduced-motion respect** is global, not per-component.
- **All accent-on-cream text** uses `--accent-strong` (`#B85A3D`) instead of `--accent` to stay accessible.
- **Hairline borders + paper surfaces** are the universal card pattern (`bg-[var(--surface)]` + `border-[var(--border)]`), keeping the editorial-zine feel consistent.
- **Live data routes** all have a fallback string baked in — the site never breaks because GitHub or Vercel KV is down.
- **Sub-navigation patterns** repeat: a Framer Motion `layoutId` underline + IntersectionObserver active-state on the desktop sub-nav, mirrored as a floating popover on mobile (`JumpButton` for professional, `ThreadsButton` for personal).

## 13. State of the rewrite (v2 in progress)

`changes.md` is Liam's v2 brief — many items are done, some are pending:

- Done: skill graph references every project/experience with a 10-cap (with "N more" expand) — now pulls from the gallery `data/projects.ts` so all 15 projects + 4 experiences are filterable; Annotated Iliad removed, project sheet drawer added (long description + video + chips + GitHub), no dates on project cards, personal page split into discrete tennis / basketball / golf / library / fitness / music sections, each with a click-through carousel, guestbook wired to a real backend with profanity + rate-limit and capped at the latest 5 entries at the API layer, editorial "01 tennis / 02 basketball / ..." section nav added to `/personal` (sticky under the site nav, scroll-spy active state, framer-motion `layoutId` underline), party-mode and easter-eggs removed, Library section redesigned as "Ten I'd Reread" countdown with rank-as-hero visual (three-column desktop layout, dot paginator, animated rank numeral).
- Done (post-v2): Music section implemented as a static card grid (`MusicSection`); placeholder tracks are in place — update `tracks` in `src/components/personal/sections/music.tsx` with real favorites and drop cover art into `personal_page_media/music/`.
- Pending / in flight: live media files in `public/personal/` (the conversion script is in place but the outputs need to be generated for the videos and images), `/Liam_Nance_Resume.pdf` and `/resume.pdf` files dropped into `public/`, book covers fetched into `public/covers/`.
- Done (post-v2): added "MetroGuard — Anomaly Detection for Metro Train Compressors" as an archive project in `src/data/projects.ts` (categories: ML + Research; tags Python/Pandas/NumPy/XGBoost/scikit-learn so it lights up under those chips in the SkillGraph).

The README and the deleted-file list in `git status` both confirm: the old party-mode (`src/components/party/*`), easter-egg system (`src/components/easter-eggs/*`), project-video/project-card primitives, and photo-essay personal layout were all removed during this rewrite in favor of the carousel-driven layout.
