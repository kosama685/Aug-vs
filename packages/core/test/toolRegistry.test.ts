import { describe, expect, it } from 'vitest';
import { InMemoryToolRegistry } from '../src/tools/ToolRegistry.js';

describe('tool registry', () => {
  it('registers tool', () => {
    const reg = new InMemoryToolRegistry();
    reg.register({ name: 'x', description: 'x', run: async () => ({ ok: true }) });
    expect(reg.get('x')).toBeDefined();
  });
});
