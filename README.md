# StreakStack

A simple, beautiful habit tracker that keeps people consistent — daily streaks, gentle nudges, and a clean interface that doesn't get in the way.

## Structure

This is a monorepo with npm workspaces:

- `web/` — React + TypeScript + Vite frontend (the habit tracker UI)
- `api/` — Node.js backend (auth, habits, streaks, Stripe subscriptions)
- `shared/` — shared types/utilities used by web and api
- `landing/` — marketing landing page (static HTML + assets)

## Getting started

```bash
npm install
npm run dev:web   # start the frontend
npm run dev:api   # start the backend
```

## Build

```bash
npm run build:web
npm run build:api
```

## Environment

The API reads its config from `api/.env` (gitignored). See the deploy scripts for the required variables.
