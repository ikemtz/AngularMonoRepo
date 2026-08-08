# Verify typecheck after the Nx 23.1 migration

This migration enables `isolatedModules` on ts-jest spec configs. Run
`nx run-many -t typecheck` and fix any project it broke.

`isolatedModules` can fail typecheck (TS1205 - a re-exported type needs `export type`;
TS2748 - const enum access) or break a project's tests at runtime. To fix a broken
project, remove `isolatedModules` from its `tsconfig.spec.json` and re-run. If a
`TS2307: Cannot find module` error then appears for a workspace library, that project
needs `isolatedModules` - keep it and fix the source instead (avoid mixing
`module.exports` with an ESM `export`, and avoid cross-file `const enum`).

Re-run until the projects this migration touched typecheck. See the migration
documentation for details.

How to execute this migration

- Run the migration generator and apply migrations:

	1. nx migrate @nrwl/jest@23.1.0
	2. nx migrate --run-migrations

- Then run typechecking across the workspace and fix failures:

	nx run-many -t typecheck --all

- If tests break at runtime for a project, remove `isolatedModules` from its
	tsconfig.spec.json, re-run typecheck, and only keep `isolatedModules` if the
	project requires it (fix source to avoid mixed CommonJS/ESM or const enum use).
