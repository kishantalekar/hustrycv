type State = {
  resumes: Record<string, Resume>;
  activeResumeId: string;
};

type Actions = {
  addCustomSection: (
    section: Omit<Section<CustomSectionItem>, 'type' | 'items'>,
  ) => void;
  updateCustomSection: (
    index: number,
    section: Partial<Section<CustomSectionItem>>,
  ) => void;
  removeCustomSection: (index: number) => void; // New function
  toggleCustomSectionVisibility: (index: number, visible: boolean) => void;
};

export const createCustomSectionSlice = (set: any): Actions => ({
  addCustomSection: section =>
    set((state: State) => {
      const resume = state.resumes[state.activeResumeId];
      if (!resume) return state;
      return {
        resumes: {
          ...state.resumes,
          [state.activeResumeId]: {
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
          },
        },
      };
    }),

  updateCustomSection: (index, section) =>
    set((state: State) => {
      const resume = state.resumes[state.activeResumeId];
      if (!resume) return state;
      return {
        resumes: {
          ...state.resumes,
          [state.activeResumeId]: {
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
          },
        },
      };
    }),

  removeCustomSection: index =>
    set((state: State) => {
      const resume = state.resumes[state.activeResumeId];
      if (!resume) return state;
      return {
        resumes: {
          ...state.resumes,
          [state.activeResumeId]: {
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
          },
        },
      };
    }),

  toggleCustomSectionVisibility: (index, visible) =>
    set((state: State) => {
      const resume = state.resumes[state.activeResumeId];
      if (!resume) return state;
      return {
        resumes: {
          ...state.resumes,
          [state.activeResumeId]: {
            ...resume,
            sections: {
              ...resume.sections,
              customSections: resume.sections.customSections.map((sec, i) =>
                i === index ? {...sec, visible} : sec,
              ),
            },
          },
        },
      };
    }),
});
