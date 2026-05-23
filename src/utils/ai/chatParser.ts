import {AIService} from '@/services/ai';
import {v4 as uuidv4} from 'uuid';

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
    
    IMPORTANT RULE: If and ONLY IF you have collected enough information to complete the section, you MUST output a valid JSON code block enclosed in \`\`\`json and \`\`\`. 
    Do not output JSON until you have enough info. If you need more info, reply conversationally without JSON.
    `;

    const aiService = AIService.getInstance();
    const result = await aiService.execute<string>({
      prompt,
      type: 'text',
      context,
    });

    if (!result || !result.data) {
      throw new Error('Failed to get response from AI model');
    }

    return result.data;
  } catch (error) {
    console.error('Error processing chat message:', error);
    throw error instanceof Error
      ? error
      : new Error('Failed to process message with AI');
  }
};

export const formatSectionData = (section: Section, data: any) => {
  try {
    switch (section) {
      case 'basics':
        return {
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

      case 'work':
        if (Array.isArray(data)) {
          return data.map(work => ({
            company: work.company?.trim() || '',
            position: work.position?.trim() || '',
            location: work.location?.trim() || '',
            startDate: work.startDate?.trim() || '',
            endDate: work.endDate?.trim() || '',
            current: !work.endDate || work.endDate.toLowerCase().includes('present'),
            description: work.description?.trim() || '',
            status: 'visible',
            keywords: work.keywords || [],
          }));
        }
        return [];

      case 'education':
        if (Array.isArray(data)) {
          return data.map(edu => ({
            institution: edu.institution?.trim() || '',
            degree: edu.degree?.trim() || '',
            major: edu.major?.trim() || '',
            location: edu.location?.trim() || '',
            startDate: edu.startDate?.trim() || '',
            endDate: edu.endDate?.trim() || '',
            gpa: edu.gpa?.trim() || '',
            current: !edu.endDate || edu.endDate.toLowerCase().includes('present'),
            status: 'visible',
          }));
        }
        return [];

      case 'skills':
        if (Array.isArray(data)) {
          return data.map(skill => ({
            name: skill.name?.trim() || '',
            level: skill.level || 3,
            keywords: skill.keywords || [],
            status: 'visible',
          }));
        }
        return [];
        
      case 'projects':
        if (Array.isArray(data)) {
          return data.map(proj => ({
            name: proj.name?.trim() || '',
            description: proj.description?.trim() || '',
            startDate: proj.startDate?.trim() || '',
            endDate: proj.endDate?.trim() || '',
            url: proj.url?.trim() || '',
            keywords: proj.keywords || [],
            status: 'visible',
          }));
        }
        return [];

      case 'certifications':
        if (Array.isArray(data)) {
          return data.map(cert => ({
            name: cert.name?.trim() || '',
            issuer: cert.issuer?.trim() || '',
            date: cert.date?.trim() || '',
            url: cert.url?.trim() || '',
            status: 'visible',
          }));
        }
        return [];

      default:
        return data;
    }
  } catch (error) {
    console.error('Error formatting section data:', error);
    throw new Error('Failed to format section data');
  }
};
