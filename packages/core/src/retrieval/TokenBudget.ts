import { CodeChunk, TokenBudget } from './types.js';

export function enforceTokenBudget(chunks: CodeChunk[], budget: TokenBudget): CodeChunk[] {
  const selected: CodeChunk[] = [];
  let used = 0;
  for (const chunk of chunks) {
    if (used + chunk.tokens > budget.maxTokens) break;
    selected.push(chunk);
    used += chunk.tokens;
  }
  return selected;
}
