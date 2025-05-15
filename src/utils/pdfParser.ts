import * as PDFJS from 'pdfjs-dist';

// Initialize PDF.js worker
PDFJS.GlobalWorkerOptions.workerSrc = 'pdfjs-dist/build/pdf.worker.js';

interface ParsedContent {
  text: string;
  metadata: any;
}

// Main PDF parsing function
export const parsePDF = async (pdfPath: string): Promise<ParsedContent> => {
  try {
    const pdf = await PDFJS.getDocument(pdfPath).promise;
    const numPages = pdf.numPages;
    let fullText = '';

    // Extract text from all pages
    for (let i = 1; i <= numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items.map((item: any) => item.str).join(' ');
      fullText += pageText + '\n';
    }

    // Get document metadata
    const metadata = await pdf.getMetadata();

    return {
      text: fullText,
      metadata: metadata.info,
    };
  } catch (error) {
    console.error('Error parsing PDF:', error);
    throw new Error('Failed to parse PDF file');
  }
};

// Convert parsed content to resume structure
export const convertToResumeStructure = (
  parsedContent: ParsedContent,
): Partial<Resume> => {
  const {text} = parsedContent;

  // Basic structure for resume data
  const resumeData: Partial<Resume> = {
    basics: extractBasicInfo(text),
    sections: {
      work: extractWorkExperience(text),
      education: extractEducation(text),
      skills: extractSkills(text),
    },
  };

  return resumeData;
};

// Helper functions to extract specific sections
const extractBasicInfo = (text: string): Partial<Basics> => {
  // Basic pattern matching for contact information
  const emailPattern = /[\w.-]+@[\w.-]+\.[\w.-]+/g;
  const phonePattern = /\+?[1-9][0-9]{9,14}/g;

  const email = text.match(emailPattern)?.[0] || '';
  const phone = text.match(phonePattern)?.[0] || '';

  // Extract name (assuming it's at the beginning)
  const possibleName = text.split('\n')[0].trim();

  return {
    name: possibleName,
    email,
    phone,
  };
};

const extractWorkExperience = (text: string): Section<WorkItem> => {
  return {
    visible: true,
    items: [],
  };
};

const extractEducation = (text: string): Section<EducationItem> => {
  return {
    visible: true,
    items: [],
  };
};

const extractSkills = (text: string): Section<SkillItem> => {
  return {
    visible: true,
    items: [],
  };
};
