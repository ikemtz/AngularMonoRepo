# Copilot Instructions: imng-kendo-schematics

These instructions help AI coding agents work productively in this Angular Schematics project.

## Architecture & Data Flow

- **Schematics collection:** Entry points are declared in [src/collection.json](../src/collection.json). Available schematics: `imng-module`, `imng-list`, `imng-crud`, `imng-sub-list`, and `ng-add`.
- **Shared pipeline:** Core logic lives in [src/shared/rules.ts](../src/shared/rules.ts) and [src/shared/map-properties.ts](../src/shared/map-properties.ts).
  - `getSwaggerDoc()` loads an OpenAPI document from `openApiJsonUrl` or `openApiJsonFileName` and populates `IOptions` with `swaggerProperties`, `firstProperty`, and flags like `hasDates`/`hasObjects`.
  - `generateFiles()` computes naming (plural/singular, dasherized paths) and applies templates from each schematic's `files/` dir via `applyTemplates()`.
- **Type contracts:** OpenAPI structures and mapped property attributes are defined in [src/shared/open-api-component.ts](../src/shared/open-api-component.ts) and options in [src/shared/options.ts](../src/shared/options.ts).
- **Schematic composition:** Some schematics orchestrate others. Example: [src/imng-module/index.ts](../src/imng-module/index.ts) runs `getSwaggerDoc`, generates the module, then invokes `imng-list` and `imng-crud` when OpenAPI input is provided.

## Conventions & Patterns

- **Naming:** Uses `pluralize` and Angular DevKit `strings` helpers (`dasherize`, `classify`). Generated module folders follow `<pluralized-name>-module`.
- **Excluded fields:** Certain properties are hidden and skipped (e.g., `createdOnUtc`, `updatedBy`). See `excludedFields` in [src/shared/map-properties.ts](../src/shared/map-properties.ts).
- **Property mapping:** `mapPropertyAttributes()` infers `htmlInputType`, `filterExpression`, and `testFactoryValue` based on OpenAPI type/format and `$ref` relationships.
- **Templates:** Each schematic’s templates are under `src/<schematic>/files`. They use the injected template variables from `IOptions` (e.g., `pluralizedName`, `firstProperty`, `hasDates`).
- **Generated file layout:** Paths are derived from `options.path` and schematic type. Example module output folder: `.../<pluralized-name>-module` with `+state`, `*-list`, and `*-crud` sub-areas in downstream schematics.

## Developer Workflows

- **Build:** TypeScript compile, then copy schema + template assets to `dist/schematics/` via [package.sh](../package.sh). On Windows, run in Git Bash/WSL because `postbuild` uses `bash`.
  ```bash
  npm run build
  ```
- **Test:** Uses Jest with `ts-jest`; coverage is emitted to `coverage/` and JUnit to `junit.schematics.xml`. Config in [jest.config.js](../jest.config.js).
  ```bash
  npm run test
  ```
- **Lint:** ESLint with TypeScript configs; see [eslint.config.mjs](../eslint.config.mjs).
  ```bash
  npm run lint
  ```
- **Link locally:** Build then `npm link` the packaged `dist/` for local consumption.
  ```bash
  npm run link
  ```
- **Run schematics locally (examples):** The scripts in [package.json](../package.json) show typical invocations using the compiled `collection.json` in `dist/schematics/`.
  - Generate a module from a local OpenAPI file:
    ```bash
    npm run build && schematics ./dist/schematics/collection.json:module employee \
      --path="./dist/" --openApiJsonFileName=./open-api-docs/nrcrn-empl-odata.json \
      --dry-run=false --force --verbose --appPrefix=nrcrn
    ```
  - Generate a list directly:
    ```bash
    npm run build && schematics ./dist/schematics/collection.json:list employee \
      --path="./dist/" --openApiJsonUrl=<swagger-url> \
      --dry-run=false --force --verbose --appPrefix=<prefix>
    ```

## Options You’ll Use

- **Required:** `name`, `appPrefix`, `path`.
- **OpenAPI input (one required):** `openApiJsonUrl` or `openApiJsonFileName`.
- **Optional naming:** `parentName`, `storeName` (defaults to `name`).
- **Derived internally:** `swaggerProperties`, `firstProperty`, `hasDates`, `hasObjects`, `hasNullableDates`.

## Testing Patterns

- Schematic tests use `SchematicTestRunner` against [src/collection.json](../src/collection.json), asserting file paths and template content. See examples in `src/**/index_*.spec.ts` like [src/imng-module/index_cert.spec.ts](../src/imng-module/index_cert.spec.ts).

## Extending/Modifying

- To add a new schematic:
  - Declare it in [src/collection.json](../src/collection.json).
  - Create `index.ts` to orchestrate `getSwaggerDoc()` + `generateFiles()` (and any composed schematics).
  - Add `schema.json` and `files/` with templates; ensure `package.sh` will copy them.
- When adjusting property handling, update [src/shared/rules.ts](../src/shared/rules.ts) and [src/shared/map-properties.ts](../src/shared/map-properties.ts). Keep `excludedFields` and `$ref` mapping in sync with template expectations.

## Integration Notes

- Templates reference Kendo, NGRX, and `imng-*` packages in the generated code. Ensure the consuming Angular app has these dependencies installed when using the generated artifacts.
- HTTPS OpenAPI fetches use an agent that disables cert verification for convenience; be mindful in production scenarios.

If any section is unclear or missing details (e.g., additional schematic templates or specific generation outputs you rely on), tell me what to refine, and I’ll iterate quickly.
