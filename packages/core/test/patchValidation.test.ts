import { describe, expect, it } from 'vitest';
import { PatchApplicator } from '../src/tools/PatchApplicator.js';

describe('patch validation', () => {
  it('validates unified diff', () => {
    const p = new PatchApplicator();
    const diff = ['--- a/a.ts', '+++ b/a.ts', '@@ -1 +1 @@', '-old', '+new'].join('\n');
    expect(p.validateUnifiedDiff(diff).valid).toBe(true);
  });
});
