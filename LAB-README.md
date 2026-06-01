# Bug Tracker Lab

A small Bug Tracker web app used as a demo POC for a workshop teaching Spec-Driven Development (SDD) with OpenSpec. This first slice delivers the **Create Bug** feature on a greenfield React + Express monorepo. Data is held in memory only and resets when the backend restarts.

## Prerequisites

- Node.js 20+ (developed on Node 22)
- npm 10+

## Project layout

```
.
├── backend/    Node + Express + TypeScript API (in-memory store)
├── frontend/   React + TypeScript (Vite) + Tailwind UI
├── openspec/   OpenSpec change(s) and specs
└── package.json  npm workspaces + combined dev script
```

## Install

From the repo root:

```bash
npm install
```

This installs dependencies for both workspaces.

## Run the app

```bash
npm run dev
```

This starts both servers together via `concurrently`:

- Backend API: http://localhost:3001 (health check at `/api/health`)
- Frontend: http://localhost:5173

Open http://localhost:5173. The Vite dev server proxies `/api/*` to the backend, so the UI calls relative URLs with no CORS setup.

To create a bug, fill in the form and click **Create Bug**. Title is required and capped at 100 characters. Severity and description are optional. Validation is enforced by the server, and any error is shown above the button.

## Run the tests

Run the full suite (backend then frontend):

```bash
npm test
```

Or per workspace:

```bash
npm run test -w backend    # Vitest + Supertest (store + API)
npm run test -w frontend   # Vitest + Testing Library (form component)
```

## TDD workflow

Every behavior was built Red → Green → Refactor: a failing test first, then the implementation to pass it, then cleanup with tests staying green. The ordered steps live in [openspec/changes/create-bug-feature/tasks.md](openspec/changes/create-bug-feature/tasks.md), and the behavior they verify is specified in [openspec/changes/create-bug-feature/specs/create-bug/spec.md](openspec/changes/create-bug-feature/specs/create-bug/spec.md).

## Notes and limitations

- Storage is in-memory only. Restarting the backend clears all bugs.
- Out of scope for this change: listing bugs, triage, edit/delete, auth, and persistence. These are planned as later workshop changes.
