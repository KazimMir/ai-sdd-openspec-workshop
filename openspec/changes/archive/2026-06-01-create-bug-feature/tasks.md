## 1. Scaffolding

- [x] 1.1 Create root `package.json` with npm workspaces (`backend`, `frontend`) and a `dev` script using `concurrently`
- [x] 1.2 Scaffold `backend/` (Node + Express + TypeScript) with `tsx watch`, `tsconfig.json`, and an Express app entry
- [x] 1.3 Scaffold `frontend/` (Vite + React + TypeScript + Tailwind) with a Vite `/api` proxy to the backend
- [x] 1.4 Install and configure Vitest in both workspaces; add Supertest to the backend; add `test` scripts
- [x] 1.5 Verify `npm install` then `npm run dev` starts frontend and backend together; verify `npm test` runs (no tests yet is OK)

## 2. Bug model and in-memory store (Red → Green → Refactor)

- [x] 2.1 RED: Write failing tests for the store — `create` assigns id/Status "New"/CreatedAt, `getAll` returns created bugs, `reset` clears state
- [x] 2.2 GREEN: Define the `Bug` type and implement the in-memory store to pass the tests
- [x] 2.3 REFACTOR: Clean up naming/types; confirm tests stay green

## 3. Create Bug API: valid input (Red → Green → Refactor)

- [x] 3.1 RED: Write failing Supertest cases for `POST /api/bugs` — title only, all fields, and 100-char boundary all return 201 with correct defaults (Status "New", CreatedAt set)
- [x] 3.2 GREEN: Implement `POST /api/bugs` to create and return the bug
- [x] 3.3 REFACTOR: Extract request mapping/response shaping; confirm tests stay green

## 4. Create Bug API: validation (Red → Green → Refactor)

- [x] 4.1 RED: Write failing Supertest cases — missing/empty title → 400, title 101 chars → 400, invalid severity → 400, each with a clear message and no bug stored
- [x] 4.2 GREEN: Implement server-side validation returning structured 400 errors
- [x] 4.3 REFACTOR: Consolidate validation into a single helper; confirm tests stay green

## 5. Create Bug UI form (Red → Green → Refactor)

- [x] 5.1 RED: Write failing component tests — empty-title submit shows the validation error and preserves input; valid submit calls the API and clears the form on success
- [x] 5.2 GREEN: Build the minimal Tailwind create-bug form, wire it to `POST /api/bugs`, and render server validation errors
- [x] 5.3 REFACTOR: Tidy component structure/styles for a clean professional look; confirm tests stay green

## 6. Documentation and final verification

- [x] 6.1 Write `LAB-README.md` at the repo root: prerequisites, `npm install`, `npm run dev` (with ports), and how to run tests
- [x] 6.2 Run the full test suite (backend + frontend) and confirm all pass
- [x] 6.3 Manually verify create-bug works end to end in the browser via `npm run dev`
