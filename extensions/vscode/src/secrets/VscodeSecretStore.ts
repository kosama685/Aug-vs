export class VscodeSecretStore {
  constructor(private readonly secrets: { get(k: string): Thenable<string | undefined>; store(k: string, v: string): Thenable<void>; delete(k: string): Thenable<void> }) {}

  async getSecret(service: string, account: string): Promise<string | undefined> { return this.secrets.get(`${service}:${account}`); }
  async setSecret(service: string, account: string, value: string): Promise<void> { await this.secrets.store(`${service}:${account}`, value); }
  async deleteSecret(service: string, account: string): Promise<void> { await this.secrets.delete(`${service}:${account}`); }
}
