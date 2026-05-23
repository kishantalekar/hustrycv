/**
 * AI Client — Shared Gemini API wrapper
 *
 * Single place for all Gemini API calls.
 * All feature modules (bulletPointAI, summaryAI, etc.) import from here.
 */

import {GOOGLE_GEMINI_API_KEY} from '@/utils/apiKeys';
import {extractJsonFromCodeBlock} from '@/utils/regex';
import {GoogleGenAI} from '@google/genai/web';
import * as Sentry from '@sentry/react-native';

const MODEL = 'gemini-2.0-flash';

// ─── Lazy Singleton ───────────────────────────────────────────────────────────

let _genAI: GoogleGenAI | null = null;

const getGenAI = (): GoogleGenAI => {
  if (!_genAI) {
    if (!GOOGLE_GEMINI_API_KEY) {
      throw new Error(
        'Gemini API Key is missing. Set GOOGLE_GEMINI_API_KEY in your environment.',
      );
    }
    _genAI = new GoogleGenAI({apiKey: GOOGLE_GEMINI_API_KEY});
  }
  return _genAI;
};

// ─── Template Substitution ────────────────────────────────────────────────────

/**
 * Replaces {{PLACEHOLDER}} tokens in a prompt template with real values.
 */
export const fillPrompt = (
  template: string,
  vars: Record<string, string>,
): string =>
  Object.entries(vars).reduce(
    (t, [key, value]) => t.replace(new RegExp(`{{${key}}}`, 'g'), value ?? ''),
    template,
  );

// ─── Raw Text Response ────────────────────────────────────────────────────────

/**
 * Calls the AI and returns the raw text response.
 * Use this for prompts that return plain text (e.g., summaries, bullet points).
 */
export const callAIText = async (
  prompt: string,
  context?: string,
): Promise<string> => {
  try {
    const result = await getGenAI().models.generateContent({
      model: MODEL,
      contents: prompt,
    });

    if (!result?.text) {
      throw new Error('AI returned an empty response');
    }

    return result.text.trim();
  } catch (error) {
    Sentry.captureException(error, {
      tags: {component: 'aiClient', action: 'callAIText', context},
    });
    throw error instanceof Error
      ? error
      : new Error('AI request failed');
  }
};

// ─── JSON Response ────────────────────────────────────────────────────────────

/**
 * Calls the AI and parses the response as JSON.
 * Use this for prompts that return structured data.
 */
export const callAIJson = async <T = any>(
  prompt: string,
  context?: string,
): Promise<T> => {
  const text = await callAIText(prompt, context);
  try {
    return extractJsonFromCodeBlock(text) as T;
  } catch {
    Sentry.captureMessage('Failed to parse AI JSON response', {
      extra: {context, responseText: text.slice(0, 500)},
    });
    throw new Error('AI response was not valid JSON. Please try again.');
  }
};
