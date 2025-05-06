import {GoogleGenAI} from '@google/genai';
import {GOOGLE_GEMINI_API_KEY} from '@/utils/apiKeys';
import {extractJsonFromCodeBlock} from '@/utils/regex';
import {RESUME_PARSE_PROMPT} from './prompts';
import {v4 as uuidv4} from 'uuid';
import {createInitialResume} from '@/types/common/resume.types';

// Initialize Google GenAI with API key
const genAI = new GoogleGenAI({apiKey: GOOGLE_GEMINI_API_KEY});

// Function to parse resume text using Gemini AI
export const parseResumeWithAI = async (resumeText: string) => {
  try {
    const prompt = RESUME_PARSE_PROMPT.replace('{{resumeText}}', resumeText);

    const result = await genAI.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });

    if (!result || !result.text) {
      throw new Error('Failed to get response from AI model');
    }

    try {
      console.log('[AI] AI response:', result.text);
      const parsedData = extractJsonFromCodeBlock(result.text);
      console.log('[AI] Parsed AI response:', parsedData);
      return parsedData;
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      throw new Error('Failed to parse AI response as JSON');
    }
  } catch (error) {
    console.error('Error parsing resume with AI:', error);
    throw error instanceof Error
      ? error
      : new Error('Failed to parse resume with AI');
  }
};

// Function to convert parsed AI data to our Resume structure
export const convertToResumeFormat = (parsedData: any) => {
  try {
    const resume = createInitialResume();
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
        keywords: work.keywords || [],
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
        keywords: [],
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
        keywords: project.keywords || [],
      }));
    }

    // Add certifications with validation
    if (Array.isArray(parsedData.certifications)) {
      resume.sections.certifications.items = parsedData.certifications.map(
        cert => ({
          id: uuidv4(),
          name: cert.name?.trim() || '',
          authority: cert.authority?.trim() || '',
          certificationUrlOrCode: cert.certificationUrlOrCode?.trim() || '',
          description: cert.description?.trim() || '',
          date: cert.date?.trim() || '',
          keywords: [],
        }),
      );
    }
    console.log(' convertToResumeFormat [AI] Resume structure:', resume);

    return resume;
  } catch (error) {
    console.error('Error converting resume format:', error);
    throw new Error('Failed to convert resume data to the required format');
  }
};
