import { promises as fs } from 'node:fs';
import path from 'node:path';
import { FileScanner } from '../indexing/FileScanner.js';
import { Chunker } from './Chunker.js';
import { InMemoryBM25Index } from './BM25.js';
import { EmbeddingProvider, RetrievalQuery, ContextPack, RetrievalResult, CodeChunk, VectorIndex } from './types.js';
import { enforceTokenBudget } from './TokenBudget.js';
import { reciprocalRankFusion } from './RRF.js';

export interface ContextEngine {
  index(root: string): Promise<void>;
  retrieve(query: RetrievalQuery, budgetTokens: number): Promise<ContextPack>;
}

export class LocalContextEngine implements ContextEngine {
  private readonly bm25 = new InMemoryBM25Index();
  private readonly chunks = new Map<string, CodeChunk>();

  constructor(
    private readonly scanner: FileScanner,
    private readonly chunker: Chunker,
    private readonly embeddings: EmbeddingProvider,
    private readonly vectorIndex: VectorIndex,
  ) {}

  async index(root: string): Promise<void> {
    const files = await this.scanner.scan(root);
    for (const file of files) {
      const content = await fs.readFile(file, 'utf8');
      for (const chunk of this.chunker.chunk(path.relative(root, file), content)) {
        this.chunks.set(chunk.id, chunk);
        this.bm25.add(chunk);
        const embedding = await this.embeddings.embed(chunk.content);
        await this.vectorIndex.upsert(chunk, embedding);
      }
    }
  }

  async retrieve(query: RetrievalQuery, budgetTokens: number): Promise<ContextPack> {
    const bm = this.bm25.search(query.text, 20).map((i) => this.result(i.chunkId, i.score, 'bm25'));
    const queryEmb = await this.embeddings.embed(query.text);
    const vecRaw = await this.vectorIndex.query(queryEmb, 20);
    const ve = vecRaw.map((i) => this.result(i.chunkId, i.score, 'vector'));
    const ranked = reciprocalRankFusion([bm, ve], [1, 1]);
    const boosted = ranked.map((r) => ({ ...r, score: this.boost(r, query) })).sort((a, b) => b.score - a.score);
    const selected = enforceTokenBudget(boosted.map((b) => b.chunk), { maxTokens: budgetTokens });
    return { query: query.text, chunks: selected, tokenCount: selected.reduce((a, c) => a + c.tokens, 0) };
  }

  private result(id: string, score: number, source: 'bm25' | 'vector'): RetrievalResult {
    const chunk = this.chunks.get(id);
    if (!chunk) throw new Error(`Missing chunk: ${id}`);
    return { chunk, score, source };
  }

  private boost(item: RetrievalResult, query: RetrievalQuery): number {
    let score = item.score;
    if (query.openFiles?.includes(item.chunk.path)) score += 0.3;
    if (query.recentFiles?.includes(item.chunk.path)) score += 0.2;
    return score;
  }
}
