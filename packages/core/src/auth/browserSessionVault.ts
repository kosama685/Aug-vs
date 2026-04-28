import keytar from "keytar";
import type { ProviderId } from "../types/common.js";

const SERVICE = "aug-agent-browser-sessions";

export class BrowserSessionVault {
  async save(provider: ProviderId, payload: Record<string, unknown>): Promise<void> {
    await keytar.setPassword(SERVICE, provider, JSON.stringify(payload));
  }

  async load<T>(provider: ProviderId): Promise<T | null> {
    const raw = await keytar.getPassword(SERVICE, provider);
    if (!raw) {
      return null;
    }
    return JSON.parse(raw) as T;
  }

  async clear(provider: ProviderId): Promise<void> {
    await keytar.deletePassword(SERVICE, provider);
  }
}
