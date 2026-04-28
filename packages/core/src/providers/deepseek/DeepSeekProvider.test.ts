import { describe, expect, it, vi } from 'vitest';
import { DeepSeekProvider } from './DeepSeekProvider.js';

const secrets = {
  getSecret: vi.fn(async () => 'test-key'),
  setSecret: vi.fn(),
  deleteSecret: vi.fn(),
};

describe('DeepSeekProvider', () => {
  it('maps stream chunks', async () => {
    const fetchImpl = vi.fn(async () =>
      new Response('data: {"choices":[{"delta":{"content":"hello"},"finish_reason":null}]}\n\ndata: [DONE]\n\n', { status: 200 }),
    );
    const provider = new DeepSeekProvider(secrets, fetchImpl as unknown as typeof fetch);
    const chunks: string[] = [];
    for await (const c of provider.stream({ model: 'deepseek-chat', messages: [{ role: 'user', content: 'hi' }] })) chunks.push(c.delta);
    expect(chunks.join('')).toContain('hello');
  });

  it('returns completion message', async () => {
    const fetchImpl = vi.fn(async () =>
      new Response(JSON.stringify({ choices: [{ message: { role: 'assistant', content: 'ok' } }] }), { status: 200 }),
    );
    const provider = new DeepSeekProvider(secrets, fetchImpl as unknown as typeof fetch);
    const res = await provider.complete({ model: 'deepseek-chat', messages: [{ role: 'user', content: 'hi' }] });
    expect(res.content).toBe('ok');
  });
});
