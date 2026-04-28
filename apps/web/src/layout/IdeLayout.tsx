import { ActivityBar } from './ActivityBar';
import { Sidebar } from './Sidebar';
import { StatusBar } from './StatusBar';
import { CommandPalette } from './CommandPalette';
import { MonacoEditor } from '../editor/MonacoEditor';
import { AgentChatPanel } from '../chat/AgentChatPanel';
import { TerminalPanel } from '../terminal/TerminalPanel';

export function IdeLayout(): JSX.Element {
  return (
    <div className="ide-root">
      <ActivityBar />
      <Sidebar />
      <main className="editor-shell"><MonacoEditor /></main>
      <aside className="chat-shell"><AgentChatPanel /></aside>
      <section className="terminal-shell"><TerminalPanel /></section>
      <StatusBar />
      <CommandPalette />
    </div>
  );
}
