import crypto from "node:crypto";
import type { ChatMessage, StreamDelta, TokenUsage } from "../../types/common.js";
import type { LLMProvider } from "../../interfaces/contracts.js";
import { DeepSeekBrowserSessionAuth } from "./deepseekAuth.js";

interface DeepSeekStreamEvent {
  event?: string;
  data: string;
}

export class DeepSeekProvider implements LLMProvider {
  readonly id = "deepseek" as const;
  readonly displayName = "DeepSeek";

  constructor(private readonly auth: DeepSeekBrowserSessionAuth) {}

  supportsModel(model: string): boolean {
    return ["deepseek-v3", "deepseek-r1"].includes(model);
  }

  async listAvailableModels(): Promise<string[]> {
    return ["deepseek-v3", "deepseek-r1"];
  }

  async *streamCompletion(input: {
    model: string;
    messages: ChatMessage[];
    conversationId?: string;
    signal?: AbortSignal;
  }): AsyncGenerator<StreamDelta, { usage: TokenUsage; conversationId?: string }, void> {
    const headers = await this.auth.getAuthHeaders();
    const payload = {
      model: input.model,
      conversation_id: input.conversationId,
      stream: true,
      messages: input.messages,
      temperature: 0.2,
      request_id: crypto.randomUUID(),
      timestamp: Date.now(),
    };

    const signed = this.signPayload(payload);

    const response = await fetch("https://chat.deepseek.com/api/v0/chat/completions", {
      method: "POST",
      headers: {
        ...headers,
        "x-client-signature": signed.signature,
        "x-client-timestamp": signed.timestamp,
      },
      body: JSON.stringify(payload),
      signal: input.signal,
    });

    if (!response.ok || !response.body) {
      throw new Error(`DeepSeek stream failed: ${response.status} ${response.statusText}`);
    }

    let usage: TokenUsage = {
      promptTokens: 0,
      completionTokens: 0,
      retrievalTokens: 0,
      totalTokens: 0,
    };
    let latestConversationId = input.conversationId;

    for await (const event of this.parseSse(response.body)) {
      if (!event.data || event.data === "[DONE]") {
        continue;
      }

      const parsed = JSON.parse(event.data) as {
        delta?: { content?: string };
        conversation_id?: string;
        usage?: Partial<TokenUsage>;
      };

      if (parsed.delta?.content) {
        yield { type: "text", text: parsed.delta.content };
      }
      if (parsed.conversation_id) {
        latestConversationId = parsed.conversation_id;
      }
      if (parsed.usage) {
        usage = { ...usage, ...parsed.usage, retrievalTokens: usage.retrievalTokens };
        usage.totalTokens = usage.promptTokens + usage.completionTokens + usage.retrievalTokens;
        yield { type: "usage", usage: parsed.usage };
      }
    }

    yield { type: "done" };
    return { usage, conversationId: latestConversationId };
  }

  private signPayload(payload: object): { signature: string; timestamp: string } {
    const timestamp = String(Math.floor(Date.now() / 1000));
    const body = JSON.stringify(payload);
    const signature = crypto.createHash("sha256").update(`${timestamp}:${body}`).digest("hex");
    return { signature, timestamp };
  }

  private async *parseSse(stream: ReadableStream<Uint8Array>): AsyncGenerator<DeepSeekStreamEvent> {
    const reader = stream.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const parts = buffer.split("\n\n");
      buffer = parts.pop() ?? "";

      for (const chunk of parts) {
        const lines = chunk.split("\n");
        const event: DeepSeekStreamEvent = { data: "" };
        for (const line of lines) {
          if (line.startsWith("event:")) event.event = line.slice(6).trim();
          if (line.startsWith("data:")) event.data += line.slice(5).trim();
        }
        yield event;
      }
    }
  }
}
