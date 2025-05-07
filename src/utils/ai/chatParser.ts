import {createInitialResume} from '@/types';
import {GOOGLE_GEMINI_API_KEY} from '@/utils/apiKeys';
import {GoogleGenAI} from '@google/genai';
import {v4 as uuidv4} from 'uuid';

// Initialize Google GenAI with API key
const genAI = new GoogleGenAI({apiKey: GOOGLE_GEMINI_API_KEY});

type Section =
  | 'basics'
  | 'work'
  | 'education'
  | 'skills'
  | 'projects'
  | 'certifications';

const SECTION_PROMPTS = {
  basics: `Please help me gather basic information. I'll ask about:
  - Full name
  - Email address
  - Phone number
  - Location
  - Professional summary
  - Social media profiles
  
  What's your name to start with?`,

  work: `Let's add your work experience. For each position, I'll need:
  - Company name
  - Job title
  - Location
  - Start and end dates
  - Key responsibilities and achievements
  
  What was your most recent job?`,

  education: `Now for your education history. For each entry, I'll ask about:
  - Institution name
  - Degree and major
  - Graduation date or expected completion
  - GPA (if applicable)
  - Location
  
  Where did you complete your most recent education?`,

  skills: `Let's list your skills. I'll help categorize them into:
  - Technical skills
  - Soft skills
  - Tools and technologies
  - Languages
  
  What are your main technical skills?`,

  projects: `Tell me about your projects. For each one, I'll ask about:
  - Project name
  - Description
  - Technologies used
  - Your role
  - Key achievements
  
  What's a significant project you've worked on?`,

  certifications: `Let's add your certifications. For each one, I'll need:
  - Certification name
  - Issuing organization
  - Date received
  - Credential ID or URL
  
  What certifications do you have?`,
};

export const getInitialPrompt = (section: Section): string => {
  return SECTION_PROMPTS[section] || 'How can I help you with your resume?';
};

export const processChatMessage = async (
  message: string,
  section: Section,
  context: string = '',
) => {
  try {
    const prompt = `You are a helpful AI assistant creating a resume. You are currently helping with the ${section} section.
    Previous context: ${context}
    User message: ${message}
    
    Please provide a natural, conversational response that helps gather the necessary information for this section.
    Keep the conversation flowing naturally while ensuring you collect all required details.
    If you have enough information, format it as JSON. Otherwise, ask for more details.
    `;

    const result = await genAI.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });

    if (!result || !result.text) {
      throw new Error('Failed to get response from AI model');
    }

    return result.text;
  } catch (error) {
    console.error('Error processing chat message:', error);
    throw error instanceof Error
      ? error
      : new Error('Failed to process message with AI');
  }
};

export const formatSectionData = (section: Section, data: any) => {
  try {
    const resume = createInitialResume();
    const currentDate = new Date().toISOString();

    switch (section) {
      case 'basics':
        resume.basics = {
          ...resume.basics,
          name: data.name?.trim() || '',
          email: data.email?.trim() || '',
          phone: data.phone?.trim() || '',
          location: data.location?.trim() || '',
          summary: data.summary?.trim() || '',
          socials:
            data.socials?.map((social: any) => ({
              id: uuidv4(),
              label: social.label?.trim() || '',
              url: social.url?.trim() || '',
              icon: social.icon?.trim() || '',
            })) || [],
        };
        break;

      case 'work':
        if (Array.isArray(data)) {
          resume.sections.work.items = data.map(work => ({
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
        break;

      // Add similar cases for other sections
    }

    return resume;
  } catch (error) {
    console.error('Error formatting section data:', error);
    throw new Error('Failed to format section data');
  }
};
