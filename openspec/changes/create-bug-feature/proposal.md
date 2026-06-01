## Why

The workshop needs a working Bug Tracker POC to teach Spec-Driven Development with OpenSpec. This first change establishes the project scaffolding and delivers the foundational Create Bug feature so subsequent workshop changes (List, Triage) can build on a running, tested codebase.

## What Changes

- Scaffold a greenfield monorepo: React + TypeScript (Vite) + Tailwind frontend, Node.js + Express + TypeScript backend, with a single `npm run dev` that runs both together.
- Add Vitest (and Supertest for API tests) test infrastructure wired for TDD.
- Implement the Create Bug capability end to end:
  - `POST /api/bugs` endpoint backed by an in-memory store.
  - Bug fields: Title (required, max 100 chars), Description (optional), Severity (P1/P2/P3 optional), Status (defaults to "New"), CreatedAt.
  - Validation that rejects a missing Title or a Title over 100 chars with a clear error and no creation.
  - A minimal, clean create-bug form in the UI that surfaces validation errors.
- Add a root `LAB-README.md` documenting how to run the app and the tests.

Non-goals for this change: List Bugs, Triage, auth/roles, persistence, edit/delete.

## Capabilities

### New Capabilities
- `create-bug`: Creating a bug with validated fields and a default status, persisted to the in-memory store and surfaced through the API and a minimal UI form.

### Modified Capabilities
<!-- None - this is the first change. -->

## Impact

- New monorepo structure with `frontend/` and `backend/` (or workspaces) plus root tooling (`package.json`, `vite.config`, `tailwind.config`, `vitest.config`).
- New dependencies: react, react-dom, vite, tailwindcss, express, typescript, vitest, supertest, concurrently (or equivalent) for combined dev.
- New API surface: `POST /api/bugs`.
- New `LAB-README.md` at repo root.
