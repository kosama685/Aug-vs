import { DeepSeekStreamEvent } from './DeepSeekTypes.js';

export function parseDeepSeekSse(buffer: string): DeepSeekStreamEvent[] {
  return buffer
    .split('\n\n')
    .map((part) => part.trim())
    .filter((part) => part.startsWith('data:'))
    .map((line) => line.replace(/^data:\s*/, ''))
    .filter((payload) => payload !== '[DONE]')
    .map((payload) => JSON.parse(payload) as DeepSeekStreamEvent);
}
