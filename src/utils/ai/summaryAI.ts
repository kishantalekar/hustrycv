/**
 * summaryAI — Professional Summary Generator (Phase 5.3)
 *
 * Generates a professional summary tailored to the user's experience.
 * Returns plain text ready to put in resume.basics.summary.
 */

import {callAIText, fillPrompt} from './aiClient';
import {SUMMARY_PROMPT} from './prompts/index';

export interface SummaryInput {
  name: string;
  recentRole: string;
  recentCompany: string;
  /** Total years of experience to communicate tone (e.g., "5+") */
  yearsOfExperience: string;
  /** Comma-separated top skills */
  topSkills: string;
  /** Optional: the type of role the user is targeting */
  targetRole?: string;
}

export interface SummaryResult {
  summary: string;
}

/**
 * Derives the most relevant information from a full Resume object
 * and returns a SummaryInput for summaryAI.
 */
export const extractSummaryInput = (resume: Resume): SummaryInput => {
  const basics = resume.basics;
  const works = resume.sections?.work?.items ?? [];
  const skills = resume.sections?.skills?.items ?? [];

  // Most recent job
  const recentWork = works[0];
  const recentRole = recentWork?.position ?? '';
  const recentCompany = recentWork?.company ?? '';

  // Calculate rough years of experience
  let yearsOfExperience = '1+';
  if (works.length > 0 && recentWork?.startDate) {
    const start = new Date(recentWork.startDate);
    const now = new Date();
    const years = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365));
    yearsOfExperience = years > 0 ? `${years}+` : '1';
  }

  // Top skills: take first 6 keywords from first 3 skill groups
  const topSkills = skills
    .slice(0, 3)
    .flatMap(s => s.keywords ?? [])
    .slice(0, 6)
    .join(', ');

  return {
    name: basics?.name ?? '',
    recentRole,
    recentCompany,
    yearsOfExperience,
    topSkills,
    targetRole: recentRole,
  };
};

/**
 * Generates a professional summary via AI.
 *
 * @throws Error if the AI request fails
 */
export const generateSummary = async (
  input: SummaryInput,
): Promise<SummaryResult> => {
  const prompt = fillPrompt(SUMMARY_PROMPT, {
    name: input.name,
    recentRole: input.recentRole || 'Professional',
    recentCompany: input.recentCompany || 'a leading organization',
    yearsOfExperience: input.yearsOfExperience,
    topSkills: input.topSkills || 'various technical and soft skills',
    targetRole: input.targetRole || input.recentRole || 'a senior role',
  });

  const summary = await callAIText(prompt, 'summaryAI');
  // Remove any accidental quotes or markdown
  const cleaned = summary.replace(/^["']|["']$/g, '').trim();

  return {summary: cleaned};
};
