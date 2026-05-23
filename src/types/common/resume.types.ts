import {v4 as uuidv4} from 'uuid';

export const createInitialResume = () => ({
  settings: {
    atsOptimized: true,
    theme: 'dark',
    language: 'en',
    font: {
      family: 'sans-serif',
      size: 16,
      lineSpacing: 1.2,
    },
    dateFormat: 'dd/mm/yyyy',
  },
  metadata: {
    id: uuidv4(),
    templateId: 'professional',
    version: '1.0',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    sectionOrder: [
      'personal',
      'work',
      'education',
      'skills',
      'projects',
      'certifications',
    ],
  },
  basics: {
    name: '',
    email: '',
    phone: '',
    location: '',

    socials: [],
    summary: '',
  },
  sections: {
    work: {
      type: 'work',
      visible: true,
      items: [],
    },
    education: {
      type: 'education',
      visible: true,
      items: [],
    },
    skills: {
      type: 'skills',
      visible: true,
      items: [],
    },
    projects: {
      type: 'projects',
      visible: true,
      items: [],
    },
    certifications: {
      type: 'certifications',
      visible: true,
      items: [],
    },
    hobbies: {
      type: 'hobbies',
      visible: true,
      items: [],
    },
    strengths: {
      type: 'strengths',
      visible: true,
      items: [],
    },
    references: {
      type: 'references',
      visible: true,
      items: [],
    },
    languages: {
      type: 'languages',
      visible: true,
      items: [],
    },
    awards: {
      type: 'awards',
      visible: true,
      items: [],
    },
    publications: {
      type: 'awards',
      visible: true,
      items: [],
    },
    volunteering: {
      type: 'volunteering',
      visible: true,
      items: [],
    },
    customSections: [],
  },
});
