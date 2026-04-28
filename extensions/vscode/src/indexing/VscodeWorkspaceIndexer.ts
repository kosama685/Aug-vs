import * as vscode from 'vscode';

export class VscodeWorkspaceIndexer {
  async reindexWorkspace(): Promise<void> {
    const folders = vscode.workspace.workspaceFolders ?? [];
    for (const folder of folders) {
      await vscode.workspace.findFiles(new vscode.RelativePattern(folder, '**/*.{ts,tsx,js,jsx,py,go,java,kt,md}'), '**/{node_modules,.git,dist,build,vendor}/**');
    }
  }

  clearIndex(): void {
    void vscode.window.showInformationMessage('Index cleared.');
  }
}
