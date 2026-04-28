import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import fg from "fast-glob";
import type { ContextEngine, RetrievalRequest } from "../interfaces/contracts.js";
import type { FileChunk, RetrievedContext } from "../types/common.js";
import { BM25Strategy } from "./bm25Strategy.js";
import { EmbeddingStrategy, HashEmbeddingModel } from "./embeddingStrategy.js";
import { SymbolGraphStrategy, type SymbolEdge } from "./symbolGraphStrategy.js";
import { estimateTokens } from "./tokenizer.js";

function chunkText(filePath: string, content: string): FileChunk[] {
  const lines = content.split("\n");
  const chunkSize = 80;
  const chunks: FileChunk[] = [];

  for (let i = 0; i < lines.length; i += chunkSize) {
    const text = lines.slice(i, i + chunkSize).join("\n");
    const id = crypto.createHash("sha1").update(`${filePath}:${i}:${text}`).digest("hex");
    chunks.push({
      id,
      path: filePath,
      language: path.extname(filePath).slice(1),
      startLine: i + 1,
      endLine: Math.min(lines.length, i + chunkSize),
      text,
      hash: crypto.createHash("sha1").update(text).digest("hex"),
    });
  }

  return chunks;
}

function rrfMerge(resultSets: RetrievedContext[][], k = 60): RetrievedContext[] {
  const scores = new Map<string, { hit: RetrievedContext; score: number }>();
  for (const set of resultSets) {
    set.forEach((item, index) => {
      const current = scores.get(item.chunk.id) ?? { hit: item, score: 0 };
      current.score += 1 / (k + index + 1);
      current.hit = { ...item, source: "rrf" };
      scores.set(item.chunk.id, current);
    });
  }

  return [...scores.values()]
    .map(({ hit, score }) => ({ ...hit, score }))
    .sort((a, b) => b.score - a.score);
}

export class HybridContextEngine implements ContextEngine {
  private chunks: FileChunk[] = [];
  private symbolEdges: SymbolEdge[] = [];
  private bm25 = new BM25Strategy([]);
  private vectors = new EmbeddingStrategy([], new HashEmbeddingModel());
  private graph = new SymbolGraphStrategy([], []);
  private retrievalCache = new Map<string, RetrievedContext[]>();

  constructor(private readonly workspaceRoot: string) {}

  async buildOrLoad(): Promise<void> {
    const files = await fg(["**/*"], {
      cwd: this.workspaceRoot,
      absolute: true,
      onlyFiles: true,
      ignore: [
        "**/node_modules/**",
        "**/.venv/**",
        "**/dist/**",
        "**/build/**",
        "**/vendor/**",
        "**/.git/**",
        "**/*.lock",
        "**/package-lock.json",
        "**/pnpm-lock.yaml",
      ],
    });

    const nextChunks: FileChunk[] = [];
    for (const absPath of files) {
      const stat = await fs.stat(absPath);
      if (stat.size > 500 * 1024) continue;
      const content = await fs.readFile(absPath, "utf8").catch(() => "");
      if (!content.trim()) continue;
      nextChunks.push(...chunkText(path.relative(this.workspaceRoot, absPath), content));
    }

    this.chunks = nextChunks;
    this.symbolEdges = this.inferSymbolEdges(nextChunks);
    this.bm25 = new BM25Strategy(this.chunks);
    this.vectors = new EmbeddingStrategy(this.chunks, new HashEmbeddingModel());
    await this.vectors.preload();
    this.graph = new SymbolGraphStrategy(this.chunks, this.symbolEdges);
    this.retrievalCache.clear();
  }

  async onFilesChanged(pathsChanged: string[]): Promise<void> {
    const changedSet = new Set(pathsChanged.map((p) => p.replace(/\\/g, "/")));
    this.chunks = this.chunks.filter((c) => !changedSet.has(c.path));

    for (const relPath of changedSet) {
      const absPath = path.join(this.workspaceRoot, relPath);
      const stat = await fs.stat(absPath).catch(() => null);
      if (!stat || stat.size > 500 * 1024) continue;
      const content = await fs.readFile(absPath, "utf8").catch(() => "");
      const chunks = chunkText(relPath, content);
      this.chunks.push(...chunks);
      await Promise.all(chunks.map((chunk) => this.vectors.refreshChunk(chunk)));
    }

    this.symbolEdges = this.inferSymbolEdges(this.chunks);
    this.bm25 = new BM25Strategy(this.chunks);
    this.graph = new SymbolGraphStrategy(this.chunks, this.symbolEdges);
    this.retrievalCache.clear();
  }

  async retrieve(query: string, options: RetrievalRequest): Promise<RetrievedContext[]> {
    if (options.mode === "off") {
      return [];
    }

    const cacheKey = JSON.stringify({ query, options });
    if (this.retrievalCache.has(cacheKey)) {
      return this.retrievalCache.get(cacheKey) ?? [];
    }

    const scopePaths = options.mode === "file-local" && options.activeFilePath ? [options.activeFilePath] : undefined;

    const [lexical, semantic, graph] = await Promise.all([
      this.bm25.search(query, { topK: options.topK, scopePaths }),
      this.vectors.search(query, { topK: options.topK, scopePaths }),
      this.graph.search(query, { topK: options.topK, scopePaths }),
    ]);

    const fused = rrfMerge([lexical, semantic, graph]);
    const budgeted: RetrievedContext[] = [];
    let tokenCount = 0;

    for (const hit of fused) {
      if (tokenCount + hit.tokenEstimate > options.tokenBudget) {
        break;
      }
      budgeted.push(hit);
      tokenCount += hit.tokenEstimate;
    }

    this.retrievalCache.set(cacheKey, budgeted);
    return budgeted;
  }

  estimateTokenUsage(context: RetrievedContext[]): number {
    return context.reduce((acc, c) => acc + estimateTokens(c.chunk.text), 0);
  }

  private inferSymbolEdges(chunks: FileChunk[]): SymbolEdge[] {
    const edges: SymbolEdge[] = [];
    const symbolPattern = /(?:import|from|class|function|type|interface)\s+([A-Za-z0-9_]+)/g;
    for (const chunk of chunks) {
      for (const match of chunk.text.matchAll(symbolPattern)) {
        edges.push({
          fromChunkId: chunk.id,
          symbol: match[1],
          weight: 1,
        });
      }
    }
    return edges;
  }
}
