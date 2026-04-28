export function greet(name: string): string {
  return `Hello, ${name}!`;
}

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;
  describe('greet', () => {
    it('returns a friendly message', () => {
      expect(greet('Aug VS')).toBe('Hello, Aug VS!');
    });
  });
}
