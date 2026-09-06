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
