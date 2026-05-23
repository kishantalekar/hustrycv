export type AIRequestType = 'text' | 'json';

export interface AIServiceConfig {
  apiKey?: string;
  model?: string;
  timeoutMs?: number;
  maxRetries?: number;
}

export interface AIRequest {
  prompt: string;
  type?: AIRequestType;
  context?: string;
  signal?: AbortSignal;
  priority?: number; // Higher number means higher priority. Default is 0.
  cacheKey?: string; // If provided, response is cached in-memory.
}

export interface AIResult<T = any> {
  data: T;
  cached: boolean;
}
