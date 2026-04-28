import { promises as fs } from 'node:fs';
import path from 'node:path';
import { IgnoreMatcher } from './IgnoreMatcher.js';

export interface FileScanner {
  scan(root: string): Promise<string[]>;
}

const defaultSkip = ['node_modules', '.git', '.venv', 'dist', 'build', 'vendor'];

export class WorkspaceFileScanner implements FileScanner {
  constructor(private readonly ignore: IgnoreMatcher, private readonly maxBytes = 512000) {}

  async scan(root: string): Promise<string[]> {
    const files: string[] = [];
    const walk = async (dir: string) => {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      for (const entry of entries) {
        const full = path.join(dir, entry.name);
        const rel = path.relative(root, full);
        if (defaultSkip.some((s) => rel.split(path.sep).includes(s)) || this.ignore.shouldIgnore(rel)) continue;
        if (entry.isDirectory()) await walk(full);
        else {
          if (/lock\.json$|\.lock$/.test(entry.name)) continue;
          const stat = await fs.stat(full);
          if (stat.size > this.maxBytes) continue;
          files.push(full);
        }
      }
    };
    await walk(root);
    return files;
  }
}
