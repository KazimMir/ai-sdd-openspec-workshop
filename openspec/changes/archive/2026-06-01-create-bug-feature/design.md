## Context

This is the first change in a greenfield workshop POC. There is no existing code, so this change must both stand up the project scaffolding and deliver the Create Bug capability on top of it. The scaffolding decisions here set the pattern that later workshop changes (List, Triage) inherit, so they should be simple, conventional, and easy to teach. Storage is in-memory only and the whole stack must start with a single `npm run dev`.

## Goals / Non-Goals

**Goals:**
- A runnable monorepo with frontend and backend that start together via `npm run dev`.
- A shared Bug domain type and an in-memory store the backend owns.
- A validated `POST /api/bugs` endpoint and a minimal create-bug form.
- Test infrastructure (Vitest + Supertest) ready for a strict Red–Green–Refactor flow.
- A `LAB-README.md` covering run and test commands.

**Non-Goals:**
- List, Triage, edit, delete, auth, roles, or persistence beyond process memory.
- Production concerns: build/deploy pipelines, Docker, env config, logging.
- Shared validation library across client/server (server is the source of truth).

## Decisions

**Monorepo with npm workspaces (`backend/`, `frontend/`).** Two workspaces under one root `package.json` keep dependencies isolated while a single install and a single `npm run dev` cover both. Alternative considered: a single flat package serving React from Express. Rejected because keeping client and server boundaries explicit teaches the spec/layer separation better and matches the later features.

**Run both with `concurrently`.** Root `npm run dev` runs `concurrently` over the backend (`tsx watch`) and the Vite dev server. Vite proxies `/api` to the backend so the frontend calls relative URLs and there are no CORS concerns in dev. Alternative: a custom Node script — rejected as more code to maintain for a demo.

**Validation lives on the server, returned as structured errors.** `POST /api/bugs` validates Title presence, the 100-char max, and Severity enum, returning HTTP 400 with `{ error: { field, message } }`. The UI renders whatever message the server returns rather than duplicating rules. This keeps the spec's validation requirements testable in one place (Supertest) and lets the UI test focus on display behavior. Alternative: client-side validation as the gate — rejected because it makes the server the weaker contract and splits the spec across two layers.

**In-memory store as a small module with an explicit reset.** The store is a plain module exposing `create`, `getAll`, and a `reset` used by tests to guarantee isolation between cases. ids use an incrementing counter (or `crypto.randomUUID`); CreatedAt is an ISO timestamp set by the store. Alternative: a class instance injected via DI — rejected as over-engineered for the POC, though the module shape keeps a later swap easy.

**Bug model.** `{ id, title, description?, severity?, status, createdAt }` where `severity ∈ {P1,P2,P3}` and `status` starts at `"New"`. The type is defined on the backend and mirrored minimally on the frontend; no shared package to keep scaffolding flat.

## Risks / Trade-offs

- **In-memory store loses data on restart** → Acceptable and intended for the workshop; called out in `LAB-README.md`.
- **Duplicated Bug type across frontend/backend** → Small surface now; if it grows, extract a shared workspace in a later change.
- **No client-side validation means a round trip for every error** → Acceptable for a POC; server stays the single source of truth and the form still reflects errors clearly.
- **`concurrently` / Vite proxy is environment-sensitive on Windows** → Mitigation: pin versions, document the exact `npm run dev` flow and ports in `LAB-README.md`.
