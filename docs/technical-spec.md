# Technical Specification

## Goals
Deliver a secure-by-default coding agent platform with modular core runtime reused across IDE and CLI hosts.

## Non-goals
- Unsupported auth bypass techniques.
- Browser-session scraping.

## Core modules
- Providers
- Retrieval engine
- Query classifier
- Agent loop
- Tools and approvals
- Memory
- MCP integration

## Reliability requirements
- Typed structured errors.
- Graceful degradation for auth/indexing/embedding failures.
- Cancellation support through AbortSignal.

## Extensibility
- Register new providers through `LLMProvider` interface.
- Register new tools through `ToolRegistry`.
- Swap retrieval components via interfaces.
