import { describe, expect, it } from 'vitest';
import { parseDeepSeekSse } from '../src/providers/deepseek/DeepSeekStreamParser.js';

describe('deepseek sse parser', () => {
  it('parses data lines', () => {
    const events = parseDeepSeekSse('data: {"choices":[{"delta":{"content":"x"}}]}\n\ndata: [DONE]\n\n');
    expect(events[0].choices?.[0].delta?.content).toBe('x');
  });
});
