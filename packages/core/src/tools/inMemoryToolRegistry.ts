import type { ToolRegistry } from "../interfaces/contracts.js";

type ToolHandler = (args: Record<string, unknown>) => Promise<string>;

export class InMemoryToolRegistry implements ToolRegistry {
  private handlers = new Map<string, { description: string; inputSchema: object; handler: ToolHandler }>();

  register(name: string, description: string, inputSchema: object, handler: ToolHandler): void {
    this.handlers.set(name, { description, inputSchema, handler });
  }

  listToolSchemas(): Array<{ name: string; description: string; inputSchema: object }> {
    return [...this.handlers.entries()].map(([name, value]) => ({
      name,
      description: value.description,
      inputSchema: value.inputSchema,
    }));
  }

  async execute(name: string, args: Record<string, unknown>): Promise<string> {
    const tool = this.handlers.get(name);
    if (!tool) {
      throw new Error(`Tool not found: ${name}`);
    }
    return tool.handler(args);
  }
}
