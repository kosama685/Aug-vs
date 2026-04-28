export type QueryIntent = 'NO_RETRIEVAL' | 'FILE_LOCAL' | 'SYMBOL_LOCAL' | 'FULL_RETRIEVAL' | 'DOCS_OR_WEB';

export interface QueryClassification {
  intent: QueryIntent;
  confidence: number;
  explanation: string;
}

export interface QueryClassifier {
  classify(query: string): Promise<QueryClassification>;
}

export class RuleBasedQueryClassifier implements QueryClassifier {
  async classify(query: string): Promise<QueryClassification> {
    const q = query.toLowerCase();
    if (/^\s*(hi|hello|thanks|what is|explain promises)/.test(q)) return { intent: 'NO_RETRIEVAL', confidence: 0.9, explanation: 'General or conversational request.' };
    if (/this function|selected code|this file|add comments/.test(q)) return { intent: 'FILE_LOCAL', confidence: 0.85, explanation: 'Prompt targets active file/selection.' };
    if (/where is|used\?|flow/.test(q)) return { intent: 'SYMBOL_LOCAL', confidence: 0.8, explanation: 'Prompt targets symbol relationships.' };
    if (/latest|sdk|api docs|check docs|current/.test(q)) return { intent: 'DOCS_OR_WEB', confidence: 0.8, explanation: 'Requires external docs or web lookup approval.' };
    return { intent: 'FULL_RETRIEVAL', confidence: 0.7, explanation: 'Repository-wide coding task inferred.' };
  }
}

export class PromptFallbackQueryClassifier implements QueryClassifier {
  constructor(private readonly primary: QueryClassifier) {}

  async classify(query: string): Promise<QueryClassification> {
    return this.primary.classify(query);
  }

  static buildFewShotPrompt(query: string): string {
    return `Classify query intent into: NO_RETRIEVAL, FILE_LOCAL, SYMBOL_LOCAL, FULL_RETRIEVAL, DOCS_OR_WEB.\nQuery: ${query}`;
  }
}
