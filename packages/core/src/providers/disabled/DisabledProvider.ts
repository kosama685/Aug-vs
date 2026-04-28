import { AuthRequiredError } from '../../errors/providerErrors.js';
import { ChatCompletionRequest, ChatCompletionChunk, ChatMessage, LLMProvider, ModelDescriptor } from '../../types/llm.js';

export class DisabledProvider implements LLMProvider {
  constructor(
    public readonly id: string,
    public readonly displayName: string,
    private readonly reason: string,
  ) {}

  authMode = 'none' as const;

  async models(): Promise<ModelDescriptor[]> {
    return [];
  }

  async authStatus() {
    return { mode: 'none' as const, isAuthenticated: false, hint: this.reason };
  }

  async healthCheck() {
    return { ok: false, message: this.reason };
  }

  estimateTokens(input: string): number {
    return Math.ceil(input.length / 4);
  }

  async complete(_request: ChatCompletionRequest): Promise<ChatMessage> {
    throw new AuthRequiredError(this.id);
  }

  async *stream(_request: ChatCompletionRequest): AsyncGenerator<ChatCompletionChunk, void, void> {
    throw new AuthRequiredError(this.id);
  }
}
