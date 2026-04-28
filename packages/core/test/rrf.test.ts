import { describe, expect, it } from 'vitest';
import { reciprocalRankFusion } from '../src/retrieval/RRF.js';

const chunk = (id: string) => ({ chunk: { id, path: '', startLine: 1, endLine: 1, content: '', tokens: 1 }, score: 1, source: 'bm25' as const });

describe('RRF', () => {
  it('fuses rankings deterministically', () => {
    const out = reciprocalRankFusion([[chunk('a'), chunk('b')], [chunk('b'), chunk('c')]], [1, 1]);
    expect(out[0].chunk.id).toBe('b');
  });
});
