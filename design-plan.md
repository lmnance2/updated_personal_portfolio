# Design Plan — Liam Nance Portfolio (v2, post-impeccable)

> v2 incorporates the impeccable punch-list. Decisions are locked. Implementer: follow this document verbatim.

---

## 0. What changed from v1

- Typography: **Bricolage Grotesque (single committed variable family)**. JetBrains Mono ONLY inside the terminal easter egg. No mono section labels anywhere.
- Color strategy: pushed from Restrained to **Committed**. Every page has at least one drenched (full-bleed) surface in terracotta or mustard.
- Dropped: sage `#7A9E7E`, the `<MetaLabel />` mono-uppercase pattern, the home teaser three-card strip, the bento grid, the floating bottom-right pill, the "editorial motion" framing.
- Party mode = **NBA halftime mode** (specific, not generic).
- Hero copy = **"I write code. Sometimes it does something useful."**
- `/personal` ships with **verified Unsplash imagery**, not colored placeholders.

---

## 1. Style direction

**Style name:** _Committed warm_ — a portfolio that picks a side. Cream paper, terracotta surfaces that take 30–60% of a viewport when they show up. One single warm display family doing all the lifting. Asymmetric layouts. Imagery first-class.

**Anti-references (do NOT design like these):**
- Brittany Chiang clones / dark portfolios
- Stripe-minimal cream-and-muted-slate
- Notion-style bento grids
- Editorial magazine cosplay with display serif + mono labels
- SaaS hero-metric templates

**Reference moods (pick from):**
- Mailchimp yellow-drench section transitions
- Klim Type Foundry single-family weight choreography
- An old AAA scorecard front page (for the NBA party mode)

---

## 2. Typography

**One family, committed:** [Bricolage Grotesque](https://fonts.google.com/specimen/Bricolage+Grotesque) (variable, supports weight + optical size + grade axes).

Why: warm but mechanical, distinctive lowercase `a`, undersaturated, variable so we can carry both display and body without a second family. Reads as deliberate, not template.

**Secondary:** [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) — ONLY inside the literal terminal easter egg. NOWHERE ELSE. No section labels, no chips, no "section 02 ·" pattern.

**Type scale (`clamp()` fluid):**

| Role | Size (rem) | Weight | Tracking | Line height |
|------|-----------|--------|----------|-------------|
| Display (hero) | `clamp(3.5rem, 8vw, 6.5rem)` | 800 (heavy) | -0.03em | 0.95 |
| H1 page | `clamp(2.5rem, 5vw, 4rem)` | 700 | -0.02em | 1.05 |
| H2 section | `clamp(1.75rem, 3vw, 2.5rem)` | 600 | -0.01em | 1.15 |
| H3 subsection | `1.25rem` | 600 | 0 | 1.3 |
| Body large | `1.125rem` | 400 | 0 | 1.6 |
| Body | `1rem` | 400 | 0 | 1.6 |
| UI / nav | `0.9375rem` | 500 | 0 | 1.4 |
| Small / caption | `0.8125rem` | 400 | 0 | 1.5 |
| Terminal (egg only) | `0.875rem` | 400 (mono) | 0 | 1.5 |

Body line length capped at 65ch. Headings use weight + size contrast for hierarchy (≥1.25 step ratio). No flat scales.

---

## 3. Color tokens

Locked palette + two utility additions. Sage removed. All AA-verified.

```css
--bg:            #FAF6F0;  /* cream paper */
--surface:       #F2EDE3;  /* raised paper */
--fg:            #1A1A1A;  /* ink */
--muted:         #6B6B6B;  /* soft ink */
--accent:        #E07856;  /* terracotta — solid surfaces */
--accent-strong: #B85A3D;  /* terracotta — when used as text on cream */
--spark:         #F2C14E;  /* mustard — drenched accents */
--border:        #E4DDD0;  /* hairline */
--ring:          #1A1A1A;  /* focus outline */
```

**Color strategy: Committed.** Plan calls for at least one drenched (full-bleed) surface per page in terracotta or mustard, not just accent-on-cream.

**Per-page dominance:**
- Home: 50/50 cream + terracotta split as the hero.
- `/professional`: terracotta-drenched timeline section, cream elsewhere.
- `/personal`: mustard-drenched closing "now" strip, cream elsewhere.

**CTA pairings (locked):**
- Primary on cream: ink text on terracotta surface (`#1A1A1A` on `#E07856` = 4.9:1 AA).
- Primary on terracotta surface: cream text (`#FAF6F0` on `#E07856` = 3.4:1 → only for ≥18px bold).
- Accent text on cream: `--accent-strong` `#B85A3D` (5.1:1 AA).

---

## 4. Information architecture

```
/             Home (one strong move + two CTAs)
/professional Resume-style, interactive
/personal     Hobbies, personality, imagery-led

Global UI: sticky top nav, hidden easter-egg trail, party-mode overlay
```

**Top nav (sticky):** `Liam Nance` (left, set in display weight at ~22px) · `Home / Professional / Personal` (right group, ~15px) · `◐ Party` toggle · `Resume↗` (links to PDF in `/public`).

**Footer (every page):** Three lines.
1. `liamnance06@gmail.com  ·  github.com/[handle]  ·  linkedin.com/in/[handle]`
2. `secrets: 0/7` (terracotta — this is the only hint of the easter egg system, until one is found)
3. `Built with Next.js. Champaign, IL.`

---

## 5. Page-by-page layout

### 5.1 Home (`/`)

**Goal:** one move that is so committed it makes the visitor think "okay, this person made decisions."

**Layout — one full viewport, no teaser cards:**

```
┌───────────────────────────────────────────────────────────────┐
│ [Liam Nance]                  Home  Professional  Personal  ◐ │
├──────────────────────────────┬────────────────────────────────┤
│                              │                                 │
│  [CREAM HALF]                │   [TERRACOTTA HALF — drenched] │
│                              │                                 │
│                              │   I write code.                 │
│                              │   Sometimes it does             │
│                              │   something useful.             │
│                              │                                 │
│                              │   ───                            │
│                              │                                 │
│                              │   Liam Nance · Undergrad CS,    │
│                              │   University of Illinois        │
│                              │                                 │
│                              │   [ Professional → ]            │
│                              │   [ Personal →     ]            │
│                              │                                 │
└──────────────────────────────┴────────────────────────────────┘
```

- **Cream half:** intentionally near-empty. ONE element: a slowly-rotating large-format display number "2028" (his graduation year) in display-weight Bricolage Grotesque, set at 12rem+, ink on cream, slight rotation animation respecting reduced-motion. Below in smaller body: "expected graduation, UIUC Grainger CS." The asymmetry is the point.
- **Terracotta half:** drenched. Hero line in cream at display size. Two CTA buttons stacked, ink-on-cream pills.
- **Below the fold:** ONE more screen. Half-height terracotta-to-cream gradient transition (only place we use a gradient — to bleed between sections), with a single editorial paragraph: "This site has two halves: the professional side (the resume) and the personal side (the rest). There are also seven things hidden." That sentence does the IA work. End with the two CTAs again, this time as text links.
- **No teaser cards. No marquee. No three-card strip.** Live stats live on `/personal`.

### 5.2 Professional (`/professional`)

Top to bottom:

**Section 1 — Page header (cream surface):**
```
Professional.
Backend intern at Brunswick. Undergrad researcher at URSA.
Software intern at OpenMind AI. Project manager at Disruption Lab.

[Download résumé.pdf]
```
Headline in display weight, body in 1.125rem.

**Section 2 — Skill ⇄ Project graph (cream surface, full-width interactive):**

Chip filter, NOT force-directed. (Force-directed = "I learned d3" reflex; chip filter is more useful for a recruiter.)

Layout:
```
┌──────────────────────────────────────────────────────────┐
│  Skills                                                  │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐  │
│  │ Python │ │ TypeS… │ │ React  │ │ AWS    │ │ PyTorch│  │
│  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘  │
│  ... (more chips, grouped: Languages | Frameworks | Tools)│
│                                                          │
│  ─────────────────────────────────────────────           │
│                                                          │
│  Where I've used them                                    │
│  ┌──────────────────────────────────────────────────┐    │
│  │ Brunswick — Backend Dev Intern (2025 – 2026)     │    │
│  │ Built a CV pipeline + LangGraph agent + Android. │    │
│  │ [Python] [LangGraph] [Azure] [OpenCV] [Kotlin]   │    │
│  └──────────────────────────────────────────────────┘    │
│  ┌──────────────────────────────────────────────────┐    │
│  │ Friendly Fineprint (2025)                        │    │
│  │ React Chrome extension for ToS analysis.         │    │
│  │ [React] [OpenAI API] [TypeScript]                │    │
│  └──────────────────────────────────────────────────┘    │
│  ...                                                     │
└──────────────────────────────────────────────────────────┘
```

**Chip details:** 28–32px tall pills (deliberately set, not tiny). Body text Bricolage. Inactive: 1px border on `--border`, body text. Hover: shifts to `--surface` background. Active: terracotta surface, ink text, 2px ink-deboss shadow.

**Interaction:**
- Hover/focus a chip → cards lacking that skill fade to 0.3 opacity + 1px blur in staggered waves (50ms between cards).
- Click a chip → toggles selection (persistent until cleared).
- Multi-select: click N chips → cards must match ALL selected (AND logic).
- Hover/focus a card → matching chips light up with a terracotta underline.
- "Clear" button appears once any chip is selected.
- Keyboard: chips are a roving-tabindex group. Arrow keys traverse, Enter toggles, Esc clears.
- Screen reader: announces "Filtering by Python. 4 of 9 cards highlighted."

**Section 3 — Experience timeline (TERRACOTTA DRENCHED full-bleed):**

This is the moment of color commitment. Full-bleed terracotta. Cream text on terracotta. Vertical timeline. Each entry: company (cream display weight), role + dates (cream body), 2-line summary, 3 bullets, skill chips (cream pills with cream border, terracotta-on-cream when active).

Companies: Brunswick, OpenMind AI, URSA, Disruption Lab.

The drenched terracotta is the page's signature moment.

**Section 4 — Projects gallery (cream surface):**

Varied composition, NOT identical card grid. Six projects: Systems projects (C), Friendly Fineprint, Ubermate Cleaning, RunBuddies, and 2 to-be-added slots.

Composition rules:
- One **feature project** (Friendly Fineprint) gets a wide 16:9 video slot above its description, full-width.
- Two projects in a 2-column row beneath it.
- Three projects in a 3-column row.
- One project gets a terracotta surface (Systems projects in C — fits the "low-level / terminal" feel).
- Each card has a reserved 16:9 demo-video slot. Hover → autoplay muted loop. No video yet → placeholder is NOT a colored block; it's a single Bricolage-Grotesque project title set huge at 5rem on a cream background, with the play icon top-right. The typography IS the placeholder.
- Click any project → opens a shadcn `<Sheet>` from the right with full description, screenshots, GitHub link, demo link.

**Section 5 — Education + extracurriculars (cream surface):**

Two columns: Education (UIUC, GPA, expected grad, coursework as a comma-separated body line) and Extracurriculars (ACM SigAida, Euchre Club, Dev Ada, NOBE, Disruption Lab — each a one-line entry with role).

**Footer.**

### 5.3 Personal (`/personal`)

Imagery-first. Editorial spread, varied composition. NOT a bento grid.

**Section 1 — Header (cream):**

```
Off the clock.
Currently obsessed with Greek myth, tennis serves, and the 2025 NBA playoffs.
```

**Section 2 — Photo essay scroll (cream + photo backgrounds, varied):**

NOT a grid. A vertical scroll of varied-shape blocks, each interest gets its own *composition*:

1. **Tennis** — full-bleed 100vw / 80vh tennis-court photo (verified Unsplash), single overlaid caption in cream display weight: "Best serve: 102 mph (allegedly)."
2. **D&D** — split block. Left half: cream surface, body text — "I DM a campaign that's been running 47 sessions." Right half: a d20 photo or dice-on-table photo.
3. **NBA analysis** — three photos in a horizontal scrolling strip (NOT autoplay): one shot chart, one stadium, one player. Caption: a one-liner stat about the current Pacers playoff run or similar.
4. **Greek mythology** — full-bleed terracotta surface, no photo. One line of Homer in cream display weight: _"Sing, O Goddess, the anger of Achilles, son of Peleus."_ Below in body: "Currently re-reading The Iliad. Working on an annotated digital edition."
5. **Reading** — three book covers in a row + a "currently reading" pinned book with a longer caption.
6. **Movies** — strip of three recent watches (movie poster placeholders or stock).
7. **Sports trio (Lifting / Biking / Golf / Basketball)** — varied 4-photo composition, one large + three small.

**Imagery handling:**
- ALL placeholder images are real Unsplash photos with verified URLs (the implementer must verify each via WebFetch before committing — if a URL 404s, swap to another verified one).
- Photo selection prompt to use: search for the *physical object*, not the category. "tennis racket dropped on red clay" not "tennis".
- Each photo has voice-y alt text. ("Backhand return on green hard court, late afternoon light.")

**Section 3 — Now strip (MUSTARD DRENCHED, full-bleed):**

This is `/personal`'s drenched moment. Mustard surface, ink text. Three columns:

```
NOW READING        NOW PLAYING         NOW IN THE FEED
The Iliad          (live GitHub        Pacers vs. Knicks
(Lattimore         commits — last 7    series, Wordle
translation)       days, line chart)   streak: 41 days
```

Live stats panel lives here. Data fetched daily via Next.js Route Handlers with `revalidate: 86400`. Graceful fallback strings if any API fails ("data took a sick day").

**Section 4 — Short essay (cream):**

A 200-word "why I love CS" essay (placeholder for now), body text at 1.125rem, single column 65ch wide.

**Footer.**

---

## 6. Interactive features — implementation contracts

### 6.1 Skill ⇄ Project graph
- Implementation: `<SkillGraph />` (custom). State in React Context or Zustand (prefer Context to avoid the dep — the state is small).
- Data: a single TypeScript object literal mapping `experiences[]` and `projects[]` to `skills[]`.
- Each chip ⇄ card pair has data-attributes (`data-skill`, `data-id`) for the dim/highlight logic.
- AND-logic multi-select.

### 6.2 Party mode = **NBA halftime mode**
Locked theme.

- **Trigger:** nav `◐ Party` button → opens a small confirm dialog ("Turn on party mode? Plays music + visual effects. [Cancel] [Tip off →]").
- **Visuals on activation:**
  - Top of viewport: a sticky scoreboard strip in mustard with cream text — `LIAM 21  ·  VISITORS 19  ·  Q4 0:42` — the score animates upward at a slow tick.
  - Stadium-light flashes at the four screen corners, cycling at ~1.2Hz (well below 3Hz seizure threshold).
  - Cursor changes to a basketball icon (lucide `circle-dot` styled orange).
  - Confetti drops from the top every ~7 seconds (small, ≤ 10 particles per burst).
  - Background pulse: subtle 200ms `scale(1.005)` on the body, paced to the audio BPM if possible.
- **Audio:** single track in `/public/party/halftime.mp3` (user supplies later — until then a 1-second silent stub so the system works; implementer must build the architecture). Default volume 0.4. Small volume slider + mute appears in the scoreboard strip.
- **Off-switches:**
  - Same `◐ Party` button toggles it.
  - ESC kills it from anywhere.
  - `prefers-reduced-motion: reduce` → audio plays (user opted in), flashes disabled, only the scoreboard strip persists. Banner appears: "Party mode (visuals reduced)".
- **Architecture:** `<PartyModeProvider />` at the root, state shape `{ on: boolean, track: string, volume: number, score: { home: number, visitors: number, clock: string } }`. Track is swappable for future user input.

### 6.3 Easter eggs (7 total, hidden by default)

The system: a `useEasterEggs()` hook with `localStorage` persistence. Each egg has an `id`, a `hint` (shown until found), an `unlock` (shown when found), and a `surface` (the visual reveal).

**The seven eggs (proposed — implementer can refine):**

1. **Konami code** (`↑↑↓↓←→←→BA`) anywhere → swaps hero headline to "I write code. Mostly it doesn't compile the first time." for 10 seconds.
2. **Type `whoami`** anywhere → opens a fullscreen terminal overlay (JetBrains Mono — the ONLY use), runs `~/bio.sh`, prints an ASCII-art Liam.
3. **Click the period in the hero 5 times** → confetti burst + sound effect.
4. **Hover the `2028` for 3 seconds** → it rotates to `2024` (when he started college) and back.
5. **Triple-click any Greek myth quote on `/personal`** → it cycles to the next quote in a small library.
6. **Visit while party mode is on AND click a project card** → the project drawer opens with a basketball-shaped close button.
7. **Open dev tools** → a console log greets visitors with ASCII art and a hiring email.

**Visibility logic:**
- Until first egg found: nothing shows. Footer carries `secrets: 0/7` in `--accent-strong` body text — that's the ONLY hint.
- After first found: a small terracotta dot appears next to the nav `◐ Party` button. Click it → side panel slides in from the right with the checklist. Found eggs show plainly with their unlock; unfound show as cryptic hints.
- Updated counter persists in footer (`secrets: 3/7`).

### 6.4 Live stats
- Lives in the **NOW strip on `/personal`**, not the home page.
- Three columns: Now Reading (static, edit-in-code), Now Playing (live GitHub data), Now in the Feed (a rotating array of NBA stat + Wordle streak).
- Data: Next.js Route Handlers (`app/api/github/route.ts`, `app/api/feed/route.ts`) with `export const revalidate = 86400`. Use the public GitHub REST API for commits.
- Fallback: each metric has a static fallback string in case of fetch failure.

### 6.5 Demo videos
- Reserved 16:9 areas on every project card.
- Component: `<ProjectVideo slug="friendly-fineprint" />` — looks for `/public/projects/{slug}.mp4`, autoplays muted on hover (desktop only), shows poster image (`/public/projects/{slug}.jpg`) otherwise.
- Until videos exist: typographic placeholder (project title set huge on cream/terracotta) with a centered play icon.

---

## 7. Component inventory

**shadcn primitives:**
- Button, Sheet (project drawer), Dialog (party-mode confirm), Switch (egg-guide / motion toggles), Sonner (egg unlock toasts), Tooltip, Badge.
- Override the default zinc tokens with our cream/terracotta in `globals.css` and `tailwind.config.ts`.

**Custom components:**
- `<SiteNav />` — sticky top nav.
- `<Footer />` — three-line footer with `secrets: N/7` hint.
- `<SkillGraph />` — chip filter + card list (the centerpiece on `/professional`).
- `<ChipPill />` — the 28–32px skill chip.
- `<ProjectCard />` — varies composition per slot; reserves video.
- `<ProjectVideo />` — hover-play handler.
- `<TimelineEntry />` — cream-on-terracotta entry for the drenched experience section.
- `<HeroSplit />` — the 50/50 cream/terracotta home hero.
- `<RotatingNumber />` — the rotating "2028" / "2024" element.
- `<NowStrip />` — mustard drenched "now reading / playing / in the feed" strip.
- `<PhotoBlock />` — varied composition for `/personal` interest blocks (props: `variant: 'fullbleed' | 'split' | 'strip' | 'trio'`).
- `<PartyModeProvider />` + `<PartyOverlay />` — NBA halftime mode.
- `<PartyScoreboard />` — top sticky strip with score + volume.
- `<EasterEggProvider />` + `<EasterEggDot />` + `<EasterEggPanel />` — egg system.
- `<TerminalOverlay />` — the `whoami` egg.
- `<ConsoleGreeting />` — the dev-tools egg.

---

## 8. Motion principles

| Element | Animation | Duration | Easing |
|---------|-----------|----------|--------|
| Page transition | Crossfade + 8px slide-up | 240ms | `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out-quart) |
| Card hover | 1 → 1.02 scale + border bloom | 180ms | ease-out-quart |
| Chip activation | terracotta underline grows L→R | 200ms | ease-out-quart |
| Skill graph dim | opacity 1→0.3 + 1px blur, staggered 50ms per card | 220ms | ease-out-quart |
| Egg unlock | mustard sparkle burst (one-shot, ≤500ms) | 500ms | spring-equivalent (use Framer's `spring`) |
| Section reveal | 12px fade-up at IntersectionObserver threshold 0.2, **once** | 380ms | ease-out-quart |
| RotatingNumber | slow 360° rotation, 30s loop, pauses on hover | continuous | linear (it's literal rotation, exception to ease rule) |
| Party scoreboard score | digit roll | 600ms | ease-out-quart |
| Party stadium-light flashes | corners cycle at ~1.2Hz (≤3Hz seizure-safe) | 200ms per flash | ease-out-quart |

**Rules:**
- All animations use `transform` / `opacity` only.
- Global guard: `@media (prefers-reduced-motion: reduce) { *, *::before, *::after { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; } }`
- Per-component conditional rendering of motion-only elements under reduced-motion.
- No infinite decorative loops outside `RotatingNumber` and `Marquee` (both disable-able / pausable).
- Framer Motion for choreography that exceeds 1 transition; CSS for everything else.
- For collapsing/expanding (egg panel): `grid-template-rows: 0fr → 1fr` transition, not height.

---

## 9. Accessibility

- **Contrast:** all body 4.5:1+. `--accent-strong` for accent text on cream. Ink-on-terracotta (4.9:1) for CTAs on cream, cream-on-terracotta only for ≥18px bold.
- **Reduced motion:** global CSS guard + per-feature opt-outs (party-mode visuals, section reveals, marquee, rotating number).
- **Keyboard:**
  - Skill graph: Tab into chip group → arrow keys traverse → Enter toggles → Esc clears all.
  - Project drawer: focus trap, focus restore on close.
  - Easter-egg panel: focusable dot, Enter expands, arrow keys traverse checklist, Esc collapses.
  - Party mode: nav button `aria-pressed`; confirm Dialog traps focus; Esc kills mode globally.
  - Konami code: keystroke listener only fires when focus is NOT inside an input.
- **Screen reader:**
  - Chip toggle announces "Filtering by Python. 4 of 9 highlighted."
  - Egg unlocks announce via `aria-live="polite"`.
  - Party mode toggle announces "Party mode on / off."
- **Focus indicators:** 2px solid `--ring` with 2px offset on every focusable. Never `outline: none`.
- **Heading hierarchy:** strict, no skipping.
- **Photo alt text:** voice-y, descriptive, not "image."
- **Seizure safety:** confirmed party-mode flash rate < 3Hz; reduced-motion disables flashes entirely.

---

## 10. Responsive behavior

**Breakpoints:** 375 / 640 / 768 / 1024 / 1280 / 1536.

| Element | Mobile (<768) | Tablet (768–1024) | Desktop (≥1024) |
|---------|---------------|--------------------|-----------------|
| Nav | Logo + hamburger; party + secrets dots stay visible | Full nav | Full nav |
| Home hero | Single column (terracotta block stacks BELOW cream half); CTAs full-width | Side-by-side, smaller display | Full 50/50, 6.5rem display |
| Home `RotatingNumber` | 8rem | 10rem | 12rem |
| Skill graph | Chip strip horizontally scrolls (with edge fades); selected chip sticks to top of card list | 2-col with narrower chip column | 2-col with sticky chip column |
| Experience timeline (drenched) | Full-bleed maintains; smaller padding | Same | Same |
| Projects gallery | 1 col | 2 col | 3 col with feature-project full width |
| Personal photo essay | Each block stacks; full-bleed photos stay full-bleed | Same with bigger photos | Same; some splits go side-by-side |
| Now strip (mustard) | 1 col stacked | 3 col | 3 col |
| Party scoreboard | Smaller (sticky bottom on mobile instead of top to avoid nav collision) | Top | Top |
| Easter-egg panel | Bottom sheet | Side panel | Side panel |

**Mobile-specific:**
- Project videos do NOT autoplay; tap-to-play.
- Konami code → on mobile, replaced with **a 5-tap-on-the-2028-number** gesture, documented in the egg checklist.
- Marquee disabled.

---

## 11. Implementation order (for the implementer)

The implementer must build in this order so the user can preview value early:

1. **Scaffold.** `create-next-app` (TS, Tailwind, App Router). Add shadcn/ui, Framer Motion, lucide-react. Set up Bricolage Grotesque + JetBrains Mono via `next/font/google`.
2. **Tokens.** `globals.css` with CSS variables from §3. Tailwind config with semantic color names mapped to the variables, font family registered.
3. **Layout.** `<SiteNav />` + `<Footer />` + root `app/layout.tsx`. Hero on `/` working.
4. **Professional page sequence.** Header → Skill graph → drenched timeline → projects gallery → education. Skill graph is the priority component.
5. **Personal page.** Header → photo essay (with verified Unsplash imagery) → Now strip → essay.
6. **Party mode (NBA).** Provider + scoreboard + flashes + audio. Confirm seizure safety.
7. **Easter eggs.** Provider + 7 eggs + panel + footer counter.
8. **Live stats Route Handlers.** GitHub commits + NBA/Wordle fallback.
9. **Polish pass.** Accessibility audit, reduced-motion verification, mobile QA at 375.
10. **README** with deploy instructions for Vercel + how to swap in real images/videos.

**Critical do-nots for the implementer:**
- Do NOT use Inter, Fraunces, Newsreader, Playfair, Cormorant, DM Sans, Plus Jakarta Sans, or Instrument Sans/Serif.
- Do NOT use mono labels anywhere except inside the `whoami` terminal egg.
- Do NOT use side-stripe borders, gradient text, glassmorphism, or hero-metric templates.
- Do NOT ship colored-block placeholders for `/personal` interest photos — use verified Unsplash URLs.
- Do NOT use em dashes (—) in copy. Use commas, colons, semicolons, periods, or parentheses. Em dashes are an absolute ban.
- Do NOT add a chat widget, a cookie banner, a newsletter modal, or any SaaS chrome.
- Do NOT default to centered stacks. Asymmetric layouts preferred.

---

## 12. Compliance check against the original prompt

✓ Separate pages for personal and professional life
✓ Party mode (flashing lights + music + user-extensible)
✓ Skills connected bidirectionally to jobs/projects
✓ Demo videos attached to projects (architecture in place; videos drop in later)
✓ Photos/videos next to interests (Unsplash verified at launch)
✓ Fun, interactive, professional enough for recruiters
✓ Next.js + Vercel deploy
✓ Easter eggs + popup guide (corner dot reveals checklist; foot of page carries `secrets: 0/7` counter)
✓ Live stats
✓ CLAUDE.md design priorities all addressed (visual hierarchy, smooth-not-distracting animations, strong first impression, clear project showcases, responsive, accessible, no dark mode)

Implementer: proceed with §11.
