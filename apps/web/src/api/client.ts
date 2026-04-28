export interface ApiClient { getHealth(): Promise<{ ok: boolean }> }
