import { CodeChunk, VectorIndex } from './types.js';

export class InMemoryVectorIndex implements VectorIndex {
  private readonly vectors = new Map<string, number[]>();

  async upsert(chunk: CodeChunk, embedding: number[]): Promise<void> {
    this.vectors.set(chunk.id, embedding);
  }

  async query(embedding: number[], k: number): Promise<Array<{ chunkId: string; score: number }>> {
    return [...this.vectors.entries()]
      .map(([chunkId, vector]) => ({ chunkId, score: cosine(embedding, vector) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, k);
  }
}

function cosine(a: number[], b: number[]): number {
  const n = Math.min(a.length, b.length);
  let dot = 0;
  let an = 0;
  let bn = 0;
  for (let i = 0; i < n; i += 1) {
    dot += a[i] * b[i];
    an += a[i] * a[i];
    bn += b[i] * b[i];
  }
  return an === 0 || bn === 0 ? 0 : dot / (Math.sqrt(an) * Math.sqrt(bn));
}
