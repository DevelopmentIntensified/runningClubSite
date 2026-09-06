# AGENTS.md

Guidance for AI coding agents working in this repo.

## Stack

- SvelteKit 2 + Svelte 5. Codebase mixes legacy syntax (`$:`, `export let`, `on:`) and runes (`$props`, `$state`). Match the style of the file you are editing; do not convert wholesale.
- Postgres via Drizzle ORM. Schema: `src/lib/server/db/schema.ts` (single source of truth; ignore stale copies under `drizzle/schema.ts`).
- Auth: Lucia v3. Session user fields exposed via `getUserAttributes` in `src/lib/server/auth.ts`.

## User / role model (do not change without explicit ask)

- Admin access = `users.isAdmin` boolean. Enforced in `src/hooks.server.ts` (403 on `/admin/*`) and `src/routes/api/blob/upload/+server.ts`.
- Alumni status = `users.isAlumni` boolean. A user with `isAlumni = true` has `graduationYear = null`. Both flags exist independently of each other.
- `users.academicLevel` holds `'undergraduate'` | `'graduate'` only.
- There is deliberately **no** `roles` array column. This was proposed and rejected; keep the two booleans.

## Graduation year rules

- Signup select lists years descending from `currentYear` down to **2022**, plus an **"Alumni"** option (`src/routes/login/setup/+page.svelte`).
- Server validates year ∈ [2022, currentYear] unless `isAlumni` is set (`src/routes/login/setup/+server.ts`).
- Settings/admin-edit year selects intentionally still use the old limited range; alumni users show a badge instead of a year.

## Database migrations

- Workflow is `db:push` based (`npm run db:push:preview` for test, `db:push:prod` for prod). Migrations in `drizzle/*.sql` are a record, applied via `npm run db:migrate`.
- Snapshots before `0007` are missing/stale, so raw `drizzle-kit generate` output re-creates tables that already exist. After generating, **keep the new snapshot + journal entry but trim the `.sql` down to the genuinely incremental statements**, otherwise migrate fails on pushed databases.

## Commands

- `npm run check` — svelte-check; must pass with 0 errors (warnings are tolerated, many pre-existing).
- `npx prettier --write <files>` — formatting must match repo config before committing.
- `npm run test:unit`, `npm run test:e2e` — Playwright/Vitest. E2e artifacts land in `playwright-report/` and `tests/.auth/`; they get committed too per the push-all rule above.

## Commits & branches

- Standing rule: **always push all changes to `test`** (`git add -A; git push origin test`) — but only after `npm run build` succeeds and tests pass.
- Conventional Commits, terse subject ≤72 chars, body only for non-obvious why/migration notes.
- `main` is production.

## Issue tracking (docs/issues, repo root sibling: ../docs/issues)

This project tracks work in local markdown issues, not a hosted tracker.

- Location: `docs/issues/` at the repo root (one level above this app dir).
- Naming: `NNN-short-slug.md`, sequential. Check the highest existing number first.
- Format — every issue file has: `# NNN — Title`, `Status: open|in-progress|done`, `## Done`, `## Needs doing`.
- Workflow: when starting work, set Status to `in-progress` and move specifics under `Needs doing`; when finished, move them to `Done`, flip Status to `done`, and verify with `npm run build`.
- Rollup: `docs/STATUS.md` mirrors the tracker — update its Done/Open lists when issues flip.
- Never batch unrelated work into one issue; create a new numbered file instead.
- Do not edit anything between the nextjs-agent-rules markers above.

## Agent Notes — project working style

- Delegate to subagents early and often — faster inline; verify after (read diff, re-run checks). Batch independent work into parallel calls.
- Implementation follows tdd where a seam exists (red-green-refactor; tests first). Until 017 lands a suite, at minimum cover status-transition rules + campus-email gate with vitest first.
- Research: breadth-first, skim, file:line evidence — don't over-verify.
- Terse by default; explain when asked.
- Schema changes: record SQL alongside (db/seed.sql + notes in the issue); never rely only on `npm run db:push`.
- Unknowns, user driving: grill-with-docs skill to ask, never guess. Hands-off ("continue"/AFK): assume from CONTEXT.md, docs/, past answers; list assumptions at the end.
- Correctness: every edit must parse — balance brackets before moving on; one region per edit, small enough to eyeball; re-read the region or run the fastest covering check immediately after; never stack edits on unverified edits.
- Git: `npm run build` before pushing — never push a broken build. Test branch unless told otherwise. Commit + push each finished slice, don't batch.
- Testing: Playwright directly (`npx playwright test`); no wrapper CLIs. Test accounts: `seller@liberty.edu` / `buyer@liberty.edu` (`campusmart123`). After pushing to a deployed branch, wait for the deploy, then run the loop (post → inquire → accept → sold).
- Issues: docs/issues (NNN-slug, Status/Done/Needs-doing) + docs/STATUS.md rollup stay in sync with every change.
- Domain: see CONTEXT.md (repo root).
- Instant + meaningful feedback: every interaction acknowledges in <100ms (optimistic
  update or pending state), confirms with a toast/inline status that names what
  happened and what happens next, and never uses bare alert() or silent reloads.
  New client mutations must use the shared Toast + optimistic pattern; loading
  states use skeletons, not blank cards.

## Communication style

- Unless explaining to me, use caveman mode (terse fragments, no filler). Drop caveman only when explaining/clarifying on request.
