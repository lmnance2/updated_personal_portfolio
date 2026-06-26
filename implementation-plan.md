# Implementation Plan (v2 deltas)

This document is the locked spec for the next round of changes. It is a delta on top of `design-plan.md` (which remains the source of truth for typography, color tokens, motion principles, accessibility, and components NOT touched here). When this document and `design-plan.md` conflict, this document wins.

Source inputs:
- `design-plan.md` — locked base
- `changes.md` — user requirements driving this round
- `CLAUDE.md` — design direction and project goals
- `personal_page_media/` — user-supplied photos and videos for /personal

## 0. Hard rules (carry from base)

- Bricolage Grotesque only. JetBrains Mono only inside the terminal egg.
- Cream/terracotta/mustard palette as specified in `design-plan.md` §3.
- No em dashes anywhere (rewrite "01 — Tennis" as "01. Tennis", "404 — you took a wrong turn" as "404. You took a wrong turn", etc.). Use periods, colons, semicolons, parentheses, or remove.
- No mono section labels. No glassmorphism. No side-stripe borders. No gradient text. No SaaS chrome.
- All animations transform/opacity only. Respect `prefers-reduced-motion`.
- AA contrast minimums enforced. Mustard text on cream is banned (1.6:1 — too low). Mustard only as a surface or as decorative non-text accents.

## 1. Global

### 1.1 Links and footer
- Email: `liamnance06@gmail.com`
- GitHub: `https://github.com/lmnance2`
- LinkedIn: `https://www.linkedin.com/in/liam-nance-a17152316/`
- Footer renders these on every page (the existing footer already does — update the URLs).
- Footer becomes the single source of contact info site-wide. No "Contact" section on home page.

### 1.2 Easter egg surface (downsized)
Replace the planned full slide-in Sheet with a smaller affordance:

- **Nav badge:** small ink dot + `0/7` in tabular-nums, body weight. Click opens popover.
- **Popover** (anchored under the badge, ~280px wide, cream surface, hairline border): three lines.
  1. `You've found 0 of 7.` (ink, body)
  2. `Hints` toggle (small ink switch). Off by default.
  3. When toggled on: a short blurb (`Try keyboard combos, hover surprises, and a few hidden clicks.`) plus per-egg cryptic one-liners for unfound, and titles + unlock for found.
- **Found popup:** centered terracotta chip (~360×96px), cream text: `Easter egg found. [name].` Includes egg emoji as content character only. Dismiss by clicking the toast itself (NOT click-anywhere). Auto-dismiss after 2.5s. Enter: spring scale 0.8→1 + opacity, 280ms. Exit: 180ms.
- **Homepage line** (below the fold, in the editorial paragraph): keep the existing sentence "There are also seven things hidden." — that is the only promotion needed alongside the nav badge.

### 1.3 Easter eggs (refresh list — implementer may refine copy)
1. Konami code → hero headline swap for 10s.
2. Type `whoami` → fullscreen terminal overlay (only JetBrains Mono usage).
3. Click the hero period 5 times → confetti burst + small sound effect.
4. Hover any "year" number element on /professional for 3 seconds → it cycles to 2024.
5. Triple-click any quote on /personal → cycles to next quote.
6. Click a project card while party mode is on → drawer opens with a basketball-shaped close button.
7. Open devtools → console greeting with ASCII art and hiring email.

## 2. /professional changes

### 2.1 Desktop sub-nav (new)
- Position: `position: sticky; top: <globalNavHeight>`. Hairline `--border` bottom only. Cream surface.
- Items: `Skills`, `Experience`, `Projects`, `Education`, `Contact`. Bricolage 0.9375rem weight 500. Middle dots (`·`) between items.
- Active indicator: 2px terracotta underline. Use Framer Motion `layoutId` with `transform: translateX` + `width`. Avoid layout reads mid-animation.
- IntersectionObserver at threshold 0.3 to track active section.
- **Hide-on-scroll-down, show-on-scroll-up** with a 10px hysteresis threshold.
- **Mobile (<768):** Sub-nav is hidden. Replace with a floating bottom-right "Jump" button (cream pill, ink text, terracotta dot). Opens a small popover with the 5 section anchors.

### 2.2 Section 1 — Page header
No structural change. Update copy if needed. Add `id="skills"` anchor target inside Section 2.

### 2.3 Section 2 — Skill graph (existing)
Keep as-is. Its filter ONLY applies to Experience and Featured Projects — NOT to the new project gallery filters (different concerns).

### 2.4 Section 3 — Experience timeline (drenched terracotta)
No structural change. This stays the only drenched moment on the page.

### 2.5 Section 4 — Projects gallery (overhaul)

**Filter row** (cream surface):
- Horizontal text tabs, NOT pills:
  `All (10) · ML (5) · AI (3) · Frontend (3) · CV (2) · Backend (2) · Mobile (1) · Full-Stack (1) · Research (1)`
- Same underline-active language as the sub-nav (single-select).
- Single-select only (no Shift+multi-select). One category at a time.
- Horizontal scroll with edge fades on mobile.

**Default view (All):**
- 6 featured projects in varied composition driven by position:
  - Slot 1 (full-width feature): wide 16:9 video/poster + headline + description.
  - Slots 2–3: 2-column.
  - Slots 4–6: 3-column. One of these gets a terracotta surface (rotates per featured set).
- Below them: archive section header `Archive (4)` + LIST layout (NOT cards). Each row:
  `Project name · Year · Tech tags · GitHub ↗`. Hairline divider between rows. Hover shifts row background to `--surface`.

**Filtered view (any category selected):**
- Replace gallery with a unified flat list of matching projects (featured + archive merged), rendered as cards in 2-column on desktop, 1-column on mobile. Same card spec as before (16:9 video/poster reserved area, click → Sheet drawer).
- Add `Clear` link inline with the filter row when a category is active.

**Featured 6 (curated):**
1. **URSA Spring 2025 Research Framework** — flagship. ML / AI / Research. Wide feature slot.
2. **Law Testing MVP (Friendly Fineprint variant)** — React + OpenAI. AI / Frontend.
3. **Event Consolidator** — Next.js full-stack. Frontend / Backend / Full-Stack / Database.
4. **CNN Computer Vision Projects** — TF/Keras. ML / AI / CV.
5. **OpenCV2 Projects** — real-time CV. CV / Backend.
6. **WebView Wrapper (Android)** — Kotlin + Compose. Mobile.

**Archive 4:**
- Calories Burnt Predictor (ML)
- Titanic Survival Classification (ML)
- JavaScript Amazon Project (Frontend)
- Node Express Tutorial (Backend)

**GitHub fetch:** Build-time. The frontend implementer hardcodes a TypeScript data file `src/data/projects.ts` with the curated list, tech tags, category tags, GitHub URL, README excerpt. Repo data was captured fresh at planning time. No runtime API call.

**Project card video slot:** Same as `design-plan.md` §5.2. Reserved 16:9. Typographic placeholder is the project name set huge (5rem, Bricolage 800) on cream/terracotta until a `.mp4` is dropped at `/public/projects/<slug>.mp4`.

### 2.6 Section 5 — Education (existing)
No change.

### 2.7 Section 6 — Contact (new, replaces drenched bookend idea)
- Cream surface (NOT drenched — timeline owns the drench).
- Headline: `Hire me, or talk shop.` (Bricolage 700, 2.5rem). No em dash.
- Body line: `Easiest to reach by email. Resume below.`
- One primary terracotta button: `Email Liam` (mailto). Beside it a small `Copy` icon button that copies `liamnance06@gmail.com` to clipboard with a brief "Copied." toast.
- Below: `Download resume.pdf` button (ink-bordered pill on cream, hovers to terracotta fill, text inverts to cream on hover).
- Secondary links beneath as one body line: `github.com/lmnance2  ·  linkedin.com/in/liam-nance-a17152316`.
- `id="contact"` anchor target.

## 3. /personal changes

Drop the existing photo essay structure. Replace with 5 sections (randomized order on each load) plus interleaved quote/rec/stat blocks. NO pickup screen. First section renders directly at top.

### 3.1 Section ordering
- Implementer: randomize the array of 5 section components on each render.
- A small `Threads ↓` floating chip in the bottom-right opens a list popover with anchor links to all 5 sections. Same affordance as the /professional mobile Jump button.

### 3.2 Composition variants (use 3 total, repeated)
Define exactly three composition types:
- **A. Full-bleed photo hero**: 100vw / 80vh photo with overlaid title + stat line.
- **B. Split**: 50/50, one side photo/video, other side cream surface with stats + body text.
- **C. Asymmetric trio**: one large element (photo OR video) + 3 smaller stat/quote/media tiles in an asymmetric grid.

Assign 2 sections to A, 2 to B, 1 to C. Specific assignment locked below.

### 3.3 Sections (specific)

**Tennis — Composition A (full-bleed)**
- Hero photo: convert `personal_page_media/Tennis_Picture.heic` to JPG (sRGB, max 2400px wide, 80% quality). Save at `/public/personal/tennis-hero.jpg`.
- Overlaid title (cream display weight, drop shadow for legibility): `Tennis.`
- Stat strip beneath title (cream body): `Fastest serve 115 mph · Peak UTR 7.91 · Racket: Wilson Pro Staff X`
- Below hero (cream surface): the two videos `Tennis_Video_1.MP4` and `Tennis_Video_2.MP4` in a 2-column row. Re-encode `.MP4` to H.264 + AAC (most are already compatible but verify) and place at `/public/personal/tennis-1.mp4`, `tennis-2.mp4`. Tap-to-play on mobile, hover-autoplay on desktop. Reserved 16:9.
- Find Wilson Pro Staff X racket image via web search at implementation time (small inline thumbnail next to "Racket:" stat).

**Basketball — Composition B (split)**
- Left: cream surface, stats panel. Bricolage display "Basketball." + body bullets:
  `Highest game: 31 pts`
  `Opponents dropped: 1`
  `First dunk: age 18`
- Plus a punchy quote line. Suggested copy: `Hooping is therapy. Also the only place I am allowed to talk trash.` (verify with user copy preferences; can simplify).
- Right: `Dunk_Off_1.MOV` and `Dunk_Off_2.MOV` re-encoded to H.264 MP4. Place at `/public/personal/dunk-1.mp4`, `dunk-2.mp4`. Stack vertically.
- Convert `Basketball_Check_Picture.jpg` to `/public/personal/basketball-check.jpg` and use as a small overlapping inset on the left panel.

**Golf — Composition B (split)**
- Left: cream surface with stats. `Handicap: 15.1 · Best score: 85`. Plus a one-liner about being humbled by every par-3.
- Right: `Golf_Video_1.MOV` and `Golf_Video_2.MOV` re-encoded, stacked.

**Library — Composition C (asymmetric trio variant)**

Use a **shelf-by-series** layout (not a single 26-spine strip, not a wall grid).

Data structure for each book:
```ts
{ title, author, series?, seriesOrder?, stars (0-5), coverUrl }
```

Series shelves to render (in order):
1. **Cosmere — Stormlight Archive** (6 books)
2. **Wheel of Time** (15 books — includes New Spring prequel)
3. **Cosmere — Mistborn Era 1** (2 books from the list)
4. **Red Rising** (3 books)

Each shelf:
- Series label (Bricolage 600, 1.5rem) + a body line (`Re-read across 2025-2026.` or similar; implementer to use placeholder if no info).
- Books rendered as **vertical spines** in chronological series order, left to right. Use CSS `writing-mode: vertical-rl` for the title. Author below spine in 0.8125rem body. NO stars on the spine itself.
- Each spine is a flexible color drawn from the existing palette (rotating: terracotta, cream-surface, ink, mustard background). Use ink text on light spines, cream text on dark spines.
- Tap or hover a spine: pulls out to a **featured spread** to the right (desktop) or expands to full width below (mobile). Spread shows:
  - Front cover (fetch from open library / google books at build-time; the implementer should write a small build script in `scripts/fetch-covers.ts` that takes ISBN or title+author and writes to `/public/covers/<slug>.jpg`).
  - Title + author + series ordinal
  - Star row (5 boxes, filled with terracotta, empty showing hairline border)
  - 2-line blurb (placeholder copy OK)
- Mobile: tapped spine expands inline. Tap outside dismisses.
- Stars cap: keep stars only on the spread, not on the spines. Recruiters won't be visually slapped with a row of 2-star ratings.

Book list (from `changes.md`):

Stormlight Archive: Way of Kings (5), Words of Radiance (4), Oathbringer (5), Rhythm of War (4), Wind and Truth (4), Warbreaker (4).
(Note: Warbreaker is a standalone in the Cosmere — implementer may render under Stormlight as a related-work or move to a "Cosmere standalones" mini-shelf. Either is fine.)

Wheel of Time: Eye of the World (3), Great Hunt (3), Dragon Reborn (4), Shadow Rising (5), Fires of Heaven (4), Lord of Chaos (4), Crown of Swords (3), Path of Daggers (2), Winter's Heart (3), Crossroads of Twilight (2), Knife of Dreams (4), Gathering Storm (4), Towers of Midnight (5), Memory of Light (5), New Spring (2 — prequel).

Mistborn: The Final Empire (4), The Well of Ascension (4).

Red Rising: Red Rising (5), Golden Son (5), Morning Star (5).

**Fitness — Composition A (full-bleed)**
- Hero photo: `Mile_Run.PNG` upscaled if needed, placed at `/public/personal/mile-run.jpg` (convert PNG to JPG if file size is large).
- Overlaid title: `Fitness.`
- Stat strip: `Fastest mile 5:39 · Bench 295 · Squat 365 · Deadlift 365`
- Below hero (cream surface): `275_lift.MOV` re-encoded to MP4 at `/public/personal/lift-275.mp4`. Single wide 16:9 player.

### 3.4 Interleaved blocks (between sections)
Insert these in randomized positions between the 5 main sections. Implementer fetches real recent stats at build time via web search (NBA, ATP); for historical content training data is fine.

Block types:
- **Quote card** (cream or surface, single line in Bricolage 600 1.5rem, attribution below in body small). Use book/movie/show quotes that are popular and non-controversial. Examples: Brandon Sanderson (Stormlight), Hemingway, Marcus Aurelius, popular movies like Inception, Dark Knight, Interstellar, popular shows like The Bear, Succession, Friday Night Lights.
- **Stat card** (cream, ink display number + small label). Examples: a current NBA leader's stat, ATP top serve speed, etc. Source live at build via WebSearch.
- **Movie/show rec card** (cream, "If you're looking for: [genre/mood] | Try: [title]" format). Pick widely-loved titles.

Aim for ~5 interleaved blocks total. Don't cluster.

### 3.5 NOW strip (existing, mustard drenched)
Keep the existing mustard `NowStrip` component AS-IS at the bottom of /personal. It is the page's drenched moment.

### 3.6 Guestbook (new, below NOW strip)
- Headline: `Sign the book.` (Bricolage 700, 2rem)
- Body: `One line, that is the rule.` (no em dash)
- Input: single-line text, 240 char max, with optional `Name` field beside it. Cream surface, ink border. Submit button: terracotta.
- Storage: Vercel KV. Implementer writes a `/api/guestbook` POST + GET Route Handler with:
  - Server-side profanity filter (use `bad-words` npm package or hand-rolled banlist)
  - Rate limit by IP: 1 entry per 24h. Use `@upstash/ratelimit` or hand-rolled with Vercel KV TTL.
  - Max 240 chars enforced server-side.
- Admin route `/api/guestbook/admin` behind a secret token env var (`GUESTBOOK_ADMIN_TOKEN`) for delete. Implementer adds to `.env.example`.
- Display: vertical stack of entries, newest first, paginated 20 at a time.
- Each entry: cream card with `name · date` header in body small, message in body. Small ink shadow.
- Rotation: ONLY the most recent 3 entries get a -2° to +2° random rotation. Rest are flat.
- If KV is not configured at deploy time: render the section in a "coming soon" state with a static "be the first to sign" message. Do not crash.

## 4. Party mode redesign (replace existing)

Replace the entire `<PartyModeProvider />` + scoreboard + NBA theme.

### 4.1 Jam session
- **Trigger:** Nav `◐ Party` toggle (button stays). On click, opens confirm dialog: `Turn on jam mode? (plays audio)` with `Cancel` and `Tip in` buttons. (No em dash; "Tip in" is a basketball term keeping a soft callback to original concept.)
- **On activation:** A drawer slides up from the bottom of the viewport. Drawer is cream surface with hairline ink top border. Drawer is ~140px tall on desktop, ~110px on mobile.
- **Drawer contents:**
  - Left: tiny ink-text label `Jam mode`. Small ink Esc affordance.
  - Center: 4 pads in a row. Each pad is ~80×80px, mustard surface, 1px ink border, rough.js-style wobbly stroke (use `rough-js` npm or hand-roll an SVG with `feTurbulence`).
  - Each pad labeled: `Kick` `Snare` `Bass` `Chord`. Labels in ink body, 0.8125rem.
  - Right: ink-bordered volume slider (cream track, terracotta fill). Mute icon button.
- **Behavior:** Tap/click pad → fires ONE-SHOT sample. No looping. Pad pulses (scale 1→1.08→1, 220ms, ease-out-quart). Optional small ink ring expands and fades.
- **Audio assets:** Implementer ships placeholder `.mp3` files in `/public/jam/`:
  - `kick.mp3`, `snare.mp3`, `bass.mp3`, `chord.mp3`
  - 1-second silent stubs are acceptable; user will replace.
- **Visuals while jam is on:**
  - The drawer is the only persistent UI. NO confetti, NO cursor changes, NO body pulse, NO stadium flashes.
  - Each pad press additionally triggers a subtle 80ms cream "wash" across the page edges (1px terracotta inset border momentarily glows).
- **Off-switches:**
  - Same `◐ Party` toggle.
  - Esc anywhere.
  - Click outside the drawer (but inside the viewport).
- **Reduced motion:** Pad press animations disabled. Audio still plays (user opted in).

### 4.2 Architecture
- `<PartyModeProvider />` state: `{ on: boolean, volume: number, samples: Record<padName, AudioBufferSourceNode | string> }`.
- `<PartyDrawer />` renders the bottom drawer.
- Use Web Audio API to preload sample buffers on activation (avoid HTML5 audio latency).
- Audio context unlocked on first user gesture per browser policy.

### 4.3 Easter egg integration
The locked easter egg #6 (basketball-shaped close button on project drawer when party is on) survives but in spirit — replace with a "tip in" labeled close button styled as a small mustard orb. The basketball aesthetic is gone elsewhere; this is a callback.

## 5. 404 page (new)

Create `src/app/not-found.tsx`.

- Centered cream page, max-w-2xl content.
- Headline: `404. You took a wrong turn.` (Bricolage 800, clamp(2.5rem, 5vw, 4rem)). No em dash.
- Subtitle (body, 1.125rem): `The page doesn't exist, but here is a basketball.`
- **Physics toy:** Below the subtitle, a terracotta-bordered rectangle ~480×280px (responsive). Inside: a 2D basketball — orange circle with one ink-cream radial gradient + two ink-stroke seam lines (SVG). On click of the ball: applies upward + random horizontal velocity. Physics: gravity, ground bounce with 0.6 damping, wall bounces with 0.7 damping. Hand-rolled, no Matter.js dependency. Position updates in `requestAnimationFrame`.
- Below the toy: nav rescue links, one line each:
  - `Home →`
  - `Professional →`
  - `Personal →`
- Footer renders as usual.

## 6. Implementation order

1. **Setup deltas:** Update footer links. Add 404 page. Add nav badge for eggs.
2. **Professional sub-nav** + mobile Jump popover.
3. **Projects gallery overhaul:** add `projects.ts` data file, refactor `<ProjectsGallery />` for tabs + archive list.
4. **Contact section on /professional.**
5. **/personal restructure:** new section components (Tennis, Basketball, Golf, Library, Fitness), randomization, threads popover.
6. **Library shelves + cover fetch script.**
7. **Media conversion:** HEIC→JPG, MOV→MP4 for all `personal_page_media/` assets. Document the ffmpeg / imagemagick commands in README.
8. **Interleaved quote/stat/rec blocks** with live WebSearch at build time.
9. **Guestbook** with Vercel KV + rate limit + admin route.
10. **Party mode replacement:** delete NBA provider, ship jam drawer.
11. **Easter egg downsizing:** replace Sheet with popover, update toast.
12. **Polish pass.** Accessibility audit, reduced-motion verification, mobile QA at 375.

## 7. Compliance check against original prompt + CLAUDE.md

- ✓ Easier to expand: new project data is a single TypeScript file.
- ✓ Showcase technical projects: 10 GitHub repos curated and tagged.
- ✓ Personality + interactive details: jam session, eggs, guestbook, 404 toy.
- ✓ Balance professionalism with fun: professional sub-nav + contact section vs personal feed + guestbook.
- ✓ Visual hierarchy: typography contrast + asymmetric layouts maintained.
- ✓ Smooth not distracting animations: scoped to transform/opacity, reduced-motion respected.
- ✓ Strong first impression: home hero untouched; still the 50/50 split.
- ✓ Responsive: mobile Jump popover, mobile-first guestbook, mobile spine expand.
- ✓ Accessible: contrast fixes (no mustard text), keyboard nav on all new components, AA verified.
- ✓ No dark mode default.
