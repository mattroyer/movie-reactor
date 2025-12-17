# Movie Recommender (TMDB Explorer)

A personal movie discovery app built with Next.js App Router, React, TypeScript, and Tailwind CSS, powered by the TMDB API.

This project is both a hands-on learning exercise and a real, usable movie browsing tool. It focuses on modern Next.js patterns, clean UI, and progressively enhancing recommendations based on user taste.

## Features

- Browse popular movies from TMDB
- Infinite scrolling using IntersectionObserver
- Movie detail pages with posters, ratings, and metadata
- Like and dislike movies to build a personal taste profile (ongoing tweaking)
- Client-side taste persistence using localStorage
- Secure TMDB API access via a Next.js API route (Bearer token not exposed)
- Clean, responsive UI built with Tailwind CSS

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- TMDB API
- Next.js Route Handlers for secure API proxying

## Project Structure

src/
- app/
  - api/tmdb/        Server-side TMDB proxy
  - movie/[id]/      Movie detail pages
  - liked/           Liked movies view
  - layout.tsx
  - page.tsx         Home page (discover)
- components/
  - MovieCard.tsx
  - MovieGrid.tsx
  - Other UI components
- context/
  - TasteContext.tsx Global like/dislike state
- lib/
  - tmdb.ts          Client-side TMDB helpers
  - types.ts         Shared TypeScript types
  - userTaste.ts     localStorage persistence

## How It Works

### TMDB API Access

All TMDB requests go through a server-side route handler at /api/tmdb.

This keeps the TMDB Read Access Token secure and avoids exposing secrets to the client. The client only sends query parameters describing what data it wants.

### Infinite Scrolling

The home page uses an IntersectionObserver to load additional pages of movies as the user scrolls, without relying on heavy third-party libraries.

### Taste System

- Users can like or dislike movies
- Taste is stored in React context
- Taste data is persisted to localStorage
- The groundwork is laid for smarter recommendations based on behavior, not just explicit likes

## Environment Variables

Rename `.env.local.sample` to `.env.local` in the project root with at least the TMDB read token filled in:

TMDB_READ_TOKEN=your_tmdb_read_access_token

- This value must be a TMDB "Read Access Token" (Bearer token). You can get it from your TMDB account (Settings -> API -> Read Access Token).
- The server-side API route at `src/app/api/tmdb/route.ts` uses `process.env.TMDB_READ_TOKEN` and sends it in the `Authorization: Bearer ...` header. Keep this secret out of client-side code.

Set `NEXT_PUBLIC_SITE_URL` to the site origin so server-side code can call the internal API route (used by `src/lib/tmdb.ts` when running outside the browser):

NEXT_PUBLIC_SITE_URL=http://localhost:3000

This environment variable is required for server-side code that constructs an absolute URL to the internal `/api/tmdb` route. If it is not set, server-side fetches may attempt to use an invalid base URL and fail. Use your local dev URL for development and the full public origin in production.

## Running Locally

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

Other useful scripts (from `package.json`):

- `npm run build` — build for production
- `npm start` — run the production build
- `npm run lint` — run ESLint (may require additional flags depending on your setup)

Netlify

- Use `npm run netlify-build` as the build command on Netlify. This runs a pre-build env verification and then builds the app.
- Make sure to add `TMDB_READ_TOKEN` and `NEXT_PUBLIC_SITE_URL` in Netlify Site settings -> Build & deploy -> Environment.

## Planned Improvements

- Smarter recommendation scoring
- Better wording around inferred interest vs explicit likes
- Genre and taste weighting
- Improved empty and loading states
- Optional server-side persistence

## License

Personal project. Not affiliated with or endorsed by TMDB.
