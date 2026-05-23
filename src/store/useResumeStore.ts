import AsyncStorage from '@react-native-async-storage/async-storage';
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
import {createHobbiesSlice} from './management/createHobbiesSlice';
import {createLanguageSlice} from './management/languageSlice';
import {createReferencesSlice} from './management/referenceSlice';
import {createStrengthsSlice} from './management/strengthSlice';
import {createResumeSlice} from './slices/resumeSlice';
import {RESUME_STORAGE_KEY} from '@/constants';
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

  // Delete Section
  deleteSection: (type: SectionType) => void;

  // Work Experience
  addWorkExperience: (experience: Omit<WorkItem, 'id'>) => string;
  updateWorkExperience: (id: string, experience: Partial<WorkItem>) => void;
  removeWorkExperience: (id: string) => void; // New function
  toggleWorkVisibility: (visible: boolean) => void;
  updateAllWorkExperiences: (experiences: WorkItem[]) => void; // New method

  // Education
  addEducation: (education: Omit<EducationItem, 'id'>) => string;
  updateEducation: (id: string, education: Partial<EducationItem>) => void;
  updateAllEducation: (education: EducationItem[]) => void; // New method to update all education items in the resume ma
  removeEducation: (id: string) => void; // New function
  toggleEducationVisibility: (visible: boolean) => void;

  // Skills
  addSkill: (skill: Omit<SkillItem, 'id'>) => string;
  updateSkill: (id: string, skill: Partial<SkillItem>) => void;
  updateAllSkills: (skills: SkillItem[]) => void; // New method
  removeSkill: (id: string) => void; // New function
  toggleSkillsVisibility: (visible: boolean) => void;

  // Projects
  addProject: (project: Omit<ProjectItem, 'id'>) => string;
  updateProject: (id: string, project: Partial<ProjectItem>) => void;
  updateAllProjects: (projects: ProjectItem[]) => void; // New method
  removeProject: (id: string) => void; // New function
  toggleProjectsVisibility: (visible: boolean) => void;

  // Hobbies
  addHobbie: (hobbie: Omit<HobbieItem, 'id'>) => string;
  updateHobbie: (id: string, hobbie: Partial<HobbieItem>) => void;
  updateAllHobbies: (hobbies: HobbieItem[]) => void; // New method to update all hobbies in the resume data
  removeHobbie: (id: string) => void; // New function
  toggleHobbiesVisibility: (visible: boolean) => void;

  // Strengths
  addStrength: (Strength: Omit<StrengthItem, 'id'>) => string;
  updateStrength: (id: string, Strength: Partial<StrengthItem>) => void;
  updateAllStrengths: (Strengths: StrengthItem[]) => void; // New method to update all Strengths in the resume data
  removeStrength: (id: string) => void; // New function
  toggleStrengthsVisibility: (visible: boolean) => void;

  //references
  addReference: (Reference: Omit<ReferenceItem, 'id'>) => string;
  updateReference: (id: string, Reference: Partial<ReferenceItem>) => void;
  updateAllReferences: (References: ReferenceItem[]) => void;
  removeReference: (id: string) => void; // New function
  toggleReferencesVisibility: (visible: boolean) => void;

  //languages
  addLanguage: (language: Omit<LanguageItem, 'id'>) => string;
  updateLanguage: (id: string, language: Partial<LanguageItem>) => void;
  updateAllLanguage: (languages: LanguageItem[]) => void; // New method
  removeLanguage: (id: string) => void;
  toggleLanguageVisibility: (visible: boolean) => void;

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
  updateAllCertifications: (certifications: CertificateItem[]) => void; // New method to update all certifications in the resume dat
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
        theme: 'light',
        language: 'en',
        font: {
          family: '',
          size: undefined,
          lineSpacing: 0,
        },
        dateFormat: 'dd/mm/yyyy',
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

      // handle section delete
      deleteSection: type =>
        set(state => ({
          resumes: state.resumes.map(resume =>
            resume.metadata.id === state.activeResumeId
              ? {
                  ...resume,
                  sections: {
                    ...resume.sections,
                    [type]: {
                      //@ts-ignore
                      ...resume.sections[type],
                      items: [],
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
      // Hobbies Actions
      ...createHobbiesSlice(set),
      //strengths Action
      ...createStrengthsSlice(set),
      //reference Actions
      ...createReferencesSlice(set),
      //languages Action
      ...createLanguageSlice(set),
      // Settings Actions
      updateSettings: settings =>
        set(state => ({
          settings: {...state.settings, ...settings},
        })),
    }),
    {
      name: RESUME_STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({
        resumes: state.resumes,
        activeResumeId: state.activeResumeId,
        settings: state.settings,
      }),
    },
  ),
);
