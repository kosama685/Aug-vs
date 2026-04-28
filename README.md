# Aug VS — Local-First Agentic Coding IDE

Aug VS is a production-focused, open-source, web-based AI coding IDE that feels familiar to VS Code while keeping control on your machine.

It ships with:
- a VS Code-like web IDE,
- a local backend for workspace-safe operations,
- a TypeScript core for providers/retrieval/agent loop/tools,
- a reusable CLI,
- extension/plugin scaffolds.

## Privacy and Authentication Model (No Login / No Register)

Aug VS intentionally has:
- no login page,
- no registration flow,
- no user accounts,
- no backend identity database,
- no mandatory cloud authentication.

You can run immediately with the `mock` provider. Cloud API keys are optional BYOK configuration stored locally.

## Safety and Compliance

Aug VS is designed for provider-compliant and legally safe integrations:
- Uses official APIs and documented auth flows only.
- Does **not** use cookie extraction, browser session scraping, or private endpoint automation.
- Does **not** bypass captchas, anti-bot controls, billing, or rate limits.
- Telemetry is disabled by default.
- Terminal execution is policy-gated with approval/safe-command controls.

See `docs/security.md` and `docs/providers.md` for details.

## Feature Overview

### Web IDE
- VS Code-style layout: activity bar, sidebar, editor tabs/splits, terminal panel, chat panel, status bar.
- Monaco editor integration (syntax highlighting, editing UX, diff support).
- File explorer operations and workspace search panel.
- Git panel scaffolding for status/diff/commit flows.

### Agentic Coding
- Multi-stage agent loop (classify → retrieve → plan → approve → execute → summarize).
- Approval-aware tool execution model.
- Patch-based editing workflow.
- Session memory primitives with secret-safe handling rules.

### Retrieval + Context Engine
- `.agentignore` + ignore matching.
- File scanning/chunking.
- BM25 lexical retrieval.
- Vector index abstraction + mock embeddings.
- Reciprocal Rank Fusion (RRF).
- Token budget enforcement.

### Providers
- `mock` provider (default, zero-setup).
- `deepseek` reference provider adapter (OpenAI-compatible API shape).
- Provider registry abstraction designed for additional adapters.

### Developer Experience
- pnpm workspaces monorepo.
- strict TypeScript.
- Vitest, ESLint, Prettier.
- Vite frontend + Express/WS backend scaffolding.
- CLI package reusing core package logic.

## Monorepo Structure

```text
.
├── apps/
│   ├── server/            # Local backend server (REST + WebSocket)
│   └── web/               # Browser IDE (Vite + React)
├── packages/
│   ├── cli/               # Terminal CLI (reuses core)
│   └── core/              # Providers, retrieval, tools, agent loop
├── extensions/
│   └── vscode/            # Optional VS Code extension scaffold
├── plugins/
│   └── jetbrains/         # Optional JetBrains plugin scaffold
├── docs/                  # Architecture/security/provider/IDE docs
├── examples/              # Example .agent configs and sample workspace
├── docker-compose.yml
└── README.md
```

## Requirements

- Node.js 20+
- pnpm 10+
- Linux/macOS/WSL recommended for local terminal workflow

## Quick Start

```bash
pnpm install
pnpm dev
```

Default local endpoints:
- Web IDE: `http://localhost:5173`
- Server API: `http://localhost:3001`

## Running “Live” Locally

1. Start both apps:
   ```bash
   pnpm dev
   ```
2. Open `http://localhost:5173`.
3. Select/open a local workspace path from the UI.
4. Keep provider as `mock` for immediate usage (no key required).
5. Open chat panel and run an agent request (for example: “summarize this project”).

### Optional: Run with Ollama

1. Install Ollama and pull a model (for example `llama3.1`).
2. Ensure Ollama serves at `http://localhost:11434`.
3. Configure provider settings in Aug VS to use Ollama model ID.

### Optional: BYOK Cloud Provider

- Configure provider key/endpoint in local settings.
- Keys are local-only and never committed.

## CLI Usage

```bash
pnpm --filter @aug-vs/cli dev -- --help
```

Typical workflows:
- `agent chat`
- `agent ask "How is context fusion implemented?"`
- `agent index`
- `agent providers list`

## Build, Test, and Quality Gates

```bash
pnpm build
pnpm test
pnpm lint
pnpm typecheck
pnpm format
```

## Configuration

Workspace/project settings use `.agent/config.json` (see `docs/configuration.md`).

Example files are provided in:
- `examples/.agent/config.json`
- `examples/.agent/.agentignore`
- `examples/sample-workspace/`

## Documentation Map

- `docs/architecture.md`
- `docs/web-ide.md`
- `docs/providers.md`
- `docs/context-engine.md`
- `docs/query-classifier.md`
- `docs/agent-loop.md`
- `docs/tools.md`
- `docs/security.md`
- `docs/cli.md`
- `docs/mcp.md`
- `docs/configuration.md`
- `docs/development.md`
- `docs/installation.md`
- `docs/vscode-extension.md`
- `docs/jetbrains.md`

## Troubleshooting

- **pnpm install fails due network/proxy**: verify registry/proxy settings and retry.
- **Port already in use**: change configured server/web ports.
- **Provider auth error**: use `mock` provider first, then validate key and endpoint.
- **Indexing skips files**: inspect ignore patterns and max file size limits.

## Contributing

1. Fork + branch.
2. Make changes with tests.
3. Run build/test/lint/typecheck.
4. Open PR with architecture/security implications explained.

## License

MIT
