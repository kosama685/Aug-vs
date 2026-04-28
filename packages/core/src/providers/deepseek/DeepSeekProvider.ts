import { AuthRequiredError, ProviderError, RateLimitError } from '../../errors/providerErrors.js';
import { ChatCompletionChunk, ChatCompletionRequest, ChatMessage, LLMProvider, ModelDescriptor, SecretStore } from '../../types/llm.js';
import { DeepSeekConfig } from './DeepSeekTypes.js';
import { parseDeepSeekSse } from './DeepSeekStreamParser.js';

const SERVICE = 'aug-vs/deepseek';
const ACCOUNT = 'apiKey';

export class DeepSeekProvider implements LLMProvider {
  id = 'deepseek';
  displayName = 'DeepSeek';
  authMode = 'apiKey' as const;

  constructor(
    private readonly secrets: SecretStore,
    private readonly fetchImpl: typeof fetch,
    private readonly config: DeepSeekConfig = {
      baseUrl: 'https://api.deepseek.com',
      models: ['deepseek-chat'],
      timeoutMs: 30_000,
    },
  ) {}

  async models(): Promise<ModelDescriptor[]> {
    return this.config.models.map((m) => ({ id: m, displayName: m, contextWindow: 64000, supportsTools: true }));
  }

  async authStatus() {
    const key = await this.secrets.getSecret(SERVICE, ACCOUNT);
    return { mode: 'apiKey' as const, isAuthenticated: Boolean(key), hint: key ? undefined : 'Configure DeepSeek API key.' };
  }

  async healthCheck() {
    const auth = await this.authStatus();
    return auth.isAuthenticated ? { ok: true } : { ok: false, message: auth.hint };
  }

  estimateTokens(input: string): number {
    return Math.ceil(input.length / 4);
  }

  async complete(request: ChatCompletionRequest): Promise<ChatMessage> {
    const key = await this.requireKey();
    const response = await this.post('/chat/completions', {
      model: request.model,
      messages: request.messages,
      stream: false,
      temperature: request.temperature,
      max_tokens: request.maxTokens,
      tools: request.tools,
    }, key, request.signal);

    const json = (await response.json()) as { choices?: Array<{ message?: ChatMessage }> };
    const message = json.choices?.[0]?.message;
    if (!message) throw new ProviderError('Malformed completion response', this.id, 'BAD_RESPONSE');
    return message;
  }

  async *stream(request: ChatCompletionRequest): AsyncGenerator<ChatCompletionChunk, void, void> {
    const key = await this.requireKey();
    const response = await this.post('/chat/completions', {
      model: request.model,
      messages: request.messages,
      stream: true,
      temperature: request.temperature,
      max_tokens: request.maxTokens,
      tools: request.tools,
    }, key, request.signal);

    const raw = await response.text();
    for (const event of parseDeepSeekSse(raw)) {
      const delta = event.choices?.[0]?.delta?.content ?? '';
      const finish = event.choices?.[0]?.finish_reason;
      yield { delta, done: Boolean(finish), model: request.model };
    }
    yield { delta: '', done: true, model: request.model };
  }

  private async requireKey(): Promise<string> {
    const key = await this.secrets.getSecret(SERVICE, ACCOUNT);
    if (!key) throw new AuthRequiredError(this.id);
    return key;
  }

  private async post(path: string, body: Record<string, unknown>, key: string, signal?: AbortSignal): Promise<Response> {
    const timeoutSignal = AbortSignal.timeout(this.config.timeoutMs);
    const combined = signal ? AbortSignal.any([signal, timeoutSignal]) : timeoutSignal;
    const response = await this.fetchImpl(`${this.config.baseUrl}${path}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: combined,
    });
    if (response.status === 401) throw new AuthRequiredError(this.id);
    if (response.status === 429) throw new RateLimitError(this.id, 1000);
    if (!response.ok) throw new ProviderError(`DeepSeek request failed: ${response.status}`, this.id, 'HTTP_ERROR');
    return response;
  }
}
