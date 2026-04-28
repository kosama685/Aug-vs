import {
  DeepSeekBrowserSessionAuth,
  DeepSeekProvider,
  DefaultAgentLoop,
  HybridContextEngine,
  InMemoryToolRegistry,
  RuleBasedQueryClassifier,
  type ChatMessage,
} from "@aug-agent/core";

export async function createRuntime(workspaceRoot: string) {
  const auth = new DeepSeekBrowserSessionAuth();
  const provider = new DeepSeekProvider(auth);

  const contextEngine = new HybridContextEngine(workspaceRoot);
  await contextEngine.buildOrLoad();

  const tools = new InMemoryToolRegistry();
  tools.register(
    "retrieve_context",
    "Retrieve contextual snippets from local index",
    { type: "object", properties: { query: { type: "string" } }, required: ["query"] },
    async ({ query }) => {
      const hits = await contextEngine.retrieve(String(query), { mode: "full", tokenBudget: 2000, topK: 8 });
      return JSON.stringify(
        hits.map((h) => ({ path: h.chunk.path, startLine: h.chunk.startLine, endLine: h.chunk.endLine })),
      );
    },
  );

  const classifier = new RuleBasedQueryClassifier();
  const agent = new DefaultAgentLoop(contextEngine, classifier, tools);

  return {
    auth,
    provider,
    runTurn: async function* (params: {
      model: string;
      prompt: string;
      retrievalToggle: "quick" | "deep" | "auto";
      activeFilePath?: string;
    }) {
      const messages: ChatMessage[] = [{ role: "user", content: params.prompt }];
      yield* agent.runTurn({
        provider,
        model: params.model,
        messages,
        retrievalToggle: params.retrievalToggle,
        activeFilePath: params.activeFilePath,
      });
    },
  };
}
