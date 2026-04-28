import { describe, expect, it } from 'vitest';
import { RuleBasedQueryClassifier } from '../src/agent/QueryClassifier.js';

describe('query classifier', () => {
  it('detects intents', async () => {
    const c = new RuleBasedQueryClassifier();
    expect((await c.classify('hello')).intent).toBe('NO_RETRIEVAL');
    expect((await c.classify('Explain this function')).intent).toBe('FILE_LOCAL');
    expect((await c.classify('Where is AuthService used?')).intent).toBe('SYMBOL_LOCAL');
    expect((await c.classify('Check latest API docs')).intent).toBe('DOCS_OR_WEB');
  });
});
