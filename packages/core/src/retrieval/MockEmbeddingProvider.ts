import { EmbeddingProvider } from './types.js';

export class MockEmbeddingProvider implements EmbeddingProvider {
  async embed(text: string): Promise<number[]> {
    const values = new Array(8).fill(0);
    for (let i = 0; i < text.length; i += 1) values[i % 8] += text.charCodeAt(i) / 255;
    return values;
  }
}
