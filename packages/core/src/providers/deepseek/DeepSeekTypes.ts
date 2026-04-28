export interface DeepSeekConfig {
  baseUrl: string;
  models: string[];
  timeoutMs: number;
}

export interface DeepSeekChatChoiceDelta {
  content?: string;
}

export interface DeepSeekStreamEvent {
  choices?: Array<{ delta?: DeepSeekChatChoiceDelta; finish_reason?: string | null }>;
}
