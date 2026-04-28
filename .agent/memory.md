# Project Memory

## Project summary
- Open-source coding agent platform with VS Code extension, CLI, and shared TypeScript core.

## Architecture notes
- Shared core provides provider registry, retrieval, tools, and agent loop.
- Extension and CLI are host layers that supply approvals and UI.

## User preferences
- Security-first defaults and provider-compliant authentication only.

## Common commands
- `pnpm build`
- `pnpm test`
- `pnpm typecheck`

## Testing strategy
- Vitest unit tests for retrieval, providers, tools, classifier, and patch safety.

## Important files
- `.agent/config.json`
- `packages/core/src/index.ts`
- `docs/security.md`

## Decisions made
- Telemetry is opt-in and disabled by default.
- Browser-session scraping and private endpoints are intentionally unsupported.
