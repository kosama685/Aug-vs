import * as vscode from "vscode";
import { registerParticipant } from "./chat/participant.js";
import { DeepSeekBrowserSessionAuth } from "@aug-agent/core";

export async function activate(context: vscode.ExtensionContext): Promise<void> {
  const auth = new DeepSeekBrowserSessionAuth();

  context.subscriptions.push(
    vscode.commands.registerCommand("augAgent.openChat", async () => {
      await vscode.commands.executeCommand("workbench.action.chat.open", "@aug-agent");
    }),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("augAgent.signInDeepSeek", async () => {
      await auth.signInWithEmbeddedWebView();
      vscode.window.showInformationMessage("DeepSeek session captured and encrypted in OS keyring.");
    }),
  );

  await registerParticipant(context);
}

export function deactivate(): void {
  // noop
}
