import { describe, expect, it } from 'vitest';
import { enforceTokenBudget } from '../src/retrieval/TokenBudget.js';

describe('token budget', () => {
  it('enforces cap', () => {
    const out = enforceTokenBudget([
      { id: 'a', path: '', startLine: 1, endLine: 1, content: '', tokens: 3 },
      { id: 'b', path: '', startLine: 1, endLine: 1, content: '', tokens: 3 },
      { id: 'c', path: '', startLine: 1, endLine: 1, content: '', tokens: 3 },
    ], { maxTokens: 6 });
    expect(out).toHaveLength(2);
  });
});
