import AsyncStorage from '@react-native-async-storage/async-storage';
import {Settings} from 'react-native';
import 'react-native-get-random-values';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {
  createCertificationsSlice,
  createCustomSectionSlice,
  createEducationSlice,
  createProjectsSlice,
  createSkillsSlice,
  createWorkSlice,
} from './management';
import {createResumeSlice} from './slices/resumeSlice';

export interface ResumeState {
  resumes: Resume[];
  activeResumeId: string;
  settings: Settings;

  getActiveResume: () => Resume;
  setActiveResume: (id: string) => void;
  addResume: (newResume: Resume) => string;
  deleteResume: (id: string) => void;
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

// const initialState = [updatedMockResumeData];

// Store Implementation ------------------------------------------------------
export const useResumeStore = create<ResumeState>()(
  persist(
    (set, get) => ({
      resumes: [],
      activeResumeId: '',

      settings: {
        atsOptimized: true,
        font: 'Arial',
        theme: 'light',
        language: 'en',
      },
      // Helper function to get active resume
      ...createResumeSlice(set, get),
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
      ...createWorkSlice(set),
      // // Education Actions
      ...createEducationSlice(set),
      // Skills Actions
      ...createSkillsSlice(set),
      // Projects Actions
      ...createProjectsSlice(set),
      // Custom Sections Actions
      ...createCustomSectionSlice(set),
      // Certifications Actions
      ...createCertificationsSlice(set),
      // Settings Actions
      updateSettings: settings =>
        set(state => ({
          settings: {...state.settings, ...settings},
        })),
    }),
    {
      name: 'resume-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({
        resumes: state.resumes,
        activeResumeId: state.activeResumeId,
        settings: state.settings,
      }),
    },
  ),
);
