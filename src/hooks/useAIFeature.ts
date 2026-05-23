import { useState, useCallback, useRef, useEffect } from 'react';
import { AIService, AIRequest } from '@/services/ai';
import * as Sentry from '@sentry/react-native';

interface UseAIFeatureOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

interface UseAIFeatureResult<T> {
  execute: (request: Omit<AIRequest, 'signal'>) => Promise<T | null>;
  isLoading: boolean;
  error: Error | null;
  data: T | null;
  cancel: () => void;
}

export const useAIFeature = <T = any>(
  options?: UseAIFeatureOptions<T>
): UseAIFeatureResult<T> => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);
  const isMounted = useRef<boolean>(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
      cancel();
    };
  }, []);

  const cancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  const execute = useCallback(
    async (request: Omit<AIRequest, 'signal'>): Promise<T | null> => {
      cancel(); // Cancel any previous pending requests for this hook instance

      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      setIsLoading(true);
      setError(null);

      try {
        const aiService = AIService.getInstance();
        const result = await aiService.execute<T>({
          ...request,
          signal: abortController.signal,
        });

        if (!isMounted.current) return null;

        setData(result.data);
        options?.onSuccess?.(result.data);
        return result.data;
      } catch (err: any) {
        if (!isMounted.current) return null;

        if (err?.name === 'AbortError' || err?.message === 'Aborted' || abortController.signal.aborted) {
          // It was cancelled intentionally, do not set error state
          return null;
        }

        const errorObj = err instanceof Error ? err : new Error(String(err));
        setError(errorObj);
        Sentry.captureException(errorObj, {
          tags: { hook: 'useAIFeature', requestType: request.type },
        });
        options?.onError?.(errorObj);
        return null;
      } finally {
        if (isMounted.current) {
          setIsLoading(false);
        }
        if (abortControllerRef.current === abortController) {
          abortControllerRef.current = null;
        }
      }
    },
    [cancel, options]
  );

  return {
    execute,
    isLoading,
    error,
    data,
    cancel,
  };
};
