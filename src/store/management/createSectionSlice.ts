import {v4 as uuidv4} from 'uuid';

type State = {
  resumes: Resume[];
  activeResumeId: string;
};

/**
 * A factory function to create a standardized slice for a resume section.
 * Replaces boilerplate across work, education, projects, skills, etc.
 *
 * @param set Zustand set function
 * @param sectionKey The key in `resume.sections` (e.g., 'work', 'education')
 * @param actionPrefix The prefix for action names (e.g., 'WorkExperience', 'Education')
 * @returns A slice object containing add, update, updateAll, remove, and toggle actions
 */
export const createSectionSlice = <T extends BaseItem>(
  set: any,
  sectionKey: keyof Resume['sections'],
  actionPrefix: string,
) => {
  const capPrefix = actionPrefix;
  
  return {
    [`add${capPrefix}`]: (item: Omit<T, 'id'>) => {
      const newId = uuidv4();
      set((state: State) => ({
        resumes: state.resumes.map(resume =>
          resume.metadata.id === state.activeResumeId
            ? {
                ...resume,
                sections: {
                  ...resume.sections,
                  [sectionKey]: {
                    ...resume.sections[sectionKey],
                    items: [
                      ...(resume.sections[sectionKey] as any).items,
                      {...item, id: newId},
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

    [`update${capPrefix}`]: (id: string, updates: Partial<T>) =>
      set((state: State) => ({
        resumes: state.resumes.map(resume =>
          resume.metadata.id === state.activeResumeId
            ? {
                ...resume,
                sections: {
                  ...resume.sections,
                  [sectionKey]: {
                    ...resume.sections[sectionKey],
                    items: (resume.sections[sectionKey] as any).items.map((item: T) =>
                      item.id === id ? {...item, ...updates} : item,
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

    [`updateAll${capPrefix}s`]: (items: T[]) =>
      set((state: State) => ({
        resumes: state.resumes.map(resume =>
          resume.metadata.id === state.activeResumeId
            ? {
                ...resume,
                sections: {
                  ...resume.sections,
                  [sectionKey]: {
                    ...resume.sections[sectionKey],
                    items,
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

    [`remove${capPrefix}`]: (id: string) =>
      set((state: State) => ({
        resumes: state.resumes.map(resume =>
          resume.metadata.id === state.activeResumeId
            ? {
                ...resume,
                sections: {
                  ...resume.sections,
                  [sectionKey]: {
                    ...resume.sections[sectionKey],
                    items: (resume.sections[sectionKey] as any).items.filter(
                      (item: T) => item.id !== id,
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

    [`toggle${capPrefix}Visibility`]: (visible: boolean) =>
      set((state: State) => ({
        resumes: state.resumes.map(resume =>
          resume.metadata.id === state.activeResumeId
            ? {
                ...resume,
                sections: {
                  ...resume.sections,
                  [sectionKey]: {
                    ...resume.sections[sectionKey],
                    visible,
                  },
                },
              }
            : resume,
        ),
      })),
  };
};
