import {v4 as uuidv4} from 'uuid';

type State = {
  resumes: Resume[];
  activeResumeId: string;
};

type Actions = {
  addReference: (Reference: Omit<ReferenceItem, 'id'>) => string;
  updateReference: (id: string, Reference: Partial<ReferenceItem>) => void;
  updateAllReferences: (References: ReferenceItem[]) => void;
  removeReference: (id: string) => void; // New function
  toggleReferencesVisibility: (visible: boolean) => void;
};

export const createReferencesSlice = (set: any): Actions => ({
  addReference: reference => {
    const newId = uuidv4();
    set((state: State) => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              sections: {
                ...resume.sections,
                references: {
                  ...resume.sections.references,
                  items: [
                    ...resume.sections.references.items,
                    {...reference, id: newId},
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

  updateReference: (id, Reference) =>
    set((state: State) => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              sections: {
                ...resume.sections,
                references: {
                  ...resume.sections.references,
                  items: resume.sections.references.items.map(item =>
                    item.id === id ? {...item, ...Reference} : item,
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
  updateAllReferences: (References: ReferenceItem[]) =>
    set((state: State) => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              sections: {
                ...resume.sections,
                references: {
                  ...resume.sections.references,
                  items: References,
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
  removeReference: id =>
    set((state: State) => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              sections: {
                ...resume.sections,
                References: {
                  ...resume.sections.references,
                  items: resume.sections.references.items.filter(
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

  toggleReferencesVisibility: visible =>
    set((state: State) => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              sections: {
                ...resume.sections,
                References: {...resume.sections.references, visible},
              },
            }
          : resume,
      ),
    })),
});
