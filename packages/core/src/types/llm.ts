export type ProviderAuthMode = 'apiKey' | 'oauthDeviceCode' | 'none';

export interface ToolCall {
  name: string;
  arguments: Record<string, unknown>;
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string;
  toolCall?: ToolCall;
}

export interface ChatCompletionRequest {
  model: string;
  messages: ChatMessage[];
  temperature?: number;
  maxTokens?: number;
  tools?: Array<{ name: string; description: string }>;
  signal?: AbortSignal;
}

export interface ChatCompletionChunk {
  delta: string;
  done: boolean;
  model: string;
}

export interface ModelDescriptor {
  id: string;
  displayName: string;
  contextWindow: number;
  supportsTools: boolean;
}

export interface ProviderAuth {
  mode: ProviderAuthMode;
  isAuthenticated: boolean;
  hint?: string;
}

export interface SecretStore {
  getSecret(service: string, account: string): Promise<string | undefined>;
  setSecret(service: string, account: string, value: string): Promise<void>;
  deleteSecret(service: string, account: string): Promise<void>;
}

export interface LLMProvider {
  id: string;
  displayName: string;
  authMode: ProviderAuthMode;
  models(): Promise<ModelDescriptor[]>;
  authStatus(): Promise<ProviderAuth>;
  healthCheck(): Promise<{ ok: boolean; message?: string }>;
  estimateTokens(input: string): number;
  complete(request: ChatCompletionRequest): Promise<ChatMessage>;
  stream(request: ChatCompletionRequest): AsyncGenerator<ChatCompletionChunk, void, void>;
}

export interface LLMProviderRegistry {
  register(provider: LLMProvider): void;
  get(providerId: string): LLMProvider | undefined;
  list(): LLMProvider[];
}
