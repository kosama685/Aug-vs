import * as vscode from 'vscode';

export class DiffPreviewProvider {
  static async show(original: vscode.Uri, modified: vscode.Uri, title = 'Agent Patch Preview'): Promise<void> {
    await vscode.commands.executeCommand('vscode.diff', original, modified, title);
  }
}
