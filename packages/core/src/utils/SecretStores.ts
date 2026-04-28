import { SecretStore } from '../types/llm.js';

export class InMemorySecretStore implements SecretStore {
  private readonly secrets = new Map<string, string>();
  async getSecret(service: string, account: string): Promise<string | undefined> { return this.secrets.get(`${service}:${account}`); }
  async setSecret(service: string, account: string, value: string): Promise<void> { this.secrets.set(`${service}:${account}`, value); }
  async deleteSecret(service: string, account: string): Promise<void> { this.secrets.delete(`${service}:${account}`); }
}
