import {getAvailableIcons} from '@/templates/icons';

// AI prompts for resume parsing
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
      "description": "Job description in HTML format using <ul>, <li>, <strong>, <em> tags for structured content"
      "keywords": ["Related keywords or technologies"]
    }],
    "education": [{
      "institution": "School/University name",
      "degree": "Degree name and major",
      "startDate": "Start date in YYYY-MM format",
      "endDate": "End date in YYYY-MM format or 'Present'",
      "gpa": "GPA if available",
      "current": "boolean indicating if currently studying",
      "location": "Institution location"
    }],
    "skills": [{
      "name": "Category name (e.g., 'Frontend Development', 'Backend Development', 'DevOps', 'Programming Languages', 'Database Technologies', 'UI/UX Design', 'Testing & Quality Assurance')",
      "level": "One of: beginner, intermediate, advanced, expert",
      "keywords": ["List of specific technologies, frameworks, or skills that belong to this category. For example, for 'Frontend Development': 'HTML5', 'CSS3', 'JavaScript', 'React', 'Vue.js', etc."]
    }],
    "projects": [{
      "name": "Project name",
      "description": "Project description in HTML format using <ul>, <li>, <strong>, <em> tags for structured content",
      "startDate": "Start date in YYYY-MM format",
      "endDate": "End date in YYYY-MM format or 'Present'",
      "current": "boolean indicating if project is ongoing",
      "links": [{
        "label": "Link description (e.g., 'GitHub', 'Live Demo')",
        "url": "Full URL to the project resource"
      }]
    "keywords": ["Related keywords or technologies"]
    }],
    "certifications": [{
      "name": "Certification name",
      "authority": "Issuing organization",
      "date": "Issue date in YYYY-MM format",
      "certificationUrlOrCode": "Verification URL or certificate ID",
    }]
  }

  Resume text to parse:
  {{resumeText}}

  Return ONLY a valid JSON object without any explanations or markdown. Ensure all HTML formatting is properly closed and nested.
`;
