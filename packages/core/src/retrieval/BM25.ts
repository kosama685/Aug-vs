import { BM25Index, CodeChunk } from './types.js';

export class InMemoryBM25Index implements BM25Index {
  private readonly chunks = new Map<string, CodeChunk>();
  private readonly terms = new Map<string, Map<string, number>>();

  add(chunk: CodeChunk): void {
    this.chunks.set(chunk.id, chunk);
    const words = tokenize(chunk.content);
    const freq = new Map<string, number>();
    for (const w of words) freq.set(w, (freq.get(w) ?? 0) + 1);
    freq.forEach((count, term) => {
      if (!this.terms.has(term)) this.terms.set(term, new Map());
      this.terms.get(term)?.set(chunk.id, count);
    });
  }

  search(query: string, k: number): Array<{ chunkId: string; score: number }> {
    const scores = new Map<string, number>();
    const queryTerms = tokenize(query);
    for (const term of queryTerms) {
      const postings = this.terms.get(term);
      if (!postings) continue;
      for (const [id, tf] of postings.entries()) scores.set(id, (scores.get(id) ?? 0) + tf);
    }
    return [...scores.entries()].map(([chunkId, score]) => ({ chunkId, score })).sort((a, b) => b.score - a.score).slice(0, k);
  }
}

const tokenize = (text: string): string[] => text.toLowerCase().split(/[^a-z0-9_]+/).filter(Boolean);
