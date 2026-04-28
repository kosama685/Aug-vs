import * as vscode from 'vscode';
import { registerChatParticipant } from './chat/registerChatParticipant.js';
import { VscodeSecretStore } from './secrets/VscodeSecretStore.js';
import { VscodeWorkspaceIndexer } from './indexing/VscodeWorkspaceIndexer.js';

export function activate(context: vscode.ExtensionContext): void {
  const secretStore = new VscodeSecretStore(context.secrets);
  const indexer = new VscodeWorkspaceIndexer();
  const status = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 10);
  status.text = 'Agent: idle';
  status.show();

  context.subscriptions.push(
    vscode.commands.registerCommand('agent.openChat', () => vscode.commands.executeCommand('workbench.action.chat.open')),
    vscode.commands.registerCommand('agent.indexWorkspace', async () => {
      status.text = 'Agent: indexing...';
      await indexer.reindexWorkspace();
      status.text = 'Agent: indexed';
    }),
    vscode.commands.registerCommand('agent.clearIndex', () => indexer.clearIndex()),
    vscode.commands.registerCommand('agent.selectProvider', async () => vscode.window.showQuickPick(['mock', 'deepseek'], { placeHolder: 'Select provider' })),
    vscode.commands.registerCommand('agent.configureProvider', async () => {
      const key = await vscode.window.showInputBox({ prompt: 'Enter API key', password: true });
      if (key) await secretStore.setSecret('aug-vs/deepseek', 'apiKey', key);
    }),
    vscode.commands.registerCommand('agent.toggleSearch', () => vscode.window.showInformationMessage('Codebase search toggled.')),
    vscode.commands.registerCommand('agent.applyLastPatch', () => vscode.window.showInformationMessage('Apply patch command invoked.')),
    vscode.commands.registerCommand('agent.rejectLastPatch', () => vscode.window.showInformationMessage('Reject patch command invoked.')),
    status,
  );

  registerChatParticipant(context);
}

export function deactivate(): void {}
