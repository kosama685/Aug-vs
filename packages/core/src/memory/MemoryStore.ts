import { promises as fs } from 'node:fs';

export interface MemoryStore {
  read(): Promise<string>;
  update(content: string): Promise<{ applied: boolean; diff: string }>;
}

export class FileMemoryStore implements MemoryStore {
  constructor(private readonly filePath: string) {}

  async read(): Promise<string> {
    try { return await fs.readFile(this.filePath, 'utf8'); } catch { return ''; }
  }

  async update(content: string): Promise<{ applied: boolean; diff: string }> {
    const sanitized = sanitizeMemory(content);
    const before = await this.read();
    const diff = `--- before\n+++ after\n-${before}\n+${sanitized}`;
    await fs.writeFile(this.filePath, sanitized, 'utf8');
    return { applied: true, diff };
  }
}

export function sanitizeMemory(content: string): string {
  return content.replace(/(api[_-]?key|token|secret|password)\s*[:=]\s*\S+/gi, '$1: [REDACTED]');
}
