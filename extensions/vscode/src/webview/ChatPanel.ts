import * as vscode from 'vscode';

export class ChatPanel {
  static open(): void {
    const panel = vscode.window.createWebviewPanel('agentChat', 'Agent Chat', vscode.ViewColumn.Beside, {});
    panel.webview.html = '<html><body><h2>Agent Chat</h2><p>Provider switcher and plan checklist will render here.</p></body></html>';
  }
}
