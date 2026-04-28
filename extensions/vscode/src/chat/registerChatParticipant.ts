import * as vscode from 'vscode';

export function registerChatParticipant(context: vscode.ExtensionContext): void {
  const disposable = vscode.commands.registerCommand('agent.chat.ask', async () => {
    const q = await vscode.window.showInputBox({ prompt: 'Ask agent' });
    if (q) vscode.window.showInformationMessage(`Agent received: ${q}`);
  });
  context.subscriptions.push(disposable);
}
