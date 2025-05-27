import {createInitialResume} from '@/types/common/resume.types';
import {GOOGLE_GEMINI_API_KEY} from '@/utils/apiKeys';
import {extractJsonFromCodeBlock} from '@/utils/regex';
import {GoogleGenAI} from '@google/genai';
import * as Sentry from '@sentry/react-native';
import {v4 as uuidv4} from 'uuid';
import {RESUME_PARSE_PROMPT} from './prompts';

// Initialize Google GenAI with API key
const genAI = new GoogleGenAI({apiKey: GOOGLE_GEMINI_API_KEY});

// Function to parse resume text using Gemini AI
export const parseResumeWithAI = async (
  resumeText: string,
  isPrompt = false,
) => {
  try {
    const prompt = isPrompt
      ? resumeText
      : RESUME_PARSE_PROMPT.replace('{{resumeText}}', resumeText);

    const result = await genAI.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });

    if (!result || !result.text) {
      throw new Error('Failed to get response from AI model');
    }

    try {
      // console.log('[AI] AI response:', result.text);
      const parsedData = extractJsonFromCodeBlock(result.text);
      // console.log('[AI] Parsed AI response:', parsedData);
      return parsedData;
    } catch (parseError) {
      Sentry.captureException(parseError, {
        tags: {
          component: 'resumeParser',
          action: 'parse_json',
        },
        extra: {
          aiResponse: result.text,
        },
      });
      throw new Error('Failed to parse AI response as JSON');
    }
  } catch (error) {
    Sentry.captureException(error, {
      tags: {
        component: 'resumeParser',
        action: 'ai_generation',
      },
      extra: {
        resumeTextLength: resumeText.length,
      },
    });
    throw error instanceof Error
      ? error
      : new Error('Failed to parse resume with AI');
  }
};

// Function to convert parsed AI data to our Resume structure
// Function to analyze resume and provide detailed feedback
export const analyzeResumeWithAI = async (promptForAI: string) => {
  try {
    // Initial validation
    if (!promptForAI || promptForAI.trim().length === 0) {
      throw new Error('Prompt for AI cannot be empty');
    }

    // Get the AI's analysis based on the detailed prompt
    // The 'true' flag indicates that promptForAI is already a complete prompt for the AI model.
    const aiAnalysisResult = await parseResumeWithAI(promptForAI, true);
    // console.log('AI Analysis Result from parseResumeWithAI:', aiAnalysisResult);

    // Validate the structure of the AI's response
    if (
      !aiAnalysisResult ||
      typeof aiAnalysisResult.overall !== 'number' ||
      !Array.isArray(aiAnalysisResult.sections) ||
      aiAnalysisResult.sections.some(
        (section: any) =>
          typeof section.name !== 'string' ||
          typeof section.score !== 'number' ||
          typeof section.feedback !== 'string' ||
          !Array.isArray(section.recommendations),
      )
    ) {
      Sentry.captureMessage(
        'Invalid AI analysis result structure from AI model',
        {
          extra: {aiAnalysisResult},
        },
      );
      throw new Error(
        'AI returned an invalid analysis structure. Please check the AI response or prompt.',
      );
    }

    // The AI is expected to return the scores and feedback directly as per the prompt.
    // So, we directly use its output, ensuring scores are rounded integers.
    return {
      overall: Math.round(aiAnalysisResult.overall),
      sections: aiAnalysisResult.sections.map((section: any) => ({
        ...section,
        score: Math.round(section.score),
        // Ensure recommendations is always an array, even if AI omits it or sends null
        recommendations: Array.isArray(section.recommendations)
          ? section.recommendations
          : [],
      })),
    };
  } catch (error) {
    Sentry.captureException(error, {
      tags: {
        component: 'resumeParser',
        action: 'resume_analysis_direct_ai',
      },
      extra: {
        promptLength: promptForAI?.length || 0,
        error: error instanceof Error ? error.message : String(error),
      },
    });
    throw error instanceof Error
      ? error
      : new Error('Failed to analyze resume using AI direct output');
  }
};

// Section-specific scoring functions
export const calculateBasicInfoScore = (data: any): number => {
  let score = 0;
  if (data.name) score += 0.2;
  if (data.email) score += 0.2;
  if (data.phone) score += 0.2;
  if (data.location) score += 0.2;
  if (data.summary && data.summary.length >= 50) score += 0.2;
  return score;
};

export const calculateWorkScore = (data: any): number => {
  if (!Array.isArray(data.work) || data.work.length === 0) return 0;
  return (
    data.work.reduce((acc: number, work: any) => {
      let itemScore = 0;
      if (work.company) itemScore += 0.2;
      if (work.position) itemScore += 0.2;
      if (work.description && work.description.length >= 100) itemScore += 0.3;
      if (work.startDate) itemScore += 0.15;
      if (work.endDate || work.current) itemScore += 0.15;
      return acc + itemScore;
    }, 0) / data.work.length
  );
};

export const calculateEducationScore = (data: any): number => {
  if (!Array.isArray(data.education) || data.education.length === 0) return 0;
  return (
    data.education.reduce((acc: number, edu: any) => {
      let itemScore = 0;
      if (edu.institution) itemScore += 0.3;
      if (edu.degree) itemScore += 0.3;
      if (edu.startDate) itemScore += 0.2;
      if (edu.endDate || edu.current) itemScore += 0.2;
      return acc + itemScore;
    }, 0) / data.education.length
  );
};

export const calculateSkillsScore = (data: any): number => {
  if (!Array.isArray(data.skills) || data.skills.length === 0) return 0;
  return (
    data.skills.reduce((acc: number, skill: any) => {
      let itemScore = 0;
      if (skill.name) itemScore += 0.4;
      if (Array.isArray(skill.keywords) && skill.keywords.length > 0)
        itemScore += 0.6;
      return acc + itemScore;
    }, 0) / data.skills.length
  );
};

export const calculateProjectsScore = (data: any): number => {
  if (!Array.isArray(data.projects) || data.projects.length === 0) return 0;
  return (
    data.projects.reduce((acc: number, project: any) => {
      let itemScore = 0;
      if (project.name) itemScore += 0.3;
      if (project.description && project.description.length >= 50)
        itemScore += 0.4;
      if (project.startDate) itemScore += 0.15;
      if (project.endDate || project.current) itemScore += 0.15;
      return acc + itemScore;
    }, 0) / data.projects.length
  );
};

// Calculate overall resume score
const calculateResumeScore = (data: any): number => {
  const weights = {
    basics: 0.3,
    work: 0.25,
    education: 0.2,
    skills: 0.15,
    projects: 0.1,
  };

  return (
    calculateBasicInfoScore(data) * weights.basics +
    calculateWorkScore(data) * weights.work +
    calculateEducationScore(data) * weights.education +
    calculateSkillsScore(data) * weights.skills +
    calculateProjectsScore(data) * weights.projects
  );
};

// Section-specific feedback generation functions
export const generateBasicInfoFeedback = (data: any): string => {
  const strengths = [];
  const weaknesses = [];

  if (data.name) strengths.push('Name is provided');
  else weaknesses.push('Missing full name');

  if (data.email) strengths.push('Professional email included');
  else weaknesses.push('Missing email contact');

  if (data.phone) strengths.push('Phone contact available');
  else weaknesses.push('Missing phone contact');

  if (data.location) strengths.push('Location information present');
  else weaknesses.push('Missing location details');

  if (data.summary && data.summary.length >= 50)
    strengths.push('Comprehensive professional summary');
  else weaknesses.push('Professional summary needs expansion');

  return `Strengths: ${strengths.join(', ')}. ${
    weaknesses.length > 0
      ? `Areas for improvement: ${weaknesses.join(', ')}.`
      : ''
  }`;
};

export const generateWorkFeedback = (data: any): string => {
  if (!Array.isArray(data.work) || data.work.length === 0) {
    return 'No work experience listed. Adding professional experience will significantly strengthen your resume.';
  }

  const strengths = [];
  const weaknesses = [];

  if (data.work.length > 1)
    strengths.push('Multiple work experiences demonstrate career progression');
  if (data.work.every(w => w.description?.length >= 100))
    strengths.push('Detailed job descriptions');

  const incompleteEntries = data.work.filter(
    w => !w.description || w.description.length < 100,
  ).length;
  if (incompleteEntries > 0)
    weaknesses.push(
      `${incompleteEntries} job entries need more detailed descriptions`,
    );

  return `Strengths: ${strengths.join(', ')}. ${
    weaknesses.length > 0
      ? `Areas for improvement: ${weaknesses.join(', ')}.`
      : ''
  }`;
};

export const generateEducationFeedback = (data: any): string => {
  if (!Array.isArray(data.education) || data.education.length === 0) {
    return 'No education history provided. Adding educational background will enhance your qualifications.';
  }

  const strengths = [];
  const weaknesses = [];

  if (data.education.every(e => e.institution && e.degree))
    strengths.push('Complete education details');
  if (data.education.every(e => e.startDate && (e.endDate || e.current)))
    strengths.push('Clear timeline');

  const incomplete = data.education.filter(
    e => !e.institution || !e.degree,
  ).length;
  if (incomplete > 0) weaknesses.push('Some education entries are incomplete');

  return `Strengths: ${strengths.join(', ')}. ${
    weaknesses.length > 0
      ? `Areas for improvement: ${weaknesses.join(', ')}.`
      : ''
  }`;
};

export const generateSkillsFeedback = (data: any): string => {
  if (!Array.isArray(data.skills) || data.skills.length === 0) {
    return 'No skills listed. Adding a comprehensive skills section will highlight your capabilities.';
  }

  const strengths = [];
  const weaknesses = [];

  if (data.skills.length >= 3) strengths.push('Good range of skill categories');
  if (data.skills.every(s => s.keywords?.length > 0))
    strengths.push('Detailed skill descriptions');

  if (data.skills.length < 3)
    weaknesses.push('Could benefit from more skill categories');
  if (data.skills.some(s => !s.keywords?.length))
    weaknesses.push('Some skills lack detailed keywords');

  return `Strengths: ${strengths.join(', ')}. ${
    weaknesses.length > 0
      ? `Areas for improvement: ${weaknesses.join(', ')}.`
      : ''
  }`;
};

export const generateProjectsFeedback = (data: any): string => {
  if (!Array.isArray(data.projects) || data.projects.length === 0) {
    return 'No projects listed. Adding relevant projects will showcase your practical experience.';
  }

  const strengths = [];
  const weaknesses = [];

  if (data.projects.length >= 2)
    strengths.push('Multiple projects demonstrate practical experience');
  if (data.projects.every(p => p.description?.length >= 50))
    strengths.push('Well-described projects');

  const incompleteProjects = data.projects.filter(
    p => !p.description || p.description.length < 50,
  ).length;
  if (incompleteProjects > 0)
    weaknesses.push(
      `${incompleteProjects} projects need more detailed descriptions`,
    );

  return `Strengths: ${strengths.join(', ')}. ${
    weaknesses.length > 0
      ? `Areas for improvement: ${weaknesses.join(', ')}.`
      : ''
  }`;
};

// Section-specific recommendation generation functions
export const generateBasicInfoRecommendations = (data: any): string[] => {
  const recommendations = [];
  if (!data.summary || data.summary.length < 50) {
    recommendations.push(
      'Add a compelling professional summary (50-200 words) highlighting your key achievements and career goals',
    );
  }
  if (!data.phone)
    recommendations.push('Include a professional contact number');
  if (!data.location)
    recommendations.push('Add your location to help with local job searches');
  return recommendations;
};

export const generateWorkRecommendations = (data: any): string[] => {
  const recommendations = [];
  if (!Array.isArray(data.work) || data.work.length === 0) {
    recommendations.push(
      'Add your work experience, starting with your most recent position',
    );
  } else {
    data.work.forEach((work: any, index: number) => {
      if (!work.description || work.description.length < 100) {
        recommendations.push(
          `Expand the description for ${
            work.position || `position ${index + 1}`
          } with specific achievements and responsibilities`,
        );
      }
    });
  }
  return recommendations;
};

export const generateEducationRecommendations = (data: any): string[] => {
  const recommendations = [];
  if (!Array.isArray(data.education) || data.education.length === 0) {
    recommendations.push(
      'Add your educational background, including degrees and certifications',
    );
  } else {
    const incomplete = data.education.filter(e => !e.institution || !e.degree);
    if (incomplete.length > 0) {
      recommendations.push(
        'Complete all education entries with institution name and degree information',
      );
    }
  }
  return recommendations;
};

export const generateSkillsRecommendations = (data: any): string[] => {
  const recommendations = [];
  if (!Array.isArray(data.skills) || data.skills.length === 0) {
    recommendations.push(
      'Add a skills section organized by categories (e.g., Technical, Soft Skills, Languages)',
    );
  } else if (data.skills.length < 3) {
    recommendations.push(
      'Add more skill categories to showcase your diverse expertise',
    );
  }
  return recommendations;
};

export const generateProjectsRecommendations = (data: any): string[] => {
  const recommendations = [];
  if (!Array.isArray(data.projects) || data.projects.length === 0) {
    recommendations.push(
      'Add relevant projects that demonstrate your practical skills and achievements',
    );
  } else {
    const incompleteProjects = data.projects.filter(
      p => !p.description || p.description.length < 50,
    );
    if (incompleteProjects.length > 0) {
      recommendations.push(
        'Enhance project descriptions with technical details and measurable outcomes',
      );
    }
  }
  return recommendations;
};

export const convertToResumeFormat = (parsedData: any) => {
  try {
    const resume: Resume = createInitialResume();
    const currentDate = new Date().toISOString();

    // Set metadata
    resume.metadata.updatedAt = currentDate;
    resume.metadata.createdAt = currentDate;

    // Update basic information with validation
    resume.basics.name = parsedData.name?.trim() || 'Untitled Resume';
    resume.basics.email = parsedData.email?.trim() || '';
    resume.basics.phone = parsedData.phone?.trim() || '';
    resume.basics.location = parsedData.location?.trim() || '';
    resume.basics.summary = parsedData.summary?.trim() || '';
    resume.basics.socials = parsedData.socials?.map(social => ({
      id: uuidv4(),
      label: social.label?.trim() || '',
      url: social.url?.trim() || '',
      icon: social.icon?.trim() || '',
    }));

    // Add work experience with validation
    if (Array.isArray(parsedData.work)) {
      resume.sections.work.items = parsedData.work.map(work => ({
        id: uuidv4(),
        company: work.company?.trim() || '',
        position: work.position?.trim() || '',
        location: work.location?.trim() || '',
        startDate: work.startDate?.trim() || '',
        endDate: work.endDate?.trim() || '',
        current:
          !work.endDate || work.endDate.toLowerCase().includes('present'),
        description: work.description?.trim() || '',
        status: 'visible',
      }));
    }

    // Add education with validation
    if (Array.isArray(parsedData.education)) {
      resume.sections.education.items = parsedData.education.map(edu => ({
        id: uuidv4(),
        institution: edu.institution?.trim() || '',
        degree: edu.degree?.trim() || '',
        startDate: edu.startDate?.trim() || '',
        endDate: edu.endDate?.trim() || '',
        gpa: edu.gpa?.toString().trim() || '',
        current: !edu.endDate || edu.endDate.toLowerCase().includes('present'),
        status: 'visible',
        location: edu.location?.trim() || '',
      }));
    }

    // Add skills with validation
    if (Array.isArray(parsedData.skills)) {
      resume.sections.skills.items = parsedData.skills.map(skill => ({
        id: uuidv4(),
        name: skill.name?.trim() || '',
        level: ['Beginner', 'Intermediate', 'Advanced', 'Expert'].includes(
          skill.level,
        )
          ? skill.level
          : 'Intermediate',
        keywords: skill.keywords || [],
      }));
    }

    // Add projects with validation
    if (Array.isArray(parsedData.projects)) {
      resume.sections.projects.items = parsedData.projects.map(project => ({
        id: uuidv4(),
        name: project.name?.trim() || '',
        description: project.description?.trim() || '',
        url: project.url?.trim() || '',
        links: [],
        startDate: project.startDate?.trim() || '',
        endDate: project.endDate?.trim() || '',
        status: 'visible',
        current:
          !project.endDate || project.endDate.toLowerCase().includes('present'),
      }));
    }

    // Add certifications with validation
    if (Array.isArray(parsedData.certifications)) {
      resume.sections.certifications.items = parsedData.certifications.map(
        cert => ({
          id: uuidv4(),
          name: cert.name?.trim() || '',
          authority: cert.authority?.trim() || '',
          certificationUrlOrCode: cert.certificationUrl?.trim() || '',
          description: cert.description?.trim() || '',
          date: cert.date?.trim() || '',
        }),
      );
    }
    // console.log(' convertToResumeFormat [AI] Resume structure:', resume);

    return resume;
  } catch (error) {
    Sentry.captureException(error, {
      tags: {
        component: 'resumeParser',
        action: 'format_conversion',
      },
      extra: {
        parsedDataKeys: Object.keys(parsedData || {}),
      },
    });
    throw new Error('Failed to convert resume data to the required format');
  }
};
