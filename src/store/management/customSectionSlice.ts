type State = {
  resumes: Resume[];
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
    set((state: State) => ({
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
    set((state: State) => ({
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
    set((state: State) => ({
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
    set((state: State) => ({
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
});
