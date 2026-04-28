import type { FileChunk, RetrievedContext } from "../types/common.js";
import type { RetrievalStrategy } from "../interfaces/contracts.js";

export interface EmbeddingModel {
  embed(text: string): Promise<number[]>;
}

function cosine(a: number[], b: number[]): number {
  let dot = 0;
  let na = 0;
  let nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  return dot / (Math.sqrt(na) * Math.sqrt(nb) || 1);
}

export class HashEmbeddingModel implements EmbeddingModel {
  async embed(text: string): Promise<number[]> {
    const dims = 256;
    const vec = new Array<number>(dims).fill(0);
    for (const [i, ch] of Array.from(text).entries()) {
      vec[(ch.charCodeAt(0) + i) % dims] += 1;
    }
    return vec;
  }
}

export class EmbeddingStrategy implements RetrievalStrategy {
  readonly name = "vector" as const;
  private readonly embeddings = new Map<string, number[]>();

  constructor(
    private readonly chunks: FileChunk[],
    private readonly model: EmbeddingModel,
  ) {}

  async preload(): Promise<void> {
    for (const chunk of this.chunks) {
      this.embeddings.set(chunk.id, await this.model.embed(chunk.text));
    }
  }

  async refreshChunk(chunk: FileChunk): Promise<void> {
    this.embeddings.set(chunk.id, await this.model.embed(chunk.text));
  }

  async search(query: string, options: { topK: number; scopePaths?: string[] }): Promise<RetrievedContext[]> {
    const queryEmbedding = await this.model.embed(query);
    const corpus = options.scopePaths?.length
      ? this.chunks.filter((chunk) => options.scopePaths?.includes(chunk.path))
      : this.chunks;

    const scored = await Promise.all(
      corpus.map(async (chunk) => {
        const embedding = this.embeddings.get(chunk.id) ?? (await this.model.embed(chunk.text));
        this.embeddings.set(chunk.id, embedding);
        return {
          chunk,
          score: cosine(queryEmbedding, embedding),
          source: "vector",
          tokenEstimate: Math.ceil(chunk.text.length / 4),
        } satisfies RetrievedContext;
      }),
    );

    return scored.sort((a, b) => b.score - a.score).slice(0, options.topK);
  }
}
