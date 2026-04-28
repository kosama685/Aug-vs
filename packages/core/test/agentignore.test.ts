import { describe, expect, it } from 'vitest';
import { AgentIgnoreMatcher } from '../src/indexing/IgnoreMatcher.js';

describe('.agentignore', () => {
  it('matches ignored paths', () => {
    const matcher = new AgentIgnoreMatcher(['node_modules/**', '*.lock']);
    expect(matcher.shouldIgnore('node_modules/x/index.js')).toBe(true);
    expect(matcher.shouldIgnore('pnpm.lock')).toBe(true);
  });
});
