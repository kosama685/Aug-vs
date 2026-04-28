#!/usr/bin/env node
import { argv } from 'node:process';
import { InMemorySecretStore, MockProvider, ProviderRegistry } from '@aug-vs/core';

async function main(): Promise<void> {
  const command = argv[2] ?? 'help';
  const registry = new ProviderRegistry();
  registry.register(new MockProvider());
  const secretStore = new InMemorySecretStore();
  if (command === 'providers' && argv[3] === 'list') {
    console.log(registry.list().map((p) => `${p.id}: ${p.displayName}`).join('\n'));
    return;
  }
  if (command === 'providers' && argv[3] === 'login') {
    const provider = argv[4] ?? 'deepseek';
    const key = argv[5] ?? '';
    if (!key) {
      console.log('Usage: agent providers login <provider> <apiKey>');
      return;
    }
    await secretStore.setSecret(`aug-vs/${provider}`, 'apiKey', key);
    console.log(`Stored API key for ${provider} in configured secret store.`);
    return;
  }
  console.log('Commands: agent chat | agent index | agent ask "question" | agent edit "task" | agent providers list | agent providers login');
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : String(err));
  process.exitCode = 1;
});
