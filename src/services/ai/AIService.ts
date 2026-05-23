import { GoogleGenAI } from '@google/genai/web';
import * as Sentry from '@sentry/react-native';
import { GOOGLE_GEMINI_API_KEY } from '@/utils/apiKeys';
import { extractJsonFromCodeBlock } from '@/utils/regex';
import { AIRequest, AIResult, AIServiceConfig } from './types';

interface QueueItem {
  request: AIRequest;
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
}

class AbortError extends Error {
  constructor(message = 'Aborted') {
    super(message);
    this.name = 'AbortError';
  }
}

export class AIService {
  private static instance: AIService;
  private genAI: GoogleGenAI | null = null;
  private config: Required<AIServiceConfig>;
  private cache: Map<string, any> = new Map();
  
  private queue: QueueItem[] = [];
  private isProcessing = false;

  private constructor(config?: AIServiceConfig) {
    this.config = {
      apiKey: config?.apiKey || GOOGLE_GEMINI_API_KEY || '',
      model: config?.model || 'gemini-2.0-flash',
      timeoutMs: config?.timeoutMs || 15000,
      maxRetries: config?.maxRetries || 3,
    };
  }

  public static getInstance(config?: AIServiceConfig): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService(config);
    }
    return AIService.instance;
  }

  private getClient(): GoogleGenAI {
    if (!this.genAI) {
      if (!this.config.apiKey) {
        throw new Error('Gemini API Key is missing. Set GOOGLE_GEMINI_API_KEY in your environment.');
      }
      this.genAI = new GoogleGenAI({ apiKey: this.config.apiKey });
    }
    return this.genAI;
  }

  public clearCache(): void {
    this.cache.clear();
  }

  public async execute<T = any>(request: AIRequest): Promise<AIResult<T>> {
    if (request.cacheKey && this.cache.has(request.cacheKey)) {
      return { data: this.cache.get(request.cacheKey) as T, cached: true };
    }

    return new Promise((resolve, reject) => {
      this.queue.push({ request, resolve, reject });
      // Sort queue descending by priority (higher number = higher priority)
      this.queue.sort((a, b) => (b.request.priority || 0) - (a.request.priority || 0));
      this.processQueue();
    });
  }

  private async processQueue() {
    if (this.isProcessing || this.queue.length === 0) return;
    this.isProcessing = true;

    while (this.queue.length > 0) {
      const item = this.queue.shift();
      if (!item) continue;
      
      const { request, resolve, reject } = item;

      if (request.signal?.aborted) {
        reject(new AbortError());
        continue;
      }

      try {
        const data = await this.executeWithRetry(request);
        if (request.cacheKey) {
          this.cache.set(request.cacheKey, data);
        }
        resolve({ data, cached: false });
      } catch (error) {
        reject(error);
      }
    }

    this.isProcessing = false;
  }

  private async executeWithRetry(request: AIRequest): Promise<any> {
    let attempt = 0;
    while (attempt < this.config.maxRetries) {
      try {
        return await this.executeSingle(request);
      } catch (error: any) {
        attempt++;
        if (request.signal?.aborted || error.name === 'AbortError') {
          throw new AbortError();
        }
        
        // Do not retry client errors like 4xx (unauthorized, invalid request)
        if (error?.status >= 400 && error?.status < 500 && error?.status !== 429) {
          throw error;
        }

        if (attempt >= this.config.maxRetries) {
          Sentry.captureException(error, {
            tags: { component: 'AIService', action: 'executeWithRetry', context: request.context },
            extra: { requestType: request.type, attempt }
          });
          throw error;
        }

        // Exponential backoff
        const backoffMs = Math.pow(2, attempt) * 1000;
        await new Promise(r => setTimeout(() => r(undefined), backoffMs));
      }
    }
  }

  private async executeSingle(request: AIRequest): Promise<any> {
    const client = this.getClient();

    let timeoutId: ReturnType<typeof setTimeout>;

    const fetchPromise = client.models.generateContent({
      model: this.config.model,
      contents: request.prompt,
    });

    const abortPromise = new Promise((_, reject) => {
      timeoutId = setTimeout(() => reject(new Error('Request timed out')), this.config.timeoutMs);
      
      if (request.signal) {
        if (request.signal.aborted) {
          clearTimeout(timeoutId);
          reject(new AbortError());
        } else {
          request.signal.addEventListener('abort', () => {
            clearTimeout(timeoutId);
            reject(new AbortError());
          });
        }
      }
    });

    try {
      const result: any = await Promise.race([fetchPromise, abortPromise]);

      if (!result?.text) {
        throw new Error('AI returned an empty response');
      }

      const textResponse = result.text.trim();

      if (request.type === 'json') {
        try {
          return extractJsonFromCodeBlock(textResponse);
        } catch (error) {
          throw new Error('AI response was not valid JSON. Please try again.');
        }
      }

      return textResponse;
    } finally {
      clearTimeout(timeoutId!);
    }
  }
}
