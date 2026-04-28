import { QueryClassifier } from './QueryClassifier.js';
import { ContextEngine } from '../retrieval/ContextEngine.js';
import { LLMProvider } from '../types/llm.js';
import { ToolRegistry } from '../tools/types.js';

export type AgentState = 'idle' | 'planning' | 'executing' | 'done' | 'failed';

export interface AgentPlanStep { id: string; title: string; requiresApproval: boolean; done: boolean; }
export interface AgentPlan { summary: string; steps: AgentPlanStep[]; }
export interface AgentSession { id: string; state: AgentState; }
export interface AgentEvent { type: string; message: string; }

export interface AgentLoop {
  run(session: AgentSession, request: string): Promise<{ plan: AgentPlan; summary: string; events: AgentEvent[] }>;
}

export class DefaultAgentLoop implements AgentLoop {
  constructor(
    private readonly classifier: QueryClassifier,
    private readonly contextEngine: ContextEngine,
    private readonly provider: LLMProvider,
    private readonly tools: ToolRegistry,
  ) {}

  async run(session: AgentSession, request: string) {
    const events: AgentEvent[] = [];
    session.state = 'planning';
    const classification = await this.classifier.classify(request);
    events.push({ type: 'classification', message: classification.intent });
    const context = classification.intent === 'NO_RETRIEVAL' ? { chunks: [], tokenCount: 0, query: request } : await this.contextEngine.retrieve({ text: request }, 8000);
    const plan: AgentPlan = {
      summary: `Handle request with intent ${classification.intent}`,
      steps: [
        { id: '1', title: 'Analyze request', requiresApproval: false, done: true },
        { id: '2', title: 'Retrieve context', requiresApproval: false, done: true },
        { id: '3', title: 'Execute tools as needed', requiresApproval: true, done: false },
      ],
    };
    session.state = 'executing';
    const completion = await this.provider.complete({ model: (await this.provider.models())[0]?.id ?? 'unknown', messages: [{ role: 'user', content: `${request}\nContext chunks: ${context.chunks.length}\nTools: ${this.tools.list().map((t) => t.name).join(',')}` }] });
    session.state = 'done';
    events.push({ type: 'summary', message: completion.content });
    return { plan, summary: completion.content, events };
  }
}
