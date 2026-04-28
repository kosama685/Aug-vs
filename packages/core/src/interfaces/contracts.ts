import type { ChatMessage, ProviderId, RetrievedContext, StreamDelta, TokenUsage } from "../types/common.js";

export interface BrowserSessionAuth {
  provider: ProviderId;
  signInWithEmbeddedWebView(): Promise<void>;
  importFromLocalBrowser(profilePath?: string): Promise<void>;
  ensureAuthenticated(): Promise<boolean>;
  getAuthHeaders(): Promise<Record<string, string>>;
  clear(): Promise<void>;
}

export interface LLMProvider {
  id: ProviderId;
  displayName: string;
  supportsModel(model: string): boolean;
  listAvailableModels(): Promise<string[]>;
  streamCompletion(input: {
    model: string;
    messages: ChatMessage[];
    conversationId?: string;
    signal?: AbortSignal;
  }): AsyncGenerator<StreamDelta, { usage: TokenUsage; conversationId?: string }, void>;
}

export interface RetrievalStrategy {
  name: "bm25" | "vector" | "graph";
  search(query: string, options: { topK: number; scopePaths?: string[] }): Promise<RetrievedContext[]>;
}

export interface ContextEngine {
  buildOrLoad(): Promise<void>;
  onFilesChanged(paths: string[]): Promise<void>;
  retrieve(query: string, options: RetrievalRequest): Promise<RetrievedContext[]>;
  estimateTokenUsage(context: RetrievedContext[]): number;
}

export interface RetrievalRequest {
  mode: "off" | "file-local" | "full";
  activeFilePath?: string;
  tokenBudget: number;
  topK: number;
}

export interface QueryClassifier {
  classify(input: {
    prompt: string;
    activeFilePath?: string;
    selectedCode?: string;
  }): Promise<{ mode: RetrievalRequest["mode"]; reason: string }>;
}

export interface ToolRegistry {
  listToolSchemas(): Array<{ name: string; description: string; inputSchema: object }>;
  execute(name: string, args: Record<string, unknown>): Promise<string>;
}

export interface AgentLoop {
  runTurn(input: {
    provider: LLMProvider;
    model: string;
    messages: ChatMessage[];
    retrievalToggle: "quick" | "deep" | "auto";
    activeFilePath?: string;
    selectedCode?: string;
    signal?: AbortSignal;
  }): AsyncGenerator<StreamDelta, { usage: TokenUsage }, void>;
}
