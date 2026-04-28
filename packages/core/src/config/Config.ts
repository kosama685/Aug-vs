import { promises as fs } from 'node:fs';

export interface AgentConfig {
  defaultProvider: string;
  defaultModel: string;
  retrievalBudgetTokens: number;
  safeCommands: string[];
}

export async function loadConfig(path: string): Promise<AgentConfig> {
  const raw = await fs.readFile(path, 'utf8');
  const cfg = JSON.parse(raw) as AgentConfig;
  if (!cfg.defaultProvider || !cfg.defaultModel) throw new Error('Invalid config: missing provider/model');
  return cfg;
}
