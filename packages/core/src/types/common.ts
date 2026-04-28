export type ProviderId =
  | "chatgpt"
  | "claude"
  | "deepseek"
  | "qwen"
  | "gemini"
  | "grok"
  | "lechat"
  | "kimi";

export interface TokenUsage {
  promptTokens: number;
  completionTokens: number;
  retrievalTokens: number;
  totalTokens: number;
}

export interface ChatMessage {
  role: "system" | "user" | "assistant" | "tool";
  content: string;
  name?: string;
}

export interface StreamDelta {
  type: "text" | "tool_call" | "usage" | "done";
  text?: string;
  usage?: Partial<TokenUsage>;
  toolCall?: {
    name: string;
    arguments: Record<string, unknown>;
  };
}

export interface FileChunk {
  id: string;
  path: string;
  language: string;
  startLine: number;
  endLine: number;
  text: string;
  hash: string;
}

export interface RetrievedContext {
  chunk: FileChunk;
  score: number;
  source: "bm25" | "vector" | "graph" | "rrf";
  tokenEstimate: number;
}
