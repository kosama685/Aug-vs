export interface DiffPreview {
  files: string[];
  additions: number;
  deletions: number;
}

export class PatchApplicator {
  validateUnifiedDiff(diff: string): { valid: boolean; preview: DiffPreview; error?: string } {
    const lines = diff.split('\n');
    const files = lines.filter((l) => l.startsWith('+++ b/')).map((l) => l.replace('+++ b/', ''));
    const additions = lines.filter((l) => l.startsWith('+') && !l.startsWith('+++')).length;
    const deletions = lines.filter((l) => l.startsWith('-') && !l.startsWith('---')).length;
    const valid = lines.some((l) => l.startsWith('@@')) && files.length > 0;
    return { valid, preview: { files, additions, deletions }, error: valid ? undefined : 'Invalid unified diff format' };
  }
}
