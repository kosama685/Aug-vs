import * as vscode from 'vscode';

export interface ExtensionConfig {
  retrievalBudgetTokens: number;
  quickMode: boolean;
  deepMode: boolean;
}

export function getExtensionConfig(): ExtensionConfig {
  const cfg = vscode.workspace.getConfiguration('agent');
  return {
    retrievalBudgetTokens: cfg.get<number>('retrievalBudgetTokens', 8000),
    quickMode: cfg.get<boolean>('quickMode', true),
    deepMode: cfg.get<boolean>('deepMode', false),
  };
}
