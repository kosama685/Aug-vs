import { describe, expect, it } from 'vitest';
import { sanitizeMemory } from '../src/memory/MemoryStore.js';

describe('memory sanitization', () => {
  it('redacts secrets', () => {
    expect(sanitizeMemory('apiKey: abc123')).toContain('[REDACTED]');
  });
});
