export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9_\s]/g, " ")
    .split(/\s+/)
    .filter((x) => x.length > 1);
}

export function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}
