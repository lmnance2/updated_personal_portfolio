# Liam Nance, portfolio

Personal portfolio for Liam Nance. Two halves: `/professional` (the resume) and `/personal` (the rest). There are also seven hidden surprises.

Stack: Next.js 16 App Router, React 19, TypeScript, Tailwind v4, Framer Motion, lucide-react. Vercel-ready.

## Develop

```bash
npm install
npm run dev
```

The dev server runs at http://localhost:3000.

## Build

```bash
npm run build
npm run start
```

## Deploy to Vercel

The repo is a vanilla Next.js project, so:

1. Push to GitHub.
2. In Vercel, "Import Project" and pick this repo.
3. No env vars are required for the default build.
4. Vercel will detect Next.js automatically. Hit Deploy.

To deploy from the CLI:

```bash
npx vercel
# Production:
npx vercel --prod
```

## How to swap in real media

### Project demo videos

Each project card has a 16:9 demo slot. If a file exists at the path below, the card autoplays it muted on hover (desktop). If not, the card falls back to a typographic placeholder.

Drop your videos here:

```
public/projects/<slug>.mp4
public/projects/<slug>.jpg   # optional poster
```

Slugs:

- `friendly-fineprint`
- `systems-projects`
- `ubermate`
- `runbuddies`
- `annotated-iliad`
- `portfolio`

### Party-mode track

Party mode (the NBA halftime mode) looks for a single audio file:

```
public/party/halftime.mp3
```

The mode works without the file. Add an MP3 there to actually hear it.

### Resume PDF

The nav and the professional page link to `/resume.pdf`. Drop a file at `public/resume.pdf`.

### Photos

`/personal` uses real, verified Unsplash photos. Swap them by editing `src/lib/photos.ts`.

## Updating the GitHub username

The live stats panel on `/personal` reads commits for the username in `src/lib/site.ts`. Change `SITE.github` to your handle and the API route at `src/app/api/github/route.ts` will pick it up. No other changes required.

## Adding a new project

Edit `src/lib/data.ts`. Add an entry to `PROJECTS`:

```ts
{
  id: "my-thing",
  title: "My Thing",
  dates: "2026",
  blurb: "One sentence.",
  bullets: ["...", "...", "..."],
  skills: ["React", "TypeScript"],
  variant: "card",      // 'feature' | 'card' | 'terra'
  github: "https://...",  // optional
  demo: "https://...",    // optional
}
```

The skill graph picks it up automatically.

## The seven secrets

Each is unlocked once and stored in localStorage. The footer carries a `secrets: N/7` counter. The full list of hints lives in `src/components/easter-eggs/easter-egg-provider.tsx`.
