# Media conversion

All raw media under `personal_page_media/` is converted to web-ready formats in `public/personal/` by a single npm script. Run this once after cloning, then again with `--force` when source files change.

## Prerequisites

```
npm install
npm install ffmpeg-static --no-save   # optional: pulls ~50MB ffmpeg binary for video conversion
```

## Convert all media

```
npm run convert-media
```

The script is idempotent: it skips files that already exist. To re-convert: `npm run convert-media -- --force`.

## Fetch book covers

```
npm run fetch-covers
```

Hits the Open Library API and downloads cover images into `public/covers/`.

## Production guestbook

The guestbook works out of the box in dev using a local `.data/guestbook.json` file store. For production persistence on Vercel, create a KV store, link it to the project, and set the following env vars (see `.env.example`):

- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`
- `GUESTBOOK_ADMIN_TOKEN` (for admin delete endpoint)
