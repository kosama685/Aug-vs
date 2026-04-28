import { RetrievalResult } from './types.js';

export function reciprocalRankFusion(inputs: RetrievalResult[][], weights: number[], k = 60): RetrievalResult[] {
  const map = new Map<string, RetrievalResult>();
  const scores = new Map<string, number>();
  inputs.forEach((list, idx) => {
    const weight = weights[idx] ?? 1;
    list.forEach((item, rank) => {
      map.set(item.chunk.id, item);
      scores.set(item.chunk.id, (scores.get(item.chunk.id) ?? 0) + weight / (k + rank + 1));
    });
  });
  return [...scores.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([id, score]) => ({ ...map.get(id)!, score }));
}
