import {GOOGLE_GEMINI_API_KEY} from '@/utils/apiKeys';
import {extractHtmlFromCodeBlock} from '@/utils/regex';
import {GoogleGenAI} from '@google/genai';
import {ContentType} from './RichTextEditorScreen.types';

const genAI = new GoogleGenAI({apiKey: GOOGLE_GEMINI_API_KEY});

export const generateAIContent = async (
  contentType: ContentType,
  activeResume: any,
  initialContent: string,
  additionalContext: string = '', // Added parameter for additional context
  itemId?: string,
) => {
  try {
    let prompt = '';

    prompt = getContentPrompt(
      contentType,
      activeResume,
      additionalContext,
      initialContent,
      itemId,
    );
    if (!prompt) {
      return '';
    }
    console.log('prompt', prompt);
    const result = await genAI.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });
    console.log('result', result.text);
    return extractHtmlFromCodeBlock(result?.text ?? '') ?? '';
  } catch (error) {
    console.error('Error generating AI content:', error);
    return '';
  }
};

export const getInitialContent = (
  activeResume: Resume,
  contentType: ContentType,
  itemId?: string,
) => {
  if (!activeResume) {
    return '';
  }

  switch (contentType) {
    case 'professional_summary':
      return activeResume.basics.summary ?? '';
    case 'project_description':
      return (
        activeResume.sections.projects?.items.find(item => item.id === itemId)
          ?.description ?? ''
      );
    case 'work_description':
      return (
        activeResume.sections.work.items.find(item => item.id === itemId)
          ?.description ?? ''
      );
    case 'reference_description':
      return (
        activeResume.sections.references.items.find(item => item.id === itemId)
          ?.referenceText ?? ''
      );
    default:
      return '';
  }
};

export const getContentPrompt = (
  contentType: ContentType,
  activeResume: Resume,
  additionalContext: string,
  initialContent: string,
  itemId?: string,
) => {
  let prompt = '';
  let context = '';
  switch (contentType) {
    case 'professional_summary':
      context = `Name: ${
        activeResume.basics.name
      }\nSkills: ${activeResume.sections.skills.items
        .map((s: any) => s.name)
        .join(', ')}\nWork Experience: ${activeResume.sections.work.items
        .map((w: any) => w.position + ' at ' + w.company)
        .join(', ')}\nExisting Summary: ${initialContent}`;

      // Add additional context if provided
      if (additionalContext) {
        context += `\nAdditional Context: ${additionalContext}`;
      }

      prompt = `You are a professional resume writer. Create a concise professional summary (3-4 lines max) using this context: ${context}. Focus on:
    - Core competencies matching job requirements
    - Years of experience in primary field
    - Key career achievements/metrics
    - Industry-specific expertise
    ${
      initialContent
        ? 'Refine existing summary, remove fluff, and strengthen impact.'
        : ''
    }
    Format as Html. Use serial commas and avoid pronouns. Example:
    "<p>Full-stack developer with 5+ years experience building scalable web applications...</p>"`;
      break;

    case 'work_description':
      const workItem = activeResume.sections.work.items.find(
        (item: any) => item.id === itemId,
      );
      if (workItem) {
        context = `Position: ${workItem.position}\nCompany: ${
          workItem.company
        }\nDuration: ${workItem.startDate} to ${
          workItem.endDate || 'Present'
        }\nSkills: ${activeResume.sections.skills.items
          .map((s: any) => s.name)
          .join(', ')}\nExisting Description: ${initialContent}`;

        // Add additional context if provided
        if (additionalContext) {
          context += `\nAdditional Context: ${additionalContext}`;
        }

        prompt = `As a resume expert, generate 4-5 STRONG bullet points for this role: ${context}. Follow:
    1. Start with action verbs (Led, Engineered, Optimized)
    2. Focus on quantifiable achievements (not duties)
    3. Include technical specifics and business impact
    4. Prioritize metrics (% improvements, $ amounts, time savings)
    5. Remove generic statements
    ${initialContent ? 'Revise existing bullets to meet above criteria' : ''}
    Format as HTML: <ul> with <li> bullets. Only use <strong> for numbers/metrics. Example:
    <li>Increased conversion rates by 40% through <strong>React performance optimization</strong></li>`;
      }
      break;

    case 'project_description':
      const projectItem = activeResume.sections.projects.items.find(
        (item: any) => item.id === itemId,
      );
      if (projectItem) {
        context = `Project: ${projectItem.name}\nDuration: ${
          projectItem.startDate
        } to ${
          projectItem.endDate || 'Present'
        }\nExisting Description: ${initialContent}`;

        // Add additional context if provided
        if (additionalContext) {
          context += `\nAdditional Context: ${additionalContext}`;
        }

        prompt = `Create 4 technical bullet points for this project: ${context} with each 1 or 2 lines. Include:
    - Challenge faced and technical solution
    - Specific tools/tech used (include versions if relevant)
    - Measurable outcome or performance gains
    - Team role and collaboration aspects
    Format as HTML: <ul> with <li>. Use <strong> for technologies and metrics. Example:
    <li>Developed <strong>Python ETL pipeline</strong> reducing data processing time by 65%</li>
    if the project has skills then give like in this format <strong >Skills</strong> : skill1,skill2 and .. in appropriate format
  
    if the user has given no context , then just simply return standard bulleted points for any role or responsibilities
    `;
      }
      break;

    case 'reference_description':
      const referenceItem = activeResume.sections.references.items.find(
        (item: any) => item.id === itemId,
      );
      if (referenceItem) {
        context = `Reference Name: ${referenceItem.name}\nCompany: ${referenceItem.company}\nExisting Reference Text: ${initialContent}`;

        // Add additional context if provided
        if (additionalContext) {
          context += `\nAdditional Context: ${additionalContext}`;
        }

        prompt = `Write a concise reference description for this person: ${context}. Include:
    - Their role and relationship to you
    - Key strengths or contributions
    - Specific examples of their impact
    - Any notable achievements or qualities
    Format as HTML: <p> for paragraphs. Example:
    <p>John was an exceptional team member, consistently delivering high-quality work...</p>`;
      }
      break;
  }
  return prompt;
};
