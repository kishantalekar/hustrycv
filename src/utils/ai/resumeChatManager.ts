// import {GOOGLE_GEMINI_API_KEY} from '@/utils/apiKeys';
// import {GoogleGenAI} from '@google/genai';

// const genAI = new GoogleGenAI({apiKey: GOOGLE_GEMINI_API_KEY});

// type ChatState = {
//   currentSection: Section;
//   collectedData: Partial<Resume>;
//   context: string;
// };

// const SECTION_PROMPTS = {
//   basics: `I'll help you create your resume. Let's start with your basic information:
//   - Full name
//   - Email address
//   - Phone number
//   - Location
//   - Professional summary
//   What's your name to start with?`,

//   work: `Let's add your work experience. For each position, I need:
//   - Company name
//   - Job title
//   - Location
//   - Start and end dates
//   - Key responsibilities
//   What was your most recent position?`,

//   education: `Now for your education. For each entry, I need:
//   - Institution name
//   - Degree/Major
//   - Graduation date
//   - GPA (if applicable)
//   Where did you study?`,

//   skills: `Let's list your skills. Consider:
//   - Technical skills
//   - Soft skills
//   - Tools and technologies
//   What are your main technical skills?`,

//   projects: `Tell me about your projects. For each one:
//   - Project name
//   - Description
//   - Technologies used
//   - Your role
//   What's a significant project you've worked on?`,

//   certifications: `Let's add your certifications. For each one:
//   - Certification name
//   - Issuing organization
//   - Date received
//   What certifications do you have?`,
// };

// export class ResumeChatManager {
//   private state: ChatState;

//   constructor() {
//     this.state = {
//       currentSection: 'basics',
//       collectedData: {},
//       context: '',
//     };
//   }

//   private updateContext(userMessage: string, aiResponse: string) {
//     this.state.context += `\nUser: ${userMessage}\nAI: ${aiResponse}`;
//   }

//   private getPromptForSection(section: Section): string {
//     return SECTION_PROMPTS[section] || 'How can I help with your resume?';
//   }

//   async processMessage(message: string): Promise<string> {
//     try {
//       const prompt = `You are an AI assistant helping create a resume. Currently working on the ${this.state.currentSection} section.
//       Previous context: ${this.state.context}
//       User message: ${message}

//       Provide a natural, conversational response to help gather information.
//       When you have sufficient details, store them and move to the next appropriate section.
//       If you need more information, ask specific questions to gather missing details.`;

//       const result = await genAI.models.generateContent({
//         model: 'gemini-2.0-flash',
//         contents: prompt,
//       });

//       if (!result || !result.text) {
//         throw new Error('Failed to get AI response');
//       }

//       const response = result.text;
//       this.updateContext(message, response);

//       // Process response and update state if needed
//       this.processResponse(response);

//       return response;
//     } catch (error) {
//       console.error('Error processing message:', error);
//       return 'I encountered an error. Please try again.';
//     }
//   }

//   private processResponse(response: string) {
//     // TODO: Implement logic to:
//     // 1. Extract structured data from response when available
//     // 2. Update collectedData with new information
//     // 3. Determine if current section is complete
//     // 4. Move to next section if appropriate
//   }

//   getCollectedData(): Partial<Resume> {
//     return this.state.collectedData;
//   }

//   getCurrentSection(): Section {
//     return this.state.currentSection;
//   }

//   setCurrentSection(section: Section) {
//     this.state.currentSection = section;
//   }
// }
