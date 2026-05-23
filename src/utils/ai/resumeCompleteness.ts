/**
 * resumeCompleteness — Rule-Based Completeness Checker (Phase 5.5)
 *
 * Scores resume completeness WITHOUT any AI API call.
 * Instant, offline, no tokens consumed.
 *
 * This is what the AIImprove screen uses for the "base" score.
 * The AI analysis (Phase 5.6) then enriches it with contextual feedback.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CompletenessIssue {
  section: string;
  message: string;
  severity: 'error' | 'warning' | 'tip';
}

export interface SectionCompleteness {
  section: string;
  score: number; // 0-100
  maxScore: number;
  issues: CompletenessIssue[];
}

export interface CompletenessResult {
  overall: number; // 0-100, weighted
  sections: SectionCompleteness[];
  /** Quick wins: the 3 most impactful issues to fix first */
  topIssues: CompletenessIssue[];
}

// ─── Rule Definitions ─────────────────────────────────────────────────────────

const checkBasics = (basics: Basics): SectionCompleteness => {
  const issues: CompletenessIssue[] = [];
  let score = 0;

  if (basics?.name?.trim()) score += 20;
  else issues.push({section: 'Personal Info', message: 'Add your full name', severity: 'error'});

  if (basics?.email?.trim()) score += 20;
  else issues.push({section: 'Personal Info', message: 'Add a professional email address', severity: 'error'});

  if (basics?.phone?.trim()) score += 15;
  else issues.push({section: 'Personal Info', message: 'Add a phone number', severity: 'warning'});

  if (basics?.location?.trim()) score += 10;
  else issues.push({section: 'Personal Info', message: 'Add your location', severity: 'tip'});

  if (basics?.summary?.trim()) {
    if (basics.summary.length >= 80) score += 25;
    else {
      score += 10;
      issues.push({section: 'Summary', message: 'Expand your summary to at least 80 characters', severity: 'warning'});
    }
  } else {
    issues.push({section: 'Summary', message: 'Add a professional summary — it is the first thing recruiters read', severity: 'error'});
  }

  const socialCount = basics?.socials?.filter(s => s.url?.trim())?.length ?? 0;
  if (socialCount > 0) score += 10;
  else issues.push({section: 'Personal Info', message: 'Add at least one social/professional link (LinkedIn, GitHub, etc.)', severity: 'tip'});

  return {section: 'Personal Info', score, maxScore: 100, issues};
};

const checkWork = (work: Section<WorkItem> | undefined): SectionCompleteness => {
  const issues: CompletenessIssue[] = [];
  const items = work?.items ?? [];

  if (items.length === 0) {
    return {
      section: 'Work Experience',
      score: 0,
      maxScore: 100,
      issues: [{section: 'Work Experience', message: 'Add at least one work experience entry', severity: 'error'}],
    };
  }

  let score = 40; // Having entries is already 40 pts

  const withDescription = items.filter(w => w.description && w.description.length >= 100);
  if (withDescription.length === items.length) score += 40;
  else {
    score += (withDescription.length / items.length) * 40;
    issues.push({section: 'Work Experience', message: `${items.length - withDescription.length} work ${items.length - withDescription.length === 1 ? 'entry needs' : 'entries need'} a longer description (aim for 100+ characters)`, severity: 'warning'});
  }

  const withDates = items.filter(w => w.startDate);
  if (withDates.length === items.length) score += 20;
  else {
    score += (withDates.length / items.length) * 20;
    issues.push({section: 'Work Experience', message: 'Some work entries are missing start dates', severity: 'tip'});
  }

  return {section: 'Work Experience', score: Math.round(score), maxScore: 100, issues};
};

const checkEducation = (education: Section<EducationItem> | undefined): SectionCompleteness => {
  const issues: CompletenessIssue[] = [];
  const items = education?.items ?? [];

  if (items.length === 0) {
    return {
      section: 'Education',
      score: 20,
      maxScore: 100,
      issues: [{section: 'Education', message: 'Consider adding your educational background', severity: 'tip'}],
    };
  }

  let score = 50;
  const withDetails = items.filter(e => e.institution && e.degree);
  if (withDetails.length === items.length) score += 50;
  else {
    score += (withDetails.length / items.length) * 50;
    issues.push({section: 'Education', message: 'Ensure all education entries have institution and degree details', severity: 'warning'});
  }

  return {section: 'Education', score: Math.round(score), maxScore: 100, issues};
};

const checkSkills = (skills: Section<SkillItem> | undefined): SectionCompleteness => {
  const issues: CompletenessIssue[] = [];
  const items = skills?.items ?? [];

  if (items.length === 0) {
    return {
      section: 'Skills',
      score: 0,
      maxScore: 100,
      issues: [{section: 'Skills', message: 'Add a skills section to pass ATS filters', severity: 'error'}],
    };
  }

  let score = 0;
  const totalKeywords = items.reduce((sum, s) => sum + (s.keywords?.length ?? 0), 0);

  if (items.length >= 3) score += 40;
  else {
    score += (items.length / 3) * 40;
    issues.push({section: 'Skills', message: 'Add more skill categories (aim for 3+)', severity: 'warning'});
  }

  if (totalKeywords >= 10) score += 60;
  else {
    score += (totalKeywords / 10) * 60;
    issues.push({section: 'Skills', message: `Add more specific skills keywords (currently ${totalKeywords}, aim for 10+)`, severity: 'warning'});
  }

  return {section: 'Skills', score: Math.round(score), maxScore: 100, issues};
};

const checkProjects = (projects: Section<ProjectItem> | undefined): SectionCompleteness => {
  const items = projects?.items ?? [];

  if (items.length === 0) {
    return {
      section: 'Projects',
      score: 50, // Not mandatory
      maxScore: 100,
      issues: [{section: 'Projects', message: 'Adding projects can demonstrate practical skills', severity: 'tip'}],
    };
  }

  const withDesc = items.filter(p => p.description && p.description.length >= 50);
  const score = 60 + Math.round((withDesc.length / items.length) * 40);
  const issues: CompletenessIssue[] = [];

  if (withDesc.length < items.length) {
    issues.push({section: 'Projects', message: 'Some projects need better descriptions', severity: 'tip'});
  }

  return {section: 'Projects', score, maxScore: 100, issues};
};

// ─── Main Function ────────────────────────────────────────────────────────────

const WEIGHTS: Record<string, number> = {
  'Personal Info': 0.25,
  'Work Experience': 0.30,
  'Education': 0.15,
  'Skills': 0.20,
  'Projects': 0.10,
};

export const checkResumeCompleteness = (resume: Resume): CompletenessResult => {
  const sections: SectionCompleteness[] = [
    checkBasics(resume.basics),
    checkWork(resume.sections?.work),
    checkEducation(resume.sections?.education),
    checkSkills(resume.sections?.skills),
    checkProjects(resume.sections?.projects),
  ];

  const overall = Math.round(
    sections.reduce((sum, s) => {
      const weight = WEIGHTS[s.section] ?? 0;
      return sum + s.score * weight;
    }, 0),
  );

  // Top issues: prioritize errors, then warnings, then tips. Take first 3.
  const allIssues = sections.flatMap(s => s.issues);
  const topIssues = [
    ...allIssues.filter(i => i.severity === 'error'),
    ...allIssues.filter(i => i.severity === 'warning'),
    ...allIssues.filter(i => i.severity === 'tip'),
  ].slice(0, 3);

  return {overall, sections, topIssues};
};
