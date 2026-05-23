/**
 * resumeParser.ts — Resume Parsing & AI Analysis
 *
 * Phase 5 refactor: Now uses the shared aiClient and externalized prompts.
 * Backward-compatible — all existing exports are preserved.
 */

import {createInitialResume} from '@/types/common/resume.types';
import * as Sentry from '@sentry/react-native';
import {v4 as uuidv4} from 'uuid';
import {callAIJson, fillPrompt} from './aiClient';
import {RESUME_ANALYSIS_PROMPT, RESUME_PARSE_PROMPT} from './prompts/index';

// ─── Resume Parsing ───────────────────────────────────────────────────────────

/**
 * Parses raw resume text (e.g., extracted from a PDF) into structured JSON
 * using the Gemini AI model.
 */
export const parseResumeWithAI = async (
  resumeText: string,
  isPrompt = false,
): Promise<any> => {
  const prompt = isPrompt
    ? resumeText
    : fillPrompt(RESUME_PARSE_PROMPT, {resumeText});

  return callAIJson(prompt, 'parseResumeWithAI');
};

// ─── Resume Analysis ──────────────────────────────────────────────────────────

interface AnalysisSection {
  name: string;
  score: number;
  feedback: string;
  recommendations: string[];
}

interface AnalysisResult {
  overall: number;
  sections: AnalysisSection[];
}

/**
 * Sends the full resume to AI for deep scoring and feedback.
 * The AIImprove screen now also uses resumeCompleteness.ts for instant
 * rule-based checks before invoking this (which hits the API).
 */
export const analyzeResumeWithAI = async (
  promptForAI: string,
): Promise<AnalysisResult> => {
  if (!promptForAI?.trim()) {
    throw new Error('Analysis prompt cannot be empty');
  }

  // Support both inline prompts (legacy) and structured resume data
  const isStructuredResume = promptForAI.startsWith('{');
  const prompt = isStructuredResume
    ? fillPrompt(RESUME_ANALYSIS_PROMPT, {resumeData: promptForAI})
    : promptForAI;

  const result = await callAIJson<AnalysisResult>(prompt, 'analyzeResumeWithAI');

  if (
    typeof result?.overall !== 'number' ||
    !Array.isArray(result?.sections)
  ) {
    Sentry.captureMessage('Invalid AI analysis result structure', {
      extra: {result},
    });
    throw new Error('AI returned an invalid analysis structure. Please try again.');
  }

  return {
    overall: Math.round(result.overall),
    sections: result.sections.map(s => ({
      ...s,
      score: Math.round(s.score),
      recommendations: Array.isArray(s.recommendations) ? s.recommendations : [],
    })),
  };
};

// ─── Resume Format Conversion ─────────────────────────────────────────────────

/**
 * Converts raw AI-parsed resume data into the app's Resume type.
 */
export const convertToResumeFormat = (parsedData: any): Resume => {
  try {
    const resume: Resume = createInitialResume();
    const currentDate = new Date().toISOString();

    resume.metadata.updatedAt = currentDate;
    resume.metadata.createdAt = currentDate;

    // Basics
    resume.basics.name = parsedData.name?.trim() || 'Untitled Resume';
    resume.basics.email = parsedData.email?.trim() || '';
    resume.basics.phone = parsedData.phone?.trim() || '';
    resume.basics.location = parsedData.location?.trim() || '';
    resume.basics.summary = parsedData.summary?.trim() || '';
    resume.basics.socials = (parsedData.socials ?? []).map((social: any) => ({
      id: uuidv4(),
      label: social.label?.trim() || '',
      url: social.url?.trim() || '',
      icon: social.icon?.trim() || '',
    }));

    // Work
    if (Array.isArray(parsedData.work)) {
      resume.sections.work.items = parsedData.work.map((work: any) => ({
        id: uuidv4(),
        company: work.company?.trim() || '',
        position: work.position?.trim() || '',
        location: work.location?.trim() || '',
        startDate: work.startDate?.trim() || '',
        endDate: work.endDate?.trim() || '',
        current: !work.endDate || work.endDate.toLowerCase().includes('present'),
        description: work.description?.trim() || '',
        status: 'visible',
      }));
    }

    // Education
    if (Array.isArray(parsedData.education)) {
      resume.sections.education.items = parsedData.education.map((edu: any) => ({
        id: uuidv4(),
        institution: edu.institution?.trim() || '',
        degree: edu.degree?.trim() || '',
        startDate: edu.startDate?.trim() || '',
        endDate: edu.endDate?.trim() || '',
        gpa: edu.gpa?.toString().trim() || '',
        isPercentage: edu.isPercentage ?? false,
        current: !edu.endDate || edu.endDate.toLowerCase().includes('present'),
        status: 'visible',
        location: edu.location?.trim() || '',
      }));
    }

    // Skills
    if (Array.isArray(parsedData.skills)) {
      resume.sections.skills.items = parsedData.skills.map((skill: any) => ({
        id: uuidv4(),
        name: skill.name?.trim() || '',
        level: ['Beginner', 'Intermediate', 'Advanced', 'Expert'].includes(skill.level)
          ? skill.level
          : 'Intermediate',
        keywords: skill.keywords || [],
      }));
    }

    // Projects
    if (Array.isArray(parsedData.projects)) {
      resume.sections.projects.items = parsedData.projects.map((project: any) => ({
        id: uuidv4(),
        name: project.name?.trim() || '',
        description: project.description?.trim() || '',
        url: project.url?.trim() || '',
        links: [],
        startDate: project.startDate?.trim() || '',
        endDate: project.endDate?.trim() || '',
        status: 'visible',
        current: !project.endDate || project.endDate.toLowerCase().includes('present'),
      }));
    }

    // Certifications
    if (Array.isArray(parsedData.certifications)) {
      resume.sections.certifications.items = parsedData.certifications.map((cert: any) => ({
        id: uuidv4(),
        name: cert.name?.trim() || '',
        authority: cert.authority?.trim() || '',
        certificationUrlOrCode: cert.certificationUrl?.trim() || '',
        description: cert.description?.trim() || '',
        date: cert.date?.trim() || '',
      }));
    }

    return resume;
  } catch (error) {
    Sentry.captureException(error, {
      tags: {component: 'resumeParser', action: 'format_conversion'},
    });
    throw new Error('Failed to convert resume data to the required format');
  }
};

// ─── Legacy score helpers (retained for backward compat) ─────────────────────

export {checkResumeCompleteness} from './resumeCompleteness';
