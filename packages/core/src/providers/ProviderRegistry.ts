import { LLMProvider, LLMProviderRegistry } from '../types/llm.js';

export class ProviderRegistry implements LLMProviderRegistry {
  private readonly providers = new Map<string, LLMProvider>();

  register(provider: LLMProvider): void {
    this.providers.set(provider.id, provider);
  }

  get(providerId: string): LLMProvider | undefined {
    return this.providers.get(providerId);
  }

  list(): LLMProvider[] {
    return [...this.providers.values()];
  }
}
