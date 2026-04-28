# Web-Based VS Code-like AI IDE Prompt (No Login/Register)

Use the following prompt as a reusable specification when generating a production-ready, open-source, web-based AI coding IDE with agentic workflows.

```text
You are Codex acting as a principal software architect, senior TypeScript engineer, full-stack web IDE engineer, retrieval-systems engineer, AI agent engineer, and open-source maintainer.

Build a complete, production-quality, open-source, web-based AI coding IDE that feels similar to VS Code and includes an agentic coding assistant built in.

The project must be concrete, secure by default, legally compliant, easy to develop further, and suitable for a real open-source GitHub repository.

The app must NOT require user login or registration.

IMPORTANT AUTHENTICATION REQUIREMENT

The product itself must have:
- No login page
- No registration page
- No user accounts
- No backend user identity system
- No paid SaaS account requirement
- No mandatory cloud authentication

The app should work immediately after installation using:
- Local mock provider for development and tests
- Local models through Ollama where available
- Optional bring-your-own API key for official providers
- Optional provider configuration stored locally

Cloud provider API keys are allowed only as optional configuration.
Do not require users to create an account inside this app.

IMPORTANT SAFETY AND COMPLIANCE RULES

Do not implement or recommend:
- Browser cookie extraction from Chrome, Edge, Firefox, Safari, or any local browser profile
- Reuse of logged-in provider web sessions without explicit supported authorization
- Automation of provider web UIs to bypass official APIs, billing, rate limits, captchas, CSRF protections, or anti-bot systems
- Reverse engineering private/internal chat endpoints
- Header rotation, CSRF bypass, request-signing bypass, or anti-bot evasion
- Free-tier abuse or any method intended to avoid normal provider access controls

Instead, design the system with provider-compliant authentication:
- Official API token flow where available
- OAuth or device-code flow only when officially supported
- Local-only providers through Ollama, llama.cpp, or ONNX models
- Bring-your-own-key support as optional, not mandatory
- Secure local secret storage where possible
- Graceful degradation when no provider is configured

If a provider cannot be integrated safely:
- Implement a disabled provider adapter
- Show clear UI messaging explaining why it is disabled
- Document the reason
- Keep a clean interface so official support can be added later

PROJECT GOAL

Create an open-source browser-based AI coding IDE with:

1. Web app similar to VS Code
2. Monaco Editor-based code editing
3. File explorer
4. Tabs
5. Terminal panel
6. Git panel
7. Search panel
8. Agent chat panel
9. Agentic coding workflow
10. Local workspace/project loading
11. Shared TypeScript core package
12. CLI package for terminal usage
13. Optional VS Code extension scaffold
14. Optional JetBrains plugin scaffold
15. Token-efficient local context engine
16. Multi-provider model abstraction
17. Safe tool execution with approval gates
18. Production README, docs, examples, tests, and CI

The final result must be a complete monorepo with real code, not just explanations.

TECH STACK

Use:

- TypeScript
- Node.js 20+
- pnpm workspaces
- Vite
- React
- Monaco Editor
- xterm.js for terminal UI
- Express or Fastify backend
- WebSocket transport for terminal and agent events
- tsup for package builds
- Vitest for tests
- ESLint
- Prettier
- Strict TypeScript
- Mermaid diagrams in documentation
- GitHub Actions CI

REPOSITORY STRUCTURE

Use this monorepo structure:

- apps/web
  - Browser IDE frontend
  - Monaco editor
  - Agent chat UI
  - File explorer
  - Terminal panel
  - Git panel
  - Settings UI
  - Diff preview UI

- apps/server
  - Local backend server
  - Workspace file APIs
  - Terminal process management
  - Git APIs
  - Agent runtime host
  - WebSocket event transport
  - Secure provider configuration storage

- packages/core
  - Provider abstraction
  - Retrieval engine
  - Query classifier
  - Agent loop
  - Tool registry
  - Memory system
  - MCP abstraction
  - Config loading

- packages/cli
  - Terminal CLI
  - agent chat
  - agent ask
  - agent edit
  - agent index
  - agent providers list
  - agent config init
  - agent memory show
  - agent tools list

- extensions/vscode
  - Optional VS Code extension scaffold

- plugins/jetbrains
  - Optional JetBrains plugin scaffold

- docs
  - Architecture, security, providers, agent loop, tools, CLI, web IDE, MCP, configuration

- examples
  - Example .agent/config.json
  - Example .agentignore
  - Example projects

- .github/workflows
  - CI for build, test, lint, typecheck

DELIVERABLES

Create actual files for:

1. Technical specification
2. Architecture diagram
3. Monorepo directory structure
4. Web IDE frontend
5. Local backend server
6. Core TypeScript interfaces
7. Provider abstraction
8. Mock provider
9. Safe reference provider adapter
10. Retrieval pipeline
11. Query classifier
12. Agent loop
13. Tool registry
14. File editing tool with diff preview
15. Terminal tool with approval gate
16. Git tool wrapper
17. Memory system
18. MCP client abstraction
19. CLI scaffold
20. Optional VS Code extension scaffold
21. Optional JetBrains plugin scaffold
22. Tests
23. README
24. Configuration examples
25. Security and compliance documentation
26. Developer setup guide
27. Installation guide
28. Usage examples

CORE PRODUCT REQUIREMENTS

A. WEB-BASED VS CODE-LIKE IDE

Build a web IDE with:

- Monaco Editor
- Multi-file tabs
- File tree sidebar
- Open, create, rename, delete files
- Save files
- Search files
- Command palette
- Bottom panel
- Integrated terminal
- Git status panel
- Diff viewer
- Agent chat sidebar
- Settings panel
- Provider selector
- Model selector
- Token budget meter
- Context files list
- Plan checklist
- Tool approval prompts
- Light and dark themes
- Keyboard shortcuts similar to VS Code where practical

The app must run locally with:

pnpm install
pnpm dev

The local server should serve the web app and expose safe APIs for workspace operations.

B. NO LOGIN / NO REGISTER UX

Do not create:

- Login page
- Register page
- Forgot password page
- Session cookies for user auth
- User database
- Account management UI

Instead create:

- First-run local setup screen
- Provider configuration screen
- Local model setup instructions
- Optional API key input stored locally
- Mock provider enabled by default
- Ollama provider option when available

The app should be usable immediately with the mock provider and sample workspace.

C. MULTI-PROVIDER LLM ARCHITECTURE

Design a provider system that supports:

- Mock provider for tests and no-auth local usage
- Ollama local provider
- OpenAI through official API key
- Anthropic Claude through official API key
- Google Gemini through official API key
- DeepSeek through official API-style integration
- Mistral through official API key
- Future providers through plugin adapters

Provider abstraction must include:

- Provider ID
- Display name
- Supported models
- Authentication status
- Token counting estimate
- Streaming completion
- Non-streaming completion
- Tool-call support capability flag
- Context-window metadata
- Rate-limit error handling
- Retry policy
- Cancellation support
- Health check
- Secure config validation

Create these TypeScript interfaces:

- LLMProvider
- LLMProviderRegistry
- ProviderAuth
- SecretStore
- ChatCompletionRequest
- ChatCompletionChunk
- ChatMessage
- ToolCall
- ModelDescriptor
- ProviderError
- RateLimitError
- AuthRequiredError

Authentication must support:

- No auth for mock provider
- No auth for local Ollama provider
- Optional API key stored locally
- Optional OAuth/device-code style flow only when officially supported
- Graceful unavailable state for unsupported providers

Do not implement cookie extraction, browser-session scraping, or private endpoint automation.

D. REFERENCE PROVIDER ADAPTER

Implement one complete safe reference adapter.

Use DeepSeek only through official API-compatible HTTP integration or a generic OpenAI-compatible API adapter.

The adapter must include:

- Secure credential loading from SecretStore
- Model list configuration
- Streaming Server-Sent Events parser
- JSON request construction
- Error mapping
- Rate-limit handling
- Timeout and cancellation
- Unit tests with mocked HTTP responses
- No private endpoint usage
- No browser cookies
- No anti-bot bypass

Create:

- packages/core/src/providers/deepseek/DeepSeekProvider.ts
- packages/core/src/providers/deepseek/DeepSeekTypes.ts
- packages/core/src/providers/deepseek/DeepSeekStreamParser.ts
- packages/core/src/providers/deepseek/DeepSeekProvider.test.ts

E. TOKEN-EFFICIENT CONTEXT ENGINE

Build a local context engine that avoids wasting tokens.

Implement:

1. Workspace scanner
2. .agentignore parser
3. File eligibility filter
4. Chunker
5. Tree-sitter-ready parser abstraction
6. Symbol graph abstraction
7. BM25 index
8. Vector index interface
9. Local embeddings provider interface
10. Mock embeddings provider
11. In-memory vector index
12. Reciprocal Rank Fusion
13. Reranking stage
14. Token budget enforcement
15. Context pack builder
16. Incremental reindexing on file change
17. Retrieval result cache

Indexing rules:

- Skip node_modules
- Skip .git
- Skip .venv
- Skip dist
- Skip build
- Skip vendor
- Skip generated files
- Skip lockfiles unless explicitly requested
- Skip binary files
- Skip files larger than 500KB by default
- Respect .gitignore and .agentignore
- Allow override in .agentignore and config

Retrieval signals:

- BM25 lexical search
- Vector semantic search
- Symbol graph search
- Import references
- Call references
- Type references
- Currently open file boost
- Recently edited file boost

Fusion:

- Implement Reciprocal Rank Fusion
- Make weights configurable
- Deduplicate chunks
- Rerank top K
- Enforce hard token budget before sending context to LLM

Default retrieval budget:

- 8,000 tokens

Create these TypeScript interfaces:

- ContextEngine
- WorkspaceIndexer
- FileScanner
- IgnoreMatcher
- Chunker
- CodeChunk
- EmbeddingProvider
- VectorIndex
- BM25Index
- SymbolGraph
- RetrievalStrategy
- RetrievalQuery
- RetrievalResult
- ContextPack
- TokenBudget
- Reranker

F. QUERY CLASSIFIER

Implement an intent-aware query classifier so the agent does not always search the full codebase.

Classifier categories:

1. NO_RETRIEVAL
2. FILE_LOCAL
3. SYMBOL_LOCAL
4. FULL_RETRIEVAL
5. DOCS_OR_WEB

For DOCS_OR_WEB:

- Do not browse automatically unless the runtime has an approved web tool
- Return a structured request that the host can satisfy

Implement:

- Rule-based classifier first
- Optional local LLM classifier fallback
- Few-shot prompt template for fallback
- Confidence score
- Explanation string
- Tests for classification behavior

G. AGENT LOOP

Implement a multi-step coding-agent loop with planning, approvals, retrieval orchestration, patch flow, command execution, and summarization.

H. TOOLS

Implement safe tool abstractions including:

- retrieve_context
- read_file
- write_patch (with approval)
- terminal (with approval and destructive-command protections)
- git_* tools
- memory_* tools
- mcp_call

I. WEB IDE FRONTEND

Implement apps/web with VS Code-inspired layout, Monaco editor, tabs, explorer, agent chat, terminal panel, git panel, diff panel, settings, provider selector, and state/api modules.

J. LOCAL BACKEND SERVER

Implement apps/server with localhost defaults, path traversal protections, workspace-root restrictions, WebSocket event streaming, terminal safety gates, and config/provider APIs.

K. CLI

Implement packages/cli with:

- agent chat
- agent index
- agent ask
- agent edit
- agent providers list/configure
- agent config init
- agent memory show
- agent tools list

L. OPTIONAL VS CODE EXTENSION SCAFFOLD
M. OPTIONAL JETBRAINS PLUGIN SCAFFOLD
N. MEMORY SYSTEM
O. CONFIGURATION
P. DOCUMENTATION
Q. README
R. TESTING
S. SECURITY AND RISK DOCUMENT
T. GRACEFUL DEGRADATION
U. ACCEPTANCE CRITERIA

IMPLEMENTATION ORDER

Follow the numbered implementation order from repository inspection through final verification and summary.

CODING STYLE

- Keep `packages/core` framework-agnostic.
- Use strict typing and explicit interfaces.
- Avoid `any`.
- Avoid logging secrets.
- Respect `.gitignore` and `.agentignore`.

FINAL RESPONSE FORMAT

When finished, include:

1. Summary of what was created
2. File tree
3. Commands run and results
4. Key architecture decisions
5. Security/compliance notes
6. How to install and run
7. How to test
8. Known limitations
9. Next development steps

Do not claim unavailable provider integrations are complete.
Do not claim browser-session auth works.
Do not include unsafe implementation details.
Do not include login or registration flows.
```
