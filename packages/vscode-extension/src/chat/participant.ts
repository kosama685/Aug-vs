import * as vscode from "vscode";
import { createRuntime } from "../providers/runtime.js";

export async function registerParticipant(context: vscode.ExtensionContext): Promise<vscode.Disposable> {
  const workspaceRoot = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath ?? process.cwd();
  const runtime = await createRuntime(workspaceRoot);

  const participant = vscode.chat.createChatParticipant("aug-agent.main", async (request, chatContext, stream) => {
    const mode = vscode.workspace.getConfiguration("augAgent").get<"auto" | "quick" | "deep">("mode", "auto");
    const activeFilePath = vscode.window.activeTextEditor?.document.uri.fsPath;

    stream.progress(`Mode: ${mode}. Provider: DeepSeek.`);

    const result = runtime.runTurn({
      model: "deepseek-v3",
      prompt: request.prompt,
      retrievalToggle: mode,
      activeFilePath,
    });

    for await (const delta of result) {
      if (delta.type === "text" && delta.text) {
        stream.markdown(delta.text);
      }
      if (delta.type === "usage" && delta.usage) {
        stream.progress(
          `Tokens: prompt ${delta.usage.promptTokens ?? 0}, completion ${delta.usage.completionTokens ?? 0}`,
        );
      }
    }
  });

  context.subscriptions.push(participant);
  return participant;
}
