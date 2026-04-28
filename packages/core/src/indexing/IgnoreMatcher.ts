import { minimatch } from 'minimatch';

export interface IgnoreMatcher {
  shouldIgnore(path: string): boolean;
}

export class AgentIgnoreMatcher implements IgnoreMatcher {
  constructor(private readonly patterns: string[]) {}

  shouldIgnore(path: string): boolean {
    return this.patterns.some((pattern) => minimatch(path, pattern, { dot: true, nocase: true, matchBase: true }));
  }
}
