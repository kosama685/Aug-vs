import { CodeChunk } from './types.js';

export interface Chunker {
  chunk(path: string, content: string): CodeChunk[];
}

export class TextChunker implements Chunker {
  constructor(private readonly linesPerChunk = 80) {}

  chunk(path: string, content: string): CodeChunk[] {
    const lines = content.split('\n');
    const chunks: CodeChunk[] = [];
    for (let i = 0; i < lines.length; i += this.linesPerChunk) {
      const slice = lines.slice(i, i + this.linesPerChunk);
      const text = slice.join('\n');
      chunks.push({
        id: `${path}:${i + 1}`,
        path,
        startLine: i + 1,
        endLine: i + slice.length,
        content: text,
        tokens: Math.ceil(text.length / 4),
      });
    }
    return chunks;
  }
}
