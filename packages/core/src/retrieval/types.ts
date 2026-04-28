export interface CodeChunk {
  id: string;
  path: string;
  startLine: number;
  endLine: number;
  content: string;
  tokens: number;
}

export interface RetrievalQuery {
  text: string;
  openFiles?: string[];
  recentFiles?: string[];
}

export interface RetrievalResult {
  chunk: CodeChunk;
  score: number;
  source: 'bm25' | 'vector' | 'symbol';
}

export interface ContextPack {
  query: string;
  chunks: CodeChunk[];
  tokenCount: number;
}

export interface TokenBudget {
  maxTokens: number;
}

export interface EmbeddingProvider {
  embed(text: string): Promise<number[]>;
}

export interface VectorIndex {
  upsert(chunk: CodeChunk, embedding: number[]): Promise<void>;
  query(embedding: number[], k: number): Promise<Array<{ chunkId: string; score: number }>>;
}

export interface BM25Index {
  add(chunk: CodeChunk): void;
  search(query: string, k: number): Array<{ chunkId: string; score: number }>;
}

export interface Reranker {
  rerank(results: RetrievalResult[], query: RetrievalQuery): Promise<RetrievalResult[]>;
}
