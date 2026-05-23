/**
 * bulletPointAI — AI Bullet Point Writer (Phase 5.2)
 *
 * Generates impactful, ATS-optimised bullet points for a work experience entry.
 * Returns an HTML <ul>...</ul> fragment ready to inject into a RichText editor.
 */

import {callAIText, fillPrompt} from './aiClient';
import {BULLET_POINT_PROMPT} from './prompts/index';

export interface BulletPointInput {
  position: string;
  company: string;
  /** The user's current description (may be empty for generation from scratch) */
  existingDescription?: string;
}

export interface BulletPointResult {
  /** HTML fragment: <ul><li>...</li>...</ul> */
  html: string;
}

/**
 * Improves or generates work experience bullet points via AI.
 *
 * @throws Error if the AI request fails
 */
export const generateBulletPoints = async (
  input: BulletPointInput,
): Promise<BulletPointResult> => {
  const prompt = fillPrompt(BULLET_POINT_PROMPT, {
    position: input.position || 'Unknown Position',
    company: input.company || 'Unknown Company',
    existingDescription: input.existingDescription || 'None provided',
  });

  const rawHtml = await callAIText(prompt, 'bulletPointAI');

  // Strip any accidental markdown code fences
  const cleaned = rawHtml
    .replace(/```html\s*/gi, '')
    .replace(/```\s*/gi, '')
    .trim();

  // Ensure it starts with a <ul> tag — if AI hallucinated, wrap it
  const html = cleaned.startsWith('<ul') ? cleaned : `<ul>${cleaned}</ul>`;

  return {html};
};
