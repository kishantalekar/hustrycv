import {v4 as uuidv4} from 'uuid';
import {create} from 'zustand';
import 'react-native-get-random-values';
import {
  Resume,
  Metadata,
  WorkItem,
  EducationItem,
  SkillItem,
  ProjectItem,
  Section,
  CustomSectionItem,
  Settings,
  CertificateItem,
  Basics,
} from '@/types';
import {
  // marketingResumeData,
  updatedMockResumeData,
  // mockResumeData,
} from '../assets/resume_mock_data';
// https:chat.deepseek.com/a/chat/s/608ca039-1c33-4769-af31-fec567a8ef63 for section up and down schema
// Type definitions -----------------------------------------------------------

interface ResumeState {
  resumes: Resume[];
  activeResumeId: string;
  settings: Settings;

  getActiveResume: () => Resume;
  setActiveResume: (id: string) => void;
  addResume: (newResume: Resume) => void;
  updateResumeTemplateId: (id: string) => void;
  // Actions ----------------------------------------------------------------
  updateMetadata: (metadata: Partial<Metadata>) => void;
  updateBasics: (basics: Partial<Basics>) => void;

  // Work Experience
  addWorkExperience: (experience: Omit<WorkItem, 'id'>) => string;
  updateWorkExperience: (id: string, experience: Partial<WorkItem>) => void;
  removeWorkExperience: (id: string) => void; // New function
  toggleWorkVisibility: (visible: boolean) => void;

  // Education
  addEducation: (education: Omit<EducationItem, 'id'>) => string;
  updateEducation: (id: string, education: Partial<EducationItem>) => void;
  removeEducation: (id: string) => void; // New function
  toggleEducationVisibility: (visible: boolean) => void;

  // Skills
  addSkill: (skill: Omit<SkillItem, 'id'>) => string;
  updateSkill: (id: string, skill: Partial<SkillItem>) => void;
  removeSkill: (id: string) => void; // New function
  toggleSkillsVisibility: (visible: boolean) => void;

  // Projects
  addProject: (project: Omit<ProjectItem, 'id'>) => string;
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

  // Certifications
  addCertification: (certification: Omit<CertificateItem, 'id'>) => string;
  updateCertification: (
    id: string,
    certification: Partial<CertificateItem>,
  ) => void;
  removeCertification: (id: string) => void;
  toggleCertificationVisibility: (visible: boolean) => void;

  // Settings
  updateSettings: (settings: Partial<Settings>) => void;
}

const initialState = [updatedMockResumeData];

// Store Implementation ------------------------------------------------------
export const useResumeStore = create<ResumeState>((set, get) => ({
  resumes: [...initialState],
  activeResumeId: '',

  settings: {
    atsOptimized: true,
    font: 'Arial',
    theme: 'light',
    language: 'en',
  },
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
  updateResumeTemplateId: templateId =>
    set(state => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              metadata: {
                ...resume.metadata,
                templateId,
                updatedAt: new Date().toISOString(),
              },
            }
          : resume,
      ),
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
  addWorkExperience: experience => {
    const newId = uuidv4();
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
                    {...experience, id: newId},
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
    }));
    return newId;
  },

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
  addEducation: education => {
    const newId = uuidv4();
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
                    {...education, id: newId},
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
    }));
    return newId;
  },

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
  addSkill: skill => {
    const newId = uuidv4();
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
                    {...skill, id: newId},
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
    }));
    return newId;
  },

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
  addProject: project => {
    const newId = uuidv4();
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
                    {...project, id: newId},
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
    }));
    return newId;
  },

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

  // Certifications Actions
  addCertification: certification => {
    const newId = uuidv4();
    set(state => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              sections: {
                ...resume.sections,
                certifications: {
                  ...resume.sections.certifications,
                  items: [
                    ...resume.sections.certifications.items,
                    {...certification, id: newId},
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
    }));
    return newId;
  },

  updateCertification: (id, certification) =>
    set(state => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              sections: {
                ...resume.sections,
                certifications: {
                  ...resume.sections.certifications,
                  items: resume.sections.certifications.items.map(item =>
                    item.id === id ? {...item, ...certification} : item,
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

  removeCertification: id =>
    set(state => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              sections: {
                ...resume.sections,
                certifications: {
                  ...resume.sections.certifications,
                  items: resume.sections.certifications.items.filter(
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

  toggleCertificationVisibility: visible =>
    set(state => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              sections: {
                ...resume.sections,
                certifications: {...resume.sections.certifications, visible},
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
