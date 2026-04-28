import { describe, expect, it } from 'vitest';
import { TerminalSafetyPolicy } from '../src/tools/TerminalSafetyPolicy.js';

describe('terminal safety', () => {
  it('blocks dangerous commands', () => {
    const p = new TerminalSafetyPolicy();
    expect(p.evaluate('rm -rf /').allowed).toBe(false);
    expect(p.evaluate('pnpm add x').requiresApproval).toBe(true);
  });
});
