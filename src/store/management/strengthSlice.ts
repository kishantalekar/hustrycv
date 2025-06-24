import {v4 as uuidv4} from 'uuid';

type State = {
  resumes: Resume[];
  activeResumeId: string;
};

type Actions = {
  // Strengths
  addStrength: (Strength: Omit<StrengthItem, 'id'>) => string;
  updateStrength: (id: string, Strength: Partial<StrengthItem>) => void;
  updateAllStrengths: (Strengths: StrengthItem[]) => void; // New method to update all Strengths in the resume data
  removeStrength: (id: string) => void; // New function
  toggleStrengthsVisibility: (visible: boolean) => void;
};

export const createStrengthsSlice = (set: any): Actions => ({
  addStrength: Strength => {
    const newId = uuidv4();
    set((state: State) => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              sections: {
                ...resume.sections,
                strengths: {
                  ...resume.sections.strengths,
                  items: [
                    ...resume.sections.strengths.items,
                    {...Strength, id: newId},
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

  updateStrength: (id, Strength) =>
    set((state: State) => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              sections: {
                ...resume.sections,
                strengths: {
                  ...resume.sections.strengths,
                  items: resume.sections.strengths.items.map(item =>
                    item.id === id ? {...item, ...Strength} : item,
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
  updateAllStrengths: Strengths =>
    set((state: State) => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              sections: {
                ...resume.sections,
                strengths: {
                  ...resume.sections.strengths,
                  items: Strengths,
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
  removeStrength: id =>
    set((state: State) => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              sections: {
                ...resume.sections,
                strengths: {
                  ...resume.sections.strengths,
                  items: resume.sections.strengths.items.filter(
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

  toggleStrengthsVisibility: visible =>
    set((state: State) => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              sections: {
                ...resume.sections,
                strengths: {
                  ...resume.sections.strengths,
                  visible,
                },
              },
            }
          : resume,
      ),
    })),
});
