import type { AgentLoop, ContextEngine, QueryClassifier, ToolRegistry } from "../interfaces/contracts.js";
import type { ChatMessage, StreamDelta, TokenUsage } from "../types/common.js";

export class DefaultAgentLoop implements AgentLoop {
  constructor(
    private readonly contextEngine: ContextEngine,
    private readonly classifier: QueryClassifier,
    private readonly tools: ToolRegistry,
  ) {}

  async *runTurn(input: {
    provider: {
      streamCompletion: (params: {
        model: string;
        messages: ChatMessage[];
        conversationId?: string;
        signal?: AbortSignal;
      }) => AsyncGenerator<StreamDelta, { usage: TokenUsage; conversationId?: string }, void>;
    };
    model: string;
    messages: ChatMessage[];
    retrievalToggle: "quick" | "deep" | "auto";
    activeFilePath?: string;
    selectedCode?: string;
    signal?: AbortSignal;
  }): AsyncGenerator<StreamDelta, { usage: TokenUsage }, void> {
    const latestUserPrompt = [...input.messages].reverse().find((m) => m.role === "user")?.content ?? "";

    const classified =
      input.retrievalToggle === "quick"
        ? { mode: "off" as const, reason: "Quick mode forced by user." }
        : input.retrievalToggle === "deep"
          ? { mode: "full" as const, reason: "Deep mode forced by user." }
          : await this.classifier.classify({
              prompt: latestUserPrompt,
              activeFilePath: input.activeFilePath,
              selectedCode: input.selectedCode,
            });

    const context = await this.contextEngine.retrieve(latestUserPrompt, {
      mode: classified.mode,
      activeFilePath: input.activeFilePath,
      tokenBudget: 8_000,
      topK: 30,
    });

    const retrievalTokens = this.contextEngine.estimateTokenUsage(context);
    const toolSchemas = this.tools.listToolSchemas();

    const enrichedMessages: ChatMessage[] = [
      {
        role: "system",
        content: [
          "You are a coding agent. Use tools when necessary.",
          `Retrieval mode: ${classified.mode}. Reason: ${classified.reason}`,
          `Available tools: ${JSON.stringify(toolSchemas)}`,
          "Context snippets:\n" +
            context
              .map((c) => `### ${c.chunk.path}:${c.chunk.startLine}-${c.chunk.endLine}\n${c.chunk.text}`)
              .join("\n\n"),
        ].join("\n\n"),
      },
      ...input.messages,
    ];

    const iterator = input.provider.streamCompletion({
      model: input.model,
      messages: enrichedMessages,
      signal: input.signal,
    });

    while (true) {
      const next = await iterator.next();
      if (next.done) {
        return {
          usage: {
            ...next.value.usage,
            retrievalTokens,
            totalTokens: next.value.usage.promptTokens + next.value.usage.completionTokens + retrievalTokens,
          },
        };
      }
      yield next.value;
    }
  }
}
