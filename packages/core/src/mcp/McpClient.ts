export interface McpClient {
  call(server: string, method: string, params: Record<string, unknown>): Promise<unknown>;
}

export class NullMcpClient implements McpClient {
  async call(server: string, method: string): Promise<unknown> {
    return { ok: false, message: `MCP server '${server}' unavailable for method '${method}'.` };
  }
}
