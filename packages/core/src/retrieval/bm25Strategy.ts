import type { FileChunk, RetrievedContext } from "../types/common.js";
import type { RetrievalStrategy } from "../interfaces/contracts.js";
import { tokenize } from "./tokenizer.js";

export class BM25Strategy implements RetrievalStrategy {
  readonly name = "bm25" as const;
  private readonly k1 = 1.5;
  private readonly b = 0.75;

  constructor(private readonly chunks: FileChunk[]) {}

  async search(query: string, options: { topK: number; scopePaths?: string[] }): Promise<RetrievedContext[]> {
    const corpus = options.scopePaths?.length
      ? this.chunks.filter((chunk) => options.scopePaths?.includes(chunk.path))
      : this.chunks;

    const avgDocLen = corpus.reduce((acc, c) => acc + tokenize(c.text).length, 0) / Math.max(corpus.length, 1);
    const queryTerms = tokenize(query);

    const docFreq = new Map<string, number>();
    for (const term of queryTerms) {
      docFreq.set(
        term,
        corpus.reduce((count, chunk) => (tokenize(chunk.text).includes(term) ? count + 1 : count), 0),
      );
    }

    return corpus
      .map((chunk) => {
        const tokens = tokenize(chunk.text);
        const tf = new Map<string, number>();
        for (const t of tokens) tf.set(t, (tf.get(t) ?? 0) + 1);

        let score = 0;
        for (const term of queryTerms) {
          const f = tf.get(term) ?? 0;
          const n = docFreq.get(term) ?? 0;
          const idf = Math.log((corpus.length - n + 0.5) / (n + 0.5) + 1);
          score += (idf * (f * (this.k1 + 1))) / (f + this.k1 * (1 - this.b + this.b * (tokens.length / avgDocLen || 1)));
        }

        return {
          chunk,
          score,
          source: "bm25",
          tokenEstimate: Math.ceil(chunk.text.length / 4),
        } satisfies RetrievedContext;
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, options.topK);
  }
}
