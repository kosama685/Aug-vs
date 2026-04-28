import { LLMProvider, ChatCompletionRequest, ChatCompletionChunk, ChatMessage, ModelDescriptor } from '../../types/llm.js';

export class MockProvider implements LLMProvider {
  id = 'mock';
  displayName = 'Mock Provider';
  authMode = 'none' as const;

  async models(): Promise<ModelDescriptor[]> {
    return [{ id: 'mock-coder-v1', displayName: 'Mock Coder v1', contextWindow: 32000, supportsTools: true }];
  }

  async authStatus() {
    return { mode: 'none' as const, isAuthenticated: true };
  }

  async healthCheck() {
    return { ok: true };
  }

  estimateTokens(input: string): number {
    return Math.ceil(input.length / 4);
  }

  async complete(request: ChatCompletionRequest): Promise<ChatMessage> {
    const last = request.messages[request.messages.length - 1];
    return { role: 'assistant', content: `Mock response: ${last?.content ?? ''}` };
  }

  async *stream(request: ChatCompletionRequest): AsyncGenerator<ChatCompletionChunk, void, void> {
    const text = (await this.complete(request)).content;
    for (const word of text.split(' ')) {
      yield { delta: `${word} `, done: false, model: request.model };
    }
    yield { delta: '', done: true, model: request.model };
  }
}
