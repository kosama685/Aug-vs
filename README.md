# Aug Agent Monorepo

Open-source coding agent architecture that targets feature parity with Augment Code, Cursor, and Claude Code, while using **browser-session authentication** (no API keys).

## 1) Architecture Diagram

See full diagram in `docs/architecture.md`.

## 2) Monorepo Structure

```text
.
├── .agentignore
├── docs/
│   └── architecture.md
├── packages/
│   ├── core/
│   │   └── src/
│   │       ├── agent/
│   │       ├── auth/
│   │       ├── interfaces/
│   │       ├── providers/deepseek/
│   │       ├── retrieval/
│   │       ├── tools/
│   │       ├── types/
│   │       └── index.ts
│   ├── vscode-extension/
│   │   └── src/
│   │       ├── chat/
│   │       ├── providers/
│   │       └── extension.ts
│   ├── jetbrains-plugin/
│   └── cli/
├── package.json
└── tsconfig.base.json
```

## 3) Core Interfaces (TypeScript)

Implemented in `packages/core/src/interfaces/contracts.ts`:

- `LLMProvider`
- `BrowserSessionAuth`
- `ContextEngine`
- `RetrievalStrategy`
- `QueryClassifier`
- `AgentLoop`
- `ToolRegistry`

## 4) DeepSeek Browser-Session Adapter (Reference Provider)

Implemented in:

- `packages/core/src/providers/deepseek/deepseekAuth.ts`
- `packages/core/src/providers/deepseek/deepseekProvider.ts`
- `packages/core/src/auth/chromiumCookieExtractor.ts`
- `packages/core/src/auth/browserSessionVault.ts`

### DeepSeek adapter behavior

1. **Sign-in flow** (`signInWithEmbeddedWebView`):
   - Launches persistent Playwright Chromium profile.
   - Opens `https://chat.deepseek.com`.
   - Waits for successful login URL.
   - Captures cookies and optional CSRF token.
   - Encrypts session payload in OS keyring via `keytar`.

2. **Cookie import flow** (`importFromLocalBrowser`):
   - Reads Chromium cookie DB from local profile path.
   - Extracts DeepSeek-domain cookies.
   - Stores imported cookies in keyring vault.

3. **Streaming completion**:
   - Builds signed request (`x-client-signature` + timestamp hash).
   - Calls DeepSeek web endpoint with stored browser headers.
   - Parses SSE chunks and yields incremental token deltas.

## 5) Token-Efficient Retrieval Pipeline

Implemented in:

- `packages/core/src/retrieval/contextEngine.ts`
- `packages/core/src/retrieval/bm25Strategy.ts`
- `packages/core/src/retrieval/embeddingStrategy.ts`
- `packages/core/src/retrieval/symbolGraphStrategy.ts`
- `packages/core/src/retrieval/tokenizer.ts`

### Retrieval flow

1. Incremental chunking (80-line file chunks).
2. Three signals:
   - BM25 lexical ranking.
   - Local embeddings (pluggable model abstraction).
   - Symbol-graph relevance from import/type/function references.
3. Reciprocal Rank Fusion merge.
4. Hard token budget cut-off (default 8k).
5. Session retrieval-cache dedupe by query+mode+scope.
6. Diff-based reindex on save (`onFilesChanged`).

### Skip rules

Hard-coded ignore paths + `.agentignore` baseline policy:

- `node_modules`, `.venv`, `dist`, `build`, `vendor`, `.git`
- lockfiles and large files (> 500KB)

## 6) Query Classifier (Selective Search)

Implemented in `packages/core/src/agent/queryClassifier.ts`.

Rules:

- Greetings and small talk -> `off`
- Syntax/docs-only prompts -> `off`
- “Explain this function/file” + selected-code style prompts -> `file-local`
- Fix/refactor/debug repo tasks -> `full`
- Fallback few-shot classification prompt builder included

## 7) VS Code Extension Scaffold

Implemented in:

- `packages/vscode-extension/package.json`
- `packages/vscode-extension/src/extension.ts`
- `packages/vscode-extension/src/chat/participant.ts`
- `packages/vscode-extension/src/providers/runtime.ts`

Features included:

- Activation events for command + chat participant.
- Chat participant registration (`aug-agent.main`).
- Provider sign-in command (`Sign in with DeepSeek`).
- Mode selection (`auto`, `quick`, `deep`).
- Streaming output with token progress.

## 8) Risks, ToS, and Graceful Degradation

### Technical and product risks

1. **Provider UI/API drift**: internal web endpoints and payload contracts can change without notice.
2. **Anti-bot hardening**: providers can enforce fingerprinting, WebAuthn checks, rotating nonces.
3. **Session expiry / MFA churn**: browser sessions may expire frequently.
4. **Cookie encryption differences**: browser DBs vary by OS/version and may store encrypted payloads.
5. **Rate limits**: free-tier burst limits can reduce reliability.

### ToS / compliance considerations

1. Web UI automation may be disallowed by some provider terms.
2. Session reuse must remain local-device only; never centralize cookie sync by default.
3. Enterprise deployment should support policy toggles to disable restricted providers.
4. Capture explicit user consent before importing cookies from local browser profiles.

### Graceful-degradation plan

1. **Capability probing** per provider at startup (`auth + healthcheck + stream test`).
2. **Automatic fallback**:
   - If browser-session auth fails, disable that provider in picker.
   - Offer “re-authenticate in embedded browser.”
3. **Mode fallback**:
   - If retrieval engine is unavailable, continue in quick mode with warning.
4. **Provider routing fallback**:
   - Keep conversation state abstract so switch from DeepSeek to another logged-in provider is seamless.
5. **Audit logging**:
   - Persist non-sensitive errors in local telemetry log to guide adapter maintenance.

## Install and Run (starter)

```bash
npm install
npm run -w @aug-agent/core typecheck
npm run -w aug-agent-vscode typecheck
```

Then launch VS Code extension host from `packages/vscode-extension`.
