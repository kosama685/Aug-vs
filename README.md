# Aug VS Agent

Open-source AI coding agent platform with a VS Code extension, shared TypeScript core, CLI, and JetBrains scaffold.

## Safety & Compliance
- Uses provider-compliant auth only (API key/OAuth/device-code/local models).
- Does **not** use browser cookie extraction, web-session scraping, private endpoints, or anti-bot bypass.
- Telemetry is opt-in and disabled by default.

## Features
- Multi-provider architecture with registry and typed adapters.
- DeepSeek reference provider (official API style with API key).
- Retrieval engine: scanner, `.agentignore`, chunking, BM25, vector search, RRF, token budget.
- Intent-aware query classifier.
- Agent loop with planning + retrieval + model execution.
- Tool registry, patch validation, terminal safety policy, memory store.
- VS Code extension scaffold and CLI scaffold.
- JetBrains plugin scaffold.

## Monorepo
- `packages/core`: shared engine and interfaces.
- `packages/cli`: terminal app.
- `extensions/vscode`: VS Code extension.
- `plugins/jetbrains`: JetBrains plugin scaffold.

## Install
```bash
pnpm install
pnpm build
```

## Development
```bash
pnpm typecheck
pnpm test
pnpm lint
```

## Usage
```bash
pnpm --filter @aug-vs/cli build
node packages/cli/dist/index.js providers list
```

## Provider configuration
- Store keys in a secret store implementation (VS Code SecretStorage, OS keychain-backed implementation, or secure host service).
- DeepSeek adapter uses `aug-vs/deepseek` + `apiKey` secret coordinates.

## Local model setup
- Use provider adapter interface for Ollama/llama.cpp local adapters in future packages.

## `.agentignore` example
```gitignore
node_modules/
dist/
.git/
```

## Token budget
- Retrieval budget defaults to `8000` tokens (`.agent/config.json`).

## Tool approval
- Patch tool validates diff and requires host approval before apply.
- Terminal tool uses command risk classification and approval gate.

## MCP support
- Core includes MCP client abstraction and null client fallback.

## Memory behavior
- `.agent/memory.md` stores concise project memory and redacts secret-like entries.

## Troubleshooting
- Auth failure: reconfigure provider key or switch to mock/local provider.
- Indexing failure: fallback to file-local mode and continue.

## Security model
See `docs/security.md`.

## Roadmap
- Add official OpenAI/Anthropic/Gemini/Mistral/Ollama adapters.
- Add richer VS Code chat UI with per-hunk patch approvals.
- Add persisted vector index and symbol graph backend.

## Contributing
1. Fork and create a feature branch.
2. Run `pnpm test`, `pnpm typecheck`, `pnpm lint`.
3. Open PR with tests.

## License
MIT
