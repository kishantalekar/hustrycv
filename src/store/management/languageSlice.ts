import {v4 as uuidv4} from 'uuid';

type State = {
  resumes: Resume[];
  activeResumeId: string;
};

type Actions = {
  addLanguage: (language: Omit<LanguageItem, 'id'>) => string;
  updateLanguage: (id: string, language: Partial<LanguageItem>) => void;
  updateAllLanguage: (languages: LanguageItem[]) => void; // New method
  removeLanguage: (id: string) => void;
  toggleLanguageVisibility: (visible: boolean) => void;
};

export const createLanguageSlice = (set: any): Actions => ({
  addLanguage: language => {
    const newId = uuidv4();
    set((state: State) => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              sections: {
                ...resume.sections,
                languages: {
                  ...resume.sections.languages,
                  items: [
                    ...resume.sections.languages.items,
                    {...language, id: newId},
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
  updateLanguage: (id, language) =>
    set((state: State) => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              sections: {
                ...resume.sections,
                languages: {
                  ...resume.sections.languages,
                  items: resume.sections.languages.items.map(item =>
                    item.id === id ? {...item, ...language} : item,
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

  updateAllLanguage: languages =>
    set((state: State) => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              sections: {
                ...resume.sections,
                languages: {
                  ...resume.sections.languages,
                  items: languages,
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

  removeLanguage: id =>
    set((state: State) => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              sections: {
                ...resume.sections,
                languages: {
                  ...resume.sections.languages,
                  items: resume.sections.languages.items.filter(
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

  toggleLanguageVisibility: visible =>
    set((state: State) => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              sections: {
                ...resume.sections,
                languages: {...resume.sections.languages, visible},
              },
            }
          : resume,
      ),
    })),
});
