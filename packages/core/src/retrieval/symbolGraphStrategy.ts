import type { FileChunk, RetrievedContext } from "../types/common.js";
import type { RetrievalStrategy } from "../interfaces/contracts.js";
import { tokenize } from "./tokenizer.js";

export interface SymbolEdge {
  fromChunkId: string;
  symbol: string;
  weight: number;
}

export class SymbolGraphStrategy implements RetrievalStrategy {
  readonly name = "graph" as const;

  constructor(
    private readonly chunks: FileChunk[],
    private readonly edges: SymbolEdge[],
  ) {}

  async search(query: string, options: { topK: number; scopePaths?: string[] }): Promise<RetrievedContext[]> {
    const terms = new Set(tokenize(query));
    const byChunk = new Map<string, number>();

    for (const edge of this.edges) {
      if (terms.has(edge.symbol.toLowerCase())) {
        byChunk.set(edge.fromChunkId, (byChunk.get(edge.fromChunkId) ?? 0) + edge.weight);
      }
    }

    const allowed = new Set(options.scopePaths ?? this.chunks.map((c) => c.path));

    return this.chunks
      .filter((chunk) => allowed.has(chunk.path))
      .map((chunk) => ({
        chunk,
        score: byChunk.get(chunk.id) ?? 0,
        source: "graph",
        tokenEstimate: Math.ceil(chunk.text.length / 4),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, options.topK);
  }
}
