import { describe, expect, it } from 'vitest';
import { InMemoryBM25Index } from '../src/retrieval/BM25.js';

describe('BM25', () => {
  it('finds lexical match', () => {
    const index = new InMemoryBM25Index();
    index.add({ id: '1', path: 'a.ts', startLine: 1, endLine: 1, content: 'auth service login token', tokens: 4 });
    index.add({ id: '2', path: 'b.ts', startLine: 1, endLine: 1, content: 'payment invoice', tokens: 2 });
    expect(index.search('auth token', 1)[0]?.chunkId).toBe('1');
  });
});
