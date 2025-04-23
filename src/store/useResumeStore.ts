import {create} from 'zustand';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {mockResumeData} from '../assets/resume_mock_data';

// Type definitions -----------------------------------------------------------
interface Metadata {
  id: string;
  templateId: string;
  version: string;
  createdAt: string;
  updatedAt: string;
}

interface Basics {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  website: string;
  summary: string;
}

interface WorkItem {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  highlights: string[];
}

interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

interface SkillItem {
  id: string;
  name: string;
  level: string;
  keywords: string[];
}

interface ProjectItem {
  id: string;
  name: string;
  description: string;
  url: string;
  highlights: string[];
}

interface CustomSectionItem {
  id: string;
  [key: string]: any;
}

interface Section<T> {
  type: string;
  visible: boolean;
  items: T[];
}

interface Settings {
  atsOptimized: boolean;
  font: string;
  theme: 'light' | 'dark';
  language: string;
}

interface ResumeState {
  metadata: Metadata;
  basics: Basics;
  sections: {
    work: Section<WorkItem>;
    education: Section<EducationItem>;
    skills: Section<SkillItem>;
    projects: Section<ProjectItem>;
    customSections: Section<CustomSectionItem>[];
  };
  settings: Settings;

  // Actions ----------------------------------------------------------------
  updateMetadata: (metadata: Partial<Metadata>) => void;
  updateBasics: (basics: Partial<Basics>) => void;

  // Work Experience
  addWorkExperience: (experience: Omit<WorkItem, 'id'>) => void;
  updateWorkExperience: (id: string, experience: Partial<WorkItem>) => void;
  removeWorkExperience: (id: string) => void; // New function
  toggleWorkVisibility: (visible: boolean) => void;

  // Education
  addEducation: (education: Omit<EducationItem, 'id'>) => void;
  updateEducation: (id: string, education: Partial<EducationItem>) => void;
  removeEducation: (id: string) => void; // New function
  toggleEducationVisibility: (visible: boolean) => void;

  // Skills
  addSkill: (skill: Omit<SkillItem, 'id'>) => void;
  updateSkill: (id: string, skill: Partial<SkillItem>) => void;
  removeSkill: (id: string) => void; // New function
  toggleSkillsVisibility: (visible: boolean) => void;

  // Projects
  addProject: (project: Omit<ProjectItem, 'id'>) => void;
  updateProject: (id: string, project: Partial<ProjectItem>) => void;
  removeProject: (id: string) => void; // New function
  toggleProjectsVisibility: (visible: boolean) => void;

  // Custom Sections
  addCustomSection: (
    section: Omit<Section<CustomSectionItem>, 'type' | 'items'>,
  ) => void;
  updateCustomSection: (
    index: number,
    section: Partial<Section<CustomSectionItem>>,
  ) => void;
  removeCustomSection: (index: number) => void; // New function
  toggleCustomSectionVisibility: (index: number, visible: boolean) => void;

  // Settings
  updateSettings: (settings: Partial<Settings>) => void;
}

// Initial State -------------------------------------------------------------
// @ts-ignore
const initialState: ResumeState = {
  metadata: {
    id: uuidv4(),
    templateId: 'classic_1',
    version: '1.0',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  basics: {
    name: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    website: '',
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
    customSections: [],
  },
  settings: {
    atsOptimized: true,
    font: 'Arial',
    theme: 'light',
    language: 'en',
  },
};

// Store Implementation ------------------------------------------------------
export const useResumeStore = create<ResumeState>(set => ({
  ...mockResumeData,

  updateMetadata: metadata =>
    set(state => ({
      metadata: {
        ...state.metadata,
        ...metadata,
        updatedAt: new Date().toISOString(),
      },
    })),

  updateBasics: basics =>
    set(state => ({
      basics: {...state.basics, ...basics},
      metadata: {...state.metadata, updatedAt: new Date().toISOString()},
    })),

  // Work Experience Actions
  addWorkExperience: experience =>
    set(state => ({
      sections: {
        ...state.sections,
        work: {
          ...state.sections.work,
          items: [...state.sections.work.items, {...experience, id: uuidv4()}],
        },
      },
      metadata: {...state.metadata, updatedAt: new Date().toISOString()},
    })),

  updateWorkExperience: (id, experience) =>
    set(state => ({
      sections: {
        ...state.sections,
        work: {
          ...state.sections.work,
          items: state.sections.work.items.map(item =>
            item.id === id ? {...item, ...experience} : item,
          ),
        },
      },
      metadata: {...state.metadata, updatedAt: new Date().toISOString()},
    })),

  removeWorkExperience: id =>
    set(state => ({
      sections: {
        ...state.sections,
        work: {
          ...state.sections.work,
          items: state.sections.work.items.filter(item => item.id !== id),
        },
      },
      metadata: {...state.metadata, updatedAt: new Date().toISOString()},
    })),

  toggleWorkVisibility: visible =>
    set(state => ({
      sections: {
        ...state.sections,
        work: {...state.sections.work, visible},
      },
    })),

  // Education Actions (similar pattern for other sections)
  addEducation: education =>
    set(state => ({
      sections: {
        ...state.sections,
        education: {
          ...state.sections.education,
          items: [
            ...state.sections.education.items,
            {...education, id: uuidv4()},
          ],
        },
      },
      metadata: {...state.metadata, updatedAt: new Date().toISOString()},
    })),

  updateEducation: (id, education) =>
    set(state => ({
      sections: {
        ...state.sections,
        education: {
          ...state.sections.education,
          items: state.sections.education.items.map(item =>
            item.id === id ? {...item, ...education} : item,
          ),
        },
      },
      metadata: {...state.metadata, updatedAt: new Date().toISOString()},
    })),

  removeEducation: id =>
    set(state => ({
      sections: {
        ...state.sections,
        education: {
          ...state.sections.education,
          items: state.sections.education.items.filter(item => item.id !== id),
        },
      },
      metadata: {...state.metadata, updatedAt: new Date().toISOString()},
    })),

  toggleEducationVisibility: visible =>
    set(state => ({
      sections: {
        ...state.sections,
        education: {...state.sections.education, visible},
      },
    })),

  // Skills Actions
  addSkill: skill =>
    set(state => ({
      sections: {
        ...state.sections,
        skills: {
          ...state.sections.skills,
          items: [...state.sections.skills.items, {...skill, id: uuidv4()}],
        },
      },
      metadata: {...state.metadata, updatedAt: new Date().toISOString()},
    })),

  updateSkill: (id, skill) =>
    set(state => ({
      sections: {
        ...state.sections,
        skills: {
          ...state.sections.skills,
          items: state.sections.skills.items.map(item =>
            item.id === id ? {...item, ...skill} : item,
          ),
        },
      },
      metadata: {...state.metadata, updatedAt: new Date().toISOString()},
    })),

  removeSkill: id =>
    set(state => ({
      sections: {
        ...state.sections,
        skills: {
          ...state.sections.skills,
          items: state.sections.skills.items.filter(item => item.id !== id),
        },
      },
      metadata: {...state.metadata, updatedAt: new Date().toISOString()},
    })),

  toggleSkillsVisibility: visible =>
    set(state => ({
      sections: {
        ...state.sections,
        skills: {...state.sections.skills, visible},
      },
    })),

  // Projects Actions
  addProject: project =>
    set(state => ({
      sections: {
        ...state.sections,
        projects: {
          ...state.sections.projects,
          items: [...state.sections.projects.items, {...project, id: uuidv4()}],
        },
      },
      metadata: {...state.metadata, updatedAt: new Date().toISOString()},
    })),

  updateProject: (id, project) =>
    set(state => ({
      sections: {
        ...state.sections,
        projects: {
          ...state.sections.projects,
          items: state.sections.projects.items.map(item =>
            item.id === id ? {...item, ...project} : item,
          ),
        },
      },
      metadata: {...state.metadata, updatedAt: new Date().toISOString()},
    })),

  removeProject: id =>
    set(state => ({
      sections: {
        ...state.sections,
        projects: {
          ...state.sections.projects,
          items: state.sections.projects.items.filter(item => item.id !== id),
        },
      },
      metadata: {...state.metadata, updatedAt: new Date().toISOString()},
    })),

  toggleProjectsVisibility: visible =>
    set(state => ({
      sections: {
        ...state.sections,
        projects: {...state.sections.projects, visible},
      },
    })),

  // Custom Sections Actions
  addCustomSection: section =>
    set(state => ({
      sections: {
        ...state.sections,
        customSections: [
          ...state.sections.customSections,
          {
            ...section,
            type: 'custom',
            items: [],
            visible: true,
          },
        ],
      },
    })),

  updateCustomSection: (index, section) =>
    set(state => ({
      sections: {
        ...state.sections,
        customSections: state.sections.customSections.map((sec, i) =>
          i === index ? {...sec, ...section} : sec,
        ),
      },
    })),

  removeCustomSection: index =>
    set(state => ({
      sections: {
        ...state.sections,
        customSections: state.sections.customSections.filter(
          (_, i) => i !== index,
        ),
      },
    })),

  toggleCustomSectionVisibility: (index, visible) =>
    set(state => ({
      sections: {
        ...state.sections,
        customSections: state.sections.customSections.map((sec, i) =>
          i === index ? {...sec, visible} : sec,
        ),
      },
    })),

  // Settings Actions
  updateSettings: settings =>
    set(state => ({
      settings: {...state.settings, ...settings},
      metadata: {...state.metadata, updatedAt: new Date().toISOString()},
    })),
}));
