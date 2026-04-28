# Context Engine

Pipeline:
1. Scan files with skip rules and `.agentignore`.
2. Chunk text.
3. Index BM25 + vector embeddings.
4. Retrieve and fuse with Reciprocal Rank Fusion.
5. Enforce token budget.

Fallbacks:
- If embeddings fail, use BM25-only path.
- If parsing features are unavailable, use text chunking.
