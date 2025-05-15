import {v4 as uuidv4} from 'uuid';

type State = {
  resumes: Resume[];
  activeResumeId: string;
};

type Actions = {
  // Education
  addEducation: (education: Omit<EducationItem, 'id'>) => string;
  updateEducation: (id: string, education: Partial<EducationItem>) => void;
  removeEducation: (id: string) => void; // New function
  toggleEducationVisibility: (visible: boolean) => void;
};

export const createEducationSlice = (set: any): Actions => ({
  // // Education Actions
  addEducation: education => {
    const newId = uuidv4();
    set((state: State) => ({
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
    set((state: State) => ({
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
    set((state: State) => ({
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
    set((state: State) => ({
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
});
