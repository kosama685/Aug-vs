export interface ToolInvocation<TInput = unknown> {
  name: string;
  input: TInput;
}

export interface ToolResult<TOutput = unknown> {
  ok: boolean;
  output?: TOutput;
  error?: string;
}

export interface Tool<TInput = unknown, TOutput = unknown> {
  name: string;
  description: string;
  run(input: TInput): Promise<ToolResult<TOutput>>;
}

export interface ToolRegistry {
  register(tool: Tool): void;
  get(name: string): Tool | undefined;
  list(): Tool[];
}

export interface ApprovalPolicy {
  requiresApproval(toolName: string, input: unknown): { required: boolean; reason?: string };
}
