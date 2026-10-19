# PulseQueue

A frontend-only social media post scheduler built with React, TypeScript, and Vite.

## Run locally

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite. For a production build:

```bash
npm run build
npm run preview
```

## Included

- Queue of 30 mock posts grouped by day (Today, Tomorrow, then dates)
- Facebook, Instagram, X, TikTok, and LinkedIn platform badges
- Search plus platform/status filters persisted in URL query parameters
- Responsive composer with multi-platform selection, optional image URL, and local date-time picker
- Per-platform live character limits; invalid posts cannot be scheduled
- UTC storage with display in the browser's local timezone
- Optimistic failed-post retry with a 1-second mocked API delay and 20% simulated failure rate
- Loading, empty, form validation, retry error, and success states

## Key decisions and assumptions

- Mock data lives in `src/data/posts.json` to keep the assignment self-contained and easy to inspect.
- The assignment does not require real authentication, media upload, publishing, or a backend, so those flows are represented as local UI behavior.
- The browser timezone is the user's local timezone. New posts are converted to UTC before they are added to the local queue.
- A post's day grouping is based on the viewer's local timezone, while the underlying stored value remains UTC.
- Since no brand assets were provided, platform marks are lightweight text-based badges rather than official SVG logos.

## Deployment

This Vite app can be deployed to Vercel or Netlify with the default settings:

- Build command: `npm run build`
- Output directory: `dist`

After deployment, add the live URL here:

`Live URL: pending deployment`

The requested repository sharing and deployment require access to a Git hosting/deployment account, so those external steps are intentionally left as the final handoff action.
