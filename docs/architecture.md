# System Architecture

```mermaid
flowchart TD
    UI[VS Code Chat Webview / Inline Actions] -->|User prompt + mode| ORCH[Agent Orchestrator]
    ORCH --> CLASSIFIER[Intent & Query Classifier]
    CLASSIFIER -->|skip| LLM
    CLASSIFIER -->|file-local/full| RETRIEVAL

    subgraph RETRIEVAL[Context Engine]
      IDX[Index Manager]
      BM25[Lexical BM25]
      VEC[Vector Search\nLocal Embeddings ONNX]
      GRAPH[Symbol Graph\nLSP imports/calls/types]
      RRF[Reciprocal Rank Fusion]
      BUDGET[Token Budget Enforcer]
      IDX --> BM25
      IDX --> VEC
      IDX --> GRAPH
      BM25 --> RRF
      VEC --> RRF
      GRAPH --> RRF
      RRF --> BUDGET
    end

    BUDGET --> LLM[Provider Adapter Layer]

    subgraph AUTH[Browser Session Auth]
      COOKIE[Local Cookie Extraction]
      WEBVIEW[Embedded WebView Login]
      PLAY[Playwright Persistent Session]
      KEYRING[OS Keyring Encryption\nDPAPI/Keychain/Secret Service]
      COOKIE --> KEYRING
      WEBVIEW --> KEYRING
      PLAY --> KEYRING
    end

    KEYRING --> LLM

    LLM --> STREAM[SSE Stream Parser]
    STREAM --> ORCH

    ORCH --> TOOLS[Tool Registry]
    TOOLS --> FILES[File Edit + Hunk Review]
    TOOLS --> TERM[Terminal Tool + Approval Gate]
    TOOLS --> GIT[Git + Branch + Commit + PR]
    TOOLS --> MCP[MCP Client Tools]

    ORCH --> MEMORY[.agent/memory.md Updater]
    ORCH --> METRICS[Token Meter + Retrieval Cache]

    ORCH --> UX[Response + Diff Preview + Task Checklist]
```

## Runtime Components

1. **Provider Runtime**: one adapter per provider; all implement a shared `LLMProvider` contract.
2. **Context Runtime**: incremental indexer + hybrid retrieval with strict token budgeting.
3. **Agent Runtime**: planner, tool-calling loop, approvals, and memory persistence.
4. **IDE Shells**: VS Code extension (primary), JetBrains plugin (secondary), CLI (headless).

## Data Boundaries

- **Never store raw cookies in plaintext**; encrypted blobs only in local app storage.
- **No cloud proxy required**; all browser session reuse and indexing are local-first.
- **Retrieval cache is session-scoped** by default to avoid stale context leakage.
