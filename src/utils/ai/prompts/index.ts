/**
 * AI Prompts — Phase 5.1
 *
 * All AI prompt templates live here as strongly-typed constants.
 * Prompts use {{PLACEHOLDER}} for runtime substitution.
 *
 * NO business logic here — only text templates.
 */

// ─── Resume Parse Prompt ─────────────────────────────────────────────────────
// (moved from prompts.ts, kept backward compatible)

import {getAvailableIcons} from '@/templates/icons';

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

export const RESUME_PARSE_PROMPT = `
  Parse the following resume text and return a JSON object with these fields:
  {
    "name": "Full name of the person",
    "email": "Valid email address",
    "phone": "Phone number in any format",
    "location": "Complete address or city/state",
    "summary": "Professional summary as plain text",
    "socials": [{
      "label": "Social media platform (e.g., 'LinkedIn', 'GitHub')",
      "url": "Full URL to the profile",
      "icon": One of: ${getAvailableIcons()}
    }],
    "work": [{
      "company": "Company name",
      "position": "Job title",
      "location": "Work location",
      "startDate": "Start date in YYYY-MM format",
      "endDate": "End date in YYYY-MM format or 'Present'",
      "current": "boolean indicating if this is the current job",
      "description": "Job description in HTML format using <ul>, <li>, <strong>, <em> tags for structured content and if skills are there then list them like this and skills should come in new line <strong>Skills</strong> : skill1, skill2, skill3 with "
    }],
    "education": [{
      "institution": "School/University name",
      "degree": "Degree name and major",
      "startDate": "Start date in YYYY-MM format",
      "endDate": "End date in YYYY-MM format or 'Present'",
      "gpa": "GPA if available",
      "isPercentage": "boolean indicating if gpa is in percentage or no",
      "current": "boolean indicating if currently studying",
      "location": "Institution location"
    }],
    "skills": [{
      "name": "Category name (e.g., 'Frontend Development', 'Backend Development', 'DevOps', 'Programming Languages', 'Database Technologies', 'UI/UX Design', 'Testing & Quality Assurance')",
      "level": "One of: beginner, intermediate, advanced, expert",
      "keywords": ["List of specific technologies, frameworks, or skills that belong to this category."]
    }],
    "projects": [{
      "name": "Project name",
      "description": "Project description in HTML format using <ul>, <li>, <strong>, <em> tags for structured content",
      "startDate": "Start date in YYYY-MM format",
      "endDate": "End date in YYYY-MM format or 'Present'",
      "current": "boolean indicating if project is ongoing",
      "links": [{
        "icon": One of: ${getAvailableIcons()},
        "label": "Link description (e.g., 'GitHub', 'Live Demo')",
        "url": "Full URL to the project resource"
      }]
    }],
    "certifications": [{
      "name": "Certification name",
      "authority": "Issuing organization",
      "date": "Issue date in YYYY-MM format",
      "certificationUrl": "certificationUrl"
    }]
  }

  Resume text to parse:
  {{resumeText}}

  Return ONLY a valid JSON object without any explanations or markdown. Ensure all HTML formatting is properly closed and nested.
`;

// ─── Bullet Point Writer ──────────────────────────────────────────────────────

export const BULLET_POINT_PROMPT = `
You are an expert resume writer. Improve or generate professional, impactful bullet points for the following work experience entry.

Role: {{position}} at {{company}}
Existing description: {{existingDescription}}

Requirements:
- Write 3-5 concise bullet points using strong action verbs (Led, Built, Reduced, Increased, etc.)
- Quantify achievements where possible (e.g., "reduced load time by 40%")
- Focus on impact and outcomes, not just duties
- Keep each bullet under 20 words
- Use HTML format: return ONLY a <ul> with <li> items, no other wrapper elements

Return ONLY the HTML <ul>...</ul> block, nothing else.
`;

// ─── Summary Generator ────────────────────────────────────────────────────────

export const SUMMARY_PROMPT = `
You are an expert resume writer. Write a compelling professional summary for the following person.

Name: {{name}}
Current/Most Recent Role: {{recentRole}} at {{recentCompany}}
Years of Experience: {{yearsOfExperience}}
Top Skills: {{topSkills}}
Target Industry/Role: {{targetRole}}

Requirements:
- 3-4 sentences max, 60-120 words total
- Start with a strong professional identity statement
- Highlight key strengths and expertise
- End with career aspiration or value proposition
- Write in third person, present tense
- Do NOT use filler phrases like "results-driven" or "team player"
- Be specific and concrete

Return ONLY the summary text (plain text, no HTML, no JSON).
`;

// ─── Job Tailor Prompt ────────────────────────────────────────────────────────

export const JOB_TAILOR_PROMPT = `
You are an expert ATS (Applicant Tracking System) resume consultant.

I need to tailor this resume to match the following job description.

JOB DESCRIPTION:
{{jobDescription}}

CURRENT RESUME DATA:
{{resumeData}}

Your task:
1. Identify the top 10 keywords/skills from the job description that are missing or underemphasized in the resume
2. Suggest improved work experience bullet points that incorporate relevant keywords (keep realistic, no fabrication)
3. Suggest a tailored professional summary for this specific role
4. Give an overall ATS match score (0-100)

Return a JSON object with this structure:
{
  "atsScore": number,
  "missingKeywords": string[],
  "suggestedSummary": string,
  "improvedBullets": {
    "sectionTitle": string,
    "itemId": "The 'id' string from the provided work or project entry",
    "original": string,
    "improved": string
  }[],
  "topMatchedKeywords": string[]
}

Return ONLY the JSON object, no markdown, no explanations.
`;

// ─── Resume Analysis Prompt ───────────────────────────────────────────────────

export const RESUME_ANALYSIS_PROMPT = `
Please analyze this resume and provide a detailed evaluation.

Resume JSON:
{{resumeData}}

Provide a structured analysis with:
1. Overall Score (0-100)
2. Section-by-Section scores and feedback

Return a JSON object with this structure:
{
  "overall": number,
  "sections": [{
    "name": string,
    "score": number,
    "feedback": string,
    "recommendations": string[]
  }]
}

Return ONLY the JSON object, no markdown, no explanations.
`;
