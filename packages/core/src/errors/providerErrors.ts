export class ProviderError extends Error {
  constructor(
    message: string,
    public readonly providerId: string,
    public readonly code: string,
  ) {
    super(message);
    this.name = 'ProviderError';
  }
}

export class RateLimitError extends ProviderError {
  constructor(providerId: string, retryAfterMs?: number) {
    super('Rate limit reached', providerId, 'RATE_LIMIT');
    this.retryAfterMs = retryAfterMs;
    this.name = 'RateLimitError';
  }

  retryAfterMs?: number;
}

export class AuthRequiredError extends ProviderError {
  constructor(providerId: string) {
    super('Authentication is required', providerId, 'AUTH_REQUIRED');
    this.name = 'AuthRequiredError';
  }
}
