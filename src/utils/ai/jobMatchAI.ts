/**
 * jobMatchAI — Resume Tailor for Job Descriptions (Phase 5.4)
 *
 * Analyzes a job description against the user's resume and provides:
 *  - ATS match score
 *  - Missing keywords
 *  - Tailored summary suggestion
 *  - Improved bullet point suggestions for existing work entries
 */

import {callAIJson, fillPrompt} from './aiClient';
import {JOB_TAILOR_PROMPT} from './prompts/index';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ImprovedBullet {
  sectionTitle: string;
  original: string;
  improved: string;
}

export interface JobMatchResult {
  atsScore: number;
  missingKeywords: string[];
  topMatchedKeywords: string[];
  suggestedSummary: string;
  improvedBullets: ImprovedBullet[];
}

// ─── Main Function ────────────────────────────────────────────────────────────

/**
 * Analyzes how well a resume matches a job description and returns
 * actionable suggestions to improve ATS performance.
 *
 * @throws Error if the AI request fails or returns invalid data
 */
export const tailorResumeForJob = async (
  resume: Resume,
  jobDescription: string,
): Promise<JobMatchResult> => {
  if (!jobDescription?.trim()) {
    throw new Error('Job description cannot be empty');
  }

  // Prepare a compact representation of the resume to keep token usage low
  const resumeSnapshot = {
    name: resume.basics?.name,
    summary: resume.basics?.summary,
    skills: resume.sections?.skills?.items?.map(s => ({
      name: s.name,
      keywords: s.keywords,
    })),
    work: resume.sections?.work?.items?.map(w => ({
      position: w.position,
      company: w.company,
      description: w.description,
    })),
    projects: resume.sections?.projects?.items?.map(p => ({
      name: p.name,
      description: p.description,
    })),
  };

  const prompt = fillPrompt(JOB_TAILOR_PROMPT, {
    jobDescription: jobDescription.trim(),
    resumeData: JSON.stringify(resumeSnapshot, null, 2),
  });

  const result = await callAIJson<JobMatchResult>(prompt, 'jobMatchAI');

  // Validate and normalize
  return {
    atsScore: Math.min(100, Math.max(0, Math.round(result.atsScore ?? 0))),
    missingKeywords: Array.isArray(result.missingKeywords)
      ? result.missingKeywords
      : [],
    topMatchedKeywords: Array.isArray(result.topMatchedKeywords)
      ? result.topMatchedKeywords
      : [],
    suggestedSummary: result.suggestedSummary ?? '',
    improvedBullets: Array.isArray(result.improvedBullets)
      ? result.improvedBullets
      : [],
  };
};
