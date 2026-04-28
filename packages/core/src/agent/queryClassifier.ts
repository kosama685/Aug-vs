import type { QueryClassifier } from "../interfaces/contracts.js";

const GREETING = /^(hi|hello|hey|thanks|thank you|good morning|good afternoon)\b/i;
const DOC_LOOKUP = /(what is|explain syntax|documentation|docs|mdn|stackoverflow)/i;
const FILE_LOCAL = /(explain this function|what does this function|summarize this file|review this file)/i;
const CODEBASE_TASK = /(fix|refactor|implement|add tests|rename|optimize|debug|find bug|trace)/i;

export class RuleBasedQueryClassifier implements QueryClassifier {
  constructor(private readonly fallback?: (prompt: string) => Promise<"off" | "file-local" | "full">) {}

  async classify(input: {
    prompt: string;
    activeFilePath?: string;
    selectedCode?: string;
  }): Promise<{ mode: "off" | "file-local" | "full"; reason: string }> {
    const prompt = input.prompt.trim();

    if (GREETING.test(prompt)) {
      return { mode: "off", reason: "Greeting/small-talk detected; retrieval is unnecessary." };
    }
    if (DOC_LOOKUP.test(prompt) && !/this code|my file|our repo/i.test(prompt)) {
      return { mode: "off", reason: "Generic docs/syntax intent detected." };
    }
    if (FILE_LOCAL.test(prompt) || (!!input.selectedCode && prompt.length < 240)) {
      return { mode: "file-local", reason: "Prompt references local explanation intent." };
    }
    if (CODEBASE_TASK.test(prompt)) {
      return { mode: "full", reason: "Modification/debug intent detected." };
    }

    if (this.fallback) {
      const mode = await this.fallback(prompt);
      return { mode, reason: "Fallback few-shot classifier result." };
    }

    return { mode: "full", reason: "Conservative default to ensure task completion." };
  }

  static buildFewShotPrompt(userPrompt: string): string {
    return [
      "You classify retrieval mode for a coding assistant.",
      "Return exactly one token: off | file-local | full",
      "Examples:",
      "User: 'hi there' => off",
      "User: 'what is a Python decorator?' => off",
      "User: 'explain this function' => file-local",
      "User: 'fix failing auth tests across repo' => full",
      `User: '${userPrompt}' =>`,
    ].join("\n");
  }
}
