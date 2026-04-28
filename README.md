# Aug VS — Local-First Agentic Coding IDE

Aug VS is an open-source, web-based AI coding IDE designed for local development with a VS Code-like interface and an integrated coding agent.

## No Login / No Registration

This project intentionally has:
- no login page,
- no registration,
- no user accounts,
- no backend identity/auth system.

You can run immediately with the **Mock provider**. Optional BYOK keys are local-only configuration.

## Core Capabilities

- VS Code-like web layout (activity bar, sidebar, tabs, editor, terminal, status bar).
- Shared core package for retrieval, providers, tools, MCP, and agent-loop primitives.
- CLI package that reuses core.
- Local server scaffold for workspace, git, tools, and websocket channels.
- Provider registry with mock and DeepSeek reference adapter.
- Context engine primitives: scanner, ignore matching, chunking, BM25, vector index, RRF, token budget.
- Query classifier + multi-stage agent-loop scaffolding.
- VS Code extension scaffold + JetBrains plugin scaffold.

## Safety & Compliance

- Provider-compliant auth only (API keys/OAuth/device-code where officially supported).
- No browser cookie extraction.
- No private endpoint reverse engineering.
- No anti-bot bypass or rate-limit circumvention.
- Telemetry disabled by default.

## Monorepo Layout

- `apps/web` — web IDE frontend (Vite + React)
- `apps/server` — local server (Express + WS scaffold)
- `packages/core` — shared retrieval/provider/agent/tool code
- `packages/cli` — command-line interface
- `extensions/vscode` — optional extension scaffold
- `plugins/jetbrains` — optional plugin scaffold
- `docs` — architecture, security, tools, providers, and setup docs
- `examples` — sample `.agent` config and ignore files

## Quick Start

```bash
pnpm install
pnpm dev
```

## Build & Validate

```bash
pnpm build
pnpm test
pnpm lint
pnpm typecheck
```

## Provider Setup

- Default: `mock` provider (no credentials required).
- Optional: configure cloud providers with local secret storage.
- Optional local models: Ollama (`http://localhost:11434`).

## Example `.agentignore`

```gitignore
node_modules/
.git/
dist/
```

## Documentation

- `docs/architecture.md`
- `docs/security.md`
- `docs/providers.md`
- `docs/context-engine.md`
- `docs/query-classifier.md`
- `docs/agent-loop.md`
- `docs/tools.md`
- `docs/web-ide.md`
- `docs/configuration.md`
- `docs/cli.md`
- `docs/mcp.md`
- `docs/vscode-extension.md`
- `docs/jetbrains.md`
- `docs/development.md`
- `docs/installation.md`

## License

MIT
