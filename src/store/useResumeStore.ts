import {create} from 'zustand';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {
  extendedMockResumeData,
  mockResumeData,
  // mockResumeData,
} from '../assets/resume_mock_data';
// https:chat.deepseek.com/a/chat/s/608ca039-1c33-4769-af31-fec567a8ef63 for section up and down schema
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

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  url: string;
  highlights: string[];
}

export interface CertificateItem {
  id: string;
  name: string;
  authority: string;
  certificationUrlOrCode: string;
  issueDate: string;
  description: string;
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

export interface Resume {
  metadata: Metadata;
  basics: Basics;
  sections: {
    work: Section<WorkItem>;
    education: Section<EducationItem>;
    skills: Section<SkillItem>;
    projects: Section<ProjectItem>;
    certifications: Section<CertificateItem>;
    customSections: Section<CustomSectionItem>[];
  };
}

interface ResumeState {
  resumes: Resume[];
  activeResumeId: string;
  settings: Settings;

  getActiveResume: () => Resume;
  setActiveResume: (id: string) => void;
  addResume: (newResume: Resume) => void;
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

/**
 *
 * metadata: {
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
    certifications: {
      type: 'certifications',
      visible: true,
      items: [],
    },
    customSections: [],
  },
 *
 */
// Initial State -------------------------------------------------------------
// @ts-ignore
export const createInitialResume = () => ({
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
    certifications: {
      type: 'certifications',
      visible: true,
      items: [],
    },
    customSections: [],
  },
});

const initialState: ResumeState = {
  resumes: [extendedMockResumeData, mockResumeData],
  activeResumeId: uuidv4(),
  settings: {
    atsOptimized: true,
    font: 'Arial',
    theme: 'light',
    language: 'en',
  },
};

// Store Implementation ------------------------------------------------------
export const useResumeStore = create<ResumeState>((set, get) => ({
  ...initialState,
  // Helper function to get active resume
  getActiveResume: () => {
    const state = get();
    return state.resumes.find(
      resume => resume.metadata.id === state.activeResumeId,
    )!;
  },

  // Resume Management
  addResume: (newResume: Resume) =>
    set(state => ({
      resumes: [...state.resumes, newResume],
    })),

  removeResume: (id: string) =>
    set(state => ({
      resumes: state.resumes.filter(resume => resume.metadata.id !== id),
      activeResumeId:
        state.activeResumeId === id
          ? state.resumes[0]?.metadata.id
          : state.activeResumeId,
    })),

  setActiveResume: (id: string) =>
    set({
      activeResumeId: id,
    }),

  updateMetadata: metadata =>
    set(state => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              metadata: {
                ...resume.metadata,
                ...metadata,
                updatedAt: new Date().toISOString(),
              },
            }
          : resume,
      ),
    })),

  updateBasics: basics =>
    set(state => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              basics: {...resume.basics, ...basics},
              metadata: {
                ...resume.metadata,
                updatedAt: new Date().toISOString(),
              },
            }
          : resume,
      ),
    })),

  // Work Experience Actions
  addWorkExperience: experience =>
    set(state => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              sections: {
                ...resume.sections,
                work: {
                  ...resume.sections.work,
                  items: [
                    ...resume.sections.work.items,
                    {...experience, id: uuidv4()},
                  ],
                },
              },
              metadata: {
                ...resume.metadata,
                updatedAt: new Date().toISOString(),
              },
            }
          : resume,
      ),
    })),

  updateWorkExperience: (id, experience) =>
    set(state => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              sections: {
                ...resume.sections,
                work: {
                  ...resume.sections.work,
                  items: resume.sections.work.items.map(item =>
                    item.id === id ? {...item, ...experience} : item,
                  ),
                },
              },
              metadata: {
                ...resume.metadata,
                updatedAt: new Date().toISOString(),
              },
            }
          : resume,
      ),
    })),

  removeWorkExperience: id =>
    set(state => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              sections: {
                ...resume.sections,
                work: {
                  ...resume.sections.work,
                  items: resume.sections.work.items.filter(
                    item => item.id !== id,
                  ),
                },
              },
              metadata: {
                ...resume.metadata,
                updatedAt: new Date().toISOString(),
              },
            }
          : resume,
      ),
    })),

  toggleWorkVisibility: visible =>
    set(state => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              sections: {
                ...resume.sections,
                work: {...resume.sections.work, visible},
              },
            }
          : resume,
      ),
    })),

  // Education Actions
  addEducation: education =>
    set(state => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              sections: {
                ...resume.sections,
                education: {
                  ...resume.sections.education,
                  items: [
                    ...resume.sections.education.items,
                    {...education, id: uuidv4()},
                  ],
                },
              },
              metadata: {
                ...resume.metadata,
                updatedAt: new Date().toISOString(),
              },
            }
          : resume,
      ),
    })),

  updateEducation: (id, education) =>
    set(state => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              sections: {
                ...resume.sections,
                education: {
                  ...resume.sections.education,
                  items: resume.sections.education.items.map(item =>
                    item.id === id ? {...item, ...education} : item,
                  ),
                },
              },
              metadata: {
                ...resume.metadata,
                updatedAt: new Date().toISOString(),
              },
            }
          : resume,
      ),
    })),

  removeEducation: id =>
    set(state => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              sections: {
                ...resume.sections,
                education: {
                  ...resume.sections.education,
                  items: resume.sections.education.items.filter(
                    item => item.id !== id,
                  ),
                },
              },
              metadata: {
                ...resume.metadata,
                updatedAt: new Date().toISOString(),
              },
            }
          : resume,
      ),
    })),

  toggleEducationVisibility: visible =>
    set(state => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              sections: {
                ...resume.sections,
                education: {...resume.sections.education, visible},
              },
            }
          : resume,
      ),
    })),

  // Skills Actions
  addSkill: skill =>
    set(state => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              sections: {
                ...resume.sections,
                skills: {
                  ...resume.sections.skills,
                  items: [
                    ...resume.sections.skills.items,
                    {...skill, id: uuidv4()},
                  ],
                },
              },
              metadata: {
                ...resume.metadata,
                updatedAt: new Date().toISOString(),
              },
            }
          : resume,
      ),
    })),

  updateSkill: (id, skill) =>
    set(state => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              sections: {
                ...resume.sections,
                skills: {
                  ...resume.sections.skills,
                  items: resume.sections.skills.items.map(item =>
                    item.id === id ? {...item, ...skill} : item,
                  ),
                },
              },
              metadata: {
                ...resume.metadata,
                updatedAt: new Date().toISOString(),
              },
            }
          : resume,
      ),
    })),

  removeSkill: id =>
    set(state => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              sections: {
                ...resume.sections,
                skills: {
                  ...resume.sections.skills,
                  items: resume.sections.skills.items.filter(
                    item => item.id !== id,
                  ),
                },
              },
              metadata: {
                ...resume.metadata,
                updatedAt: new Date().toISOString(),
              },
            }
          : resume,
      ),
    })),

  toggleSkillsVisibility: visible =>
    set(state => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              sections: {
                ...resume.sections,
                skills: {...resume.sections.skills, visible},
              },
            }
          : resume,
      ),
    })),

  // Projects Actions
  addProject: project =>
    set(state => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              sections: {
                ...resume.sections,
                projects: {
                  ...resume.sections.projects,
                  items: [
                    ...resume.sections.projects.items,
                    {...project, id: uuidv4()},
                  ],
                },
              },
              metadata: {
                ...resume.metadata,
                updatedAt: new Date().toISOString(),
              },
            }
          : resume,
      ),
    })),

  updateProject: (id, project) =>
    set(state => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              sections: {
                ...resume.sections,
                projects: {
                  ...resume.sections.projects,
                  items: resume.sections.projects.items.map(item =>
                    item.id === id ? {...item, ...project} : item,
                  ),
                },
              },
              metadata: {
                ...resume.metadata,
                updatedAt: new Date().toISOString(),
              },
            }
          : resume,
      ),
    })),

  removeProject: id =>
    set(state => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              sections: {
                ...resume.sections,
                projects: {
                  ...resume.sections.projects,
                  items: resume.sections.projects.items.filter(
                    item => item.id !== id,
                  ),
                },
              },
              metadata: {
                ...resume.metadata,
                updatedAt: new Date().toISOString(),
              },
            }
          : resume,
      ),
    })),

  toggleProjectsVisibility: visible =>
    set(state => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              sections: {
                ...resume.sections,
                projects: {...resume.sections.projects, visible},
              },
            }
          : resume,
      ),
    })),

  // Custom Sections Actions
  addCustomSection: section =>
    set(state => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              sections: {
                ...resume.sections,
                customSections: [
                  ...resume.sections.customSections,
                  {
                    ...section,
                    type: 'custom',
                    items: [],
                    visible: true,
                  },
                ],
              },
              metadata: {
                ...resume.metadata,
                updatedAt: new Date().toISOString(),
              },
            }
          : resume,
      ),
    })),

  updateCustomSection: (index, section) =>
    set(state => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              sections: {
                ...resume.sections,
                customSections: resume.sections.customSections.map((sec, i) =>
                  i === index ? {...sec, ...section} : sec,
                ),
              },
              metadata: {
                ...resume.metadata,
                updatedAt: new Date().toISOString(),
              },
            }
          : resume,
      ),
    })),

  removeCustomSection: index =>
    set(state => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              sections: {
                ...resume.sections,
                customSections: resume.sections.customSections.filter(
                  (_, i) => i !== index,
                ),
              },
              metadata: {
                ...resume.metadata,
                updatedAt: new Date().toISOString(),
              },
            }
          : resume,
      ),
    })),

  toggleCustomSectionVisibility: (index, visible) =>
    set(state => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              sections: {
                ...resume.sections,
                customSections: resume.sections.customSections.map((sec, i) =>
                  i === index ? {...sec, visible} : sec,
                ),
              },
            }
          : resume,
      ),
    })),

  // Settings Actions
  updateSettings: settings =>
    set(state => ({
      settings: {...state.settings, ...settings},
    })),
}));
